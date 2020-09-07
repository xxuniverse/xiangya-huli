<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section">
      <div class="identityCard">
        <div class="negativeCard">
            <img src="/static/images/login/orderSuccess.png" style="width:148rpx;height:148rpx;">
          <p style="font-size:32rpx;color:rgba(51,51,51,1);">订单已完成</p>
          <p style="font-size:r28px;font-weight:400;color:rgba(153,153,153,1);">等待患者确认</p>
        </div>
        <div style="width:100%;" class="flex-c btn-c" >
            <van-button  round  @click="toInfo">
            <div class="return flex-c" style="margin:0px;border:0px;" >
                <span>返回首页</span>
                </div>
        </van-button>
        </div>
      </div>
    </div>
      <van-dialog id="van-dialog" />

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
      p: "",
      obj: {
        text: "完成订单",
        state: false
      }
    };
  },
  methods: {
     toInfo(){
      wx.reLaunch({ url: '/pages/hushi/oderForm/main' });
    }
  },
  onLoad(options){
      this.orderNo = options.orderNo
      this.userId = options.userId
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
  margin-bottom: 0.29rem;
}
.negativeCard {
  height: 324rpx;
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
.btn-c >>> .van-button--normal{
    border:2rpx solid #C5C4CC!important; 
    font-size: 30rpx!important;
    color:#949399!important;
    height: auto;
}
</style>