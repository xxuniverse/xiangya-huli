<template>
  <div class="containerLogin">
    <frames :obj="obj" @close="close"></frames>
    <div class="section">
      <div class="identityCard">
        <div class="negativeCard">
          <img src="/static/images/login/norz.png" alt />
          <span>未通过</span>
          <p>原因：{{ text }}</p>
        </div>
        <div class="return" @click="commit">重新提交</div>
      </div>
    </div>
  </div>
</template>
<script>
import frames from "../../../components/frames";

export default {
  components: { frames },
  data() {
    return {
      text: "",
      obj: {
        text: "认证失败",
        state: true
      }
    };
  },
  onLoad(val) {
    this.text = val.reason;
  },
  methods: {
    commit() {
      wx.redirectTo({ url: "/pages/huanzhe/patientsCertification/main" });
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
.header {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 5%;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  /* border-bottom: 1px solid #ccc; */
  background: #f8f8f8;
}
.returnIdex {
  width: 23.5px;
}
.returnIdex img {
  margin-left: 15px;
  width: 8.5px;
  height: 16px;
  /* vertical-align:top; */
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