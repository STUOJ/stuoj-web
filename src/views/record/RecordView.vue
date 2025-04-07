<template>
  <div class="container-main">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/record' }">记录</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/problem/' + record?.problem.id }">{{ record?.problem.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ recordId }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <br />
    <ElRow :gutter="20">
      <ElCol :span="16">
        <ElCard>
          <div class="problem-title">
            <router-link :to="{ path: '/problem/' + record?.problem.id }">
              <h1>[P{{ record?.problem.id }}] {{ record?.problem.title }}</h1>
            </router-link>
          </div>
          <el-divider></el-divider>
          <div class="record-info">
            <JudgementsTable :judge_result="judgements" />
            <TextView v-show="record?.source_code"
                      :content="'\`\`\`\n' + (record?.source_code || '') + '\n\n\`\`\`'" />
          </div>
        </ElCard>
      </ElCol>
      <ElCol :span="8">
        <el-card>
          <AvatarInfo v-if="record" :user-id="record?.user.id" :size="50" :name-size="20" name :popover="false" />
          <br/>
          <div class="record-info">
            <div class="record-info-item">题目
              <ProblemName :problem="record?.problem" :size="16" />
            </div>
            <div class="record-info-item">语言
              <ElTooltip
                  :content="languages.find((lang: Language) => lang.id === record?.language_id)?.name || 'Unknown'">
                {{ languages.find((lang: Language) => lang.id ===
                  record?.language_id)?.name || 'Unknown' }}
              </ElTooltip>
            </div>
            <div class="record-info-item">状态
              <RecordTag :status="record?.status || JudgeStatus.Unknown" />
            </div>
            <div class="record-info-item">得分
              <ScoreShow :score="record?.score" :status="record?.status" :size="16" />
            </div>
            <div class="record-info-item">耗时
              <span>{{ record?.time }} s</span>
            </div>
            <div class="record-info-item">内存
              <span>{{ record?.memory }} KB</span>
            </div>
            <div class="record-info-item">提交时间
              <span>{{ formatDateTimeStr(record?.create_time) }}</span>
            </div>
          </div>
        </el-card>
      </ElCol>
    </ElRow>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getRecordInfoApi } from '@/apis/record';
import { onBeforeMount, ref } from 'vue';
import type { Judgement, Submission } from '@/types/Record';
import { langStore } from '@/stores/language';
import type { Language } from '@/types/Judge';
import {formatDateTimeStr, formatDateStr} from '@/utils/date';
import { JudgeStatus } from '@/types/Judge';
import {Difficulty, DifficultyColor, DifficultyMap} from "@/types/Problem";
import {Notebook, StarFilled} from "@element-plus/icons-vue";

const { execute } = getRecordInfoApi();

const { getLanguages } = langStore();
const languages = ref<Language[]>([]);

const route = useRoute();
const recordId = route.params.id as string;

const record = ref<Submission>();
const judgements = ref<Judgement[]>([]);

onBeforeMount(async () => {
  getLanguages().then((res) => {
    if (res.value) {
      languages.value = res.value;
    }
  });
  await execute({
    id: parseInt(recordId, 10),
  }).then((res) => {
    if (!res.value) {
      return;
    }
    record.value = res.value.submission;
    judgements.value = res.value.judgements;
    document.title = `${record.value.problem.title} - 记录 ${record.value.id} - JFOJ`;
  });
});
</script>

<style scoped>
.record-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* 添加间隙 */
}

.record-info-item {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  font-size: 16px;
}
</style>