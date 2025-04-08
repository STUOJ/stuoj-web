<template>
  <div class="container-full">
    <div style="display: flex; justify-content: center; margin-bottom: 10px;">
      <el-checkbox-group v-model="workingArea">
        <el-checkbox-button v-for="area in workingAreas" :key="area" :value="area">
          {{ area }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <ElRow :gutter="20">
      <ElCol v-show="workingArea.includes('题面')" :span="12">
        <ElCard class="box-card">
          <div class="section">
            <div class="title">
              <h5>题目</h5>
              <div>
                <FPSImport @import-fps="handleImportFPS" />
                <ElButton v-if="problemId !== 0" type="info" :icon="Refresh" @click="reset" style="margin-left: 10px;">
                  重置
                </ElButton>
              </div>
            </div>
            <ElInput v-model="problem.title"></ElInput>
          </div>
          <div class="section">
            <h2>题目描述</h2>
            <ElInput v-model="problem.description" type="textarea" resize="none"
              :autosize="{ minRows: 5, maxRows: 10 }">
            </ElInput>
          </div>
          <div class="section">
            <h2>输入格式</h2>
            <ElInput v-model="problem.input" type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 6 }">
            </ElInput>
          </div>
          <div class="section">
            <h2>输出格式</h2>
            <ElInput v-model="problem.output" type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 6 }">
            </ElInput>
          </div>
          <div class="section">
            <h2>输入输出样例</h2>
            <div class="example">
              <div class="example-input">
                <h3>输入</h3>
                <ElInput v-model="problem.sample_input" type="textarea" resize="none"
                  :autosize="{ minRows: 4, maxRows: 6 }">
                </ElInput>
              </div>
              <div class="example-output">
                <h3>输出</h3>
                <ElInput v-model="problem.sample_output" type="textarea" resize="none"
                  :autosize="{ minRows: 4, maxRows: 6 }">
                </ElInput>
              </div>
            </div>
          </div>
          <div class="section">
            <h2>提示</h2>
            <ElInput v-model="problem.hint" type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 6 }">
            </ElInput>
          </div>
        </ElCard>
      </ElCol>
      <ElCol v-show="workingArea.includes('数据')" :span="12">
        <div style="display: flex; justify-content: space-between; gap:20px;">
          <ElCard class="box-card" style="width: 50%;">
            <div style="display: flex; flex-direction: column; gap:10px">
              <div style="display: flex; justify-content: flex-start; gap:10px;">
                <ElText size="large" tag="b">题目ID</ElText>
                <ElInput v-model="problemId" :disabled="true" style="width: 40%;" />
                <router-link v-show="problemId" type="primary" :to="'/problem/' + problemId">跳转到该题</router-link>
              </div>
              <div style="display: flex; justify-content: flex-start; gap:10px;">
                <ElText size="large" tag="b">时间限制</ElText>
                <ElInputNumber v-model="problem.time_limit" label="时间限制" :precision="2" :min="0" :max="10000"
                  :step="0.5">
                  <template #suffix>
                    <span>s</span>
                  </template>
                </ElInputNumber>
              </div>
              <div style="display: flex; justify-content: flex-start; gap:10px;">
                <ElText size="large" tag="b">内存限制</ElText>
                <ElInputNumber v-model="memoryLimitMB" label="内存限制" :min="0" :max="1000000" :step="10">
                  <template #suffix>
                    <span>MB</span>
                  </template>
                </ElInputNumber>
              </div>
              <div style="display: flex; justify-content: flex-start; gap:10px;">
                <ElText size="large" tag="b">来源</ElText>
                <ElInput v-model="problem.source" style="width: 40%;" />
              </div>
              <div style="display: flex; justify-content: space-between;">
                <ProblemDifficultySelect v-model:model-value="problem.difficulty" style="width: 40%;" />
                <ProblemStatusSelect v-model:model-value="problem.status" style="width: 40%;" />
              </div>
              <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
                <ElTooltip content="创建为新题">
                  <ElButton type="primary" @click="handleUpload">创建</ElButton>
                </ElTooltip>
                <ElTooltip content="更新该题">
                  <ElButton v-if="problemId !== 0" type="primary" @click="handleUpdate">更新</ElButton>
                </ElTooltip>
              </div>
              <ElDivider />
              <ProblemTag tags-size="default" layout="vertical" :remove-flag="true" v-model:tag-ids="tagIds"
                v-model:tags="tags" />
              <div style="display: flex; justify-content: flex-end;">
                <ElButton type="primary" @click="handleUpdateTag">更新标签</ElButton>
              </div>
            </div>
          </ElCard>
          <ElCard class="box-card" style="width: 50%;">
            <ElTabs v-model="activeName">
              <ElTabPane label="测试数据" name="testcase">
                <TestcaseTable v-bind:problem-id="problemId" ref="testTableRef" />
              </ElTabPane>
              <ElTabPane label="题解" name="solution">
                <ProblemSolutionTable v-bind:problem-id="problemId" ref="solutionTableRef" />
              </ElTabPane>
            </ElTabs>
          </ElCard>
        </div>
        <ElCard v-show="activeName === 'testcase'" style="margin-top: 10px;">
          <TestcaseEdit />
        </ElCard>
        <ElCard v-show="activeName === 'testcase'" style="margin-top: 10px;">
          <DataMake v-bind:global="global" />
        </ElCard>
        <ElCard v-show="activeName === 'solution'" style="margin-top: 10px;">
          <ProblemSolutionEdit />
        </ElCard>
        <ElCard style="margin-top: 10px;">
          <div class="debug-title">
            <h4>调试器</h4>
            <ElButton type="primary" @click="handleDebugFlag">{{ debugFlag ? '收起' : '展开' }}</ElButton>
          </div>
          <CodeRun v-show="debugFlag" v-bind:problem="problemId ?? ''" />
        </ElCard>
      </ElCol>
      <ElCol v-show="workingArea.includes('NekoACM')" :span="12">
        <ElCard>
          <ElTabs>
            <ElTabPane label="解析题目">
              <ProblemParse v-model:problem="problem" v-model:tags="tags" />
            </ElTabPane>
            <ElTabPane label="翻译题目">
              <ProblemTranslate v-model:problem="problem" />
            </ElTabPane>
            <ElTabPane label="生成题目">
              <ProblemGenerate v-model:problem="problem" v-model:tags="tags" />
            </ElTabPane>
            <ElTabPane label="生成测试用例">
              <TestcaseGenerate v-model:problem="problem" v-model:tags="tags" />
            </ElTabPane>
            <ElTabPane label="生成题解">
              <SolutionGenerate v-model:problem="problem" v-model:tags="tags" />
            </ElTabPane>
          </ElTabs>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, h, computed } from 'vue';
import { ElInputNumber, ElLink, ElNotification, ElRow, ElTabPane } from 'element-plus';
import { type ProblemInfo, type Testcase, type Global, type Tag, type Solution } from '@/types/Problem';
import { getProblemApi, insertProblemApi, updateProblemApi, problemRemoveTagApi, problemAddTagApi } from '@/apis/problem';
import { useRoute } from 'vue-router';
import TestcaseTable from '@/components/problem/TestcaseTable.vue';
import TestcaseEdit from '@/components/problem/TestcaseEdit.vue';
import ProblemSolutionTable from '@/components/problem/ProblemSolutionTable.vue';
import router from '@/router';
import { Refresh } from '@element-plus/icons-vue';
import ProblemParse from "@/components/problem/ProblemParse.vue";

const workingAreas = ['题面', '数据', 'NekoACM'];
const workingArea = ref(['题面', '数据'])

const { execute: getProblemExecute } = getProblemApi();
const { execute: updateProblemExecute } = updateProblemApi();
const { execute: uploadProblemExecute } = insertProblemApi();
const { execute: problemRemoveTagExecute } = problemRemoveTagApi();
const { execute: problemAddTagExecute } = problemAddTagApi();
const problem = ref<ProblemInfo>({
  title: '',
  description: '',
  input: '',
  output: '',
  sample_input: '',
  sample_output: '',
  hint: '',
  difficulty: 0,
  memory_limit: 131072,
  time_limit: 1,
});

const memoryLimitMB = computed({
  get: () => {
    return (problem.value?.memory_limit ?? 0) / 1024;
  },
  set: (value) => {
    problem.value.memory_limit = value * 1024;
  }
});

const testTableRef = ref<InstanceType<typeof TestcaseTable> | null>(null);
const solutionTableRef = ref<InstanceType<typeof ProblemSolutionTable> | null>(null);
const global = ref<Global>({
  rows: []
});
const route = useRoute();
let problemId = ref<number>(0);

const tagIds = ref<number[]>([]);
const tags = ref<Tag[]>([]);
const oldTagIds = ref<number[]>([]);

const activeName = ref<string>('testcase');

const reset = async () => {
  if (problemId.value === null) {
    ElNotification.error({
      title: '更新失败',
      message: '请先保存题目'
    });
    return;
  }
  await getProblemExecute({
    id: problemId.value,
    params: {
      testcases: true,
      solutions: true,
      detail: true,
    }
  }).then(async (res) => {
    if (res.value) {
      problem.value = res.value;
      oldTagIds.value = res.value.tag_ids || [];
      tagIds.value = oldTagIds.value;
    }
  });
}

onBeforeMount(async () => {
  const idParam = route.query.id;
  if (typeof idParam === 'string') {
    const match = idParam.match(/\d+/);
    if (match) {
      problemId.value = parseInt(match[0], 10);
      await reset();
      if (testTableRef.value) {
        testTableRef.value.refreshTestcases();
      }
      if (solutionTableRef.value) {
        solutionTableRef.value.refreshSolutions();
      }
    }
  } else {
    problem.value.title = route.query.title as string;
    problem.value.description = route.query.description as string;
    problem.value.input = route.query.input as string;
    problem.value.output = route.query.output as string;
    problem.value.sample_input = route.query.sample_input as string;
    problem.value.sample_output = route.query.sample_output as string;
    problem.value.hint = route.query.hint as string;
  }
});

const debugFlag = ref(false);

const handleDebugFlag = () => {
  debugFlag.value = !debugFlag.value;
};

const handleUpdateTag = async () => {
  if (problemId.value) {
    const tagsToRemove = oldTagIds.value.filter(tag => !tags.value.some(newTag => newTag.id === tag));
    const tagsToAdd = tagIds.value.filter(tag => !oldTagIds.value.includes(tag));

    for (const tag of tagsToRemove) {
      if (tag !== undefined) {
        await problemRemoveTagExecute({
          data: {
            problem_id: problemId.value,
            tag_id: tag
          }
        });
      };
    };

    for (const tag of tagsToAdd) {
      if (tag !== undefined) {
        await problemAddTagExecute({
          data: {
            problem_id: problemId.value,
            tag_id: tag
          }
        });
      };
    };

    oldTagIds.value = [...tagIds.value];
    ElNotification.success({
      title: '标签更新成功',
      message: '标签已成功更新'
    });
  }
};

const handleUpload = async () => {
  uploadProblemExecute({
    data: problem.value
  }).then((res) => {
    if (res.value) {
      problemId.value = res.value;
      router.push(`/problem/edit?id=${problemId.value}`);
      ElNotification.success({
        title: '创建成功',
        message: h(ElLink, {
          href: `/problem/${problemId.value}`,
          target: 'primary',
          type: 'primary'
        }, '点击前往查看')
      })
    }
  });
}

const handleUpdate = async () => {
  if (problemId.value === null) {
    ElNotification.error({
      title: '更新失败',
      message: '请先保存题目'
    });
    return;
  }
  problem.value.id = problemId.value;
  updateProblemExecute({
    data: problem.value
  }).then(() => {
    ElNotification.success({
      title: '更新成功',
      message: h(ElLink, {
        href: `/problem/${problemId.value}`,
        target: 'primary',
        type: 'primary'
      }, '点击前往查看')
    })
  });
};

const handleImportFPS = (data: { problem: ProblemInfo, solutions: Solution[], testcases: Testcase[] }) => {
  problem.value = data.problem;
  data.solutions.forEach(solution => {
    solutionTableRef.value?.addExistingSolution(solution);
  });
  data.testcases.forEach(testcase => {
    testTableRef.value?.addExistingTestcase(testcase);
  });
};

</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.debug-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>