<template>
  <!-- <div class="containerLogin" :style="{height:screenHeight-tabbarHeight+'px'}">
  <frames :obj="obj"></frames>-->
  <!-- <designate :displayNone="displayNone"></designate> -->
  <div>
    <div class="nav" :style="{top:headHeigth+'px'}">
      <div
        :class="[boderBottom?'waitingList nav_border_bottom':'waitingList spanColor']"
        @click="waitingList"
      >
        <span>待指派</span>
        <div class="red_waitingList"></div>
      </div>
      <div
        :class="[boderBottom_1?'underWay nav_border_bottom':'underWay spanColor']"
        @click="underWay"
      >
        <span>已指派</span>
        <div class="red_underWay none"></div>
      </div>
    </div>
    <div class="seaction" :style="{height: dataHeigth-tabbarHeight-46+'px',top:headHeigth+46+'px'}">
      <orderFormData :orderFormData="orderFormData"></orderFormData>
      <orderFormData :orderFormData="orderFormData_2"></orderFormData>
      <!-- <orderFormData :orderFormData="orderFormData_3"></orderFormData> -->
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import store from "@/utils/store";
import frames from "@/components/frames";
import orderFormData from "@/components/orderFormData";
export default {
  components: { frames, orderFormData },
  data() {
    return {
      displayNone: true,
      boderBottom: true,
      boderBottom_1: false,
      boderBottom_2: false,
      obj: {
        text: "订单",
        state: false
      },
      orderFormData: {
        text: "待指派",
        styleTrue: true, //该组件是否显示
        list: [1, 2, 3, 4], //        数据
        btn1: {
          //第一个按钮  text按钮名称 state状态
          text: "返回",
          state: false
        },
        btn2: {
          text: "指派",
          state: true
        }
      },
      orderFormData_2: {
        destroy: true,
        fontColor: "#999999",
        text: "已指派",
        styleTrue: false,
        list: [1, 2, 3, 4], //        数据
        btn1: {
          //第一个按钮  text按钮名称 state状态
          text: "返回",
          state: false
        },
        btn2: {
          text: "开始服务",
          state: false
        }
      },
      headHeigth: 0,
      screenHeight: 0,
      dataHeigth: 0,
      tabbarHeight: 0,
      styleStore: false
    };
  },
  methods: {
    waitingList() {
      this.orderFormData.styleTrue = true;
      this.orderFormData_2.styleTrue = false;
      // this.orderFormData_3.styleTrue = false;
      this.boderBottom = true;
      this.boderBottom_1 = false;
      this.boderBottom_2 = false;
    },
    underWay() {
      this.orderFormData.styleTrue = false;
      this.orderFormData_2.styleTrue = true;
      // this.orderFormData_3.styleTrue = false;
      this.boderBottom = false;
      this.boderBottom_1 = true;
      // this.boderBottom_2 = false;
    }
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
.none {
  display: none;
}
.containerLogin {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* height: 100%; */
}
.nav {
  /* position: absolute;
  left: 0; */
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 41.5px;
  line-height: 41.5px;
  border-bottom: 1px solid #e6e6e6;
  justify-content: space-between;
  /* height: 0.83rem;
  line-height: 0.83rem;
  border-bottom: 0.02rem solid #e6e6e6; */
}
.nav > div {
  position: relative;
  width: 1.6rem;
  /* flex: 1; */
  margin: 0 0.45rem;
  text-align: center;
}
.spanColor {
  color: #626266;
}
.nav > div:nth-child(1) {
  margin-left: 1.08rem;
}
.nav > div:nth-child(2) {
  margin-right: 1.08rem;
}
.red_waitingList,
.red_underWay,
.red_finished {
  position: absolute;
  top: 20%;
  right: 15%;
  width: 0.15rem;
  height: 0.15rem;
  border-radius: 100%;
  background-color: red;
}
.nav_border_bottom {
  border-bottom: 0.04rem solid #3ca1ff;
  padding-bottom: 0.04rem;
  color: #3ca1ff;
}
.seaction {
  position: absolute;
  left: 0;
  background-color: #f2f2f2;
  overflow-y: scroll;
  /* overflow: hidden; */
}
.seaction::-webkit-scrollbar {
  display: none;
}
/* .scroll {
  overflow-y: scroll;
} */
</style>
