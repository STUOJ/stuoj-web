<template>
    <ElContainer style="width: 100%; justify-content: center;" direction="vertical">
        <ElForm :model="req" label-width="auto">
            <ElFormItem label="Email" :label-position="itemLabelPosition">
                <ElInput v-model="req.email" />
            </ElFormItem>
            <ElFormItem label="Password" :label-position="itemLabelPosition">
                <ElInput v-model="req.password" type="password" />
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" @click="handleLogin" style="width: 100%;">
                    Login
                </ElButton>
            </ElFormItem>
        </ElForm>
        <ElButton type="primary" @click="handleRegister_" link>Register</ElButton>
    </ElContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LoginApi } from '@/apis/auth';
import type { LoginReq } from '@/types/User';
import { userStore } from '@/stores/user'
import { ElNotification, type FormItemProps } from 'element-plus';
import router from '@/router';

const req = ref<LoginReq>({ email: '', password: '' });
const itemLabelPosition = ref<FormItemProps['labelPosition']>('right')
const { updateToken, getUserInfo } = userStore();

const handleLogin = async () => {
    const { execute } = LoginApi();
    const state = await execute({
        data: {
            email: req.value.email,
            password: req.value.password
        }
    })
    if (state.value) {
        updateToken(state.value);
        ElNotification({
            title: "登录成功",
            type: "success"
        });
        router.push({ name: 'home' }).then(() => {
            window.location.reload();
        });
    }
};

const handleRegister_ = () => {
    router.push({ path: '/register' });
};

onMounted(() => {
});

</script>