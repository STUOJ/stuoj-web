<script setup lang="ts">
import { getBlogListApi } from '@/apis/blog';
import { onMounted, ref, type PropType } from "vue";
import { BlogStatusMap, BlogStatusColor, BlogStatus } from '@/types/Blog';
import { formatDateTimeStr } from "@/utils/date";
import type { BlogInfo } from '@/types/Blog';
import { type Page } from '@/types/misc';
import BlogSelect from './BlogSelect.vue';

const props = defineProps({
  params: {
    type: Object as PropType<BlogParams>,
    default: () => ({
      page: 1,
      size: 10
    }),
  },
  select: {
    type: Boolean,
    default: true
  },
  selectExclude: {
    type: Array as PropType<string[]>,
    default: []
  },
});

interface BlogParams {
  page: number
  size: number
}

const blogPage = ref<Page<"blogs", BlogInfo>>();
const blogs = ref<BlogInfo[]>([]);
const { state, execute: getBlogListExecute } = getBlogListApi();
const params = ref<BlogParams>(props.params);
const paramsPage = ref<BlogParams>({
  page: props.params.page,
  size: props.params.size
});

// 使用certinfoKey在submissions更新后让表格重新渲染，否则表格不会更新
const certinfoKey = ref(0);

const getList = async () => {
  await getBlogListExecute({
    params: {
      ...params.value,
      ...paramsPage.value
    }
  });

  if (state.value) {
    blogPage.value = state.value;
    blogs.value = blogPage.value.blogs;
    certinfoKey.value++;
  }
}

onMounted(() => {
  getList();
})
</script>

<template>
  <BlogSelect v-if="select" v-model:params="params" :select-exclude="selectExclude" @confirm-clicked="getList" />
  <div v-for="blog in blogs" :key="certinfoKey">
    <router-link :to="'/blog/' + blog.id">
      <el-card class="blogCard">
        <div style="width: 100%; display: flex; flex-direction: row;">
          <div style="width: 100%; display: flex; flex-direction: row; justify-content: space-between;">
            <div>
              <el-tag :color="BlogStatusColor[blog.status as BlogStatus]" style="color: #ffffff">
                {{ BlogStatusMap[blog.status as BlogStatus] }}
              </el-tag>&nbsp;
              <b>{{ blog.title }}</b>
            </div>
            <div style="display: flex; align-items: center;">
              <AvatarInfo :user="blog.user" name :name-size="16" />
            </div>
          </div>
          <br />
        </div>
        <br />
        <div>
          <el-icon><DocumentAdd /></el-icon>
          &nbsp;{{ formatDateTimeStr(blog.create_time) }}
          <el-divider direction="vertical"></el-divider>
          <el-icon><Edit /></el-icon>
          &nbsp;{{ formatDateTimeStr(blog.update_time) }}
        </div>
        <el-divider></el-divider>
        <span>{{ blog.content }}</span>
      </el-card>
    </router-link>
    <br />
  </div>
  <br />
  <el-pagination v-model:current-page="paramsPage.page" v-model:page-size="paramsPage.size"
    :page-sizes="[5, 10, 20, 50, 100]" :size="'small'" :background="true"
    layout="total, sizes, prev, pager, next, jumper" :total="blogPage?.total" @size-change="getList"
    @current-change="getList" />
</template>

<style scoped></style>