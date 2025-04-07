<template>
  <div class="container-main">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/problem' }">题库</el-breadcrumb-item>
        <el-breadcrumb-item>{{ problemInfo?.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <br />
    <ElRow :gutter="20">
      <ElCol :span="18">
        <ElCard shadow="always">
          <div class="problem-title">
            <h1>[P{{ problemInfo.id }}] {{ problemInfo.title }}</h1>
            <div>
              <el-icon>
                <DocumentAdd />
              </el-icon>
              &nbsp;{{ formatDateStr(problemInfo?.create_time ?? "") }}
              <el-divider direction="vertical"></el-divider>
              <el-icon>
                <Edit />
              </el-icon>
              &nbsp;{{ formatDateStr(problemInfo?.update_time ?? "") }}
            </div>
          </div>
          <el-divider></el-divider>
          <div class="problem-content">
            <h3 class="weight">描述</h3>
            <TextView :content="problemInfo.description ?? ''" />
          </div>
          <div class="problem-input">
            <h3 class="weight">输入格式</h3>
            <TextView :content="problemInfo.input ?? ''" />
          </div>
          <div class="problem-output">
            <h3 class="weight">输出格式</h3>
            <TextView :content="problemInfo.output ?? ''" />
          </div>
          <div class="problem-sample">
            <h3 class="weight">输入样例</h3>
            <div class="problem-sample-input sample-box">
              {{ problemInfo.sample_input }}
            </div>
            <h3 class="weight">输出样例</h3>
            <div class="problem-sample-output sample-box">
              {{ problemInfo.sample_output }}
            </div>
          </div>
          <div class="problem-hint">
            <h3 class="weight">提示</h3>
            <TextView :content="problemInfo.hint ?? ''" />
          </div>
        </ElCard>
        <br />
        <el-card>
          <CodeRun v-if="problemInfo.id" :problem="problemId" :input_text="problemInfo.sample_input"
            :lang-id="record?.language_id" :source_text="record?.source_code" />
        </el-card>
      </ElCol>
      <ElCol :span="6">
        <ElCard shadow="always">
          <template #header>
            <strong>题目信息</strong>
          </template>
          <div class="problem-info">
            <div class="problem-info-item">
              <span>题目来源</span>
            </div>
            <span v-if="problemInfo.source">{{ problemInfo.source }}</span>
            <div class="problem-info-item">
              <span>题目难度</span>
              <el-tag :color="DifficultyColor[problemInfo.difficulty as Difficulty]" style="color: white">
                {{ DifficultyMap[problemInfo.difficulty as Difficulty] }}
              </el-tag>
            </div>
            <div class="problem-info-item">
              <span>时间限制</span>
              <span>{{ problemInfo.time_limit }} s</span>
            </div>
            <div class="problem-info-item">
              <span>内存限制</span>
              <span>{{ ((problemInfo.memory_limit ?? 0) / 1024).toFixed(2) }} MB</span>
            </div>
            <div class="problem-info-item">
              <span>题目标签</span>
              <span>
                <ElButton size="small" @click="toggleTagsVisibility" :icon="tagsFlag ? 'View' : 'Hide'" />
              </span>
            </div>
            <div class="problem-info-item" v-if="tagsFlag">
              <ProblemTagShow :tag-ids="problemInfo.tag_ids ?? []" />
            </div>
          </div>
          <br />
          <div>
            <el-button>
              <a :href="`/record?problem=${problemInfo.id}`">
                <el-icon>
                  <List />
                </el-icon>&nbsp;提交记录
              </a>
            </el-button>
            <el-button disabled><el-icon>
                <StarFilled />
              </el-icon>&nbsp;收藏</el-button>
          </div>
          <div v-if="problemInfo.has_user_submission" class="problem-info-item" style="margin-top: 10px;">
            <span>历史最高分数</span>
            <ScoreShow :score="problemInfo.user_score ?? 0"
              :status="problemInfo.user_score === 100 ? JudgeStatus.Accepted : JudgeStatus.WrongAnswer" />
          </div>
        </ElCard>
        <ElCard shadow="always" style="margin-top: 20px;">
          <template #header>
            <div style="display:flex;justify-content:space-between;">
              <strong>前三AC用户</strong>
              <ElButton type="primary" @click="toggleACUserVisibility">{{ ACUserFlag ? '收起' : '展开' }}</ElButton>
            </div>
          </template>
          <div v-if="ACUserFlag" class="avatar-container">
            <AvatarInfo v-if="ACUsers.length > 0" v-for="(user) in ACUsers" :key="user.id" :user="user" />
            <div v-else>暂无AC用户，快来成为第一个切题的人吧</div>
          </div>
        </ElCard>
        <ElCard shadow="always" style="margin-top: 20px;">
          <template #header>
            <div style="display:flex;justify-content:space-between;">
              <strong>题目编辑者</strong>
              <ElButton type="primary" @click="toggleEditUserVisibility">{{ editUserFlag ? '收起' : '展开' }}</ElButton>
            </div>
          </template>
          <div v-if="editUserFlag" class="avatar-container">
            <AvatarInfo v-for="(user) in problemInfo.user_ids" :key="user" :user-id="user" />
          </div>
        </ElCard>
        <ElCard shadow="always" style="margin-top: 20px;">
          <template #header>
            <div style="display:flex;justify-content:space-between;">
              <strong>相关博客</strong>
              <ElButton type="primary" @click="toggleBlogsVisibility">{{ blogsFlag ? '收起' : '展开' }}</ElButton>
            </div>
          </template>
          <div class="problem-info" v-if="blogsFlag">
            <ul v-if="blogs.length !== 0">
              <li v-for="blog in blogs" :key="blog.id">
                <a :href="`/blog/${blog.id}`">{{ blog.title }}</a>
              </li>
            </ul>
            <span v-else style="text-align: center">暂无相关博客<br /><br /></span>
            <div style="display:flex;justify-content: space-between;">
              <ElButton type="primary" @click="toEditBlog">写篇博客</ElButton>
              <ElButton @click="toQueryBlog">查看更多</ElButton>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Difficulty, DifficultyColor, type ProblemInfo } from "@/types/Problem";
import { useRouteParams } from "@vueuse/router";
import { getProblemApi } from "@/apis/problem";
import { DifficultyMap } from "@/types/Problem";
import { formatDateStr } from "@/utils/date";
import { DocumentAdd, Notebook, StarFilled } from "@element-plus/icons-vue";
import { getRecordListApi, getAcUserApi } from "@/apis/record";
import type { Submission } from "@/types/Record";
import { OrderBy } from "@/types/misc";
import { userStore } from "@/stores/user";
import { getBlogListApi } from "@/apis/blog";
import { ElButton } from "element-plus";
import type { BlogInfo } from "@/types/Blog";
import { JudgeStatus } from "@/types/Judge";
import type { UserInfo } from "@/types/User";

const problemId = useRouteParams<number>("id");

const { id } = userStore();

const { state, execute } = getProblemApi();
const { execute: recordExecute } = getRecordListApi();
const { execute: acUserExecute } = getAcUserApi();
const { execute: blogExecute } = getBlogListApi();

const problemInfo = ref<ProblemInfo>({} as ProblemInfo);

const record = ref<Submission>();

const tagsFlag = ref<boolean>(false);

const toggleTagsVisibility = () => {
  tagsFlag.value = !tagsFlag.value;
};

const toggleEditUserVisibility = () => {
  editUserFlag.value = !editUserFlag.value;
};

const editUserFlag = ref<boolean>(false);

const blogsFlag = ref<boolean>(false);
const isBlogsFetched = ref<boolean>(false);
const toggleBlogsVisibility = () => {
  blogsFlag.value = !blogsFlag.value;
  if (isBlogsFetched.value)
    return;
  isBlogsFetched.value = true;
  blogExecute({
    params: {
      problem: problemId.value,
      page: 1,
      size: 3,
      order: "desc",
      order_by: OrderBy.create_time
    }
  }).then((res) => {
    blogs.value = res.value?.blogs ?? [];
  });
};

const ACUserFlag = ref<boolean>(false);
const isUsersFetched = ref<boolean>(false);

const ACUsers = ref<UserInfo[]>([]);

const toggleACUserVisibility = () => {
  ACUserFlag.value = !ACUserFlag.value;
  if (isUsersFetched.value)
    return;
  isUsersFetched.value = true;
  acUserExecute({
    params: {
      problem: problemId.value,
      size: 3,
    }
  }).then((res) => {
    ACUsers.value = res.value ?? [];
  })
};

const blogs = ref<BlogInfo[]>([]);

const toEditBlog = () => {
  window.open(`/blog/edit?problem=${problemId.value}`);
};

const toQueryBlog = () => {
  window.open(`/blog?problem=${problemId.value}`);
};

onMounted(async () => {
  await recordExecute({
    params: {
      user: String(id.value),
      problem: String(problemId.value),
      page: 1,
      size: 1,
      order: "desc",
      order_by: OrderBy.create_time
    }
  }).then((res) => {
    record.value = res.value?.submissions[0];
  }).finally(async () => {

    await execute({
      id: problemId.value,
      params: {
        detail: true,
      }
    });
    if (state.value) {
      problemInfo.value = state.value;
      document.title = `[P${problemInfo.value.id}] ${problemInfo.value.title} - 题目 - JFOJ`;
    }
  });
});
</script>

<style scoped>
.problem-title,
.problem-content,
.problem-input,
.problem-output,
.problem-sample,
.problem-hint {
  text-align: left;
  margin-bottom: 20px;
}

.weight {
  font-weight: bold;
}

.problem-sample-input,
.problem-sample-output {
  display: block;
  font-size: 13px;
}

.problem-output,
.problem-sample {
  white-space: pre-wrap;
}

.sample-box {
  border: 1px solid #ccc;
  /* 边框颜色 */
  padding: 10px;
  /* 内边距 */
  border-radius: 5px;
  /* 圆角 */
  background-color: #f9f9f9;
  /* 背景颜色 */
  margin-bottom: 20px;
  /* 底部外边距 */
}

.problem-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.problem-info-item {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  font-size: 16px;
}

.avatar-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>