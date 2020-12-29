<template>
  <body id="paper">
  <el-form
    :model="registerForm"
    :rules="rules"
    class="login-container" label-position="left"
    label-width="0px" v-loading="loading">
    <h3 class="login_title">用户注册</h3>
    <el-form-item>
      <el-input type="text" v-model="registerForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="registerForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="registerForm.email"
                auto-complete="off" placeholder="######@example.com"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="registerForm.phone"
                auto-complete="off" placeholder="国内手机号"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width:40%; background: #505458;border: none"
                 v-on:click="register">注册
      </el-button>
      <el-button type="primary" style="width:40%; background:#d9ecff;border: none" v-on:click="clear">取消</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
        },
        checked: true,
        registerForm: {
          username: '',
          password: '',
          email: '',
          phone: ''
        },
        loading: false
      }
    },
    methods: {
      clear() {
        this.registerForm = {
          username: '',
          password: '',
          email: '',
          phone: ''
        };
        this.$router.replace('/login')
      },
      register() {
        let _this = this;
        this.$axios
          .post('/register', {
            username: this.registerForm.username,
            password: this.registerForm.password,
            email: this.registerForm.email,
            phone: this.registerForm.phone,
            createTime: this.getDate(),
            updateTime: this.getDate()
          })
          .then(resp => {
            if (resp.data.code === 200) {
              this.$alert('注册成功', '提示', {
                confirmButtonText: '确定'
              });
              _this.$router.replace('/login')
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          }).catch(failResponse => {
        })
      },
      getDate: function () {     //这里返回时间
        var date = new Date();
        var separator1 = "-";
        var separator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentDate = date.getFullYear() + separator1 + month + separator1 + strDate
          + " " + date.getHours() + separator2 + date.getMinutes()
          + separator2 + date.getSeconds();

        return currentDate;
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
    margin: -5px 0px;
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
</style>
