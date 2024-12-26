<template>
    <ElButton plain :icon="Edit" @click="showDialog()">
        修改
    </ElButton>
    <ElDialog title="修改个人信息" :visible.sync="tagDialogVisible" width="30%"
        :before-close="() => (tagDialogVisible = false)">
        <ElForm ref="formRef" :model="info" label-width="80px">
            <ElFormItem label="头像">
                <ElAvatar :src="info.avatar" :size="50" @click="selectFile" />
                <!-- <AvatarCropper ref="avatarCropper" @crop-finish="onCropFinish" /> -->
            </ElFormItem>
            <ElFormItem label="用户名">{{ info.username }}</ElFormItem>
            <ElFormItem label="邮箱">{{ info.email }}</ElFormItem>
            <ElFormItem label="个性签名">
                <ElInput v-model="info.signature" />
            </ElFormItem>
            <ElFormItem>
                <ElButton @click="tagDialogVisible = false">取消</ElButton>
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" @click="updateInfo">
                    提交
                </ElButton>
            </ElFormItem>
        </ElForm>
    </ElDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElButton, ElDialog } from 'element-plus';
import { Edit } from '@element-plus/icons-vue';
import { userStore } from '@/stores/user';
import { GetUserInfo } from '@/apis/user';
import { UploadAvatar } from '@/apis/user';
import { type UserInfo } from '@/types/User';
import AvatarCropper from './AvatarCropper.vue';

const { token } = userStore();
const { execute } = GetUserInfo();
const { execute: uploadAvatarExecute } = UploadAvatar();
const info = ref<UserInfo>({
    id: 0,
    username: '',
    email: '',
    role: 0,
    create_time: '',
    signature: '',
    avatar: '',
    update_time: '',
});

const props = defineProps<{
    id: number;
}>();
const id = ref(0);
const tagDialogVisible = ref(false);
const showDialog = async () => {
    await execute({ id: props.id }).then((res) => {
        if (!res.value) {
            return;
        }
        info.value = res.value;
    });
    tagDialogVisible.value = true;
};

const avatarCropper = ref(null);

const selectFile = async () => {
    // const file = await window.Selection.openFile();
    // if (file) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         avatarCropper.value.openCropper(e.target?.result as string);
    //     };
    //     reader.readAsDataURL(file);
    // }
};

const onCropFinish = (base64: string) => {
    info.value.avatar = base64;
};

const updateInfo = async () => {
    // const avatarBase64 = avatarCropper.value.getCroppedImage();
    // if (avatarBase64) {
    //     await uploadAvatarExecute({ avatar: avatarBase64 });
    // }
    // ...existing code...
};


</script>