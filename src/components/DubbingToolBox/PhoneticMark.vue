<template>
  <!-- 别名 -->
  <el-popover
    placement="bottom"
    trigger="click"
    :popper-style="popperStyle"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="音标"
        content="划选数字或符号，点选合适的读法"
        icon="Mark"
        @click="handleStress"
      />
    </template>
    <div class="alias">
      <el-input placeholder="请输入英文音标" v-model="alias"></el-input>
      <p class="desc">
        <a href="http://www.youdao.com/w/eng/a/">有道音标</a>
        <a href="https://fanyi.baidu.com/#en/zh/a">百度音标</a>
      </p>
      <div class="btn-group">
        <el-button>试听</el-button>
        <el-button>确定</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";
const { editorRef } = storeToRefs(useDubbingStore());

const handleStress = () => {
  const rect = editorRef.value.getCursorPosition();
  popperStyle.value = `width:auto;left:${rect.left - 16}px;top:${rect.top + 22}px`;
};

const popperStyle = ref(`width:auto;`);
</script>

<style lang="scss" scoped>
.alias {
  .desc {
    font-size: 12px;
    color: #666;
    margin: 10px 0;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
}
</style>
