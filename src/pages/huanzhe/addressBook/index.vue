<template>
  <div class="containerLogin" :style="{height:screenHeight-tabbarHeight+'px'}">
    <frames :obj="obj"></frames>
    <div class="seaction" :style="{height: dataHeigth-tabbarHeight-46+'px',top:headHeigth+'px'}">
      <scroll-view
        :scroll-y="true"
        style="height: calc(100% - 80rpx - 50rpx);"
        @scrolltolower="lower"
        :lower-threshold="scroll"
      >
        <div class="mineLogo" v-for="(item,index) in list" :key="index">
          <div class="mineLogoImg">
            <img :src="item.header" alt />
          </div>

          <div class="mineLogo_right">
            <div class="flexC">
              <p>{{item.userName}}</p>
              <!-- <span>{{item.phone}}</span> -->
            </div>
            <div
              class="rightBtn"
              v-if="userData.middleNumber && item.middleNumber  &&( (item.middleNumber.indexOf( userData.middleNumber ) ) !== -1)"
              @click="handleCallClick"
            >拨打电话</div>
          </div>
        </div>
      </scroll-view>
    </div>
    <!-- </scroll-view> -->
    <div class="tabBar">
      <van-tabbar active="record" @change="hasClick">
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
import Http from "../../../utils/https";

let H = new Http();
export default {
  components: { frames, orderFormData },
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
      list: [],
      pn: 1,
      ps: 10,
      patientData: null,
      header: null,
      userData: null
    };
  },
  methods: {
    axios() {
      //每次调用之前清空之前的数据
      this.list = [];
      H.myNurseList(this.header, "POST", { pn: this.pn, ps: this.ps }, rst => {
        if (rst.data.code === 0) {
          if (this.list.length !== 0) {
            this.list.push(...rst.data.data.records);
          } else {
            this.list = rst.data.data.records;
          }
        }
      });
    },
    lower(index) {
      this.pn++;
      this.axios();
    },
    scroll() {},
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
    handleCallClick(phone) {
      wx.makePhoneCall({
        phoneNumber: this.userData.middleNumber,
        fail(err) {
          console.log(err);
        }
      });
    },
    getUserData() {
      H.getUserInfo(this.header, "get", "", res => {
        if (res.data.code == 0) {
          this.userData = res.data.data;
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    }
  },
  onShow() {
    this.list = [];
    this.headHeigth = store.state.statusBarHeight;
    this.screenHeight = store.state.screenHeight;
    this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = this.screenHeight - this.headHeigth;
    this.axios();
  },
  onLoad() {
    this.patientData = wx.getStorageSync("patientData");
    this.header = {
      "content-type": "application/json",
      "API-User-Token": this.patientData.token
    };
    this.getUserData();
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.screenHeight = store.state.screenHeight;
    this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = this.screenHeight - this.headHeigth;
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
  align-items: center;
  flex-direction: row;
  background-color: #f2f2f2;
  border-radius: 0.4rem;
  height: 0.8rem;
}

.search img {
  width: 0.36rem;
  height: 0.36rem;
  padding: 0.01rem;
  /* border: 0.01rem dashed #ccc; */
  margin: 0.22rem 0 0.22rem 0.3rem;
  vertical-align: middle;
}

.search input {
  width: 60%;
  margin: 0.25rem 0 0.25rem 0.16rem;
  /* margin-left: -0.14rem; */
}
.flexC {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
