<template>
  <div class="containerLogin" :style="{height:screenHeight-tabbarHeight+'px'}">
    <frames :obj="obj"></frames>

    <template v-if="displayNone">
      <div class="nav" :style="{top:headHeigth+'px'}">
        <van-tabs @change="onClick" class="waitingList" color="#56a1f8">
          <van-tab class="waitingList" :title="orderFormData.text" :name="1">
            <movable-view @vtouchmove="num(index)" style="width:100%;height:100%;position:static">
              <scroll-view
                scroll-y="true"
                v-if="index==0"
                class="seaction"
                :style="{height: dataHeigth-tabbarHeight-46+'px',top:headHeigth+46+'px'}"
                @scrolltoupper="pulldown(index)"
                @scrolltolower="lower(index)"
                @scroll="scrollT"
              >
                <div v-if="patientData" class="box">
                  <div class="load" v-show="load">
                    <van-loading
                      class="loading"
                      color="#1989fa"
                      size="30px"
                      type="spinner"
                      vertical
                    >加载中...</van-loading>
                    <p>加载中</p>
                  </div>
                  <orderFormData :orderFormData="orderFormData"></orderFormData>
                </div>
                <noLogin v-else />
              </scroll-view>
            </movable-view>
          </van-tab>
          <van-tab :title="orderFormData_2.text" :name="2">
            <movable-view @vtouchmove="num(index)" style="width:100%;height:100%;position:static">
              <scroll-view
                scroll-y="true"
                v-if="index==1"
                class="seaction"
                :style="{height: dataHeigth-tabbarHeight-46+'px',top:headHeigth+46+'px'}"
                @scrolltoupper="pulldown(index)"
                @scrolltolower="lower(index)"
                @scroll="scrollT"
              >
                <div v-if="patientData" class="box">
                  <div class="load" v-show="load">
                    <van-loading
                      class="loading"
                      color="#1989fa"
                      size="30px"
                      type="spinner"
                      vertical
                    >加载中...</van-loading>
                    <p>加载中</p>
                  </div>
                  <orderFormData :orderFormData="orderFormData_2"></orderFormData>
                </div>
                <noLogin v-else />
              </scroll-view>
            </movable-view>
          </van-tab>
          <van-tab :title="orderFormData_3.text" :name="3">
            <movable-view @vtouchmove="num(index)" style="width:100%;height:100%;position:static">
              <scroll-view
                scroll-y="true"
                v-if="index==2"
                class="seaction"
                :style="{height: dataHeigth-tabbarHeight-46+'px',top:headHeigth+46+'px'}"
                @scrolltoupper="pulldown(index)"
                @scrolltolower="lower(index)"
                @scroll="scrollT"
              >
                <div v-if="patientData" class="box">
                  <div class="load" v-show="load">
                    <van-loading
                      class="loading"
                      color="#1989fa"
                      size="30px"
                      type="spinner"
                      vertical
                    >加载中...</van-loading>
                    <p>加载中</p>
                  </div>
                  <orderFormData :orderFormData="orderFormData_3"></orderFormData>
                </div>
                <noLogin v-else />
              </scroll-view>
            </movable-view>
          </van-tab>
        </van-tabs>
        <van-toast id="van-toast" />
      </div>
    </template>
    <template v-if="!displayNone">
      <appoint></appoint>
    </template>

    <div class="tabBar">
      <van-tabbar active="map" @change="hasClick">
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
  </div>
</template>

<script>
import store from "../../../utils/store";
import frames from "../../../components/frames";
import orderFormData from "../../../components/orderFormData";
import appoint from "../../../components/appoint";
import Toast from "../../../../static/vant/dist/toast/toast";
import Http from "../../../utils/https";

import noLogin from "../../../template/noLogin";

let H = new Http();

export default {
  components: { frames, orderFormData, appoint, noLogin },
  data() {
    return {
      load: false,
      // nomore: false,
      pages: 0, // 进行中一共多少页,
      pages1: 0, // 已结束一共多少页
      pages2: 0, // 已取消一共多少页
      index: 0,
      arr: [],
      pn: 1, //页数
      ps: 10, // 每页多少条
      displayNone: true,
      boderBottom: true,
      boderBottom_1: false,
      boderBottom_2: false,
      patientData:{},
      obj: {
        text: "订单",
        state: false
      },
      orderFormData: {
        num: 1,
        text: "进行中",
        destroy: false,
        styleTrue: true, //该组件是否显示
        list: [], //        数据
        btn1: {
          //第一个按钮  text按钮名称 state状态
          text: "返回",
          state: false
        },
        btn2: {
          text: "取消订单",
          state: true
        }
      },
      orderFormData_2: {
        num: 2,
        text: "已结束",
        styleTrue: false,
        destroy: true,
        // list: [1, 2, 3, 4], //        数据
        btn1: {
          //第一个按钮  text按钮名称 state状态
          text: "返回",
          state: false
        },
        btn2: {
          text: "去评价",
          state: true
        }
      },
      orderFormData_3: {
        num: 3,
        text: "已取消",
        destroy: false,
        styleTrue: false,
        btn1: {
          //第一个按钮  text按钮名称 state状态
          text: "删除订单",
          state: false
        },
        btn2: {
          text: "接单",
          state: false
        }
      },
      // arr:[1,2,3,4],
      headHeigth: 0,
      screenHeight: 0,
      dataHeigth: 0,
      tabbarHeight: 0,
      styleStore: false
    };
  },
  methods: {
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
    num(index) {
      this.load = true;
      this.list(index);
      setTimeout(() => {
        this.load = false;
      }, 1000);
    },
    pulldown(index) {},
    lower(index) {
      if (index == 0) {
        if (this.pn > this.pages) {
          Toast("下面没有了呦~");
        } else {
          this.list2();
        }
      }
      if (index == 1) {
        if (this.pn > this.pages1) {
          Toast("下面没有了呦~");
        } else {
          this.list2();
        }
      }
      if (index == 2) {
        if (this.pn > this.pages2) {
          Toast("下面没有了呦~");
        } else {
          this.list2();
        }
      }
    },
    list2() {
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      let data = {
        pn: this.pn,
        ps: 10
      };
      let index = this.index;
      if (index == 0) {
        H.orderListOngoing(header, "POST", data, rst => {
          let {
            data: {
              data: { records, pages }
            }
          } = rst;
          this.pages = pages;
          // this.arr = this.arr.concat(records);
          this.pn = this.pn + 1;
          this.orderFormData.list = this.orderFormData.list.concat(records);
        });
      }
      if (index == 1) {
        H.orderListFinished(header, "POST", data, rst => {
          let {
            data: {
              data: { records, pages }
            }
          } = rst;

          //  this.arr = this.arr.concat(records);
          this.pn = this.pn + 1;
          this.orderFormData_2.list = this.orderFormData_2.list.concat(records);
        });
      }
      if (index == 2) {
        H.orderListCancled(header, "POST", data, rst => {
          let {
            data: {
              data: { records, pages }
            }
          } = rst;
          // this.arr = this.arr.concat(records);
          this.pn = this.pn + 1;
          this.orderFormData_3.list = this.orderFormData_3.list.concat(records);
        });
      }
    },
    list(index) {
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      this.pn = 1;
      let data = {
        pn: 1,
        ps: 10
      };
      if (index == 0) {
        H.orderListOngoing(header, "POST", data, rst => {
          let {
            data: {
              data: { records, pages }
            }
          } = rst;
          this.pages = pages;
          // this.arr = this.arr.concat(records);
          this.pn = 2;
          this.orderFormData.list = records;
        });
      }
      if (index == 1) {
        H.orderListFinished(header, "POST", data, rst => {
          let {
            data: {
              data: { records, pages }
            }
          } = rst;
          this.pages1 = pages;
          //  this.arr = this.arr.concat(records);
          this.pn = this.pn + 1;
          this.orderFormData_2.list = records;
        });
      }
      if (index == 2) {
        H.orderListCancled(header, "POST", data, rst => {
          let {
            data: {
              data: { records, pages }
            }
          } = rst;
          this.pages2 = pages;
          // this.arr = this.arr.concat(records);
          this.pn = this.pn + 1;
          this.orderFormData_3.list = records;
        });
      }
    },
    onClick(event) {
      let index = event.mp.detail.index;
      this.index = index;
      this.list(index);
    },
    scrollT(e) {
      if (e.target.scrollTop) {
      }
    }
  },
  onLoad(options) {
    this.list(0);
  },
  onShow() {
    this.index = 0;
    this.pn = 1;
    this.list(0);
    this.headHeigth = store.state.statusBarHeight;
    this.screenHeight = store.state.screenHeight;
    this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = this.screenHeight - this.headHeigth;
    this.patientData = wx.getStorageSync("patientData");
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}

.load {
  width: 100%;
  height: 1.5rem;
  line-height: 0.8rem;
  text-align: center;
}

.load > p {
  color: #cccc;
}

.van-loading {
  margin-left: 1.75rem !important;
}

::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

.none {
  display: none;
}

.containerLogin {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.nav {
  bottom: 50px;
  /* position: absolute;
        left: 0; */
  position: absolute;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  width: 100%;
  /*  height: 41.5px;∂*/
  /*line-height: 41.5px;*/
  /* height: 0.83rem;
        line-height: 0.83rem;
        border-bottom: 0.02rem solid #e6e6e6; */
}

.nav > div {
  position: relative;
  flex: 1;
  margin: 0 0.45rem;
  text-align: center;
}

.waitingList {
  width: 100%;
  padding-bottom: 5rem;
}

.red_waitingList,
.red_underWay,
.red_finished {
  position: absolute;
  top: 20%;
  right: 15%;
  width: 0.15rem;
  height: 0.15rem;
  border-radius: 100%;
  background-color: red;
}

.nav_border_bottom {
  border-bottom: 0.04rem solid #3ca1ff;
  padding-bottom: 0.04rem;
  color: #3ca1ff;
}

.seaction {
  /* position: absolute;
        left: 0; */
  width: 100%;
  /* background-color: #f2f2f2; */
  overflow-y: scroll;
  /* overflow: hidden; */
  z-index: 999;
}

.seaction::-webkit-scrollbar {
  display: none;
}

/* .scroll {
      overflow-y: scroll;
    } */
</style>
