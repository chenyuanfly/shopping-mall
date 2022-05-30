import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css'
import './router/permission'
import './utils/init'
Vue.config.productionTip = false
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
