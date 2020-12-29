<template>
  <div>
    <el-button type="success" icon="el-icon-plus" round @click="dialogFormVisible=true">添加用戶</el-button>
    <el-dialog
      title="添加用戶"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form :model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请分配权限">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="用户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="禁用状态" :label-width="formLabelWidth">
          <el-switch
            style="display: block;padding-top: 8px"
            v-model="form.enable"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "UserEditor",
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          username: '',
          email: '',
          phone: '',
          password: '',
          role: '',
          enable: '',
          createTime: '',
          updateTime: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      clear() {
        this.form = {
          id: '',
          username: '',
          email: '',
          phone: '',
          password: '',
          role: '',
          enable: '',
          createTime: '',
          updateTime: ''
        }
      },
      getDate: function () {
        //这里返回时间
        let date = new Date();
        let separator1 = "-";
        let separator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentDate = date.getFullYear() + separator1 + month + separator1 + strDate
          + " " + date.getHours() + separator2 + date.getMinutes()
          + separator2 + date.getSeconds();

        return currentDate;
      },
      onSubmit() {
        this.$axios
          .post('/admin/userUpdate', {
            id: this.form.id,
            username: this.form.username,
            email: this.form.email,
            phone: this.form.phone,
            password: this.form.password,
            role: this.form.role,
            enable: this.form.enable,
            createTime: this.getDate(),
            updateTime: this.getDate()
          }).then(resp => {
          if (resp.data.code === 200) {
            this.dialogFormVisible = false;
            this.$message({message: resp.data.result, type: 'success'});
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        }).catch(failResponse => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
