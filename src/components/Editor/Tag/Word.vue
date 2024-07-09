<template>
  <div style="display: flex; float: left">
    <div class="word" :style="style">
      <StressItem v-model="stress" />
      <!-- <DragItem v-if="isDrag" /> -->
      <!-- <PolyphoneItem v-if="isPolyphone" /> -->
      <div>{{ word }}</div>
    </div>
    <CursorItem v-model="cursor" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { StressItem, DragItem, PolyphoneItem, CursorItem } from "./index";

const style = ref("width:60px;");

const cursor = ref(false);

const props = defineProps({
  word: {
    type: String,
    default: "",
  },
  isStress: {
    type: Boolean,
    default: true,
  },
  isPolyphone: {
    type: Boolean,
    default: false,
  },
  isDrag: {
    type: Boolean,
    default: false,
  },
});

const stress = ref(props.isStress);

onMounted(() => {
  style.value = `width:60px;height:60px;`;
  if (props.word == "娃") {
    cursor.value = true;
  }
});
</script>

<style lang="scss" scoped>
.word {
  padding: 10px;
  background-color: aquamarine;
  border: 1px solid red;
  margin: 10px;
  color: #000;
}
</style>
