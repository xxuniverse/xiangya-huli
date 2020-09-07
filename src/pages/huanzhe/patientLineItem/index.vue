<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height: dataHeigth-tabbarHeight+'px',top:headHeigth+'px'}">
      <div class="waitingList">
        <img class="waitingList_img1" src="/static/images/login/listItemBg.png" alt />
        <img class="waitingList_img2" src="/static/images/login/listItemDb.png" alt />
        <span>{{welfareStatus}}</span>
      </div>

      <div class="boxContainer">
        <div class="serviceTime">
          <span>{{timer_title.length == 0 ? '服务时间' : timer_title}}</span>
          <span>{{listData.bespeakTime}}</span>
        </div>
      </div>
      <div class="oderInformation">
        <h2 class="h2_dd">订单信息</h2>
        <div class="orderInfo">
          <span>订单编号</span>
          <span>{{listData.orderNo}}</span>
        </div>
        <div class="item">
          <div class="itemImg">
            <img :src="listData.welfarePicture" alt />
          </div>
          <div class="itemRight">
            <p>{{listNo.welfareName}}</p>
            <span
              style="display: inline-block; width: 14rem;white-space: nowrap;text-overflow:ellipsis;overflow:hidden;"
            >{{listData.welfareContent}}</span>
          </div>
        </div>
        <div class="orderInfo">
          <span>服务费用:</span>
          <span>￥{{listData.totalFee}}</span>
        </div>
        <div class="orderInfo">
          <span>远距离交通费用:</span>
          <span>￥{{listData.remoteTrafficFee}}</span>
        </div>
        <div class="orderInfo">
          <span>订单支付金额:</span>
          <span class="colorOrange">￥{{listData.totalPayAmt}}</span>
        </div>
        <div class="orderNote">
          <p>订单备注:</p>
          <p>{{listData.remark}}</p>
        </div>
        <div class="orderNote">
          <p>服务地址:</p>
          <p>{{listData.address}}</p>
        </div>
        <div class="list">
          <p>导管图</p>
          <div class="pic">
            <div :key="index" v-for="(item,index) of pictureList[0]">
              <div style="margin-right: 0.3rem;margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <p>出院小结</p>
          <div class="pic">
            <div :key="index" v-for="(item,index) of pictureList[1]">
              <div style="margin-right: 0.3rem;margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <p>维护手册</p>
          <div class="pic">
            <div :key="index" v-for="(item,index) of pictureList[2]">
              <div style="margin-right: 0.3rem;margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="boxCatheter" v-if="stateOne">
        <h2 class="h2_dd">护士信息</h2>
        <div class="orderInfo">
          <span>护士姓名:</span>
          <span>{{listData.staffName}}</span>
        </div>
        <!-- <div class="orderInfo">
          <span>联系电话:</span>
          <div class="oIIphone" @click="handleCallClick">
            <span class="colorBlue">打电话给护士</span>
            <img src="/static/images/login/iphone.png" alt />
          </div>
        </div> -->
      </div>
      <div class="boxCatheter" v-if="state_result">
        <h2 class="h2_dd">诊前评估结果</h2>
        <div class="orderInfo">
          <span>有无置管侧肢体疼痛:</span>
          <span>{{ listData.diagnoseEvaluateInfo.flagOne == 1 ? '无' : '有' }}</span>
        </div>
        <div class="orderInfo">
          <span>有无肿胀:</span>
          <span>{{ listData.diagnoseEvaluateInfo.flagTwo == 1 ? '无' : '有' }}</span>
        </div>
        <div class="orderInfo">
          <span>导管有无破损:</span>
          <span>{{ listData.diagnoseEvaluateInfo.flagThree == 1 ? '无' : '有' }}</span>
        </div>
        <div class="orderInfo">
          <span>导管有无脱出:</span>
          <span>{{ listData.diagnoseEvaluateInfo.flagFour == 1 ? '无' : '有' }}</span>
        </div>
        <div class="orderInfo_orter">
          <span>其他</span>
          <span>{{ listData.diagnoseEvaluateInfo.remark }}</span>
        </div>
      </div>
      <van-dialog id="van-dialog" />
      <div class="btn" v-if="stateTwo">
        <div class="return" @click="cancellation">取消订单</div>
      </div>
      <div class="btn" v-if="stateThree">
        <div class="return" @click="deleteList">删除订单</div>
      </div>
      <!-- 底部按钮部分 -->
      <div class="btn-list" v-show="btnStatus">
        <button
          type="primary"
          :loading="loa"
          :plain="true"
          bindtap="primary"
          @click="hadnleDoctorClick"
        >查看诊前预评估记录</button>
        <button
          type="primary"
          :loading="loa"
          :plain="true"
          bindtap="primary"
          @click="handleOpenWhClick"
        >查看维护评估记录</button>
        <button
          type="primary"
          :loading="loa"
          :plain="true"
          bindtap="primary"
          @click="handleOpenHcCLick"
        >查看服务耗材</button>
        <button
          class="btn-end"
          type="primary"
          :loading="loa"
          :plain="true"
          bindtap="primary"
          @click="handleEndOrderClick"
        >确认完成</button>
      </div>
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
      state_result: false,
      loading: false,
      stateOne: false, // 是否显示护士信息及诊前评估结果
      stateTwo: false, // 是否显示取消订单按钮
      btnStatus: false, //判断底部按钮是否显示
      stateThree: false, // 是否显示删除订单按钮
      welfareStatus: "", // 服务状态
      listNo: {},
      listData: {},
      show: false,
      timer_title: "",
      obj: {
        text: "订单详情",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      screenHeight: 0,
      tabbarHeight: 0,
      pictureList: [],
      header: null,
      patientData: null
    };
  },
  methods: {
    handleOpenHcCLick() {
      wx.navigateTo({
        url:
          "/pages/hushi/showOtherExpenses/main?orderNo=" + this.listData.orderNo
      });
    },
    handleOpenWhClick() {
      wx.navigateTo({
        url: "/pages/hushi/showWeiHu/main?id=" + this.listData.orderNo
      });
    },
    handleCallClick(phone) {
      H.getUserInfo(this.header, "get", "", res => {
        if (res.data.code == 0) {
          wx.makePhoneCall({
            phoneNumber: res.data.data.middleNumber,
            fail(err) {
              console.log(err);
            }
          });
        }else{
          this.$toast(`${res.data.message}`)
        }
      });
    },
    //查看诊前预评估
    hadnleDoctorClick() {
      wx.navigateTo({
        url: "/pages/hushi/showDiagnosis/main?id=" + this.listData.orderNo
      });
    },
    //确认订单
    handleEndOrderClick() {
      Dialog.confirm({
        title: "提示",
        message: "确定要完成订单吗?"
      })
        .then(() => {
          H.endOrder(this.header, "GET", this.listData.orderNo, rst => {
            if (rst.data.code == 0) {
              wx.redirectTo({
                url:
                  "/pages/huanzhe/endOrder/main?obj=" +
                  JSON.stringify({
                    btn: "去评价",
                    success: "服务完成",
                    click: "openServer",
                    orderNo: this.listData.orderNo,
                    welfareId: this.listData.welfareId
                  })
              });
            }
          });
        })
        .catch(err => {});
      //弹窗
      // wx.navigateTo({ url: "/pages/bindingPhone/main" });
    },
    // 删除订单
    deleteList() {
      Dialog.confirm({
        title: "提示",
        message: "确定要删除订单吗？"
      })
        .then(() => {
          H.deleteOrder(this.header, "GET", this.listData.orderNo, rst => {
            let data = {
              text: "删除订单",
              p: "订单删除成功"
            };
            wx.redirectTo({
              url:
                "/pages/huanzhe/paymentSuccess/main?data=" +
                JSON.stringify(data)
            });
          });
        })
        .catch(() => {});
    },
    // 取消订单
    cancellation() {
      Dialog.confirm({
        title: "提示",
        message: "你确定要取消订单吗？"
      })
        .then(() => {
          H.cancelOrder(this.header, "POST", this.listData.orderNo, rst => {
            let data = {
              text: "订单取消",
              p: "订单取消成功，系统将24小时内退款到你账户中"
            };
            wx.redirectTo({
              url:
                "/pages/huanzhe/paymentSuccess/main?data=" +
                JSON.stringify(data)
            });
          });
        })
        .catch(() => {
          // on cancel
        });
      // }
    },
    showPopup(img) {
      wx.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      });
    },
    init() {
      H.orderDetail_(this.header, "GET", this.listNo.orderNo, rst => {
        if (rst.data.code !== 0) {
          this.$toast(`${res.data.message}`);
          return;
        }
        let {
          data: { data }
        } = rst;
        this.listData = data;
        let list = data.orderPictures;
        let temp = [[], [], []];
        list.forEach(el => {
          temp[el.pictureType - 1].push(el);
        });
        this.pictureList = temp;
        switch (this.listData.welfareStatus) {
          case 1:
            this.welfareStatus = "待指派";
            this.stateOne = false;
            this.stateTwo = true;
            this.stateThree = false;
            this.btnStatus = false;
            this.state_result = false;
            this.timer_title = "预约时间";
            break;
          case 2:
            this.welfareStatus = "待接单";
            this.stateOne = false;
            this.stateTwo = true;
            this.stateThree = false;
            this.btnStatus = false;
            this.state_result = false;
            break;
          case 3:
            this.welfareStatus = "待服务";
            this.stateOne = true;
            this.stateTwo = false;
            this.stateThree = false;
            this.btnStatus = false;
            this.state_result = true;
            break;
          case 4:
            this.welfareStatus = "服务中";
            this.stateOne = true;
            this.stateTwo = false;
            this.stateThree = false;
            this.btnStatus = false;
            this.state_result = true;
            break;
          case 5:
            this.welfareStatus = "待确认";
            this.stateOne = true;
            this.stateTwo = false;
            this.stateThree = false;
            this.btnStatus = true;
            this.state_result = true;
            break;
          case 6:
            this.welfareStatus = "已结束";
            this.btnStatus = false;
            this.stateOne = true;
            this.state_result = true;
            break;
          case 7:
            this.welfareStatus = "已评价";
            this.btnStatus = false;
            this.stateOne = true;
            this.stateThree = false;
            this.state_result = true;
            break;
          case 11:
            this.welfareStatus = "已取消";
            this.stateThree = true;
            this.stateTwo = false;
            this.btnStatus = false;

            //判断是护士还是用户手动取消

            this.stateOne = false;
            break;
          default:
            break;
        }
        if (this.listData.cancleSource == 2) {
          this.stateOne = false;
          this.state_result = true;
        } else if (this.listData.cancleSource == 1) {
          this.stateOne = false;
          this.state_result = false;
        } else {
        }
      });
    }
  },
  onLoad(options) {
    this.timer_title = "";
    this.listNo = JSON.parse(options.id);
    //将订单号放到vuex中
    store.commit("saveOrderNo", options.id);
    this.patientData = wx.getStorageSync("patientData");
    //
    this.header = {
      "content-type": "application/json",
      "API-User-Token": this.patientData.token
    };
    this.init();
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.screenHeight = store.state.screenHeight;
    this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
  }
};
</script>

<style scoped>
.boxCatheter {
  padding: 0 0.3rem;
  border-top: 0.02rem solid #e6e6e6;
}

.oIIphone {
  position: relative;
}

.oIIphone > img {
  width: 0.34rem;
  height: 0.34rem;
  /* border: 0.01rem dashed #ccc; */
  margin-left: 0.15rem;
  vertical-align: middle;
}

.colorBlue {
  color: #3ca1ff;
}

.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.section {
  width: 100%;
  position: absolute;
  left: 0;
  overflow-y: scroll;
}

.section::-webkit-scrollbar {
  display: none;
}

.waitingList {
  position: relative;
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
}

.waitingList > .waitingList_img1 {
  width: 100%;
  height: 100%;
}

.waitingList > .waitingList_img2 {
  position: absolute;
  left: 2.9rem;
  top: 50%;
  width: 0.48rem;
  height: 0.52rem;
  transform: translateY(-50%);
}

.waitingList > span {
  position: absolute;
  left: calc(2.9rem + 0.22rem + 0.48rem);
  top: 50%;
  display: inline-block;
  font-size: 0.32rem;
  transform: translateY(-50%);
  color: white;
}

.map {
  width: 100%;
  height: 2.8rem;
}

.boxContainer {
  border-top: 0.01rem solid #ccc;
  border-bottom: 0.1rem solid #f2f2f2;
}

.serviceTime {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.94rem;
  line-height: 0.94rem;
  margin: 0 0.3rem;
}

.serviceTime > span:nth-child(1),
.serviceTime > span:nth-child(2) {
  font-size: 0.3rem;
}

.oderInformation {
  padding: 0 0.3rem;
}

.item {
  display: flex;
  flex-direction: row;
  height: 1.8rem;
  background-color: #f5f5f5;
}

.item > .itemImg {
  width: 2rem;
  height: 1.5rem;
  margin: 0.15rem 0.2rem;
}

.item > .itemImg img {
  width: 2rem;
  height: 1.5rem;
}

.itemRight {
  margin-left: 0.1rem;
}

.itemRight > p {
  font-size: 0.3rem;
  margin: 0.34rem 0;
}

.itemRight > span {
  color: #999999;
  font-size: 0.26rem;
}

.orderInfo_orter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 0.44rem;
  margin-bottom: 0.4rem;
}

.orderInfo {
  /* position: relative; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.8rem;
  line-height: 0.8rem;
}

.orderInfo > span:nth-child(1),
.orderInfo > span:nth-child(2) {
  font-size: 0.26rem;
}

.orderInfo_orter > span:nth-child(1) {
  width: 40%;
}

.orderInfo_orter > span:nth-child(1),
.orderInfo_orter > span:nth-child(2) {
  font-size: 0.26rem;
}

.colorOrange {
  color: orange;
}

.orderNote {
  margin-top: 0.1rem;
}

.orderNote > p:nth-child(1) {
  font-size: 0.26rem;
}

.orderNote > p:nth-child(2) {
  margin-top: 0.24rem;
  margin-bottom: 0.38rem;
  font-size: 0.26rem;
  color: #999999;
  text-indent: 2em;
}
.list > p {
  font-size: 0.26rem;
  color: #000;
}
.btn {
  background-color: white;
  border-top: 0.1rem solid #f2f2f2;
  color: #3ca1ff;
}

.h2_dd {
  padding-top: 0.3rem;
  font-size: 0.32rem;
  color: #333333;
  font-weight: bold;
}

.boxCatheter {
  padding: 0 0.3rem;
}

.oIIphone > img {
  width: 0.34rem;
  height: 0.34rem;
  /* border: 0.01rem dashed #ccc; */
  margin-left: 0.15rem;
  vertical-align: middle;
}
.pic {
  position: relative;
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  /* justify-content: space-between; */
  padding-bottom: 0.4rem;
}

.pic > div {
  position: relative;
  width: 2.1rem;
  height: 2.1rem;
  margin-left: 0.3rem;
}

.pic img {
  width: 2.1rem;
  height: 2.1rem;
}

.pic > div:nth-child(1) {
  margin-left: 0;
}

.colorBlue {
  color: #3ca1ff;
}

.orderInfo_address {
  display: flex;
  margin-top: 0.15rem;
  font-size: 0.26rem;
}

.fwAddress {
  flex: 1;
}

.fwAddress_a {
  flex: 4;
  text-align: right;
  height: 0.6rem;
}

.submit,
.return {
  text-align: center;
  margin: 0.2rem 0.55rem;
  height: 0.9rem;
  border-radius: 0.45rem;
  line-height: 0.9rem;
}

.submit {
  margin-top: 0.4rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  color: white;
}

.return {
  border: 1px solid #50abff;
}

.btn-list {
  margin-left: 0.55rem;
  margin-right: 0.55rem;
}

.btn-list button {
  height: 0.9rem;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  line-height: 0.9rem;
  border: 0.02rem solid rgba(60, 161, 255, 1);
  border-radius: 0.45rem;
  color: #3ca1ff;
  font-size: 0.32rem;
}

.btn-end {
  background-color: #3ca1ff !important;
  color: #ffffff !important;
}

.tel {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  /* background-color: red; */
}
</style>
