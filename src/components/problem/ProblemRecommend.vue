<template>
  <ProblemList :admin="admin" :problems="problems" />
  <br />
  <ElPagination class="pagination" v-model:current-page="paramsPage.page" v-model:page-size="paramsPage.size"
                :page-sizes="[10, 20, 50, 100]" :size="'small'" :background="true"
                layout="total, sizes, prev, pager, next, jumper" :total="problemPage?.total" @size-change="handleQuery"
                @current-change="handleQuery" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Page } from '@/types/misc';
import type { ProblemInfo, ProblemParams } from '@/types/Problem';
import { getProblemListApi } from '@/apis/problem';


const props = withDefaults(defineProps<{
  admin?: boolean;
}>(), {
  admin: false
});

const { execute } = getProblemListApi();
const paramsSelect = ref<ProblemParams>();
const paramsPage = ref<ProblemParams>({
  page: 1,
  size: 10,
});
const params = ref<ProblemParams>({
  page: 1,
  size: 10,
});
const problemPage = ref<Page<"problems", ProblemInfo>>();
const problems = ref<ProblemInfo[]>([]);
onMounted(() => {
  handleQuery();
});
const handleQuery = async () => {
  params.value = {
    ...paramsSelect.value,
    page: paramsPage.value.page,
    size: paramsPage.value.size,
  }
  await execute({
    params: params.value
  }).then((res) => {
    problems.value = res.value?.problems || [];
    problemPage.value = res.value;
  });
}
</script>

<style scoped>
.pagination {
  display: flex;
  width: 100%;
}
</style>
