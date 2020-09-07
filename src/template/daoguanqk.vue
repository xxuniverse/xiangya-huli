<template>
  <div>
    <div class="site">
      <p>导管类型</p>
      <p
        v-for="(item,index) in choseArr"
        @click="checkboxCancel"
        :key="index"
        style="margin-left:150rpx;color:#3CA1FF"
      >{{item.val}}</p>
      <div v-if="choseArr.length <= 0">
        <baseCheckbox @checkboxChange="checkboxChange" :name="'check1'" :data="data[0]"></baseCheckbox>
        <div class="zgBtn" @click="choose">确定</div>
      </div>
    </div>
    <div class="catheterType">
      <p>
        所在部位
        <span
          style="color:#3CA1FF;margin-left:100rpx;"
          @click="cancelSave($event,'radio1','name','position')"
        >{{name}}</span>
      </p>

      <baseRadio @radioChange="radioChange" v-if="!radio1" :name="'radio1'" :data="data[1]"></baseRadio>
    </div>
    <div class="catheterType">
      <p>
        所在静脉
        <span
          style="color:#3CA1FF;margin-left:100rpx;"
          @click="cancelSave($event,'radio2','name1','catheterType')"
        >{{name1}}</span>
      </p>

      <baseRadio @radioChange="radioChange" v-if="!radio2" :name="'radio2'" :data="data[2]"></baseRadio>
    </div>
  </div>
</template>

<script>
import baseCheckbox from "./baseCheckBox";
import baseRadio from "./baseRadio";
export default {
  components: { baseCheckbox, baseRadio },
  props: ["data", "oldData"],
  data() {
    return {
      radio1: "",
      radio2: "",
      check1: [],
      name: "",
      name1: "",
      choseArr: []
    };
  },
  methods: {
    cancelSave(e, name, key, title) {
      this[name] = "";
      this[key] = "";
      let data = {};
      data[title] = {};
      this.$emit("radioChange", data);
    },
    checkboxChange(value) {
      this[value[1]] = value[0];
    },
    radioChange(value) {
      this[value[1]] = value[0];
      if (value[1] == "radio1") {
        this.data[1].forEach(el => {
          if (el.id == value[0]) {
            this.name = el.val;
            //所在位置
            this.$emit("radioChange", { position: { val: el.val, id: el.id } });
          }
        });
      }
      if (value[1] == "radio2") {
        this.data[2].forEach(el => {
          if (el.id == value[0]) {
            this.name1 = el.val;
            //所在静脉
            this.$emit("radioChange", { vein: { val: el.val, id: el.id } });
          }
        });
      }
    },
    checkboxCancel() {
      this.choseArr = [];
      this.$emit("checkboxChange", {
        name: "catheterType",
        data: this.choseArr
      });
    },
    choose() {
      this.choseArr = [];
      this.data[0].forEach(el => {
        this.check1.forEach(item => {
          if (el.id == item) {
            this.choseArr.push({ val: el.val, id: el.id });
          }
        });
      });
      if (this.choseArr.length > 0) {
        this.$emit("checkboxChange", {
          name: "catheterType",
          data: this.choseArr
        });
      }
    }
  },
  mounted() {
    setTimeout(_ => {
      if (this.oldData && Object.keys(this.oldData).length > 0) {
        let id = this.oldData.position && JSON.parse(this.oldData.position).id;
        id && this.radioChange([String(id), "radio1"]);

        let id1 = this.oldData.vein && JSON.parse(this.oldData.vein).id;
        id1 && this.radioChange([String(id1), "radio2"]);

        let id2 =
          this.oldData.catheterType &&
          JSON.parse(this.oldData.catheterType).map(el => {
            return String(el.id);
          });
        if (id2.length > 0) {
          this.checkboxChange([id2, "check1"]);
          this.choose();
        }
      }
    }, 600);
  }
};
</script>

<style scoped>
.site {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
  position: relative;
}
.zgBtn {
  width: 4.8rem;
  height: 0.72rem;
  line-height: 0.72rem;
  border: 2px solid rgba(230, 230, 230, 1);
  border-radius: 0.36rem;
  text-align: center;
  margin: 0.26rem auto 0;
}
.catheterType {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
}
</style>