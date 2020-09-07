<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <movable-view @vtouchmove="num(index)" style="width:100%;height:100%;position:static">
        <div style="width:100%;height:100%;">
          <!-- @click="handleGotoMessage"  -->
          <div class="mineLogo" v-if="patientData">
            <div class="mineLogoImg">
              <img :src="patientData.header" v-if="patientData.header" alt />
              <img src="https://youjiao.douziit.com/imgs/imgs/no-login.png" v-else alt />
            </div>
            <img class="mineBg" src="/static/images/login/mineBg.png" alt />
            <div class="mineLogo_right">
              <div>
                <p>{{patientData.userNickname}}</p>
                <span>{{patientData.phone}}</span>
              </div>
              <!-- <img class="mineRight" src="/static/images/login/mineRight.png" alt /> -->
            </div>
          </div>

          <div class="mineLogo" v-else @click="gotoLogin">
            <div class="mineLogoImg">
              <img src="https://youjiao.douziit.com/imgs/imgs/no-login.png" alt />
            </div>
            <img class="mineBg" src="/static/images/login/mineBg.png" alt />
            <div class="wrap">
              <div class="flex-c">
                <span class="text">请登录</span>
              </div>
              <img src="/static/images/login/right_arrow3.png" class="rightImg" alt />
            </div>
          </div>

          <div class="mineList">
            <div class="list" @click="auth" v-if="patientData">
              <div class="listLeft">
                <img class="authentication" src="/static/images/login/authentication.png" alt />
                <span>实名认证</span>
              </div>
              <div class="listRight">
                <span>{{authenticationState}}</span>
                <img class="mineRight2" src="/static/images/login/mineRight2.png" alt />
              </div>
            </div>
            <div class="list" @click="serviceAddress" v-if="patientData">
              <div class="listLeft">
                <img class="authentication" src="/static/images/login/service_address.png" alt />
                <span>服务地址</span>
              </div>
              <div class="listRight">
                <!-- <span>已认证</span> -->
                <img class="mineRight2" src="/static/images/login/mineRight2.png" alt />
              </div>
            </div>
            <div class="list" @click="opinion" v-if="patientData">
              <div class="listLeft">
                <img class="authentication" src="/static/images/login/feedback.png" alt />
                <span>意见反馈</span>
              </div>
              <div class="listRight">
                <!-- <span>已认证</span> -->
                <img class="mineRight2" src="/static/images/login/mineRight2.png" alt />
              </div>
            </div>
            <div class="list" @click="aboutMe">
              <div class="listLeft">
                <img class="authentication" src="/static/images/login/about_us.png" alt />
                <span>关于我们</span>
              </div>
              <div class="listRight">
                <!-- <span>已认证</span> -->
                <img class="mineRight2" src="/static/images/login/mineRight2.png" alt />
              </div>
            </div>
          </div>
          <van-dialog id="van-dialog" />
        </div>
      </movable-view>
    </div>

    <div class="tabBar">
      <van-tabbar active="about" @change="hasClick">
        <van-tabbar-item name="home">
          <span class="item">首页</span>
          <img slot="icon" src="/static/images/login/gray_home.png" class="img" />
          <img slot="icon-active" src="/static/images/login/blue_home.png" class="img" />
        </van-tabbar-item>
        <van-tabbar-item name="map">
          <span class="item">订单</span>
          <img slot="icon" src="/static/images/login/oderFrom.png" class="img" />
          <img slot="icon-active" src="/static/images/login/oderFromNew.png" class="img" />
        </van-tabbar-item>
        <van-tabbar-item name="record">
          <span class="item">通讯录</span>
          <img slot="icon" src="/static/images/login/dialogue.png" class="img" />
          <img slot="icon-active" src="/static/images/login/dialogueNew.png" class="img" />
        </van-tabbar-item>
        <van-tabbar-item name="about">
          <span class="item">我的</span>
          <img slot="icon" src="/static/images/login/my.png" class="img" />
          <img slot="icon-active" src="/static/images/login/myNew.png" class="img" />
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="load" v-show="load">
      <van-loading class="loading" color="#1989fa" size="30px" type="spinner" vertical>加载中...</van-loading>
      <p>加载中</p>
    </div>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Http from "../../../utils/https";
import Dialog from "../../../../static/vant/dist/dialog/dialog";

let H = new Http();

export default {
  components: { frames },
  data() {
    return {
      timeout: null,
      load: false,
      patientData: {}, // 所有数据
      authenticationState: "", //认证状态
      show: false,
      obj: {
        text: "我的",
        state: false
      },
      dataHeigth: 0,
      headHeigth: 0
    };
  },
  onLoad() {
    this.patientData = wx.getStorageSync("patientData");
    switch (this.patientData.authState) {
      case 1:
        this.authenticationState = "待审核";
        break;
      case 2:
        this.authenticationState = "已认证";
        break;
      case 3:
        this.authenticationState = "未通过";
        break;
      default:
        this.authenticationState = "待认证";
    }
  },
  methods: {
    gotoLogin() {
      wx.navigateTo({ url: "/pages/huanzhe/bindingPhone/main" });
    },
    // handleGotoMessage() {
    //   wx.navigateTo({ url: "/pages/huanzhe/message/main" });
    // },
    num(index) {
      this.load = true;
      this.debounce("ajaxOpen", 200);
    },
    /**
     *  @func 要执行的函数
     *  @wait 延迟执行的时间
     *
     *  函数节流
     * */
    debounce(func, wait) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      } else {
        this.timeout = setTimeout(() => {
          this[func]();
        }, wait);
      }
    },
    //查看患者信息
    ajaxOpen() {
      //进入页面重新获取用户信息 覆盖之前的数据
      let patientData = wx.getStorageSync("patientData");
      let token = patientData.token;
      let header = {
        "content-type": "application/json",
        "API-User-Token": token
      };
      H.getUserInfo(header, "get", "", res => {
        if (res.data.code == 0) {
          let {
            data: { data }
          } = res;
          data.token = token;
          wx.setStorageSync("patientData", data);
          this.patientData = wx.getStorageSync("patientData");
        }

        switch (this.patientData.authState) {
          case 1:
            this.authenticationState = "待审核";
            break;
          case 2:
            this.authenticationState = "已认证";
            break;
          case 3:
            this.authenticationState = "未通过";
            break;
          default:
            this.authenticationState = "待认证";
        }
      });
      wx.stopPullDownRefresh();
    },
    onPullDownRefresh() {},
    hasClick(event) {
      let name = event.mp.detail;
      switch (name) {
        case "home":
          wx.redirectTo({ url: "/pages/huanzhe/home/main" });
          break;
        case "map":
          wx.redirectTo({ url: "/pages/huanzhe/oderForm/main" });
          break;
        case "record":
          wx.redirectTo({ url: "/pages/huanzhe/addressBook/main" });
          break;
        case "about":
          wx.redirectTo({ url: "/pages/huanzhe/mine/main" });
          break;
      }
    },
    //退出
    quit() {
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      Dialog.confirm({
        message: "你确定要退出吗 ~ ~"
      })
        .then(() => {
          H.logout(header, "DELETE", {}, rst => {
            wx.redirectTo({ url: "/pages/hushi/index/main" });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 审核状态。跳审核页
    auth() {
      let id = this.authenticationState;
      if (id === "待认证" || id === "未通过" || id === "已认证") {
        if (id === "已认证") {
          wx.navigateTo({
            url:
              "/pages/huanzhe/patientsCertification/main?data=" +
              JSON.stringify({ isTrue: true })
          });
        } else if (id === "未通过") {
          //未通过
          let patientData = wx.getStorageSync("patientData");
          wx.navigateTo({
            url:
              "/pages/huanzhe/noAuthentication/main?reason=" +
              patientData.reason
          });
        } else {
          wx.navigateTo({ url: "/pages/huanzhe/patientsCertification/main" });
        }
      } else {
        wx.navigateTo({ url: "/pages/huanzhe/authentication/main?id=" + id });
      }
    },
    // 跳转到关于我们页面
    aboutMe() {
      wx.navigateTo({ url: "/pages/huanzhe/aboutUs/main" });
    },
    // 跳转地址页
    serviceAddress() {
      this.ajaxOpen();
      //判断用户是否认证 如果没有认证成功 跳转 ==> 认证
      let id = this.authenticationState;
      let patientData = wx.getStorageSync("patientData");
      if (id == "待认证") {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您还没有认证信息,请先认证~",
            confirmButtonText: "去认证"
          })
          .then(() => {
            // on confirm
            wx.navigateTo({ url: "/pages/huanzhe/patientsCertification/main" });
          });
      } else if (id == "未通过") {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您还没有认证信息,请先认证~",
            confirmButtonText: "去认证"
          })
          .then(() => {
            wx.navigateTo({
              url:
                "/pages/huanzhe/noAuthentication/main?reason=" +
                patientData.reason
            });
          });
      } else if (id == "待审核") {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您还没有认证信息,请先认证~",
            confirmButtonText: "去认证"
          })
          .then(() => {
            wx.navigateTo({ url: "/pages/huanzhe/authentication/main" });
          });
      } else {
        wx.navigateTo({ url: "/pages/huanzhe/serviceAddress/main" });
      }
    },
    // 跳转意见反馈页
    opinion() {
      wx.navigateTo({ url: "/pages/huanzhe/feedback/main" });
    }
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
  }
};
</script>

<style scoped>
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.section {
  position: absolute;
  overflow-y: scroll;
  width: 100%;
}

.section::-webkit-scrollbar {
  display: none;
}

.mineLogo {
  position: relative;
  width: 100%;
  height: 2.4rem;
  padding: 0 0.3rem;
  display: flex;
  flex-direction: row;
  background-size: cover;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
}
.mineLogo:active::before {
  opacity: 0.1;
}
.mineLogo::before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: #000;
  border: inherit;
  border-color: #000;
  border-radius: inherit;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  opacity: 0;
  content: " ";
}

.mineBg {
  width: 7.5rem;
  height: 2.4rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

.mineLogoImg {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  overflow: hidden;
  margin: 0.6rem 0;
}

.mineLogoImg > img {
  width: 125rpx;
  height: 118rpx;
}

.mineRight {
  width: 0.18rem;
  height: 0.34rem;
  margin: 0.43rem 0;
  vertical-align: top;
}

.authentication {
  width: 0.48rem;
  height: 0.48rem;
}
.mineRight2 {
  width: 0.14rem;
  height: 0.26rem;
}
.rightImg {
  width: 33rpx;
  height: 36rpx;
  justify-self: flex-end;
}
.mineLogo_right {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1.2rem;
  margin: 0.6rem 0;
  padding-left: 0.3rem;
  box-sizing: border-box;
}
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 76%;
  padding-left: 30rpx;
}

.mineLogo_right > div {
  color: white;
}

.mineLogo_right > div > p {
  font-size: 0.34rem;
  margin: 0.25rem 0 0 0;
}

.mineLogo_right > div > span {
  font-size: 0.28rem;
}

.list {
  width: 100%;
  height: 1.1rem;
  padding: 0 0.3rem;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  border-bottom: 0.01rem solid #ccc;
  box-sizing: border-box;
  line-height: 1.1rem;
}

/* .listLeft{
      height: .48rem;
    } */
.listLeft > img {
  vertical-align: middle;
  /* border: 0.01rem dashed #ccc; */
}

.listLeft > span {
  display: inline-block;
  margin-left: 0.19rem;
}

.listRight > span {
  display: inline-block;
  margin-right: 0.15rem;
}

.listRight > img {
  vertical-align: middle;
}

.text {
  font-size: 30rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
}

.quitLogin {
  position: absolute;
  left: 1.31rem;
  bottom: 2.82rem;
  height: 0.9rem;
  width: 4.8rem;
  padding: 0.02rem;
  border: 0.02rem solid #3ca1ff;
  border-radius: 0.45rem;
  line-height: 0.9rem;
  font-size: 0.3rem;
  color: #3ca1ff;
  text-align: center;
}
</style>
