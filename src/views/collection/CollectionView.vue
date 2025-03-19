<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getCollectionApi } from '@/apis/collection';
import type { CollectionInfo } from '@/types/Collection';
import ProblemList from '@/components/problem/ProblemList.vue';
import TextView from '@/components/text/TextView.vue';
import { formatDateTimeStr } from "@/utils/date";
import { useRouteParams } from '@vueuse/router';
import { Paperclip } from '@element-plus/icons-vue';

const { execute } = getCollectionApi();

const collection = ref<CollectionInfo>();
const loading = ref(true);

const collectionId = useRouteParams<string>("id");

const fetchData = async () => {
    try {
        await execute({
            id: parseInt(collectionId.value, 10),
        }).then((res) => {
            if (!res.value) {
                return;
            }
            collection.value = res.value;
        });

    } finally {
        loading.value = false
    }
};

onMounted(async () => {
    await fetchData();
})
</script>

<template>
    <div class="container-main">
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/collection' }">题单</el-breadcrumb-item>
                <el-breadcrumb-item>{{ collection?.title }}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <br />
        <div class="container mx-auto p-4" v-if="!loading">
            <el-card class="mb-8">
                <div class="flex-row flex-between">
                    <h1 class="text-3xl font-bold mb-4">{{ collection?.title }}</h1>
                    <AvatarInfo :user="collection?.user" name :size="40" />
                </div>
                <el-icon>
                    <DocumentAdd />
                </el-icon>
                {{ formatDateTimeStr(collection?.create_time) }}
                <el-divider direction="vertical"></el-divider>
                <el-icon>
                    <Edit />
                </el-icon>
                {{ formatDateTimeStr(collection?.update_time) }}
                <el-divider direction="vertical"></el-divider>
                <el-icon>
                    <Paperclip />
                </el-icon>
                {{ collection?.problem_ids?.length || 0 }}题
            </el-card>
            <br />
            <el-card>
                <!-- TODO:实现一个二选一的checkbox，第一个是题单介绍，第二个是题单题目列表 -->
            </el-card>

            <div>
                <!-- TODO:根据上面checkbox的选中情况，渲染不同的组件，题单介绍参考博客页面使用markdown组件渲染，题目列表参考题目列表组件 -->
            </div>
        </div>

        <div class="text-center py-8" v-else>
            <span class="loading loading-lg"></span>
        </div>
    </div>
</template>
