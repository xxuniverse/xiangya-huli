<template>
  <div class="containerLogin" :style="{height:screenHeight-tabbarHeight+'px'}">
    <frames :obj="obj"></frames>
    <div class="seaction" :style="{height: dataHeigth-tabbarHeight+'px',top:headHeigth+'px'}">
      <div class="user">
        <div class="userName">
          <span>姓名</span>
          <input
            v-model.trim="userName"
            type="text"
            :disabled="age_flag"
            placeholder="请输入"
            placeholder-style="text-align:right"
          />
        </div>
        <div class="age">
          <span>年龄</span>
          <input
            v-model.number="age"
            type="number"
            :disabled="age_flag"
            placeholder="请输入"
            placeholder-style="text-align:right"
          />
        </div>
        <div class="age">
          <span>身份证号</span>
          <input
            v-model="idCardNo"
            placeholder="请输入"
            :disabled="age_flag"
            placeholder-style="text-align:right"
          />
        </div>
      </div>
      <!-- ----------------------------- -->
      <div class="identityCard">
        <p>身份证照片</p>
        <div class="frontCard" @click="uploadPhoto">
          <div v-if="!updateImg.a" class="updatePhoto">
            <img :src="cardImg" alt />
            <span style="color:#666">身份证正面</span>
          </div>
          <div v-if="updateImg.a" class="updatePhoto2">
            <img :src="updateImg.a" alt />
          </div>
        </div>
        <div class="negativeCard" @click="uploadPhoto_1">
          <div v-if="!updateImg.b" class="updatePhoto">
            <img :src="cardImg" alt />
            <span style="color:#666">身份证反面</span>
          </div>
          <div v-if="updateImg.b" class="updatePhoto2">
            <img :src="updateImg.b" alt />
          </div>
        </div>
      </div>
      <!-- ---------------------- -->
      <div class="identityCard">
        <p>人脸照片</p>
        <div class="frontCard" @click="uploadPhoto_2">
          <div v-if="!faceImg" class="updatePhoto">
            <img :src="cardImg" alt />
            <span style="color:#666">人脸照片</span>
          </div>
          <div v-if="faceImg" class="updatePhoto2">
            <img :src="faceImg" alt />
          </div>
        </div>
      </div>
      <div class="btn" v-if="btn_flag">
        <div class="submit" @click="submit">提交认证</div>
        <div class="laterOn" @click="laterOn">稍后认证</div>
      </div>
    </div>
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import store from "../../../utils/store";
import frames from "../../../components/frames";
import orderFormData from "../../../components/orderFormData";
import appoint from "../../../components/appoint";
import Dialog from "../../../../static/vant/dist/dialog/dialog";
import Http from "../../../utils/https";

let H = new Http();
export default {
  components: { frames, orderFormData, appoint },
  data() {
    return {
      cardImg: require("../../../../static/images/login/sfzCard.png"),
      updateImg: {
        a: "",
        b: ""
      },
      upadte: false,
      idCardNo: "",
      faceImg: "",
      show: false, //是否弹窗
      userName: "",
      age: "",
      btn_flag: true,
      age_flag: false,
      obj: {
        text: "身份认证",
        state: true
      },
      // arr:[1,2,3,4],
      headHeigth: 0,
      screenHeight: 0,
      dataHeigth: 0,
      tabbarHeight: 0,
      styleStore: false
    };
  },
  methods: {
    //稍后认证
    laterOn() {
      wx.redirectTo({ url: "/pages/huanzhe/home/main" });
    },
    uploadPhoto() {
      // if (this.updateImg.a) {
      //   this.showPopup(this.updateImg.a);
      //   return;
      // }
      let _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "图片上传中"
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 500);
          const tempFilePaths = res.tempFilePaths;
        console.log(res);
          console.log(tempFilePaths);
          if (tempFilePaths.length > 1) {
            _this.$toast("当前只能上传一张图片");
            return;
          }
          _this.updateImg.a = tempFilePaths[0];
          _this.upadte = true;
          wx.uploadFile({
            url: _this.$img + "/api/upload/uploadFile/4/1", //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: "file",
            // formData: {
            //   user: "test"
            // },
            success(res) {
              const data = JSON.parse(res.data);
              let {
                data: { fileIds }
              } = data;
              _this.updateImg.a = fileIds;
            }
          });
        }
      });
    },
    uploadPhoto_1() {
      // if (this.updateImg.b) {
      //   this.showPopup(this.updateImg.b);

      //   return;
      // }
      let _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "图片上传中"
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 600);
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > 1) {
            _this.$toast("当前只能上传一张图片");
            return;
          }
          wx.uploadFile({
            url: _this.$img + "/api/upload/uploadFile/4/1", //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: "file",
            success(res) {
              const data = JSON.parse(res.data);
              let {
                data: { fileIds }
              } = data;
              _this.updateImg.b = fileIds;
            }
          });
        }
      });
    },
    uploadPhoto_2() {
      // if (this.faceImg) {
      //   this.showPopup(this.faceImg);
      //   return;
      // }
      let _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "图片上传中"
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 600);
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > 1) {
            _this.$toast("当前只能上传一张图片");
            return;
          }
          wx.uploadFile({
            url: _this.$img + "/api/upload/uploadFile/4/1", //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: "file",
            success(res) {
              const data = JSON.parse(res.data);
              let {
                data: { fileIds }
              } = data;
              _this.faceImg = fileIds;
            }
          });
        }
      });
    },
    //提交信息
    submit() {
      Dialog.confirm({
        title: "提示",
        message: "确认要提交认证信息吗？"
      })
        .then(() => {
          let patientData = wx.getStorageSync("patientData");
          //验证必填信息是否填写
          if (this.userName.length == 0) {
            this.$toast("请输入姓名");
            return;
          } else if (this.age.length == 0) {
            this.$toast("请输入年龄");
            return;
          } else if (this.idCardNo.length == 0) {
            this.$toast("请输入身份证号");
            return;
          } else if (!this.updateImg.a || !this.updateImg.b) {
            this.$toast("请上传身份证照片");
            return;
          } else if (!this.faceImg || !this.faceImg) {
            this.$toast("请上传人脸照片");
            return;
          }

          let data = {
            userName: this.userName,
            age: this.age,
            frontIdentityCard: this.updateImg.a,
            backIdentityCard: this.updateImg.b,
            facePicture: this.faceImg,
            idCardNo: this.idCardNo
          };
          let header = {
            "content-type": "application/json",
            "API-User-Token": patientData.token
          };
          H.saveAuthInfo(header, "POST", data, res => {
            if (res.data.code == 0) {
              let {
                data: { message }
              } = res;
              getCurrentPages().length = 0;
              this.userName = "";
              this.age = "";
              wx.redirectTo({ url: "/pages/huanzhe/authentication/main" });
            } else {
              this.$toast(`${res.data.message}`);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    showPopup(img) {
      wx.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      });
    },

    onClose() {
      this.show = false;
    }
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.screenHeight = store.state.screenHeight;
    this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = this.screenHeight - this.headHeigth;
  },
  // onShow(){
  //   ;
  //   //组件的data对象重置
  //   Object.assign(this.$data, this.$options.data.call(this));
  // },
  onLoad(value) {
    Object.assign(this.$data, this.$options.data.call(this));
    let data = value.data;
    if (data) {
      //查看患者认证信息(图片)
      let patientData = wx.getStorageSync("patientData");
      let token = patientData.token;
      let header = {
        "content-type": "application/json",
        "API-User-Token": token
      };
      H.getAuthInfo(header, "get", "", res => {
        let {
          data: { data }
        } = res;
        this.userName = data.userName;
        this.phone = data.phone;
        this.age = data.age;
        this.btn_flag = false;
        this.age_flag = true;
        this.updateImg = {
          a: data.frontIdentityCard,
          b: data.backIdentityCard
        };
        this.idCardNo = data.idCardNo;
        this.faceImg = data.facePicture;
      });
    }
  }
};
</script>

<style scoped>
.none {
  display: none;
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
.negativeCard {
  margin-bottom: 0.3rem;
}
.updatePhoto2 {
  width: 100%;
  height: 100%;
}
.updatePhoto2 > img {
  width: 5.6rem;
  height: 3.47rem;
}
.frontCard > div {
  width: 100%;
  height: 100%;
}
.containerLogin {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* height: 100%; */
}

.seaction {
  position: absolute;
  left: 0;
  width: 100%;
  /* background-color: #f2f2f2; */
  overflow-y: scroll;
  /* overflow: hidden; */
}

.seaction::-webkit-scrollbar {
  display: none;
}

.user input {
  margin-top: 0.35rem;
  font-size: 0.3rem;
  text-align: right;
  flex: 4;
}

.user span {
  flex: 1;
}

.userName,
.age {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1.1rem;
  line-height: 1.1rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  color: #333333;
}

.age {
  border-top: 0.01rem solid #e6e6e6;
}
.identityCard p {
  margin: 0.37rem 0 0.45rem 0.2rem;
  font-size: 0.28rem;
}
.list {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-top: 0.01rem solid #e6e6e6;
}

.list span {
  color: #ccc;
}

h2 {
  font-size: 0.3rem;
  color: #333333;
  margin: 0.4rem 0 0.2rem 0;
  display: inline-block;
}

.h2 {
  margin-right: 0.3rem;
}

.pic {
  position: relative;
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  /* justify-content: space-between; */
  padding-bottom: 0.4rem;
}

.pic > div {
  position: relative;
  width: 2.1rem;
  height: 2.1rem;
  margin-left: 0.3rem;
}

.pic img {
  width: 2.1rem;
  height: 2.1rem;
}

.pic > div:nth-child(1) {
  margin-left: 0;
}

.add {
  width: 2.1rem;
  height: 2.1rem;
  padding: -0.02rem;
  border: 0.02rem solid #e1e1e1;
  line-height: 2.1rem;
  text-align: center;
  margin-left: 0.3rem;
}

.addImg {
  font-size: 1rem;
  color: #cccccc;
}

.example {
  position: absolute;
  left: 0;
  bottom: 0.42rem;
  height: 0.7rem;
  width: 2.1rem;
  line-height: 0.7rem;
  text-align: center;
  color: white;
  font-size: 0.23rem;
  background-color: rgba(0, 0, 0, 0.5);
}

.del {
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.2rem;
  text-align: center;
  top: -0.1rem;
  right: -0.1rem;
  border: 0.01rem solid #ccc;
  border-radius: 50%;
  color: white;
  background-color: #cccccc;
  font-size: 0.3rem;
}

.btn {
  width: 100%;
}

.submit,
.laterOn {
  width: 70%;
  height: 0.9rem;
  line-height: 0.9rem;
  margin: 0.3rem auto;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  border-radius: 0.45rem;
  color: white;
}

.laterOn {
  background: #ffffff !important;
  border: 0.01rem solid rgba(60, 161, 255, 1);
  color: rgba(60, 161, 255, 1);
}
</style>
