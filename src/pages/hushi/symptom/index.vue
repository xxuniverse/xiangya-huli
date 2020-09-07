<template>
  <div>
    <frames :obj="obj"></frames>
    <div class="section">
      <div class="sect_container">
        <div class="site">
          <p>临床表现</p>
          <!-- 输入框 -->
          <textarea
            v-show="clinical.length === 0"
            class="text"
            :value="text_one"
            :fixed="false"
            @input="bindTextAreaBlur($event,'text_one')"
            placeholder="请输入临床表现"
          />

          <van-radio-group :value="radio" class="controlSite" @change="onChange($event,'radio')">
            <van-radio
              class="ma"
              :name="item.option"
              v-for="(item,index) in clinical"
              :key="index"
            >{{item.val}}</van-radio>
          </van-radio-group>
        </div>
        <!-- 并发症录入 -->
        <div class="site">
          <p>处理措施</p>

          <textarea
            v-show="clinical.length === 0"
            class="text"
            @input="bindTextAreaBlur($event,'text_tow')"
            placeholder="请输入处理措施"
          />
          <!-- 多选按钮 -->
          <div>
            <checkbox-group
              @change="checkboxChange($event,'checkbox')"
              :value="checkbox"
              class="check"
            >
              <label class="checkbox fonts" v-for="(item,index) of items" :key="index">
                <view class="content-wrap">
                  <checkbox :name="item.option" :value="item.option" />
                  <span>{{item.val}}</span>
                </view>
              </label>
            </checkbox-group>
          </div>
        </div>
        <div class="site">
          <p>效果评价</p>

          <textarea
            v-show="clinical.length === 0"
            class="text"
            @input="bindTextAreaBlur($event,'text_three')"
            placeholder="请输入评价效果"
          />
          <van-radio-group class="controlSite" :value="radio1" @change="onChange($event,'radio1')">
            <van-radio
              :name="item.option"
              v-for="(item,index) in evaluate"
              :key="index"
            >{{item.val}}</van-radio>
          </van-radio-group>
        </div>

        <div class="btn">
          <div class="submit" @click="submit">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";

export default {
  components: { frames },
  data() {
    return {
      radio: "",
      radio1: "",
      obj: {
        text: "维护评估记录",
        state: true
      },
      items: [],
      clinical: "",
      evaluate: "",
      objData: {},
      checkbox: [],
      text_one: "",
      text_tow: "",
      text_three: ""
    };
  },
  methods: {
    bindTextAreaBlur(val, name) {
      this[name] = val.mp.detail.value;
    },
    onChangeCell(e) {},
    onChange(e, name) {
      this[name] = e.mp.detail;
      if (name == "radio") {
        this.clinical.forEach(el => {
          if (el.option == e.mp.detail) {
            this.items = el.measure;
            this.objData["clinicalFeature"] = JSON.stringify(el);
          }
        });
      }
      if (name == "radio1") {
        this.evaluate.forEach(el => {
          if (el.option == e.mp.detail) {
            this.objData["evaluate"] = JSON.stringify(el);
          }
        });
      }
    },
    checkboxChange(e, name) {
      this[name] = e.mp.detail.value;
    },
    submit() {
      let temp = [];
      //判断是否是由用户自己手动填写数据
      if (this.clinical.length <= 0) {
        this.objData["clinicalFeature"] = JSON.stringify({
          option: this.data.id,
          val: this.text_one
        });
        this.objData["measure"] = JSON.stringify([
          { option: this.data.id, val: this.text_tow }
        ]);
        this.objData["evaluate"] = JSON.stringify({
          option: this.data.id,
          val: this.text_three
        });
      } else {
        this.items.forEach(item => {
          this.checkbox.forEach(el => {
            if (item.option == el) {
              temp.push(item);
            }
          });
        });
        if (temp.length > 0) {
          this.objData["measure"] = JSON.stringify(temp);
        }
      }
      this.objData["complicationId"] = this.data.id;
      store.commit("hasSaveSelectType", this.objData);
      wx.navigateBack({
        delta: 1
      });
    }
  },
  onShow() {
    Object.assign(this.$data, this.$options.data.call(this));
    this.data = store.state.selectType;
    this.obj.text = this.data.name;
    this.obj = Object.assign({}, this.obj);
    // this.data = wx.getStorageSync('hasSelectType');
    this.clinical =
      this.data.clinicalFeature && JSON.parse(this.data.clinicalFeature);
    this.evaluate = this.data.evaluate && JSON.parse(this.data.evaluate);
    if (this.clinical.length > 0) {
      this.items = this.clinical[0].measure;
    }
  }
};
</script>

<style scoped>
.text {
  width: 100%;
  height: 100px;
  padding: 10 rpx;
  margin-top: 10 rpx;
  border: 0.01 rpx solid #f1f3f4;
  box-sizing: border-box;
}

.content-wrap {
  /* width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block; */
}

.fonts {
  font-size: 26 rpx;
  color: #313233;
}

.relative {
  position: relative;
}

.section {
  width: 100%;
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 60px;
  box-sizing: border-box;
}

.section::-webkit-scrollbar {
  display: none;
}

.hint {
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.4rem;
  font-size: 0.26rem;
  color: #313233;
  background: rgba(240, 245, 250, 1);
}

.hint p {
  padding-left: 0.29rem;
}

/* 导管类型 */
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

/* 导管规格 */
.standards,
.site,
.Time,
.maintain,
.length,
.whTime,
.whY {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
}

.site > p {
  color: #313233;
  font-size: 0.3rem;
  font-weight: bold;
}

.catheterStandards,
.controlSite {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.catheterStandards > van-radio,
.controlSite > van-radio {
  margin-top: 0.53rem;
  font-size: 0.3rem;
  color: #313233;
}

/* 并发症类型 */
.check {
  display: flex;
  flex-direction: column;
}

.checkbox,
.checkbox2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.45rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
}

.rote {
  display: inline-block;
  transform: rotate(90deg);
}

.color {
  position: relative;
  width: 0.46rem;
  height: 0.46rem;
  margin-top: 0.17rem;
  border-radius: 0.23rem;
  background-color: #3ca1ff;
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}

.submit,
.return {
  text-align: center;
  margin: 0.2rem 0.55rem;
  height: 0.9rem;
  border-radius: 0.45rem;
  line-height: 0.9rem;
}

.submit {
  margin-top: 0.9rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  color: white;
}

.return {
  border: 1px solid #50abff;
}

p {
  font-size: 0.3rem;
  color: #313233;
}

.maintain span,
.length span {
  font-size: 0.3rem;
  color: #313233;
}

/* 症状 */
.symptom {
  padding: 0.34rem 0.37rem;
}

.symptom > div {
  margin-bottom: 0.5rem;
}

.symptom > div > p {
  font-size: 0.3rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 0.29rem;
}

.symptom > div:nth-child(2) > span {
  display: block;
  margin-bottom: 0.12rem;
}

.symptom > div > span {
  font-size: 0.26rem;
  color: #333333;
  line-height: 0.4rem;
}
</style>
