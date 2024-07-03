<template>
  <div class="dubbing-edit">
    <DubbingHeader></DubbingHeader>
    <div class="dubbing-content">
      <DubbingEditor></DubbingEditor>
      <DubbingSidebar></DubbingSidebar>
    </div>
    <DubbingFooter></DubbingFooter>
  </div>
</template>

<script setup lang="ts">
import DubbingHeader from "./DubbingHeader.vue";
import DubbingEditor from "./DubbingEditor.vue";
import DubbingSidebar from "./DubbingSidebar.vue";
import DubbingFooter from "./DubbingFooter.vue";
</script>

<style lang="scss" scoped>
.dubbing-edit {
  width: 100%;

  .dubbing-header {
    height: 60px;
  }

  .dubbing-content {
    height: calc(100% - 160px);
    display: flex;

    .dubbing-editor {
      height: 100%;
      width: calc(100% - 60px);
    }

    .dubbing-sidebar {
      height: 100%;
      width: 80px;
      padding: 10px;
    }
  }
  .dubbing-footer {
    height: 100px;
  }
}
</style>
