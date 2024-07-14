<script setup>
import { BarButton } from "@/ssmlEditor/components";
import { inject, ref, shallowRef } from "vue";
import { useElementBounding } from "@vueuse/core";
import { SpecialFn } from "./special-fn";
import { DragBox, BarSearch } from "@/ssmlEditor/components";
import { getConfig } from "@/ssmlEditor/config";

const dragRef = ref();
const menuRef = ref();
const fn = shallowRef();
const editorKey = inject("editorKey");
const ssmlEditorConfig = getConfig(editorKey);
const { special } = ssmlEditorConfig;

const visible = ref(false);

const { x, y, height } = useElementBounding(menuRef);

function handleClick(editor) {
  fn.value ??= new SpecialFn(editor);
  if (fn.value.isDisabled()) return;
  dragRef.value?.setPosition({
    x: x.value - 200,
    y: y.value + height.value,
  });
  visible.value = true;
}

function handleSubmit(opt) {
  fn.value?.exec(opt);
  visible.value = false;
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" icon="special" @click="handleClick">音效</BarButton>
    </template>
    <BarSearch
      :menus="special.menus"
      :fetchScene="special.fetchScene"
      :fetchStyle="special.fetchStyle"
      :fetchData="special.fetchData"
      @submit="handleSubmit"
    ></BarSearch>
  </DragBox>
</template>

<style lang="scss" scoped></style>
