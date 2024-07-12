<template>
  <!-- 试听 -->
  <DubbingButton
    title="试听"
    content="划选内容或点击光标，开始逐句试听"
    icon="play"
    @click="handleClicked"
  />
</template>

<script setup>
import { ref } from "vue";
import { DubbingButton } from "@/components";
import { ElMessage } from "element-plus";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";
import { downloadAudio, tts } from "@/api/tts";

const { quillEditorRef } = storeToRefs(useDubbingStore());

const audioSrc = ref("");

const handleClicked = () => {
  let text = quillEditorRef.value.getText() || "";
  if (text.length === 1) {
    ElMessage({
      message: "请输入文本后重试",
      type: "warning",
    });
    return;
  }

  let data = {
    text,
  };

  console.log(data);

  tts(text).then((res) => {
    // console.log(res);
    // audioSrc.value = "/dev-api/moyin/tts/audition/" + res.data;
    const audio = new Audio("/dev-api/moyin/tts/audition/" + res.data);
    audio.play();
  });
};
</script>

<style lang="scss" scoped></style>
