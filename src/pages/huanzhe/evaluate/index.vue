<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <div class="box">
        <img :src="listData.welfareInfo.welfarePicture" alt />
        <div class="boxTop">
          <div class="head">
            <span>{{listData.welfareInfo.welfareName}}</span>
            <span>已被购买{{listData.count}}次</span>
          </div>
          <div class="much">￥{{listData.welfareInfo.totalFee}}/次</div>
        </div>
        <div class="boxMaddin">
          <div>
            <span>服务机构</span>
            <span>中南大学湘雅医院</span>
          </div>
          <div>
            <span>服务保障</span>
            <span>本平台将为本服务购买保险</span>
          </div>
        </div>
        <div class="boxBottom">
          <div class="sericeIntroduction">
            <div class="bB_top">
              <img src="/static/images/login/service_introduction.png" alt />
              <span>服务介绍</span>
            </div>
            <p>{{listData.welfareInfo.welfareContent}}</p>
          </div>
          <div class="sericeIntroduction">
            <div class="bB_top">
              <img src="/static/images/login/guidelines.png" alt />
              <span>服务须知</span>
            </div>
            <p>{{listData.mustKnow.content}}</p>
          </div>
        </div>
        <div class="evaluate">
          <div class="evTop">
            <div>
              <img src="/static/images/login/evaluation.png" alt />
              <span>服务评价({{size}})</span>
            </div>
            <div @click="allEvaluate">
              <span>查看全部</span>
              <img src="/static/images/login/right_arrow3.png" alt />
            </div>
          </div>

          <div class="list" v-for="(item,index) of listData.page.records" :key="index">
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
              <!--                            <div v-for="(items,num) in images[]" :key="num" style="display: flex">-->
              <img class="my-images" v-for="(value,key) in images[index]" :key="key" :src="value" />
              <!--                            </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="purchase">
        <div @click="butItNow">立即购买</div>
      </div>
    </div>

    <van-dialog id="van-dialog" />

    <van-dialog
      use-slot
      title="患者告知同意书"
      :show="dialogShow"
      :showConfirmButton="false"
      :showCancelButton="false"
    >
      <div class="content">{{content}}</div>
      <div class="btnConfig">
        <!--  @click="checkBuy" -->
        <div v-if="loadingTime != 0">同意({{loadingTime}})</div>
        <van-button @click="checkBuy" v-else>同意</van-button>
      </div>
    </van-dialog>
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
      size: 0, //评价总数
      images: [], //评价的照片
      evaluation: [], //评价记录
      listData: {},
      id: "",
      list: {},
      show: false,
      rateColor: "#F1884E",
      rateSize: "15px",
      obj: {
        text: "",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      dialogShow: false,
      loadingTime: 0,
      content: ""
    };
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data.call(this));
    this.id = options.id; //主页传的参数
    //获取服务详细信息
    let patientData = wx.getStorageSync("patientData");
    let header = {
      "content-type": "application/json",
      "API-User-Token": patientData.token
    };
    H.selectByType(header, "get", 12, rst => {
      console.log(rst);
      if (rst.data.code == 0) {
        this.content = rst.data.data.content;
      } else {
        this.$toast(`${rst.data.message}`);
      }
    });
    H.welfareDetail(header, "GET", options.id, rst => {
      let {
        data: { data }
      } = rst;
      this.listData = data;
      // this.images = this.listData.data.page.records
      this.listData.page.records.forEach(key => {
        this.images.push(key.appraiseImg.split(","));
      });
      this.evaluation = data.page.records; //两条评价记录
      this.obj.text = data.welfareInfo.welfareName;
      //设置评价总数
      this.size = this.listData.page.total;
    });
  },
  methods: {
    allEvaluate() {
      wx.navigateTo({ url: "/pages/huanzhe/allEvaluation/main?id=" + this.id });
    },
    checkBuy() {
      let str = JSON.stringify(this.listData.welfareInfo);
      wx.setStorageSync("welfareInfo", str);
      wx.navigateTo({ url: "/pages/huanzhe/paymentOnder/main" });
      this.dialogShow = false;
    },
    butItNow() {
      //判断用户是否审核通过 否则不允许进入支付界面
      let patientData = wx.getStorageSync("patientData");
      // 测试代码
      if (patientData.openId) {
        if (patientData.authState === 2) {
          this.dialogShow = true;
          this.loadingTime = 15;
          // this.loadingTime = 1;
          this.timer = setInterval(() => {
            if (this.loadingTime <= 0) {
              clearInterval(this.timer);
              this.loadingTime = 0;
            } else {
              this.loadingTime -= 1;
            }
          }, 1000);
        } else {
          Dialog.confirm({
            title: "提示",
            message: "您还没有认证信息,请先认证~",
            confirmButtonText: "去认证"
          })
            .then(() => {
              //待审核
              if (patientData.authState === 1) {
                wx.navigateTo({ url: "/pages/huanzhe/authentication/main" });
                //未认证
              } else if (patientData.authState === 3) {
                wx.navigateTo({
                  url:
                    "/pages/huanzhe/noAuthentication/main?reason=" +
                    patientData.reason
                });
                //   待认证
              } else {
                wx.navigateTo({
                  url: "/pages/huanzhe/patientsCertification/main"
                });
              }
            })
            .catch(_ => {});
        }
      } else {
        this.$toast("暂无授权信息,请先进行授权");
        wx.navigateTo({
          url: "/pages/huanzhe/appUserEvaluate/main"
        });
      }
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

.content {
  padding: 0 20rpx;
  height: 420rpx;
  text-indent: 30rpx;
  overflow-y: auto;
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

.my-images {
  width: 1.95rem;
  height: 1.95rem;
}
.btnConfig {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10rpx 0px;
}
.btnConfig div {
  width: 236rpx;
  height: 0.8rem;
  margin: 0.2rem auto;
  text-align: center;
  line-height: 0.8rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  border-radius: 45px;
  font-size: 0.34rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: red;
  opacity: 0.7;
}
.btnConfig >>> .van-button--default {
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  border-radius: 45rpx;
  font-size: 34rpx;
  width: 236rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #fff;
}
</style>
