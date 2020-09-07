<template>
  <div class="containerLogin" :style="{height:height+'px'}">
    <div class="sect_container">
      <div class="hint">
        <p style="padding:0px;">导管情况</p>
      </div>
      <daoguanqk
        @radioChange="radioChange"
        @checkboxChange="checkboxChange"
        :data="[data[0],data[1],data[2]]"
        :oldData="array[0]"
      ></daoguanqk>
    </div>
    <!-- --------------------------------------- -->
    <div class="hint">
      <p>置管史</p>
    </div>
    <div class="catheterType">
      <p>有无置管史</p>
      <van-radio-group
        class="conduitType"
        :value="radio1"
        @change="onChange($event,'radio1','placement')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>

    <daoguanshi
      v-if="radio1 == 2"
      @checkboxChange="checkboxChange"
      :data="data[3]"
      :oldData="array[1]"
    ></daoguanshi>

    <!-- ---------------------------------------- -->
    <div class="hint">
      <p>服务需求</p>
    </div>

    <fuwuxuqiu :data="[data[12],data[13]]" @checkboxChange="checkboxChange" :oldData="array[2]"></fuwuxuqiu>

    <!-- ---------------------------- -->
    <div class="hint">
      <p>过敏史</p>
    </div>
    <div class="catheterType">
      <p>有无过敏史</p>
      <van-radio-group
        class="conduitType"
        :value="radio2"
        @change="onChange($event,'radio2','haveAllergy')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <guominshi
      v-if="radio2 == 2"
      @checkboxChange="checkboxChange"
      :data="data[4]"
      :oldData="array[3]"
    ></guominshi>

    <!-- --------------------------------- -->
    <div class="hint">
      <p>用药情况</p>
    </div>
    <div class="catheterType">
      <p>有无用药</p>
      <van-radio-group
        class="conduitType"
        :value="radio3"
        @change="onChange($event,'radio3','haveDrug')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <yongyaoqk
      v-if="radio3 == 2"
      @checkboxChange="checkboxChange"
      :data="data[5]"
      :oldData="array[4]"
    ></yongyaoqk>

    <!-- -------------------------------- -->
    <div class="hint">
      <p>局部症状与体征</p>
    </div>
    <jubuzhengzhuang
      @rankChange="rankChange"
      @inputChange="inputChange"
      @flagChange="flagChange"
      @painLevel="painLevel"
      :oldData="array[5]"
      @upload="upload"
      @checkboxChange1="checkboxChange1"
    ></jubuzhengzhuang>

    <!-- ----------------------------- -->
    <div class="hint">
      <p>神志清醒与配合程度</p>
    </div>

    <shenzhiqk
      :data="data[6]"
      @radioChange="radioChange"
      @flagChange="flagChange"
      :oldData="array[6]"
    ></shenzhiqk>

    <!-- ----------------- -->
    <div class="hint">
      <p>肢体活动障碍</p>
    </div>
    <div class="catheterType" style="border-bottom:0px;">
      <p>肢体活动障碍</p>
      <van-radio-group
        class="conduitType"
        :value="radio4"
        @change="onChange($event,'radio4','limbsActivityObstacle')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <zhitiqk
      v-if="radio4 == 2"
      :data="data[7]"
      @checkboxChange="checkboxChange"
      :oldData="array[7]"
    ></zhitiqk>

    <!-- ------------------------- -->
    <div class="hint">
      <p>身体症状与体征</p>
    </div>
    <shentizz
      @flagChange="flagChange"
      @inputChange="inputChange"
      @pickerChange="pickerChange"
      :oldData="array[8]"
    ></shentizz>
    <!-- ----------------------------- -->
    <div class="bz">
      <p style="padding-top:5px;">其他备注</p>
      <div class="flex-c" style="width:100%;">
        <div
          style="height: 200rpx;width: 97%;border: solid 2rpx  #E1E1E1;margin-top:10px;"
          @click="showDialog($event,'show')"
        >{{content1}}</div>
      </div>
    </div>

    <!-- --------------------------- -->

    <div class="hint">
      <p>诊疗前图片</p>
    </div>
    <div class="site">
      <div style="width:100%; " class="flex-c">
        <van-button round @click="uploadImg($event,'beforeDiagnosisImg')">上传图片</van-button>
      </div>

      <div class="flex-s imgBox">
        <div style="position: relative" v-for="(item,index) in fileList1" :key="index">
          <van-icon
            name="close"
            class="closeIcon"
            @click="closePage($event,item,index,'beforeDiagnosisImg')"
          />
          <img :src="item" class="img" />
        </div>
      </div>
    </div>

    <div class="btn">
      <div class="submit" @click="save">保存</div>
    </div>

    <van-dialog
      use-slot
      title="备注信息"
      :show="show"
      show-cancel-button
      @confirm="saveRemark($event,'show','content1','remark')"
      @cancel="cancelRemark($event,'show','content1','remark')"
    >
      <div class="flex-c textArea" style="width:100%;">
        <textarea
          class="text"
          name
          id
          cols="30"
          rows="10"
          :value="demo"
          style="border-bottom: 2rpx solid #E6E6E6;"
          @change="hasInput($event,'demo')"
        ></textarea>
      </div>
    </van-dialog>
    <van-toast id="van-toast"></van-toast>
  </div>
</template>

<script>
import daoguanqk from "../template/daoguanqk";
import daoguanshi from "../template/daoguanshi";
import fuwuxuqiu from "../template/fuwuxuqiu";
import guominshi from "../template/guominshi";
import yongyaoqk from "../template/yongyaoqk";
import jubuzhengzhuang from "../template/jubuzhengzhuang";
import shenzhiqk from "../template/shenzhiqk";
import zhitiqk from "../template/zhitiqk";
import shentizz from "../template/shentizz";
import Https from "../utils/https";
import store from "../utils/store";

let H = new Https();

export default {
  components: {
    daoguanqk,
    daoguanshi,
    fuwuxuqiu,
    guominshi,
    yongyaoqk,
    jubuzhengzhuang,
    shenzhiqk,
    zhitiqk,
    shentizz
  },
  props: ["data", "height"],
  data() {
    return {
      radio: 2,
      radio1: "",
      radio2: "",
      radio3: "",
      radio4: "",
      obj: {
        text: "诊前维护评估",
        state: true
      },
      form: {},
      show: false,
      content1: "",
      demo: "",
      nurseData: {},
      left: "",
      array: [],
      fileList1: [],
      uploadFlag: false
    };
  },
  methods: {
    closePage(e, item, key, name) {
      this.fileList1.splice(key, 1);
      wx.showLoading({
        title: "加载中"
      });
      this.fileList1 = [...this.fileList1];
      this.form[name] = this.fileList1[0];
      this.saveData();
      setTimeout(() => {
        wx.hideLoading();
      }, 200);
    },
    //上传图片
    uploadImg(e, key) {
      let that = this;
      this.uploadFlag = true;
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
          }, 1000);
          if (!that.fileList1 || that.fileList1.length <= 0) {
            that.fileList1 = [];
          } else if (that.fileList1.length >= 1) {
            that.$toast("当前仅可上传一张图片,请先删除再上传");
            return;
          }
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > 1) {
            that.$toast("当前仅可上传一张图片");
            return;
          }
          tempFilePaths.forEach(element => {
            that.uploadFile(element, key);
          });
          that.uploadFlag = false;
        },
        fail(err) {}
      });
    },
    uploadFile(element, key) {
      let that = this;
      wx.uploadFile({
        url: that.$img + "/api/upload/uploadFile/6/1", //仅为示例，非真实的接口地址
        filePath: element,
        name: "file",
        success(res) {
          let temp = JSON.parse(res.data);
          if (!that.fileList1 || that.fileList1.length <= 0) {
            that.fileList1 = [];
            that.fileList1.push(temp.data.fileIds);
          } else {
            that.fileList1.push(temp.data.fileIds);
          }
          that.fileList1 = [...that.fileList1];
          that.form[key] = that.fileList1[0];
        },
        fail() {
          that.uploadFile(element);
        }
      });
    },
    cancelRemark(e, name, data, key) {
      this[name] = false;
      this[data] = "";
      this.form[key] = "";
      this.demo = "";
      this.saveData();
    },
    saveRemark(e, name, data, key) {
      setTimeout(() => {
        this[name] = false;
        this[data] = this.demo;
        this.form[key] = this.demo;
        this.saveData();
      }, 300);
    },
    showDialog(e, name) {
      this[name] = true;
    },
    onChange(e, value, key) {
      this[value] = e.mp.detail;
      this.form[key] = e.mp.detail;
      this.saveData();
    },
    hasInput(e, name) {
      this[name] = e.mp.detail.value;
      this.saveData();
    },
    //单选
    radioChange(value) {
      let data = Object.entries(value);
      this.form[data[0][0]] = JSON.stringify(data[0][1]);
      this.saveData();
    },
    upload(value) {
      if (value.key == "skinImgs") {
        if (value.value.length == 1) {
          this.form["skinInjuryImgOne"] = value.value[0];
        }
        if (value.value.length == 2) {
          this.form["skinInjuryImgTwo"] = value.value[1];
        }
      } else {
        this.form[value.key] = value.value;
      }
    },
    //多选框
    checkboxChange(value) {
      this.form[value.name] = JSON.stringify(value.data);
      this.saveData();
    },
    checkboxChange1(value) {
      this.form[value.name] = value.data;

      this.saveData();
    },
    //点击加号
    rankChange(value) {
      let data = Object.entries(value);
      this.form[data[0][0]] = data[0][1];
      this.saveData();
    },
    //输入框
    inputChange(value) {
      let data = Object.entries(value);
      this.form[data[0][0]] = data[0][1];
      this.saveData();
    },
    //无 有 切换
    flagChange(value) {
      let data = Object.entries(value);
      this.form[data[0][0]] = data[0][1];
      this.saveData();
    },
    //疼痛选择
    painLevel(value) {
      this.form["painLevel"] = value;
      this.saveData();
    },
    //下拉选择
    pickerChange(value) {
      let data = Object.entries(value);
      this.form[data[0][0]] = data[0][1];
      this.saveData();
    },
    save() {
      this.form.placement = this.radio1 || 1;   //默认加一个空
      this.form.orderNo = this.orderNo;
      this.$emit("zhenqian", this.form);
      this.saveData();
    },
    init() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.selectAppraiseInfo(header, "post", this.orderNo, res => {
        if (res.data.code == 0) {
          this.left = res.data.data;
          if (Object.keys(this.left).length > 0) {
            setTimeout(() => {
              this.filterData(this.left);
            }, 100);
          } else {
            let temp = store.state.oldData;
            if (temp && Object.keys(temp).length > 0) {
              this.filterData(temp);
            }
          }
        } else {
          let temp = store.state.oldData;
          if (temp && Object.keys(temp).length > 0) {
            this.filterData(temp);
          }
          // this.$toast(`${res.data.message}`);
        }
      });
    },
    filterData(temp) {
      // this.radio = 2;
      this.radio1 = "";
      this.radio2 = "";
      this.radio3 = "";
      this.radio4 = "";
      let data = Object.assign({}, temp);
      this.form = data;
      // this.radio = String(data.haveCatheter) || "";
      this.array[0] = {
        catheterType: data.catheterType || "",
        position: data.position || "",
        vein: data.vein || ""
      };
      this.radio1 = String(data.placement) || "";
      this.array[1] = {
        placementType: data.placementType || ""
      };
      this.array[2] = {
        catheterAccendant: data.catheterAccendant || "",
        neopathy: data.neopathy || ""
      };
      this.radio2 = String(data.haveAllergy) || "";
      this.array[3] = {
        allergyType: data.allergyType || ""
      };

      (this.radio3 = String(data.haveDrug) || ""),
        (this.array[4] = {
          drugType: data.drugType || ""
        });
      this.array[5] = {
        catheterDamaged: data.catheterDamaged || "",
        inFracture: data.inFracture || "",
        outFracture: data.outFracture || "",
        catheterEmerge: data.catheterEmerge || "",
        emergeLen: data.emergeLen || "",
        emergeLevel: data.emergeLevel || "",
        haveZwh: data.haveZwh || "",
        length: data.length || "",
        wide: data.wide || "",
        area: data.area || "",
        zwhLevel: data.zwhLevel || "",
        haveSwelling: data.haveSwelling || "",
        armCircumference: data.armCircumference || "",
        armCircumferenceLevel: data.armCircumferenceLevel || "",
        legCircumference: data.legCircumference || "",
        legCircumferenceLevel: data.legCircumferenceLevel || "",
        bodyPain: data.bodyPain || "",
        painLevel: data.painLevel || "",
        description: data.description || "",
        isSkinInjury: data.isSkinInjury || "",
        skinInjury: data.skinInjury || "",
        skinInjuryImgOne: data.skinInjuryImgOne || "",
        skinInjuryImgTwo: data.skinInjuryImgTwo || ""
      };
      this.array[6] = {
        mindCondition: data.mindCondition || "",
        coordinateCondition: data.coordinateCondition || ""
      };
      this.radio4 = String(data.limbsActivityObstacle) || "";
      this.array[7] = {
        limbsPosition: data.limbsPosition || ""
      };
      this.array[8] = {
        haveHeat: data.haveHeat || "",
        axilTemp: data.axilTemp || "",
        browTemp: data.browTemp || "",
        anhelation: data.anhelation || "",
        breathe: data.breathe || "",
        windPain: data.windPain || "",
        windPosition: data.windPosition || "",
        windTime: data.windTime || "",
        hemoptysis: data.hemoptysis || "",
        pigment: data.pigment || "", //颜色
        bulk: data.bulk || "", //量（单位ml）
        bloodPressure: data.bloodPressure || "", //血压
        systolicPressure: data.systolicPressure || "", //收缩压（mmHh）
        diastolicPressure: data.diastolicPressure || "", //舒张压（mmHh）
        pulse: data.pulse || "", //脉搏
        pulseRate: data.pulseRate || "" //脉搏频率  次/分钟
      };
      this.fileList1 = [];
      data.beforeDiagnosisImg && this.fileList1.push(data.beforeDiagnosisImg);
      this.content1 = data.remark || ""; //其他备注
      this.saveData();
    },
    saveData() {
      store.commit("saveOldata", this.form);
    },
    initPage() {
      this.orderNo = store.state.orderNo;
      this.nurseData = wx.getStorageSync("nurseData");
      this.init();
    }
  },
  mounted() {
    console.log("pref");
    // Object.assign(this.$data, this.$options.data.call(this));
    this.initPage();
  },
  onUnload() {
    store.commit("changeOldOrder", this.orderNo);
    this.saveData();
  }
  // onShow() {
  //   if (!this.uploadFlag) {
  //     Object.assign(this.$data, this.$options.data.call(this));
  //     this.initPage();
  //   }
  // }
};
</script>

<style scoped>
.rank {
  display: flex;
  flex-direction: row;
  padding: 0 0.6rem;
}
.rank > .twoRank {
  margin-left: 0.2rem;
  width: 0.8rem;
  height: 0.64rem;
  line-height: 0.64rem;
  text-align: center;
  color: #ccc;
  font-size: 0.6rem;
  border: 0.01rem solid #ccc;
}
.threeRank {
  margin-left: 0.2rem;
  width: 0.8rem;
  height: 0.64rem;
  line-height: 0.64rem;
  text-align: center;
  color: white;
  font-size: 0.3rem;
  background-color: #4ba4fe;
  /* border: 0.01rem solid #ccc; */
}

.bz {
  padding-bottom: 0.2rem;
}
.bz > p {
  padding: 0.34rem 0 0.39rem 0.34rem;
}
.imgBox {
  width: 100%;
  margin-top: 30rpx;
  flex-wrap: wrap !important;
}
.text {
  width: 5.9rem;
  height: 2rem;
  margin: 0 auto;
  border: 0.01rem solid #ccc;
  color: #3ca1ff;
  font-size: 30rpx;
}

.relative {
  position: relative;
}
.containerLogin {
  width: 100%;
  /* height: 100%; */
  overflow-x: hidden;
  overflow-y: auto;
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
/* 导管类型 */
.catheterType {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
  display: flex;
  font-size: 30rpx;
  color: #313233;
}
.conduitType {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60%;
  flex-wrap: wrap;
  margin-left: 0.89rem;
}
.conduitType > van-radio {
  width: 50%;
  font-size: 0.3rem;
  color: #313233;
}
.conduitType > van-radio:last-child {
  margin-top: 0.4rem;
}
.site > .flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 0.72rem;
}
.site > .p2 {
  margin: 0.62rem 0 0.28rem 0;
}
.site >>> .van-button--normal {
  width: 480rpx;
}
.site {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
}
.site {
  position: relative;
}
.zgBtn {
  width: 4.8rem;
  height: 0.72rem;
  line-height: 0.72rem;
  border: 2px solid rgba(230, 230, 230, 1);
  border-radius: 0.36rem;
  text-align: center;
  margin: 0.2rem auto 0;
}
/* 维护时间，维护原因 */
.border {
  border-bottom: 0.01rem solid #e6e6e6;
}
.btn {
  padding-bottom: 55px;
  background-color: white;
}
p {
  font-size: 0.3rem;
  color: #313233;
}
.submit,
.return {
  text-align: center;
  margin: 0.2rem 0.55rem;
  height: 0.9rem;
  border-radius: 0.45rem;
  line-height: 0.9rem;
}
.img {
  width: 238rpx !important;
  height: 240rpx !important;
  margin-left: 20prx;
}
.submit {
  margin-top: 0.2rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  color: white;
}
</style>
