<template>
  <div class="container-main">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card style="margin-bottom: 20px; text-align: center">
          <strong>{{ slot }}好，{{ isLogin ? info.username : "访客" }}</strong><br/>
          <span style="font-size: 16px">
            {{ year }} / {{ month }}
          </span><br/>
          <span style="font-size: 72px">{{ day }}</span><br/>
          <el-button type="success" disabled>签到题</el-button>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <strong>题目传送</strong>
            </div>
          </template>
          <el-form :v-model="gotoForm">
            <el-form-item>
              <el-input v-model="gotoForm.problemId" placeholder="题目 ID" clearable/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="gotoProblem">传送</el-button>
              <el-button @click="gotoRandomProblem" disabled>随机传送</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <strong>精选题单</strong>
            </div>
          </template>
          <EmptyPage></EmptyPage>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <strong>近期比赛</strong>
            </div>
          </template>
          <EmptyPage></EmptyPage>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card style="margin-bottom: 20px">
          <el-carousel height="250px" type="card" class="carousel">
            <el-carousel-item v-for="(image, index) in (banners)" :key="index">
              <img :src="image" alt="banner" class="banner-img"/>
            </el-carousel-item>
          </el-carousel>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <strong>公告栏</strong>
            </div>
          </template>
          <NoticeList/>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <strong>题目推荐</strong>
            </div>
          </template>
          <ProblemRecommend/>
        </el-card>
        <el-card style="margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <strong>博客推荐</strong>
            </div>
          </template>
          <BlogRecommend/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import router from "@/router";
import { userStore } from "@/stores/user";
import ProblemRecommend from "@/components/problem/ProblemRecommend.vue";
import BlogRecommend from "@/components/blog/BlogRecommend.vue";
import Banner1 from "@/assets/images/banner/jfoj.jpg";
import Banner2 from "@/assets/images/banner/acm-icpc.jpg";
import Banner3 from "@/assets/images/banner/jf.jpg";
import NoticeList from "@/components/blog/NoticeList.vue";

const banners = ref([Banner1, Banner2, Banner3]);

const info = ref(userStore().info)
const isLogin = ref(userStore().isLogin);

onMounted(() => {
});

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const slot = hour < 12 ? '早上' : hour < 18 ? '下午' : '晚上';

const gotoForm = ref({
  problemId: ""
});

const gotoProblem = () => {
  if (gotoForm.value.problemId) {
    router.push(`/problem/${gotoForm.value.problemId}`);
  }
};

</script>

<style>
.banner-img {
  width: 100%;
  height: 100%;
}

/*.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}*/
</style>