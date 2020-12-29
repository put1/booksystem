<template>
  <div>
    <el-container>
      <el-main>
        <el-row style="text-align: left">
          <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
          <add-code @onSubmit="loadBooks()" ref="code"></add-code>
        </el-row>
        <el-card style="margin: 18px 2%;width: 95%">
          <el-table
            :data="books"
            stripe
            ref="bookTable"
            style="width: 100%"
            :max-height="tableHeight"
            @selection-change="handleSelection">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline>
                  <el-form-item>
                    <span>{{ props.row.abs }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="书名（展开查看摘要）"
              fit>
            </el-table-column>

            <el-table-column
              prop="cid"
              label="分类"
              width="100">
              <template slot-scope="scope">
                {{scope.row.cid==1?'JAVA':(scope.row.cid==2)?'Python':(scope.row.cid==3)?'Html':(scope.row.cid==4)?'Vue':'C/C++'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者"
              fit>
            </el-table-column>
            <el-table-column
              prop="date"
              label="出版日期"
              width="120">
            </el-table-column>
            <el-table-column
              prop="press"
              label="出版社"
              fit>
            </el-table-column>
            <el-table-column
              prop="count"
              label="总库存（图书总量）"
              fit>
              <template slot-scope="scope">
                {{scope.row.count}}
                <el-button
                  style="margin-left: 10px"
                  icon="el-icon-circle-plus"
                  @click.native.prevent="addCode(scope.row)"
                  circle></el-button>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editBook(scope.row)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="deleteBook(scope.row.id)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin: 20px 0 20px 0;float: left">
            <el-button @click="setCurrent()">取消选择</el-button>
            <!--<el-button>批量删除</el-button>-->
          </div>
        </el-card>
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
  import EditForm from './EditForm'
  import AddCode from "./AddCode";

  export default {
    name: "BookManager",
    components: {AddCode, EditForm},
    data() {
      return {
        books: [],
        currentPage: 1,
        pageSize: 6,
        total:this.total,
        multipleSelection: []
      }
    },
    mounted() {
      this.loadBooks()
    },
    computed: {
      tableHeight() {
        return window.innerHeight - 320
      }
    },
    methods: {
      addCode(item) {
        this.$refs.code.dialogFormVisible = true;
        this.$refs.code.form = {
          bookId: item.id,
          bookCode: item.bookCode,
        }
      },
      deleteBook(id) {
        this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios
              .post('/admin/books/delete', {id: id}).then(resp => {
              if (resp && resp.status === 200) {
                this.loadBooks()
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editBook(item) {
        this.$refs.edit.dialogFormVisible = true
        this.$refs.edit.form = {
          id: item.id,
          cover: item.cover,
          title: item.title,
          author: item.author,
          date: item.date,
          press: item.press,
          abs: item.abs,
          cid: item.cid==1?'JAVA':(item.cid==2)?'Python':(item.cid==3)?'Html':(item.cid==4)?'Vue':'C/C++'
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.loadBooks();
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.loadBooks();
      },
      setCurrent(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.bookTable.setCurrent(row);
          });
        } else {
          this.$refs.bookTable.clearSelection();
        }
      },
      handleSelection(val) {
        this.multipleSelection = val;
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
      }
    }
  }
</script>

<style scoped>

</style>
