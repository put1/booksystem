<template>
  <div>
    <el-row>
      <h1>用户详情页面</h1>
    </el-row>
    <el-row>
      <el-card class="box-card" v-model="userForm">
        <user-editor @onSubmit="loadUsers(userForm.username)" ref="userEditor"></user-editor>
        <div slot="header" class="clearfix">
          <span>用户详情</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editUser(userForm)">编辑</el-button>
        </div>
        <div>
          <div style="margin-bottom: 14px">
            <span>用户名：{{userForm.username}}</span>
          </div>
          <div style="margin-bottom: 14px">
            <span>邮箱：{{userForm.email}}</span>
          </div>
          <div style="margin-bottom: 14px">
            <span>电话：{{userForm.phone}}</span>
          </div>
          <div style="margin-bottom: 14px">
            <span>权限：{{userForm.role==1?'管理员':'用户'}}</span>
          </div>
        </div>
        <!--<div style="float: right;margin-bottom: 20px">-->
          <!--<el-button type="warning" @click="resetPassword">重置密码</el-button>-->
        <!--</div>-->
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import UserEditor from "./UserEditor";

  export default {
    name: "UserProfile",
    components: {UserEditor},
    data() {
      return {
        userForm: []
      }
    },
    mounted: function () {
      //let username = this.$store.state.username;
      //console.log(username)
      this.loadUser()
    },
    methods: {
      loadUser() {
        let _this = this;
        let url = '/users/' + this.$store.state.username + '/user';
        this.$axios.get(url).then(resp => {
          if (resp && resp.status === 200) {
            _this.userForm = resp.data;
          }
        })
      },
      resetPassword() {
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.$axios.put('/user/resetPassword', {password: value}).then(resp => {
            if (resp && resp.data.code === 200) {
              this.$alert("重置密码成功", '提示', {
                confirmButtonText: '确定'
              })
            }else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      editUser(user) {
        this.$refs.userEditor.dialogFormVisible = true;
        this.$refs.userEditor.form = {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
        }
      }
    }
  }
</script>

<style scoped>
  span {
    font-size: 18px;
    margin-bottom: 30px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    text-align: left;
    line-height: 20px;
    width: 400px;
  }
</style>
