<template>
    <div id="login-page">
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
                >没有账号?现在注册吧!</p>
            </el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form>
    </div>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
import {loginModuleApi} from "@api";
import {Button,Input,Form} from "element-ui";
export default {
    name:"Loging",
    data() {
        return {
            formLabel:{
                userId:"",
                password:""
            }
        }
    },
    methods:{
        ...mapActions({
            loginHandler:"loginActions",
        }),
        async onSubmit() {
            let {userId,password} = this.formLabel;
            let data = await loginModuleApi({userId,password});
            if(data.code === 1) {
                data.info.userId = userId
                this.loginHandler(data.info)
                this.$message({
                    showClose: true,
                    message: '登录成功,正在跳转页面',
                    type: 'success',
                    onClose:this.$router.push("/home")
                });
            }  
        },
        goRegisterHandler() {
            this.$emit("loginHandler",false)
        }
    }
}
</script>
<style scoped>
#login-page {
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