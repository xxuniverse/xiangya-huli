<template>
  <div class="containerLogin">
    <frames :obj="obj" @close="goback"></frames>
    <div class="section">
      <textarea
        v-model="returnList"
        name
        id
        fixed="true"
        style="margin-top:2px;"
        placeholder="请填写退单原因"
        @change="hasChange"
      ></textarea>
      <div class="btn" @click="btn">提交</div>
    </div>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import frames from "../../../components/frames";
import Http from "../../../utils/https";
import Dialog from "../../../../static/vant/dist/dialog/dialog";

let H = new Http();
export default {
  components: { frames },
  data() {
    return {
      orderNo: 0, // 订单号
      returnList: "", // 订单内容
      obj: {
        text: "订单退回",
        state: true
      }
    };
  },
  methods: {
    // 退回订单
    btn() {
      Dialog.confirm({
        title: "提示",
        message: "确认退回该订单"
      })
        .then(() => {
          if (!this.returnList) {
            this.$toast("退单原因不能为空");
          } else {
            let nurseData = wx.getStorageSync("nurseData");
            let header = {
              "content-type": "application/json",
              "API-User-Token": nurseData.token
            };
            let data = {
              orderNo: this.orderNo, //订单编号
              staffName: nurseData.userName, //护理员名称
              reason: this.returnList //退单原因
            };
            H.returnWelfareOrder(header, "POST", data, res => {
              if (res.data.code == 0) {
                this.returnList = "";
                wx.redirectTo({ url: "/pages/hushi/sendBackOrder/main" });
              } else {
                this.$toast(`${res.data.message}`);
              }
            });
          }
          // on confirm
        })
        .catch(() => {});
    },
    hasChange(e) {
      this.returnList = e.mp.detail.value;
    },
    goback() {
      this.returnList = "";
    }
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data.call(this));

    this.orderNo = options.id;
  }
};
</script>

<style scoped>
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
}

.section {
  width: 100%;
  height: calc(100% - 16px - 50px);
  position: absolute;
  top: calc(16px + 50px);
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.btn {
  margin-top: 0.4rem;
  text-align: center;
  line-height: 0.9rem;
  color: white;
  width: 6.4rem;
  height: 0.9rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  border-radius: 0.45rem;
}
</style>
