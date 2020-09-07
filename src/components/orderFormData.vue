<template>
  <div class="scroll">
    <div class="seaction_data" v-for="(item,index) of orderFormData.list" :key="index">
      <div class="seacTop">
        <div>订单号:{{item.orderNo}}</div>
        <div :style="{color:orderFormData.fontColor?orderFormData.fontColor:''}">
          {{
          item.welfareStatus == 1?'待指派'
          :item.welfareStatus == 2?'待接单'
          :item.welfareStatus == 3?'待服务'
          :item.welfareStatus == 4?'服务中'
          :item.welfareStatus == 5?'待确认'
          :item.welfareStatus == 6?'已结束'
          :item.welfareStatus == 7?'已评价':'已取消'
          }}
        </div>
      </div>
      <div class="seacContainer" @click.stop="listNo(item)">
        <div>
          <img :src="item.welfarePicture" alt />
        </div>
        <div>
          <h2>{{item.welfareName}}</h2>
          <span>服务时间：{{item.welfareTimeDate.length === 0 ? item.bespeakTime : item.welfareTimeDate}}</span>
          <p>服务地址：{{item.address}}</p>
        </div>
      </div>
      <div class="seacDateTime">
        <div>下单日期:{{item.addTime}}</div>
        <div>
          实付金额:
          <span>￥{{item.totalPayAmt}}</span>
        </div>
      </div>
      <van-dialog id="van-dialog" />
      <div
        class="btn"
        v-if="item.welfareStatus == 5 || item.welfareStatus == 1 || item.welfareStatus == 2"
        @click="handleCelarOrEndOrderClick(item.welfareStatus)"
      >
        <div
          :class="item.welfareStatus == 5 ? 'btn_2' : 'btn_1'"
          @click.stop="item.welfareStatus == 5 ? listNo_(item) : handleCelarOrEndOrderClick(item)"
        >
          {{
          item.welfareStatus == 5 ? '确认完成' : '取消订单'
          }}
        </div>
      </div>
      <div class="btn" v-if="item.welfareStatus == 6">
        <div class="btn_2" @click="handleEvaluateClick(item)">去评价</div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../utils/store";
import Dialog from "../../static/vant/dist/dialog/dialog";
import Http from "../utils/https";

let H = new Http();
export default {
  props: ["orderFormData"],
  data() {
    return {
      stateName: "",
      onData: {},
      list: store.state.orderList
    };
  },
  methods: {
    formatDate(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = minute < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d;
    },
    orderStatus(status) {
      const state = {
        1: "待指派",
        2: "待接单",
        3: "待服务",
        4: "服务中",
        5: "待确认",
        6: "已结束",
        7: "已评价",
        11: "已取消"
      };
      this.stateName = state[status];
    },
    handleCelarOrEndOrderClick(val) {
      if (val === 5) {
        //确认订单
        //跳转到订单详情页面
        // wx.navigateTo({url: '/pages/huanzhe/patientLineItem/main'});
      } else {
        //取消订单
        this.cancellation(val.welfareStatus, val.orderNo);
      }
    },
    handleEvaluateClick(item) {
      //将护士姓名保存到本地存储
      wx.setStorage({
        key: "name",
        data: item.staffName
      });
      wx.navigateTo({
        url:
          "/pages/huanzhe/evaluation/main?id=" +
          item.orderNo +
          "&wid=" +
          item.welfareId
      });
    },
    // 取消订单
    cancellation(status, orderNo) {
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      if (status == "6") {
      } else if (status == "11") {
      } else {
        Dialog.confirm({
          title: "提示",
          message: "你确定要取消订单吗？"
        })
          .then(() => {
            H.cancelOrder(header, "POST", orderNo, rst => {
              let {
                data: { message }
              } = rst;
              if (message == "取消订单异常，请联系系统管理员!") {
                Dialog.alert({
                  title: "提示",
                  message: message
                });
              } else {
                let data = {
                  text: "订单取消",
                  p: "订单取消成功，系统将24小时内退款到你账户中"
                };
                wx.redirectTo({
                  url:
                    "/pages/huanzhe/paymentSuccess/main?data=" +
                    JSON.stringify(data)
                });
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 跳转到详情页
    listNo(item) {
      wx.setStorageSync("name", item.staffName);
      let list = JSON.stringify(item);

      // if (item.welfareStatus == "6") {
      //   //已结束
      // } else if (item.welfareStatus == "11") {
      //   //已取消
      // } else {
      wx.navigateTo({ url: "/pages/huanzhe/patientLineItem/main?id=" + list });
      // }
    },
    listNo_(item) {
      let list = JSON.stringify(item);

      // if (item.welfareStatus == "6") {
      //   //已结束
      // } else if (item.welfareStatus == "11") {
      //   //已取消
      // } else {
      wx.navigateTo({ url: "/pages/huanzhe/patientLineItem/main?id=" + list });
      // }
    }
  }
};
</script>
<style scoped>
.none {
  display: none;
}

.seaction_data {
  border-bottom: 0.1rem solid #f2f2f2;
}

.seacTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.72rem;
  width: 100%;
  padding: 0 0.29rem;
  line-height: 0.72rem;
  box-sizing: border-box;
  font-size: 0.26rem;
}

.seacTop > div:nth-child(2) {
  font-size: 0.3rem;
  color: #3ca1ff;
}

.seacContainer {
  display: flex;
  flex-direction: row;
  padding-left: 0.3rem;
}

.seacContainer > div:nth-child(1),
.seacContainer > div:nth-child(1) img {
  width: 2.4rem;
  height: 1.8rem;
}

.seacContainer > div:nth-child(2) {
  margin-left: 0.3rem;
  width: 4.38rem;
}

.seacContainer > div:nth-child(2) h2 {
  /*margin-top: -0.2rem;*/
  font-size: 0.3rem;
}

.seacContainer > div:nth-child(2) span,
.seacContainer > div:nth-child(2) p {
  display: inline-block;
  /*margin-top: -0.35rem;*/
  font-size: 0.26rem;
  color: #999999;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
}

.seacContainer > div:nth-child(2) p {
  display: block;
  /*margin-top: -0.4rem;*/
}

.seacDateTime {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.72rem;
  width: 100%;
  padding: 0 0.3rem;
  line-height: 0.72rem;
  box-sizing: border-box;
  font-size: 0.26rem;
  color: #333333;
}

.seacDateTime > div:nth-child(2) span {
  color: #f3996b;
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  /* height: 1.12rem; */
  line-height: 0.72rem;
  text-align: center;
  padding: 0.2rem 0;
}

.btn > div {
  box-sizing: border-box;
  height: 0.72rem;
  /* margin: .2rem 0; */
  width: 2rem;
  border-radius: 0.36rem;
}

.btn_1 {
  border: 0.02rem solid #c5c4cc;
  color: #c5c4cc;
  margin-right: 0.2rem;
}

.btn_2 {
  margin-right: 0.3rem;
  color: white;
  background: linear-gradient(
    90deg,
    rgba(75, 164, 255, 1) 0%,
    rgba(86, 181, 254, 1) 100%
  );
}

.scroll {
  padding-bottom: 2rem;
}
</style>
