<template>
  <div id="hello1">
    <div class="el-input1">
      <el-input
        v-model="keyWord"
        type="search"
        @change="searchKeyWord"
        style="width: 300px"
        size="large"
        placeholder="请输入关键字"
      ></el-input
      >&nbsp;
      <el-button size="large" type="success" circle @change="searchKeyWord">
        搜索
      </el-button>
    </div>
    <div>
      <el-scrollbar height="400px">
        <el-table :data="userInfo" stripe border style="border-radius: 10px">
          <el-table-column type="index" label="序号" />
          <el-table-column prop="stdId" label="学号" />
          <el-table-column prop="stdName" label="姓名" />
          <el-table-column prop="major" label="专业" />
          <el-table-column prop="classNum" label="班级" />
          <el-table-column prop="stdQQ" label="QQ" />
          <el-table-column prop="stdPhone" label="电话" />
          <el-table-column prop="firstWill.organization" label="第一志愿" />
          <el-table-column prop="firstWill.branch" label="部门" />
          <el-table-column prop="firstWill.reason" label="理由" />
          <el-table-column prop="secondWill.organization" label="第二志愿" />
          <el-table-column prop="secondWill.branch" label="部门" />
          <el-table-column prop="secondWill.reason" label="理由" />
        </el-table>
      </el-scrollbar>
    </div>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:currentPage="page"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        background:true
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="resetPageSize"
        @current-change="resetPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dataManageView",
  data() {
    return {
      userInfo: [],
      page: "1", //默认值为1
      pageSize: "10", //默认值为10
      total: Number,
      keyWord: "",
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    resetPageSize() {
      if (this.keyWord == "") this.getUserInfo();
      else this.searchKeyWord();
    },
    resetPage() {
      if (this.keyWord == "") this.getUserInfo();
      else this.searchKeyWord();
    },
    searchKeyWord() {
      axios({
        method: "post",
        url:
          "http://47.94.90.140:8000/getStuInfo?page=" +
          this.page +
          "&pageSize=" +
          this.pageSize,
        data: {
          token: window.sessionStorage.getItem("token"),
          keyWord: this.keyWord,
        },
      }).then(
        (res) => {
          // console.log('yes!',res.data.message);
          this.userInfo = res.data.data.students;
          this.total = res.data.data.total;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getUserInfo() {
      axios({
        method: "post",
        url:
          "http://47.94.90.140:8000/getAllStuInfo?page=" +
          this.page +
          "&pageSize=" +
          this.pageSize,
        data: {
          token: window.sessionStorage.getItem("token"),
          page: this.page,
          pageSize: this.pageSize,
        },
      }).then(
        (res) => {
          // console.log('yeah!',res.data.message);
          this.userInfo = res.data.data.students;
          this.total = res.data.data.total;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style scoped>
#hello1 {
  background-color: black;
  padding: 10px;
  margin: 0px;
  border-radius: 10px;
}
.el-input1 {
  margin-bottom: 10px;
  /* margin-top: 1px; */
}
.demo-pagination-block {
  margin-top: 10px;
}
</style>