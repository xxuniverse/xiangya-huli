<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section">
      <div class="identityCard">
        <div class="negativeCard">
          <icon type="success" size="70" />
          <p>{{p}}</p>
        </div>
        <div class="return" @click="ret">返回</div>
      </div>
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
      p: "",
      obj: {
        text: "待审核",
        state: false
      }
    };
  },
  methods: {
    ret() {
      wx.redirectTo({ url: "/pages/huanzhe/oderForm/main" });
    }
  },
  onLoad(options) {
    let data = JSON.parse(options.data);
    if (data.text === "订单取消" || data.text === "删除订单") {
      this.p = data.p;
    } else {
      this.p = "支付成功，即将跳转...";
    }

    this.obj.text = data.text;
    getCurrentPages().length == 0;
    if (this.obj.text == "支付成功") {
      setTimeout(() => {
        wx.redirectTo({ url: "/pages/huanzhe/oderForm/main" });
      }, 3000);
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
  height: 3.47rem;
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
</style>
