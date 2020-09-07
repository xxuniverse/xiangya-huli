<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section">
      <div class="identityCard">
        <div class="negativeCard">
          <img src="/static/images/login/rz.png" alt />
          <span>待审核</span>
          <p>工作人员将在24小时内进行审核</p>
        </div>
        <div class="return" @click="handleReturnClick">返回</div>
      </div>
    </div>
  </div>
</template>
<script>
import frames from "../../../components/frames";
import Http from "../../../utils/https";
let H = new Http();
export default {
  components: { frames },
  data() {
    return {
      obj: {
        text: "待审核",
        state: true
      }
    };
  },
  onLoad(options) {
    //进入页面重新获取用户信息 覆盖之前的数据
    let patientData = wx.getStorageSync("patientData");
    let token = patientData.token;
    let header = {
      "content-type": "application/json",
      "API-User-Token": token
    };
    H.getUserInfo(header, "get", "", res => {
      if (res.data.code == 0) {
        let {
          data: { data }
        } = res;
        data.token = token;
        wx.setStorageSync("patientData", data);
      }
    });
  },
  methods: {
    handleReturnClick() {
      wx.redirectTo({ url: "/pages/huanzhe/mine/main" });
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
