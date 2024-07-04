<template>
  <el-header class="header">
    <div class="menu-container">
      <Logo></Logo>
      <el-menu
        :default-active="0"
        class="menu-list"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item :index="0">
          <router-link to="/dubbing" :key="0">开始配音</router-link>
        </el-menu-item>
        <el-menu-item :index="1">
          <router-link to="/member" :key="2">购买会员</router-link>
        </el-menu-item>
        <el-menu-item class="contact-item" :index="2">
          联系我们
          <div class="contact-image">
            <img src="../../../assets/images/微信名片.JPG" alt="微信名片" />
          </div>
        </el-menu-item>
        <div class="flex-grow" />
      </el-menu>
    </div>
    <div class="login-container">
      <el-button type="primary" class="login" link v-if="isLogin">
        <router-link to="/login">登录</router-link>
      </el-button>
      <el-button type="primary" class="login" link size="large" v-if="isLogin">
        <router-link to="/register">注册</router-link>
      </el-button>

      <el-dropdown style="margin-top: 25px" v-else>
        <el-avatar
          :size="50"
          src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <LoginOrRegister :show="loginOrRegisterDialogShow"></LoginOrRegister>
  </el-header>
</template>

<script setup>
import { ref } from "vue";
import Logo from "./Logo.vue";
import LoginOrRegister from "./LoginOrRegister.vue";

// 是否为登录状态
const isLogin = ref(true);
const activeIndex = ref(0);
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

// 用户登录弹窗
const loginOrRegisterDialogShow = ref(false);
const handleUserLogin = () => {
  loginOrRegisterDialogShow.value = true;
};

const menus = [
  {
    path: "/dubbing",
    name: "开始配音",
  },
  {
    path: "/member",
    name: "购买会员",
  },
  {
    path: "/contact",
    name: "联系我们",
  },
];
</script>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid #dcdfe6;

  .menu-container {
    display: flex;

    .logo {
    }

    .menu-list {
      height: 60px !important;
      margin-left: 15px;

      .contact-item {
        position: relative;

        &:hover .contact-image {
          display: block;
        }

        .contact-image {
          position: absolute;
          display: none;
          width: 200px;
          height: auto;
          top: 60px;
          left: -50%;
          z-index: 999;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .login-container {
    display: flex;
    align-items: center;

    .login {
      cursor: pointer;
      user-select: none;
      align-self: center;
    }

    .el-avatar {
      margin-right: 10px;
    }
  }
}
</style>
