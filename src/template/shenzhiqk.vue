<template>
  <div>
    <div class="catheterType" style="border-bottom:0px;">
      <p>
        神志状况
        <span
          style="color:#3CA1FF;margin-left:100rpx;"
          @click="cancel($event,'check1','name')"
        >{{name}}</span>
      </p>
      <baseRadio @radioChange="radioChange" v-if="!check1" :name="'check1'" :data="data"></baseRadio>
    </div>
    <div class="catheterType" style="padding-top:0px;">
      <p>
        配合情况
        <span
          style="color:#3CA1FF;margin-left:100rpx;"
          @click="cancel1($event,'radio','name1','coordinateCondition')"
        >{{name1}}</span>
      </p>
      <van-radio-group
        class="conduitType"
        :value="radio"
        v-if="!radio"
        @change="onChange($event,'radio','coordinateCondition')"
      >
        <van-radio :name="1">配合</van-radio>
        <van-radio :name="2">不配合</van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
import baseRadio from "./baseRadio";
export default {
  components: { baseRadio },
  props: ["data", "oldData"],
  data() {
    return {
      check1: "",
      radio: "",
      name: "",
      name1: ""
    };
  },
  methods: {
    radioChange(value) {
      this[value[1]] = value[0];
      if (value[1] == "check1") {
        this.data.forEach(el => {
          if (el.id == value[0]) {
            this.name = el.val;
            this.$emit("radioChange", {
              mindCondition: { val: el.val, id: el.id }
            });
          }
        });
      }
    },

    onChange(e, name, key) {
      this[name] = e.mp.detail;
      e.mp.detail == 1 ? (this.name1 = "配合") : (this.name1 = "不配合");
      let data = {};
      data[key] = e.mp.detail;
      this.$emit("flagChange", data);
    },

    cancel(e, name, key) {
      this[name] = "";
      this[key] = "";
      let data = {};
      data["mindCondition"] = {};
      this.$emit("radioChange", data);
    },
    cancel1(e, name, key) {
      this[name] = "";
      this[key] = "";
      let data = {};
      data["coordinateCondition"] = {};
      this.$emit("flagChange", data);
    },
    initPage() {
      setTimeout(() => {
        if (this.oldData && Object.keys(this.oldData).length > 0) {
          let data = Object.assign({}, this.oldData);
          let mindCondition =
            data.mindCondition && JSON.parse(data.mindCondition);
          this.radioChange([mindCondition.id, "check1"]);
          this.radio =
            (data.coordinateCondition && String(data.coordinateCondition)) ||
            "";
          if (this.radio)
            this.radio == 1 ? (this.name1 = "配合") : (this.name1 = "不配合");
        }else{
          Object.assign(this.$data, this.$options.data.call(this));
        }
      }, 500);
    }
  },
  mounted() {
    this.initPage()
  },
  onShow() {
    this.initPage()
  }
};
</script>

<style scoped>
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
</style>