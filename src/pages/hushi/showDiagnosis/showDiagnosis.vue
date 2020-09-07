<template>
  <div>
    <frames :obj="obj"></frames>
    <div class="wrap" :style="{top:height+'px'}">
      <div :v-if="flag">
        <van-tabs :active="active" @change="hasChange">
          <van-tab title="预评估记录">
            <page1 :orderNo="orderNo"></page1>
          </van-tab>
          <van-tab title="检验检查结果">
            <page2 :orderNo="orderNo"></page2>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-toast id="van-toast"></van-toast>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Https from "../../../utils/https";
import page1 from "./page1";
import page2 from "./page2";

let H = new Https();

export default {
  components: {
    frames,
    page1,
    page2
  },
  data() {
    return {
      obj: {
        text: "诊前预评估",
        state: true
      },
      height: "",
      active: "0",
      orderNo: "",
      flag: false
    };
  },
  onLoad(val) {
    Object.assign(this.$data, this.$options.data.call(this));
    this.orderNo = store.state.orderNo
    this.height  = store.state.statusBarHeight;
  }
};
</script>

<style scoped>
.wrap {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
}
.wrap >>> .van-hairline--top-bottom:after {
  border: 0px;
  border-bottom: 2rpx solid #e6e6e6;
}
.wrap >>> .van-tabs__line {
  background-color: #3ca1ff !important;
}
.wrap >>> .van-tab--active {
  color: #3ca1ff !important;
}
.wrap >>> .van-tab {
  font-size: 30rpx !important;
  color: #626266 !important;
}
</style>