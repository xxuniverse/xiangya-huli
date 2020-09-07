<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <div class="sect_container">
        <div class="hint">
          <p>导管录入</p>
        </div>
        <div class="catheterType">
          <p>
            1、导管类型
            <span class="message">{{ form.catheterType && form.catheterType.val}}</span>
          </p>
        </div>
        <div class="standards">
          <p>
            2、导管规格
            <span class="message">{{ form.catheterNorms && form.catheterNorms.val}}</span>
          </p>
        </div>
        <div class="site">
          <p>
            3、置管地点
            <span class="message">{{form.placementAddr && form.placementAddr.val}}</span>
          </p>
        </div>
        <div class="Time">
          <p>
            4、置管时间
            <span class="message">{{form.placementTime }}</span>
          </p>
        </div>
        <!-- 管制部位 -->
        <div class="hint">
          <p>置管部位</p>
        </div>
        <div class="site">
          <p>
            1、穿刺部位
            <span class="message">{{form.left}}{{form.right}}</span>
          </p>
        </div>
        <div class="catheterType">
          <p>
            2、穿刺血管
            <span class="message">{{form.punctureBlood&& form.punctureBlood.val}}</span>
          </p>
        </div>
      </div>
      <!-- 维护过程录入 -->
      <div class="hint">
        <p>维护过程录入</p>
      </div>
      <div class="maintain">
        <p>1、置管前基础臂/腿围</p>
        <div>
          <span>左上臂/腿</span>
          <input class="borderB" type="text" :disabled="true" :value="form.leftArm" />
          <span>cm</span>
        </div>
        <div>
          <span>右上臂/腿</span>
          <input class="borderB" type="text" :disabled="true" :value="form.rightArm" />
          <span>cm</span>
        </div>
      </div>
      <!-- 导管置入体内长度 -->
      <div class="length">
        <p>2、导管置入体内长度</p>
        <div>
          <input class="borderB lengthWidth" type="text" :disabled="true" :value="form.inLength" />
          <span>cm</span>
        </div>
      </div>
      <!-- 3、导管体外长度 -->
      <div class="length">
        <p>3、导管体外长度</p>
        <div>
          <input class="borderB lengthWidth" type="text" :disabled="true" :value="form.outLength" />
          <span>cm</span>
        </div>
      </div>
      <!-- 并发症录入 -->
      <div class="hint">
        <p>并发症录入</p>
      </div>
      <div class="site">
        <p>
          1、有无并发症
          <span class="message">{{ form.neopathy == 1?'无':form.neopathy == 2?'有':"" }}</span>
        </p>
      </div>
      <controlSite v-if="form.neopathy == 2" :messageData="messageData"></controlSite>

      <!-- 护理 -->
      <div class="hint">
        <p>护理</p>
      </div>
      <div class="site border">
        <p>1、护理</p>
        <!-- 多选按钮 -->
        <div class="flex-c" style="width:100%;flex-wrap:wrap;" v-if="form.nursingCare">
          <div
            v-for="(item,index) in form.nursingCare"
            :key="index"
            class="message"
            style="width:100%;color:#3CA1FF;margin-top:10px;"
          >{{item.val}}</div>
        </div>
      </div>
      <div class="whTime border relative">
        <p>
          2、维护时间
          <span
            class="message"
          >{{form.defendTime && (form.defendTime.year+'-'+form.defendTime.month+'-'+form.defendTime.day)}}</span>
        </p>
      </div>

      <div class="whY border relative">
        <p>
          3、维护原因
          <span class="message">{{form.defendReason && form.defendReason.val}}</span>
        </p>
      </div>

      <div class="hint">
        <p>维护后图片</p>
      </div>
      <div class="site">
        <div class="flex-s imgBox">
          <div style="position: relative" v-for="(item,index) in fileList" :key="index">
            <!-- <van-icon name="close" class="closeIcon" @click="closePage($event,item,index)" /> -->
            <img :src="item" class="img" />
          </div>
        </div>
      </div>

      <!-- 护士签名 -->
      <div class="hint">
        <p>护士签名</p>
      </div>

      <div class="signature">
        <img :src="nurseData.signImg" v-if="nurseData.signImg && imgFlag" alt />
        <img v-else :src="imgUrl" alt />
      </div>
      <van-toast id="van-toast"></van-toast>
    </div>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Https from "../../../utils/https";
import controlSite from "./controlSite";
import dayjs from "dayjs";

let H = new Https();

export default {
  components: { frames, controlSite },
  data() {
    return {
      show: false,
      obj: {
        text: "维护评估记录",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      orderNo: "",
      nurseData: {},
      myCheck: [],
      messageData: [], //并发症类型数据列表
      form: {},
      imgUrl: "",
      imgFlag: true,
      fileList: []
    };
  },
  methods: {
    getData() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.selectComplicationList(header, "get", "", res => {
        if (res.data.code == 0) {
          this.messageData = res.data.data;
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
      H.getDefendEstimatInfo(header, "get", this.orderNo, res => {
        if (res.data.code == 0) {
          if (Object.values(res.data.data.estimateInfo).length > 0) {
            this.filterEstimateInfo(res.data.data.estimateInfo);
            this.imgUrl = res.data.data.estimateInfo.signPicture; //患者端要显示的护士签名
          }
          if (res.data.data.infoList.length > 0) {
            this.filterInfoList(res.data.data.infoList);
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    filterEstimateInfo(data) {
      this.form.catheterType =
        data.catheterType && JSON.parse(data.catheterType); //导管类型；
      this.form.catheterNorms =
        data.catheterNorms && JSON.parse(data.catheterNorms); //导管规格；
      this.form.placementAddr =
        data.placementAddr && JSON.parse(data.placementAddr); //置管地点
      this.form.placementTime =
        data.placementTime && dayjs(data.placementTime).format("YYYY-MM-DD"); //置管时间
      this.form.left = data.left; //穿刺部位左侧
      this.form.right = data.right; // 穿刺部位右侧
      this.form.punctureBlood =
        data.punctureBlood && JSON.parse(data.punctureBlood); //穿刺血管
      this.form.leftArm = data.leftArm; //左上臂/腿（cm）
      this.form.rightArm = data.rightArm; //右上臂/腿（cm）
      this.form.inLength = data.inLength; // 导管置入体内长度（cm）
      this.form.outLength = data.outLength; //导管体外长度（cm）
      this.form.neopathy = String(data.neopathy) || ""; //有无并发症；1.无   2.有   当有并发症才会有下面的infoList
      this.form.nursingCare = data.nursingCare && JSON.parse(data.nursingCare); //护理
      this.form.defendTime = data.defendTime && JSON.parse(data.defendTime); //维护时间；如：{”year“:2019,"month":10,"day":16}
      this.form.defendReason =
        data.defendReason && JSON.parse(data.defendReason); //维护原因
      // 诊后照片
      data.afterMaintenanceImg && this.fileList.push(data.afterMaintenanceImg);

      this.form = Object.assign({}, this.form);
    },
    filterInfoList(data) {
      data.forEach(element => {
        store.commit("hasSaveSelectType", element);
      });
    }
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data.call(this));
    this.orderNo = options.id;
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
    if (wx.getStorageSync("nurseData")) {
      this.nurseData = wx.getStorageSync("nurseData");
    } else {
      this.nurseData = wx.getStorageSync("patientData");
    }
    this.getData();
  }
};
</script>

<style scoped>
.relative {
  position: relative;
}
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.message {
  color: #3ca1ff;
  font-size: 30rpx;
  margin-left: 100rpx;
}
.section {
  width: 100%;
  position: absolute;
  overflow-y: scroll;
  /* background-color: #f2f2f2; */
}
.section::-webkit-scrollbar {
  display: none;
}
/* .sect_container{
  overflow-y: scroll;
} */
.hint {
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.4rem;
  font-size: 0.26rem;
  color: #313233;
  background: rgba(240, 245, 250, 1);
}
.hint p {
  padding-left: 0.29rem;
}
/* 导管类型 */
.catheterType {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
}
.conduitType {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
}
.conduitType > van-radio {
  width: 50%;
  margin-top: 0.64rem;
  font-size: 0.3rem;
  color: #313233;
}
/* 导管规格 */
.standards,
.site,
.Time,
.maintain,
.length,
.whTime,
.whY {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
}
.catheterStandards,
.controlSite {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.catheterStandards > van-radio,
.controlSite > van-radio {
  margin-top: 0.53rem;
  font-size: 0.3rem;
  color: #313233;
}
/* 管制地点 */
.site {
  position: relative;
}
.backInput {
  position: absolute;
  left: 30%;
  bottom: 0.36rem;
  display: inline-block;
  width: 50%;
  border-bottom: 0.01rem solid #e6e6e6;
}
.backInput2 {
  position: absolute;
  left: 30%;
  bottom: 1.47rem;
  display: inline-block;
  width: 50%;
  border-bottom: 0.01rem solid #e6e6e6;
}
.backInput3 {
  position: absolute;
  left: 30%;
  bottom: 2.42rem;
  display: inline-block;
  width: 50%;
  border-bottom: 0.01rem solid #e6e6e6;
}
.backInput5 {
  position: absolute;
  left: 45%;
  /* bottom: 1.78rem; */
  width: 3.6rem;
  display: inline-block;
  height: 0.72rem;
  border-bottom: 0.01rem solid #e6e6e6;
  margin-top: 0.05rem;
}
.backInput6 {
  position: absolute;
  left: 45%;
  height: 0.72rem;
  /* bottom: 0.42rem; */
  width: 3.6rem;
  display: inline-block;
  margin-top: 0.05rem;
  border-bottom: 0.01rem solid #e6e6e6;
}
.backInput7 {
  position: absolute;
  left: 45%;
  /* bottom: 1.78rem; */
  width: 3.6rem;
  display: inline-block;
  height: 0.72rem;
  border-bottom: 0.01rem solid #e6e6e6;
  margin-top: 0.05rem;
  bottom: 16%;
}
.backInput8 {
  position: absolute;
  left: 45%;
  height: 0.72rem;
  /* bottom: 0.42rem; */
  width: 3.6rem;
  display: inline-block;
  margin-top: 0.05rem;
  bottom: 16%;

  border-bottom: 0.01rem solid #e6e6e6;
}
.imgBox {
  width: 100%;
  margin-top: 30rpx;
  flex-wrap: wrap !important;
}
.img {
  width: 238rpx !important;
  height: 240rpx !important;
  margin-left: 20prx;
}
/* 管制时间 */
.picBorder {
  height: 0.72rem;
  font-size: 0.3rem;
  color: #999999;
  text-align: center;
  line-height: 0.72rem;
  border: 0.01rem solid #e6e6e6;
}
.Time > picker {
  margin-top: 0.53rem;
  width: 60%;
}
.zgBtn {
  width: 4.8rem;
  height: 0.72rem;
  line-height: 0.72rem;
  border: 2px solid rgba(230, 230, 230, 1);
  border-radius: 0.36rem;
  text-align: center;
  margin: 0.7rem auto 0;
}
.zgBtn1 {
  width: 4.8rem;
  height: 0.72rem;
  line-height: 0.72rem;
  border: 2px solid rgba(230, 230, 230, 1);
  border-radius: 0.36rem;
  text-align: center;
  margin: 0.24rem auto;
}
/* 刺穿血管 */
.backInput4 {
  position: absolute;
  left: 70%;
  bottom: -0.04rem;
  display: inline-block;
  width: 25%;
  border-bottom: 0.01rem solid #e6e6e6;
}
/* 维护过程 */
.maintain > div {
  /* position: relative; */
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 0.68rem;
  /* flex-wrap: wrap; */
}
.borderB {
  line-height: 0.72rem;
  text-align: center;
  margin: -0.2rem 0.07rem 0 0.27rem;
  width: 4.2rem;
  height: 0.72rem;
  border: 0.02rem solid rgba(230, 230, 230, 1);
  font-size: 30rpx;
  color: #3ca1ff;
}
/* 导管置入体内长度 */
.length {
  display: flex;
  flex-direction: row;
}
.lengthWidth {
  width: 2.5rem;
}
.length > div {
  display: flex;
  flex-direction: row;
}
/* 并发症类型 */
.check {
  display: flex;
  flex-direction: column;
}
.checkbox,
.checkbox2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.45rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
}
.checkbox {
  background: #ebf2fa;
}
.rote {
  display: inline-block;
  transform: rotate(90deg);
}
.color {
  position: relative;
  width: 0.46rem;
  height: 0.46rem;
  margin-top: 0.17rem;
  border-radius: 0.23rem;
  background-color: #3ca1ff;
}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}
/* 维护时间，维护原因 */
.border {
  border-bottom: 0.01rem solid #e6e6e6;
}
.whTime,
.whY {
  height: 1.18rem;
  line-height: 1.18rem;
  font-size: 0.3rem;
  padding: 0 0.4rem;
  display: flex;
  flex-direction: row;
}
.btn {
  background-color: white;
}
/* 护士签名 */
.signature {
  margin: 0.3rem auto;
  width: 6.7rem;
  height: 2.4rem;
  border: 0.02rem solid #e6e6e6;
}
.signature > img {
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
  margin-top: 0.9rem;
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
p {
  font-size: 0.3rem;
  color: #313233;
}
.maintain span,
.length span {
  font-size: 0.3rem;
  color: #313233;
}
/* 症状 */
.symptom {
  padding: 0.34rem 0.37rem;
}
.symptom > div {
  margin-bottom: 0.5rem;
}
.symptom > div > p {
  font-size: 0.3rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 0.29rem;
}
.symptom > div:nth-child(2) > span {
  display: block;
  margin-bottom: 0.12rem;
}
.symptom > div > span {
  font-size: 0.26rem;
  color: #333333;
  line-height: 0.4rem;
}
</style>
