<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section">
      <div class="identityCard">
        <div class="negativeCard">
          <!-- <icon type="success" size="70" /> -->
          <img src="/static/images/login/getOrder.png" style="width:126rpx;height:142rpx;">
          <p style="font-size:32rpx;color:rgba(51,51,51,1);">接单成功！</p>
        </div>
        <div class="return  start" style="border: 0px;" @click="openServer"  >开始服务</div>
        <div class="return" @click="ret">返回首页</div>
      </div>
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
      p: "",
      obj: {
        text: "接单成功",
        state: false
      }
    };
  },
  methods: {
    ret() {
      wx.redirectTo({ url: "/pages/hushi/oderForm/main" });
    },
    openServer(){
        wx.redirectTo({ url: '/pages/hushi/lineItem/main?id='+this.orderNo });
    },
  },
  onLoad(options){
      this.orderNo = options.orderNo
      this.userId = options.userId
  }
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
  margin-top: 0.37rem;
  font-size: 0.27rem;
  color: #999999;
}
.identityCard span {
  font-size: 0.3rem;
}
.identityCard img {
  width: 1.49rem;
  height: 1.49rem;
}
.negativeCard {
  height: 251rpx;
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
  margin: 0.42rem auto 0;
  height: 0.9rem;
  border-radius: 0.45rem;
  line-height: 0.9rem;
  color: #999999;
}
.return {
  border: 1px solid #ccc;
}
.start{
  background-color: #3CA1FF;
  color: #fff;
}
</style>