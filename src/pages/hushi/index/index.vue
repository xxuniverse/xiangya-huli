<template>
  <div class="containerLogin">
    <div class="wrap">
      <div class="top">
        <div class="box">
          <div class="flex-c">
            <img src="https://youjiao.douziit.com/imgs/imgs/logo-new.png" />
          </div>
          <div class="title">湘雅e健天使</div>
          <div class="message">让患者无需出门即可得到湘雅专业护理！</div>
        </div>
      </div>
      <div class="bottom">
        <div class="content">
          <div class="ctn flex-c">
            <img src="https://youjiao.douziit.com/imgs/imgs/select-type.png" />
          </div>
          <div class="main flex-c">
            <div class="inner flex-b">
              <div class="left" @click="checkOne">
                <div>
                  <img :src="patientOk" alt v-if="flag1" />
                  <img :src="patient" alt v-if="!flag1" />
                </div>
                <div class="text">我是患者</div>
              </div>
              <div class="right" @click="checkTwo">
                <div>
                  <img :src="nurse" alt v-if="!flag2" />
                  <img :src="nurseOk" alt v-if="flag2" />
                </div>
                <div class="text">我是护士</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
    <!-- :style="{top:top+'px',left:left+'px'}" @touchmove="hastouchmove" -->
    <div class="abBtn" v-if="isAppUserData.userName">
      <button
        open-type="launchApp"
        v-if="isAppSource == 'app'"
        app-parameter="wechat"
        @error="launchAppError"
      >健康老龄</button>
      <navigator
        target="miniProgram"
        v-if="isAppSource == 'applet'"
        open-type="exit"
        app-id
        path
        extra-data
        version="trial"
      >健康老龄</navigator>
    </div>
    <!-- release 正式版 -->
  </div>
</template>

<script>
import Http from "../../../utils/https";
import { mapState } from "vuex";
import app from "../../../App";
import { mapMutations } from "vuex";

let H = new Http();
export default {
  components: {},
  data() {
    return {
      patient: "/static/images/login/patient.png",
      nurse: "/static/images/login/nurse.png",
      nurseOk: "/static/images/login/nurseOk.png",
      patientOk: "/static/images/login/patientOk.png",
      flag1: false,
      flag2: false,
      top: 300,
      left: 0,
      windowWidth: 0,
      windowHeight: 0
    };
  },
  computed: {
    ...mapState(["isAppUserData", "isAppSource"])
  },
  onLoad() {
    this.windowHeight = app.getSysInfo().windowHeight;
    this.windowWidth = app.getSysInfo().windowWidth;

    let some = wx.getEnterOptionsSync();
    if (Object.keys(some.query).length > 0) {
      let source = some.query.source; //目标来源  app->app 安卓   applet ->小程序
      this.mutationsIsAppSource(source);
      let temp = some.query.query;
      let userData = JSON.parse(decodeURIComponent(temp));
      this.mutationsIsAppUser(userData);
      let header = {
        "content-type": "application/json"
      };
      H.thirdLogin(header, "post", userData, rst => {
        if (rst.data.code == 0) {
          this.$toast("患者登录成功");
          wx.setStorageSync("patientData", rst.data.data);
          setTimeout(() => {
            wx.redirectTo({ url: "/pages/huanzhe/home/main" });
          }, 200);
        } else {
          this.$toast(`${rst.data.message}`);
        }
      });
    } else {
      this.mutationsIsAppUser({});
    }
  },
  methods: {
    hastouchmove(e) {
      if (e.touches[0].clientY <= 0) {
        this.top = 0;
      } else if (e.touches[0].clientY + 46 >= this.windowHeight) {
        this.top = this.windowHeight - 46;
      } else if (e.touches[0].clientX <= 0) {
        this.left = 0;
      } else if (e.touches[0].clientX + 84 >= this.windowWidth) {
        this.left = this.windowWidth - 84;
      } else {
        this.left = e.touches[0].clientX;
        this.top = e.touches[0].clientY;
      }
    },
    navError(err) {
      console.log(err);
    },
    ...mapMutations(["mutationsIsAppUser", "mutationsIsAppSource"]),
    launchAppError(err) {
      console.log(err);
    },
    // 患者端
    checkOne() {
      wx.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        wx.hideLoading();
      }, 500);
      this.flag1 = !this.flag1;
      this.flag2 = false;
      if (this.flag1) {
        wx.navigateTo({ url: "/pages/huanzhe/bindingPhone/main" });
        this.flag1 = !this.flag1;
      }
    },
    //护士端
    checkTwo() {
      wx.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        wx.hideLoading();
      }, 500);
      this.flag2 = !this.flag2;
      this.flag1 = false;
      if (this.flag2) {
        wx.navigateTo({ url: "/pages/hushi/bindingHushi/main" });
        this.flag2 = !this.flag2;
      }
    }
  }
};
</script>

<style scoped>
.containerLogin {
  width: 100%;
  height: 100%;
  display: flex;
}

.containerLogin .wrap {
  width: 100%;
  height: 100%;
}
.wrap .top {
  width: 100%;
  height: 45.13%;
  background-image: url("https://youjiao.douziit.com/imgs/imgs/index-bg.png");
  background-size: 117% 100%;
  background-position: -32px 0px;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
}
.wrap .bottom {
  width: 100%;
  height: calc(54.87% - 60px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
}

.wrap .top .box {
  width: 521rpx;
  height: 344rpx;
}
.box img {
  width: 186rpx;
  height: 186rpx;
}
.box .title {
  font-size: 42rpx;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin: 40rpx 0px;
  text-align: center;
}
.box .message {
  font-size: 32rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
}
.bottom .content {
  height: 300rpx;
  width: 100%;
}
.content .ctn {
  width: 100%;
  height: 25rpx;
}
.content img {
  height: 25rpx;
  width: 550rpx;
}
.content .main {
  margin-top: 82rpx;
  width: 100%;
}
.content .inner {
  width: 494rpx;
}
.inner img {
  width: 160rpx;
  height: 160rpx;
}
.inner .text {
  font-size: 30rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: center;
}
.abBtn {
  position: absolute;
  opacity: 0.9;
  z-index: 9999;
}
.abBtn >>> button {
  background-color: rgb(88, 159, 247);
  padding: 0px 8px;
  font-size: 16px;
  border-radius: 0px;
  color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.abBtn >>> navigator {
  background-color: rgb(88, 159, 247);
  padding: 10px 8px;
  font-size: 16px;
  border-radius: 0px;
  color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
