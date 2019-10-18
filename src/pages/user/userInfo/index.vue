<template>
    <div id="userinfo-page">
        <h2>头像上传</h2>
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="iconUploadHandler"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <h2>修改用户名或密码</h2>
        <div class="modify-info">
            <el-form label-width="80px" :model="formLabel">
            <el-form-item label="用户名">
                <el-input v-model="formLabel.username" :placeholder="placeholder"></el-input>
            </el-form-item>
            <el-form-item label="密  码">
                <el-input v-model="formLabel.password"></el-input>
            </el-form-item>
            <el-button type="primary" @click="modifyHandler()">修改</el-button>
        </el-form>
        </div>
    </div>
</template>
<script>
import {Upload,Form,Input,Button} from "element-ui";
import {updataPicApi,modifyInfoApi} from "@api";
import {mapMutations} from "vuex";
export default {
    name:"UserInfo",
     data() {
      return {
        imageUrl: sessionStorage.getItem("userPic") || "",
        // 修改信息
        formLabel:{
            username:"",
            password:"",
        },
        placeholder:sessionStorage.getItem("username") || "",
      };
    },
    methods: {
        async iconUploadHandler(val) {
            let formData = new FormData();
            let userId = JSON.parse(sessionStorage.getItem("userId"))
            formData.append("userId",userId);
            formData.append("userPic",val.file);
       
            let data = await updataPicApi(formData);
            if(data.info === "修改成功") {
                sessionStorage.setItem("userPic",data.urlPic)
            }else{
                this.$message.error('修改失败');
            }
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
                this.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success',
                });
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
        },
        // 修改
        async modifyHandler() {
            let {username,password} = this.formLabel
            let userId = JSON.parse(sessionStorage.getItem("userId"));
            let data = await modifyInfoApi({userId,username,password})
            console.log(data)
            if(data.info.msg === '修改成功') {
                this.changUsername(username);
                sessionStorage.setItem("username",username);
                this.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success',
                });
            }else {
                this.$message.error('修改失败');
            }
        },
        ...mapMutations({
            changUsername:"changUsername"
        })
    },
    
}
</script>
<style scoped>
    #userinfo-page {
        width: 100%;
        height: 100%;
    }
      .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background:#fff;
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
    width: 178px;
    height: 178px;
    display: block;
  }
  .modify-info {
      width:300px;

  }
  .el-button {
    width: 100%;
    margin-left: 18px;
  }
</style>