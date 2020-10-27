import Vue from "vue"
import Vuex from "vuex"
import http from "./../utils/http"
import router from "./../router"
import { Message } from 'element-ui';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // token
        // 如果localStorage有 token说明已登录，没有则是没有登录
        token:localStorage.getItem("token")?localStorage.getItem("token"):"",
        // info登录用户信息
        info: localStorage.getItem("info")?JSON.parse(localStorage.getItem("info")):{}
    },
    mutations: {
        // 保存登录数据
        // payload:token&& info
        setInfo(state, payload) {
            console.log(payload)
            // 数据在 vuex 随着页面刷新而重置，保存一分在localStorage中
            localStorage.setItem("token", payload.token);
            localStorage.setItem("info", JSON.stringify(payload.info));
            state.token = payload.token;
            state.info = payload.info;
        },
        // 清空登录信息
        clearInfo(state, payload) {
            localStorage.clear();
            state.token = "";
            state.info = {};
        }
    },
    actions: {
        userLogin(context, payload) {
            console.log(payload)
            http.post("/api/userlogin", payload).then(res => {
                console.log(res)
                // 登录成功
                if (res.code == 200) {
                    context.commit("setInfo",{token:res.list.token,info:res.list});
                    router.replace("/index")
                } else {
                    // 登录失败
                    //  Message({
                    //     type:"error",
                    //     msg:res.msg
                    // }) 
                    Message.error(res.msg)
                }
            })
        }
    }
})
