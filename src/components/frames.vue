<template>
  <div
    class="frameContainers"
    :class="{bgClass:BgClass}"
    :style="{  height: navHeight + statusBarHeight+headAreaMarTop+headAreaHeight + 'px' }"
  >
    <header
      class="headNav"
      v-if="!BgClass"
      :style="{ paddingTop: statusBarHeight +  'px', height: navHeight + 'px' }"
    >
      <section
        class="headArea"
        :style="{ height: headAreaHeight  +'px', marginTop: headAreaMarTop + 'px' }"
      >
        <div
          :class="[obj.state ? 'returnIdex' : 'none ']"
          class="flex-c"
          v-if="!show"
          @click="returnS"
        >
          <img src="/static/images/back.png" alt />
        </div>
        <div
          :class="[obj.state ? 'returnIdex' : 'none ']"
          class="flex-c"
          v-if="show"
          @click="returnS1"
        >
          <img src="/static/images/back.png" alt />
        </div>
        <div class="leftBox" :style="{lineHeight: headAreaHeight + 'px'}">{{obj.text}}</div>
      </section>
    </header>
    <section v-else class="titleWrap">
      <div class="left">
        <img src="https://youjiao.douziit.com/imgs/imgs/logo-new.png" />
      </div>
      <div class="right">
        <div style="align-self: flex-end;" class="first">e健天使，健康到家</div>
        <div class="two">{{weather}}</div>
      </div>
    </section>

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
        version="release"
      >健康老龄</navigator>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import app from "../App";
import store from "../utils/store";
import dayjs from "dayjs";

import { mapState } from "vuex";

export default {
  props: ["obj", "show", "BgClass"],
  data() {
    return {
      weather: "",
      // text:text,
      pixelRatio: app.getSysInfo().pixelRatio, //系统像素比
      statusBarHeight: app.getSysInfo().statusBarHeight, //系统状态栏高度
      navHeight: "", //顶部导航栏高度
      headAreaHeight:
        app.getSysInfo().pixelRatio * 44 / app.getSysInfo().pixelRatio, //顶部内容区域高度
      headAreaMarTop: "", //顶部内容区域外边距
      headleftBoxW: "", //顶部内容左侧区域外边距
      headRightBoxW: "", //顶部内容右侧区域外边距
      containersHeight: "", //页面内容区域高度
      screenHeight: app.getSysInfo().screenHeight, //屏幕高
      windowHeight: app.getSysInfo().windowHeight //可视窗口高度
    };
  },
  computed: {
    ...mapState(["isAppUserData","isAppSource"])
  },
  methods: {
    launchAppError(err) {
      console.log(err);
    },
    returnS() {
      wx.navigateBack({
        delta: 1
      });
      this.$emit("close");
    },
    returnS1() {
      this.$emit("close1");
    },
    getAddress() {
      wx.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        wx.hideLoading();
      }, 500);
      wx.getLocation({
        type: "wgs84",
        isHighAccuracy: true,
        success: res => {
          let latitude = res.latitude;
          let longitude = res.longitude;

          let url = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${longitude},${latitude}&key=d77629d61cb913182c2417e8d8297274&radius=1000&extensions=all`;
          wx.request({
            url,
            success: data => {
              let temp = data.data;
              if (temp.infocode == "10000") {
                let adcode = temp.regeocode.addressComponent.adcode;
                wx.request({
                  url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=d77629d61cb913182c2417e8d8297274`,
                  success: rest => {
                    if (rest.data.infocode == "10000") {
                      let data = rest.data.lives[0];
                      this.weather =
                        dayjs().format("MM月DD日") +
                        " " +
                        data.weather +
                        " " +
                        data.temperature +
                        "℃";
                    } else {
                      this.$toast("获取天气失败1");
                    }
                  },
                  fail: err => {
                    this.$toast("获取天气失败2");
                  }
                });
              } else {
                this.$toast("获取定位失败");
              }
            }
          });
        },
        fail: () => {
          this.$toast(`获取定位失败`);
        }
      });
    }
  },
  mounted() {
    this.BgClass && this.getAddress();
    //IOS 与 安卓进行差异化处理
    if (app.getSysInfo().system.substring(0, 3) == "iOS") {
      this.navHeight = this.pixelRatio * 40 / this.pixelRatio;
      this.headAreaMarTop = this.pixelRatio * 0.5 / this.pixelRatio;
      this.headleftBoxW =
        app.getSysInfo().windowWidth - this.pixelRatio * 100 / this.pixelRatio;
      this.headRightBoxW = this.pixelRatio * 100 / this.pixelRatio;
      this.containersHeight =
        app.getSysInfo().windowHeight -
        (this.statusBarHeight + this.pixelRatio * 40 / this.pixelRatio);
    } else {
      this.navHeight = this.pixelRatio * 45 / this.pixelRatio;
      this.headAreaMarTop = this.pixelRatio * 2.5 / this.pixelRatio;
      this.headleftBoxW =
        app.getSysInfo().windowWidth - this.pixelRatio * 110 / this.pixelRatio;
      this.headRightBoxW = this.pixelRatio * 110 / this.pixelRatio;
      this.containersHeight =
        app.getSysInfo().windowHeight -
        (this.statusBarHeight + this.pixelRatio * 45 / this.pixelRatio);
    }
    store.commit("barHeight", this.statusBarHeight + this.navHeight);
    store.commit("mScreenHeight", this.screenHeight);
    store.commit("mWindowHeight", this.windowHeight);
  }
};
</script>

<style scoped>
.frameContainers {
  width: 100%;
}
.none {
  display: none;
}
.returnIdex {
  width: 62rpx;
  height: 60rpx;
  position: absolute;
  top: 50%;
  left: 16rpx;
  transform: translateY(-50%);
}
.returnIdex img {
  width: 17rpx;
  height: 32rpx;
  vertical-align: top;
}
/* .frameContainers {
  width: 100%;
  height: 100%;
} */
.headNav {
  display: flex;
  align-items: center;
}
.headArea {
  width: 100%;
  position: relative;
}

.leftBox {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 32rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
.bgClass {
  /* height: 246rpx; */
  background: rgba(88, 159, 247, 1);
}
.titleWrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
}
.titleWrap > .left {
  width: 140rpx;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-bottom: 66rpx;
}
.titleWrap > .left img {
  width: 100rpx;
  height: 100rpx;
}
.titleWrap > .right {
  height: 80%;
  width: 400rpx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-end;
  margin-bottom: 28rpx;
}
.titleWrap > .right > div {
  height: 41rpx;
  font-size: 37rpx;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 18rpx;
}
.titleWrap > .right .two {
  font-size: 27rpx !important;
  font-weight: 400 !important;
  line-height: 41rpx !important;
}
.abBtn {
  position: absolute;
  left: 0px;
  top: 58%;
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
