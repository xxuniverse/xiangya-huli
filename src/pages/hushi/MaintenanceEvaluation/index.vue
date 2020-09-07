<template>
  <div class="containerLogin">
    <div>
      <frames :obj="obj" @close1="goback" :show="true"></frames>
      <div class="section" :style="{ height: dataHeigth + 'px', top: headHeigth + 'px' }">
        <div class="sect_container">
          <div class="hint">
            <p>导管录入</p>
          </div>
          <div class="catheterType">
            <p>
              1、导管类型
              <span
                class="message"
                @click="hasRadioCancel($event, 'radio', 'catheterType')"
              >{{ nameObj["radio"] }}</span>
            </p>
            <div v-if="!radio">
              <van-radio-group
                class="conduitType"
                :value="radio"
                @change="onChange($event, 'radio', 'catheterType', 0)"
              >
                <van-radio
                  :name="item.id"
                  v-for="(item, index) in arr[0]"
                  :key="index"
                >{{ item.val }}</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div class="standards">
            <p>
              2、导管规格
              <span
                class="message"
                @click="hasRadioCancel($event, 'radio1', 'catheterNorms')"
              >{{ nameObj["radio1"] }}</span>
            </p>
            <div v-if="!radio1">
              <van-radio-group
                class="conduitType"
                :value="radio1"
                @change="onChange($event, 'radio1', 'catheterNorms', 8)"
              >
                <van-radio
                  :name="item.id"
                  v-for="(item, index) in arr[8]"
                  :key="index"
                >{{ item.val }}</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div class="site">
            <p>
              3、置管地点
              <span
                class="message"
                @click="hasRadioCancel($event, 'radio2', 'placementAddr')"
              >{{ nameObj["radio2"] }}</span>
            </p>
            <div v-if="!radio2">
              <van-radio-group
                class="conduitType"
                :value="radio2"
                @change="onChange($event, 'radio2', 'placementAddr', 9)"
              >
                <van-radio
                  :name="item.id"
                  v-for="(item, index) in arr[9]"
                  :key="index"
                >{{ item.val }}</van-radio>
                <input
                  style="position: absolute;top: 35px;right: 0px;width: 204rpx;border-bottom: 1px solid  #e6e6e6;z-index:999"
                  @change.stop="hasInput1($event, 'placementAddr')"
                />
              </van-radio-group>
            </div>
          </div>
          <div class="Time">
            <p>
              4、置管时间
              <span
                class="message"
                v-if="date"
                @click="hasInfoCancel($event, 'date', 'placementTime')"
              >{{ date }}</span>
            </p>
            <picker v-if="!date" mode="date" :value="date" @change="bindDateChange">
              <view class="picker picBorder">
                {{ date }}
                <span class="rote">
                  <van-icon name="play" />
                </span>
              </view>
            </picker>
          </div>
          <!-- 管制部位 -->
          <div class="hint">
            <p>置管部位</p>
          </div>
          <div class="site">
            <p>
              1、穿刺部位
              <span class="message" v-if="str" @click="hasCancelSave($event, 0, 'position')">
                <!-- {{ position == 1 ? "左侧" : "右侧" }}
                <span class="message">
                  {{ array[indexArr[0]] }}
                </span>-->
                {{str}}
              </span>
            </p>

            <div v-if="!str">
              <van-radio-group
                class="controlSite"
                :value="position"
                @change="changeTitle($event, 'position')"
              >
                <van-radio :name="1">左侧</van-radio>
                <picker
                  class="backInput3"
                  @change="bindPickerChange($event, 0)"
                  :value="indexArr[0]"
                  :range="array"
                  v-if="position == 1"
                >
                  <view class="picker picBorder">
                    {{ array[indexArr[0]] }}
                    <span class="rote">
                      <van-icon name="play" />
                    </span>
                  </view>
                </picker>
                <van-radio :name="2">右侧</van-radio>
                <!-- <input type="text" class="backInput" /> -->
                <picker
                  class="backInput2"
                  @change="bindPickerChange($event, 0)"
                  :value="indexArr[0]"
                  :range="array"
                  v-if="position == 2"
                >
                  <view class="picker picBorder">
                    {{ array[indexArr[0]] }}
                    <span class="rote">
                      <van-icon name="play" />
                    </span>
                  </view>
                </picker>
              </van-radio-group>
              <div class="zgBtn" @click="submit(0, 'position')">确定</div>
            </div>
          </div>
          <div class="catheterType">
            <p>
              2、穿刺血管
              <span
                class="message"
                @click="hasRadioCancel($event, 'radio3', 'punctureBlood')"
              >{{ nameObj["radio3"] }}</span>
            </p>

            <div v-if="!radio3">
              <van-radio-group
                class="conduitType"
                :value="radio3"
                @change="onChange($event, 'radio3', 'punctureBlood', 10)"
              >
                <van-radio
                  :name="item.id"
                  v-for="(item, index) in arr[10]"
                  :key="index"
                >{{ item.val }}</van-radio>
                <input
                  style="position: absolute;bottom: 10rpx;right: 0px;width: 204rpx;border-bottom: 1px solid  #e6e6e6;z-index:999;"
                  @change.stop="hasInput1($event, 'punctureBlood')"
                />
              </van-radio-group>
            </div>
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
            <input
              class="borderB"
              type="text"
              :value="objData['leftArm']"
              @change="hasInput($event, 'leftArm')"
            />
            <span>cm</span>
          </div>
          <div>
            <span>右上臂/腿</span>
            <input
              class="borderB"
              type="text"
              :value="objData['rightArm']"
              @change="hasInput($event, 'rightArm')"
            />
            <span>cm</span>
          </div>
        </div>
        <!-- 导管置入体内长度 -->
        <div class="length">
          <p>2、导管置入体内长度</p>
          <div>
            <input
              class="borderB lengthWidth"
              type="text"
              :value="objData['inLength']"
              @change="hasInput($event, 'inLength')"
            />
            <span>cm</span>
          </div>
        </div>
        <!-- 3、导管体外长度 -->
        <div class="length">
          <p>3、导管体外长度</p>
          <div>
            <input
              class="borderB lengthWidth"
              type="text"
              :value="objData['outLength']"
              @change="hasInput($event, 'outLength')"
            />
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
            <span class="message" v-if="title">{{ title == 1 ? "无" : title == 2 ? "有" : "" }}</span>
          </p>
          <van-radio-group
            class="controlSite"
            :value="title"
            @change="changeTitle($event, 'title')"
          >
            <van-radio :name="1">无</van-radio>
            <van-radio :name="2">有</van-radio>
          </van-radio-group>
        </div>

        <controlSite v-if="title == 2" :messageData="messageData"></controlSite>

        <!-- 护理 -->
        <div class="hint">
          <p>护理</p>
        </div>
        <div class="site border">
          <p>1、护理</p>
          <!-- 多选按钮 -->
          <div class="flex-c" style="width:100%;flex-wrap:wrap;" v-if="flag" @click="cancalsave">
            <div
              v-for="(item, index) in textData"
              :key="index"
              class="message"
              style="width:100%;color:#3CA1FF;margin-top:10px;"
            >{{ item }}</div>
          </div>

          <div v-if="!flag">
            <checkbox-group @change="checkboxChange($event, 'myCheck')" class="check">
              <label class="checkbox2" v-for="(item, index) of items2" :key="index">
                <view>
                  <!-- :checked='!!itmes2[index]' -->
                  <checkbox :value="item.id" />
                  {{ item.val }}
                </view>

                <picker
                  v-if="item.id == 1"
                  class="backInput5"
                  @change="bindPickerChange($event, 1)"
                  :value="indexArr[1]"
                  :range="content"
                >
                  <view class="picker picBorder" style="color:#3CA1FF;">
                    {{ content[indexArr[1]] }}
                    <span class="rote">
                      <van-icon name="play" />
                    </span>
                  </view>
                </picker>

                <picker
                  v-if="item.id == 2"
                  class="backInput6"
                  @change="bindPickerChange($event, 2)"
                  :value="indexArr[2]"
                  :range="content2"
                >
                  <view class="picker picBorder" style="color:#3CA1FF;">
                    {{ content2[indexArr[2]] }}
                    <span class="rote">
                      <van-icon name="play" />
                    </span>
                  </view>
                </picker>

                <picker
                  v-if="item.id == 3"
                  class="backInput6"
                  @change="bindPickerChange($event, 3)"
                  :value="indexArr[3]"
                  :range="content1"
                >
                  <view class="picker picBorder" style="color:#3CA1FF;">
                    {{ content1[indexArr[3]] }}
                    <span class="rote">
                      <van-icon name="play" />
                    </span>
                  </view>
                </picker>
              </label>
            </checkbox-group>
          </div>
        </div>
        <div class="whTime border relative">
          <p>
            2、维护时间
            <span v-if="flag" @click="cancalsave" class="message">{{ time }}</span>
          </p>

          <div v-if="!flag">
            <picker
              class="backInput7"
              @change="selectTime($event, 'time')"
              :value="time"
              mode="date"
            >
              <view class="picker picBorder" style="color:#3CA1FF;">
                {{ time }}
                <span class="rote">
                  <van-icon name="play" />
                </span>
              </view>
            </picker>
          </div>
        </div>

        <div class="whY border relative">
          <p>
            3、维护原因
            <span v-if="flag" @click="cancalsave" class="message">{{ reason[indexArr[4]] }}</span>
          </p>

          <picker
            class="backInput8"
            @change="bindPickerChange($event, 4)"
            :value="indexArr[4]"
            :range="reason"
            v-if="!flag"
          >
            <view class="picker picBorder" style="color:#3CA1FF;">
              {{ reason[indexArr[4]] }}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
        </div>
        <div class="zgBtn1" @click="submitNurse" v-if="!flag">确定</div>

        <div class="hint">
          <p>维护后图片</p>
        </div>
        <div class="site">
          <div style="width:100%; " class="flex-c">
            <van-button round @click="uploadImg($event,'afterMaintenanceImg')">上传图片</van-button>
          </div>

          <div class="flex-s imgBox">
            <div style="position: relative" v-for="(item,index) in fileList" :key="index">
              <van-icon name="close" class="closeIcon" @click="closePage($event,item,index)" />
              <img :src="item" class="img" />
            </div>
          </div>
        </div>

        <!-- 护士签名 -->
        <div class="hint">
          <p>护士签名</p>
        </div>

        <div class="signature">
          <img :src="nurseData.signImg" v-if="nurseData.signImg" alt />
        </div>

        <div class="btn" @click="confirm">
          <div class="submit">保存</div>
        </div>
        <van-toast id="van-toast"></van-toast>
        <van-dialog id="van-dialog"></van-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Https from "../../../utils/https";
import controlSite from "./controlSite";
import Dialog from "../../../../static/vant/dist/dialog/dialog";
import dayjs from "dayjs";
let H = new Https();

export default {
  components: { frames, controlSite },
  data() {
    return {
      date: "", //日期
      array: ["上肢", "肘关节", "肘关节下", "下肢"],
      index: 0,
      radio: "1",
      show: false,
      obj: {
        text: "维护评估记录",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      orderNo: "",
      items2: [
        // 并发症状
        // { id: "1", val: "皮肤消毒" },
        { id: 1, val: "更换贴膜" },
        { id: 2, val: "冲洗导管" },
        { id: 3, val: "更换接头" }
      ],
      nurseData: {},
      content: ["4008", "4007", "Hp9534", "Hp9546",'薄型泡沫敷料'],
      content1: [
        "一次性使用肝素帽",
        "透明无针",
        "正压接头",
        "分隔膜无针密封式输液接头",
        "恒压接头",
        "输液接头及附件",
        "其他"
      ],
      content2: ["生理盐水", "5%葡萄糖注射剂", "药物专用溶剂"],
      myCheck: [],
      arr: [],
      radio: "",
      radio1: "",
      radio2: "",
      radio3: "",
      nameObj: {},
      objData: {},
      position: "",
      indexArr: ["", "", "", "", "", "", "", "", "", ""],
      flagArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      title: "",
      messageData: [], //并发症类型数据列表
      time: "", //护理时间
      reason: [], //原因列表
      textData: [],
      placementAddr: "",
      form: {},
      str: "",
      bingfa: [],
      fileList: [],
      uploadFlag: false,
      flag: false
    };
  },
  methods: {
    closePage(e, item, key) {
      this.fileList.splice(key, 1);
      wx.showLoading({
        title: "加载中"
      });
      this.fileList = [...this.fileList];
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
          if (!that.fileList || that.fileList.length <= 0) {
            that.fileList = [];
          } else if (that.fileList.length >= 1) {
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
        fail(err) {
          console.log(err);
        }
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
          if (!that.fileList || that.fileList.length <= 0) {
            that.fileList = [];
            that.fileList.push(temp.data.fileIds);
          } else {
            that.fileList.push(temp.data.fileIds);
          }
          that.fileList = [...that.fileList];
          that.objData[key] = that.fileList[0];
        },
        fail() {
          that.uploadFile(element);
        }
      });
    },
    hasInput1(e, name) {
      this[name] = e.mp.detail.value;
      this.saveData();
    },
    hasRadioCancel(e, name, key) {
      this[key] = "";
      this[name] = "";
      this.nameObj[name] = "";
      delete this.objData[key];
      this.saveData();
    },
    hasInfoCancel(e, name, key) {
      this[name] = "";
      delete this.objData[key];
      this.saveData();
    },
    cancalsave(e, name) {
      this.objData["nursingCare"] && (this.objData["nursingCare"] = "");
      this.objData["defendTime"] && (this.objData["defendTime"] = "");
      this.objData["defendReason"] && (this.objData["defendReason"] = "");
      this.flag = false;

      this.objData = Object.assign({}, this.objData);
      this.textData = [];
      console.log(this.objData);

      this.saveData();
    },
    hasCancelSave(e, index, name) {
      this.str = "";
      this[name] = "";
      this.flagArr[index] = 0;
      delete this.objData[name];
      if (this.objData["right"]) {
        delete this.objData["right"];
      }
      if (this.objData["left"]) {
        delete this.objData["left"];
      }
      this.saveData();
    },
    onChange(e, name, key, index) {
      if (key == "placementAddr" && e.mp.detail == 102) {
        this[name] = this.placementAddr;
      } else if (key == "punctureBlood" && e.mp.detail == 118) {
        this[name] = this.punctureBlood;
      } else {
        this[name] = e.mp.detail;
      }

      this.arr[index].forEach(el => {
        if (el.id == e.mp.detail) {
          if (key == "placementAddr" && e.mp.detail == 102) {
            this.nameObj[name] = this.placementAddr;
            this.objData[key] = JSON.stringify({
              id: el.id,
              val: this.placementAddr
            });
          } else if (key == "punctureBlood" && e.mp.detail == 118) {
            this.nameObj[name] = this.punctureBlood;
            this.objData[key] = JSON.stringify({
              id: el.id,
              val: this.punctureBlood
            });
          } else {
            this.nameObj[name] = el.val;
            this.objData[key] = JSON.stringify({
              id: el.id,
              val: el.val
            });
          }
        }
      });
      this.saveData();
    },
    bindDateChange(e) {
      this.date = e.mp.detail.value;
      this.objData["placementTime"] = this.date + " 00:00:00";
      this.saveData();
    },
    //
    bindPickerChange(e, name) {
      this.indexArr[name] = e.mp.detail.value;
      let temp = [...this.flagArr];
      this.flagArr = [];
      this.flagArr = [...temp];

      this.saveData();
    },
    //选择有或无
    changeTitle(e, name) {
      this[name] = e.mp.detail;
      this.objData["neopathy"] = e.mp.detail;
      this.saveData();
    },
    //  置管位置 确定
    submit(index, name) {
      this.flagArr[index] = 1;
      let temp = [...this.flagArr];
      this.flagArr = [];
      this.flagArr = [...temp];

      let str = this.position == 1 ? "左侧" : "右侧";
      str += this.array[this.indexArr[index]];

      let str1 = this.position == 1 ? "left" : "right";
      this.str = str;
      this.objData[str1] = str;
      this.saveData();
    },
    goback() {
      wx.navigateBack({
        delta: 1
      });
    },
    //多选
    checkboxChange(e, name) {
      this[name] = e.mp.detail.value;
      this.saveData();
    },
    //维护时间
    selectTime(e, name) {
      this[name] = e.mp.detail.value;
      this.saveData();
    },
    submitNurse() {
      console.log(123);
      
      let data = ["", "", "", ""];
      let arr = [];
      if (this.myCheck.length > 0) {
        this.myCheck.forEach(el => {
          // if (el == 1) {
          //   data[0] = "皮肤消毒";
          //   arr.push({
          //     id: 1,
          //     val: "皮肤消毒"
          //   });
          // }
          if (el == 1) {
            data[0] = "更换贴膜" + " " + this.content[this.indexArr[1]];
            arr.push({
              id: 1,
              val: "更换贴膜",
              content: this.content[this.indexArr[1]]
            });
          }
          if (el == 2) {
            data[1] = "冲洗导管" + " " + this.content2[this.indexArr[2]];
            arr.push({
              id: 2,
              val: "冲洗导管",
              content: this.content2[this.indexArr[2]]
            });
          }

          if (el == 3) {
            data[2] = "更换接头" + " " + this.content1[this.indexArr[3]];
            arr.push({
              id: 3,
              val: "更换接头",
              content: this.content1[this.indexArr[3]]
            });
          }
        });
        this.textData = data;
        this.objData["nursingCare"] = JSON.stringify(arr);
      }
      if (this.time) {
        let arr = this.time
          .replace(" ", ":")
          .replace(/\:/g, "-")
          .split("-");
        this.objData["defendTime"] = JSON.stringify({
          year: arr[0],
          month: arr[1],
          day: arr[2]
        });
      }
      this.arr[11].forEach(el => {
        if (el.val == this.reason[this.indexArr[4]]) {
          this.objData["defendReason"] = JSON.stringify(el);
        }
      });
      this.saveData();

      this.flag = true;
    },
    getData() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      //获取常量数据
      H.selectSysConstant(header, "get", "", res => {
        if (res.data.code == 0) {
          this.filterData(res.data.data);
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
      //获取并发症数据
      H.selectComplicationList(header, "get", "", res => {
        if (res.data.code == 0) {
          this.messageData = res.data.data;
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
      //获取护士签名
      H.getUserInfo(header, "get", "", res => {
        if (res.data.code == 0) {
          this.nurseData.signImg = res.data.data.signImg;
          wx.setStorageSync("nurseData", this.nurseData);
        } else {
          this.$toast("获取护士签名失败");
        }
      });
    },
    getBeforeData() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.getDefendEstimatInfo(header, "get", this.orderNo, res => {
        if (res.data.code == 0) {
          if (Object.values(res.data.data.estimateInfo).length > 0) {
            this.filterEstimateInfo(res.data.data.estimateInfo);
          } else {
            let temp = store.state.weihuData;
            if (temp && Object.keys(temp).length > 0) {
              this.filterEstimateInfo(temp);
            }
          }

          if (res.data.data.infoList.length > 0) {
            this.filterInfoList(res.data.data.infoList);
          } else {
            let arr = store.state.saveData;
            if (arr && arr.length > 0) {
              this.filterInfoList(arr);
              return;
            }
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    filterEstimateInfo(data) {
      this.nameObj["radio"] =
        data.catheterType && JSON.parse(data.catheterType).val;
      if (this.nameObj["radio"]) this.radio = 2;
      this.nameObj["radio1"] =
        data.catheterNorms && JSON.parse(data.catheterNorms).val;
      if (this.nameObj["radio1"]) this.radio1 = 2;
      this.nameObj["radio2"] =
        data.placementAddr && JSON.parse(data.placementAddr).val;
      if (this.nameObj["radio2"]) this.radio2 = 2;
      this.date =
        data.placementTime && dayjs(data.placementTime).format("YYYY-MM-DD"); //置管时间
      this.nameObj["radio3"] =
        data.punctureBlood && JSON.parse(data.punctureBlood).val;
      if (this.nameObj["radio3"]) this.radio3 = 2;

      this.objData["leftArm"] = data.leftArm && data.leftArm;
      this.objData["rightArm"] = data.rightArm && data.rightArm;
      this.objData["outLength"] = data.outLength && data.outLength;
      this.objData["inLength"] = data.inLength && data.inLength;
      // 诊后照片
      data.afterMaintenanceImg && this.fileList.push(data.afterMaintenanceImg);

      if (data.left) {
        this.str = data.left;
      } else {
        this.str = data.right;
      }

      this.nameObj = Object.assign({}, this.nameObj);

      let demo = data.nursingCare && JSON.parse(data.nursingCare);
      if (demo && demo.length > 0) {
        this.textData = demo.map(el => {
          return el.val+":"+el.content;
        });
        if (this.textData.length > 0)
          this.objData["nursingCare"] = data.nursingCare;
        this.flag = true;
      }

      let temp = data.defendTime && JSON.parse(data.defendTime);
      if (temp && Object.keys(temp).length > 0) {
        this.time = temp.year + "-" + temp.month + "-" + temp.day;
        this.objData["defendTime"] = temp;
      }
      let obj = data.defendReason && JSON.parse(data.defendReason);
      if (obj && Object.keys(obj).length > 0) {
        this.reason.forEach((el, index) => {
          if (el == obj.val) {
            this.indexArr[4] = index;
            this.indexArr = [...this.indexArr];
            this.objData["defendReason"] = this.reason[this.indexArr[4]];
          }
        });
      }
      this.title = String(data.neopathy) || "";
      this.objData = Object.assign({}, data);
    },
    filterInfoList(data) {
      data.forEach(element => {
        store.commit("hasSaveSelectType", element);
      });
    },
    confirm() {
      if (this.nurseData.signImg) {
        let header = {
          "content-type": "application/json",
          "API-User-Token": this.nurseData.token
        };
        this.objData.signPicture = this.nurseData.signImg;
        this.objData.orderNo = this.orderNo;
        let data = {};
        let arr = store.state.saveData;
        if (arr.length > 0) {
          data["infoList"] = arr;
        } else {
          data["infoList"] = [];
        }
        data["estimateInfo"] = this.objData;
        H.saveOrUpdateDefendEstimatInfo(header, "post", data, res => {
          if (res.data.code == 0) {
            this.$toast(`评估记录完成`);
            wx.navigateBack({
              delta: 1
            });
          } else {
            this.$toast(`${res.data.message}`);
          }
        });
      } else {
        this.$toast("请先在后台上传护士签名");
      }
    },
    filterData(data) {
      this.arr = [];
      let len = data[data.length - 1].type;
      for (let index = 0; index < len; index++) {
        this.arr.push([]);
      }
      data.forEach(el => {
        this.arr[Number(el.type) - 1].push(el);
      });
      this.filterReason(this.arr[11]);
    },
    filterReason(data) {
      data.forEach(element => {
        this.reason.push(element.val);
      });
    },
    hasInput(e, name) {
      this[name] = e.mp.detail.value;
      this.objData[name] = this[name];
      this.saveData();
    },
    saveData() {
      store.commit("changeWeihuData", this.objData);
    },
    initPage() {
      this.nurseData = wx.getStorageSync("nurseData");
      this.orderNo = store.state.orderNo;
      this.getData();
      this.getBeforeData();
    }
  },
  onUnload() {
    store.commit("changeOldOrder", this.orderNo);
    this.saveData();
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data.call(this));
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
    this.initPage();
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
  font-size: 30 rpx;
  margin-left: 100 rpx;
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
/* 管制时间 */
.picBorder {
  height: 0.72rem;
  font-size: 0.3rem;
  color: #999999;
  text-align: center;
  line-height: 0.72rem;
  border: 0.01rem solid #e6e6e6;
}
.imgBox {
  width: 100%;
  margin-top: 30rpx;
  flex-wrap: wrap !important;
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
  font-size: 30 rpx;
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
  height: 327rpx;
  border: 0.02rem solid #e6e6e6;
}

.signature > img {
  width: 100%;
  height: 100%;
}
.img {
  width: 238rpx !important;
  height: 240rpx !important;
  margin-left: 20prx;
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
