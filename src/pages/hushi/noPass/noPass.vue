<template>
  <div class="containerLogin">
    <frames :obj="obj"  @close='close'></frames>
    <div class="section" :style="{top:height+'px'}">
        <div class="wrap flex-c">
            <img src="../../../../static/images/login/noPass.png" style="width:148rpx;height:149rpx;">
        </div>
        <div class="flex-c box">
          <span>未通过</span>
        </div>
        <div class="flex-c box" style="margin-top:37rpx;color:#999999;font-size:28rpx;">
          <span>原因:{{reason}}</span>
        </div>
        <div class="button  flex-c"> 
            <van-button type="warning"  round  @click="newCheck">重新认证</van-button>
        </div>
    </div>
  </div>
</template>
<script>
import frames from "../../../components/frames";
import store from '../../../utils/store';
import Http from '../../../utils/https'
let H = new Http()

export default {
  components: { frames },
  data(){
    return {
      obj: {
        text: "实名认证",
        state: true
      },
      height:'',
      reason:""
    }
  },
  onShow(){
    this.height = store.state.statusBarHeight;
    this.reason = wx.getStorageSync("nurseData").reason;
  },
  methods:{
    newCheck(){
        wx.redirectTo({ url: "/pages/hushi/preliminary/main" });
    }
  }
};
</script>
<style scoped>
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
}
.section{
    position: absolute;
    right: 0px;
    left: 0px;
    width: 100%;
}
.wrap{
  margin-top: 115rpx;
  width: 100%;
}
.box{
  width: 100%;
  margin-top: 24rpx;
   font-size: 32rpx;
  color: #333;
}
.button{
  margin-top: 42rpx;
}
.button >>> .van-button--normal{
  padding: 0 60px;
}
</style>