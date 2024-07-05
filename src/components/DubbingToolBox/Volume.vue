<template>
  <!-- 音量 -->
  <el-popover
    placement="bottom"
    trigger="click"
    popper-style="width:auto;"
    :show-arrow="false"
  >
    <template #reference>
      <!-- 音量 -->
      <DubbingButton
        title="音量"
        content="从光标处开始试听"
        icon="volume"
        @click="handleClicked"
      />
    </template>
    <div class="volume">
      <span class="demonstration">音量</span>
      <el-slider v-model="value1" />
      <el-input
        v-model="value1"
        :formatter="formatPercentage"
        :parser="parsePercentage"
      ></el-input>
    </div>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";

const formatPercentage = (value) => {
  if (!value) return "";
  // Ensure the input is a valid number and add % at the end
  const numberValue = parseFloat(value.replace(/[^\d.-]/g, ""));
  if (isNaN(numberValue)) return "";
  return `${numberValue.toLocaleString()}%`;
};

const parsePercentage = (value) => {
  if (!value) return "";
  // Remove % and commas to get the pure number
  return value.replace(/[^\d.-]/g, "");
};

const value1 = ref(50);
const handleClicked = () => {};
</script>

<style lang="scss" scoped>
.volume {
}
</style>
