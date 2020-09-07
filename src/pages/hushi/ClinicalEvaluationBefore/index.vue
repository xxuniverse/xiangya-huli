<template>
  <div class="wrap">
    <frames :obj="obj" @close1="goback" :show="true"></frames>
    <div class="section" :style="{top:headHeigth+'px'}">
      <van-tabs :active="active" @change="hasChange" v-if="temp">
        <van-tab title="预评估记录" name="0">
          <pree
            :data="arr"
            :orderNo="orderNo"
            @zhenqian="zhenqian"
            :height="dataHeigth"
            :right="right"
          ></pree>
        </van-tab>
        <van-tab title="检验检查结果" name="1">
          <pref :orderNo="orderNo" @objData="objData" :height="dataHeigth" :left="left"></pref>
        </van-tab>
      </van-tabs>
    </div>
    <van-toast id="van-toast"></van-toast>
    <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import pree from "../../../components/pree";
import pref from "../../../components/pref";
import Https from "../../../utils/https";
import Dialog from "../../../../static/vant/dist/dialog/dialog";

let H = new Https();

export default {
  components: { frames, pree, pref },
  data() {
    return {
      obj: {
        text: "诊前预评估",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      data: "",
      arr: [],
      orderNo: "",
      active: "0",
      form: "",
      nurseData: {},
      left: {},
      right: {},
      temp:false
    };
  },
  methods: {
    goback() {
      wx.navigateBack({
        delta: 1
      });
    },
    zhenqian(data) {
      this.form = data;
      this.active = "1";
    },
    objData(value) {
      if (!this.form || Object.keys(this.form).length<=0) {
        Dialog.alert({
          title: "提示",
          message: "请先填写并保存预评估记录"
        }).then(() => {
          // on close
        });
        return;
      } else if (!value || Object.keys(value).length <= 0) {
        Dialog.alert({
          title: "提示",
          message: "请先填写并保存检查结果"
        }).then(() => {
          // on close
        });
        return;
      } else {
        let header = {
          "content-type": "application/json",
          "API-User-Token": this.nurseData.token
        };
        new Promise((rej, err) => {
          H.addOrUpdateDefendInfo(header, "post", this.form, res => {
            if (res.data.code == 0) {
              rej();
            } else {
              Dialog.alert({
                title: "提示",
                message: `${res.data.message}`
              }).then(() => {
                // on close
              });
            }
          });
        }).then(rej => {
          H.saveCheckResultInfo(header, "post", value, res => {
            if (res.data.code == 0) {
              this.$toast("保存成功");
              this.active = "0";
              wx.navigateBack({
                delta: 1
              });
            } else {
              Dialog.alert({
                title: "提示",
                message: `${res.data.message}`
              }).then(() => {
                // on close
              });
              // this.$toast();
            }
          });
        });
      }
    },
    getData() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.selectSysConstant(header, "get", "", res => {
        if (res.data.code == 0) {
          this.data = res.data.data;
          this.filterData(res.data.data);
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
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
    },
    hasChange(e) {
      this.active = e.mp.detail.index;
    }
  },
  onUnload() {
    this.temp = false
  },
  onLoad(options) {
    console.log('home');

    Object.assign(this.$data, this.$options.data.call(this));
    this.nurseData = wx.getStorageSync("nurseData");
    this.orderNo = store.state.orderNo;
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth =
      store.state.screenHeight - store.state.statusBarHeight - 44;
      this.temp = true
    this.getData();
  },
  // onShow() {
  //   this.nurseData = wx.getStorageSync("nurseData");
  //   this.orderNo = store.state.orderNo;
  //   this.getData();
  // }
};
</script>

<style scoped>
.section {
  width: 100%;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.section::-webkit-scrollbar {
  display: none;
}
.section >>> .van-hairline--top-bottom:after {
  border: 0px;
  border-bottom: 2rpx solid #e6e6e6;
}
.section >>> .van-tabs__line {
  background-color: #3ca1ff !important;
}
.section >>> .van-tab--active {
  color: #3ca1ff !important;
}
.section >>> .van-tab {
  font-size: 30rpx !important;
  color: #626266 !important;
}
.wrap {
  overflow: hidden;
  position: absolute;
  top: 0px;
  bottom: 0px;
  height: 100%;
  width: 100%;
}
</style>
