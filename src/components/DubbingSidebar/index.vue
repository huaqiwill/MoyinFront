<template>
  <div class="dubbing-sidebar">
    <!-- 生成配音 -->
    <GenerateDubbing />
    <!-- 下载配音 -->
    <DownloadDubbing />
    <!-- 下载视频 -->
    <DownloadVideo />
    <!-- 下载字幕 -->
    <DownloadSrt />
    <!-- 生成记录 -->
    <GenerateLogging />
    <!-- 一键清空 -->
    <ClearText />
    <!-- 配音配置 -->
    <DubbingConfig />
  </div>
</template>

<script setup>
import {
  GenerateDubbing,
  DownloadDubbing,
  DownloadVideo,
  DownloadSrt,
  GenerateLogging,
  ClearText,
  DubbingConfig,
} from "@/components/DubbingToolBox";
</script>

<style lang="scss" scoped>
.dubbing-sidebar {
  background-color: #f4f6f7;
  display: flex;
  // height: 100%;
  // width: 60px;
  padding: 4px;
}
</style>
