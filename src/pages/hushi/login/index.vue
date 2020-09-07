<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section">
      <div class="section_top">
        <img src="https://youjiao.douziit.com/imgs/imgs/logo-new.png" />
      </div>
      <p class="p1">湘雅互联网+护理平台</p>
      <div class="section_center">
        <div>
          <img src="/static/images/login/z1.png" alt />
          <input v-model.trim="userName" type="text" placeholder="请输入用户名" @change="todo" required />
        </div>
        <div>
          <img src="/static/images/login/z2.png" alt />
          <input
            v-model.trim="passWord"
            type="password"
            placeholder="请输入密码"
            @change="todo1"
            required
          />
        </div>
      </div>
      <div class="section_btn" @click="login">
        <img src="/static/images/login/buttonkb.png" alt />
      </div>
      <van-toast id="van-toast" />
      <!-- <p class="p2" @click="wjBtn">忘记密码</p> -->
    </div>
    <!-- 协议 -->
    <div class="ququq" v-if="show">
      <div class="agreement">
        <h2>《护士服务保险协议条款》</h2>
        <p class="p3">{{content}}</p>
        <button class="ok" @click="okContent">我已阅读并同意</button>
      </div>
    </div>
  </div>
</template>
<script>
import frames from "../../../components/frames";
import Http from "../../../utils/https";
import Toast from "../../../../static/vant/dist/toast/toast";
import md5 from "js-md5";
let H = new Http();
export default {
  components: { frames },
  data() {
    return {
      content: "", //保密协议
      userName: "",
      passWord: "",
      userData: "",
      show: false,
      obj: {
        text: "护士登录",
        state: true
      }
    };
  },
  methods: {
    login() {
      if (!this.userName || !this.passWord) {
        Toast("账号或密码没填吧 ~~");
      } else {
        let passWord = md5(this.passWord);
        let loginData = JSON.parse(wx.getStorageSync("loginData"));

        let data = {
          userNo: this.userName,
          userPwd: passWord
        };

        let lastData = Object.assign(loginData, data);

        let header = { "content-type": "application/json" };

        H.nurseLogin(header, "POST", lastData, rst => {
          if (rst.data.code == 0) {
            console.log(rst.data.data)
            wx.setStorageSync("nurseData", rst.data.data);
            //是否是第一次登陆
            if (rst.data.data.isFirstLogin === 0) {
              //保密条款
              let header2 = {
                "content-type": "application/json",
                "API-User-Token": rst.data.data.token
              };

              H.selectNurseProtocol(header2, "GET", {}, res => {
                this.content = res.data.data.content; // 保密协议
              });
              this.show = true;
            } else {
              if (rst.data.code == 0) {
                wx.redirectTo({ url: "/pages/hushi/oderForm/main" });
              } else {
                this.$toast(rst.data.message);
              }
            }
          } else {
            this.$toast(rst.data.message);
          }
        });
      }
    },
    okContent() {
      // 同意协议
      let nurseData = wx.getStorageSync("nurseData");
      let openId = nurseData.openId;
      let header = {
        "content-type": "application/json",
        "API-User-Token": nurseData.token
      };
      // 同意协议
      H.isReadProtocol(header, "POST", openId, rst => {
        this.show = false;
        wx.navigateTo({ url: "/pages/hushi/preliminary/main" });
      });
    },
    todo(e) {
      this.userName = e.mp.detail.value;
    },
    todo1(e) {
      this.passWord = e.mp.detail.value;
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
  /* position: absolute;
  top: 16px;
  left: 0; */
  padding-top: 16px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
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
  /* margin-left: -23.5px; */
  vertical-align: top;
  text-align: center;
  flex: 1;
  justify-items: center;
}
.section {
  width: 100%;
  height: calc(100% - 16px - 50px);
  position: absolute;
  top: calc(16px + 50px);
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.section_top {
  margin: 32px 0 20px 0;
}
.section_top,
.section_top > img {
  width: 93px;
  height: 93px;
}
.p1 {
  font-size: 0.4rem;
}
.section_center {
  width: 100%;
  padding: 0 42px;
  margin-top: 50px;
  box-sizing: border-box;
}
.section_center > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1rem;
  line-height: 0.7rem;
  border-bottom: 1px solid #ccc;
}
.section_center > div img {
  width: 15.5px;
  height: 17.5px;
  margin-right: 0.3rem;
  vertical-align: middle;
}
.section_center > div input {
  height: 1rem;
  vertical-align: middle;
  color: #8090b5;
}
.section_btn {
  margin-top: 45px;
}
.section_btn img {
  width: 290px;
  height: 70px;
}
.p2 {
  position: absolute;
  bottom: 25px;
  width: 52.5px;
  height: 13px;
  font-size: 0.26rem;
  color: #ccc;
  margin: 0 auto;
}
.ququq {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.agreement {
  position: fixed;
  width: 6.4rem;
  height: 10.2rem;
  top: 1.56rem;
  left: 0.55rem;
  background-color: white;
  z-index: 999;
}
h2 {
  margin: 0.64rem 1.25rem;
  font-size: 0.31rem;
  font-weight: bold;
  text-align: center;
}
.p3 {
  height: 6.23rem;
  margin: 0 0.57rem;
  text-indent: 2em;
  color: #77777a;
  font-size: 0.25rem;
  line-height: 0.5rem;
  overflow-y: scroll;
}
.ok {
  height: 0.9rem;
  line-height: 0.9rem;
  margin: 0.74rem 1.2rem 0;
  border-radius: 0.45rem;
  text-align: center;
  color: white;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
}
</style>
