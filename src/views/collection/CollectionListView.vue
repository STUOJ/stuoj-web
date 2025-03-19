<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Operation } from '@element-plus/icons-vue';
import { CollectionStatus, CollectionStatusMap } from '@/types/Collection';
import TagSelect from '@/components/TagSelect.vue';
import TimeSelect from '@/components/form/TimeSelect.vue';
import OrderSelect from '@/components/OrderSelect.vue';
import { formatDate } from '@/utils/date';
import AvatarInfo from '@/components/user/AvatarInfo.vue';
import type { CollectionInfo, CollectionParams } from '@/types/Collection';
import { getCollectionListApi } from '@/apis/collection';
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElPagination } from 'element-plus';
import { OrderBy } from '@/types/misc';

const { execute } = getCollectionListApi();

// 筛选参数
const paramsSelect = ref<CollectionParams>({
  page: 1,
  size: 20,
  title: '',
  status: '',
  "start-time": '',
  "end-time": ''
});

// 分页参数
const paramsPage = ref({
  page: 1,
  size: 20
});

// 合并参数
const params = ref<CollectionParams>({
  ...paramsSelect.value,
  ...paramsPage.value
});

const collections = ref<CollectionInfo[]>([]);
const collectionPage = ref<any>();

onMounted(() => {
  handleQuery();
});

const showCard = ref(true);
const startTimeRef = ref<InstanceType<typeof TimeSelect>>();
const endTimeRef = ref<InstanceType<typeof TimeSelect>>();
const orderRef = ref<InstanceType<typeof OrderSelect>>();
const statusTagSelectRef = ref<InstanceType<typeof TagSelect>>();

const handleReset = () => {
  paramsSelect.value = {
    page: 1,
    size: 20,
    title: '',
    status: '',
    "start-time": '',
    "end-time": ''
  };
  startTimeRef.value?.reset();
  endTimeRef.value?.reset();
  orderRef.value?.reset();
  statusTagSelectRef.value?.reset();
};

const handleQuery = async () => {
  params.value = {
    ...paramsSelect.value,
    page: paramsPage.value.page,
    size: paramsPage.value.size
  };

  await execute({ params: params.value }).then(res => {
    collections.value = res.value?.collections || [];
    collectionPage.value = res.value;
  });
};
</script>

<template>
  <div class="container-main">

    <ElCard v-show="showCard" style="margin-bottom: 5px;">
      <ElForm :model="paramsSelect">
        <ElFormItem :inline="true">
          <ElInput class="form-item-input" v-model="paramsSelect.title" placeholder="题单标题" clearable />
        </ElFormItem>

        <ElFormItem label-position="left" label="创建时间">
          <TimeSelect ref="startTimeRef" v-model:time="paramsSelect['start-time']" placeholder="开始时间" margin="1px" />
          <span style="margin: 0 10px;">-</span>
          <TimeSelect ref="endTimeRef" v-model:time="paramsSelect['end-time']" placeholder="结束时间" margin="1px" />
        </ElFormItem>

        <ElFormItem label-position="left" label="状态">
          <TagSelect v-model:arr-str="paramsSelect.status" :str-map="CollectionStatusMap" />
        </ElFormItem>

        <ElFormItem>
          <OrderSelect v-model:order-by="paramsSelect.order_by" v-model:order="paramsSelect.order"
            :exclude="[OrderBy.blog, OrderBy.user, OrderBy.status, OrderBy.problem]" />
        </ElFormItem>

        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </ElForm>
    </ElCard>

    <br />

    <ElCard>
      <div v-if="collections.length === 0" class="empty-tip">暂无题单数据</div>

      <div v-else class="collection-list">
        <div v-for="collection in collections" :key="collection.id" class="collection-item">
          <router-link :to="'/collection/' + collection.id">
            <div class="header">
              <div class="left-section">
                <el-tag :type="collection.status === CollectionStatus.Public ? 'success' : 'info'" size="small">
                  {{ collection.status === CollectionStatus.Public ? '公开' : '私有' }}
                </el-tag>
                <h3 class="title">{{ collection.title }}</h3>
                <div class="meta-info">
                  <span class="time">创建：{{ formatDate(new Date(collection.create_time)) }}</span>
                  <span class="time">修改：{{ formatDate(new Date(collection.update_time)) }}</span>
                  <span class="count">{{ collection.problem_ids?.length || 0 }}题</span>
                </div>
                <p class="description">{{ collection.description || '暂无描述' }}</p>
              </div>
              <div class="right-section">
                <AvatarInfo :user="collection.user" name :size="40" vertical />
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <ElPagination class="pagination" v-model:current-page="paramsPage.page" v-model:page-size="paramsPage.size"
        :page-sizes="[10, 20, 50, 100]" :background="true" layout="total, sizes, prev, pager, next, jumper"
        :total="collectionPage?.total" @size-change="handleQuery" @current-change="handleQuery" />
    </ElCard>
  </div>
</template>

<style scoped>
.empty-tip {
  text-align: center;
  color: #999;
  padding: 20px;
}

.collection-list {
  display: grid;
  gap: 16px;
}

.collection-item {
  padding: 16px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  transition: box-shadow 0.2s;
}

.collection-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.description {
  color: #666;
  margin: 8px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.left-section {
  flex: 1;
}

.right-section {
  flex-shrink: 0;
  text-align: right;
}

.el-tag {
  margin-bottom: 8px;
}

.title {
  margin: 0 0 6px;
  font-size: 1.2em;
  color: var(--el-text-color-primary);
}

.meta-info {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  color: var(--el-text-color-secondary);
  font-size: 0.85em;
}

.meta-info .time {
  color: var(--el-text-color-regular);
}

.meta-info .count {
  color: var(--el-color-primary);
  font-weight: 500;
}

.description {
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  margin: 0;
}

.pagination {
  margin-top: 20px;
  justify-content: flex-start;
}
</style>
