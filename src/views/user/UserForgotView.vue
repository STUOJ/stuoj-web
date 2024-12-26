<script setup lang="ts">
import type { RegisterReq } from '@/types/User';
import { ref } from "vue";

const req = ref<RegisterReq>({ username: '', email: '', password: '', phone: '' });
</script>

<template>
  <el-container>
    <el-main>
      <el-row justify="space-around">
        <el-col :span="12">
          <el-card>
            <h1>找回密码</h1>
            <br />
            <el-form :model="req" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="req.username" />
              </el-form-item>
              <el-form-item label="手机号">
                <el-input type="tel" v-model="req.phone" disabled />
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input type="email" v-model="req.email" />
              </el-form-item>
              <el-form-item>
                <router-link to="/user/login"><el-button>登录</el-button></router-link>
                &nbsp;&nbsp;
                <router-link to="/user/register"><el-button>注册</el-button></router-link>
                &nbsp;&nbsp;
                <el-button type="primary" @click="" disabled>找回密码！</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped></style>