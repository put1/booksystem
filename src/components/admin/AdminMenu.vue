<template>
  <div>
    <el-card style="opacity: 0.85;">
      <el-menu
        :default-active="this.$route.path"
        router
        mode="vertical"
        class="el-menu"
        collapse-transition
        style="text-align: left;font-weight: bold"
      >
        <el-menu-item index="/index">
          <i class="el-icon-arrow-left"></i>
          <span slot="title">返回首页</span>
        </el-menu-item>
        <el-submenu v-for="(item,i) in Menus"
                    :key="i"
                    :index="(i).toString()">
          <span slot="title">
            <i :class="item.iconCls"></i>
            {{item.nameZh}}
          </span>
          <el-menu-item v-for="child in item.children"
                        :key="child.path"
                        :index="child.path">
            <i :class="child.iconCls"></i>
            {{child.nameZh}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
  import {createRouter} from "../../router";

  export default {
    name: "AdminMenu",
    data() {
      return {
        user: {
          username: this.$store.state.username
        }
      }
    },
    computed: {
      Menus() {
        return this.$store.state.adminMenus
      }
    },
    methods: {
      logout() {
        let _this = this
        this.$axios.get('/logout').then(resp => {
          if (resp && resp.data.status === 200) {
            _this.$store.commit('logout');
            _this.$router.replace('/index');
            const newRouter = createRouter()
            _this.$router.matcher = newRouter.matcher
          }
        }).catch(failResponse => {
        })
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    border-radius: 5px;
    height: 100%;
  }
</style>
