<template>
  <div class="dubbing-header">
    <ul class="tool-list">
      <!-- 试听 -->
      <TryListening />

      <li class="tool-line"></li>

      <!-- 多音字 -->
      <Polyphone />
      <!-- 重音 -->
      <Stress />
      <!-- 数字符号 -->
      <NumericSymbol />
      <!-- 连续 -->
      <Continuous />
      <!-- 别名 -->
      <Alias />
      <!-- 音标 -->
      <PhoneticMark />

      <li class="tool-line"></li>

      <!-- 多人配音 -->
      <MultiplayerDubbing />
      <!-- 局部变速 -->
      <LocalSpeedChange />
      <!-- 局部变音 -->
      <LocalVoiceChange />

      <li class="tool-line"></li>

      <!-- 停顿调节 -->
      <PauseAdjust />
      <!-- 插入停顿 -->
      <InsertMute />
      <!-- 符号停顿 -->
      <SymbolicPause />
      <!-- 段落停顿 -->
      <ParagraphMute />
      <!-- 解说模式 -->
      <NarrateMode />
      <!-- 音量 -->
      <Volume />

      <li class="tool-line"></li>

      <!-- 单字纠音 -->
      <DubbingButton title="单字纠音" content="从光标处开始试听"></DubbingButton>

      <!-- 批量纠音 -->
      <DubbingButton title="批量纠音" content="从光标处开始试听"></DubbingButton>

      <li class="tool-line"></li>

      <!-- 文案提取 -->
      <DubbingButton title="文案提取" content="从光标处开始试听"></DubbingButton>

      <!-- 查敏感词 -->
      <DubbingButton title="查敏感词" content="从光标处开始试听"></DubbingButton>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SvgIcon, DubbingButton } from "@/components";
import { ElMessage } from "element-plus";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";
import {
  Polyphone,
  Stress,
  NumericSymbol,
  Alias,
  PhoneticMark,
  Continuous,
  TryListening,
  PauseAdjust,
  InsertMute,
  SymbolicPause,
  NarrateMode,
  ParagraphMute,
  Volume,
  MultiplayerDubbing,
  LocalSpeedChange,
  LocalVoiceChange,
} from "../DubbingToolBox";
</script>

<style scoped lang="scss">
.popper-class-item {
  font-size: 12px !important;
}

.stress-container {
  ul {
    li {
      border-radius: 5px;
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #dbdddf;
      }
    }
  }
}

.dubbing-header {
  background-color: #f4f6f7;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.711);
  display: flex;
  flex-direction: row;
  padding: 4px;

  .tool-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;

    .tool-line {
      font-size: 0;
      width: 2px;
      height: 100%;
      background-color: #dbdddf;
      margin: 0 4px;
      border-radius: 4px;
    }

    .tool-item {
      cursor: pointer;
      width: 55px;
      height: 55px;

      .icon {
        display: block;
        width: 22px;
        height: 22px;
        color: black;
        font-weight: 800;
        margin: 0 auto;
        margin-top: 6px;
      }

      .name {
        margin-top: 8px;
        color: #666666;
        font-size: 12px;
        line-height: 12px;
        user-select: none;
        display: block;
        text-align: center;
        font-weight: 400;
      }

      &:hover {
        background-color: #e5e5e5;
      }
    }
  }
}
</style>
