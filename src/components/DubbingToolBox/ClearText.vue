<template>
  <!-- 一键清空 -->
  <DubbingButton title="一键清空" icon="clear" @click="handleClearText" />
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";

import { ElMessageBox } from "element-plus";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";

const { editorRef } = storeToRefs(useDubbingStore());

// 清空文本
const handleClearText = () => {
  ElMessageBox.confirm("确认清空文本吗?", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    editorRef.value.clear();
  });
};
</script>

<style lang="scss" scoped></style>
