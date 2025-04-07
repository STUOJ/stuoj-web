<template>
  <div class="container-main">
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户</el-breadcrumb-item>
            <el-breadcrumb-item>{{ info?.username }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <el-card>
      <div class="space-header">
        <Avatar class="avatar" :size="50" :src="info?.avatar" />
        <div class="basic-info">
          <strong>{{ info?.username }}</strong>
          <div>{{ signature }}</div>
        </div>
        <div class="user-statistic">
          <div class="statistic-item">
            <span class="statistic-label">提交</span>
            <span class="statistic-value">{{ info?.submit_count }}</span>
          </div>
          <div class="statistic-item">
            <span class="statistic-label">AC</span>
            <span class="statistic-value">{{ info?.ac_count }}</span>
          </div>
          <div class="statistic-item">
            <span class="statistic-label">博客</span>
            <span class="statistic-value">{{ info?.blog_count }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-tabs type="border-card" v-model="tabName">
      <el-tab-pane label="主页">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card>
              <template #header>
                <div class="user-info-item">
                  <span class="info-label">
                    <strong>用户信息</strong>
                  </span>
                  <span class="info-value">
                    <UserSetting v-if="id !== 0 && id == userId" />
                  </span>
                </div>
              </template>
              <div class="user-info">
                <div class="user-info-item">
                  <span class="info-label">ID</span>
                  <span class="info-value">{{ info?.id }}</span>
                </div>
                <div class="user-info-item">
                  <span class="info-label">邮箱</span>
                  <span class="info-value">{{ info?.email }}</span>
                </div>
                <div class="user-info-item">
                  <span class="info-label">角色</span>
                  <UserRoleTag :role="info?.role || Role.User" />
                </div>
                <div class="user-info-item">
                  <span class="info-label">注册时间</span>
                  <span class="info-value">{{ formatDateTimeStr(info?.create_time) }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="博客">
        <BlogsComp :params="blogParams" :select-exclude="['user']" />
      </el-tab-pane>
      <el-tab-pane label="记录">
        <Records :userId="userId" :select="false" />
      </el-tab-pane>
    </el-tabs>
    <ElRow>
      <ElCol :span="18">

      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watchEffect } from "vue";
import { useRouteParams } from "@vueuse/router";
import { userStore } from "@/stores/user";
import { getUserInfoApi } from "@/apis/user";
import { Role, type UserInfo } from "@/types/User";
import UserRoleTag from "../../components/user/UserRoleTag.vue";
import { formatDateTimeStr } from "@/utils/date";
import { BlogStatus, type BlogParams } from "@/types/Blog";
import { OrderBy } from "@/types/misc";
import router from "@/router";

const { info: info_, id } = userStore();
const { execute } = getUserInfoApi();

let info = ref<UserInfo>();

const userId = useRouteParams<number>("id");

const signature = ref<string>();
const updateInfo = async () => {
  const userIdNum = Number(userId.value);
  if (userIdNum === id.value) {
    document.title = `${info.value?.username} - 用户 - JFOJ`;
    info = info_;
    signature.value = info.value?.signature;
  } else {
    const state = await execute({
      id: userId.value,
    });
    if (state.value) {
      document.title = `${info.value?.username} - 用户 - JFOJ`;
      info.value = state.value;
      signature.value = state.value.signature;
    }
  }
};

const blogParams = ref<BlogParams>({
  page: 1,
  size: 5,
  user: userId.value,
  order_by: OrderBy.create_time,
  order: 'desc',
});

const tabName = ref('0');

onBeforeMount(() => {
  const tabPane = router.currentRoute.value.query.tab;
  tabName.value = tabPane ? tabPane.toString() : '0';
  const blogStatus = router.currentRoute.value.query.blog_status;
  blogParams.value.status = blogStatus ? blogStatus.toString() : BlogStatus.Public.toString();
});

watchEffect(() => {
  updateInfo();
});

onBeforeMount(async () => {
  await updateInfo();
});

</script>

<style scoped>
.space-header {
  display: flex;
  align-items: center;
  text-align: left;
}

.basic-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}

.user-statistic {
  display: flex;
  margin-left: auto;
}

.statistic-item {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  text-align: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-info-item {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  font-size: 16px;
}
</style>
