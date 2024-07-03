<template>
  <div class="login-container">
    <el-card class="card">
      <div class="show-image">
        <img src="" alt="">
      </div>
      <div>
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
                placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item size="large">
            <el-input
                :prefix-icon="Key"
                v-model="loginForm.code"
                placeholder="请输入验证码"
            >
              <template #append>
                <div class="login-code" @click="getCaptcha">
                  <img
                      :src="imgSrc"
                      class="login-code-img">
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button
                type="primary"
                class="full-width"
                @click="login"
            >
              登录
            </el-button>
            <el-button type="primary" class="full-width" @click="register">
              注册
            </el-button>
          </el-form-item>
          <el-form-item size="large">
            <div class="footer-container">
              <div class="register-now">
                还没有账号？<a href="" @click.prevent="register">立即注册</a>
              </div>
              <div class="login-protocol">
                登录即同意
                <a href="" @click.prevent="userProtocol">《用户服务协议》</a>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {ref, reactive, watch, computed, defineProps, onMounted} from "vue";
import {ElMessage} from "element-plus";
import {User, Lock, Key} from "@element-plus/icons-vue";
import {useRoute, useRouter} from 'vue-router';
import {login as LoginAPI, getCodeImg} from "@/api/login.js";

const route = useRoute();
const router = useRouter();

const userProtocol = () => {
  ElMessage("用户协议");
};

onMounted(() => {
  getCaptcha();
})

// 获取验证码
const imgSrc = ref("");
const getCaptcha = () => {
  getCodeImg().then(res => {
    imgSrc.value = "data:image" + res.data
  });
}

const props = defineProps({
  show: Boolean
});

const dialogShow = ref(props.show);
watch(
    () => props.show,
    (newValue) => {
      dialogShow.value = newValue;
    }
);

const isLogin = ref(true);

const handleLogin = () => {
  isLogin.value = true;
};

const handleRegister = () => {
  isLogin.value = false;
};

const login = () => {
  ElMessage("登录");
  LoginAPI(loginForm).then(res => {

  })
};

const loginForm = reactive({
  username: "",
  password: "",
  code: "",
  uuid: ""
});

const formRules = {
  username: [{required: true, message: "请输入用户名", trigger: "blur"}],
  password: [{required: true, message: "请输入密码", trigger: "blur"}],
  code: [{required: true, message: "请输入验证码", trigger: "blur"}],
};

const register = () => {
  console.log(router)
  router.push({
    name: 'register',
    query: {},
  });
};

// TabBar
const userLoginActiveName = ref("login");
const handleUserLoginTabClick = (tab, event) => {
  console.log(tab, event);
};

</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  //background-image: url("@/assets/images/微信名片.JPG");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  background-color: red;

  .el-card {
    width: 500px;


    .el-card__body {
      display: flex;
      justify-content: start;
      flex-direction: row;

      .show-image {
        width: 200px;
        height: 100%;
        background-color: blue;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }


    .title {
      margin-bottom: 10px;
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
