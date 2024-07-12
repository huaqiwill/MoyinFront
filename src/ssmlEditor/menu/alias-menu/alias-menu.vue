<script setup>
import { onMounted, onUnmounted, ref, shallowRef, nextTick } from "vue";
import { BarButton, BarInput, BarPopover } from "@/ssmlEditor/components";
import { AliasFn } from "./alias-fn";
import { getEmitter } from "@/ssmlEditor/core/emitter";
import { emitter } from "@/ssmlEditor/event-bus";
import { useEditorStore } from "@/stores";

const fn = shallowRef();
const inputRef = ref();
const visible = ref(false);

onMounted(() => {
  emitter.on("editor-created", handleEditorCreated);
  nextTick(() => {
    const { editor } = useEditorStore();
    editor && handleEditorCreated(editor);
  });
});

onUnmounted(() => {
  emitter.off("editor-created", handleEditorCreated);
  const { editor } = useEditorStore();
  getEmitter(editor)?.off("ssml-remark-click", handleSSMLRemarkClick);
});

function handleEditorCreated(editor) {
  getEmitter(editor).off("ssml-remark-click", handleSSMLRemarkClick);
  getEmitter(editor).on("ssml-remark-click", handleSSMLRemarkClick);
}

function handleSSMLRemarkClick(editor, elem) {
  if (elem.type === "ssml-sub") {
    fn.value = undefined;
    handleClick(editor);
  }
}

function show() {
  if (visible.value) return;
  visible.value = true;
}

function hide() {
  if (!visible.value) return;
  visible.value = false;
}

async function handleClick(editor) {
  fn.value ??= new AliasFn(editor);
  if (fn.value.isDisabled()) return;
  show();
  inputRef.value?.focus();
}

function handleSubmit(text) {
  hide();
  if (text) {
    fn.value?.exec({ value: text, label: text });
  }
}
</script>

<template>
  <BarPopover v-model:visible="visible" placement="right-end" :width="200">
    <template #reference>
      <BarButton icon="alias" @click="handleClick">别名</BarButton>
    </template>
    <BarInput ref="inputRef" @submit="handleSubmit"></BarInput>
  </BarPopover>
</template>

<style lang="scss" scoped></style>
