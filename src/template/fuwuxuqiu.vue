<template>
  <div style="padding: 36rpx 20rpx;">
    <checkbox-group
      @change="checkboxChange($event,'title')"
      class="check"
      v-model="title"
      :value="title"
    >
      <label class="checkbox">
        <view>
          <checkbox value="1" :checked='flag'>导管维护</checkbox>
        </view>
      </label>
      <p
        v-for="(item,index) in choseArr1"
        @click="checkboxCancel1"
        :key="index"
        style="margin-left:100rpx;color:#3CA1FF"
      >{{item.val}}</p>
    </checkbox-group>
    <div v-if="choseArr1.length <= 0 && flag">
      <baseCheckbox @checkboxChange="checkChange" :name="'radio1'" :data="data[0]"></baseCheckbox>
      <div class="zgBtn" @click="choose1">确定</div>
    </div>

    <checkbox-group
      @change="checkboxChange($event,'title1')"
      class="check"
      v-model="title1"
      :value="title1"
    >
      <label class="checkbox">
        <view>
          <checkbox value="1"  :checked='flag1'>并发症处理</checkbox>
        </view>
      </label>
    </checkbox-group>
    <p
      v-for="(item,index) in choseArr2"
      @click="checkboxCancel2"
      :key="index"
      style="margin-left:100rpx;color:#3CA1FF"
    >{{item.val}}</p>
    <div v-if="choseArr2.length <= 0  && flag1">
      <baseCheckbox @checkboxChange="checkChange" :name="'radio2'" :data="data[1]"></baseCheckbox>
      <div class="zgBtn" @click="choose2">确定</div>
    </div>
  </div>
</template>

<script>
import baseRadio from "./baseRadio";
import baseCheckbox from "./baseCheckBox";

export default {
  components: {
    baseRadio,
    baseCheckbox
  },
  props: ["data", "oldData"],
  data() {
    return {
      radio1: [],
      radio2: [],
      title: "",
      title1: "",
      flag: false,
      flag1: false,
      choseArr1: [],
      choseArr2: []
    };
  },
  methods: {
    checkChange(value) {
      this[value[1]] = value[0];
    },
    // ($event,choseArr1,'catheterAccendant')
    // ($event,choseArr2,'neopathy')
    checkboxCancel1() {
      this.choseArr1 = [];
      this.$emit("checkboxChange", {
        name: "catheterAccendant",
        data: this.choseArr1
      });
    },

    checkboxCancel2() {
      this.choseArr2 = [];
      this.$emit("checkboxChange", {
        name: "neopathy",
        data: this.choseArr2
      });
    },
    // <!-- ($event,choseArr1,'catheterAccendant',0,'radio1') -->

    choose1() {
      this.choseArr1 = [];

      this.data[0].forEach(el => {
        this.radio1.forEach(item => {
          if (el.id == item) {
            this.choseArr1.push({ val: el.val, id: el.id });
          }
        });
      });
      if (this.choseArr1.length > 0) {
        this.$emit("checkboxChange", {
          name: "catheterAccendant",
          data: this.choseArr1
        });
      }
    },
    // <!-- ($event,choseArr2,'neopathy',1,'radio2') -->

    choose2() {
      this.choseArr2 = [];

      this.data[1].forEach(el => {
        this.radio2.forEach(item => {
          if (el.id == item) {
            this.choseArr2.push({ val: el.val, id: el.id });
          }
        });
      });

      if (this.choseArr2.length > 0) {
        this.$emit("checkboxChange", {
          name: "neopathy",
          data: this.choseArr2
        });
      }
    },
    checkboxChange(e, name) {
      this[name] = e.mp.detail.value[0];
      if (name == "title") {
        this.flag = !this.flag;
        this.name = "";
      }
      if (name == "title1") {
        this.flag1 = !this.flag1;
        this.name1 = "";
      }
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.oldData && Object.keys(this.oldData).length > 0) {
        let data = Object.assign({}, this.oldData);

        let id =
          data.catheterAccendant &&
          JSON.parse(data.catheterAccendant).map(el => {
            return String(el.id);
          });
        if (id.length > 0) {
          this.checkChange([id, "radio1"]);
          this.choose1();
        }

        let id1 =
          data.neopathy &&
          JSON.parse(data.neopathy).map(el => {
            return String(el.id);
          });

        if (id1.length > 0) {
          this.checkChange([id1, "radio2"]);
          this.choose2();
        }
        // let neopathy = data.neopathy && JSON.parse(data.neopathy);
        // let catheterAccendant =
        //   data.catheterAccendant && JSON.parse(data.catheterAccendant);

        // if (catheterAccendant) {
        //   this.title = ["1"];
        //   this.flag = !this.flag;
        //   this.radioChange([catheterAccendant.id, "radio1"]);
        // }
        // if (neopathy) {
        //   this.title1 = ["1"];
        //   this.flag1 = !this.flag1;
        //   this.radioChange([neopathy.id, "radio2"]);
        // }
      }
    }, 600);
  }
};
</script>

<style scoped>
.check {
  display: flex;
  flex-direction: column;
}
.checkbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 18rpx;
  padding: 0 10rpx;
  font-size: 30rpx;
  margin-bottom: 12px;
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
</style>