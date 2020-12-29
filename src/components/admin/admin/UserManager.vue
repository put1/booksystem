<template>
  <div>
    <el-container>
      <el-main>
        <el-row style="text-align: left">
          <user-editor @onSubmit="loadUsers()" ref="userEditor"></user-editor>
        </el-row>
        <el-row>
          <el-card style="margin: 18px 2%;width: 95%">
            <el-table :data="userData"
                      stripe
                      style="width: 100%"
                      :default-sort="{prop: 'username', order: 'descending'}"
            >
              <el-table-column label="用户名" width="180" sortable>
                <template prop="username" slot-scope="scope">
                  <span>{{scope.row.username}}</span>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.email}}</span>
                </template>
              </el-table-column>
              <el-table-column label="电话" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.phone}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="enable" label="状态" width="180">
                <template slot-scope="scope">
                  <el-tag type="success" v-show="scope.row.enable=='1'">正常</el-tag>
                  <el-tag type="danger" v-show="scope.row.enable=='0'">禁用</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="role" label="权限" width="180">
                <template slot-scope="scope">
                  {{scope.row.role==1?'管理員':'用戶'}}
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="180" sortable>
                <template slot-scope="scope">
                  <span>{{scope.row.createTime}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" label="更新時間" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.updateTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini"
                             icon="el-icon-edit" circle
                             @click.native.prevent="editUser(scope.row)"></el-button>
                  <el-button type="danger" size="mini"
                             icon="el-icon-delete" circle
                             @click.native.prevent="deleteUser(scope.row.id)"></el-button>
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
  import UserEditor from "./UserEditor";

  export default {
    name: "UserManager",
    components: {UserEditor},
    data() {
      return {
        userData: [],
        currentPage: 1,
        pageSize: 9,
        total:this.total
      }
    },
    mounted: function () {
      this.loadUsers()
    },
    methods: {
      loadUsers() {
        var _this = this;
        this.$axios.post('/admin/users',{
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }).then(resp => {
          if (resp && resp.status === 200) {
            //console.log(resp);
            _this.userData = resp.data.result.list;
            _this.total=resp.data.result.total
          }
        })
      },
      editUser(item) {
        this.$refs.userEditor.dialogFormVisible = true;
        this.$refs.userEditor.form = {
          id: item.id,
          username: item.username,
          email: item.email,
          phone: item.phone,
          password: item.password,
          role: item.role,
          enable: item.enable
        }
      },
      deleteUser(id) {
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonClass: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
            .post('/admin/users/delete', {id: id}).then(resp => {
            if (resp && resp.status === 200) {
              this.loadUsers()
              this.$message({message: '刪除成功', type: 'success'})
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.loadUsers();
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.loadUsers();
      },
    }
  }
</script>

<style scoped>

</style>
