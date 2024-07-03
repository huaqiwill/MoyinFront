<template>
  <div class="tool-item">
    <el-popover
        placement="bottom-start"
        trigger="hover"
        :content="content"
        effect="light"
    >
      <template #reference>
        <li class="tool-item" @click="handleAudition">
          <SvgIcon :name="icon"></SvgIcon>
          <div class="name">{{ title }}</div>
        </li>
      </template>
    </el-popover>
  </div>
</template>

<script lang="js" setup>
import {SvgIcon} from "@/components";
import {defineProps} from "vue";

defineProps({
  title: {
    type: String, // 参数类型
    default: "按钮", //默认值
    required: true, //是否必传
  },
  content: {
    type: String, // 参数类型
    default: "按钮", //默认值
    required: true, //是否必传
  },
  icon: {
    type: String, // 参数类型
    default: "play", //默认值
    required: true, //是否必传
  },
});

const emit = defineEmits(["click"]);

const handleAudition = () => {
  emit("click");
};
</script>

<style lang="scss" scoped>
.tool-item {
  cursor: pointer;
  width: 55px;
  height: 55px;

  .icon {
    display: block;
    width: 22px;
    height: 22px;
    color: black;
    font-weight: 800;
    margin: 0 auto;
    margin-top: 6px;
  }

  .name {
    margin-top: 8px;
    color: #666666;
    font-size: 12px;
    line-height: 12px;
    user-select: none;
    display: block;
    text-align: center;
    font-weight: 400;
  }

  &:hover {
    background-color: #e5e5e5;
  }
}
</style>
