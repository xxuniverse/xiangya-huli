<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <div class="callPoliceImg" @click="submit">
        <img src="/static/images/login/callPolice.png" alt />
      </div>
      <span class="clickSpan"  >点击上方按钮，迅速报警</span>
    </div>
    <div class="tabbar">
        <van-tabbar
          :active="active1"
          @change="hasClick"
        >
          <van-tabbar-item name="order">
            <span class="item">订单</span>
            <img
              slot="icon"
              src="/static/images/login/oderFrom.png"
              class="img"
            >
            <img
              slot="icon-active"
              src="/static/images/login/oderFromNew.png"
              class="img"
            >
          </van-tabbar-item>
          <van-tabbar-item name="token">
            <span class="item">通讯</span>
            <img
              slot="icon"
              src="/static/images/login/dialogue.png"
              class="img"
            >
            <img
              slot="icon-active"
              src="/static/images/login/dialogueNew.png"
              class="img"
            >
          </van-tabbar-item>
          <van-tabbar-item name="call">
            <span class="item">报警</span>
            <img
              slot="icon"
              src="/static/images/login/police.png"
              class="img"
            >
            <img
              slot="icon-active"
              src="/static/images/login/policeNew.png"
              class="img"
            >
          </van-tabbar-item>
          <van-tabbar-item name="mine">
            <span class="item">我的</span>
            <img
              slot="icon"
              src="/static/images/login/my.png"
              class="img"
            >
            <img
              slot="icon-active"
              src="/static/images/login/myNew.png"
              class="img"
            >
          </van-tabbar-item>
        </van-tabbar>
      </div>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
export default {
  components: { frames },
  data() {
    return {
      show: false,
      obj: {
        text: "报警",
        state: false
      },
      dataHeigth: 0,
      headHeigth: 0,
      active1: "call",
    };
  },
  methods: {
    submit() {
      wx.showModal({
        title: "确认报警",
        content: "确认将您的位置将发送给公安部门进行报警吗？",
        success(res) {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    hasClick(e) {
      let temp = e.mp.detail;
      if (temp == "token") {
        wx.redirectTo({ url: "/pages/hushi/addressBook/main" });
        return ;
      }
      if (temp == "order") {
        wx.redirectTo({ url: "/pages/hushi/oderForm/main" });
        return ;
      }
      if (temp == "mine") {
        wx.redirectTo({ url: "/pages/hushi/mine/main" });
        return ;
      }
      },
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
    text-align: center;
}
.section::-webkit-scrollbar {
  display: none;
}
.callPoliceImg {
  width: 3.28rem;
  height: 3.28rem;
  margin: 1.1rem auto 0.46rem;
}
.callPoliceImg > img {
  width: 3.28rem;
  height: 3.28rem;
}
.clickSpan{
  font-size: .26rem;
  color: #626266;
}
.tabbar >>> .img {
  width: 38rpx !important;
  height: 38rpx !important;
}
</style>
