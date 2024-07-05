<template>
  <div class="dubbing-editor">
    <DubbingHeader />
    <div class="dubbing-content">
      <Editor
        class="editor"
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
      <DubbingSidebar />
    </div>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { DubbingHeader, DubbingSidebar, DubbingFooter } from "@/components";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";

const { editorRef } = storeToRefs(useDubbingStore());

// 编辑器实例，必须用 shallowRef
editorRef.value = shallowRef().value;

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style lang="scss" scoped>
.dubbing-editor {
  margin-left: 4px;
  width: 100%;
  overflow: hidden;
  background-color: #2254a1;
  padding: 4px;
  border-radius: 4px;

  .dubbing-header {
    height: 60px;
  }

  .dubbing-content {
    height: 100%;
    display: flex;

    .editor {
      height: 100%;
      width: calc(100% - 60px);
    }

    .dubbing-sidebar {
      height: 100%;
      width: 60px;
      padding: 4px;
    }
  }

  .dubbing-footer {
    height: 200px;
  }
}
</style>
