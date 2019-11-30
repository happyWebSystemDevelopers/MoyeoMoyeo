import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import axios from 'axios'
import router from './router'
import { store } from './store'

Vue.use(Vuex);
Vue.config.productionTip = false
Vue.prototype.$Axios = axios;


// eslint-disable-next-line no-unused-vars

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
