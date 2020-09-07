<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height: dataHeigth-tabbarHeight+'px',top:headHeigth+'px'}">
      <div class="banner">
        <textarea
          @input="textLength"
          v-model="feedback"
          @blur="hasChange($event,'feedback')"
          placeholder="请输入投诉内容"
          class="feedback"
          maxlength="200"
          name
          id
        ></textarea>

        <div class="text">
          <!-- <van-uploader
              :file-list="fileList"
              @after-read="afterRead"
              max-count="5"
          />-->

          <upload width="120rpx" height="120rpx" max="6" @choosed="onChoosed" />
        </div>
        <!-- {{num}} -->
        <!-- <div class="rate">
            <span class="rate-title">评分:</span><van-rate :value="value" size="1.5rem" @change="onChange" />
        </div>-->
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
import Upload from "../../../components/uploader";
let H = new Http();
export default {
  components: { frames, Upload },
  data() {
    return {
      welfareId: "", //服务信息id
      orderNo: "", //订单编号
      list: store.state.orderList, //订单数据
      value: 0, //评分等级
      feedback: "", //评价
      feedback_: "",
      headHeigth: 0,
      screenHeight: 0,
      tabbarHeight: 0,
      dataHeigth: 0,
      fileList: [],
      obj: {
        text: "投诉",
        state: true
      },
      num: 0
    };
  },
  methods: {
    handleComplaintClick() {
      wx.navigateTo({ url: "/pages/huanzhe/complaint/main" });
    },
    hasChange(e, name) {
      this[name] = e.mp.detail.value;
    },
    //图片上传后触发
    onChoosed(obj) {
      //上传图片路径
      this.fileList.push(obj.data.fileIds);
    },
    onChange(event) {
      // this.setData({
      //   value: event.detail
      // });
      this.value = event.mp.detail;
    },
    afterRead(event) {
      const { file } = event.detail;
      // 当设置 mutiple 为 true 是 file 是一个数组，mutiple 默认为 false，file 是一个对象
      wx.uploadFile({
        url: "http://192.168.0.113:9091/api/upload/uploadFile/13/1",
        // url: "https://huli.novocare.cn/api/upload/uploadFile/13/1",
        filePath: file.path,
        name: "file",
        formData: { user: "test" },
        success(res) {
          // 上传完成需要更新fileList
          const { fileList = [] } = this.data;
          fileList.push({ ...file, url: res.data });
        }
      });
    },
    textLength() {
      this.num = this.feedback.length;
    },
    submit() {
      //判断服务评分是必填项 是否勾选
      if (this.feedback.length === 0) {
        //提示信息
        this.$toast.fail("请输入投诉内容");
        return;
      }
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token
      };
      H.saveComplaint(
        header,
        "POST",
        {
          orderNo: this.orderNo,
          complaintContent: this.feedback,
          complaintImg: this.fileList.toString(),
          assistantUser: wx.getStorageSync("name")
        },
        rst => {
          if (rst.data.code == 0) {
            wx.redirectTo({
              url:
                "/pages/huanzhe/endOrder/main?obj=" +
                JSON.stringify({ btn: "", success: "投诉成功", click: "" })
            });
            this.fileList = [];
          }
        }
      );
    }
  },
  onLoad(options) {
    this.orderNo = options.id;
    this.value = 0;
    this.feedback = "";
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
  color: #b9b9b9;
  z-index: 999;
}
.submit {
  margin: 2rem auto 0.1rem auto;
  width: 4.8rem;
  height: 0.9rem;
  border: 0.02rem solid rgba(60, 161, 255, 1);
  border-radius: 0.45rem;
  text-align: center;
  line-height: 0.9rem;
  font-size: 0.3rem;
  color: #3ca1ff;
}
.submit_ {
  margin: auto;
  width: 4.8rem;
  height: 0.9rem;
  border: 0.02rem solid #ffffff;
  border-radius: 0.45rem;
  text-align: center;
  line-height: 0.9rem;
  font-size: 0.3rem;
  color: #999999;
}
.rate {
  display: flex;
  align-items: center;
  margin-top: 0.58rem;
}
.rate-title {
  display: inline-block;
  margin-right: 0.39rem;
  color: #333;
}
.j-upload-btn {
  margin-right: 0;
}
</style>
