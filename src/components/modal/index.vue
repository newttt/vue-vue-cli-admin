<template>
    <el-form ref="form" :model="booksInfo" label-width="80px">
        <el-form-item label="书籍名称">
            <el-input v-model="booksInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="作者头像">
            <!-- <el-input v-model="booksInfo.authorIcon"></el-input> -->
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="authImg" :src="authImg" class="avatar">
               <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
               <img v-else :src="booksInfo.authorIcon" class="avatar"/>
            </el-upload>
        </el-form-item>
        <el-form-item label="作者姓名">
            <el-input v-model="booksInfo.authorName"></el-input>
        </el-form-item>
        <el-form-item label="书籍封面">
           <!-- <el-input v-model="booksInfo.icon"></el-input> -->
           <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="booksImg" :src="booksImg" class="avatar">
               <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
               <img v-else :src="booksInfo.icon" class="avatar"/>
            </el-upload>
        </el-form-item>
        <el-form-item label="标签">
            <el-checkbox-group v-model="booksInfo.bookTags">
            <el-checkbox v-for="(item,index) in tagsList" 
            :label="item" :key="index" name="type"></el-checkbox>
            
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="梗概">
            <el-input 
                type="textarea" 
                v-model="booksInfo.recommend"
                :autosize="autosize"
                ></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
            <el-input v-model="booksInfo.updateTime"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button >取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import {Form,Button,Input,CheckBox,Upload} from "element-ui"
export default {
    name:"Modal",
    props:{
        "info":{
            type:Object,
            default:{}
        }
    },
    data() {
        return {
            booksInfo:this.info,
            autosize:{minRows: 4, maxRows: 8},
            tagsList:["悬疑","灵异奇谈","阴间系列","程序员","民俗奇谈","鬼怪",
            "仙侠","脑洞","奇遇"],
            // 头像
            authImg: "",
            booksImg:""
        }
    },
    watch:{
        info:function (newVal){
            this.booksInfo = newVal;
        }
    },
    methods:{
       onSubmit(...rest) {
           console.log(this.booksInfo)
        //    console.log(rest)
       },
       handleAvatarSuccess(_id, file) {
           console.log(_id,file);
        // this.imageUrl = URL.createObjectURL(file.raw);
       },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }

}
</script>
<style>
    /* 头像上传样式 */
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: auto;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>