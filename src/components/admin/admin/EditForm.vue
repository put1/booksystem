<template>
  <div>
    <el-button class="add-button" round icon="el-icon-plus" type="success" @click="dialogFormVisible = true">添加图书
    </el-button>
    <el-dialog
      title="添加/编辑图书"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left">
        <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="中文或英文"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" prop="press">
          <el-input v-model="form.press" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
          <el-input v-model="form.cover" autocomplete="off" placeholder="URL/图片"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
          <el-input type="textarea" v-model="form.abs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
          <el-select v-model="form.cid" placeholder="请选择书本分类">
            <el-option label="JAVA" value="1"></el-option>
            <el-option label="Python" value="2"></el-option>
            <el-option label="Html" value="3"></el-option>
            <el-option label="Vue" value="4"></el-option>
            <el-option label="C/C++" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
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
  import ImgUpload from "../../library/ImgUpload";

  export default {
    name: "EditForm",
    components: {ImgUpload},
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          title: '',
          author: '',
          date: '',
          press: '',
          cover: '',
          abs: '',
          cid: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      clear() {
        this.$refs.imgUpload.$refs.upload.clearFiles();
        this.form = {
          id: '',
          title: '',
          author: '',
          date: '',
          press: '',
          cover: '',
          abs: '',
          category: {
            id: '',
            name: ''
          }
        }
      },
      onSubmit() {
        this.$axios
          .post('/admin/book', {
            id: this.form.id,
            cover: this.form.cover,
            title: this.form.title,
            author: this.form.author,
            date: this.form.date,
            press: this.form.press,
            abs: this.form.abs,
            cid: this.form.cid
          }).then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false;
            this.$emit('onSubmit')
          }
        })
      },
      uploadImg() {
        this.form.cover = this.$refs.imgUpload.url
      }
    }
  }
</script>

<style scoped>
  .add-button {
    margin: 5px 0 0 10px;
  }
</style>

