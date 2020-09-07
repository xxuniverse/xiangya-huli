<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <div class="mineLogo" v-if="nurseData">
        <div class="mineLogoImg">
          <img :src="nurseData.header" alt />
        </div>
        <img class="mineBg" src="/static/images/login/mineBg.png" alt />
        <div class="mineLogo_right">
          <div>
            <p>{{nurseData.userName}}</p>
            <span>{{nurseData.phone}}</span>
          </div>
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
        <div class="list" @click="auth" v-if="nurseData">
          <div class="listLeft">
            <img class="authentication" src="/static/images/login/authentication.png" alt />
            <span>实名认证</span>
          </div>
          <div class="listRight">
            <span>{{authenticationState}}</span>
            <img class="mineRight2" src="/static/images/login/mineRight2.png" alt />
          </div>
        </div>
        <div class="list" @click="opinion" v-if="nurseData">
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
            <img class="mineRight2" src="/static/images/login/mineRight2.png" alt />
          </div>
        </div>
      </div>
      <van-dialog id="van-dialog" />
      <van-toast id="van-toast" />
    </div>
    <div class="tabbar">
      <van-tabbar :active="active1" @change="hasClick">
        <van-tabbar-item name="order">
          <span class="item">订单</span>
          <img slot="icon" src="/static/images/login/oderFrom.png" class="img" />
          <img slot="icon-active" src="/static/images/login/oderFromNew.png" class="img" />
        </van-tabbar-item>
        <van-tabbar-item name="token">
          <span class="item">通讯</span>
          <img slot="icon" src="/static/images/login/dialogue.png" class="img" />
          <img slot="icon-active" src="/static/images/login/dialogueNew.png" class="img" />
        </van-tabbar-item>
        <van-tabbar-item name="call">
          <span class="item">报警</span>
          <img slot="icon" src="/static/images/login/police.png" class="img" />
          <img slot="icon-active" src="/static/images/login/policeNew.png" class="img" />
        </van-tabbar-item>
        <van-tabbar-item name="mine">
          <span class="item">我的</span>
          <img slot="icon" src="/static/images/login/my.png" class="img" />
          <img slot="icon-active" src="/static/images/login/myNew.png" class="img" />
        </van-tabbar-item>
      </van-tabbar>
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
      nurseData: {}, // 所有数据
      authenticationState: "", //认证状态
      show: false,
      obj: {
        text: "我的",
        state: false
      },
      dataHeigth: 0,
      headHeigth: 0,
      active1: "mine"
    };
  },
  onShow() {
    //认证状态  0-待认证 1-待审核 2-已认证 3-未通过
    this.nurseData = wx.getStorageSync("nurseData");
    this.getState();
  },
  methods: {
    getState() {
      switch (this.nurseData.authState) {
        case 1:
          this.authenticationState = "待审核";
          break;
        case 2:
          this.authenticationState = "已认证";
          break;
        case 3:
          this.authenticationState = "未通过";
          break;
        case 0:
          this.authenticationState = "待认证";
          break;
        default:
          this.authenticationState = "待认证";
      }
    },
    hasClick(e) {
      let temp = e.mp.detail;
      if (temp == "token") {
        wx.redirectTo({ url: "/pages/hushi/addressBook/main" });
        return;
      }
      if (temp == "order") {
        wx.redirectTo({ url: "/pages/hushi/oderForm/main" });
        return;
      }
      if (temp == "call") {
        wx.redirectTo({ url: "/pages/hushi/callPolice/main" });
        return;
      }
    },
    // 审核状态。跳审核页
    auth() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.getUserInfo(header, "get", "", res => {
        if (res.data.code == 0) {
          this.nurseData = res.data.data;
          this.nurseData.token = wx.getStorageSync("nurseData").token;
          wx.setStorageSync("nurseData", this.nurseData);
        } else {
          this.$toast(`${res.data.message}`);
        }
        this.todoNext();
      });
    },
    todoNext() {
      let id = this.nurseData.authState;
      if (id == 0) {
        wx.navigateTo({ url: "/pages/hushi/preliminary/main" });
      } else if (id == 1) {
        wx.navigateTo({ url: "/pages/hushi/noAuthentication/main" });
      } else if (id == 3) {
        wx.navigateTo({ url: "/pages/hushi/noPass/main" });
      } else if (id == 2) {
        this.authenticationState = "已认证";
        wx.navigateTo({ url: "/pages/hushi/passSuccess/main" });
      }
    },
    // 跳转到关于我们页面
    aboutMe() {
      wx.navigateTo({ url: "/pages/hushi/aboutUs/main" });
    },
    // 跳转修改密码页
    serviceAddress() {
      wx.navigateTo({ url: "/pages/hushi/resetPassword/main" });
    },
    // 跳转意见反馈页
    opinion() {
      wx.navigateTo({ url: "/pages/hushi/feedback/main" });
    },
    gotoLogin() {
      wx.navigateTo({ url: "/pages/hushi/bindingHushi/main" });
    }
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
  },
  async onPullDownRefresh() {
    let header = {
      "content-type": "application/json",
      "API-User-Token": this.nurseData.token
    };
    H.getUserInfo(header, "get", "", res => {
      if (res.data.code == 0) {
        this.nurseData = res.data.data;
        this.nurseData.token = wx.getStorageSync("nurseData").token;
        wx.setStorageSync("nurseData", this.nurseData);
        this.getState();
        return;
      } else {
        this.$toast(`${res.data.message}`);
      }
    });
    setTimeout(_ => {
      wx.stopPullDownRefresh();
    }, 1000);
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
/* .mineLogo > div {

} */
.mineBg {
  width: 7.5rem;
  height: 2.4rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
.tabbar >>> .img {
  width: 38rpx !important;
  height: 38rpx !important;
}
.rightImg {
  width: 33rpx;
  height: 36rpx;
  justify-self: flex-end;
}
.mineRight {
  width: 0.18rem;
  height: 0.34rem;
  margin: 0.43rem 0;
  vertical-align: top;
}
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 76%;
  padding-left: 30rpx;
}

.authentication {
  width: 0.48rem;
  height: 0.48rem;
}
.mineRight2 {
  width: 0.14rem;
  height: 0.26rem;
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
}
.listLeft > span {
  display: inline-block;
  margin-left: 0.19rem;
}

.text {
  font-size: 30rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
.listRight > span {
  display: inline-block;
  margin-right: 0.15rem;
}
.listRight > img {
  vertical-align: middle;
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
