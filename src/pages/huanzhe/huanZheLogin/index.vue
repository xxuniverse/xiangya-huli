<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section flex-c" :style="{top:headHeigth+'px'}">
      <div class="box">
        <div class="flex-c">
          <span class="message">您需要绑定手机号注册，才能购买服务项目。</span>
        </div>
        <div class="flex-c" style="margin-top:132rpx;">
          <van-button
            plain
            type="success"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
          >授权登录</van-button>
        </div>
      </div>
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
        text: "患者注册",
        state: true
      },
      headHeigth: 0
    };
  },
  methods: {
    getPhoneNumber(e) {
      let form = e.mp.detail;
      if (form.errMsg == "getPhoneNumber:ok") {
        let header1 = {
          "content-type": "application/json"
        };
        let loginData = JSON.parse(wx.getStorageSync("loginData"));
        H.savePatientAccountInfo(header1, "post", loginData, res => {
          if (res.data.code == 0) {
            wx.setStorageSync("patientData", res.data.data);
            this.getNumber(form);
          } else {
            this.$toast(`${res.data.message}`);
          }
        });
      } else {
        console.log(123123);
        wx.redirectTo({ url: "/pages/hushi/index/main" });
      }
    },
    getNumber(form) {
      let patientData = wx.getStorageSync("patientData");
      let data = {
        openId: patientData.openId,
        sessionKey: patientData.sessionKey,
        encryptedData: form.encryptedData,
        iv: form.iv
      };
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      if (form.encryptedData) {
        // 获取手机号码
        H.selectCellPhone(header, "POST", data, rst => {
          let userInfo = JSON.parse(rst.data.data.user_info);
          wx.setStorageSync("patientPhoneNumber", userInfo.phoneNumber);
          let data = patientData.openId + "/" + userInfo.phoneNumber;
          H.bindPhone(header, "POST", data, res => {
            patientData.phone = userInfo.phoneNumber;
            wx.setStorageSync("patientData", patientData);
            this.agreement = true;
            wx.navigateTo({ url: "/pages/huanzhe/home/main" });
          });
        });
      }
    },
    // 同意协议
    consent() {
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      H.isReadProtocal(header, "POST", patientData.openId, res => {
        this.agreement = false;
        wx.redirectTo({ url: "/pages/huanzhe/patientsCertification/main" });
      });
    },
    getData() {
      // 请求家庭协议
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      H.onlineHomeProtocol(header, "GET", {}, res => {
        let {
          data: {
            data: { content }
          }
        } = res;
        this.content = content;
      });
    }
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight || 0;
    this.getData();
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