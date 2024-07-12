<template>
  <a-card class="dubbing-list-1" style="min-width: 290px">
    <!-- 搜索 -->
    <a-input
      v-model="searchContent"
      placeholder="共763款配音师，输入名称搜索"
      allow-clear
      @input="onSearchSpeaker"
    />
    <!-- <el-input
      class="dubbing-search"
      v-model="searchContent"
      placeholder="共763款配音师，输入名称搜索"
      :suffix-icon="Search"
    /> -->
    <div style="margin-top: 15px"></div>

    <a-space wrap v-for="(tag, index) in searchCriteriaList" :key="index">
      <a-tag bordered>{{ tag.name }}</a-tag>
      <a-tag v-for="item in storeSearchCriteria[tag.raw]" :key="item.name" bordered>
        {{ item.name }}
      </a-tag>
    </a-space>

    <!-- 搜索条件 -->
    <!-- <ul class="search-tag" v-for="tag in searchCriteriaList" :key="tag.name">
      <div class="label">{{ tag.name }}</div>
      <li
        :class="currentTag === item.name ? 'selected' : ''"
        v-for="item in storeSearchCriteria[tag.raw]"
        :key="item.name"
        @click="handleTagClicked(item)"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul> -->
    <div style="margin-top: 15px"></div>

    <!-- 配音员 -->
    <a-list class="speaker-list" :gridProps="{ gutter: 0, span: 12 }" :bordered="false">
      <a-list-item
        class="speaker-item"
        v-for="(item, index) in searchSpeakerList"
        :key="index"
        @click="onShowSpeakerInfo"
      >
        <a-badge text="VIP">
          <div class="speaker-img">
            <img :src="item.headerImage" alt="" />
          </div>
          <div class="speaker-info">
            <span>{{ item.name }}</span>
          </div>
          <div class="speaker-count">16种风格</div>
          <div class="speaker-style">{{ item.behavior }}</div>
        </a-badge>
      </a-list-item>
    </a-list>

    <!-- <ul class="speaker-list">
      <li
        :class="currentSpeaker === item.name ? 'selected' : ''"
        v-for="item in searchSpeakerList"
        @click="handleSpeakerClicked(item)"
        :key="item"
      >
        <div v-if="item.tags" class="speaker-tag">{{ item.tags }}</div>
        <div class="speaker-img">
          <img :src="item.headerImage" alt="" />
        </div>
        <div class="speaker-info">
          <span>{{ item.name }}</span>
        </div>
      </li>
    </ul> -->
  </a-card>

  <el-dialog v-model="dialogShow">
    <div>
      <p>百变华帅</p>
      <p>真实自然，朗朗动听</p>
      <p>名人 小说 方言 影视 情感 纪录片 游戏 动漫</p>
    </div>
    <div>默认 旅游 漫画 体育 严肃</div>
    <el-button>确定</el-button>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { moyinCategoryList, moyinDubbingList, moyinEmotionList } from "@/api";
import { ElLoading } from "element-plus";
import {
  getSpeakerEmotionList,
  getStoreSearchCriteria,
  searchSpeakers,
} from "@/api/moyin";

const dialogShow = ref(false);
const onShowSpeakerInfo = () => {
  dialogShow.value = true;
};

const currentSpeaker = ref("");
const handleSpeakerClicked = (item) => {
  currentSpeaker.value = item.name;
};

const speakerEmotionList = ref([]);
const storeSearchCriteria = ref([]);
const searchCriteriaList = ref([]);
const searchSpeakerList = ref([]);

onMounted(() => {
  getSpeakerEmotionList().then((res) => {
    speakerEmotionList.value = res.data;
  });

  getStoreSearchCriteria().then((res) => {
    storeSearchCriteria.value = res.data;
    let keys = Object.keys(storeSearchCriteria.value);
    let list = [];
    for (let key of keys) {
      list.push({
        raw: key,
        name: key.split(":")[0],
        value: key.split(":")[1],
      });
    }
    searchCriteriaList.value = list;
  });

  searchSpeakers().then((res) => {
    searchSpeakerList.value = res.data.results;
    console.log(searchSpeakerList.value);
  });
});

const currentTag = ref("热榜");
const handleTagClicked = (value) => {
  currentTag.value = value.name;
};

const searchContent = ref("");
const onSearchSpeaker = () => {};
</script>

<style scoped lang="scss">
.arco-tag {
  cursor: pointer;
}

.dubbing-list-1 {
  height: 100%;
  width: 600px;
  overflow-y: auto;
  // border-radius: 6px;

  ::v-deep .el-input {
    margin-bottom: 15px;
    .el-input__wrapper {
      background-color: #4e76b4 !important;
      // border-radius: 16px !important;
      input {
        caret-color: white;
      }
    }
  }

  .search-tag {
    display: flex;
    gap: 16px;
    margin-bottom: 15px;
    border-top: 1px solid #aeb4b7;
    padding-top: 15px;
    flex-wrap: wrap;
    .label {
      font-size: 12px;
    }
    li {
      border-radius: 2px;
      font-size: 12px;
      cursor: pointer;
      font-family: "微软雅黑";
      &.selected span {
        color: red;
        background: hsla(0, 76%, 43%, 0.2);
        border: 1px solid #fff;
      }
      span {
        padding: 3px 8px;
        border: 1px solid transparent;
      }
    }
  }
}

.speaker-list {
  padding: 10px;
  border: 1px solid red;

  .speaker-item {
    position: relative;
    width: 100px;
    height: 150px;
    border-radius: 15px;
    padding: 14px 10px;
    border: 1px solid #d3dee7;
    margin-bottom: 10px;

    // &.selected .speaker-img {
    //   border-radius: 50%;
    //   border: 2px solid #ffc900;
    // }

    .speaker-tag {
      position: absolute;
      left: 29px;
      top: -5px;
      width: auto;
      font-size: 10px;
      height: 14px;
      min-width: 26px;
      background-color: #f74c4a;
      border-radius: 6px 6px 6px 1px;
      z-index: 2;
      color: #fff;
      padding: 0 2px;
    }

    .speaker-count {
      font-size: 12px;
      margin-top: 5px;
      text-align: center;
    }

    .speaker-style {
      font-size: 12px;
      margin-top: 5px;
      text-align: center;
    }

    .speaker-img {
      width: 60px;
      height: 60px;
      margin-bottom: 8px;
      cursor: pointer;
      // border: 2px solid transparent;
      vertical-align: middle;
      margin: 0 auto;

      img {
        -webkit-user-drag: none;
        width: 100%;
        height: 100%;
        // border-radius: 50%;
        vertical-align: middle;
        text-align: center;
        border: none;
      }
    }

    .speaker-info {
      margin-top: 5px;
      font-size: 12px;
      font-family: "微软雅黑";
      text-align: center;
    }
  }
}
</style>
