<script setup>
import { inject, onMounted, onUnmounted, ref, shallowRef, toRaw } from "vue";
import { createEditor } from "@wangeditor/editor";
import { getConfig } from "@/ssmlEditor/config";
import { useEditorStore } from "@/store";
import Core from "@/ssmlEditor/core";
import { emitter } from "@/ssmlEditor/event-bus";
import { getEmitter } from "@/ssmlEditor/core/emitter";

const emit = defineEmits(["created", "change"]);
const { setEditor, saveEditorHtml } = useEditorStore();
const editorKey = inject("editorKey");
const ssmlEditorConfig = getConfig(editorKey);

const boxRef = ref(null);
const editorRef = shallowRef();

onMounted(async () => {
  Core.install();
  await initEditor();
  initAnimation(); // 必须在initEditor方法后调用
});

onUnmounted(() => {
  editorRef.value?.destroy();
});

async function initEditor() {
  if (!boxRef.value) return;
  const editor = createEditor({
    selector: boxRef.value,
    html: (await readHtml()) || undefined,
    mode: "simple",
    config: {
      ...toRaw(ssmlEditorConfig.editorConfig),
      onCreated(editor) {
        emitter.emit("editor-created", editor);
        emit("created", editor);
        ssmlEditorConfig.editorConfig.onCreated?.(editor);
        if (ssmlEditorConfig.editorConfig.autoSave === true) {
          getEmitter(editor).on("ssml-update", handleSaveEditorHtml);
        }
        editor.focus(true);
      },
      onChange(editor) {
        emit("change", editor);
        ssmlEditorConfig.editorConfig.onChange?.(editor);
      },
    },
  });

  editorRef.value = editor;
  setEditor(editor);
}

function initAnimation() {
  if (ssmlEditorConfig.animation.zoom) {
    document.querySelector(".w-e-text-container")?.classList.add("allow-zoom");
  }
  if (ssmlEditorConfig.animation.grayscale) {
    document.querySelector(".w-e-text-container")?.classList.add("allow-grayscale");
  }
}

async function readHtml() {
  try {
    const read = ssmlEditorConfig.editorConfig.readHtml;
    return (await read?.()) || null;
  } catch (error) {
    emitter.emit("error", error);
    return null;
  }
}

async function handleSaveEditorHtml(editor) {
  try {
    await saveEditorHtml(editorKey, editor.getHtml);
  } catch (error) {
    emitter.emit("error", error);
  }
}
</script>

<template>
  <div
    ref="boxRef"
    class="editor-core scrollbar"
    style="height: 70vh; overflow-y: hidden"
  ></div>
</template>

<style lang="scss" scoped>
@import "@/ssmlEditor/assets/scrollbar.scss";

:deep() {
  .w-e-scroll {
    @include scrollBar();
  }
}
</style>
