<template>
  <!-- 生成配音 -->
  <DubbingButton
    title="生成配音"
    content="从光标处开始试听"
    icon="genarator"
    @click="handleClicked"
  />
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
import { ElMessage } from "element-plus";

const handleClicked = () => {
  ElMessage({
    message: "生成配音",
  });
};
</script>

<style lang="scss" scoped></style>
