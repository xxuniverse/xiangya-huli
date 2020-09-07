<template>
  <div class="containerLogin" :style="{height:screenHeight-tabbarHeight+'px'}">
    <frames :obj="obj"></frames>
    <div class="seaction" :style="{height: dataHeigth-tabbarHeight-46+'px',top:headHeigth+'px'}">
      <van-tabs @change="onClick" :active="active" swipeable>
        <van-tab title="我的患者" name="0"></van-tab>
        <van-tab title="护士列表" name="1"></van-tab>
      </van-tabs>
      <div class="wrap">
        <div class="mineLogo" v-for="(item,index) in dataList" :key="index">
          <div class="mineLogoImg">
            <img :src="item.header" v-if="item.header" />
            <img src="/static/images/login/jdImg.png" v-else alt />
          </div>
          <div class="mineLogo_right" v-if="active == 0">
            <div>
              <p>{{item.userName}}</p>
              <span>
                <a>{{item.phone}}</a>
              </span>
            </div>
            <div
              class="rightBtn"
              @click="makeCall(item.middleNumber)"
              v-if="userData.middleNumber && item.middleNumber && ( (userData.middleNumber.indexOf( item.middleNumber ) ) !== -1)"
            >拨打电话</div>
          </div>
          <div class="mineLogo_right" v-if="active == 1">
            <div>
              <p>{{item.userName}}</p>
              <span>
                <a>{{item.phone}}</a>
              </span>
            </div>
            <div class="rightBtn" @click="makeCall(item.phone)">拨打电话</div>
          </div>
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
    </div>
    <van-toast id="van-toast"></van-toast>
  </div>
</template>

<script>
import store from "../../../utils/store";
import frames from "../../../components/frames";
import Http from "../../../utils/https";
let H = new Http();
export default {
  components: { frames },
  data() {
    return {
      boderBottom: true,
      boderBottom_1: false,
      boderBottom_2: false,
      obj: {
        text: "通讯录",
        state: false
      },
      // arr:[1,2,3,4],
      headHeigth: 0,
      screenHeight: 0,
      dataHeigth: 0,
      tabbarHeight: 0,
      styleStore: false,
      ps: 999,
      pn: 1,
      dataList: [],
      active1: "token",
      active: "0",
      userData: null
    };
  },
  methods: {
    onClick(e) {
      this.active = e.mp.detail.index;
      this.getData();
    },
    getData() {
      let nurseData = wx.getStorageSync("nurseData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": nurseData.token
      };
      if (this.active == 0) {
        H.myPatientList(header, "post", { ps: this.ps, pn: this.pn }, res => {
          if (res.data.code == 0) {
            this.dataList = res.data.data.records;
          } else {
            this.$toast(`${res.data.message}`);
          }
        });
      } else if (this.active == 1) {
        H.getBooks(header, "post", { ps: this.ps, pn: this.pn }, res => {
          if (res.data.code == 0) {
            this.dataList = res.data.data.records;
          } else {
            this.$toast(`${res.data.message}`);
          }
        });
      }
      H.getUserInfo(header, "get", "", res => {
        if (res.data.code == 0) {
          this.userData = res.data.data;
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    makeCall(item) {
      wx.makePhoneCall({
        phoneNumber: item,
        fail(err) {
          console.log(err);
        }
      });
    },
    hasClick(e) {
      let temp = e.mp.detail;
      if (temp == "call") {
        wx.redirectTo({ url: "/pages/hushi/callPolice/main" });
        return;
      }
      if (temp == "order") {
        wx.redirectTo({ url: "/pages/hushi/oderForm/main" });
        return;
      }
      if (temp == "mine") {
        wx.redirectTo({ url: "/pages/hushi/mine/main" });
        return;
      }
    }
  },
  onLoad() {
    this.headHeigth = store.state.statusBarHeight;
    this.screenHeight = store.state.screenHeight;
    this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = this.screenHeight - this.headHeigth;
    this.active = 0;
    this.getData();
  }
};
</script>

<style scoped>
.none {
  display: none;
}
.containerLogin {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* height: 100%; */
}

.seaction {
  position: absolute;
  left: 0;
  width: 100%;
  background-color: white;
  overflow-y: scroll;
  /* overflow: hidden; */
}
.seaction::-webkit-scrollbar {
  display: none;
}
/* .scroll {
  overflow-y: scroll;
} */
.mineLogo {
  width: 100%;
  height: 1.6rem;
  padding: 0 0.3rem;
  display: flex;
  flex-direction: row;
  background-size: cover;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #e6e6e6;
}
/* .mineLogo > div {

} */
.tabbar >>> .img {
  width: 38rpx !important;
  height: 38rpx !important;
}
.mineLogoImg {
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  overflow: hidden;
  margin: 0.3rem 0;
}
.mineLogoImg > img {
  width: 1rem;
  height: 1rem;
}
.mineRight {
  width: 0.18rem;
  height: 0.34rem;
  margin: 0.43rem 0;
  vertical-align: top;
}
.mineLogo_right {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1rem;
  margin: 0.3rem 0;
  padding-left: 0.3rem;
  box-sizing: border-box;
}
/* .mineLogo_right > div {
  color: white;
} */
.mineLogo_right > div > p {
  font-size: 0.3rem;
  margin-top: 0.09rem;
  color: #333333;
}
.mineLogo_right > div > span {
  display: inline-block;
  margin-top: 0.09rem;
  font-size: 0.3rem;
  color: #999999;
}
.search {
  height: 0.8rem;
  border-top: 0.01rem solid #e6e6e6;
  padding: 0.4rem 0.3rem 0.1rem 0.3rem;
}
.searchBox {
  display: flex;
  flex-direction: row;
  background-color: #f2f2f2;
  border-radius: 0.4rem;
  height: 0.8rem;
}
.search img {
  width: 0.36rem;
  height: 0.36rem;
  padding: 0.01rem;
  margin: 0.22rem 0 0.22rem 0.3rem;
  vertical-align: middle;
}
.search input {
  width: 60%;
  margin: 19rpx 0 25rpx 16rpx;
  /* margin-left: -0.14rem; */
}
.rightBtn {
  width: 1.4rem;
  height: 0.54rem;
  padding: 0.01rem;
  border: 0.01rem solid #3ca1ff;
  border-radius: 0.27rem;
  text-align: center;
  line-height: 0.54rem;
  margin: 0.23rem 0;
  font-size: 0.24rem;
  color: #3ca1ff;
}
.seaction >>> .van-hairline--top-bottom:after {
  border: 0px;
  border-bottom: 2rpx solid #e6e6e6;
}
.seaction >>> .van-tabs__line {
  background-color: #3ca1ff !important;
}
.seaction >>> .van-tab--active {
  color: #3ca1ff !important;
}
.seaction >>> .van-tab {
  font-size: 30rpx !important;
  color: #626266 !important;
}
.wrap {
  width: 100%;
  height: calc(100% - 44px);
  overflow-x: hidden;
  overflow-y: auto;
}
.flexC {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexB {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
