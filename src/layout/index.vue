<template>
  <div class="common-layout">
    <Header />
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { Header, Footer } from "./components";
</script>

<style scoped lang="scss">
.common-layout {
  // height: 100vh;

  .content {
    padding: 4px 6px;
    display: flex;
    height: calc(100vh - 100px);
  }
}
</style>
