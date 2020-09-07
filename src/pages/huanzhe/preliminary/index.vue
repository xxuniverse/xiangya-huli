<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <div class="section_box">
        <div class="section_box_name">
          <span>姓名</span>
          <input
            v-model.trim="userName"
            type="text"
            placeholder="请填写"
            placeholder-style="text-align:right"
          />
        </div>
        <div class="section_box_password">
          <span>身份证号码</span>
          <input
            v-model.trim="card"
            type="text"
            placeholder="请填写"
            placeholder-style="text-align:right"
          />
        </div>
      </div>
      <div class="identityCard">
        <p>身份证扫描件</p>
        <div class="frontCard" @click="uploadPhoto">
          <div v-if="!upadte" class="updatePhoto">
            <img :src="img.a" alt />
            <span>上传身份证正面</span>
          </div>
          <div v-if="upadte" class="updatePhoto2">
            <img :src="updateImg.a" alt />
          </div>
        </div>
        <div class="negativeCard" @click="uploadPhoto_1">
          <div v-if="!upadte_1" class="updatePhoto">
            <img :src="img.b" alt />
            <span>上传身份证反面</span>
          </div>
          <div v-if="upadte_1" class="updatePhoto2">
            <img :src="updateImg.b" alt />
          </div>
        </div>
        <van-dialog id="van-dialog" />
        <!-- <img :src="Img" alt=""> -->
        <div class="submit" @click="submit">提交</div>
        <div class="return">返回</div>
      </div>
    </div>
  </div>
</template>
<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Dialog from "../../../../static/vant/dist/dialog/dialog";
import Http from "../../../utils/https";
let H = new Http();
export default {
  components: { frames },
  data() {
    return {
      userName: "",
      card: "",
      upadte: false,
      upadte_1: false,
      img: {
        a: require("../../../../static/images/login/sfzCard.png"),
        b: require("../../../../static/images/login/sfzCard.png")
      },
      updateImg: {
        a: "",
        b: ""
      },
      show: false,
      obj: {
        text: "实名认证",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0
    };
  },
  methods: {
    uploadPhoto() {
      let _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          _this.updateImg.a = tempFilePaths[0];
          _this.upadte = true;
        }
      });
    },
    uploadPhoto_1() {
      let _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          _this.updateImg.b = tempFilePaths[0];
          _this.upadte_1 = true;
        }
      });
    },
    submit() {
      let _this = this;
      if (
        this.userName != "" ||
        this.card != "" ||
        this.updateImg.a != "" ||
        this.updateImg.b != ""
      ) {
        let data = {
          userName: this.userName,
          idCardNo: this.card,
          frontIdentityCard: this.updateImg.a,
          backIdentityCard: this.updateImg.b
        };
        let data2 = {
          flie: this.updateImg.a
        };
        let data3 = {
          flie: this.updateImg.b
        };


        H.updateImage("POST", data2, rst => {
          console.log(rst);
        });
        setTimeout(() => {
          H.updateImage("POST", data3, rst1 => {
            console.log(rst1);
          });
        }, 3000);
      } else {
        Dialog.alert({
          message: "请填写相关信息及身份证照片"
        }).then(() => {
          // on close
        });
      }
    }
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    // this.screenHeight = store.state.screenHeight;
    // this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
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
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  /* width: 100%;
  position: absolute;
  top: calc(16px + 50px);
  left: 0; */
}
.section::-webkit-scrollbar {
  display: none;
}
/* .section_box {
  padding: 0.2rem 0.39rem;
} */
.section_box_name,
.section_box_password {
  display: flex;
  flex-direction: row;
  height: 0.7rem;
  line-height: 0.7rem;
  border-bottom: 1px solid #ccc;
  padding: 0.2rem 0.39rem;
}
.section_box input {
  padding-left: 0.2rem;
  flex: 1;
  height: 0.7rem;
  line-height: 0.7rem;
}
.identityCard p {
  margin: 0.37rem 0 0.45rem 0.39rem;
  font-size: 0.28rem;
}
.updatePhoto {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.updatePhoto img {
  width: 0.91rem;
  height: 0.79rem;
  margin-top: 1.06rem;
  margin-bottom: 0.27rem;
}
.updatePhoto2 {
  width: 100%;
  height: 100%;
}
.updatePhoto2 > img {
  width: 5.6rem;
  height: 3.47rem;
}
.frontCard,
.negativeCard {
  height: 3.47rem;
  width: 5.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.3rem auto;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 0.27rem;
}
.negativeCard {
  margin-bottom: 0.3rem;
}
.frontCard > div {
  width: 100%;
  height: 100%;
}
.submit,
.return {
  text-align: center;
  margin: 0.2rem 0.55rem;
  height: 0.9rem;
  border-radius: 0.45rem;
  line-height: 0.9rem;
}
.submit {
  margin-top: 0.4rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  color: white;
}
.return {
  border: 1px solid #50abff;
}
</style>