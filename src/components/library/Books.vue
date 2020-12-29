<template>
  <div>
    <div>
      <el-row style="height: 850px; margin-bottom: 20px">
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
        <el-tooltip effect="dark" placement="right"
                    v-for="item in books"
                    :key="item.id">
          <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
          <p slot="content" style="font-size: 13px;margin-bottom: 6px">
            <span>{{item.author}}</span> /
            <span>{{item.date}}</span> /
            <span>{{item.press}}</span>
          </p>
          <el-card style="width: 145px;margin-bottom: 20px;height: 243px;float: left;margin-right: 15px" class="book"
                   bodyStyle="padding:10px" shadow="hover">
            <div class="cover" @click="bookDetails(item.id)">
              <img :src="item.cover" alt="封面">
            </div>
            <div class="info">
              <div class="title">
                <a href="">{{item.title}}</a>
              </div>
              <div class="author">
                {{item.author}}
              </div>
            </div>
          </el-card>
        </el-tooltip>
      </el-row>
    </div>
    <div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import SearchBar from './SearchBar'

  export default {
    name: "Books",
    components: {SearchBar},
    data() {
      return {
        books: [],
        currentPage: 1,
        pageSize: 18,
        total:this.total
      }
    },
    mounted: function () {
      this.loadBooks()
    },
    methods: {
      bookDetails(id) {
        let url = `/book?id=${id}`
        this.$router.push(url)
      },
      loadBooks() {
        var _this = this;
        this.$axios.post('/books',{
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data.result.list;
            _this.total=resp.data.result.total
          }
        })
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.loadBooks()
      },
      searchResult() {
        var _this = this;
        this.$axios
          .get('/search?keywords=' + this.$refs.searchBar.keywords).then(resp => {
          if (resp && resp.data.code === 200) {
            _this.books = resp.data.result
          }
        })
      },
    }
  }
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 170px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
    margin-bottom: 5px;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    text-align: left;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
