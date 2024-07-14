<template>
  <div class="login-container">
    <el-card>
      <h2 class="title">用户登录</h2>
      <el-form label-width="auto" :model="loginForm" :rules="formRules">
        <el-form-item size="large">
          <el-input
            :prefix-icon="User"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item size="large">
          <el-input
            :prefix-icon="Lock"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item size="large">
          <div class="login-code">
            <el-input
              :prefix-icon="Key"
              v-model="loginForm.code"
              placeholder="请输入验证码"
            >
            </el-input>
            <div class="login-code-image" @click="handleGetCaptcha">
              <img :src="imgSrc" />
            </div>
          </div>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" style="width: 100%" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
        <el-form-item size="large">
          <div class="footer-container">
            <div class="register-now">
              还没有账号？<a href="" @click.prevent="handleRegister">立即注册</a>
            </div>
            <div class="login-protocol">
              登录即同意
              <a href="" @click.prevent="handleUserProtocol">《用户服务协议》</a>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, defineProps, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { User, Lock, Key } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { login, getCodeImg } from "@/api/login.js";

import { useUserStore } from "@/store/index";
import { setToken } from "@/utils/auth";
const { token } = useUserStore();

const route = useRoute();

const router = useRouter();

const imgSrc = ref("");

const loginForm = reactive({
  username: "",
  password: "",
  code: "",
  uuid: "",
});

const formRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

onMounted(() => {
  handleGetCaptcha();
});

// 登录
const handleLogin = () => {
  login(loginForm).then((res) => {
    setToken(res.token);
    router.push({ path: "/" }).catch(() => {});
  });
};

// 注册
const handleRegister = () => {
  router.push({
    name: "register",
  });
};

// 用户协议
const handleUserProtocol = () => {
  ElMessage("用户协议");
};

// 获取验证码
const handleGetCaptcha = () => {
  getCodeImg().then((res) => {
    imgSrc.value = "data:image/gif;base64," + res.img;
    loginForm.uuid = res.uuid;
  });
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #eee;

  .el-card {
    width: 500px;

    .title {
      margin-bottom: 15px;
    }

    .login-code {
      width: 100%;
      display: flex;
      justify-content: start;

      .login-code-image {
        margin-left: 4px;
        width: 150px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .footer-container {
      display: flex;
      flex-direction: row;
      justify-content: end;

      .login-protocol {
        margin-left: 100px;
      }
    }
  }
}
</style>
