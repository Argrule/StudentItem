<template>
  <el-container id="el-container1" style="height: 100%">
    <el-header height="80%" class="el-header1">
      <div class="float3">学生组织报名管理</div>
      <el-button type="danger" @click="goLogin" class="floatl">退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="el-aside1" width="auto">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-sub-menu index="1">
                <template #title>
                  <span>管理</span>
                </template>
                <!-- <el-menu-item-group>
          <router-link to="/dataManage/dataManageHome"><el-menu-item>主页</el-menu-item></router-link>
        </el-menu-item-group> -->
                <el-menu-item-group>
                  <el-menu-item>学生信息</el-menu-item>
                  <!-- <router-link to="/dataManage/dataManageView"></router-link> -->
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item index="2">
                <div @click="dialogVisible = true" class="floatl2">
                  修改信息
                </div>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <!-- <router-view></router-view> -->
        <el-dialog
          v-model="dialogVisible"
          width="40%"
          top="5vh"
          title="修改用户"
        >
          <!-- 弹出报名列表 -->
          <div style="width: 70%; margin: 0 auto">
            <changeData ref="demo" />
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="goChangeData"
                >确认提交</el-button
              >
            </span>
          </template>
        </el-dialog>
        <dataManageView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import changeData from "../components/changeData.vue";
import dataManageView from "../components/dataManageView.vue";
// const changeData =()=> import('../components/changeData.vue')懒加载后弹窗空白
export default {
  name: "dataManage",
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: {
    changeData,
    dataManageView,
  },
  methods: {
    goChangeData() {
      this.$refs.demo.postData();
    },
    goLogin() {
      this.$router.push({ name: "loginPlus" });
      sessionStorage.removeItem("token");
    },
  },
};
</script>

<style scoped>
.el-header1 {
  background-color: rgb(0, 0, 0, 0.9);
  color: rgb(170, 162, 162);
}
.el-aside1 {
  background-color: rgb(0, 0, 0, 0.7);
  color: rgb(238, 225, 225);
  width: 200px;
  height: 560px;
}
.floatl {
  float: right;
  margin: 20px;
}
.floatl2 {
  /* float: right;
  margin-right: 20px; */
  font-size: medium;
}
.float3 {
  float: left;
  font-size: larger;
  margin: 20px;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>