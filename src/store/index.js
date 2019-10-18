import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const state = {
    userId:sessionStorage.getItem("userId") || "",
    userPic:sessionStorage.getItem("userPic") || "",
    username:sessionStorage.getItem("username") || ""
}

const actions = {
    loginActions({commit},val) {
        commit("loginMutations",val)
        
        
    }
}

const mutations = {
    loginMutations(state,params) {
        sessionStorage.setItem("username", params.username)
        sessionStorage.setItem("userPic", params.userPic)
        sessionStorage.setItem("userId", params.userId)
    },
    changUsername(state,params) {
        state.username = params;
    }
}


const store = new Vuex.Store({
    state,
    actions,
    mutations,
})

export default store;