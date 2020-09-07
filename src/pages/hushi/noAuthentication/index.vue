<template>
  <div class="containerLogin">
    <frames :obj="obj"  @close='close'></frames>
    <div class="section" :style="{top:height+'px'}">
        <div class="wrap flex-c">
            <img src="../../../../static/images/login/rz.png" style="width:148rpx;height:149rpx;">
        </div>
        <div class="flex-c box">
          <span>待审核</span>
        </div>
        <div class="flex-c box" style="margin-top:37rpx;color:#999999;font-size:28rpx;">
          <span>工作人员将在24小时内进行审核</span>
        </div>
        <div class="button  flex-c"> 
            <van-button type="default"  round  @click="goback">返回</van-button>
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
        text: "认证待审核",
        state: true
      },
      height:'',
    }
  },
  onShow(){
    this.height = store.state.statusBarHeight;
  },
  methods:{
    goback(){
      wx.navigateBack({
        delta: 1
      });
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