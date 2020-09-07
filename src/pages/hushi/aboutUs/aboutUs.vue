<template>
  <div class="containerLogin">
    <frames :obj="obj"  @close='close'></frames>
    <div class="section" :style="{top:height+'px'}">
        <!-- <div class='wrap flex-c'> 
          <img src="/static/images/login/addition.png" style="width:90%;height:250rpx;">
        </div> -->
        <div class="textBox flex-c">
          <p style="width:90%;" v-text="data.content"></p>
        </div>
    </div>
    <van-toast id="van-toast" />
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
        text: "关于我们",
        state: true
      },
      height:'',
      data:{}
    }
  },
  onShow(){
    this.height = store.state.statusBarHeight;
    this.getData()
  },
  methods:{
    getData(){
       let nurseData = wx.getStorageSync("nurseData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": nurseData.token
      };
      H.getAbouts(header,'get','',res=>{
        if(res.data.code == 0){
            this.data = res.data.data
        }else{
            this.$toast(`${res.data.message}`)
        }
      })
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
  width: 100%;
}
.textBox{
  margin-top: 50rpx;
  width: 100%;
}
</style>