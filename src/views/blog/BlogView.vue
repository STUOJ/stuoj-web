<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BlogStatus, type BlogInfo } from "@/types/Blog";
import { useRouteParams } from "@vueuse/router";
import { getBlogApi, deleteBlogApi } from "@/apis/blog";
import { uploadCommentApi } from "@/apis/comment";
import { formatDateTimeStr } from "@/utils/date";
import { userStore } from "@/stores/user";
import { Role } from "@/types/User";
import router from "@/router";
import { ElNotification } from "element-plus";
import Comments from "@/components/comment/Comments.vue";
import {Comment, DocumentAdd, Edit, PriceTag, Reading, View} from "@element-plus/icons-vue";

const commentRef = ref<InstanceType<typeof Comments>>();

const { info, id } = userStore();

const blogId = useRouteParams<string>("id");

const { state, execute } = getBlogApi();
const { execute: deleteBlogExecute } = deleteBlogApi();
const { execute: uploadCommentExecute } = uploadCommentApi();


const blog = ref<BlogInfo>({} as BlogInfo);

onMounted(async () => {
  await execute({
    id: parseInt(blogId.value, 10),
  });
  if (state.value) {
    blog.value = state.value
    document.title = `${blog.value.title} - 博客 - JFOJ`;
  }
});

const commentForm = ref({
  blog_id: parseInt(blogId.value, 10),
  content: ""
});

const onSubmit = async () => {
  await uploadCommentExecute({
    data: commentForm.value
  }).then((res) => {
    ElNotification({ type: 'success', message: '评论成功' });
    commentForm.value.content = "";
    commentRef.value?.handleQuery();
  });
};

const handleEdit = () => {
  router.push(`/blog/edit?id=${blogId.value}`);
}

const dialogVisible = ref(false);

const handleDelete = async () => {
  dialogVisible.value = true;
};

const handleConfirmDelete = async () => {
  await deleteBlogExecute({
    id: parseInt(blogId.value, 10)
  }).then(() => {
    ElNotification({ type: 'success', message: '删除成功' });
    router.push("/blog");
  });
};

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
    <br />
    <el-card>
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <h1>{{ blog?.title }}</h1>
        <div>
          <AvatarInfo v-if="blog.user" :user="blog.user" name />
        </div>
      </div>
      <div>
        <el-icon><DocumentAdd /></el-icon>
        &nbsp;{{ formatDateTimeStr(blog?.create_time ?? "") }}
        <el-divider direction="vertical"></el-divider>
        <el-icon><Edit /></el-icon>
        &nbsp;{{ formatDateTimeStr(blog?.update_time ?? "") }}
        <span v-if="blog.user && (info.role >= Role.Admin || (blog.user.id === id && blog.status !== BlogStatus.Banned))">
            <el-divider direction="vertical"></el-divider>
            <ElButton size="small" @click="handleEdit()">编辑</ElButton>
            <ElButton size="small" type="danger" @click="handleDelete()">删除</ElButton>
          </span>
      </div>
      <el-divider></el-divider>
      <TextView :content="blog?.content || ''" />
      <el-divider></el-divider>
      <div>
        <el-icon><Reading /></el-icon>&nbsp;
        <span v-if="blog?.problem && blog?.problem?.id !== 0">
          关联题目:
          <router-link :to="{ path: '/problem/' + blog?.problem?.id }">
            [P{{ blog?.problem?.id }}] {{ blog?.problem?.title }}
          </router-link>
        </span>
        <span v-else>未关联题目</span>
      </div>
    </el-card>
    <br />
    <el-card>
      <div>
        <strong>发表评论</strong><br /><br />
        <el-form :model="commentForm">
          <el-form-item>
            <el-input v-model="commentForm.content" placeholder="如何评价..." type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发送</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <strong>评论区</strong><br /><br />
      <div>
        <Comments v-if="blog.id" :blog-id="blog.id" :select="false" ref="commentRef" />
      </div>
    </el-card>
  </div>
  <ElDialog v-model="dialogVisible" title="确认窗口" width="500">
    <span>删除后不可恢复</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="handleConfirmDelete">确定</el-button>
      </span>
    </template>
  </ElDialog>
</template>

<style scoped></style>