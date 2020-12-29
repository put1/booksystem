<template>
  <div>
    <el-dialog
      title="编辑个人信息"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form :model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled type="text" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.phone" autocomplete="off"></el-input>
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
          email: '',
          phone: '',
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      clear() {
        this.form = {
          id: '',
          email: '',
          phone: '',
        }
      },
      onSubmit() {
        this.$axios
          .post('/user', {
            id: this.form.id,
            email: this.form.email,
            phone: this.form.phone,
          }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false;
            this.$emit('onSubmit');
            this.$message.success("修改成功");
          } else {
            this.$message.warning("修改失败")
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
