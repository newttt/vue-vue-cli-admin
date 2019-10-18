import axios from "axios";
// 创建实例 进行axios自定义配置
let http = axios.create({
    // 是否可以携带cookie
    withCredentials:true,
    // 请求几秒后未响应停止请求
    timeout: 3000
})

//  请求拦截

http.interceptors.request.use(config=>{
    // axios 要求get方式用params进行接收, post 要求用data进行接收, 在请求拦截时, 可以使发送的数据全部用data 拦截后, 在将data 转化成get方式所需的params
    if(config.method === "get") {
        config.params = {...config.data}
    }else if(config.method === "post") {
        // 根据后端要求请求的文本格式, 可以设置请求头, config.headers["content-type"] = "application/x-www-form-urlencoded";
    }
    // 一定要返回config
    return config;
},err=>{
    // axios 拥有 Promise的Api
    return Promise.reject(err);
})

// 响应拦截

http.interceptors.response.use(res=>{
    if(res.status === 200) {
        return res.data.data;
    }else {
        return res.status
    }
    
})


export default (method,url,data)=>{
    return http({method,url,data})
}









