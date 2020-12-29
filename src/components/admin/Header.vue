<template>
  <el-card class="admin-header">
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 50%">管理中心</span>
    <el-dropdown @command="handleCommand" style="float: right;margin-right: 10%">
      <span style="font-size: 20px;font-style: italic" v-model="username">
        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <!--<el-dropdown-item icon="el-icon-sort" command="switch">切换账号</el-dropdown-item>-->
        <el-dropdown-item icon="el-icon-switch-button" command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--<i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>-->
  </el-card>
</template>

<script>
  //import {createRouter} from "../../router";

  export default {
    name: "Header",
    data() {
      return {
        username: this.$store.state.username
      }
    },
    methods: {
      handleCommand(command) {
        if (command ='logout') {
          this.$router.replace('/logout')
        }
        // if (command = 'switch') {
        //   this.$router.replace('/login');
        // }
      }
    }
  }
</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }
</style>
