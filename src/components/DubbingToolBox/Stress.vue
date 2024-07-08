<template>
  <!-- 重音 -->
  <el-popover
    placement="bottom"
    trigger="click"
    :popper-style="popperStyle"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="重音"
        content="划选需要重音的内容，选择重音"
        icon="zy2"
        @click="handleClicked"
      />
    </template>
    <div class="stress">
      <ul>
        <li @click="handleOption(0)">重读</li>
        <li @click="handleOption(1)">拖音</li>
        <li @click="handleOption(2)">重读+拖音</li>
      </ul>
    </div>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const { editorRef } = storeToRefs(useDubbingStore());
const popperStyle = ref(`width:auto;`);
const handleClicked = () => {
  const rect = editorRef.value.getCursorPosition();
  popperStyle.value = `width:auto;left:${rect.left - 16}px;top:${rect.top + 22}px`;
};

const handleOption = (value) => {
  if (value === 0) {
    editorRef.value.stressSound();
  } else if (value == 1) {
    editorRef.value.dragSound();
  } else {
    editorRef.value.stressAndDragSound();
  }
};
</script>

<style lang="scss" scoped>
.stress {
  ul {
    li {
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        color: #000;
        background-color: #ccc;
      }
    }
  }
}
</style>
