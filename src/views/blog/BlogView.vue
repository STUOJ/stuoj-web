<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { BlogInfo } from "@/types/Blog";
import { useRouteParams } from "@vueuse/router";
import { getBlogApi } from "@/apis/blog";
import type { ApiResponse } from "@/types/ApiResponse";
import { renderMarkAndLaTeX } from "@/utils/renderMarkAndLaTeX";
import { BlogStatusMap } from "@/types/Blog";
import {StarFilled} from "@element-plus/icons-vue";
import { formatDataTimeStr } from "../../utils/date";

const blogId = useRouteParams<number>("id");

const { state, execute } = getBlogApi();

const blog = ref<BlogInfo>({} as BlogInfo);

onMounted(async () => {
  await execute({
    id: blogId.value,
  });
  if (state.value) {
    blog.value = state.value
  }
});

const commentForm = ref({
  content: ""
});

const onSubmit = () => {
}
</script>

<template>
  <div class="container-main">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/blog' }">博客</el-breadcrumb-item>
        <el-breadcrumb-item>{{ blog?.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <br/>
    <el-card>
      <h1>{{ blog?.title }}</h1>
      <div>
        <el-icon><UserFilled/></el-icon>&nbsp;{{ blog?.user_id }}
        <el-divider direction="vertical"></el-divider>
        <el-icon><View /></el-icon>&nbsp;0
        <el-divider direction="vertical"></el-divider>
        <el-icon><StarFilled /></el-icon>&nbsp;0
        <el-divider direction="vertical"></el-divider>
        <el-icon><Comment /></el-icon>&nbsp;0
        <el-divider direction="vertical"></el-divider>
        <el-icon><Share /></el-icon>&nbsp;0
        <el-divider direction="vertical"></el-divider>
        <el-icon><Timer/></el-icon>&nbsp;{{ formatDataTimeStr(blog?.create_time ?? "") }}
        <el-divider direction="vertical"></el-divider>
        <el-icon><Stopwatch /></el-icon>&nbsp;{{ formatDataTimeStr(blog?.update_time ?? "") }}
        <el-divider direction="vertical"></el-divider>
      </div>
      <br/>
      <div>
        <el-tag>tag</el-tag>&nbsp;
        <el-tag>tag</el-tag>&nbsp;
        <el-tag>tag</el-tag>&nbsp;
        <el-tag>tag</el-tag>&nbsp;
        <el-tag>tag</el-tag>&nbsp;
      </div>
      <el-divider></el-divider>
      <div v-html="renderMarkAndLaTeX(blog?.content ?? '')"></div>
      <el-divider></el-divider>
      <div>
        <el-button><el-icon><View /></el-icon>&nbsp;0</el-button>
        <el-button><el-icon><StarFilled /></el-icon>&nbsp;0</el-button>
        <el-button><el-icon><Share /></el-icon>&nbsp;0</el-button>
      </div>
    </el-card>
    <br/>
    <el-card>
      <div>
        <strong>发表评论</strong><br/><br/>
        <el-form :model="commentForm">
          <el-form-item>
            <el-input v-model="commentForm.content" placeholder="如何评价..." type="textarea"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发送</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <strong>评论区</strong><br/><br/>
      <div>
        <el-card style="margin-bottom: 20px">
          <div>
            <el-icon><UserFilled/></el-icon>&nbsp;用户名
            <el-divider direction="vertical"></el-divider>
            <el-icon><Timer/></el-icon>&nbsp;2021-01-01 00:00:00
          </div>
          <br/>
          <div>
            评论内容
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>