<template>
    <div class="header-nav">
        <el-row class="header-nav__row" :gutter="20">
            <el-col :span="4" class="header-nav__logo">
                <img src="@/assets/appIcons/icon.png" alt="Logo" class="header-nav__logo-img">
            </el-col>
            <el-col :span="16" class="header-nav__menu">
                <RouterLink v-for="(link, index) in menuLinks" :key="index" :to="link.to" class="nav-link">{{
                    link.name
                }}</RouterLink>
            </el-col>
            <el-col :span="4" class="header-nav__user">
                <div class="header-nav__user_avatar">
                    <AvatarInfo />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { userStore } from '@/stores/user';

const { info, isLogin, id } = userStore();
const username = ref(info?.value?.username || '未登录')

watchEffect(() => {
    username.value = info.value?.username || '未登录';
});

const menuLinks = computed(() => {
    const basicLinks = [
        {
            name: '首页',
            to: '/'
        },
        {
            name: '题库',
            to: '/problem'
        },
        {
            name: '题单',
            to: '/collection'
        },
        {
            name: '比赛',
            to: '/contest'
        },
        {
            name: '博客',
            to: '/blog'
        },
    ];
    let links = [
        ...basicLinks
    ];
    if (isLogin.value && (info.value.role >= 2)) {
        links.push({
            name: '管理',
            to: '/admin'
        });
    }

    return links;
});

</script>

<style scoped>
.header-nav {
    background-color: #FFFFFF;
    height: 45px;
    border-bottom: 1px solid var(--el-border-color);
    display: flex;
    flex-direction: column;
}

.header-nav__logo{
  height: 100%;
}

.header-nav__logo-img{
  height: 90%;
  margin-left: 50%;
}

.header-nav__row {
    height: 100%;
    width: 100%;
}

.header-nav__user {
    display: flex;
    justify-content: flex-end;
}

.header-nav__user_avatar {
    margin-top: 1%;
    height: 40px;
    width: 40px;
    display: flex;
}

.nav-link {
    height: 100%;
    text-decoration: none;
    /* 移除下划线 */
    color: #333;
    /* 设置文字颜色 */
    padding: 16px 45px;
    /* 设置内边距 */
    font-size: 20px;
    /* 设置字体大小 */
    /* 你可以在这里添加更多样式 */
}

.nav-link:hover {
    color: #007bff;
    /* 鼠标悬停时的文字颜色 */
    background-color: #f1f1f1;
    /* 鼠标悬停时的背景颜色 */
}
</style>