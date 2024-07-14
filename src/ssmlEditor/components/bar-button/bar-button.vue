<script setup>
import { useEditorStore } from "@/store";
import throttle from "lodash.throttle";

const emit = defineEmits("click");

defineProps({
  icon: {
    type: String,
    default: "play",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const handleClick = throttle(() => {
  const { editor } = useEditorStore();
  if (editor) emit("click", editor);
});
</script>

<template>
  <button
    :disabled="disabled"
    class="play-menu d-flex flex-column justify-content-center align-items-center btn border-0 px-2 py-1 clickable"
    @click="handleClick"
    @mousedown.prevent
    style="height: 4.5rem"
  >
    <div
      class="play-menu-icon d-flex justify-content-center align-items-center"
      style="height: 30px; width: 30px"
    >
      <slot name="icon">
        <span class="fs-3 iconfont-moyin" :class="[`moyin-icon_${icon}`]"></span>
      </slot>
    </div>
    <div class="fw-normal" style="font-size: 0.85rem">
      <slot></slot>
    </div>
  </button>
</template>

<style lang="scss" scoped></style>
