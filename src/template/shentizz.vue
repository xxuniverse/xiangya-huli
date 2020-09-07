<template>
  <div>
    <div class="catheterType">
      <p>发热</p>
      <van-radio-group
        class="conduitType"
        :value="radio"
        @change="onChange($event,'radio','haveHeat')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div v-if="radio == 2">
      <div class="mz">
        <span>腋温</span>
        <input
          class="borderB"
          type="text"
          v-model="axilTemp"
          :value="axilTemp"
          @change="hasInput($event,0,'axilTemp')"
        />
        <span>度</span>
      </div>
      <div class="mz">
        <span>额温</span>
        <input
          class="borderB"
          type="text"
          v-model="browTemp"
          :value="browTemp"
          @change="hasInput($event,1,'browTemp')"
        />
        <span>度</span>
      </div>
    </div>
    <div class="catheterType">
      <p>气促</p>
      <van-radio-group
        class="conduitType"
        :value="radio1"
        @change="onChange($event,'radio1','anhelation')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
      <div class="mz" v-if="radio1 == 2">
        <span>呼吸</span>
        <input
          class="borderB"
          type="text"
          v-model="breathe"
          :value="breathe"
          @change="hasInput($event,2,'breathe')"
        />
        <span>次/分钟</span>
      </div>
    </div>
    <div class="catheterType">
      <p>胸痛</p>
      <van-radio-group
        class="conduitType"
        :value="radio2"
        @change="onChange($event,'radio2','windPain')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
      <div v-if="radio2 == 2">
        <div class="mz">
          <span>部位</span>
          <input
            class="borderB"
            type="text"
            v-model="windPosition"
            :value="windPosition"
            style="margin-left: 83rpx;"
            @change="hasInput1($event,3,'windPosition')"
          />
        </div>
        <div class="mz">
          <span>持续时间</span>
          <input
            class="borderB"
            type="text"
            v-model="windTime"
            :value="windTime"
            @change="hasInput1($event,4,'windTime')"
          />
        </div>
      </div>
    </div>
    <div class="catheterType">
      <p>咯血</p>
      <van-radio-group
        class="conduitType"
        :value="radio3"
        @change="onChange($event,'radio3','hemoptysis')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
      <div v-if="radio3 == 2">
        <div class="mz">
          <span>颜色</span>
          <input
            class="borderB"
            type="text"
            v-model="pigment"
            :value="pigment"
            @change="hasInput1($event,5,'pigment')"
          />
        </div>
        <div class="mz">
          <span>量</span>
          <input
            class="borderB"
            type="text"
            :value="bulk"
            v-model="bulk"
            style="margin-left: 29px;"
            @change="hasInput($event,6,'bulk')"
          />
          <span>ml</span>
        </div>
      </div>
    </div>
    <div class="catheterType relative">
      <p class="p">
        <span style="margin-right:29px;">血压</span>
        <picker
          class="backInput9"
          @change="bindPickerChange($event,'index','bloodPressure')"
          :value="index"
          :range="array"
          style="width: 47%;"
        >
          <view class="picker picBorder">
            {{array[index]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
      </p>
      <div class="mz">
        <span>收缩压</span>
        <input
          class="borderB"
          type="text"
          v-model="systolicPressure"
          :value="systolicPressure"
          @change="hasInput($event,7,'systolicPressure')"
        />
        <span>mmHg</span>
      </div>
      <div class="mz">
        <span>舒张压</span>
        <input
          class="borderB"
          type="text"
          v-model="diastolicPressure"
          :value="diastolicPressure"
          @change="hasInput($event,8,'diastolicPressure')"
        />
        <span>mmHg</span>
      </div>
    </div>
    <div class="catheterType relative">
      <p class="p">
        脉搏
        <picker
          class="backInput9"
          @change="bindPickerChange($event,'index1','pulse')"
          :value="index1"
          :range="array1"
        >
          <view class="picker picBorder">
            {{array1[index1]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
      </p>
      <div class="mz z">
        <!-- <span>收缩压</span> -->
        <input
          class="borderB"
          type="text"
          style="margin-left: 68rpx;width: 275rpx;"
          :value="pulseRate"
          v-model="pulseRate"
          @change="hasInput($event,9,'pulseRate')"
        />
        <span>次/分钟</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["oldData"],
  data() {
    return {
      radio: "",
      radio1: "",
      radio2: "",
      radio3: "",
      arr: [],
      index: "",
      array: ["高血压", "低血压", "正常血压"],
      index1: "",
      array1: ["心跳过速", "心跳过缓", "正常"],
      axilTemp: " ",
      browTemp: " ",
      breathe: " ",
      bulk: " ",
      systolicPressure: " ",
      diastolicPressure: " ",
      pulseRate: " ",
      windPosition: " ",
      windTime: " ",
      pigment: " "
    };
  },
  methods: {
    onChange(e, name, key) {
      this[name] = e.mp.detail;
      let data = {};
      data[key] = e.mp.detail;
      this.$emit("flagChange", data);
    },
    hasInput(e, index, key) {
      let temp = e.mp.detail.value.replace(" ", "");
      if (
        /^\d+\.?\d{0,4}$/g.test(temp) ||
        /^\d+\.?\d{0,4}$/g.test(e.mp.detail.value)
      ) {
        this.arr[index] = { value: temp, key };
        let data = [];
        data[key] = temp;
        this.$emit("inputChange", data);
      } else {
        this[key] = " ";
      }
    },
    hasInput1(e, index, key) {
      this.arr[index] = { value: e.mp.detail, key };
      let data = [];
      data[key] = e.mp.detail.value;
      this.$emit("inputChange", data);
    },
    bindPickerChange(e, name, key) {
      this[name] = e.mp.detail.value;
      let data = {};
      if (name == "index") {
        data[key] = this.array[e.mp.detail.value];
      }
      if (name == "index1") {
        data[key] = this.array1[e.mp.detail.value];
      }
      this.$emit("pickerChange", data);
    },
    initPage() {
      setTimeout(() => {
        if (this.oldData && Object.keys(this.oldData).length > 0) {
          let data = Object.assign({}, this.oldData);
          this.radio = String(data.haveHeat) || "";
          this.radio1 = String(data.anhelation) || "";
          this.radio2 = String(data.windPain) || "";
          this.radio3 = String(data.hemoptysis) || "";

          this.axilTemp = data.axilTemp || " ";
          this.browTemp = data.browTemp || " ";
          this.breathe = data.breathe || " ";
          this.windPosition = data.windPosition || " ";
          this.windTime = data.windTime || " ";
          this.pigment = data.pigment || " ";
          this.bulk = data.bulk || " ";
          this.systolicPressure = data.systolicPressure || " ";
          this.diastolicPressure = data.diastolicPressure || " ";
          this.pulseRate = data.pulseRate || " ";

          if (data.bloodPressure) {
            this.temp = this.array.forEach((el, index) => {
              if (el == data.bloodPressure) {
                this.index = index;
              }
            });
          }
          if (data.pulse) {
            this.temp = this.array1.forEach((el, index) => {
              if (el == data.pulse) {
                this.index1 = index;
              }
            });
          }
        } else {
          Object.assign(this.$data, this.$options.data.call(this));
        }
      }, 500);
    }
  },
  mounted() {
    this.initPage();
  },
  onShow() {
    this.initPage();
  }
};
</script>

<style scoped>
.picBorder {
  height: 0.72rem;
  font-size: 0.3rem;
  color: #999999;
  text-align: center;
  line-height: 0.72rem;
  border: 0.01rem solid #e6e6e6;
}
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
.borderB {
  line-height: 0.72rem;
  text-align: center;
  margin: -0.2rem 14rpx 0 0.27rem;
  width: 2.6rem;
  height: 0.72rem;
  border: 0.02rem solid rgba(230, 230, 230, 1);
  color: #3ca1ff;
  font-size: 30rpx;
}
.mz {
  display: flex;
  flex-direction: row;
  margin: 0.5rem auto 0.3rem;
  font-size: 0.3rem;
  padding: 0 0.58rem;
}
.p {
  margin-top: 46rpx;
  padding: 0 58rpx;
}
.relative {
  position: relative;
}
.rote {
  display: inline-block;
  transform: rotate(90deg);
}
.backInput9 {
  display: inline-block;
  width: 50%;
  border-bottom: 1rpx solid #e6e6e6;
}
</style>