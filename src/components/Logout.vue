<template>
  <h1><i class="el-icon-loading"></i> 正在退出。。。。{{count}}秒</h1>
</template>

<script>
  import {createRouter} from "../router";

  export default {
    name: "Logout",
    data() {
      return {
        count: ''
      }
    },
    methods: {
      Jump() {
        const timejump = 2;
        if (!this.timer) {
          this.count = timejump;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 1 && this.count <= timejump) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              this.logout();
            }
          }, 1000)
        }
      },
      logout() {
        let _this = this;
        this.$axios.get('/logout').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.$store.commit('logout');
            _this.$router.replace('/index');
            this.$message({message: '登出成功', type: 'success'});
            // 清空路由，防止路由重复加载
            const newRouter = createRouter();
            _this.$router.matcher = newRouter.matcher
          }
        }).catch(failResponse => {
        })
      }
    },
    mounted() {
      this.Jump()
    }
  }
</script>

<style scoped>

</style>
