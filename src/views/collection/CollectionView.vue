<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getCollectionApi } from '@/apis/collection';
import type { CollectionInfo } from '@/types/Collection';
import ProblemList from '@/components/problem/ProblemList.vue';
import TextView from '@/components/text/TextView.vue';
import { formatDateTimeStr } from "@/utils/date";
import { useRouteParams } from '@vueuse/router';
import { Paperclip, Notebook, List } from '@element-plus/icons-vue';

const { execute } = getCollectionApi();

const activeTab = ref<'description' | 'problemList'>('description');
const collection = ref<CollectionInfo>({} as CollectionInfo);
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
            document.title = `${collection.value.title} - 题单 - STUOJ`;
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
            <el-card class="mb-8 !border-none shadow-sm">
                <div class="flex-row flex-between">
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {{ collection?.title }}
                    </h1>
                    <AvatarInfo :user="collection?.user" name :size="40" />
                </div>

                <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div class="flex items-center">
                        <el-icon class="mr-1">
                            <DocumentAdd />
                        </el-icon>
                        <span>{{ formatDateTimeStr(collection?.create_time) }}</span>
                    </div>
                    <el-divider direction="vertical" />
                    <div class="flex items-center">
                        <el-icon class="mr-1">
                            <Edit />
                        </el-icon>
                        <span>{{ formatDateTimeStr(collection?.update_time) }}</span>
                    </div>
                    <el-divider direction="vertical" />
                    <div class="flex items-center">
                        <el-icon class="mr-1">
                            <Paperclip />
                        </el-icon>
                        <span>{{ collection?.problem_ids?.length || 0 }}题</span>
                    </div>
                </div>
            </el-card>
            <br />
            <el-card>
                <el-tabs v-model="activeTab" class="mb-4">
                    <el-tab-pane label="题单介绍" name="description">
                        <template #label>
                            <el-icon class="mr-1">
                                <Notebook />
                            </el-icon>
                            题单介绍
                        </template>
                        <TextView :content="collection?.description || ''" />
                    </el-tab-pane>

                    <el-tab-pane label="题目列表" name="problemList">
                        <template #label>
                            <el-icon class="mr-1">
                                <List />
                            </el-icon>
                            题目列表
                        </template>
                        <ProblemList :problems="collection?.problems || []" :show-tags="true" :show-difficulty="true" />
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>

        <div class="text-center py-8" v-else>
            <span class="loading loading-lg"></span>
        </div>
    </div>
</template>
