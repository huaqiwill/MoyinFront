<template>
  <div class="common-layout">
    <el-container class="media-min">
      <el-main class="media-min">
        <el-row class="gap-50-bottom">
          <el-col :span="15" class="navBart">
            <el-col :span="2">
              <el-col :span="24">
                <div>
                  <img
                    src="../../assets/images/bf.svg"
                    alt=""
                    style="width: 30px"
                  />
                </div>
                <p>试听</p>
                <!-- <el-dropdown>
                                    <div>
                                        <div><img src="../../assets/images/bf.svg" alt="" style="width: 30px;"></div>
                                        <p>试听</p>
                                    </div>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>暂无信息</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
</el-dropdown> -->
              </el-col>
            </el-col>
            <span class="cut-off"></span>
            <el-col :span="7">
              <el-row>
                <el-col :span="8" @click="dialogPauseTime = true">
                  <div>
                    <img
                      src="../../assets/images/panel.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>插入停顿</p>
                </el-col>
                <el-col :span="8">
                  <div>
                    <img
                      src="../../assets/images/mh.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>符号停顿</p>
                </el-col>
                <el-col :span="8">
                  <div>
                    <img
                      src="../../assets/images/dl.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>段落停顿</p>
                </el-col>
              </el-row>
            </el-col>
            <span class="cut-off"></span>
            <el-col :span="5">
              <el-row>
                <el-col :span="12">
                  <div>
                    <img
                      src="../../assets/images/ys1.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>单字纠音</p>
                </el-col>
                <el-col :span="12">
                  <div>
                    <img
                      src="../../assets/images/ys2.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>批量纠音</p>
                </el-col>
              </el-row>
            </el-col>
            <span class="cut-off"></span>
            <el-col :span="7">
              <el-row>
                <el-col :span="8">
                  <div>
                    <img
                      src="../../assets/images/xj.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>文案提取</p>
                </el-col>
                <el-col :span="8">
                  <div>
                    <img
                      src="../../assets/images/dyj.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>查敏感词</p>
                </el-col>
                <el-col :span="8">
                  <div>
                    <img
                      src="../../assets/images/sz.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>解说模式</p>
                </el-col>
              </el-row>
            </el-col>
            <span class="cut-off"></span>
            <el-col :span="2">
              <el-row>
                <el-col :span="24">
                  <div>
                    <img
                      src="../../assets/images/dr.svg"
                      alt=""
                      style="width: 30px"
                    />
                  </div>
                  <p>多人配音</p>
                </el-col>
              </el-row>
            </el-col>
          </el-col>

          <el-col :span="9"> </el-col>
        </el-row>
        <!-- 内容编辑 -->
        <el-row>
          <el-col :span="18">
            <!-- <div contenteditable="true" id="editable">
                        </div> -->
            <EditableDiv ref="childRef" />
          </el-col>
          <el-col :span="6">
            <div class="text-editor-group">
              <p>
                <ElButton type="primary" plain @click="handleGenerate"
                  >生成配音</ElButton
                >
              </p>
              <p>
                <ElButton type="primary" plain>下载配音</ElButton>
              </p>
              <p>
                <ElButton type="primary" plain>生成记录</ElButton>
              </p>
              <p>
                <ElButton type="primary" plain @click="handleClearWord"
                  >一键清空</ElButton
                >
              </p>
              <p>
                <ElButton type="primary" plain @click="dialogDubConfig = true"
                  >配音配置</ElButton
                >
              </p>
            </div>
          </el-col>
        </el-row>

        <!-- tabs -->
        <el-row>
          <el-col
            :span="12"
            style="
              width: 100%;
              padding: 10px;
              border: 1px solid transparent;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            "
            class="gap-5"
          >
            <p style="margin-bottom: 10px">配音员列表</p>
            <div class="flex gap-2">
              <el-tag
                style="margin-right: 10px"
                type="primary"
                v-for="item in editableTabs"
                :key="item.name"
                :class="{ active: activeTab === item.name }"
                @click="changeActiveTab(item.name)"
                class="gap-2-top"
              >
                {{ item.title }}
              </el-tag>
            </div>
            <div
              class="tabs-content"
              v-for="item in editableTabs"
              :key="item.name"
            >
              <div v-show="item.name == activeTab" class="flex">
                <div
                  v-for="dub in item.dubList"
                  :key="dub.title"
                  class="dubBlock gap-2"
                >
                  <span>{{ dub.title }}</span>
                  <span>{{ dub.feature }}</span>
                </div>
              </div>
            </div>
          </el-col>

          <el-col
            :span="11"
            style="
              width: 100%;
              padding: 10px;
              order: 1px solid transparent;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            "
          >
            情绪
          </el-col>
        </el-row>
        <Audio />
        <!-- <Loading style="position: relative;top: 0;"/> -->
      </el-main>

      <!-- 配音设置dialog -->
      <el-dialog
        v-model="dialogDubConfig"
        title="配音设置"
        width="500"
        :before-close="handleClose"
      >
        <div class="slider-demo-block">
          <span class="demonstration">音量</span>
          <el-slider v-model="value1" />
        </div>
        <div class="slider-demo-block">
          <span class="demonstration">音调</span>
          <el-slider v-model="value2" />
        </div>
        <div class="slider-demo-block">
          <span class="demonstration">语速</span>
          <el-slider v-model="value3" />
        </div>
        <div class="slider-demo-block">
          <span class="demonstration">格式</span>
          <el-select
            v-model="value"
            placeholder="选择生成音频格式"
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogDubConfig = false">取消</el-button>
            <el-button type="primary" @click="dialogDubConfig = false">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>

      <!-- 插入停顿dialog -->
      <el-dialog
        v-model="dialogPauseTime"
        title="插入停顿"
        width="500"
        :before-close="handleClose"
      >
        <ElButton type="primary" plain @click="test(1)">1s</ElButton>
        <ElButton type="primary" plain @click="test(2)">2s</ElButton>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogPauseTime = false">取消</el-button>
            <el-button type="primary" @click="dialogPauseTime = false">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import { ElButton } from "element-plus";
import Header from "@/components/Header/Header.vue";
import Audio from "../../components/Audio/Audio.vue";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import Loading from "@/Loading/Loading.vue";
import EditableDiv from "@/components/EditableDiv/EditableDiv.vue";

const dialogDubConfig = ref(false);
const dialogPauseTime = ref(false);

// dialog提示框
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("您还未保存设置确定离开吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  })
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

// 配音设置数据
const value1 = ref(50);
const value2 = ref(50);
const value3 = ref(50);

// 音频格式信息
const value = ref("");

const options = [
  {
    value: "mp3",
    label: "mp3",
  },
  {
    value: "mp3",
    label: "mp3",
  },
];

// 配音分类tabs
const editableTabs = ref([
  {
    title: "热门",
    name: "1",
    content: "热门",
    dubList: [
      {
        title: "译制片男",
        feature: "纪录片、解说",
      },
      {
        title: "解说小帅",
        feature: "纪录片、解说",
      },
      {
        title: "解说小美",
        feature: "纪录片、解说",
      },
      {
        title: "四郎",
        feature: "纪录片、解说",
      },
      {
        title: "解说小美",
        feature: "纪录片、解说",
      },
      {
        title: "四郎",
        feature: "纪录片、解说",
      },
      {
        title: "四郎",
        feature: "纪录片、解说",
      },
    ],
  },
  {
    title: "上新",
    name: "2",
    content: "上新",
    dubList: [
      {
        title: "小团团",
        feature: "可爱魔性小团团",
      },
      {
        title: "悬疑男主",
        feature: "神秘、紧张、充满悬念",
      },
      {
        title: "古风男主",
        feature: "深情稳重的男主魅力",
      },
      {
        title: "甜美女声",
        feature: "让人放松愉悦",
      },
      {
        title: "俏皮女声",
        feature: "活泼幽默有趣",
      },
      {
        title: "亲切男声",
        feature: "温暖、亲切、可信",
      },
      {
        title: "知性女声",
        feature: "纪录片、解说",
      },
    ],
  },
  {
    title: "女声",
    name: "3",
    content: "女声",
  },
  {
    title: "男声",
    name: "4",
    content: "男声",
  },
  {
    title: "解说",
    name: "5",
    content: "解说",
  },
]);

const activeTab = ref("1");
function changeActiveTab(val) {
  activeTab.value = val;
}

// 传给子组件的的pauseTime，调用子组件暴露的函数
let childRef = ref(null);
const test = (second) => {
  if (childRef.value != null) {
    childRef.value.hello(second);
    dialogPauseTime.value = false;
  }
};

const handleGenerate = () => {
  childRef.value.generate();
};

const handleClearWord = () => {
  childRef.value.clearWord();
};
</script>

<style>
/* .el-main { */
/* margin-top: 100px; */
/* } */

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.text-editor-group {
  display: flex;
  margin-left: 50px;
  height: 240px;
  flex-direction: column;
  justify-content: space-between;
}

.text-editor-group button {
  width: 200px;
  height: 40px;
}

.editable {
  height: 240px;
  border-radius: 6px;
  padding: 10px;
  width: 100%;
  border: 1px solid transparent;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.active {
  /* border: 1px solid black !important; */
  background-color: #59a0f8 !important;
  color: #fff !important;
}

.dubBlock {
  /* width: 100px; */
  /* height: 30px; */
  display: flex;
  flex-direction: column;
  align-content: space-between;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.dubBlock span {
  text-align: center;
}

.dubBlock span:nth-child(1) {
  font-size: 15px;
}

.dubBlock span:nth-child(2) {
  font-size: 10px;
  padding: 0 10px;
}

.gap-2 {
  margin-right: 10px;
}

.gap-5 {
  margin-right: 50px;
}

.gap-50-bottom {
  margin-top: 50px;
}

.gap-2-top {
  margin-bottom: 10px;
}

.cut-off {
  display: block;
  width: 2px;
  background-color: red;
}

.navBart {
  display: flex !important;
  justify-content: space-evenly !important;
}

.navBart > .el-col {
  font-size: 10px;
}

.navBart > .el-col .el-col {
  text-align: center;
  font-size: 10px;
}

@media (max-width: 1400px) {
  .media-min {
    width: 1400px;
  }
}
</style>