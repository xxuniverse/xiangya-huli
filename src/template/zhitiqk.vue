<template>
  <div>
    <div class="site">
      <p>所在部位</p>
      <p v-for="(item,index) in choseArr"
         :key="index"
         @click="cancel"
         style="margin-left:150rpx;color:#3CA1FF">{{item.val}}</p>
      <div class="bpx">
        <div v-if="choseArr.length <= 0">
          <baseCheckbox @checkboxChange='checkboxChange'
                        :name="'check1'"
                        :data='data'></baseCheckbox>
          <div class="zgBtn"
               @click="choose">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseCheckbox from "./baseCheckBox";
export default {
  components: { baseCheckbox },
  props: ["data", "oldData"],
  data() {
    return {
      check1: "",
      choseArr: []
    };
  },
  methods: {
    checkboxChange(value) {
      this[value[1]] = value[0];
    },
    choose() {
      this.choseArr = [];
      this.data.forEach(el => {
        this.check1.forEach(item => {
          if (el.id == item) {
            this.choseArr.push({ val: el.val, id: el.id });
          }
        });
      });
      if (this.choseArr.length > 0) {
        this.$emit("checkboxChange", {
          name: "limbsPosition",
          data: this.choseArr
        });
      }
    },
    cancel() {
      this.choseArr = [];
      this.$emit("checkboxChange", {
        name: "limbsPosition",
        data: this.choseArr
      });
    }
  },
  mounted() {
    if (this.oldData && Object.keys(this.oldData).length > 0) {
      let id2 =
        this.oldData.limbsPosition &&
        JSON.parse(this.oldData.limbsPosition).map(el => {
          return String(el.id);
        });
      if (id2.length > 0) {
        this.checkboxChange([id2, "check1"]);
        this.choose();
      }
    }
  }
};
</script>

<style scoped>
.site {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
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
</style>