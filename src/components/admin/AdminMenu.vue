<script setup lang="ts">
import {
  Collection,
  Flag,
  HomeFilled,
  List,
  Notebook,
  PriceTag,
  Reading,
  UserFilled,
  WarnTriangleFilled,
  Comment,
  Histogram,
  Tools,
  Postcard
} from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { userStore } from '@/stores/user';
import { Role } from "@/types/User";
const isCollapse = ref(false);

const { info } = userStore();

const menuLinks = computed(() => {
  const basicLinks = [
    { index: '/admin', icon: HomeFilled, text: '面板首页', role: Role.Editor },
    { index: '/admin/user', icon: UserFilled, text: '用户管理', role: Role.Admin },
    { index: '/admin/problem', icon: Reading, text: '题目管理', role: Role.Editor },
    { index: '/admin/tag', icon: PriceTag, text: '标签管理', role: Role.Editor },
    { index: '/admin/language', icon: Postcard, text: '语言管理', role: Role.Editor },
    { index: '/admin/record', icon: List, text: '记录管理', role: Role.Admin },
    { index: '/admin/blog', icon: Notebook, text: '博客管理', role: Role.Admin },
    { index: '/admin/comment', icon: Comment, text: '评论管理', role: Role.Admin },
  ];
  return basicLinks.filter(link => info.value?.role >= link.role);
})

</script>

<template>
  <el-menu default-active="1" :collapse="isCollapse" router>
    <!--
    <el-menu-item>
      <el-switch
          v-model="isCollapse"
          size="small"
      />
    </el-menu-item>
-->
    <el-menu-item v-for="link in menuLinks" :key="link.index" :index="link.index">
      <el-icon>
        <component :is="link.icon" />
      </el-icon>
      <span>{{ link.text }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>
