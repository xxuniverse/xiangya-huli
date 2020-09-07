<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section flex-c" :style="{top:headHeigth+'px'}">
      <div class="box">
        <div class="flex-c">
          <img src="https://youjiao.douziit.com/imgs/imgs/logo-new.png" />
        </div>
        <div class="title">患者端</div>
        <div class="flex-c">
          <span class="message">如您是患者，需完成微信授权以后，方可购买 相应的护理服务。</span>
        </div>
        <div class="flex-c" style="margin-top:132rpx;">
          <!-- <van-button plain type="primary" @click="afterLogin">暂不登录</van-button> -->
          <van-button plain type="success" @getuserinfo="loginBtn" open-type="getUserInfo">微信授权</van-button>
        </div>
      </div>
      <van-toast id="van-toast" />
    </div>
  </div>
</template>
<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import http from "../../../utils/https";
let H = new http();
export default {
  components: {
    frames
  },
  data() {
    return {
      obj: {
        text: "微信授权登录",
        state: true
      },
      headHeigth: 0
    };
  },
  methods: {
    afterLogin() {
      wx.navigateTo({ url: "/pages/huanzhe/home/main" });
    },
    loginBtn(loginData) {
      wx.login({
        success: res => {
          if (res.code) {
            let patientData = wx.getStorageSync("patientData");
            let header = {
              "content-type": "application/json",
              "API-User-Token": patientData.token
            };
            H.getUserOpenId(header, "get", res.code, res => {
              //根据code来判断是否已经授权    1 暂未授权  0 授权
              if (res.data.code == 0) {
                patientData.openId = res.data.data;
                wx.getStorageSync("patientData", patientData);
                this.$toast("授权成功");
                wx.navigateBack({delta:1})
              } else {
                this.$toast(`${res.data.message}`);
              }
            });
          } else {
            this.$toast(`${res.data.errMsg}`);
          }
        },
        fail(err) {
          console.log(err);
        }
      });
    }
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight || 0;
  }
};
</script>
<style scoped>
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
}

.section {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0px;
  bottom: 0px;

  align-items: flex-start !important;
  padding-top: 151rpx;
}
.section .box {
  height: 595rpx;
  width: 628rpx;
}
.section .box img {
  width: 174rpx;
  height: 174rpx;
}
.section .title {
  font-size: r40px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin: 40rpx 0px;
}
.section .message {
  text-align: left;
  font-size: 28rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.box >>> .van-button--normal {
  width: 300rpx !important;
  height: 98rpx !important;
  border-radius: 49rpx !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx !important;
  font-family: Source Han Sans CN !important;
  font-weight: 400 !important;
}
.box >>> .van-button--primary {
  border: 2rpx solid rgba(204, 204, 204, 1) !important;
  color: rgba(102, 102, 102, 1) !important;
}
.box >>> .van-button--success {
  background: rgba(82, 175, 254, 1) !important;
  color: rgba(255, 255, 255, 1) !important;
}
</style>