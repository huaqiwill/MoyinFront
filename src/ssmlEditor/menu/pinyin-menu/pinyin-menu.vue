<script setup>
import { ref, shallowRef } from "vue";
import { BarButton } from "@/components";
import { ElPopover } from "element-plus";
import { PinyinFn } from "./pinyin-fn";
import { emitter } from "@/event-bus";
import { polyphoneDataToLabelValue, getPolyphoneData } from "@/utils";

const fn = shallowRef();
const pyList = ref([]);
const visible = ref(false);

function show() {
  if (visible.value) return;
  visible.value = true;
}

function hide() {
  if (!visible.value) return;
  visible.value = false;
}

function getPinyinList(word) {
  const polyphoneData = getPolyphoneData(word);
  return polyphoneDataToLabelValue(polyphoneData);
}

async function handleClick(editor) {
  fn.value ??= new PinyinFn(editor);
  if (fn.value.isDisabled()) return;
  const text = fn.value.getValue();
  if (text) {
    pyList.value = getPinyinList(text);
  } else {
    pyList.value = [];
  }

  if (pyList.value.length == 0) {
    return emitter.emit("warn", "选中的字符不是多音字");
  }

  show();
}

function handleItemClick(item) {
  fn.value?.exec({ ...item });
  hide();
}
</script>

<template>
  <ElPopover
    popperStyle="--el-popover-padding: 0px"
    v-model:visible="visible"
    trigger="contextmenu"
    :hideAfter="0"
  >
    <template #reference>
      <BarButton icon="speaker" @click="handleClick">多音字</BarButton>
    </template>
    <div
      class="ssml-editor-root d-flex flex-column overflow-x-hidden overflow-y-auto p-2 scrollbar"
      style="max-height: 300px"
      @mousedown.stop.prevent
    >
      <div
        v-for="(item, index) in pyList"
        :key="index"
        class="clickable w-100 fs-6 rounded-1 px-3 py-2"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </ElPopover>
</template>

<style lang="scss" scoped></style>
