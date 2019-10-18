<template>
    <div id="register-page">
    <div class="login-content">
        <el-form label-width="80px" :model="formLabel">
            <el-form-item label="用户账号">
                <el-input v-model="formLabel.userId"></el-input>
            </el-form-item>
            <el-form-item label="密  码">
                <el-input v-model="formLabel.password"></el-input>
            </el-form-item>
            <el-form-item>
                <p class="info"
                    @click="goRegisterHandler()"
                >已有账号,马上登录!</p>
            </el-form-item>
                <el-button type="primary" @click="onSubmit">立即注册</el-button>
        </el-form>
    </div>
    </div>
</template>
<script>
import {registerModuleApi} from "@api"
export default {
    name:"Register",
    data() {
        return {
            formLabel:{
                userId:'',
                password:''
            }
        }
    },
    methods:{
        async onSubmit() {
            let {userId,password} = this.formLabel
            let data = await registerModuleApi({userId,password});
            if(data.code === 1) {
                this.$message({
                    showClose: true,
                    message: '恭喜你，已注册成功,请登录',
                    type: 'success',
                    onClose:this.goRegisterHandler()
                });
            }else {

            }
        },
        goRegisterHandler() {
            this.$emit("registerHandler",true)
        }
    }
}
</script>
<style scoped>
#register-page {
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 100%;
    background:url("https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png") no-repeat;
}
.login-content {
    margin:auto;
    width: 500px;
    height: 250px;
    padding: 20px;
    padding-right: 30px;
    padding-top: 30px;
    background: rgba(255,255,255,.8);
}
    .info {
        margin:0;
        color:#409EFF; 
        cursor:pointer;
       
    }
    .el-button {
        margin-left: 10px;
        width: 100%;
    }

</style>