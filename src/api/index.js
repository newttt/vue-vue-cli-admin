import http from "@utils/http";
import axios from "axios";
import mock from "../mock";

//  首页获取 echarts数据
export const getLineApi = ()=>{
    return axios.get("/linechart")
}
//获取书籍列表
export const booksListApi = ({page, pageSize, free, group, finish, sortId}) => http("post","/api/books/booksList", {
    page,
    pageSize,
    free,
    group,
    finish,
    sortId
})

// 获取人员信息
export const getUserList = ()=>{
    return axios.get("/userlist")
}

// 注册
export const registerModuleApi = ({userId,password})=>http("post","/api/users/register",{
    userId, 
    password
})

// 登录

export const loginModuleApi = ({userId,password})=>http("post","/api/users/login",{
    userId,
    password
})
// 更改头像
export const updataPicApi = (data) => http("post", "/api/users/updateUserPic", data)


// 更改信息

export const modifyInfoApi = ({userId,username,password}) =>http("post","/api/users/updateInfo",{
    userId,
    username,
    password
})
