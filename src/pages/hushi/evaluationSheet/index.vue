<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{ top: headHeigth + 'px' }">
      <div class="sect_container">
        <div class="hint">
          <p>提示：如有以下症状建议去医院,若无则可上门服务</p>
        </div>
        <div class="catheterPhotos">
          <h2>导管照片:</h2>
          <div class="photos">
            <div v-for="(item, index) of imgArr[0]" :key="index">
              <img :src="item.userPicture" alt v-if="item.userPicture" />
              <img src="/static/images/login/e1.png" v-else />
            </div>
          </div>
        </div>
        <div class="catheterPhotos">
          <h2>出院小结:</h2>
          <div class="photos">
            <div v-for="(item, index) of imgArr[1]" :key="index">
              <img :src="item.userPicture" alt v-if="item.userPicture" />
              <img src="/static/images/login/e1.png" v-else />
            </div>
          </div>
        </div>
        <div class="catheterPhotos">
          <h2>维护手册:</h2>
          <div class="photos">
            <div v-for="(item, index) of imgArr[2]" :key="index">
              <img :src="item.userPicture" alt v-if="item.userPicture" />
              <img src="/static/images/login/e1.png" v-else />
            </div>
          </div>
        </div>
        <div class="symptom">
          <div>
            <p>有无置管侧肢体疼痛:</p>
            <van-radio-group
              class="radio-group radioGroup"
              :value="ache"
              @change="hasChange($event, 'ache')"
            >
              <van-radio class="radio have" :name="1" color="#4BA4FE">
                <span>无</span>
              </van-radio>
              <van-radio class="radio without" :name="2" color="#4BA4FE">
                <span>有</span>
              </van-radio>
            </van-radio-group>
          </div>
          <div>
            <p>有无肿胀:</p>
            <van-radio-group
              class="radio-group radioGroup"
              :value="swell"
              @change="hasChange($event, 'swell')"
            >
              <van-radio class="radio have" :name="1" color="#4BA4FE">
                <span>无</span>
              </van-radio>
              <van-radio class="radio without" :name="2" color="#4BA4FE">
                <span>有</span>
              </van-radio>
            </van-radio-group>
          </div>
          <div>
            <p>导管有无破损:</p>
            <van-radio-group
              :value="damaged"
              class="radio-group radioGroup"
              @change="hasChange($event, 'damaged')"
            >
              <van-radio class="radio have" :name="1" color="#4BA4FE">
                <span>无</span>
              </van-radio>
              <van-radio class="radio without" :name="2" color="#4BA4FE">
                <span>有</span>
              </van-radio>
            </van-radio-group>
          </div>
          <div>
            <p>导管有无脱出:</p>
            <van-radio-group
              :value="prolapse"
              class="radio-group radioGroup"
              @change="hasChange($event, 'prolapse')"
            >
              <van-radio class="radio have" :name="1" color="#4BA4FE">
                <span>无</span>
              </van-radio>
              <van-radio class="radio without" :name="2" color="#4BA4FE">
                <span>有</span>
              </van-radio>
            </van-radio-group>
          </div>
          <div class="textArea">
            <p>其他:</p>
            <div class="flex-c" style="width: 100%;">
              <div
                style="height: 200rpx;width: 97%;border: solid 2rpx #e1e1e1;margin-top: 10px;"
                @click="showDialog"
              >{{ remark }}</div>
            </div>
          </div>
        </div>
        <van-dialog id="van-dialog" />
        <van-toast id="van-toast" />

        <div class="btn">
          <div class="submit" @click="subOrder">确认接单</div>
          <div class="return" @click="qxOrder">取消订单</div>
        </div>
      </div>
      <van-dialog
        use-slot
        title="备注信息"
        :show="show"
        show-cancel-button
        @confirm="saveRemark"
        @cancel="cancelRemark"
      >
        <div class="flex-c textArea" style="width: 100%;">
          <textarea v-model="dmeo" maxlength="100" name placeholder="请输入备注信息"></textarea>
        </div>
      </van-dialog>
    </div>
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
      imgArr: [], // 患者下单导管图片
      remark: "", // 其他备注
      orderNo: "",
      userId: "",
      ache: "", // 有无疼痛  1 无 2 有
      swell: "", // 有无肿胀
      damaged: "", // 有无破损
      prolapse: "", // 有无脱出
      show: false,
      obj: {
        text: "诊前评估单",
        state: true,
      },
      headHeigth: 0,
      dmeo: "",
      userLink: "",
      header: {},
      nurseData: {},
    };
  },
  methods: {
    cancelRemark() {
      this.remark = "";
      this.show = false;
    },
    showDialog() {
      this.show = true;
    },
    saveRemark() {
      this.remark = this.dmeo;
      this.show = false;
    },
    hasChange(e, name) {
      this[name] = e.mp.detail;
    },
    hasChange1(e, name) {
      this[name] = e.mp.detail.value;
    },
    // 取消订单
    qxOrder() {
      Dialog.confirm({
        title: "提示",
        message: "确定要取消该订单吗？",
      })
        .then(() => {
          let data = {
            orderNo: this.orderNo,
            flagOne: this.ache,
            flagTwo: this.swell,
            flagThree: this.damaged,
            flagFour: this.prolapse,
            remark: this.remark,
          };
          if (
            !this.ache &&
            !this.swell &&
            !this.damaged &&
            !this.prolapse &&
            !this.remark
          ) {
            this.$toast.fail("请先选择诊前评估项");
            return;
          }
          H.cancelWelfareOrder(this.header, "POST", data, (res) => {
            if (res.data.code == 0) {
              wx.redirectTo({ url: "/pages/hushi/concelSuccess/main" });
            } else {
              this.$toast(`${res.data.message}`);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //确定订单
    subOrder() {
      let data = {
        orderNo: this.orderNo,
        flagOne: this.ache,
        flagTwo: this.swell,
        flagThree: this.damaged,
        flagFour: this.prolapse,
        remark: this.remark,
      };
      let str = this.nurseData.phone + "/" + this.userLink + "/" + this.orderNo;
      H.confirmReceiveOrder(this.header, "POST", data, (res) => {
        if (res.data.code == 0) {
          H.getFictitiousPhone(this.header, "get", str, (rst) => {});
          //调到成功接单
          wx.redirectTo({
            url:
              "/pages/hushi/orderReceivingOk/main?orderNo=" +
              this.orderNo +
              "&userId=" +
              this.userId,
          });
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },

    //获得导管图片
    getData() {
      this.imgArr = store.state.imgList;
      console.log(this.imgArr);
    },
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data.call(this));
    this.orderNo = options.id;
    this.userId = options.userId;
    this.userLink = options.userLink;
    this.getData();
    this.headHeigth = store.state.statusBarHeight;

    this.nurseData = wx.getStorageSync("nurseData");
    this.header = {
      "content-type": "application/json",
      "API-User-Token": this.nurseData.token,
    };
  },
};
</script>

<style scoped>
.radioGroup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.section {
  position: absolute;
  left: 0;
  overflow-y: scroll;
  box-sizing: border-box;
  width: 100%;
  bottom: 0px;
}
.section::-webkit-scrollbar {
  display: none;
}
/* .sect_container{
  overflow-y: scroll;
} */
.hint {
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0.02rem;
  font-size: 0.26rem;
  color: #999999;
  background-color: #f7f7f7;
  border-top: 0.02rem solid #e0e0e0;
  border-bottom: 0.02rem solid #e0e0e0;
  background-color: white;
}
.hint p {
  padding-left: 0.29rem;
}
.catheterPhotos {
  width: 100%;
  background-color: white;
}
.catheterPhotos h2 {
  line-height: 57rpx;
  padding-left: 0.3rem;
  font-size: 0.28rem;
}
.photos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 0.3rem;
}
.photos > div {
  margin-bottom: 0.15rem;
}
.photos > div,
.photos > div > img {
  width: 2.2rem;
  height: 2.2rem;
}
.symptom {
  margin-bottom: 75px;
  margin-top: 0.1rem;
  background-color: white;
  padding: 0rem 0.29rem;
  box-sizing: border-box;
}
.symptom > div {
  height: 161rpx;
}
.symptom > div p {
  margin: 10rpx 0px;
}
.have,
.without {
  padding-right: 1.6rem;
  margin-top: 0.37rem;
}
.have > img,
.without > img {
  width: 0.45rem;
  height: 0.46rem;
  vertical-align: middle;
  /* vertical-align: text-bottom; */
}
.have > span,
.without > span {
  display: inline-block;
  font-size: 0.3rem;
  margin-left: 0.22rem;
}
.textArea > textarea {
  margin-top: 0.39rem;
  padding: 0.22rem;
  width: 90%;
  height: 1.8rem;
  border: 0.02rem solid #e1e1e1;
  font-size: 0.3rem;
}
.btn {
  background-color: white;
}
.submit,
.return {
  text-align: center;
  margin: 0.15rem 0.55rem;
  height: 0.9rem;
  border-radius: 0.45rem;
  line-height: 0.9rem;
}
.submit {
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
