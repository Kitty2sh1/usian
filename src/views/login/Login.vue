<template>
  <div class="login">
    <div class="login-form">
      <h1>会员管理系统</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "../../api/index"
// import hhh from "../../api/test.js"
export default {
  data() {
    return {
      ruleForm: {
        username: "",  //账号
        password: ""   //密码
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // 点击登录
    loginSubmitForm(formName) {
      // 验证
      this.$refs[formName].validate((valid) => {
        // 验证成功
        if (valid) {
          // 发送请求获取登录和用户信息
          this.queryLogin()  //登录
          console.log(1123);
        } else {
          this.$message({
            message: '登录失败',
            type: 'error'
          });
          return false;
        }
      });
    },
    // 登录方法
    async queryLogin() {
      const token = await this.$store.dispatch('queryLogin', this.ruleForm)
      if (!token) return
      const userinfo = await this.$store.dispatch('queryUserInfo')
      if (!userinfo) return
      // 提示信息
      this.$message({
        message: '登录成功',
        type: 'success'
      });
      // 跳转登录页面
      this.$router.push('/')
    },
  },
  computed: {},
  created() { }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url('http://vue.mengxuegu.com/img/login.b665435f.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  .login-form {
    width: 400px;
    height: 300px;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 20px;
    margin: 160px auto;
    padding: 25px;
    box-sizing: border-box;

    h1 {
      color: #303133;
      font-size: 24px;
      text-align: center;
      margin: 20px 0;
    }

    ::v-deep .el-form {
      padding-right: 20px;
    }
  }
}
</style>