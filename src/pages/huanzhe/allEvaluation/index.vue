<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <scroll-view
        scroll-y="true"
        style="height: 100vh"
        @scrolltolower="scrolltolower"
        @scroll="scroll"
      >
        <div class="box">
          <div class="list" v-for="(item,index) in listData" :key="index">
            <div class="listTop">
              <div class="lTleft">
                <img :src="item.headImg" alt />
                <div>
                  <span class="userName">{{item.appraiseUser}}</span>
                  <p class="userDate">{{item.appraiseTime}}</p>
                </div>
              </div>
              <van-rate
                class="rate"
                :readonly="true"
                :value="item.appraiseScore"
                :color="rateColor"
                :size="rateSize"
              />
            </div>
            <p>{{item.appraiseContent}}</p>
            <div class="listImg" v-if="images[index][0] !== '' ">
              <img v-for="(value,key) in images[index]" :key="key" :src="value" alt />
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Http from "../../../utils/https";

let H = new Http();
export default {
  components: { frames },
  data() {
    return {
      images: [], //评价图片
      listData: {},
      id: "",
      list: {},
      show: false,
      rateColor: "#F1884E",
      rateSize: "15px",
      obj: {
        text: "全部评价",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      screenHeight: 0,
      tabbarHeight: 0,
      styleStore: false,
      total: null,
      pn: 1
    };
  },
  onLoad(options) {
    //还原对象
    Object.assign(this.$data, this.$options.data.call(this));
    this.id = options.id; //主页传的参数
    //获取服务详细信息
    let patientData = wx.getStorageSync("patientData");
    let header = {
      "content-type": "application/json",
      "API-User-Token": patientData.token
    };
    let data = {
      pn: 1,
      ps: 10
    };
    let str = "sa";
    let _this = this;
    wx.request({
      header,
      url:
        "http://192.168.0.113:9091/api/patient/goods/appraiseListByWelfareId/" +
        // "https://huli.novocare.cn/api/patient/goods/appraiseListByWelfareId/" +
        _this.id, //开发者服务器接口地址",
      data: data, //请求的参数",
      method: "POST",
      dataType: "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: res => {
        this.listData = res.data.data.records;
        this.listData.forEach(key => {
          this.images.push(key.appraiseImg.split(","));
        });
        this.total = res.data.data.total;
      }
    });
  },
  onShow() {
    // this.headHeigth = store.state.statusBarHeight;
    // this.screenHeight = store.state.screenHeight;
    // this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    // this.dataHeigth = this.screenHeight - this.headHeigth;
  },
  methods: {
    scrolltolower() {},
    onReachBottom() {
      console.log("触底了");
    },
    scroll() {
      this.debounce(this.ajax, 1000)();
    },
    //函数节流
    debounce(func, wait) {
      let timeout;
      return function() {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(null, args);
        }, wait);
      };
    },
    ajax() {
      //获取服务详细信息
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      let data = {
        pn: ++this.pn,
        ps: 10
      };
      console.log("这是测试数据");
      console.log(this.ps);
      if (this.ps > Math.ceil(this.total / 10)) {
        return;
      }
      let str = "sa";
      let _this = this;
      wx.request({
        header,
        url:
          "http://192.168.0.113:9091/api/patient/goods/appraiseListByWelfareId/" +
          // "https://huli.novocare.cn/api/patient/goods/appraiseListByWelfareId/" +
          _this.id, //开发者服务器接口地址",
        data: data, //请求的参数",
        method: "POST",
        dataType: "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
        success: res => {
          this.listData.push(...res.data.data.records);
          this.listData.forEach(key => {
            this.images.push(key.appraiseImg.split(","));
          });
        }
      });
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
  overflow-y: scroll;
  position: absolute;
  width: 100%;
}

.section::-webkit-scrollbar {
  display: none;
}

.box {
  margin-bottom: 1.4rem;
}

.box > img {
  width: 7.5rem;
  height: 3.5rem;
}

.boxTop {
  height: 1.8rem;
  padding: 0 0.3rem;
  border-bottom: 0.1rem solid #f2f2f2;
}

.head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.head > span {
  display: inline-block;
}

.head > span:nth-child(1) {
  color: #333333;
  font-size: 0.38rem;
  margin: 0.3rem 0 0.2rem 0;
}

.head > span:nth-child(2) {
  color: #999999;
  font-size: 0.26rem;
  margin-top: 0.4rem;
}

.much {
  color: #f1884e;
  font-size: 0.36rem;
}

.boxMaddin {
  width: 100%;
  border-bottom: 0.1rem solid #f2f2f2;
}

.boxMaddin > div {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1.1rem;
  width: 100%;
  padding: 0 0.3rem;
  line-height: 1.1rem;
  font-size: 0.3rem;
}

.boxMaddin > div:nth-child(1) {
  border-bottom: 0.01rem solid #e6e6e6;
}

.boxMaddin > div > span:nth-child(1) {
  color: #333333;
}

.boxMaddin > div > span:nth-child(2) {
  color: #999999;
}

.sericeIntroduction {
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.26rem;
  border-bottom: 0.1rem solid #f2f2f2;
}

.bB_top {
  margin: 0.44rem 0 0.15rem 0;
}

.bB_top > img {
  width: 0.48rem;
  height: 0.48rem;
  padding: 0.01rem;
  vertical-align: middle;
}

.bB_top > span {
  display: inline-block;
  margin-left: 0.16rem;
  font-size: 0.32rem;
  color: #333333;
  font-family: Source Han Sans CN;
  font-weight: 500;
}

.sericeIntroduction > p {
  font-size: 0.28rem;
  color: #333333;
  padding-bottom: 0.49rem;
}

.evTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0.3rem;
  height: 0.54rem;
  margin-top: 0.45rem;
}

.evTop > div:nth-child(1) > img {
  width: 0.48rem;
  height: 0.48rem;
  padding: 0.01rem;
  vertical-align: middle;
}

.evTop > div:nth-child(1) > span {
  font-size: 0.32rem;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-left: 0.12rem;
}

.evTop > div:nth-child(2) > img {
  width: 0.13rem;
  height: 0.22rem;
}

.evTop > div:nth-child(2) > span {
  display: inline-block;
  margin-right: 0.09rem;
  font-size: 0.28rem;
  color: #999999;
}

.list {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
}

.lTleft {
  display: flex;
  flex-direction: row;
  margin-top: 0.23rem;
}

.lTleft > img {
  width: 0.78rem;
  height: 0.78rem;
  border-radius: 50%;
  overflow: hidden;
}

.lTleft > div {
  margin-left: 0.2rem;
}

.listImg > img {
  width: 1.95rem;
  height: 1.95rem;
}

.listTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.userName {
  font-size: 0.28rem;
  color: #333333;
}

.userDate {
  font-size: 0.24rem;
  color: #666666;
}

.rate {
  margin-top: 0.35rem;
}

.list > p {
  margin-top: 0.24rem;
  padding-left: 0.85rem;
  color: #333333;
  font-size: 0.28rem;
  margin-bottom: 0.29rem;
}

.listImg {
  margin-bottom: 0.29rem;
  padding-left: 0.85rem;
}

.listImg > img:nth-child(1),
.listImg > img:nth-child(2) {
  margin-right: 0.1rem;
}

.purchase {
  position: fixed;
  width: 100%;
  height: 1.3rem;
  left: 0;
  bottom: 0;
  border-top: 0.01rem solid #e6e6e6;
  background-color: white;
}

.purchase > div {
  width: 6.9rem;
  height: 0.9rem;
  margin: 0.2rem auto;
  text-align: center;
  line-height: 0.9rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  border-radius: 45px;
  font-size: 0.3rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
</style>
