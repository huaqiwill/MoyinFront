<template>
  <div class="dubbing-list">
    <div class="header">
      <h3 class="title">配音员列表</h3>
      <el-select-v2
        v-model="category"
        filterable
        :options="categoryList"
        placeholder="请选择情绪"
        style="margin-bottom: 10px"
        multiple
      />
      <el-select-v2
        v-model="emotion"
        filterable
        :options="emotionList"
        placeholder="请选择分类"
        style="margin-bottom: 10px"
        multiple
      />
      <el-input
        v-model="searchContent"
        placeholder="输入搜索关键字"
        style="margin-bottom: 10px"
        :suffix-icon="Search"
      />
    </div>
    <div class="dubbing">
      <ul>
        <li
          v-for="item in dubbingList"
          :key="item.name"
          @click="handleDubbingClick(item.name)"
          :class="{ active: item.name === activeDubbingName }"
        >
          <div class="avatar">
            <img :src="item.avatar" alt="" />
          </div>
          <div>
            <p class="name">{{ item.name }}</p>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { moyinCategoryList, moyinDubbingList, moyinEmotionList } from "@/api";
import { ElLoading } from "element-plus";

const categoryList = ref([]);
const dubbingList = ref([]);
const emotionList = ref([]);
const emotion = ref("");
const category = ref("");
const searchContent = ref("");

onMounted(() => {
  const loadingInstance = ElLoading.service({});

  // 并行处理异步请求
  Promise.all([moyinCategoryList(), moyinDubbingList(), moyinEmotionList()]).then(
    ([categoryRes, emotionRes, dubbingRes]) => {
      // 处理分类列表
      categoryList.value = categoryRes.rows.map((category) => ({
        label: category.name,
        value: category.id,
      }));

      // 处理情绪列表
      emotionList.value = emotionRes.rows.map((emotion) => ({
        label: emotion.name,
        value: emotion.id,
      }));
      // 处理配音员列表
      dubbingList.value = dubbingRes.rows;

      loadingInstance.close();
    }
  );
});

// 分类管理
const activeCategoryName = ref("全部");
const handleCategoryClick = (name) => {
  activeCategoryName.value = name;
};

// 配音员管理
const activeDubbingName = ref("");
const handleDubbingClick = (name) => {
  activeDubbingName.value = name;
};

// 搜索管理
</script>

<style scoped lang="scss">
.dubbing-list {
  height: 100%;
  background-color: #f4f6f7;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.711);

  .header {
    padding: 10px;
    padding-bottom: 0;

    .title {
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 10px;
    }
  }

  .dubbing {
    height: calc(100% - 180px);
    overflow: auto;
    padding: 10px;
    padding-top: 0;
    border-radius: 5px;

    ul {
      display: flex;
      flex-direction: row;
      justify-content: start;
      flex-wrap: wrap;
      gap: 10px;

      li {
        background-color: #ffffff;
        padding: 10px;
        width: 100%;
        border: 1px solid #ecf5ff;
        display: flex;
        flex-direction: row;
        gap: 10px;
        border-radius: 5px;

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #e4e7ed;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .name {
          font-size: 14px;
          font-weight: 400;
          color: #000;
        }

        .desc {
          font-size: 12px;
          color: #666;
          margin-top: 3px;
        }

        &.active {
          background-color: #ecf5ff;
        }
      }
    }
  }
}
</style>
