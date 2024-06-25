<template>
  <el-container>
    <el-main>
      <h2>用户登录</h2>
      <el-form
        label-width="auto"
        style="max-width: 600px"
        :model="form"
        :rules="formRules"
      >
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const username = ref("");
const password = ref("");
const form = reactive({
  username: "",
  password: "",
});

const formRules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
};
</script>

<style scoped>
.el-main {
  margin-top: 50px;
}
</style>
