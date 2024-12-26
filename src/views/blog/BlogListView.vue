<script setup lang="ts">
import {getBlogListApi} from '@/apis/blog';
import {onMounted, ref} from "vue";
import {BlogStatusMap, BlogStatusColor, BlogStatus} from '@/types/Blog';
import {formatDateStr} from "@/utils/date";
import type {BlogInfo} from '@/types/Blog';
import type {Page} from '@/types/misc';

interface BlogParams {
  page: number
  size: number
}

const blogPage = ref<Page<"blogs", BlogInfo>>();
const blogs = ref<BlogInfo[]>([]);
const {state, execute} = getBlogListApi();
const params = ref<BlogParams>({
  page: 1,
  size: 10
});

const getList = async () => {
  await execute({
    params: {
      ...params.value,
    }
  });

  if (state.value) {
    blogPage.value = state.value;
    blogs.value = blogPage.value.blogs;
  }
}

onMounted (() => {
  getList();
})

const blogForm = ref({
  title: "",
  content: "",
})

const onSubmit = () => {
}

</script>

<template>
  <div class="container-main">
    <h1>博客</h1>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card style="margin-bottom: 20px">
          <strong>搜索博客</strong><br/><br/>
          <el-form>
            <el-form-item>
              <el-input type="text" placeholder="博客标题" clearable/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <strong>博客热榜</strong><br/><br/>
          <ul>
            <li>1. 今天天气真好</li>
            <li>2. 今天天气真好</li>
            <li>3. 今天天气真好</li>
            <li>4. 今天天气真坏</li>
            <li>5. 今天天气真好</li>
          </ul>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <strong>标签分类</strong><br/><br/>
          <el-tag>tag</el-tag>&nbsp;
          <el-tag>tag</el-tag>&nbsp;
          <el-tag>tag</el-tag>&nbsp;
          <el-tag>tag</el-tag>&nbsp;
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <strong>快速发表</strong><br/><br/>
          <el-form :model="blogForm">
            <el-form-item>
              <el-input v-model="blogForm.title" placeholder="标题" clearable/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="blogForm.content" placeholder="分享一些有趣的事情吧……" type="textarea"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">快速发布</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-divider></el-divider>
        <div v-for="blog in blogs" :key="blog.id">
          <router-link :to="'/blog/' + blog.id">
            <el-card class="blogCard">
                <span>
                  <el-tag :color="BlogStatusColor[blog.status as BlogStatus]" style="color: #ffffff">
                    {{ BlogStatusMap[blog.status as BlogStatus] }}
                  </el-tag>&nbsp;
                  <b>{{ blog.title }}</b><br/>
                </span>
              <br/>
              <div>
                <el-icon><UserFilled/></el-icon>&nbsp;{{ blog.user_id }}
                <el-divider direction="vertical"></el-divider>
                <el-icon><View /></el-icon>&nbsp;0
                <el-divider direction="vertical"></el-divider>
                <el-icon><StarFilled /></el-icon>&nbsp;0
                <el-divider direction="vertical"></el-divider>
                <el-icon><Comment /></el-icon>&nbsp;0
                <el-divider direction="vertical"></el-divider>
                <el-icon><Share /></el-icon>&nbsp;0
                <el-divider direction="vertical"></el-divider>
                <el-icon><Timer/></el-icon>&nbsp;{{ formatDateStr(blog.create_time) }}
                <el-divider direction="vertical"></el-divider>
                <el-icon><Stopwatch /></el-icon>&nbsp;{{ formatDateStr(blog.update_time) }}
              </div>
              <br/>
              <div>
                <el-tag>tag</el-tag>&nbsp;
                <el-tag>tag</el-tag>&nbsp;
                <el-tag>tag</el-tag>&nbsp;
                <el-tag>tag</el-tag>&nbsp;
              </div>
            </el-card>
          </router-link>
          <br/>
        </div>
        <br/>
        <el-pagination
            v-model:current-page="params.page"
            v-model:page-size="params.size"
            :page-sizes="[10, 20, 50, 100]"
            :size="'small'"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="blogPage?.total"
            @size-change="getList"
            @current-change="getList"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
</style>