<template>
  <div class="editor">
    <!-- 编辑器 -->
    <div contenteditable="true" ref="editable" class="editable" @input="onInput">
      <div class="word-item" v-for="word in words" :key="word">
        <div class="a">
          <Stress name="重音"/>
          <span style="display: block">{{ word }}</span>
        </div>
      </div>
    </div>
    <!-- 编辑器footer -->
    <div class="footer">
      <p class="clear-word" @click="clearWord">清除</p>
      <p class="word-count">{{ wordCount }}/8000</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Stress } from "./Tag";

const editable = ref();

const wordCount = ref(0);

const words = ref([]);

onMounted(() => {
  // setHtml(
  //   "<p style='color:black'>你好，我的大哥</p><p style='color:white'>你好，我的大哥</p>"
  // );
  words.value.push("你");
  words.value.push("好");
  words.value.push("我");
  words.value.push("的");
});

const insertWord = (word) => {
  words.value.push(word);
};

// 重读
const stressSound = () => {
  let element = document.createElement("span");
  element.textContent = "你好";
  element.style.color = "red";
  insertElement2(element);
};

const insertElement2 = (element) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  // 插入新的元素
  range.insertNode(element);

  // 创建一个新的光标元素
  const blinkingCursor = document.createElement("span");
  blinkingCursor.className = "blinking-cursor";

  // 在插入元素后插入光标
  range.setStartAfter(element);
  range.insertNode(blinkingCursor);

  // 将光标设置在闪烁光标后面
  range.setStartAfter(blinkingCursor);
  range.setEndAfter(blinkingCursor);
  selection.removeAllRanges();
  selection.addRange(range);
};

// 拖音
const dragSound = () => {
  let element = document.createElement("span");
  element.textContent = "你好";
  element.style.color = "red";
  insertElement2(element);
};

// 重读 + 拖音
const stressAndDragSound = () => {
  let element = document.createElement("span");
  element.textContent = "你好";
  element.style.color = "red";
  insertElement2(element);
};

const insertElement = (pauseSeconds) => {
  const editableDiv = editable.value;
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  // 创建一个新的元素
  const newElement = document.createElement("span");
  newElement.textContent = `${pauseSeconds}秒`;
  newElement.className = "blockStyle";
  newElement.contentEditable = "false"; // 设置元素不可编辑

  // 检查当前选中的范围是否在可编辑的div内
  if (!editableDiv.contains(range.commonAncestorContainer)) {
    return; // 如果不在，则不执行插入操作
  }

  // 插入新的元素
  range.insertNode(newElement);

  // 创建一个新的光标元素
  const blinkingCursor = document.createElement("span");
  blinkingCursor.className = "blinking-cursor";

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
  if (resultText.trim() === "") {
    resultText = "请输入文本";
    return;
  }

  const spans = editableDiv.getElementsByClassName("blockStyle");

  Array.from(spans).forEach((span) => {
    const pauseTime = span.textContent.replace("秒", "");
    const replacementText = `[${pauseTime}]`;

    resultText = resultText.replace(span.outerHTML, replacementText);
  });

  // 移除所有光标元素
  resultText = resultText.replace(/<span class="blinking-cursor"><\/span>/g, "");

  // 创建一个临时的HTML元素来获取纯文本
  const tempElement = document.createElement("div");
  tempElement.innerHTML = resultText;
  const finalResult = tempElement.innerText || tempElement.textContent;

  // if (finalResult.length > 8000) {
  //     window.alert('字数超过8000字，请删除部分文字', finalResult.length)
  //     return
  // }
  console.log(finalResult); // 将结果输出到控制台
  localStorage.removeItem("ttsuser");
  localStorage.setItem("ttsuser", finalResult);
  // 或者你可以将数据发送到后端或者进行其他处理
  // 例如：sendDataToBackend(finalResult);
};

const onInput = (e) => {
  // 此处可以添加处理输入的逻辑
  wordCount.value = e.target.innerText.length;
  if (wordCount.value > 8000) {
    ElMessage({ message: "字数超过8000字，请删除部分文字", type: "warning" });
    const textContent = editable.value.innerText || editable.value.textContent;
    editable.value.innerText = textContent.substring(0, 8000);
    wordCount.value = 8000;
    return;
  }
};

// 获取光标位置
const getCursorPosition = () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0).cloneRange();
    const rect = range.getBoundingClientRect();
    return rect;
  }
  return null;
};

// 设置光标位置
const setCursorPosition = (position) => {};

// 设置选中文本
const setSelectionText = (startIndex, endIndex) => {};

// 获取选中的文本
const getSelectionText = () => {
  let selectedText = "";
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    selectedText = selection.toString();
  }

  return selectedText;
};

// 获取html
const getHtml = () => {
  return editable.value.innerHTML;
};

// 设置html
const setHtml = (html) => {
  editable.value.innerHTML = html;
};

// 插入html
const insertHtml = (index, html) => {};

// 追加html
const appendHtml = (html) => {
  editable.value.innerHTML += html;
};

// 获取文本
const getText = () => {};

// 设置文本
const setText = () => {};

// 清除
const clearWord = () => {
  wordCount.value = 0;
  editable.value.innerHTML = "";
};

const clear = () => {
  clearWord();
};

defineExpose({
  generate,
  clearWord,
  getHtml,
  setHtml,
  insertHtml,
  insertElement,
  appendHtml,
  getCursorPosition,
  setCursorPosition,
  clear,
  getSelectionText,
  stressSound,
  dragSound,
  stressAndDragSound,
});
</script>

<style lang="scss" scoped>
.word-item {
  position: relative;
  line-height: 60px;
}

.editor {
  background-color: #333333;

  .editable {
    padding: 10px;
    overflow-y: auto;
    color: #fff;
    line-height: 22px;
    font-size: 18px;
    letter-spacing: 1px;
    outline: none;
    width: 100%;
    height: 450px;
  }

  .footer {
    display: flex;
    justify-content: space-between;

    .clear-word {
      font-size: 12px;
      color: lightgrey;
      border: 1px solid red;
      padding: 3px 10px;
      border-radius: 5px;
      margin-left: 10px;
      cursor: pointer;
      border: 1px solid transparent;

      &:hover {
        border: 1px solid #ffffff;
        background-color: #5c5c5c;
      }
    }

    .word-count {
      font-size: 12px;
      color: lightgrey;
    }
  }
}
</style>
