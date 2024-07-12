<script setup>
import { ref, shallowRef } from "vue";
import { BarButton, BarPopover } from "@/ssmlEditor/components";
import { ChangespeedFn } from "./changespeed-fn";
import { rates } from "./data";

const fn = shallowRef();
const visible = ref(false);

function show() {
  if (visible.value) return;
  visible.value = true;
}

function hide() {
  if (!visible.value) return;
  visible.value = false;
}

async function handleClick(editor) {
  fn.value = new ChangespeedFn(editor);
  if (fn.value.isDisabled()) return;
  show();
}

function handleItemClick(item) {
  fn.value?.exec({ ...item });
  hide();
}
</script>

<template>
  <BarPopover v-model:visible="visible">
    <template #reference>
      <BarButton icon="changespeed" @click="handleClick">局部变速</BarButton>
    </template>
    <div
      class="d-flex flex-column overflow-x-hidden overflow-y-scroll scrollbar"
      style="height: 15rem"
    >
      <div
        v-for="(item, index) in rates"
        :key="index"
        class="clickable w-100 fs-6 rounded-1 px-3 py-2"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </BarPopover>
</template>

<style lang="scss" scoped></style>
