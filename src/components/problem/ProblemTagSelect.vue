<template>
    <ElButton style="width: 60px;" plain @click="showDialog()">
        标签
    </ElButton>
    <ElDialog v-model="tagDialogVisible">
        <template #header>
            <div class="my-header">
                <el-button type="danger" @click="reset()">
                    <el-icon class="el-icon--left">
                        <CircleCloseFilled />
                    </el-icon>
                    重置
                </el-button>
            </div>
        </template>
        <div>
            <ElCheckTag class="tag-select" v-for="tag in wsTags" :key="tag.data.id" v-model:checked="tag.checked" :label="tag.data.name">
                {{ tag.data.name }}
            </ElCheckTag>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel()">Cancel</el-button>
                <el-button type="primary" @click="handleConfirm()">
                    Confirm
                </el-button>
            </div>
        </template>
    </ElDialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getProblemTagsApi } from '@/apis/problem';
import type { Tag } from '@/types/Problem';

const props = defineProps<{
    tags: Tag[];
}>();

const emit = defineEmits(['update:tags']);

interface TemTag {
    checked: boolean;
    data: Tag;
}

const tags = ref<Tag[]>(props.tags);
const tagDialogVisible = ref(false);
let wsTags = ref<TemTag[]>([]);
let savedWsTags: TemTag[] | null = null; // 用于保存wsTags状态的变量

const { state, execute } = getProblemTagsApi();

onMounted(async () => {
    await execute();
    if (state.value) {
        wsTags.value = state.value.map((tag: Tag) => ({
            checked: false,
            data: tag
        }));
    }
})

const showDialog = () => {
    tags.value = props.tags;
    if (savedWsTags === null) {
        wsTags.value = wsTags.value.map(tag => ({ ...tag, checked: false }));
        tags.value.forEach(tag => {
            const index = wsTags.value.findIndex(wsTag => wsTag.data.id === tag.id);
            if (index !== -1) {
                wsTags.value[index].checked = true;
            }
        });
        savedWsTags = JSON.parse(JSON.stringify(wsTags.value));
    }
    tagDialogVisible.value = true;
};

const handleConfirm = () => {
    tagDialogVisible.value = false;
    tags.value = wsTags.value.filter(tag => tag.checked).map(tag => tag.data);
    emit('update:tags', tags.value);
    savedWsTags = null; // 确认后清空保存的状态
};

const handleCancel = () => {
    if (savedWsTags !== null) {
        wsTags.value = JSON.parse(JSON.stringify(savedWsTags));
    }
    tagDialogVisible.value = false;
    savedWsTags = null; // 取消后清空保存的状态
};

const reset = () => {
    tags.value = [];
    wsTags.value = wsTags.value.map(tag => ({ ...tag, checked: false }));
};

const resetAndConfirm = () => {
    reset();
    handleConfirm();
};
defineExpose({
    resetAndConfirm,
});
</script>

<style scoped>
.my-header {
    display: flex;
    justify-content: flex-end;
    /* 将内容推到右侧 */
}

.reset-button {
    margin-left: auto;
    /* 确保按钮靠右 */
}
.tag-select{
    margin-left: 5px;
    margin-bottom: 5px;
}
</style>