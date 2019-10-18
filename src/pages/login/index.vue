<template>
    <Loging v-if="flag" @loginHandler = "changePage"/>
    <Register v-else @registerHandler="changePage"/>
</template>
<script>
import Loging from "./login";
import Register from "./register";
export default {
    name:"Login",
    data() {
        return {
            flag:true
        }
    },
    components:{
        Loging,
        Register
    },
    methods:{
        changePage(val) {
            this.flag = val
        }
    }
}
</script>