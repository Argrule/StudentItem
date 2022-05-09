<template>
  <div class="myLogin">
    <div id="loginmark">LOGIN</div>
    <el-input
      v-model="username"
      class="space"
      size="large"
      placeholder="username"
    ></el-input>
    <el-input
      v-model="password"
      type="password"
      class="space"
      size="large"
      placeholder="password"
      show-password
    />
    <el-button
      class="space"
      type="primary"
      plain
      @click="deletData"
      size="large"
      >重置</el-button
    >
    <el-button class="space" type="success" plain @click="postData" size="large"
      >登录</el-button
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "myLogin",
  data() {
    return {
      ifError: false,
      username: "",
      password: "",
    };
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background-color:black");
  },
  beforeUnmount() {
    document.querySelector("body").removeAttribute("style");
  },
  methods: {
    deletData() {
      (this.username = ""), (this.password = "");
    },
    godataManage() {
      this.$router.push("/dataManage");
    },
    findError() {
      if (!/^202[012][0-9]{4}$/.test(this.username)) {
        this.$message.error("用户名长度为8,且不小于2020000");
      } else if (!/^\w{5,10}$/.test(this.password)) {
        this.$message.error("密码长度为5~10");
      } else this.ifError = true;
    },
    postData() {
      this.findError(); //校验数据
      if (this.ifError) {
        axios({
          method: "post",
          url: "http://47.94.90.140:8000/login",
          data: {
            username: this.username,
            password: this.password,
          },
        }).then(
          (res) => {
            if (res.data.code == "0000") 
            {
            this.$message.success(res.data.message);
            sessionStorage.setItem("token", res.data.data.token);
            this.godataManage();
            }
            else this.$message.error(res.data.message);
            this.ifError=false;//改回false，防止第二次登陆非法提交请求
          },
          (err) => {
            this.$message.error(err);
            sessionStorage.removeItem("token");
            this.ifError=false;
          }
        );
      }
    },
  },
};
</script>

<style  scoped>
#loginmark{
  font:italic 700 20px 'Times New Roman', Times, serif;
}
.space {
  margin-top: 10px;
}
/* body{
  display: flex;
} */
.myLogin {
  position: absolute;
  /* overflow: hidden; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background-color: rgb(13, 247, 169);
  box-shadow: 0 15px 25px rgb(45, 250, 113);
  box-sizing: border-box;
  border-radius: 20px;
}
</style>