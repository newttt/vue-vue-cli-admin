import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import Cookies from "js-cookie";
Vue.config.productionTip = false;

Vue.use(Cookies)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
