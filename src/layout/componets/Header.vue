<template>
  <el-container>
    <el-header class="header">
      <Logo></Logo>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0"> </el-menu-item>
        <el-menu-item :index="menu.name" v-for="menu in menus" :key="menu.name">
          <router-link :to="menu.path">{{ menu.name }}</router-link>
        </el-menu-item>
        <div class="flex-grow" />
        <el-dropdown style="margin-top: 25px">
          <!-- <el-button type="primary"> -->
          <el-avatar
            :size="50"
            src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
          />
          <!-- </el-button> -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script  setup lang="ts">
import { ref } from "vue";
import Logo from "./Logo.vue";

const activeIndex = ref("首页");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const menus = [
  {
    path: "/index",
    name: "首页",
  },
  {
    path: "/dubbing",
    name: "开始配音",
  },
  {
    path: "/multiple",
    name: "多人配音",
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
.header {
  display: flex;
  flex-direction: row;
}

.el-menu-demo {
  height: 60px !important;
}

.flex-grow {
  flex-grow: 1;
}
</style>