/* eslint-disable no-undef */
import toast from '../../static/vant/dist/toast/toast'

const ISREADPROTOCOLV = '/nurse/user/isReadProtocol/' // 同意协议
const NURSEVALIDATION = '/nurse/user/realNameAuthentication' // 护士实名认证 post
const PAGING = '/nurse/welfare/findWelfareOrderByPage' // 按状态分页查询订单列表 post
const NURSELOGIN = '/nurse/user/nurseLogin' // 护士登录 post
const ORDERDETAIL = '/nurse/welfare/findWelfareOrderDetail/' // 根据订单编号查询订单详情get
const RETURNORDER = '/nurse/welfare/returnWelfareOrder' // 订单回退 post
const CANCELORDER = '/nurse/welfare/cancelWelfareOrder/' // 取消订单 post
const CONFIRMORDER = '/nurse/welfare/confirmReceiveOrder' // 确认接单 post
const FINDUSERPIC = '/nurse/user/findUserPictureByUserId/' // get 跟据患者id查询患者导管照片
const ISREIVEORDER = '/nurse/welfare/isReiveOrder/' // 接单-相同日期订单校验
const COMPLETEWELFAREORDER = '/nurse/welfare/completeWelfareOrder' // 完成服务-其他服务订单确定按钮
const SELECTOTHERWE = '/nurse/welfare/selectOtherWelfareInfo/' // 查看服务耗材
const SAVECHECK = '/nurse/welfare/saveCheckResultInfo' // 保存或者修改检查检验结果
const GETCHECKRESULTINFO = '/nurse/welfare/getCheckResultInfo/' // 查询检查检验结果
const SELECTCOMPLICATIONLIST = '/nurse/welfare/selectComplicationList' // 并发症类型数据列表
const SAVEORUPDATEDEFEND = '/nurse/welfare/saveOrUpdateDefendEstimatInfo' // 保存或者修改维护评估记录
const GETDEFENDESTIMAT = '/nurse/welfare/getDefendEstimatInfo/' // 查询维护评估记录
const resetPwd = `/nurse/user/modifyPassword/`
const startWelfareOrder = '/nurse/welfare/startWelfareOrder/'
const updateAddress = '/nurse/user/realTimeUpdateNurseAddrInfo'
const myPatientList = '/nurse/user/myPatientList' // 护士端 我的患者
// -----------------
const CANCELORDER_ = '/patient/order/cancelOrder/' // 取消订单
const SAVEAUTHINFO = '/patient/user/saveAuthInfo' // 上传患者认证信息
const BINDPHONE = '/patient/user/bindPhone/' // 患者端绑定手机号
const ADDWELFAREORDER = '/patient/order/addWelfareOrder' // 患者下单
const GETAUTHINFO = '/patient/user/getAuthInfo' // 查询患者认证信息
const ONDEXINFO = '/patient/goods/indexInfo' // 首页数据
const WELFAREDETAIL = '/patient/goods/welfareDetail/' // 服务详情
const BYWELFARELD = '/patient/goods/appraiseListByWelfareId/' // 订单评价列表
const ORDERLISTONGOING = '/patient/goods/orderListOngoing' // 订单列表-进行中
const ORDERLISTFINISHED = '/patient/goods/orderListFinished' // 订单列表-已结束
const ORDERLISTCANCLED = '/patient/goods/orderListCancled' // 订单列表-已取消
const ORDERDETAIL_ = '/patient/order/orderDetail/' // 订单详情
const SAVEADDRESSINFO = '/patient/user/saveAddressInfo' // 保存患者填写的地址信息
const GETADDRESSINFO = '/patient/user/getAddressInfo' // 查询患者的地址信息
const SAVEAPPRAISE = '/patient/order/saveAppraise' // 保存评价
const SAVECOMPLAINT = '/patient/order/saveComplaint' // 保存投诉
const HOMEPROTOCOL = '/patient/user/onlineHomeProtocol' // 在线家庭协议
const MYNURSELIST = '/patient/user/myNurseList' // 我的护士
const ENDORDER = '/patient/order/confirmWelfare/' // 确认订单
const DELETEORDER = '/patient/order/deleteOrder/' // 删除订单
const getServiceNameList = '/patient/goods/getServiceNameList' // 患者端  获取服务名称
// =-----------------------

const UPDATING = '/upload/uploadFile/4/1' // 图片上传
const EVALUATION = '/upload/uploadFile/13/1' // 上传评价图片
// -----------
const AUTHLOGIN = '/wx/auth/authLogin' // 授权登录
const PAYWELFAREORDER = '/pay/wx/payWelfareOrder/' // 微信支付
const CELLPHONE = '/wx/auth/decryptPhone' // 获取手机号码
const getCELLPHONE = '/wx/auth/decryptPhone' // 获取手机号码
const savePatientAccountInfo = '/wx/auth/savePatientAccountInfo'
const getUserOpenId = `/wx/auth/getUserOpenId/`

// ---------------------------
const Logout = '/common/logout' // 退出登录
const abouts = '/common/findAboutus'
const feeback = '/common/feedback'
const SENDMSG = '/common/msg/sendMsg?phone=' // 发送验证码
const VALIDATEMSG = '/common/msg/validateMsg/' // 提交验证码
const LOGOUT = '/common/logout' // 退出登录
const ABOUTFINDUS = '/common/findAboutus' // 关于我们
const FEEDFACE = '/common/feedback' // 反馈信息
// ------------------------------
const ADDORUPDATEDEFENDONFO = '/diagnosis/appraise/addOrUpdateAppraiseInfo' // 添加或者修改诊前预评估记录
const SELECTAPPRAISEINFO = '/diagnosis/appraise/selectAppraiseInfo/' // 查询诊前预评估记录
const selectSysConstant = '/diagnosis/appraise/selectSysConstant' // 诊前单常量
// ---------------------------
const ADDRESSBOOK = '/designate/user/addressBook'
// ---------------------------
const userInfo = '/user/info'
const NURSEPROTOCOL = '/sys/selectNurseProtocol' // 护士保密协议 get
const SELECTCODEPICTURE = '/sys/selectCodePicture' // 平台收款码图片
const selectOtherFeeInfos = '/sys/selectOtherFeeInfos'
const getFictitiousPhone = '/sys/phone/getFictitiousPhone/'

// ----------------------------
const selectServiceName = '/admin/welfare/typeList'
const selectByType = '/admin/base/selectByType/'

// ---------------------------
const thirdLogin = '/third/login'

class Http {
  constructor (url) {
    this.url = 'http://192.168.0.113:9091/api'
    // this.url = 'https://huli.novocare.cn/api'
  }
  // 需要传参数
  // eslint-disable-next-line camelcase
  say (url_a, header, method, data, callback) {
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      header,
      method,
      // eslint-disable-next-line camelcase
      url: `${this.url}${url_a}`,
      data,
      success: (res) => {
        if (res.data.code === 40001) {
          toast.fail(`${res.data.message}`)
        }
        callback(res)
      },
      fail: (err) => {
        callback(err)
      }
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 400)
  }
  // 参数直接写后面
  // eslint-disable-next-line camelcase
  say2 (url_a, header, method, data, callback) {
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      header,
      method,
      // eslint-disable-next-line camelcase
      url: `${this.url}${url_a}${data}`,
      success: (res) => {
        if (res.data.code === 40001) {
          toast.fail(`${res.data.message}`)
        }
        callback(res)
      },
      fail: (err) => {
        callback(err)
      }
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 400)
  }

  // -----------------------------------
  // -------------------------------
  // 同意协议
  isReadProtocol (header, method, data, callback) {
    this.say2(ISREADPROTOCOLV, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 同意协议
  isReadProtocal (header, method, data, callback) {
    this.say2(ISREADPROTOCOLV, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 护士实名认证
  realNameAuthentication (header, method, data, callback) {
    this.say(NURSEVALIDATION, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 按状态分页查询订单列表
  findWelfareOrderByPage (header, method, data, callback) {
    this.say(PAGING, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 护士登录
  nurseLogin (header, method, data, callback) {
    this.say(NURSELOGIN, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 根据订单编号查询订单详情
  findWelfareOrderDetail (header, method, data, callback) {
    this.say2(ORDERDETAIL, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 订单退回
  returnWelfareOrder (header, method, data, callback) {
    this.say(RETURNORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 取消订单
  cancelWelfareOrder (header, method, data, callback) {
    this.say(CANCELORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 确认接单
  confirmReceiveOrder (header, method, data, callback) {
    this.say(CONFIRMORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 跟据患者id查询患者导管照片
  findUserPictureByUserId (header, method, data, callback) {
    this.say2(FINDUSERPIC, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 接单-相同日期订单校验
  isReiveOrder (header, method, data, callback) {
    this.say2(ISREIVEORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 完成服务-其他服务订单确定按钮
  completeWelfareOrder (header, method, data, callback) {
    this.say(COMPLETEWELFAREORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 查看服务耗材
  selectOtherWelfareInfo (header, method, data, callback) {
    this.say2(SELECTOTHERWE, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 保存或者修改检查检验结果
  saveCheckResultInfo (header, method, data, callback) {
    this.say(SAVECHECK, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 查询检查检验结果
  getCheckResultInfo (header, method, data, callback) {
    this.say2(GETCHECKRESULTINFO, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 并发症类型数据列表
  selectComplicationList (header, method, data, callback) {
    this.say(SELECTCOMPLICATIONLIST, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 保存或者修改维护评估记录
  saveOrUpdateDefendEstimatInfo (header, method, data, callback) {
    this.say(SAVEORUPDATEDEFEND, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 查询维护评估记录
  getDefendEstimatInfo (header, method, data, callback) {
    this.say2(GETDEFENDESTIMAT, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 修改密码
  resetPwd (header, method, data, callback) {
    this.say2(resetPwd, header, method, data, (rst) => {
      callback(rst)
    })
  }
  startWelfareOrder (header, method, data, callback) {
    this.say2(startWelfareOrder, header, method, data, (rst) => {
      callback(rst)
    })
  }
  updateAddress (header, method, data, callback) {
    this.say(updateAddress, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 我的患者
  myPatientList (header, method, data, callback) {
    this.say(myPatientList, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // -------------------------------
  cancelWelfareOrder_ (header, method, data, callback) {
    this.say(CANCELORDER_, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 上传患者认证信息
  saveAuthInfo (header, method, data, callback) {
    this.say(SAVEAUTHINFO, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 患者端绑定手机号
  bindPhone (header, method, data, callback) {
    this.say2(BINDPHONE, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 患者下单
  addWelfareOrder (header, method, data, callback) {
    this.say(ADDWELFAREORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 查询患者认证信息
  getAuthInfo (header, method, data, callback) {
    this.say(GETAUTHINFO, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 首页数据
  indexInfo (header, method, data, callback) {
    this.say(ONDEXINFO, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 服务详情
  welfareDetail (header, method, data, callback) {
    this.say2(WELFAREDETAIL, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 订单评价列表
  appraiseListByWelfareId (header, method, data, callback) {
    this.say2(BYWELFARELD, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 订单进行中
  orderListOngoing (header, method, data, callback) {
    this.say(ORDERLISTONGOING, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 订单列表-已结束
  orderListFinished (header, method, data, callback) {
    this.say(ORDERLISTFINISHED, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 订单列表-已取消
  orderListCancled (header, method, data, callback) {
    this.say(ORDERLISTCANCLED, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 订单详情
  orderDetail_ (header, method, data, callback) {
    this.say2(ORDERDETAIL_, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 保存患者填写的地址信息
  saveAddressInfo (header, method, data, callback) {
    this.say(SAVEADDRESSINFO, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 查询患者的地址信息
  getAddressInfo (header, method, data, callback) {
    this.say(GETADDRESSINFO, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 保存评价
  saveAppraise (header, method, data, callback) {
    this.say(SAVEAPPRAISE, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 保存投诉
  saveComplaint (header, method, data, callback) {
    this.say(SAVECOMPLAINT, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 在线家庭协议
  onlineHomeProtocol (header, method, data, callback) {
    this.say(HOMEPROTOCOL, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 在线家庭协议
  getServiceNameList (header, method, data, callback) {
    this.say(getServiceNameList, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 我的护士
  myNurseList (header, method, data, callback) {
    this.say(MYNURSELIST, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 确认订单
  endOrder (header, method, data, callback) {
    this.say2(ENDORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 删除订单
  deleteOrder (header, method, data, callback) {
    this.say2(DELETEORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // ----------------------------
  // 分页查询服务名称列表
  getSelectServiceName (header, method, data, callback) {
    this.say(selectServiceName, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 平台收款码图片
  selectCodePicture (header, method, data, callback) {
    this.say(SELECTCODEPICTURE, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 查询诊前预评估记录
  selectAppraiseInfo (header, method, data, callback) {
    console.log(data)
    this.say2(SELECTAPPRAISEINFO, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 添加或者修改诊前预评估记录
  addOrUpdateDefendInfo (header, method, data, callback) {
    this.say(ADDORUPDATEDEFENDONFO, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 上传图片
  updateImage (header, method, data, callback) {
    this.say(UPDATING, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 授权登录
  authLogin (header, method, data, callback) {
    this.say(AUTHLOGIN, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 护士保密协议
  selectNurseProtocol (header, method, data, callback) {
    this.say(NURSEPROTOCOL, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 获取手机号码
  selectCellPhone (header, method, data, callback) {
    this.say(CELLPHONE, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 退出登录
  logout (header, method, data, callback) {
    this.say(Logout, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 获取联系人列表
  getBooks (header, method, data, callback) {
    this.say(ADDRESSBOOK, header, method, data, (rst) => {
      callback(rst)
    })
  }

  // 获取寡欲我们
  getAbouts (header, method, data, callback) {
    this.say2(abouts, header, method, data, (rst) => {
      callback(rst)
    })
  }
  feeback (header, method, data, callback) {
    this.say(feeback, header, method, data, (rst) => {
      callback(rst)
    })
  }
  getUserInfo (header, method, data, callback) {
    this.say2(userInfo, header, method, data, (rst) => {
      callback(rst)
    })
  }
  selectOtherFeeInfos (header, method, data, callback) {
    this.say2(selectOtherFeeInfos, header, method, data, (rst) => {
      callback(rst)
    })
  }
  selectSysConstant (header, method, data, callback) {
    this.say2(selectSysConstant, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 患者端
  // 上传评价图片
  UploaderEval (header, method, data, callback) {
    this.say(EVALUATION, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 反馈信息
  feedback (header, method, data, callback) {
    this.say(FEEDFACE, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 关于我们
  findAboutus (header, method, data, callback) {
    this.say(ABOUTFINDUS, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 退出登录 1
  LOGOUT (header, method, data, callback) {
    this.say(LOGOUT, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // // 上传图片 1
  // updateImage (header, method, data, callback) {
  //   this.say(UPDATING, header, method, data, (rst) => {
  //     callback(rst)
  //   })
  // }
  // // 授权登录 1
  // authLogin (header, method, data, callback) {
  //   this.say(AUTHLOGIN, header, method, data, (rst) => {
  //     callback(rst)
  //   })
  // }
  // 微信支付
  payWelfareOrder (header, method, data, callback) {
    this.say2(PAYWELFAREORDER, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 获取手机号码
  getCELLPHONE (header, method, data, callback) {
    this.say(getCELLPHONE, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 患者取消订单
  cancelOrder (header, method, data, callback) {
    this.say2(CANCELORDER_, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 发送验证码
  sendMsg (header, method, data, callback) {
    this.say2(SENDMSG, header, method, data, (rst) => {
      callback(rst)
    })
  }
  // 提交验证码
  validateMsg (header, method, data, callback) {
    this.say2(VALIDATEMSG, header, method, data, (rst) => {
      callback(rst)
    })
  }
  savePatientAccountInfo (header, method, data, callback) {
    this.say(savePatientAccountInfo, header, method, data, (rst) => {
      callback(rst)
    })
  }
  getFictitiousPhone (header, method, data, callback) {
    this.say2(getFictitiousPhone, header, method, data, (rst) => {
      callback(rst)
    })
  }
  thirdLogin (header, method, data, callback) {
    this.say(thirdLogin, header, method, data, (rst) => {
      callback(rst)
    })
  }

  getUserOpenId (header, method, data, callback) {
    this.say2(getUserOpenId, header, method, data, (rst) => {
      callback(rst)
    })
  }

  selectByType (header, method, data, callback) {
    this.say2(selectByType, header, method, data, (rst) => {
      callback(rst)
    })
  }
}
export default Http
