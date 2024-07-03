<template>
  <div>
    <div class="editable">
      <div contenteditable="true" ref="editable" class="editable-div editable-content" @input="onInput">
      </div>
      <div style="display: flex;justify-content: space-between;">
        <p style="font-size: 12px;color: lightgrey;" @click="clearWord">清除</p>
        <p style="font-size: 12px;color: lightgrey;">{{ wordCount }}/8000</p>
      </div>
    </div>

    <!-- <button @click="insertElement(1)">停顿1秒</button>
    <button @click="insertElement(4)">停顿4秒</button>
    <button @click="generate">生成</button> -->
  </div>
</template>

<script setup>
import {ref} from 'vue';

const editable = ref(null);

const insertElement = (pauseSeconds) => {
  const editableDiv = editable.value;
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  // 创建一个新的元素
  const newElement = document.createElement('span');
  newElement.textContent = `${pauseSeconds}秒`;
  newElement.className = 'blockStyle';
  newElement.contentEditable = "false"; // 设置元素不可编辑


  // 检查当前选中的范围是否在可编辑的div内
  if (!editableDiv.contains(range.commonAncestorContainer)) {
    return; // 如果不在，则不执行插入操作
  }

  // 插入新的元素
  range.insertNode(newElement);

  // 创建一个新的光标元素
  const blinkingCursor = document.createElement('span');
  blinkingCursor.className = 'blinking-cursor';

  // 在插入元素后插入光标
  range.setStartAfter(newElement);
  range.insertNode(blinkingCursor);

  // 将光标设置在闪烁光标后面
  range.setStartAfter(blinkingCursor);
  range.setEndAfter(blinkingCursor);
  selection.removeAllRanges();
  selection.addRange(range);
};

const generate = () => {
  const editableDiv = editable.value;
  let resultText = editableDiv.innerHTML;
  if (resultText.trim() === '') {
    resultText = '请输入文本';
    return;
  }

  const spans = editableDiv.getElementsByClassName('blockStyle');

  Array.from(spans).forEach(span => {
    const pauseTime = span.textContent.replace('秒', '');
    const replacementText = `[${pauseTime}]`;

    resultText = resultText.replace(span.outerHTML, replacementText);
  });

  // 移除所有光标元素
  resultText = resultText.replace(/<span class="blinking-cursor"><\/span>/g, '');

  // 创建一个临时的HTML元素来获取纯文本
  const tempElement = document.createElement('div');
  tempElement.innerHTML = resultText;
  const finalResult = tempElement.innerText || tempElement.textContent;

  // if (finalResult.length > 8000) {
  //     window.alert('字数超过8000字，请删除部分文字', finalResult.length)
  //     return
  // }
  console.log(finalResult); // 将结果输出到控制台
  localStorage.removeItem('ttsuser');
  localStorage.setItem('ttsuser', finalResult);
  // 或者你可以将数据发送到后端或者进行其他处理
  // 例如：sendDataToBackend(finalResult);
};
let wordCount = ref(0);

const onInput = (e) => {
  // 此处可以添加处理输入的逻辑
  wordCount.value = e.target.innerText.length;
  if (wordCount.value > 8000) {
    window.alert('字数超过8000字，请删除部分文字')
    const textContent = editable.value.innerText || editable.value.textContent;
    editable.value.innerText = textContent.substring(0, 8000);
    wordCount.value = 8000;
    return
  }
  // console.log(wordCount.value);
};

const clearWord = () => {
  wordCount.value = 0;
  editable.value.innerHTML = '';
};

// const emit = defineEmits(['insertDelayTime'])

// emit('insertDelayTime', () => {
//     console.log("我被触发了");
// })
function hello(time) {
  insertElement(time)
}

defineExpose({
  hello,
  generate,
  clearWord
});
</script>

<style>
.blinking-cursor {
  display: inline-block;
  width: 1px;
  background-color: black;
  animation: blink 1s step-end infinite;
}

@keyframes blink {

  from,
  to {
    visibility: hidden;
  }

  50% {
    visibility: visible;
  }
}

.blockStyle {
  font-size: 10px;
  /* width: 20px; */
  padding: 2px 7px;
  background-color: #eb8677;
  color: white;
  user-select: none;
  border-radius: 50px;
  /* 确保元素不可编辑 */
}

.editable-div {
  border: 1px solid black;
  padding: 10px;
  width: 300px;
  height: 200px;
  overflow-y: auto;
  /* 当内容超过高度时显示垂直滚动条 */
  outline: none;
}

.editable-content {
  width: 100%;
  outline: none;
  border: none;
}
</style>
