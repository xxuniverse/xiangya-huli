<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height: dataHeigth-tabbarHeight+'px',top:headHeigth+'px'}">
      <!-- <div class="banner">
        <img src="/static/images/login/jdImg.png" alt />
      </div>-->
      <p>{{aboutMe.content}}</p>
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
      aboutMe: {}, //关于我们
      headHeigth: 0,
      screenHeight: 0,
      tabbarHeight: 0,
      dataHeigth: 0,
      obj: {
        text: "关于我们",
        state: true
      }
    };
  },
  onLoad(options) {
    let patientData = wx.getStorageSync("patientData");
    let header = {
      "content-type": "application/json",
      "API-User-Token": patientData.token
    };
    H.findAboutus(header, "GET", {}, res => {
      let {
        data: { data }
      } = res;
      this.aboutMe = data;
    });
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
  left: 0;
}
.banner {
  width: 100%;
  height: 3rem;
  margin-top: 0.3rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.banner > img {
  width: 6.9rem;
  height: 3rem;
}
p {
  margin-top: 0.5rem;
  padding: 0 0.3rem;
  font-size: 0.34rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.51rem;
  text-indent: 2em;
}
</style>
