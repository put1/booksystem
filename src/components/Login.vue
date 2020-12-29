<template>
  <body id="paper">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position='left' label-width="0px"
           v-loading="loading"
  >
    <h3 class="login_title">图书管理系统</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" style="margin-bottom: 10px">
      <el-input type="password" auto-complete="off" v-model="loginForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" name="rememberMe"
                 label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>
    <el-form-item>
      <el-button type="primary" @click="login" style="width: 40%;background: #505458;border: none">登录</el-button>
      <router-link to="register">
        <el-button type="primary" style="width: 40%;background: #505458;border: none">注册</el-button>
      </router-link>
      <router-link to="index">
        <el-button type="primary" style="width: 40%;border: none;margin-top: 10px">返回</el-button>
      </router-link>
    </el-form-item>
  </el-form>
  </body>


</template>

<script>
  import {createRouter} from "../router";

  export default {
    name: "Login",
    data() {
      return {
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        },
        checked: true,
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      login() {
        let _this = this;
        console.log(this.$store.state)
        this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              // // 清空路由，防止路由重复加载
              // const newRouter = createRouter();
              // _this.$router.matcher = newRouter.matcher;
              this.$router.replace({path: '/index'});
              let data = successResponse.data.result;
              _this.$store.commit('login', data);
              let path = this.$route.query.redirect;
              this.$router.replace({path: path})
            } else {
              this.$alert(successResponse.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {
          })
      }
    }
  }
</script>

<style scoped>
  #paper {
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
