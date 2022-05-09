<template>
  <div>
    <el-form ref="formRef" :rules="rules" :model="sendData">
      <div>个人信息</div>
      <br />
      <div>
        <el-form-item prop="stdId">
          <el-input
            v-model="sendData.stdId"
            placeholder="请输入学号"
            maxlength="8"
          ></el-input>
        </el-form-item>
        <el-form-item prop="stdName">
          <el-input
            v-model="sendData.stdName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="stdQQ">
          <el-input
            v-model="sendData.stdQQ"
            placeholder="请输入qq号"
            maxlength="12"
          ></el-input>
        </el-form-item>
        <el-form-item prop="stdPhone">
          <el-input
            v-model="sendData.stdPhone"
            placeholder="请输入手机号"
            maxlength="11"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <div class="example-block">
          <div class="example-demonstration">专业与班级</div>
          <el-cascader
            v-model="major0"
            style="width: 100%"
            :options="majorData"
            :props="props"
            placeholder="专业与班级"
            @change="handleChange"
          ></el-cascader>
        </div>
        <div class="example-block">
          <div class="example-demonstration">第一志愿</div>
          <el-cascader
            style="width: 100%"
            v-model="organizationFirst0"
            :options="orginazationData"
            :props="props"
            placeholder="第一志愿"
            @change="changeOrginazationData0"
          ></el-cascader>
        </div>
        <el-form-item>
          <el-input
            class="textareaReason"
            v-model="sendData.firstWill.reason"
            type="textarea"
            placeholder="请输入加入此组织的原因"
          ></el-input>
        </el-form-item>
        <div class="example-block">
          <div class="example-demonstration">第二志愿</div>
          <el-cascader
            style="width: 100%"
            v-model="organizationSecond0"
            :options="orginazationData"
            :props="props"
            placeholder="第二志愿"
            @change="changeOrginazationData1"
          ></el-cascader>
        </div>
        <el-form-item>
          <el-input
            class="textareaReason"
            v-model="sendData.secondWill.reason"
            type="textarea"
            placeholder="请输入加入此组织的原因"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否调剂" style="display: block; margin: 0 auto">
          <el-switch
            v-model="sendData.isDispensing"
            style="display: block; margin: 0 auto"
          ></el-switch>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import { sendData,majorData,orginazationData } from "../assets/data";
// import {  } from "../assets/data";
// import {  } from "../assets/data";
export default {
  name: "changeData",
  data() {
    return {
      ifError: false,
      major0: {},
      organizationFirst0: {},
      organizationSecond0: {},
      sendData: sendData,
      majorData: majorData,
      orginazationData: orginazationData,
      props: {
        expandTrigger: "hover",
      },
      rules: {
        stdId: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 8, max: 8, message: "学号长度为8", trigger: "blur" },
        ],
        stdName: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            min: 1,
            max: 5,
            message: "姓名长度为2~4,且为汉字",
            trigger: "blur",
          },
        ],
        stdQQ: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 8, max: 11, message: "长度为8~11", trigger: "blur" },
        ],
        stdPhone: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleChange(value) {
      this.sendData.major = value[0];
      this.sendData.classNum = value[1];
    },
    changeOrginazationData0(value) {
      this.sendData.firstWill.organization = value[0];
      this.sendData.firstWill.branch = value[1];
    },
    changeOrginazationData1(value) {
      this.sendData.secondWill.organization = value[0];
      this.sendData.secondWill.branch = value[1];
    },
    findError() {
      if (!/^202[012][0-9]{4}$/.test(this.sendData.stdId)) {
        this.$message.error("学号长度为8,当前范围20200000~20229999");
      } else if (!/^[\u4E00-\u9FA5]{2,4}$/.test(this.sendData.stdName)) {
        this.$message.error("姓名长度为2~4,且为汉字");
      } else if (!/^[0-9]{8,11}$/.test(this.sendData.stdQQ)) {
        this.$message.error("QQ长度为8~11");
      } else if (
        !/^(13[0-9]|14[57]|15[0-9]|18[0-9])[0-9]{8}$/.test(
          this.sendData.stdPhone
        )
      ) {
        this.$message.error("电话不符合规范");
      } else this.ifError = true;
    },
    postData() {
      this.findError(); //校验数据
      if (this.ifError) {
        axios({
          method: "post",
          url: "http://47.94.90.140:8000/post",
          data: this.sendData,
        }).then(
          (res) => {
            this.$message.success(res.data.message);
          },
          (err) => {
            this.$message.error(err);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
div {
  text-align: center;
  color: aliceblue;
}
body {
  padding: 0;
  margin: 0;
}
.textareaReason{
  margin-top: 5px;
}
</style>