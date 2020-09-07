<template>
  <div class="containerLogin" :style="{height:screenHeight-tabbarHeight+'px'}">
    <frames :obj="obj"></frames>
    <div class="container">

    </div>
    
    <div class="message">
        <div class="message-wrap">
            <input type="text" placeholder="请输入文字信息">
            <button class="end">发送</button>
            <img src="../../../../static/images/login/add_set.png" alt="">
        </div>
        <div class="fun"></div>
    </div>
    
  </div>
</template>

<script>

import store from "../../../utils/store";
import frames from "../../../components/frames";
import orderFormData from "../../../components/orderFormData";
import appoint from "../../../components/appoint";
import Http from "../../../utils/https";


let H = new Http();

export default {
  components: { frames, orderFormData, appoint },
  data() {
    return {
      obj: {
        text: "会话",
        state: true
      },
      bannerList: [],
      page: {},
      // arr:[1,2,3,4],
      headHeigth: 0,
      screenHeight: 0,
      dataHeigth: 0,
      tabbarHeight: 0,
      styleStore: false,
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500
    };
  },
  methods: {
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.screenHeight = store.state.screenHeight;
    this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = this.screenHeight - this.headHeigth;
  }
};
</script>

<style scoped>
    .containerLogin{
        
    }
    .container{
        height: 10.96rem;
        background-color: #ECECEC;
    }
    .message{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1.1rem;
        background-color: #ffffff;
    }
    .message input{
        width: 4.46rem;
        height: 0.72rem;
        margin-left: 0.3rem;
        padding: 0 0.2rem;
        border-radius: 0.36rem;
        background-color: #ECECEC;
        box-sizing: border-box;
        color: #BBBBBB;
        font-size: 0.3rem;
    }
    .message .end{
        width: 1.3rem;
        height: 0.72rem;
        margin: 0 0 0 0.3rem;
        line-height: 0.72rem;
        text-align: center;
        background:linear-gradient(90deg,rgba(60,161,255,1),rgba(86,181,254,1));
        border-radius: 0.36rem; 
        color: #ffffff;
    }
    .message img{
        width: 0.54rem;
        height: 0.54rem;
        margin-left: 0.3rem;
        font-size: 0.3rem;
    }
    .message-wrap{
        display: flex;
        align-items: center;
        height: 100%;
    }
    .fun{
        height: 0.5rem;
        background-color: red;
    }
</style>
