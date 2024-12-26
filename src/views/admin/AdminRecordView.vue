<script setup lang="ts">
import { getRecordListApi } from '@/apis/record';
import {onMounted, ref} from "vue";
import { JudgeStatusAbbr, JudgeStatusColor, JudgeStatusMap } from '@/types/Judge';
import { formatDateStr } from "@/utils/date";
import {userStore} from "@/stores/user";
import type { Submission } from '@/types/Record';
import type { Page } from '@/types/misc';

const search = ref("");

interface Scope {
  row: {
    status: keyof typeof JudgeStatusAbbr | keyof typeof JudgeStatusColor;
  };
}
interface RecordParams {
  page: number
  size: number
}

const recordPage = ref<Page<"submissions", Submission>>();
const records = ref<Submission[]>([]);
const { state, execute } = getRecordListApi();
const params = ref<RecordParams>({
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
    recordPage.value = state.value;
    records.value = recordPage.value.submissions;
  }
}

onMounted (() => {
  getList();
})

const selectable = (row: Submission) => {
  return true;
}

const handleDelete = (index: number, row: Submission) => {
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
          <strong>记录管理</strong>
        </el-col>
        <el-col :span="20" style="text-align: right">
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-card>
        <el-table :data="records" style="width: 100%" stripe>
          <el-table-column type="selection" :selectable="selectable" width="55" />
          <el-table-column label="ID" prop="id" width="80" sortable/>
          <el-table-column label="题目ID" width="100">
            <template #default="scope">
              <router-link :to="'/problem/' + scope.row.problem_id">
                {{ scope.row.problem_id }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="用户ID" width="100">
            <template #default="scope">
              <router-link :to="'/user/' + scope.row.user_id">
                {{ scope.row.user_id }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="语言ID" prop="language_id" width="100" sortable/>
          <el-table-column label="提交时间" width="120px">
            <template #default="scope">
              <span>
                {{ formatDateStr(scope.row.create_time) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="100">
            <template #default="scope">
              {{ scope.row.time }} S
            </template>
          </el-table-column>
          <el-table-column label="内存" width="100">
            <template #default="scope">
              {{ scope.row.memory }} KB
            </template>
          </el-table-column>
          <el-table-column label="分数" prop="score" width="80" sortable/>
          <el-table-column label="状态" width="80">
            <template #default="scope: Scope">
              <RecordTag :status="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="记录ID" />
            </template>
            <template #default="scope">
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
            :total="recordPage?.total"
            @size-change="getList"
            @current-change="getList"
        />
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>
