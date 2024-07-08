<template>
  <div class="dubbing">
    <DubbingList />
    <DubbingEditor />
  </div>
</template>

<script setup>
import { DubbingEditor, DubbingList } from "@/components";
</script>

<style scoped lang="scss">
.dubbing {
  height: 100%;
  width: 100%;
  display: flex;

  .dubbing-list {
    width: 580px;
  }

  .dubbing-editor {
    width: 100%;
    height: 100%;
  }
}
</style>
