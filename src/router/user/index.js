
export default {
    path: "/user",
    name: "User",
    redirect: '/user/userList',
    component: () => import("@pages/user"),
    children:[
        {
            path:"/user/userList",
            name:"UserList",
            component:()=>import("@pages/user/userList"),
        },
        {
            path:"/user/userInfo",
            name: "UserInfo",
            component: () => import("@pages/user/userInfo"),
        },
    ]
}