<template>
  <div v-if="windowWidth > 1200">
    <el-menu class="menu" mode="horizontal" :ellipsis="false" router>
      <div class="logo">
        <a href="/">
          <img src="@/assets/images/logo/icon.png" alt="Logo" />
        </a>
        <div class="logo-text">
          <span style="font-weight: bolder">疾风OJ</span>
          <span style="font-size: 12px;">jf.stuoj.com</span>
        </div>
      </div>
      <el-menu-item v-for="link in menuLinks" :key="link.index" :index="link.index">
        <el-icon>
          <component :is="link.icon" />
        </el-icon>
        <span>{{ link.text }}</span>
      </el-menu-item>
      <div class="menu-space"><!-- 占位 --></div>
      <el-menu-item>
        <AvatarInfo />
      </el-menu-item>
    </el-menu>
  </div>
  <div v-else>
    <el-menu class="menu" mode="horizontal" :ellipsis="false" router>
      <div class="logo">
      </div>
      <el-sub-menu index="">
        <template #title>
          <img src="@/assets/images/logo/icon.png" alt="Logo" width="80" />
        </template>
        <el-menu-item v-for="link in menuLinks" :key="link.index" :index="link.index">
          <el-icon>
            <component :is="link.icon" />
          </el-icon>
          <span>{{ link.text }}</span>
        </el-menu-item>
      </el-sub-menu>
      <div class="menu-space"><!-- 占位 --></div>
      <el-menu-item>
        <AvatarInfo />
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { userStore } from '@/stores/user';
import { Collection, Flag, FolderOpened, HomeFilled, List, Notebook, Setting } from "@element-plus/icons-vue";
import { Role } from "@/types/User";

const windowWidth = ref(window.innerWidth);
watchEffect(() => {
  windowWidth.value = window.innerWidth;
});
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});

const { info } = userStore();
const username = ref(info?.value?.username || '未登录')

const menuLinks = computed(() => {
  const basicLinks = [
    { index: '/', icon: HomeFilled, text: '首页', role: Role.Visitor },
    { index: '/problem', icon: FolderOpened, text: '题库', role: Role.Visitor },
    { index: '/record', icon: List, text: '记录', role: Role.Visitor },
    { index: '/blog', icon: Notebook, text: '博客', role: Role.Visitor },
    { index: '/admin', icon: Setting, text: '管理', role: Role.Editor },
  ];

  return basicLinks.filter(link => info.value?.role >= link.role);
});

watchEffect(() => {
  username.value = info.value?.username || '未登录';
});
</script>

<style scoped>
.menu {
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 5px 20px;
}

.logo img {
  width: 80px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}

.menu-space {
  margin-right: auto;
}
</style>
