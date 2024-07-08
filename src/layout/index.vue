<template>
  <div class="common-layout">
    <Header></Header>
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { Header, Footer } from "./components";
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;

  .header {
    height: 60px;
  }

  .footer {
    height: 40px;
  }

  .content {
    padding: 4px 6px;
    display: flex;
    height: calc(100vh - 100px);
  }
}
</style>
