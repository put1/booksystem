<!--图书页面跟组件-->
<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
      <Books class="books-area" ref="booksArea"></Books>
    </el-main>
  </el-container>
</template>

<script>
  import SideMenu from './SideMenu'
  import Books from './Books'
  import EditForm from "../admin/admin/EditForm";

  export default {
    name: "LibraryIndex",
    components: {EditForm, SideMenu, Books},
    methods: {
      listByCategory() {
        var _this = this;
        var cid = this.$refs.sideMenu.cid;
        var url = 'categories/' + cid + '/books';
        this.$axios.get(url,{
          pageNum:this.$refs.booksArea.currentPage,
          pageSize:this.$refs.booksArea.pageSize
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.$refs.booksArea.books = resp.data.result.list;
            _this.$refs.booksArea.currentPage = 1;
            _this.$refs.booksArea.total=resp.data.result.total
          }
        })
      }
    }
  }
</script>

<style scoped>
  .books-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
