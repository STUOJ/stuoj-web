<script setup lang="ts">
import { getBlogListApi } from '@/apis/blog';
import { onMounted, ref } from "vue";
import { BlogStatusMap, BlogStatusColor } from '@/types/Blog';
import { formatDateStr } from "@/utils/date";
import type { BlogInfo } from '@/types/Blog';
import type { Page } from '@/types/misc';
import { userStore } from "@/stores/user";

const search = ref("");

interface Scope {
  row: {
    status: keyof typeof BlogStatusMap;
  };
}
interface BlogParams {
  page: number
  size: number
}

const blogPage = ref<Page<"blogs", BlogInfo>>();
const blogs = ref<BlogInfo[]>([]);
const { state, execute } = getBlogListApi();
const params = ref<BlogParams>({
  page: 1,
  size: 10
});
const { token } = userStore();

const getList = async () => {
  await execute({
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    params: {
      ...params.value,
    }
  });

  if (state.value) {
    blogPage.value = state.value;
    blogs.value = blogPage.value.blogs;
  }
}

onMounted(() => {
  getList();
})

const handleCreate = () => {
}

const selectable = () => {
  return true;
}

const handleEdit = (index: number, row: BlogInfo) => {
}

const handleReview = (index: number, row: BlogInfo) => {
}

const handleBan = (index: number, row: BlogInfo) => {
}

const handleDelete = (index: number, row: BlogInfo) => {
}

</script>

<template>
  <el-container>
    <el-aside width="200px">
      <AdminMenu></AdminMenu>
    </el-aside>
    <el-main>
      <el-row justify="space-between">
        <el-col :span="4">
          <strong>博客管理</strong>
        </el-col>
        <el-col :span="20" style="text-align: right">
          <el-button type="primary" @click="handleCreate">创建博客</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-card>
        <el-table :data="blogs" style="width: 100%" stripe>
          <el-table-column type="selection" :selectable="selectable" width="55" />
          <el-table-column label="ID" prop="id" width="80px" sortable />
          <el-table-column label="标题" show-overflow-tooltip>
            <template #default="scope">
              <router-link :to="'/blog/' + scope.row.blog_id">
                {{ scope.row.title }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="作者ID" width="100">
            <template #default="scope">
              <router-link :to="'/user/' + scope.row.user_id">
                {{ scope.row.user_id }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="关联题目" width="100">
            <template #default="scope">
              <div v-if="scope.row.problem_id">
                <router-link :to="'/problem/' + scope.row.problem_id">
                  {{ scope.row.problem_id }}
                </router-link>
              </div>
              <div v-else>
                无
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="120">
            <template #default="scope">
              <span>
                {{ formatDateStr(scope.row.create_time) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="120">
            <template #default="scope">
              <span>
                {{ formatDateStr(scope.row.create_time) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="80">
            <template #default="scope: Scope">
              <el-tag :color="BlogStatusColor[scope.row.status]" style="color: #fff">
                {{ BlogStatusMap[scope.row.status] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" width="300">
            <template #header>
              <el-input v-model="search" size="small" placeholder="博客ID" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="primary" @click="handleReview(scope.$index, scope.row)">审核</el-button>
              <el-button size="small" type="warning" @click="handleBan(scope.$index, scope.row)">屏蔽</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <el-pagination v-model:current-page="params.page" v-model:page-size="params.size"
          :page-sizes="[10, 20, 50, 100]" :size="'small'" :background="true"
          layout="total, sizes, prev, pager, next, jumper" :total="blogPage?.total" @size-change="getList"
          @current-change="getList" />
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
}
</style>
