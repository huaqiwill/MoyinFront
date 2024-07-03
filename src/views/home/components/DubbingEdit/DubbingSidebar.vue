<template>
  <div class="dubbing-sidebar">
    <DubbingButton
      title="生成配音"
      content="从光标处开始试听"
      @click="handleInsertPause"
    ></DubbingButton>
    <DubbingButton
      title="下载配音"
      content="从光标处开始试听"
      @click="handleInsertPause"
    ></DubbingButton>
    <DubbingButton
      title="生成记录"
      content="从光标处开始试听"
      @click="handleInsertPause"
    ></DubbingButton>
    <DubbingButton
      title="一键清空"
      content="从光标处开始试听"
      @click="handleInsertPause"
    ></DubbingButton>
    <DubbingButton
      title="配音配置"
      content="从光标处开始试听"
      @click="handleInsertPause"
    ></DubbingButton>
    <DubbingButton
      title="清空文本"
      content="从光标处开始试听"
      @click="handleInsertPause"
    ></DubbingButton>
  </div>
</template>

<script setup lang="ts">
import { DubbingButton } from "@/components";

const handleInsertPause = () => {
  // 插入一个暂停
};
</script>

<style lang="scss" scoped>
.dubbing-sidebar {
  background-color: #f4f6f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
