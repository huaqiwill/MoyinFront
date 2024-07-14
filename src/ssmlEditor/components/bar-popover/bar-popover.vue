<script setup>
// import { ElPopover } from "element-plus";

defineEmits("update:visible");
defineProps({
  visible: {
    type: Boolean,
  },
  width: {
    type: Number,
  },
  placement: {
    type: Object,
  },
});
</script>

<template>
  <ElPopover
    popperStyle="--el-popover-padding: 0px"
    :hideAfter="0"
    :width="width"
    :visible="visible"
    :placement="placement"
    trigger="contextmenu"
    @update:visible="(value) => $emit('update:visible', value)"
  >
    <template #reference>
      <slot name="reference"></slot>
    </template>
    <div class="ssml-editor-root p-2" @mousedown.stop.prevent>
      <slot></slot>
    </div>
  </ElPopover>
</template>

<style lang="scss" scoped></style>
