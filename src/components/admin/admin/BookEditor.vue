<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/admin/dashboard'}">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>图书管理</el-breadcrumb-item>
        <el-breadcrumb-item>編輯器</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-input
        v-model="book.title"
        style="margin: 10px 0px;font-size: 18px;"
        placehodler="请输入标题"></el-input>
    </el-row>
    <el-row style="height: calc(100vh - 140px);">
      <mavon-editor
        v-model="book.contentMd"
        style="height: 100%"
        ref=md
        @save="saveBooks"
        fontSize="16px">
        <button type="button" class="op-icon el-icon-document"
                :title="'摘要/封面'" slot="left-toolbar-after"
                @click="dialogFormVisible=true"></button>
      </mavon-editor>
      <el-dialog
        :visible.sync="dialogFormVisible"
        width="30%">
        <el-divider content-position="left">摘要</el-divider>
        <el-input
          type="textarea"
          v-model="book.abstract"
          rows="6"
          maxlength="255"
          show-word-limit></el-input>
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
          <el-input v-model="book.cover" autocomplete="off"
                    placeholder="图片路径/URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible=false">确定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import ImgUpload from "./ImgUpload";

  export default {
    name: "BookEditor",
    components: {ImgUpload},
    data() {
      return {
        book: {},
        dialogFormVisible: false
      }
    },
    mounted() {
      if (this.$route.params.book) {
        this.book = this.$route.params.book
      }
    },
    methods: {
      saveBooks(value, render) {
        //value-md, render-html
        this.$confirm('是否保存並发布文章？', '提示', {
          confirmButtonText: '确定',
          cancelButtonClass: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
            .post('/admin/book/editor', {
              id: this.book.id,
              title: this.book.title,
              contentMd: value,
              contentHtml: render,
              abstract: this.book.abstract,
              cover: this.book.cover,
              date: this.book.date
            }).then(resp => {
            if (resp && resp.status === 200) {
              this.$message({
                type: 'info',
                message: '成功保存'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      },
      uploadImg() {
        this.book.cover = this.$refs.imgUpload.url
      }
    }
  }
</script>

<style scoped>

</style>
