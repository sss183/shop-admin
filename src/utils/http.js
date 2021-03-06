import axios from "axios"
axios.defaults.baseURL="";
axios.defaults.timeout=3000;

axios.interceptors.request.use(config => {
// Do something before request is sent
    let token = localStorage.getItem("token")?localStorage.getItem("token"):"";
    config.headers.Authorization = token;
    return config;
},error => {
// Do something with request error
return Promise.reject(error);
});


axios.interceptors.response.use(response => {
// Do something before response is sent
return response.data;
},error => {
// Do something with response error
return Promise.reject(error);
});

/* 
封装的get请求方法
@url:string请求路径
@params:Object|string 请求参数 
: Promise 
*/
function get(url,params={}){
    return new Promise((res,rej)=>{
        axios({
            method:'get',
            url,
            params
        }).then(data=>{
            res(data)
        }).catch(err=>{
            rej(err)
        })
    })
}
/* 
封装的post请求方法
@url:string请求路径
@data:Object|string 请求参数 
: Promise 
*/
function post(url,data={}){
    return new Promise((res,rej)=>{
        axios({
            method:'post',
            url,
            data
        }).then(data=>{
            res(data)
        }).catch(err=>{
            rej(err)
        })
    })
}


export default {
    get,
    post
}

