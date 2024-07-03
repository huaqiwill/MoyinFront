<template>
  <div class="dubbing-header">
    <ul class="tool-list">
      <DubbingButton
          title="试听"
          content="划选内容或点击光标，开始逐句试听"
          icon="play"
          @click="handleAudition"
      ></DubbingButton>
      <!-- 多音字 -->
      <li class="tool-line"></li>
      <DubbingButton
          title="多音字"
          content="划选单个汉字，单击完成发音纠错"
          icon="dyz"
          @click="handlePolyphone"
      ></DubbingButton>
      <DubbingButton
          title="重音"
          content="划选需要重音的内容，选择重音"
          icon="zy"
          @click="handleStress"
      ></DubbingButton>
      <DubbingButton
          title="数字符号"
          content="划选数字或符号，点选合适的读法"
          icon="zy"
          @click="handleStress"
      ></DubbingButton>
      <DubbingButton
          title="连续"
          content="划选数字或符号，点选合适的读法"
          icon="zy"
          @click="handleStress"
      ></DubbingButton>
      <DubbingButton
          title="别名"
          content="划选数字或符号，点选合适的读法"
          icon="zy"
          @click="handleStress"
      ></DubbingButton>
      <DubbingButton
          title="音标"
          content="划选数字或符号，点选合适的读法"
          icon="zy"
          @click="handleStress"
      ></DubbingButton>
      <li class="tool-line"></li>
      <!-- 多人配音 -->
      <DubbingButton
          title="多人配音"
          content="从光标处开始试听"
          @click="handleMultiplayerDubbing"
      ></DubbingButton>
      <!-- 局部配音 -->
      <DubbingButton
          title="局部配音"
          content="从光标处开始试听"
          @click="handleMultiplayerDubbing"
      ></DubbingButton>
      <!-- 局部变音 -->
      <DubbingButton
          title="局部变音"
          content="从光标处开始试听"
          @click="handleMultiplayerDubbing"
      ></DubbingButton>
      <!-- 音量 -->
      <DubbingButton
          title="音量"
          content="从光标处开始试听"
          @click="handleMultiplayerDubbing"
      ></DubbingButton>
      <li class="tool-line"></li>
      <!-- 插入停顿 -->
      <DubbingButton
          title="插入停顿"
          content="从光标处开始试听"
          @click="handleInsertPause"
      ></DubbingButton>

      <!-- 符号停顿 -->
      <DubbingButton
          title="符号停顿"
          content="从光标处开始试听"
          @click="handleInsertPause"
      ></DubbingButton>

      <!-- 段落停顿 -->
      <DubbingButton
          title="段落停顿"
          content="从光标处开始试听"
          @click="handleInsertPause"
      ></DubbingButton>

      <li class="tool-line"></li>

      <!-- 单字纠音 -->
      <DubbingButton
          title="单字纠音"
          content="从光标处开始试听"
          @click="handleInsertPause"
      ></DubbingButton>

      <!-- 批量纠音 -->
      <DubbingButton
          title="批量纠音"
          content="从光标处开始试听"
          @click="handleInsertPause"
      ></DubbingButton>

      <li class="tool-line"></li>
      <!-- 文案提取 -->
      <DubbingButton
          title="文案提取"
          content="从光标处开始试听"
          @click="handleInsertPause"
      ></DubbingButton>

      <!-- 查敏感词 -->
      <DubbingButton
          title="查敏感词"
          content="从光标处开始试听"
          @click="handleInsertPause"
      ></DubbingButton>

      <!-- 解说模式 -->
      <DubbingButton
          title="解说模式"
          content="从光标处开始试听"
          @click="handleInsertPause"
      ></DubbingButton>
    </ul>

    <!--    重音-->
    <el-dialog v-model="stress" :show-close="false" width="200">
      <div class="stress-container">
        <ul class="stress">
          <li @click="handleStressA">重读</li>
          <li @click="handleDragA">拖音</li>
          <li @click="handleStressAndDragA">重读 + 拖音</li>
        </ul>
      </div>
    </el-dialog>

    <!--多音字-->
    <el-dialog v-model="polyphone" :show-close="false" width="200">
      <div class="stress-container">
        <ul class="stress">
          <li @click="handleStressA">ni</li>
          <li @click="handleDragA">ni</li>
          <li @click="handleStressAndDragA">ni</li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {SvgIcon, DubbingButton} from "@/components";
import {ElMessage} from "element-plus";
import {useDubbingStore} from "@/store";
import {storeToRefs} from "pinia";

const polyphone = ref(false);

const handleStressA = () => {
  ElMessage({
    message: "重音",
    type: "warning",
  });
}

const handleDragA = () => {
  ElMessage({
    message: "拖音",
    type: "warning",
  });
}

const handleStressAndDragA = () => {
  ElMessage({
    message: "重音+拖音",
    type: "warning",
  });
}


const dubbingStore = useDubbingStore();

const {dubbingText} = storeToRefs(dubbingStore);

const stress = ref(false);

// 多音字
const handlePolyphone = () => {
  // 选择单个字
  ElMessage({
    message: "功能开发中",
    type: "warning",
  });
};

// 试听
const handleAudition = () => {
  ElMessage({
    message: dubbingText.value,
    type: "warning",
  });
};

// 重音
const handleStress = () => {
  stress.value = true;
};

// 多人配音
const handleMultiplayerDubbing = () => {
  ElMessage({
    message: "多人配音",
    type: "warning",
  });
};

// 符号停顿
const handleSymbolPause = () => {
  ElMessage({
    message: "符号停顿",
    type: "warning",
  });
};

// 段落停顿
const handleParagraphPause = () => {
  ElMessage({
    message: "段落停顿",
    type: "warning",
  });
};

// 单字纠音
const handleSingleWordCorrection = () => {
};

// 批量纠音
const handleBatchCorrection = () => {
};

// 文案提取
const handleExtract = () => {
};

// 查敏感词
const handleCheckSensitive = () => {
};

// 解说模式
const handlePanel = () => {
};

// 语音合成
const handleSynthesis = () => {
};

const handleInsertPause = () => {
};
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
