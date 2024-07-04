<template>
  <!-- 试听 -->
  <DubbingButton
    title="试听"
    content="划选内容或点击光标，开始逐句试听"
    icon="play"
    @click="handleTryListening"
  />
</template>

<script setup>
import { DubbingButton } from "@/components";
import { ElMessage } from "element-plus";

// 试听
const handleTryListening = () => {
  ElMessage({
    message: "提示",
    type: "warning",
  });
};
</script>

<style lang="scss" scoped></style>
