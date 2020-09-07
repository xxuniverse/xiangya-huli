<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{ top:headHeigth+'px'}">
      <div class="waitingList" v-if="data.welfareStatus !== 4 ">
        <img class="waitingList_img1" src="/static/images/login/listItemBg.png" alt />
        <img class="waitingList_img2" src="/static/images/login/listItemDb.png" alt />
        <span>{{indentState}}</span>
      </div>

      <div class="waitingList flex-s wait-b" v-if="data.welfareStatus == 4">
        <div class="center flex-s">
          <div class="flex-c" style="height:100%;width:60rpx;">
            <img src="../../../../static/images/login/timer.png" class="img-b" />
          </div>
          <div class="flex-s" style="height:100%;width:100%;margin-left:21rpx">
            <div style="height:calc(100% - 63rpx);width:100%;flex-wrap:wrap;" class="flex-s">
              <div style="width:100%;height:50%;font-size:30rpx;color:#fff" class="flex-s">
                <span>服务中</span>
              </div>
              <div style="width:100%;height:50%;font-size:24rpx;color:#fff" class="flex-s">
                <span>已服务{{time.h}}小时{{time.m}}分{{time.s}}秒</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 抽取的地图组件 -->
      <myMap :commodityInformation="data" />
      <!-- ----------------- -->
      <div class="boxContainer">
        <div class="serviceTime">
          <span>服务时间</span>
          <span>{{data.welfareTime || ''}}</span>
        </div>
      </div>

      <div class="oderInformation">
        <h2 class="h2_dd">订单信息</h2>
        <div class="orderInfo">
          <span>订单编号</span>
          <span>{{data.orderNo || ''}}</span>
        </div>
        <div class="item">
          <div class="itemImg">
            <img :src="data.welfarePicture" alt v-if="data.welfarePicture" />
            <img src="../../../../static/images/login/e1.png" v-else />
          </div>
          <div class="itemRight">
            <p>{{data.welfareName || ''}}</p>
            <span
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display:inline-block;width: 426rpx;"
            >{{data.welfareContent || ''}}</span>
          </div>
        </div>
        <div class="orderInfo">
          <span>服务费用:</span>
          <span>￥{{data.totalFee || ''}}</span>
        </div>
        <div class="orderInfo">
          <span>远距离交通费用:</span>
          <span>￥{{data.remoteTrafficFee || ''}}</span>
        </div>
        <div class="orderInfo">
          <span>订单支付金额:</span>
          <span class="colorOrange">￥{{data.totalPayAmt || ''}}</span>
        </div>
        <div class="orderNote">
          <p>订单备注:</p>
          <p>{{data.remark || ''}}</p>
        </div>
      </div>
      <div class="catheterPhotos">
        <div class="boxCatheter">
          <h2 class="h2_dd">患者信息</h2>
          <div class="orderInfo">
            <span>患者姓名:</span>
            <span>{{ data.userName || ''}}</span>
          </div>
          <div class="orderInfo">
            <span>患者年龄:</span>
            <span>{{data.age || ''}}</span>
          </div>
          <div class="orderInfo">
            <span>患者性别:</span>
            <span>{{data.sex == 1?'女':data.sex == 2?'男':''}}</span>
          </div>
          <div class="orderInfo">
            <span>联系电话:</span>
            <div class="oIIphone" @click="takePhone">
              <span class="colorBlue">{{data.linkTel}}</span>
              <div class="blue">
                <van-button>拨打电话</van-button>
              </div>
            </div>
          </div>
          <div class="orderInfo_address">
            <span class="fwAddress">服务地址:</span>
            <span class="fwAddress_a">{{data.address || ''}}</span>
          </div>
        </div>
        <!-- <h2 class="h2_dg">导管照片:</h2>
        <div class="photos">
          <div v-for="(item,index) of imgArr" :key="index">
            <img :src="item" alt />
          </div>
        </div>-->

        <div class="list">
          <p style="margin:10px 0px;">导管图</p>
          <div class="pic">
            <div :key="index" v-for="(item,index) of pictureList[0]">
              <div style="margin-right: 0.3rem;margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <p style="margin:10px 0px;">出院小结</p>
          <div class="pic">
            <div :key="index" v-for="(item,index) of pictureList[1]">
              <div style="margin-right: 0.3rem;margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <p style="margin:10px 0px;">维护手册</p>
          <div class="pic">
            <div :key="index" v-for="(item,index) of pictureList[2]">
              <div style="margin-right: 0.3rem;margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.welfareStatus !== 1 && data.welfareStatus !== 2" class="catheterPhotos">
        <div class="boxCatheter">
          <h2 class="h2_dd">诊前评估结果</h2>
          <div class="orderInfo">
            <span>有无置管侧肢体疼痛:</span>
            <span>{{ data.diagnoseEvaluateInfo && data.diagnoseEvaluateInfo.flagOne==''?'无': data.diagnoseEvaluateInfo.flagOne== 1?'无':'有' }}</span>
          </div>
          <div class="orderInfo">
            <span>有无肿胀:</span>
            <span>{{ data.diagnoseEvaluateInfo && data.diagnoseEvaluateInfo.flagTwo==''?'无':data.diagnoseEvaluateInfo.flagTwo== 1?'无':'有'}}</span>
          </div>
          <div class="orderInfo">
            <span>导管有无破损:</span>
            <span>{{ data.diagnoseEvaluateInfo && data.diagnoseEvaluateInfo.flagThree==""?'无': data.diagnoseEvaluateInfo.flagThree== 1?'无':'有'}}</span>
          </div>
          <div class="orderInfo">
            <span>导管有无脱出:</span>
            <span>{{ data.diagnoseEvaluateInfo && data.diagnoseEvaluateInfo.flagFour==""?'无': data.diagnoseEvaluateInfo.flagFour== 1?'无':'有'}}</span>
          </div>
          <div class="orderInfo_address">
            <span class="fwAddress">其他:</span>
            <span
              style="height:auto;"
              class="fwAddress_a"
            >{{ data.diagnoseEvaluateInfo && data.diagnoseEvaluateInfo.remark || ''}}</span>
          </div>
        </div>
      </div>
      <div class="btn">
        <!-- "welfareStatus": 2,//服务状态 1-待指派 2-待接单 3-待服务 4-服务中 5-待确认 6-已结束 7-已评价  11.已取消  注：已评价跟已结束都属于已完成订单 -->
        <!-- "orderStatus": "",//订单状态 1-待支付 2-支付中 3-已支付 4-超时失效 5-退款中 6-已退款 -->
        <div
          v-if="data.orderStatus==3 && data.welfareStatus == 2"
          class="submit"
          @click="startSubmit"
        >接单</div>
        <div v-if="data.welfareStatus==2" class="return" @click="ret">退回</div>

        <div
          v-if="(data.welfareStatus== 3 || data.welfareStatus== 4 || data.welfareStatus==5) && !flag "
          class="return"
          @click="selectDia"
          style="color: #949399;border: 2rpx solid #C5C4CC;"
        >诊前预评估(未完善)</div>
        <div
          v-if="(data.welfareStatus==4 || data.welfareStatus==5 )&& !flag1 "
          class="return"
          @click="selectMaintain"
          style="border: 2rpx solid #C5C4CC;color: #949399;"
        >维护评估记录(未完善)</div>

        <div
          v-if="(data.welfareStatus==3 || data.welfareStatus==4 || data.welfareStatus==5 ||data.welfareStatus==6 || data.welfareStatus==7) && flag"
          class="return"
          @click="selectDia"
        >诊前预评估</div>
        <div
          v-if="(data.welfareStatus==4 || data.welfareStatus==5 ||data.welfareStatus==6 || data.welfareStatus==7) && flag1"
          class="return"
          @click="selectMaintain"
        >维护评估记录</div>

        <div
          v-if="data.welfareStatus==7 || data.welfareStatus==5 ||data.welfareStatus==6 || data.welfareStatus==7"
          class="return"
          @click="selectServe"
        >查看服务耗材</div>
        <div v-if="data.welfareStatus==3" class="submit" @click="openServe">开始服务</div>

        <div
          v-if="data.welfareStatus==4"
          class="submit"
          @click="endServe"
          style="margin: 20rpx 55.00000000000001rpx;"
        >完成服务</div>
      </div>
    </div>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />

    <van-dialog
      use-slot
      title="一键报警"
      :show="showSlot"
      show-cancel-button
      cancelButtonText="关闭"
      @close="onClose"
      :showConfirmButton="false"
    >
      <div class="callPoliceImg" @click="submit">
        <img src="/static/images/login/callPolice.png" alt />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Http from "../../../utils/https";
import Dialog from "../../../../static/vant/dist/dialog/dialog";

import myMap from "../../../components/map";
import dayjs from "dayjs";
import getTime from "../../../utils/getTime";

let H = new Http();
export default {
  components: { frames, myMap },
  data() {
    return {
      showSlot: false,
      id: {}, // orderNo订单号  num  1 2 3  待服务 进行中 已完成
      data: {}, //商品信息
      show: false,
      obj: {
        text: "订单详情",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      flag: false,
      flag1: false,
      imgArr: [],
      time: {
        h: "",
        m: "",
        s: ""
      },
      pictureList: [],
      nurseData: null,
      header: null
    };
  },
  async onPullDownRefresh() {
    this.data.welfareStatus == 3 && (this.showSlot = true);
    setTimeout(_ => {
      wx.stopPullDownRefresh();
    }, 500);
  },
  computed: {
    // 订单状态
    indentState() {
      switch (this.data.welfareStatus) {
        case 1:
          return "待指派";
          break;
        case 2:
          return "待接单";
          break;
        case 3:
          return "待服务";
          break;
        case 4:
          return "服务中";
          break;
        case 5:
          return "待确认";
          break;
        case 6:
          return "已结束";
          break;
        case 7:
          return "已评价";
          break;
        case 11:
          return "已取消";
          break;
        default:
          break;
      }
    }
  },
  methods: {
    takePhone(){
      let str = this.nurseData.phone + "/" + this.data.linkTel + "/" + this.data.orderNo;
      H.getFictitiousPhone(this.header, "get", str, rst => {
         wx.makePhoneCall({
          phoneNumber: rst.data.data,
          fail(err) {
            console.log(err);
          }
        });
      })
    },
    // 诊前预评估
    selectDia() {
      if (this.flag && store.state.status == 0) {
        wx.navigateTo({
          url: "/pages/hushi/showDiagnosis/main?id=" + this.data.orderNo
        });
      } else {
        wx.navigateTo({
          url:
            "/pages/hushi/ClinicalEvaluationBefore/main?id=" +
            this.data.orderNo +
            "&userId=" +
            this.data.userId
        });
      }
    },
    // 查看服务耗材
    selectServe() {
      wx.navigateTo({
        url:
          "/pages/hushi/showOtherExpenses/main?orderNo=" +
          this.data.orderNo +
          "&userId=" +
          this.data.userId
      });
    },
    //维护评估记录
    selectMaintain() {
      if (this.flag1 && store.state.status == 0) {
        wx.navigateTo({
          url: "/pages/hushi/showWeiHu/main?id=" + this.data.orderNo
        });
      } else {
        wx.navigateTo({
          url:
            "/pages/hushi/MaintenanceEvaluation/main?id=" +
            this.data.orderNo +
            "&userId=" +
            this.data.userId
        });
      }
    },
    // 完成服务
    endServe() {
      Dialog.confirm({
        title: "提示",
        message: "确定完成服务"
      })
        .then(() => {
          if (!this.flag1) {
            this.$toast("请先填写维护评估记录");
          } else if (!this.flag) {
            this.$toast("请先填写诊前预评估");
          } else {
            wx.navigateTo({
              url:
                "/pages/hushi/otherExpenses/main?orderNo=" +
                this.data.orderNo +
                "&userId=" +
                this.data.userId
            });
          }
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    //开始服务
    openServe() {
      Dialog.confirm({
        title: "提示",
        message: "请确认您已到达服务地点"
      })
        .then(() => {
          this.startWelfareOrder();
        })
        .catch(() => {});
    },
    //开始服务
    startWelfareOrder() {
      let data = `${this.data.orderNo}/${this.data.userId}`;
      H.startWelfareOrder(this.header, "POST", data, res => {
        if (res.data.code == 0) {
          this.$toast("开始服务");
          this.getData();
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    // 拨号c
    makePhone() {
      H.getUserInfo(this.header, "get", "", res => {
        if (res.data.code == 0) {
          wx.makePhoneCall({
            phoneNumber: res.data.data.middleNumber,
            fail(err) {
              console.log(err);
            }
          });
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
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
    onClose() {
      this.showSlot = false;
    },
    //接单
    startSubmit() {
      let data = this.data.orderNo + "/" + this.nurseData.userId;
      //判断没有重复订单
      H.isReiveOrder(this.header, "POST", data, res => {
        if (res.data.code == 0) {
          wx.navigateTo({
            url:
              "/pages/hushi/evaluationSheet/main?id=" +
              this.data.orderNo +
              "&userId=" +
              this.data.userId +
              "&userLink=" +
              this.data.linkTel
          }); //跳转预前评估
        } else {
          Dialog.confirm({
            title: "提示",
            message: "你已经有相同日期的订单，确定继续接单吗？"
          })
            .then(() => {
              wx.navigateTo({
                url:
                  "/pages/hushi/evaluationSheet/main?id=" +
                  this.data.orderNo +
                  "&userId=" +
                  this.data.userId +
                  "&userLink=" +
                  this.data.linkTel
              }); //跳转预前评估
            })
            .catch(() => {});
        }
      });
    },
    // 退回订单
    ret() {
      wx.navigateTo({
        url: "/pages/hushi/orderReturn/main?id=" + this.data.orderNo
      });
    },
    getTime() {
      this.timer = setInterval(() => {
        setTimeout(() => {
          let temp = dayjs() - dayjs(this.data.realWelfareTime);
          this.time = getTime(temp);
        }, 500);
      }, 500);
    },
    //获得详情数据
    getData() {
      H.findWelfareOrderDetail(this.header, "POST", this.id, res => {
        if (res.data.code == 0) {
          this.data = res.data.data;
          let list = this.data.orderPictures;
          let temp = [[], [], []];
          list.forEach(el => {
            temp[el.pictureType - 1].push(el);
          });
          this.pictureList = temp;
          store.commit("changeImgList", temp);
          if (this.data.welfareStatus == 3 || this.data.welfareStatus == 4) {
            store.commit("isWelStatus", 1);
          } else {
            store.commit("isWelStatus", 0);
          }
          this.data.welfareTime = dayjs(this.data.welfareTime).format(
            "YYYY-MM-DD"
          );
          if (this.data.welfareStatus == 4) {
            this.getTime();
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
      this.getStatu();
    },
     showPopup(img) {
      wx.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img], // 需要预览的图片http链接列表
      });
    },
    //获得评估记录状态
    getStatu() {
      // selectAppraiseInfo  诊前预评估    getDefendEstimatInfo  维护评估纪律
      H.selectAppraiseInfo(this.header, "POST", this.id, res => {
        if (res.data.code == 0) {
          let data = res.data.data;
          if (Object.keys(data).length <= 0) {
            this.flag = false;
          } else {
            this.flag = true;
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
      H.getDefendEstimatInfo(this.header, "get", this.id, res => {
        if (res.data.code == 0) {
          let data = res.data.data;
          if (
            Object.keys(data.estimateInfo).length <= 0 &&
            data.infoList.length <= 0
          ) {
            //维护记录
            this.flag1 = false;
          } else {
            this.flag1 = true;
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    }
  },
  onLoad(options) {
    if (store.state.oldOrder !== options.id) {
      store.commit("changeOldOrder", "");
      store.commit("savePref", {});
      store.commit("saveOldata", "");
      store.commit("changeWeihuData", "");
      store.commit("hasSaveSelectType", []);
    }
    store.commit("saveOrderNo", options.id);
    this.id = options.id;
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
    this.nurseData = wx.getStorageSync("nurseData");
    this.header = {
      "content-type": "application/json",
      "API-User-Token": this.nurseData.token
    };
  },
  onShow() {
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
.section {
  width: 100%;
  overflow-y: auto;
  position: absolute;
  left: 0;
  bottom: 0px;
  overflow-x: hidden;
}
.section::-webkit-scrollbar {
  display: none;
}

.catheterPhotos {
  width: 100%;
  background-color: white;
  padding-bottom: 0.1rem;
  border-top: 0.1rem solid #f2f2f2;
}
.catheterPhotos .h2_dg {
  line-height: 1rem;
  padding-left: 0.1rem;
  font-size: 0.28rem;
}
.orderInfo_address {
  height: 75rpx;
}
.photos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 0.3rem;
}
.photos > div {
  margin-bottom: 0.15rem;
}
.photos > div,
.photos > div > img {
  width: 2.2rem;
  height: 2.2rem;
}
.blue >>> .van-button {
  color: #fff !important;
  font-size: 26rpx !important;
  padding: 0 20rpx !important;
  border-radius: 16rpx;
  height: 62rpx;
  line-height: 57rpx;
  background: linear-gradient(
    90deg,
    rgba(75, 164, 255, 1) 0%,
    rgba(86, 181, 254, 1) 100%
  ) !important;
}
.pic {
  position: relative;
  display: flex;
  flex-direction: row;
  padding-bottom: 0.1rem;
}

.pic > div {
  position: relative;
  width: 2.1rem;
  height: 2.1rem;
  margin-left: 0.3rem;
}
.list {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-top: 0.1rem solid #f2f2f2;
}

.list span {
  color: #ccc;
}

.pic img {
  width: 2.1rem;
  height: 2.1rem;
}

.pic > div:nth-child(1) {
  margin-left: 0;
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
.orderInfo {
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
}
.btn {
  background-color: white;
  border-top: 0.1rem solid #f2f2f2;
}
.h2_dd {
  padding-top: 0.3rem;
  font-size: 0.31rem;
  color: #333333;
}
.boxCatheter {
  padding: 0 0.3rem;
}
.oIIphone {
  min-width: 200rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.oIIphone > img {
  width: 0.34rem;
  height: 0.34rem;
  margin-left: 0.15rem;
  vertical-align: middle;
}
.colorBlue {
  color: #3ca1ff;
}
.orderInfo_address {
  display: flex;
  margin-top: 0.15rem;
  font-size: 0.26rem;
  padding: 10rpx 0px;
}
.fwAddress {
  flex: 1;
}
.fwAddress_a {
  flex: 4;
  text-align: right;
  height: 0.6rem;
}
.callPoliceImg {
  width: 3.28rem;
  height: 3.28rem;
  margin: 60rpx auto 46rpx;
}
.callPoliceImg > img {
  width: 3.28rem;
  height: 3.28rem;
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
  color: #50abff;
  border: 1px solid #50abff;
  font-size: 32rpx;
}
.center {
  margin-left: 29rpx;
  width: calc(100% - 29rpx);
  height: 1.3rem;
}
.wait-b {
  background-image: url("http://youjiao.douziit.com/imgs/images/login/listItemBg.png");
  background-size: 100% 1.3rem;
  background-repeat: no-repeat;
}
.img-b {
  width: 56rpx;
  height: 56rpx;
}
</style>
