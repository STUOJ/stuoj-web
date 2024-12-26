<script setup lang="ts">
import { getUserListApi } from '@/apis/user';
import {onMounted, ref} from "vue";
import { UserRoleMap, UserRoleColor } from '@/types/User';
import { formatDateStr } from "@/utils/date";
import type { UserInfo } from '@/types/User';
import type { Page } from '@/types/misc';
import {userStore} from "@/stores/user";
import {BlogStatusColor, BlogStatusMap} from "@/types/Blog";
import UserRoleTag from '../user/UserRoleTag.vue';


const search = ref("");

interface Scope {
  row: {
    role: keyof typeof UserRoleMap;
  };
}
interface UserParams {
  page: number
  size: number
}

const userPage = ref<Page<"users", UserInfo>>();
const users = ref<UserInfo[]>([]);
const { state, execute } = getUserListApi();
const params = ref<UserParams>({
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
    userPage.value = state.value;
    users.value = userPage.value.users;
  }
}

onMounted (() => {
  getList();
})

const handleCreate = () => {
}

const handleEdit = (index: number, row: UserInfo) => {
}

const handleSetRole = (index: number, row: UserInfo) => {
}

const handleBan = (index: number, row: UserInfo) => {
}

const handleDelete = (index: number, row: UserInfo) => {
}
const selectable = () => {
  return true;
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
          <strong>用户管理</strong>
        </el-col>
        <el-col :span="20" style="text-align: right">
          <el-button type="primary" @click="handleCreate">创建用户</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-card>
        <el-table :data="users" style="width: 100%" stripe>
          <el-table-column type="selection" :selectable="selectable" width="55" />
          <el-table-column label="ID" prop="id" width="80" sortable/>
          <el-table-column label="头像" width="80">
            <template #default="scope">
              <Avatar :src="scope.row.avatar" />
            </template>
          </el-table-column>
          <el-table-column label="用户名">
            <template #default="scope">
              <router-link :to="'/user/' + scope.row.id">
                {{ scope.row.username }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" width="200" prop="email" show-overflow-tooltip/>
          <el-table-column label="注册时间" width="120px">
            <template #default="scope">
              <span>
                {{ formatDateStr(scope.row.create_time) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="角色" width="80">
            <template #default="scope: Scope">
              <UserRoleTag :role="scope.row.role" />
            </template>
          </el-table-column>
          <el-table-column align="right" width="300">
            <template #header>
              <el-input v-model="search" size="small" placeholder="用户ID" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="success" @click="handleSetRole(scope.$index, scope.row)">授权</el-button>
              <el-button size="small" type="warning" @click="handleBan(scope.$index, scope.row)">封禁</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br/>
        <el-pagination
            v-model:current-page="params.page"
            v-model:page-size="params.size"
            :page-sizes="[10, 20, 50, 100]"
            :size="'small'"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userPage?.total"
            @size-change="getList"
            @current-change="getList"
        />
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>
