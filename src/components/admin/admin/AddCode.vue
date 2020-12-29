<template>
  <el-dialog
    title="添加/编辑图书"
    :visible.sync="dialogFormVisible"
    @close="clear">
    <el-form v-model="form" style="text-align: left">
      <el-form-item label="图书编码" prop="bookCode">
        <el-input v-model="form.bookCode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="id" style="height: 0">
        <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        <el-input type="hidden" v-model="form.bookId" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "AddCode",
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          bookId: '',
          bookCode: ''
        }
      }
    },
    methods: {
      clear() {
        this.form = {
          id: '',
          bookId: '',
          bookCode: ''
        }
      },
      onSubmit() {
        this.$axios
          .post('/admin/code', {
            id: this.form.id,
            bookId: this.form.bookId,
            bookCode: this.form.bookCode
          }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false;
            this.$emit('onSubmit')
          }
        })
      }
    }
  }

</script>

<style scoped>

</style>
