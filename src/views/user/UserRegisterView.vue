<template>
  <el-container>
    <el-main>
      <el-row justify="space-around">
        <el-col :span="12">
          <el-card>
            <h1>用户注册</h1>
            <br />
            <el-form :model="req" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="req.username" />
              </el-form-item>
              <!--
              <el-form-item label="手机">
                <el-input type="tel" v-model="req.phone" disabled />
              </el-form-item>
-->
              <el-form-item label="邮箱">
                <el-input type="email" v-model="req.email" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="req.password" />
              </el-form-item>
              <el-form-item>
                <router-link to="/user/login"><el-button>登录</el-button></router-link>
                &nbsp;&nbsp;
                <el-button type="primary" @click="handleRegister">注册</el-button>
                &nbsp;&nbsp;
                <router-link to="/user/forgot"><el-button>忘记密码？</el-button></router-link>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RegisterApi } from '@/apis/auth';
import type { RegisterReq } from '@/types/User';
import { ElNotification, type FormItemProps } from 'element-plus';
import router from '@/router';

const req = ref<RegisterReq>({ username: '', email: '', password: '', phone: '' });
const itemLabelPosition = ref<FormItemProps['labelPosition']>('right')

const handleRegister = async () => {
  const { execute } = RegisterApi();
  const state = await execute({
    data: {
      username: req.value.username,
      email: req.value.email,
      password: req.value.password
    }
  }).then(() => {
    ElNotification({
      title: '成功',
      message: '注册成功',
      type: 'success',
    });
    router.push('/user/login')
  });
};

onMounted(() => {
});

</script>