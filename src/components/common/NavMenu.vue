<template>
  <div>
    <div>
      <el-menu
        :default-active="this.$route.path"
        router
        mode="horizontal"
        background-color="white"
        text-color="black"
        active-text-color="blue"
        style="min-width: 1300px;font-size: 30px">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="margin-left: 20px">
          {{item.navItem}}
        </el-menu-item>
        <el-menu-item style="margin-left: 1350px;font-size: large;font-style: italic"
                      index="/login"
                      v-show="!loginUser">
          请登录
        </el-menu-item>
        <span style="position: absolute;padding-top: 20px;left: 50%;font-size: 20px;font-weight: bold">图书管理系统<i style="margin-left: 10px;font-size: xx-small">© ZJB</i></span>
        <el-submenu style="margin-left: 1200px" index="1" v-show="loginUser">
          <span slot="title">
            <el-avatar style="margin-right: 20px"> {{username}} </el-avatar>
            {{username}}, 欢迎登录
          </span>
          <el-menu-item index="/admin/user">
            <i class="el-icon-more"></i> 管理中心
          </el-menu-item>
          <!--<el-menu-item index="/login">-->
            <!--<i class="el-icon-s-operation"></i> 切换账号-->
          <!--</el-menu-item>-->
          <el-menu-item index="/logout">
            <i class="el-icon-switch-button"></i> 退出登录
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'NavMenu',
    data() {
      return {
        loginUser: false,
        username: this.$store.state.username,
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/library', navItem: '图书中心'},
          //{name: '/admin', navItem: '管理中心'}
        ]
      }
    },
    computed: {
      hoverBackground() {
        return '#ffd04b'
      }
    },
    mounted() {
      this.ifLogin()
    },
    methods: {
      ifLogin() {
        if (this.$store.state.username) {
          this.loginUser = true
        }
      },
    }
  }
</script>

<style scoped>
  span {
    pointer-events: none;
  }
</style>
