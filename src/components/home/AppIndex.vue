//首頁頁面
<template>
  <el-carousel :interval="4000" type="card" height="775px">
    <el-carousel-item v-for="item in books" :key="item.id">
      <el-row>
        <el-col :span="24">
          <h3>《{{item.title}}》</h3>
          <img :src="item.cover" alt="封面"
               @click="bookDetails(item.id)">
        </el-col>
      </el-row>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "AppIndex",
    data() {
      return {
        books: [],
      }
    },
    mounted: function () {
      this.loadBooks()
    },
    methods: {
      loadBooks() {
        let _this = this;
        this.$axios.post('/index/books').then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data.result
          }
        })
      },
      bookDetails(id) {
        let url = `/book?id=${id}`
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 25px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #bbbabf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #cedde6;
  }

  img {
    margin-top: 50px;
    width: 345px;
    height: 520px;
    /*margin: 0 auto;*/
  }

</style>
