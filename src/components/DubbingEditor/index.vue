<template>
  <div style="width: 100%; height: 100%">
    <DubbingHeader id="toolbar" />
    <QuillEditor ref="quillEditorRef" :style="style" :options="editorOptions" />
  </div>
</template>

<script setup>
import { DubbingHeader } from "@/components";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";
import { QuillEditor } from "@vueup/vue-quill";
import "quill/dist/quill.snow.css"; // 导入Quill的样式
import { onMounted } from "vue";
import "./lib";

const { quillEditorRef } = storeToRefs(useDubbingStore());

const editorOptions = {
  // debug: "info",
  modules: {
    toolbar: {
      container: "#toolbar", // 绑定自定义工具栏
    },
  },
  placeholder: "尽情开始你的创作...",
  theme: "snow",
};

const style = {
  fontFamily: "微软雅黑",
  fontSize: "22px",
};

onMounted(() => {
  // 获取选中的文本
  quillEditorRef.value.getSelectionText = () => {
    const quill = quillEditorRef.value.getQuill();
    const range = quill.getSelection();
    if (range) {
      return quill.getText(range.index, range.length);
    }
    return "";
  };

  // 获取光标的位置
  quillEditorRef.value.getCursorPosition = () => {
    const quill = quillEditorRef.value.getQuill(); // 获取 Quill 实例
    const range = quill.getSelection(); // 获取当前光标位置
    if (range) {
      const editorElement = quillEditorRef.value.editor.querySelector(".ql-editor");
      const rect = editorElement.getBoundingClientRect();
      const bounds = quill.getBounds(range.index, range.length); // 获取光标位置的边界信息
      const x = rect.x + bounds.right;
      const y = rect.y + bounds.bottom;
      return { x, y };
    }
    return { x: 0, y: 0 };
  };
});
</script>

<style lang="scss" scoped>
.dubbing-editor {
  width: 100%;
  overflow: hidden;
  border-left: 1px solid #fff;
}
</style>
