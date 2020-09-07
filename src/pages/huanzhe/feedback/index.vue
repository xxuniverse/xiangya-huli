<template>
  <div class="containerLogin">
    <frames :obj="obj" @close="handleCloseClick"></frames>
    <div class="section" :style="{height: dataHeigth-tabbarHeight+'px',top:headHeigth+'px'}">
      <div class="banner">
        <textarea
          v-model="feedback"
          @input="textLength"
          @blur="hasChange($event,'feedback')"
          placeholder="请输入内容"
          class="feedback"
          maxlength="128"
          name
          id
        ></textarea>
        <div class="text">{{num}}/128</div>
        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
    <van-toast id="van-toast" />
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
      patientData: null, //用户信息
      feedback: "", //评价
      headHeigth: 0,
      screenHeight: 0,
      tabbarHeight: 0,
      dataHeigth: 0,
      obj: {
        text: "意见反馈",
        state: true
      },
      num: 0
    };
  },
  methods: {
    formatDateToString(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    handleCloseClick() {
      this.feedback = "";
      this.num = 0;
    },
    hasChange(e, name) {
      this[name] = e.mp.detail.value;
      //   this.num = this.feedback.length;
    },
    textLength() {
      this.num = this.feedback.length;
    },
    //提交反馈信息
    submit() {
      if (this.feedback.length === 0) {
        Dialog.alert({
          title: "提示",
          message: "请填写意见反馈"
        }).then(() => {
          // on close
          return;
        });
      } else {
        let header = {
          "content-type": "application/json",
          "API-User-Token": this.patientData.token
        };
        H.feedback(
          header,
          "POST",
          {
            phone: "18773195868",
            extremity: "患者端",
            feedbackTime: this.formatDateToString(new Date()),
            feedbackUser: this.patientData.userNickname,
            content: this.feedback
          },
          res => {
            if (res.data.code == 0) {
              this.feedback = "";
              this.num = 0;
              let data = {
                text: "反馈成功",
                p: "提交成功"
              };
              // wx.redirectTo({
              //     url: "/pages/huanzhe/paymentSuccess/main?data=" + JSON.stringify(data)
              // });
              wx.redirectTo({
                url:
                  "/pages/huanzhe/endOrder/main?obj=" +
                  JSON.stringify({
                    btn: "",
                    success: "反馈成功",
                    click: "",
                    orderNo: "意见反馈",
                    welfareId: ""
                  })
              });
            } else {
              this.$toast(`${res.data.message}`);
            }
          }
        );
      }
    }
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data());
    this.patientData = wx.getStorageSync("patientData");
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
  position: relative;
  width: 100%;
  height: 4.2rem;
  margin-top: 0.3rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #dddddd;
}

.feedback {
  width: 100%;
  height: 4.2rem;
}

.text {
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  color: #b9b9b9;
}

.submit {
  margin: 2rem auto;
  width: 4.8rem;
  height: 0.9rem;
  border: 0.02rem solid rgba(60, 161, 255, 1);
  border-radius: 0.45rem;
  text-align: center;
  line-height: 0.9rem;
  font-size: 0.3rem;
  color: #3ca1ff;
}
</style>
