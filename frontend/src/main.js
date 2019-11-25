import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import axios from 'axios'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$Axios = axios;
// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state:{
  },
  mutations:{
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
