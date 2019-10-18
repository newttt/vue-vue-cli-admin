import Vue from "vue";
import Router from "vue-router";
import Login from "./login";
import Home from "./home";
import Books from "./books";
import User from "./user";
import Cookies from "js-cookie";

Vue.use(Router);


let router =  new Router({
    routes:[
        {
            path: "/",
            redirect: '/home',
        },
        Home,
        Books,
        User,
        Login
    ]
})


router.beforeEach((to,from,next)=>{
    if(to.path !== "/login") {
        if(Cookies.get("token")) {
            next();
        }else {
            next("/login?path=" + to.path)
        }
        
    }else {
        next();
    }
    
})

export default router












