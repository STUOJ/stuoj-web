<script setup lang="ts">

</script>

<template>
  <div class="container-full">
  <el-container>
    <el-aside width="200px">
      <AdminMenu></AdminMenu>
    </el-aside>
    <el-main>
      <el-row justify="space-between">
        <el-col :span="4">
          <strong>控制面板</strong>
        </el-col>
        <el-col :span="20" style="text-align: right">
<!--          <el-button type="primary" @click="handleCreate">创建用户</el-button>-->
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-card>
        <h2>欢迎使用 疾风OJ ！</h2>
        <p>
          JFOJ 是一款 ACM-ICPC 算法程序在线评测系统，基于 Go 语言和 Gin 框架开发。用户可以在平台上阅读算法题目，并可提交代码到代码沙箱进行评测，评测完成后系统将返回评测结果。管理员可以管理用户、导入题目、修改评测点数据、管理提交记录、查询系统统计数据和修改系统设置。JFOJ 也是一款基于AI大模型的ACM-ICPC算法题目自动出题OJ系统，提供自动出题、生成测试数据和题解代码、题目格式解析、题目国际化翻译等功能。
        </p>
      </el-card>
    </el-main>
  </el-container>
  </div>
</template>

<style scoped>

</style>
