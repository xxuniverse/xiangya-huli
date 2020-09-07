<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section">
      <div class="identityCard">
        <div class="negativeCard">
          <!-- <icon type="success" size="70" /> -->
          <img :src=" img + '/imgs/images/login/orderSuccess.png' " style="width:126rpx;height:126rpx;">
          <p style="font-size:32rpx;color:rgba(51,51,51,1);">{{list.success}}</p>
        </div>
        <div v-if="list.btn.length !== 0"  class="return  start" @click="handleCommClick"  >{{list.btn}}</div>
        <div class="return" @click="ret">返回</div>
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
      list: {},
      p: "",
      img: '',
      obj: {
        text: '',
        state: false
      }
    };
  },
  methods: {
    ret() {
      console.log( this.list )
      if( this.list.success === '反馈成功' ){
        wx.redirectTo({ url: "/pages/huanzhe/mine/main" })
      }else{
        wx.redirectTo({ url: "/pages/huanzhe/oderForm/main" });
      }
    },
    handleCommClick(){
      this[this.list.click]();
    },
    openServer(){
        wx.redirectTo({url: '/pages/huanzhe/evaluation/main?id='+this.list.orderNo+'&wid='+this.list.welfareId})
    },
  },
  onLoad(options){
    this.img = this.$img;
    console.log( '查看传输信息 => ' )
    this.list = JSON.parse(options.obj)
    if(this.list.btn.length === 0){
      if( this.list.success === '反馈成功' ){
        this.obj.text = '提交成功'
      }else{
        this.obj.text = '评价成功'
      }
    }else{
      this.obj.text = '服务已完成'
    }
    console.log( this.list );
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
