<template>
  <div class="dubbing-editor">
    <div class="editor">
      <textarea name="" id="" cols="30" rows="10">{{ dubbingText }}</textarea>
    </div>
    <div class="bar">
      <div class="count-limit">1000 / 8000</div>
      <el-button type="primary" class="clear" :icon="Delete" link>
        清除
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SvgIcon } from "@/components";
import { Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";

const dubbingStore = useDubbingStore();
const { dubbingText } = storeToRefs(dubbingStore);

dubbingText.value = `欢迎使用配音神器来制作高品质音频。

你可以在编辑器输入配音文案，点击上方的试听配音，试听满意后再点击生成配音，下载配音。你可以根据文案类型和配音场景，从上百款声音里面选择合适的声音。

试听过程中可以点击编辑器顶部的工具栏插入停顿，修改多音字，比如我的妈呀修改为我的妈呀，让你的配音达到更完美的效果。试听满意后，你可以下载配音音频和视频文件，或者下载配音对应的字幕文件。

配音神器上线三年多来，持续优化和升级配音效果，获得百万用户的好评和喜爱。如果你在使用过程中有任何建议和意见，欢迎联系我们。

下面就开始制作你的音频吧。
`;
</script>

<style lang="scss" scoped>
.dubbing-editor {
  height: calc(100% - 140px);

  .editor {
    height: calc(100% - 30px);
    background-color: antiquewhite;

    textarea {
      height: 100%;
      width: 100%;
      padding: 10px;
      font-family: "微软雅黑";
      border: 2px solid #f4f6f7;
    }
  }

  .bar {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    background-color: #f5f5f5;

    .count-limit {
      font-size: 12px;
      color: lightgrey;
    }

    .clear {
      height: 24px;
      margin-top: 3px;
    }
  }
}
</style>
