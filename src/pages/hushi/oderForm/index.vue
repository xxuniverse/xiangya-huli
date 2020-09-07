<template>
  <div>
    <frames :obj="obj"></frames>
    <div class="nav" :style="{top:height+'px'}">
      <van-tabs @change="onClick" :active="active" swipeable>
        <van-tab title="待接单" name="0"></van-tab>
        <van-tab title="进行中" name="1"></van-tab>
        <van-tab title="已结束" name="2"></van-tab>
      </van-tabs>
      <div class="wrap">
        <div style="width:100%;height:100%" v-if="nurseData">
          <div v-if="nurseData.authState == 2">
            <div
              class="box"
              v-for="(item,index) in data"
              :key="index"
              @click="listNo(item.orderNo)"
            >
              <div class="flex-b content">
                <span>订单号：{{item.orderNo}}</span>
                <span style="color:#3CA1FF;font-size:30rpx;">
                  {{
                  item.welfareStatus == 1?'待指派'
                  :item.welfareStatus == 2?'待接单'
                  :item.welfareStatus == 3?'待服务'
                  :item.welfareStatus == 4?'服务中'
                  :item.welfareStatus == 5?'待确认'
                  :item.welfareStatus == 6?'已结束'
                  :item.welfareStatus == 7?'已评价':'已取消'
                  }}
                </span>
              </div>
              <div class="flex-b content">
                <img :src="item.welfarePicture" v-if="item.welfarePicture" class="img" />
                <img src="../../../../static/images/login/jdImg.png" v-else class="img" />
                <div class="right flex-s">
                  <div style="padding: 14rpx 0px 20rpx;" class="flex-s">
                    <span style="font-size:32rpx;color:rgba(51,51,51,1);">{{item.welfareName}}</span>
                  </div>
                  <div
                    class="flex-s"
                    style="color:rgba(153,153,153,1);font-size:28rpx;margin-bottom:12rpx;"
                  >
                    <span>服务时间：{{item.welfareTime}}</span>
                  </div>
                  <div class="flex-s address" style="color:rgba(153,153,153,1);font-size:28rpx;">
                    <span>服务地址：{{item.address}}</span>
                  </div>
                </div>
              </div>
              <div class="flex-b content">
                <span>下单日期：{{item.addTime}}</span>
                <span>
                  实付金额：
                  <span style="color:orange;">￥{{item.totalPayAmt}}</span>
                </span>
              </div>
              <!-- "welfareStatus": 2,//服务状态 1-待指派 2-待接单 3-待服务 4-服务中 5-待确认 6-已结束 7-已评价  11.已取消  注：已评价跟已结束都属于已完成订单 -->
              <div class="flex-e content" style="margin:0px;margin-top:38rpx;">
                <span class="white" style="margin-left:20rpx;" v-if="item.welfareStatus == 2">
                  <van-button round @click.stop="todo('退回',item)">退回</van-button>
                </span>
                <span class="blue" style="margin-left:20rpx;" v-if="item.welfareStatus == 2">
                  <van-button round @click.stop="todo('接单',item)">接单</van-button>
                </span>
                <span class="big big-b" style="margin-left:20rpx;" v-if="item.welfareStatus == 3">
                  <van-button round @click.stop="todo('开始',item)">开始服务</van-button>
                </span>
                <span class="big big-b" style="margin-left:20rpx;" v-if="item.welfareStatus == 4 ">
                  <van-button round @click.stop="todo('完成',item)">完成服务</van-button>
                </span>
              </div>
            </div>
          </div>
          <div class="item flex-c" style="margin-top: 70px;" v-else>
            <div class="flex-c" style="flex-wrap:wrap;">
              <div style="width:100%;" class="flex-c">
                <img src="/static/images/login/noRenzhen.png" style="width: 71px;height: 176rpx;" />
              </div>
              <p style="width:100%;text-align: center;padding: 10px 0px;color: #999;">请先通过实名认证,才可接单</p>
              <div class="loginButton" @click="toCheck" style="width:55%;">去认证</div>
            </div>
          </div>
        </div>
        <div v-else style="width:100%;height:100%">
          <noLogin />
        </div>
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

      <van-toast id="van-toast" />
      <van-dialog id="van-dialog" />
    </div>
  </div>
</template>

<script>
import store from "../../../utils/store";
import frames from "../../../components/frames";
import Toast from "../../../../static/vant/dist/toast/toast";
import Http from "../../../utils/https";
import Dialog from "../../../../static/vant/dist/dialog/dialog";
import tabbar from "../../../template/tabBar";
import dayjs from "dayjs";

import noLogin from "../../../template/noLogin";

let H = new Http();

export default {
  components: { frames, tabbar, noLogin },
  data() {
    return {
      nurseData: {},
      load: false,
      pn: 1, //页数
      ps: 999, // 每页多少条
      obj: {
        text: "订单",
        state: false
      },
      height: 0,
      active: "0",
      active1: "order",
      data: [],
      timer: ""
    };
  },
  methods: {
    //去认证
    toCheck() {
      let id = this.nurseData.authState;
      if (id == 0) {
        wx.navigateTo({ url: "/pages/hushi/preliminary/main" });
        return;
      } else if (id == 1) {
        wx.navigateTo({ url: "/pages/hushi/noAuthentication/main" });
        return;
      } else if (id == 3) {
        wx.navigateTo({ url: "/pages/hushi/noPass/main" });
        return;
      } else if (id == 2) {
        wx.navigateTo({ url: "/pages/hushi/preliminary/mian" });
      }
    },
    onClick(e) {
      this.active = e.mp.detail.index;
      this.getData("fresh", Number(this.active) + 1);
    },
    getData(flag, num) {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      let data = {
        ps: this.ps,
        pn: this.pn,
        flag: num
      };
      H.findWelfareOrderByPage(header, "post", data, res => {
        if (res.data.code == 0) {
          if (flag == "fresh") {
            this.data = res.data.data.records.map(el => {
              el.welfareTime = dayjs(el.welfareTime).format("YYYY-MM-DD");
              return el;
            });
          } else {
            console.log(flag);
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    // 跳转到详情页
    listNo(item) {
      wx.navigateTo({ url: "/pages/hushi/lineItem/main?id=" + item });
    },
    hasClick(e) {
      let temp = e.mp.detail;
      if (temp == "token") {
        wx.redirectTo({ url: "/pages/hushi/addressBook/main" });
        return;
      }
      if (temp == "call") {
        wx.redirectTo({ url: "/pages/hushi/callPolice/main" });
        return;
      }
      if (temp == "mine") {
        wx.redirectTo({ url: "/pages/hushi/mine/main" });
        return;
      }
    },
    todo(name, item) {
      if (name == "退回") {
        wx.navigateTo({
          url: "/pages/hushi/orderReturn/main?id=" + item.orderNo
        });
      }
      if (name == "接单" || name == "完成" || name == "开始") {
        wx.navigateTo({ url: "/pages/hushi/lineItem/main?id=" + item.orderNo });
      }
      if (name == "删除") {
      }
    },
    myAddress() {
      let _this = this;
      wx.getLocation({
        type: "wgs84",
        isHighAccuracy: false,
        success: res => {
          let data = {
            lng: String(res.longitude),
            lat: String(res.latitude)
            // userId:this.nurseData.userId
          };
          let temp = {
            longitude: res.longitude,
            latitude: res.latitude
          };
          store.commit("saveMyaddress", temp);
          let header = {
            "content-type": "application/json",
            "API-User-Token": _this.nurseData.token
          };
          wx.request({
            url: _this.$img + "/api/nurse/user/realTimeUpdateNurseAddrInfo",
            data: data,
            header: header,
            method: "post",
            success: res => {},
            fail: err => {
              console.log(err);
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
    this.height = store.state.statusBarHeight;
  },
  onShow() {
    this.nurseData = wx.getStorageSync("nurseData");
    this.getData("fresh", Number(this.active) + 1);
    if (this.nurseData) {
      this.myAddress();
      this.timer = setInterval(_ => {
        this.myAddress();
      }, 10000*6);
    }
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
.tabbar >>> .img {
  width: 38rpx !important;
  height: 38rpx !important;
}
.nav {
  position: absolute;
  width: 100%;
  right: 0px;
  left: 0px;
  bottom: 50px;
  overflow-x: hidden;
  overflow-y: auto;
}
.right {
  padding-left: 15px;
  flex-basis: 70%;
  overflow: hidden;
  flex-wrap: wrap;
}
.right > div {
  width: 100%;
}
.nav >>> .van-hairline--top-bottom:after {
  border: 0px;
  border-bottom: 2rpx solid #e6e6e6;
}
.nav >>> .van-tabs__line {
  background-color: #3ca1ff !important;
}
.nav >>> .van-tab--active {
  color: #3ca1ff !important;
}
.nav >>> .van-tab {
  font-size: 30rpx !important;
  color: #626266 !important;
}
.wrap {
  width: 100%;
  height: calc(100% - 44px);
  overflow-x: hidden;
  overflow-y: auto;
}
.box {
  width: calc(100% - 49rpx);
  padding: 24rpx 29rpx 25rpx 30rpx;
  border-bottom: 10rpx solid #f2f2f2;
}
.content {
  width: 100%;
  font-size: 26rpx;
  color: #333;
  margin-top: 24rpx;
}
.address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-basis: 90%;
  display: inline-block;
}
.box >>> .van-button {
  height: 72rpx;
  vertical-align: auto;
  line-height: 66rpx;
}
.white >>> .van-button {
  border-color: #c5c4cc !important;
  color: #999999 !important;
  font-size: 30rpx !important;
  padding: 0 80rpx !important;
}
.img {
  width: 240rpx;
  height: 180rpx;
}
.blue >>> .van-button {
  color: #fff !important;
  font-size: 30rpx !important;
  padding: 0 80rpx !important;
  background: linear-gradient(
    90deg,
    rgba(75, 164, 255, 1) 0%,
    rgba(86, 181, 254, 1) 100%
  ) !important;
}
.big >>> .van-button {
  font-size: 30rpx !important;
  padding: 0 50rpx !important;
}
.big-w >>> .van-button {
  border-color: #c5c4cc !important;
  color: #999999 !important;
}
.big-b >>> .van-button {
  color: #fff !important;
  background: linear-gradient(
    90deg,
    rgba(75, 164, 255, 1) 0%,
    rgba(86, 181, 254, 1) 100%
  ) !important;
}

.tabbar >>> .van-tabbar--fixed {
  z-index: 999 !important;
}

.loginButton {
  margin-top: 14rpx;
  width: 80%;
  height: 49px;
  line-height: 49px;
  border-radius: 25px;
  text-align: center;
  background-color: #52affe;
  overflow: hidden;
  color: #ffffff;
  border: 0px;
  position: relative;
}

.loginButton::before {
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
.loginButton:active::before {
  opacity: 0.1;
}
</style>
