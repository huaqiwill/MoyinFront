<template>
  <!-- 生成记录 -->
  <DubbingButton
    title="生成记录"
    content="从光标处开始试听"
    icon="log"
    @click="handleClicked"
  />
  <el-dialog v-model="dialogVisible" title="生成记录">
    <p>只保存本设备的最近24小时记录</p>
    <el-table :data="tableData" style="width: 100%; margin-top: 15px">
      <el-table-column prop="createTime" label="生成时间" width="180" />
      <el-table-column prop="speaker" label="生成音色" width="180" />
      <el-table-column prop="text" label="生成内容" />
      <el-table-column fixed="right" label="Operations" width="120" align="center">
        <template #default="scope">
          <el-button type="primary" @click="onDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { DubbingButton } from "@/components";
import { ttsRecordList, ttsRecordDelete } from "@/api/tts";
import { ElMessage } from "element-plus";

const dialogVisible = ref(false);

const handleClicked = () => {
  dialogVisible.value = true;
};

const onDelete = (row) => {
  ttsRecordDelete(row.id).then((res) => {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
  });
};

onMounted(() => {
  ttsRecordList().then((res) => {
    tableData.value = res.data;
  });
});

const tableData = [
  {
    createTime: "2016-05-03",
    speaker: "Tom",
    text: "No. 189, Grove St, Los Angeles",
  },
  {
    createTime: "2016-05-02",
    speaker: "Tom",
    text: "No. 189, Grove St, Los Angeles",
  },
  {
    createTime: "2016-05-04",
    speaker: "Tom",
    text: "No. 189, Grove St, Los Angeles",
  },
  {
    createTime: "2016-05-01",
    speaker: "Tom",
    text: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style lang="scss" scoped></style>
