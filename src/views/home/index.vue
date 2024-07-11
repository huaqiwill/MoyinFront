<template>
  <div class="dubbing">
    <DubbingList />
    <div>
      <a-button>多音字</a-button>
      <a-button>解说模式</a-button>
      <a-button>符号停顿</a-button>
      <a-button>音量</a-button>
    </div>
    <DubbingEditor />
    <div>
      <a-button>生成配音</a-button>
      <a-button>下载配音</a-button>
      <a-button>下载视频</a-button>
      <a-button>下载字幕</a-button>
      <a-button>生成记录</a-button>
      <a-button>配音配置</a-button>
    </div>

    <div>
      <GenerateLogging></GenerateLogging>
      <DubbingConfig></DubbingConfig>
      <FindSensitiveWords></FindSensitiveWords>
      <BatchCorrection></BatchCorrection>
      <SymbolMute></SymbolMute>
      <LocalVoiceChange></LocalVoiceChange>
    </div>
  </div>
</template>

<script setup>
import { DubbingEditor, DubbingList } from "@/components";
import {
  GenerateLogging,
  DubbingConfig,
  FindSensitiveWords,
  BatchCorrection,
  SymbolMute,
  LocalVoiceChange,
} from "@/components/DubbingToolBox";
</script>

<style scoped lang="scss">
.dubbing {
  height: 100%;
  width: 100%;
  display: flex;

  .dubbing-editor {
    width: 100%;
    height: 100%;
  }
}
</style>
