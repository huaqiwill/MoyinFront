<template>
  <div class="paragraph" @keydown.delete="handleDeleteOne">
    <Word v-for="word in text" :key="word" :word="word" />
  </div>
</template>

<script setup>
import Word from "./Word.vue";
import { defineProps, ref, onMounted } from "vue";

const handleDeleteOne = () => {
  // 获取当前光标的位置，并且删除当前光标的前一个元素
  alert("1");
};

const text = ref([]);

// 解析文本
const pauseText = (text) => {
  let arr = [...text];
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    arr2.push(addResult(arr[i]));
  }
  return arr2;
};

const addResult = (word) => {
  const data = {
    word: word,
    isStress: false,
    isDrag: false,
    // 多音字
    polyphone: {
      name: "de",
      pos: 2,
    },
    // 连续
    continuous: {
      isStart: false, // 是起始位置
      isCenter: true, // 是中间位置
      isEnd: false, // 是结束位置
    },
    // 局部变速
    speed: {
      isStart: false, // 是起始位置
      isCenter: false, // 是中间位置
      isEnd: true, // 是结束位置
      speed: 0.8,
    },
  };
  return data;
};

const pause = (input) => {
  const regex = /^\[([^|]+)\|([^|]+)\|([^\]]+)\]$/;
  const match = input.match(regex);
  if (match) {
    return {
      name: match[1],
      word: match[2],
      params: match[3].split(","),
    };
  }
};

onMounted(() => {
  let str = "获取文本120129120901209012901903兰陵王网v我v额MV问哦陪娃v";
  text.value = [...str];
  console.log(text.value);

  const arr2 = pauseText(str);
  console.log(arr2);
});
</script>

<style lang="scss" scoped>
.paragraph{
  padding: 10px;
  background-color: red;
  width: 100%;
  height: 100%;
}
</style>
