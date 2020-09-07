<template>
  <div class="containerLogin" :style="{height:screenHeight-tabbarHeight+'px'}">
    <frames :obj="obj" :BgClass="true"></frames>
    <div class="seaction" :style="{top:headHeigth + 42 +'px'}">
      <div class="banner">
        <swiper
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
        >
          <block>
            <swiper-item v-for="(item,index) in bannerList" :key="index">
              <img :src="item.bannerImg" alt />
            </swiper-item>
          </block>
        </swiper>
      </div>
      <div class="sreachClass">
        <div class="searchMain">
          <div class="sreachLeft">
            <input
              v-model="keyword"
              placeholder="搜索服务名称"
              placeholder-style="color:#ccc"
              @input="keywordChange"
              confirm-type="send"
            />
          </div>
          <div class="sreachRight" @click="todoSearch">
            <span>搜索</span>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="w-left" v-if="list.length>0">
          <van-sidebar :active-key="activeKey" @change="onChange">
            <van-sidebar-item :title="item.name" v-for="(item,index) in list" :key="index" />
          </van-sidebar>
        </div>
        <div class="w-right">
          <div class="box" v-if="list.length > 0 || page.length>0">
            <div class="list" v-for="(item,index) of page" :key="index" @click="btn(index)">
              <div class="left">
                <img :src="item.welfarePicture" alt />
              </div>
              <div class="right">
                <span>{{item.welfareName}}</span>
                <span>已购买{{item.dealCount}}次</span>
                <span>￥{{item.totalFee}}/次</span>
              </div>
            </div>
          </div>
          <div v-else>暂无数据</div>
        </div>
      </div>
    </div>
    <div class="tabBar">
      <van-tabbar active="home" @change="hasClick">
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
import Http from "../../../utils/https";
let H = new Http();
export default {
  components: { frames, orderFormData, appoint },
  data() {
    return {
      activeKey: 0,
      obj: {
        text: "首页",
        state: false
      },
      bannerList: [],
      page: [],
      // arr:[1,2,3,4],
      headHeigth: 0,
      screenHeight: 0,
      dataHeigth: 0,
      tabbarHeight: 0,
      styleStore: false,
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      list: [],
      id: "",
      patientData: {},
      keyword: "",
      header: {}
    };
  },
  methods: {
    keywordChange() {
      if (!this.keyword) {
        this.getSelectServiceName();
      }
    },
    todoSearch() {
      H.getServiceNameList(
        this.header,
        "post",
        { keyword: this.keyword },
        res => {
          if (res.data.code == 0) {
            let rst = res.data;
            this.list = [];
            if (rst.data.page.length > 0) {
              this.page = rst.data.page;
            } else {
              this.page = [];
            }
          } else {
            this.$toast(`${res.data.message}`);
          }
        }
      );
    },
    onChange(e) {
      let index = e.mp.detail;
      let id = this.list[index].id;
      this.id = id;
      this.getIndexData(id);
    },
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
    btn(index) {
      let id = this.page[index].welfareId;
      wx.navigateTo({
        url: "/pages/huanzhe/evaluate/main?id=" + id
      });
    },
    getIndexData(id) {
      let data = {
        pn: 1,
        ps: 10,
        typeId: id
      };
      H.indexInfo(this.header, "POST", data, rst => {
        if (rst.data.code == 0) {
          let {
            data: {
              data: { page }
            }
          } = rst; //所有数据
          let {
            data: {
              data: { bannerList }
            }
          } = rst; //轮播图
          this.page = page.records;
          this.bannerList = bannerList;
        } else {
          this.$toast(`${rst.data.message}`);
        }
      });
    },
    getSelectServiceName() {
      H.getSelectServiceName(this.header, "get", "", res => {
        if (res.data.code == 0) {
          let data = res.data.data;
          if (data && data.length > 0) {
            this.list = data;
            this.id = data[0].id;
            this.getIndexData(data[0].id);
          } else {
            this.list = [];
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    init() {
      let patientData = wx.getStorageSync("patientData");
      this.header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      H.getUserInfo(this.header, "get", "", res => {
        if (res.data.code == 0) {
          let {
            data: { data }
          } = res;
          data.token = patientData.token;
          wx.setStorageSync("patientData", data);
        }
      });
    }
  },
  onLoad() {
    this.init();
    this.getSelectServiceName();
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
.sreachClass {
  height: 120rpx;
  width: 100%;
  border-bottom: 10rpx solid rgba(242, 242, 242, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchMain {
  height: 72rpx;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.sreachLeft {
  width: 77%;
  height: 100%;
  border-radius: 36px 0px 0px 36px;
  background: rgba(242, 242, 242, 1);
  color: #cccccc;
}
.sreachRight {
  width: 23%;
  height: 100%;
  background: rgba(88, 159, 247, 1);
  border-radius: 0px 36px 36px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.sreachLeft input {
  height: 100%;
  line-height: 72rpx;
  margin-left: 24px;
}
/* -------------------- */
.none {
  display: none;
}

.containerLogin {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* height: 100%; */
}
.containerLogin >>> .van-sidebar-item--active .van-sidebar-item__text {
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(58, 157, 237, 1) !important;
}
.containerLogin >>> .van-sidebar-item__text {
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(99, 100, 102, 1);
}

.seaction {
  position: absolute;
  bottom: 50px;
  left: 0;
  background-color: #ffffff;
}

.seaction::-webkit-scrollbar {
  display: none;
}

.banner,
.banner img {
  width: 7.5rem;
}
.banner img {
  height: 260rpx;
}
.box {
  /* margin-top: 0.5rem; */
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.box > .list {
  margin: 40rpx 0px;
  padding: 0 40rpx;
  display: flex;
  flex-direction: row;
}

.left > img {
  height: 1.8rem;
  width: 2.6rem;
}

.right {
  margin-left: 0.25rem;
  display: flex;
  flex-direction: column;
  flex: 1 0 60%;
}

.right > span:nth-child(1) {
  padding-top: 10rpx;
  font-size: 0.32rem;
  color: #333333;
  width: 99%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.right > span:nth-child(2) {
  display: inline-block;
  font-size: 0.28rem;
  color: #999999;
  margin: 20rpx 0 33rpx 0;
}

.right > span:nth-child(3) {
  display: inline-block;
  font-size: 0.3rem;
  color: #f1884e;
}
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: calc(100% - 260rpx);
}
.w-right,
.w-left {
  height: 100%;
}
.w-left {
  flex: 0 1 25%;
  overflow-y: auto;
}
.w-right {
  flex: 0 1 100%;
}
.w-left >>> .van-sidebar-item--active {
  border-color: #56b1fb !important;
}
.w-left >>> .van-sidebar-item {
  font-size: 28rpx !important;
  padding: 20px 0px 20px 0px !important;
  text-align: center;
}
.w-left >>> .van-sidebar {
  width: 100% !important;
}
</style>

<style >
swiper {
  height: 2.6rem !important;
}
</style>