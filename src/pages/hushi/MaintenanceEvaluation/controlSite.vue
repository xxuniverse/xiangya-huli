<template>
  <div class="site">
    <p>2、并发症类型</p>
    <van-checkbox-group @change="checkboxChange" :value="list" class="check">
      <label
        style="align-content: center;align-items: center;"
        v-for="(item,index) of messageData"
        :key="index"
        @click="handleShowClick(item,index)"
      >
        <div class="checkbox">
          <van-checkbox :name="item.id" shape="square">{{item.name}}</van-checkbox>
          <div class="color" @click="todo($event,item)">
            <van-icon class="icon" name="plus" />
          </div>
        </div>

        <div class="text-wrap" v-if="flag[index]">
          <h2>临床表现</h2>
          <p>{{ clinicalFeature }}</p>
          <h2>处理措施</h2>
          <p v-for="(item,number) in measure" :key="number">{{ item.val }}</p>
          <h2>效果评价</h2>
          <p>{{evaluate}}</p>
        </div>
      </label>
    </van-checkbox-group>
  </div>
</template>

<script>
import store from "../../../utils/store";

export default {
  props: ["messageData"],
  data() {
    return {
      list: [],
      text_list: [], //并发症选择数据集合
      listFlag: [], //显示当前数据
      flag: [], //
      clinicalFeature: "", //临床表现
      measure: "", //处理措施
      evaluate: "" //效果评价
    };
  },
  methods: {
    //查看对应选择项
    handleShowClick(item, index) {
      this.flag = this.flag.map(el => {
        return false;
      });
      this.listFlag = [];
      if (this.text_list.length > 0) {
        //拿到和点击项对应的数据
        this.listFlag = this.text_list.filter(
          key => key.complicationId === item.id
        );
        if (this.listFlag.length > 0) {
          let data = this.listFlag[0];
          this.clinicalFeature = JSON.parse(data.clinicalFeature).val;
          this.measure = JSON.parse(data.measure);
          this.evaluate = JSON.parse(data.evaluate).val;
          this.flag[index] = !this.flag[index];
        }
      }
    },
    checkboxChange(e) {
      this.list = e.mp.detail.value;
    },
    todo(e, item) {
      store.commit("hasSelectType", item);
      wx.navigateTo({
        url: "/pages/hushi/symptom/main"
      });
    },
    getCheck() {
      let arr = store.state.saveData;
      if (arr.length > 0) {
        this.list = [];
        arr.forEach(element => {
          this.list.push(String(element.complicationId));
        });
      }
    }
  },
  onLoad() {
    this.flag = [];
    this.messageData.forEach(key => {
      this.flag.push(false);
    });

    this.text_list = store.state.saveData;
  },
  mounted() {
    this.getCheck();
  },
  onShow() {
    this.getCheck();
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

.check {
  display: flex;
  flex-direction: column;
}

.checkbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.45rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  background: #ebf2fa;
}

.color {
  position: relative;
  width: 0.46rem;
  height: 0.46rem;
  border-radius: 0.23rem;
  background-color: #3ca1ff;
}

.icon {
  position: absolute;
  top: 64%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}
.icon >>> .van-icon,
.van-icon:before {
  font-size: 20px !important;
}
.text-wrap {
  padding: 0.2rem;
}

.text-wrap h2 {
  color: #333;
  font-size: 0.3rem;
  margin: 0.3rem auto;
}

.text-wrap p {
  padding-left: 0.1rem;
  color: #333;
  font-size: 0.26rem;
}
</style>
