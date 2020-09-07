// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  userData: {},
  //  状态栏+标题栏
  statusBarHeight: null,
  // 屏幕高
  screenHeight: null,
  // 可视窗口高
  windowHeight: 0,
  // 详情页跳预前评估页 的参数
  active: '',
  orderList: [],
  imgList: [],
  selectType: {},
  saveData: [],
  orderNo: '', // 订单编号
  address: {}, // 护士经纬度
  oldOrder: '',
  oldData: {},
  prefData: {},
  status: 0, // 0 服务完成,不能编辑  1表示可以编辑
  weihuData: {},
  isAppUserData: {}, // 记录是否是app进入的用户
  isAppSource: '' // 记录app来源
}
let mutations = {
  mutationsIsAppUser (state, data) {
    state.isAppUserData = data
  },
  mutationsIsAppSource (state, data) {
    state.isAppSource = data
  },
  changeWeihuData (state, data) {
    state.weihuData = data
  },
  increment: (state, data) => {
    state.userData = data
  },
  barHeight: (state, data) => {
    state.statusBarHeight = data
  },
  mScreenHeight: (state, data) => {
    state.screenHeight = data
  },
  mWindowHeight: (state, data) => {
    state.windowHeight = data
  },
  changeActive: (state, data) => {
    state.active = data
  },
  mOrderList_1: (state, data) => {
    state.orderList = data
  },
  changeImgList: (state, data) => {
    state.imgList = data
  },
  hasSelectType: (state, data) => {
    state.selectType = data
  },
  hasSaveSelectType: (state, data) => {
    if (data.length > 0 || Object.keys(data).length > 0) {
      let temp = 0
      let flag = false
      state.saveData.forEach((el, index) => {
        if (el.complicationId === data.complicationId) {
          temp = index
          flag = true
        }
      })
      if (flag) {
        state.saveData.splice(temp, 1)
      }
      state.saveData.push(data)
    } else {
      state.saveData = data
    }
  },
  saveOrderNo: (state, data) => {
    state.orderNo = data
  },
  saveMyaddress: (state, data) => {
    state.address = data
  },
  changeOldOrder: (state, data) => {
    state.oldOrder = data
  },
  saveOldata: (state, data) => {
    state.oldData = data
  },
  savePref (state, data) {
    state.prefData = data
  },
  isWelStatus (state, data) {
    state.status = data
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
