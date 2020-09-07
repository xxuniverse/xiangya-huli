<template>
  <div>
    <div class="site">
      <p
        v-for="(item,index) in choseArr"
        @click="checkboxCancel"
        :key="index"
        style="margin-left:100rpx;color:#3CA1FF"
      >{{item.val}}</p>
      <div v-if="choseArr.length<=0">
        <checkbox-group @change="checkboxChange($event)" class="check">
          <label class="checkbox" v-for="(item,index) of data" :key="index">
            <view>
              <checkbox :value="item.id">{{item.val}}</checkbox>
            </view>
            <input
              style="position: absolute;top: -1px;left: 81px;width: 102px;border-bottom: 1px solid #e6e6e6;z-index: 999;"
              @change.stop="hasInput"
              v-if="item.id == 55"
            />
          </label>
          <!-- 症状 -->
        </checkbox-group>
        <div class="zgBtn mar" @click="choose">确定</div>
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
      choseArr: [],
      temp: ""
    };
  },
  methods: {
    checkboxChange(e) {
      this.check1 = e.mp.detail.value;
    },
    hasInput(e) {
      this.temp = e.mp.detail.value;
    },
    choose() {
      this.choseArr = [];
      this.data.forEach(el => {
        this.check1.forEach(item => {
          if (el.id == item) {
            if (el.id == 55) {
              this.choseArr.push({ val: this.temp, id: el.id });
            } else {
              this.choseArr.push({ val: el.val, id: el.id });
            }
          }
        });
      });
      if (this.choseArr.length > 0) {
        this.$emit("checkboxChange", {
          name: "allergyType",
          data: this.choseArr
        });
      }
    },
    checkboxCancel() {
      this.choseArr = [];
      this.$emit("checkboxChange", {
        name: "allergyType",
        data: this.choseArr
      });
    }
  },
  mounted() {
    if (this.oldData && Object.keys(this.oldData).length > 0) {
      let id2 =
        this.oldData.allergyType &&
        JSON.parse(this.oldData.allergyType).map(el => {
          if (el.id == 55) {
            this.temp = el.val;
          }
          return String(el.id);
        });
      if (id2.length > 0) {
        this.check1 = id2;
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
.mar {
  margin-bottom: 0.3rem;
}
.check {
  display: flex;
  flex-direction: column;
}
.checkbox {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.8rem;
  margin-top: 0.4rem;
  padding: 0 10rpx 0 30rpx;
  font-size: 0.3rem;
}
.checkbox:first-child {
  margin-top: 0px;
}
</style>