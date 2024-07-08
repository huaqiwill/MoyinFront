<template>
  <div class="dubbing-header">
    <ul class="tool-list">
      <!-- 试听 -->
      <li><TryListening /></li>
      <li class="tool-line"></li>

      <!-- 多音字 -->
      <li><Polyphone /></li>
      <!-- 重音 -->
      <li><Stress /></li>
      <!-- 数字符号 -->
      <li><NumericSymbol /></li>
      <!-- 连续 -->
      <li><Continuous /></li>
      <!-- 别名 -->
      <li><Alias /></li>
      <!-- 音标 -->
      <li><PhoneticMark /></li>
      <li class="tool-line"></li>

      <!-- 多人配音 -->
      <li><MultiplayerDubbing /></li>
      <!-- 局部变速 -->
      <li><LocalSpeedChange /></li>
      <!-- 局部变音 -->
      <li><LocalVoiceChange /></li>
      <li class="tool-line"></li>

      <!-- 停顿调节 -->
      <li><PauseAdjust /></li>
      <!-- 插入停顿 -->
      <li><InsertMute /></li>
      <!-- 符号停顿 -->
      <li><SymbolMute /></li>
      <!-- 段落停顿 -->
      <li><ParagraphMute /></li>
      <!-- 解说模式 -->
      <li><NarrateMode /></li>
      <!-- 音量 -->
      <li><Volume /></li>
      <li class="tool-line"></li>

      <!-- 单字纠音 -->
      <li><SingleCorrection /></li>
      <!-- 批量纠音 -->
      <li><BatchCorrection /></li>
      <li class="tool-line"></li>

      <!-- 文案提取 -->
      <li><CopyExtraction /></li>
      <!-- 查敏感词 -->
      <li><FindSensitiveWords /></li>
    </ul>
  </div>
</template>

<script setup>
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
  SymbolMute,
  NarrateMode,
  ParagraphMute,
  Volume,
  MultiplayerDubbing,
  LocalSpeedChange,
  LocalVoiceChange,
  BatchCorrection,
  SingleCorrection,
  CopyExtraction,
  FindSensitiveWords,
} from "@/components/DubbingToolBox";
</script>

<style scoped lang="scss">
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
