<template>
  <div style="margin-left: 5px">
    <!-- <ToolBar id="toolbar" /> -->
    <!-- <Editor /> -->
    <EditorView></EditorView>
  </div>
</template>

<script setup>
import { ToolBar } from "./ToolBar";
import { Editor } from "./index";

import { EditorView } from "@mekumiao/ssml-editor";
</script>

<style lang="scss" scoped>
// .dubbing-editor {
//   width: 100%;
//   overflow: hidden;
//   border-left: 1px solid #fff;
//   margin-left: 10px;
// }
</style>
