<template>
  <!-- 重音 -->
  <el-popover
    placement="bottom"
    trigger="click"
    popper-style="width:auto;"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="段落停顿"
        content="从光标处开始试听"
        icon="paragraph"
      ></DubbingButton>
    </template>
    <div>
      <el-radio-group v-model="radio1" class="ml-4">
        <el-radio value="1">所有段落</el-radio>
        <el-radio value="2">当前段落</el-radio>
      </el-radio-group>
      <el-checkbox v-model="checked1" label="显示静音段落" />
    </div>
    <el-button-group>
      <el-button type="primary">100ms</el-button>
      <el-button type="primary">150ms</el-button>
      <el-button type="primary">200ms</el-button>
      <el-button type="primary">300ms</el-button>
      <el-button type="primary">400ms</el-button>
      <el-button type="primary">600ms</el-button>
    </el-button-group>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";

const radio1 = ref(1);
const checked1 = ref(false);
</script>

<style lang="scss" scoped>
.stress {
  ul {
    li {
      padding: 10px 0;
    }
  }
}
</style>
