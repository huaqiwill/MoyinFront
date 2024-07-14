<script setup>
// import { ElForm, ElInput } from "element-plus";
import { ref, nextTick } from "vue";

const emit = defineEmits("submit");
defineProps({
  type: {
    type: String,
  },
});

const inputValue = ref("");
const inputRef = ref();

function focus() {
  nextTick(() => {
    inputRef.value.input.focus();
  });
}

function handleSubmit() {
  emit("submit", inputValue.value);
  inputValue.value = "";
}

defineExpose({
  focus,
});
</script>

<template>
  <ElForm @submit.prevent="handleSubmit">
    <ElInput :type="type" ref="inputRef" v-model="inputValue"></ElInput>
  </ElForm>
</template>

<style lang="scss" scoped></style>
