<template>
  <!-- 下载配音 -->
  <DubbingButton
    title="下载配音"
    content="从光标处开始试听"
    icon="download"
    @click="handleClicked"
  />
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
import { ElMessage } from "element-plus";

const handleClicked = () => {
  ElMessage({
    message: "下载配音",
  });
};
</script>

<style lang="scss" scoped></style>
