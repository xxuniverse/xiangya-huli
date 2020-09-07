<template>
  <div class="containerLogin">
    <frames :obj="obj" @close="close"></frames>
    <div class="section" :style="{top:height+'px'}">
      <div class="wrap">
        <textarea
          v-model="message"
          @input="textLength"
          @blur="hasChange($event,'message')"
          placeholder="填写你的意见"
          class="feedback"
          maxlength="128"
          name
          id
        ></textarea>
        <div class="text">{{num}}/128</div>
      </div>
      <div class="flex-c" style="width:100%">
        <div class="btn" @click="submit">提交</div>
      </div>
      <van-toast id="van-toast" />
    </div>
  </div>
</template>
<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Http from "../../../utils/https";
import dayjs from "dayjs";
let H = new Http();

export default {
  components: { frames },
  data() {
    return {
      obj: {
        text: "意见反馈",
        state: true
      },
      height: "",
      message: "",
      date: "",
      num: ""
    };
  },
  onShow() {
    this.height = store.state.statusBarHeight;
    this.date = new Date();
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data.call(this));
  },
  methods: {
    hasChange(e, name) {
      this[name] = e.mp.detail.value;
    },
    textLength() {
      this.num = this.message.length;
    },
    clear() {
      if (this.message == "请输入内容") this.message = "";
    },
    submit() {
      if (!this.message || this.message == "请输入内容") {
        this.$toast("反馈意见不能为空");
      } else {
        let nurseData = wx.getStorageSync("nurseData");
        let header = {
          "content-type": "application/json",
          "API-User-Token": nurseData.token
        };
        let time = dayjs(this.date).format("YYYY-MM-DD HH:mm:ss");

        let data = {
          phone: nurseData.phone, //手机号码 --必填
          extremity: "护士端", //反馈端 --必填
          feedbackTime: time, //反馈时间 --必填
          feedbackUser: nurseData.userName, //反馈人 --必填
          content: this.message
        };
        H.feeback(header, "POST", data, res => {
          if (res.data.code == 0) {
            // this.$toast(`提交成功`)
            wx.redirectTo({
              url: "/pages/hushi/feedbackSuccess/main"
            });
          } else {
            this.$toast(`${res.data.message}`);
          }
        });
      }
    },
    close() {
      this.message = "";
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
.section {
  position: absolute;
  right: 0px;
  left: 0px;
  width: 100%;
  bottom: 0px;
}
.wrap {
  width: 100%;
}
.wrap >>> .van-cell {
  height: 300rpx;
}
.wrap-btn {
  margin-top: 100rpx;
}
.wrap-btn >>> .van-button--normal {
  padding: 0 100px;
}
.feedback {
  width: 100%;
  height: 4.2rem;
  border-bottom: 1px solid #999;
  text-indent: 23rpx;
}
.text {
  position: absolute;
  right: 4rpx;
  color: #b9b9b9;
}
.btn {
  margin-top: 0.4rem;
  text-align: center;
  line-height: 0.9rem;
  color: white;
  width: 6.4rem;
  height: 0.9rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  border-radius: 0.45rem;
}
</style>