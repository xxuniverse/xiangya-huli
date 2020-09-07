<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section">
      <div class="identityCard">
        <div class="negativeCard">
          <!-- <icon type="success" size="70" /> -->
          <img src="/static/images/login/orderLose.png" style="width:148rpx;height:149rpx;">
          <p style="color:rgba(51,51,51,1);font-size:32rpx;margin:0px;">订单已退回</p>
          <!-- <p style="color:#999999;font-size:28rpx;margin-top:37rpx;">系统将在24小时内自动退款到患者账户。</p> -->
        </div>
        <div class="return" @click="ret">返回</div>
      </div>
    </div>
  </div>
</template>
<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
export default {
  components: { frames },
  data() {
    return {
      p: "",
      obj: {
        text: "订单退回",
        state: false
      }
    };
  },
  methods: {
    ret() {
      wx.navigateTo({ url: "/pages/hushi/oderForm/main" });
    },
  },
};
</script>
<style scoped>
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
}

.wXlogin {
  margin-left: -23.5px;
  vertical-align: top;
  text-align: center;
  flex: 1;
  justify-items: center;
}
.section {
  width: 100%;
  position: absolute;
  top: calc(16px + 80px);
  left: 0;
}

.identityCard p {
  margin-top: 0.42rem;
  font-size: 0.27rem;
  color: #999999;
}
.identityCard span {
  font-size: 0.3rem;
}
.identityCard img {
  width: 1.49rem;
  height: 1.49rem;
  margin-bottom: 0.29rem;
}
.negativeCard {
  height: 3.47rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.3rem 0.95rem;
  text-align: center;
  font-size: 0.27rem;
}
.negativeCard {
  margin-bottom: 0.3rem;
}
.return {
  text-align: center;
  width: 3rem;
  margin: 0.13rem auto 0;
  height: 0.9rem;
  border-radius: 0.45rem;
  line-height: 0.9rem;
  color: #999999;
}
.return {
  border: 1px solid #ccc;
}
</style>