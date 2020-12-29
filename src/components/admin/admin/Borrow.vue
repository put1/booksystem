<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-card style="margin: 18px 2%;width: 95%">
            <el-table :data="borrowData"
                      stripe
                      style="width: 100%"
            >
              <el-table-column prop="bookName" label="书名" width="280">
                <template slot-scope="scope">
                  <span>{{scope.row.bookName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="书籍编码" width="fit">
                <template slot-scope="scope">
                  <span>{{scope.row.bookCode}}</span>
                </template>
              </el-table-column>
              <el-table-column label="借阅用户" width="240">
                <template slot-scope="scope">
                  <span>{{scope.row.username}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="borrowDate" label="借阅时间" width="180" sortable>
              </el-table-column>
              <el-table-column prop="expireTime" label="归还期限" width="180">
              </el-table-column>
              <el-table-column label="状态" width="180">
                <template slot-scope="scope">
                  <el-tag type="warning" v-show="(countTime(scope.row.expireTime)<0) && (scope.row.returnFlag ==0)">未归还</el-tag>
                  <el-tag type="danger" v-show="(countTime(scope.row.expireTime)>0) && (scope.row.returnFlag ==0)">已超时</el-tag>
                  <el-tag type="success" v-show="scope.row.returnFlag ==1">已归还</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-row>
      </el-main>
      <el-footer>
        <el-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 6, 9, 11]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Borrow",
    data() {
      return {
        borrowData: [{
          borrowDate:'',
          expireTime:'',
          returnFlag:''
        }],
        currentPage: 1,
        pageSize: 9,
        total:this.total
      }
    },
    mounted: function () {
      this.loadList()
    },
    methods: {
      loadList() {
        let _this = this;
        this.$axios.post('/admin/borrowList',{
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.borrowData = resp.data.result.list;
            _this.total=resp.data.result.total
          }
        })
      },
      countTime(time){
        let begin=new Date(time);
        let end=new Date();
        //console.log(begin,end,end.getTime() - begin.getTime());
        return end.getTime() - begin.getTime();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.loadList()
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.loadList()
      },
    }
  }
</script>

<style scoped>

</style>
