<template>
  <!-- 插入静音 -->
  <el-popover
    placement="bottom"
    trigger="click"
    :popper-style="popperStyle"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="插入静音"
        content="从光标处开始试听"
        icon="InsertMute"
        @click="handleClicked"
      />
    </template>
    <div>
      <el-radio-group v-model="radio1" class="ml-4">
        <el-radio value="1">所有段落</el-radio>
        <el-radio value="2">当前段落</el-radio>
      </el-radio-group>
      <el-checkbox v-model="checked1" label="显示静音段落" />
    </div>
    <el-button-group>
      <el-button type="primary" @click="insertMute(100)">100ms</el-button>
      <el-button type="primary" @click="insertMute(150)">150ms</el-button>
      <el-button type="primary" @click="insertMute(200)">200ms</el-button>
      <el-button type="primary" @click="insertMute(300)">300ms</el-button>
      <el-button type="primary" @click="insertMute(400)">400ms</el-button>
      <el-button type="primary" @click="insertMute(600)">600ms</el-button>
    </el-button-group>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const checked1 = ref(false);
const radio1 = ref(false);

const { editorRef } = storeToRefs(useDubbingStore());
const popperStyle = ref(`width:auto;`);

const handleClicked = () => {
  const rect = editorRef.value.getCursorPosition();
  popperStyle.value = `width:auto;left:${rect.left - 16}px;top:${rect.top + 22}px`;
};

const insertMute = (value) => {
  editorRef.value.insertElement(value);
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
