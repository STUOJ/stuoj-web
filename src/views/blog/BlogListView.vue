<script setup lang="ts">
import type { BlogParams } from '@/types/Blog';
import { OrderBy } from '@/types/misc';
import { useRouteQuery } from '@vueuse/router';
import { onBeforeMount, onMounted, ref } from 'vue';

const params = ref<BlogParams>({
  page: 1,
  size: 10,
  order_by: OrderBy.create_time,
  order: 'desc',
});

onBeforeMount(() => {
  const problem = useRouteQuery<string>("problem");
  if (problem.value) {
    params.value.problem = parseInt(problem.value, 10);
  }
});
</script>

<template>
  <div class="container-main">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <strong>搜索博客</strong>
            </div>
          </template>
          <el-form>
            <el-form-item>
              <el-input type="text" placeholder="博客标题" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <strong>博客热榜</strong>
            </div>
          </template>
          <EmptyPage/>
<!--
          <ul>
            <li>1. 今天天气真好</li>
            <li>2. 今天天气真好</li>
            <li>3. 今天天气真好</li>
            <li>4. 今天天气真坏</li>
            <li>5. 今天天气真好</li>
          </ul>
-->
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <template #header>
            <div class="card-header">
              <strong>快速发布</strong>
            </div>
          </template>
          <FastPost />
        </el-card>
        <el-divider></el-divider>
        <BlogsComp :params="params" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>