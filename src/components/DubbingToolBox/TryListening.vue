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
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";

const dubbingStore = useDubbingStore();
const { editorRef } = storeToRefs(dubbingStore);

// 试听
const handleTryListening = () => {
  console.log(editorRef.value.getHtml());
  ElMessage({
    message: editorRef.value.getHtml(),
    type: "warning",
  });
};
</script>

<style lang="scss" scoped></style>
