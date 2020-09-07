import Vue from 'vue'
import App from './App'

import Dialog from '../static/vant/dist/dialog/dialog'
import toast from '../static/vant/dist/toast/toast'
import store from './utils/store'

Vue.config.productionTip = false
App.mpType = 'app'

// Vue.prototype.$img = 'http://xiangya.novocare.cn:8888'
Vue.prototype.$img = 'http://192.168.0.113:9091/'
// Vue.prototype.$img = 'https://huli.novocare.cn'
Vue.prototype.$dialog = Dialog

Vue.prototype.$toast = toast

Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
