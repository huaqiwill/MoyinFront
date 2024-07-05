<template>
  <!-- 多音字 -->
  <DubbingButton
    ref="buttonRef"
    title="多音字"
    content="划选单个汉字，单击完成发音纠错"
    icon="dyz"
    @click="handlePolyphone"
  ></DubbingButton>
  <el-popover
    placement="bottom"
    trigger="click"
    popper-style="width:auto;"
    ref="popoverRef"
    :virtual-ref="buttonRef"
    virtual-triggering
    :show-arrow="false"
  >
    <el-button-group>
      <el-button type="primary">de</el-button>
      <el-button type="primary">di</el-button>
      <el-button type="primary">di2</el-button>
      <el-button type="primary">di4</el-button>
      <el-button type="primary">di</el-button>
    </el-button-group>
  </el-popover>
</template>

<script setup>
import { ref, unref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { ClickOutside as vClickOutside } from "element-plus";

const { editorRef } = storeToRefs(useDubbingStore());

const buttonRef = ref();
const popoverRef = ref();

// 多音字
const handlePolyphone = () => {
  console.log(popoverRef.value);
  const selectedText = editorRef.value.getSelectionText();
  if (selectedText === "") {
    ElMessage({
      message: "请划选文字",
      type: "warning",
    });
    return;
  }
  popoverRef.value.show(); // 满足条件时显示 popover
};
</script>

<style lang="scss" scoped>
.popper-class {
  min-width: 20px !important;
  width: auto;
}

.polyphone {
  display: flex;
}

ul {
  background-color: #fff;
  display: flex;
  gap: 10px;

  li {
    border: 1px solid #e5e5e5;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      color: #6aa4fc;
      background-color: #e8f1fe;
    }
  }
}
</style>
