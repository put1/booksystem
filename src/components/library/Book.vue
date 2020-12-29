<template>
  <el-container>
    <el-header>
      <nav-menu></nav-menu>
    </el-header>
    <el-container>
      <el-aside width="400px" class="info" v-model="books">
        <el-row style="margin: 18px 0px 0px 18px ">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/library'}">图书中心</el-breadcrumb-item>
            <el-breadcrumb-item>《{{books.title}}》详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>
        <el-card style="opacity: 0.85;
    line-height: 40px;margin-top: 18px">
          <div>
            <img class="cover" :src="books.cover"/>
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <div style="margin-top: 25px;margin-bottom: 25px">
          <span style="font-size: 20px;font-weight: bold">
            《{{books.title}}》详情
          </span>
        </div>
        <el-card class="details">
          <div>
            作者： {{books.author}}
          </div>
          <div>
            出版日期：{{books.date}}
          </div>
          <div>
            出版社：{{books.press}}
          </div>
          <div>
            库存量：{{books.count}}
          </div>
          <el-button type="primary" style="background-color: #3dce8a;text-align: center;margin-top: 50px"
                     v-on:click="borrow(books.id)">借阅
          </el-button>
        </el-card>
        <el-card class="abstract">
          <div>
            <h1>摘要</h1>
            <div style="text-align: left">{{books.abs}}</div>
          </div>
        </el-card>

      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  import NavMenu from "../common/NavMenu";

  export default {
    name: "book",
    components: {NavMenu},
    data() {
      return {
        books: []
      }
    },
    mounted: function () {
      let id = this.$route.query.id;
      this.loadBook(id)
      //console.log(id)
    },
    methods: {
      loadBook(id) {
        let _this = this;
        this.$axios.post('/book?id=' + id).then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data.result
          }
        })
      },
      borrow(id) {
        let _this = this;
        if (this.$store.state.username) {
          this.$axios.post('/borrow?id=' + id, {username: this.$store.state.username}).then(resp => {
            if (resp.data.code === 200) {
              this.$message.success("借阅成功");
              this.loadBook(id);
            }
            else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          }).catch(failResponse => {
          })
        } else {
          this.$alert("需要登录", '提示', {
            confirmButtonText: '确定'
          })
          _this.$router.replace('/login')
        }
      }
    }
  }
</script>

<style scoped>
  .cover {
    width: 345px;
    height: 510px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  .details {
    text-align: left;
    font-family: -apple-system, fantasy;
    display: inline-block;
    width: 350px;
    height: 500px;
    background-color: #fff2ea;
    line-height: 50px;
  }

  .abstract {
    float: right;
    display: inline-block;
    width: 1000px;
    height: 500px;
    background-color: #fff2ea;
    line-height: 30px;
  }

</style>
