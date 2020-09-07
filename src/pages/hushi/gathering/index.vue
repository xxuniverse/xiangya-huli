<template>
  <div class="containerLogin">
    <img :src="img+'/imgs/images/login/shoukuan-blue.png'" class="gatheringBg1" />
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <div class="wrap flex-c">
        <img src="https://youjiao.douziit.com/imgs/imgs/logo-new.png" />
        <div class="white flex-c" style="align-content: flex-start;align-items:flex-start;">
          <div class="flex-c" style="width:100%;margin-top:105rpx;">
            <span style="font-size:30rpx;color:rgba(51,51,51,1);">湘雅护理+平台收款码</span>
          </div>
          <div class="flex-c" style="width:100%;margin-top:62rpx;">
            <img :src="data.content" v-if="data.content" style="width:409rpx;height:410rpx;" />
            <img src="/static/images/login/e1.png" v-else style="width:409rpx;height:410rpx;" />
          </div>
          <div class="flex-c" style="width:100%;margin-top:57rpx;">
            <span style="font-size:30rpx;color:rgba(102,102,102,1);">
              应收金额：
              <span style="color:#E86666">￥{{count}}</span>
            </span>
          </div>
          <div class="flex-c submit" style="width:100%;margin-top:57rpx;">
            <van-button round @click="submit">确定收款</van-button>
          </div>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Https from "../../../utils/https";
import Dialog from "../../../../static/vant/dist/dialog/dialog";

let H = new Https();

export default {
  components: { frames },
  data() {
    return {
      show: false,
      obj: {
        text: "收款",
        state: false
      },
      dataHeigth: 0,
      headHeigth: 0,
      data: {},
      orderNo: "",
      count: "",
      img: this.$img
    };
  },
  methods: {
    submit() {
      Dialog.confirm({
        message: "确认患者已支付该笔费？"
      })
        .then(() => {
          wx.redirectTo({
            url:
              "/pages/hushi/orderSuccess/main?orderNo=" +
              this.orderNo +
              "&userId=" +
              this.userId
          });
        })
        .catch(() => {});
    },
    getData() {
      let nurseData = wx.getStorageSync("nurseData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": nurseData.token
      };
      H.selectCodePicture(header, "get", "", res => {
        if (res.data.code == 0) {
          this.data = res.data.data;
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    }
  },
  onLoad(options) {
    this.orderNo = options.orderNo;
    this.count = options.count;
    console.log("grthr", options);

    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
    this.getData();
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
.containerLogin >>> .headArea {
  color: #fff;
}
.section {
  position: absolute;
  overflow-y: scroll;
  width: 100%;
}
.section::-webkit-scrollbar {
  display: none;
}
.gatheringBg1 {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -3;
}
.wrap {
  width: 100%;
  margin-top: 140rpx;
  position: relative;
}
.wrap > img {
  width: 160rpx;
  height: 160rpx;
  position: absolute;
  top: -80rpx;
}
.white {
  width: 640rpx;
  height: 943rpx;
  background-image: url("http://youjiao.douziit.com/imgs/images/login/shoukuan-bai.png");
  background-size: 100% 100%;
  flex-wrap: wrap;
}
.submit >>> .van-button--normal {
  font-size: 36rpx !important;
  color: #fff !important;
  padding: 0px !important;
  height: 96rpx !important;
  width: 400rpx !important;
  background: linear-gradient(
    90deg,
    rgba(75, 164, 255, 1) 0%,
    rgba(86, 181, 254, 1) 100%
  ) !important;
  line-height: 92rpx !important;
}
</style>
