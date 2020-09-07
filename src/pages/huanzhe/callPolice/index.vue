<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <div class="callPoliceImg">
        <img src="/static/images/login/callPolice.png" alt />
      </div>
      <span class="clickSpan">点击上方按钮，迅速报警</span>
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
      show: false,
      obj: {
        text: "报警",
        state: false
      },
      dataHeigth: 0,
      headHeigth: 0
    };
  },
  methods: {
    // submit() {
    //   wx.showModal({
    //     title: "提示",
    //     content: "这是一个模态弹窗",
    //     success(res) {
    //       if (res.confirm) {
    //         console.log("用户点击确定");
    //       } else if (res.cancel) {
    //         console.log("用户点击取消");
    //       }
    //     }
    //   });
    // }
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
  }
};
</script>

<style scoped>
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.section {
  position: absolute;
  overflow-y: scroll;
  width: 100%;
    text-align: center;
}
.section::-webkit-scrollbar {
  display: none;
}
.callPoliceImg {
  width: 3.28rem;
  height: 3.28rem;
  margin: 1.1rem auto 0.46rem;
}
.callPoliceImg > img {
  width: 3.28rem;
  height: 3.28rem;
}
.clickSpan{
  font-size: .26rem;
  color: #626266;
}
</style>
