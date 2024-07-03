<template>
  <DubbingList></DubbingList>
  <DubbingEdit></DubbingEdit>
</template>

<script setup lang="ts">
import { DubbingEdit, DubbingList } from "./components";
</script>

<style scoped lang="scss">
.dubbing-list {
  border: 1px solid #e6e8e8;
  width: 320px !important;
}

.dubbing-edit {
  border: 1px solid #e6e8e8;
  margin-left: 4px;
  width: 100%;
}
</style>
