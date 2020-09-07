<template>
  <div>
    <div class="catheterType" style="border:0px;">
      <p>导管破损</p>
      <van-radio-group
        class="conduitType"
        :value="radio"
        @change="onChange($event,'radio','catheterDamaged')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div v-if="radio == 2">
      <checkbox-group
        @change="checkboxChange($event,'title1')"
        class="check"
        v-model="title1"
        :value="title1"
      >
        <label class="checkbox" style="padding: 0 60rpx;">
          <view>
            <checkbox value="1" />体外断裂
          </view>
        </label>
      </checkbox-group>

      <div class="rank" v-if="title1[0] == '1'">
        <div class="twoRank" @click="rank(0,'outFracture')" v-if="arr[0] < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:10rpx;"
          v-if="arr[0]  >= 1"
          @click="rankduce(0,'outFracture')"
        />

        <div class="twoRank" @click="rank(0,'outFracture')" v-if="arr[0] <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="arr[0] >= 2"
          @click="rankduce(0,'outFracture')"
        />
      </div>
      <checkbox-group
        @change="checkboxChange($event,'title2')"
        class="check"
        v-model="title2"
        :value="title2"
      >
        <label class="checkbox" style="padding: 0 60rpx;">
          <view>
            <checkbox value="2" />体内断裂
          </view>
        </label>
      </checkbox-group>
      <div class="rank" v-if="title2[0] == '2'">
        <div class="twoRank" @click="rank(1,'inFracture')" v-if="arr[1] < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:10rpx;"
          v-if="arr[1]  >= 1"
          @click="rankduce(1,'inFracture')"
        />

        <div class="twoRank" @click="rank(1,'inFracture')" v-if="arr[1] <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="arr[1] >= 2"
          @click="rankduce(1,'inFracture')"
        />
      </div>
    </div>

    <div class="catheterType" style="border:0px;">
      <p>导管脱出</p>
      <van-radio-group
        class="conduitType"
        :value="radio1"
        @change="onChange($event,'radio1','catheterEmerge')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div style="border-bottom:2rpx solid #E6E6E6;padding-bottom:30rpx;" v-if="radio1 == 2">
      <div class="mm" style="width: 100%;">
        <span style="margin-right:10rpx;">脱出长度</span>
        <input
          class="borderB"
          type="text"
          :value="emergeLen"
          v-model.number="emergeLen"
          @change="hasInput($event,0,'emergeLen')"
          style="margin-right:10rpx;"
        />
        <span>cm</span>
        <div class="rank" style="padding:0px;">
          <div class="twoRank" @click="rank(2,'emergeLevel')" v-if="arr[2] < 1">+</div>

          <img
            src="/static/images/login/add-blue.png"
            style="margin-left:10rpx;"
            class="img"
            v-if="arr[2]  >= 1"
            @click="rankduce(2,'emergeLevel')"
          />

          <div class="twoRank" @click="rank(2,'emergeLevel')" v-if="arr[2] <= 1">+</div>

          <img
            src="/static/images/login/add-blue.png"
            class="img"
            style="margin-left:20rpx;"
            v-if="arr[2] >= 2"
            @click="rankduce(2,'emergeLevel')"
          />
        </div>
      </div>
    </div>
    <div class="catheterType" style="border-bottom:0px;">
      <p>穿刺点周围红</p>
      <van-radio-group
        class="conduitType"
        :value="radio2"
        @change="onChange($event,'radio2','haveZwh')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div v-if="radio2 == 2">
      <div class="mm">
        <span style="margin-right:10rpx;">长度</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          type="text"
          v-model="length"
          :value="length"
          @change="hasInput($event,1,'length')"
        />
        <span>cm</span>
      </div>
      <div class="mm">
        <span style="margin-right:10rpx;">宽度</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          type="text"
          :value="wide"
          v-model="wide"
          @change="hasInput($event,2,'wide')"
        />
        <span>cm</span>
      </div>
      <div class="mm">
        <span style="margin-right:10rpx;">面积</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          type="text"
          :value="area"
          v-model="area"
          @change="hasInput($event,3,'area')"
        />
        <span>cm²</span>
      </div>
      <div
        class="rank flex-c"
        style="margin-top:20rpx;border-bottom:2rpx solid #E6E6E6;padding-bottom:30rpx;"
      >
        <div class="twoRank" @click="rank(3,'zwhLevel')" v-if="arr[3] < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          style="margin-left:10rpx;"
          class="img"
          v-if="arr[3]  >= 1"
          @click="rankduce(3,'zwhLevel')"
        />

        <div class="twoRank" @click="rank(3,'zwhLevel')" v-if="arr[3] <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="arr[3] >= 2"
          @click="rankduce(3,'zwhLevel')"
        />
      </div>
    </div>
    <div class="catheterType" style="border-bottom:0px;">
      <p>穿刺侧肢体肿</p>
      <van-radio-group
        class="conduitType"
        :value="radio3"
        @change="onChange($event,'radio3','haveSwelling')"
      >
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div v-if="radio3 == 2">
      <div class="mm" style="width:100%;">
        <span style="margin-right:10rpx;">肘上10cm臂围</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          type="text"
          v-model="armCircumference"
          :value="armCircumference"
          @change="hasInput($event,4,'armCircumference')"
        />
        <span>cm</span>
      </div>
      <div class="rank flex-c" style="margin-top:20rpx;">
        <div class="twoRank" @click="rank(4,'armCircumferenceLevel')" v-if="arr[4] < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          style="margin-left:10rpx;"
          class="img"
          v-if="arr[4]  >= 1"
          @click="rankduce(4,'armCircumferenceLevel')"
        />

        <div class="twoRank" @click="rank(4,'armCircumferenceLevel')" v-if="arr[4] <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="arr[4] >= 2"
          @click="rankduce(4,'armCircumferenceLevel')"
        />
      </div>
      <div class="mm" style="width:100%;">
        <span style="margin-right:10rpx;">腹股沟下10cm腿围</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          type="text"
          v-model="legCircumference"
          :value="legCircumference"
          @change="hasInput($event,5,'legCircumference')"
        />
        <span>cm</span>
      </div>
      <div
        class="rank flex-c"
        style="margin-top:20rpx;border-bottom:2rpx solid #E6E6E6;padding-bottom:30rpx;"
      >
        <div class="twoRank" @click="rank(5,'legCircumferenceLevel')" v-if="arr[5] < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          style="margin-left:10rpx;"
          class="img"
          v-if="arr[5]  >= 1"
          @click="rankduce(5,'legCircumferenceLevel')"
        />

        <div class="twoRank" @click="rank(5,'legCircumferenceLevel')" v-if="arr[5] <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="arr[5] >= 2"
          @click="rankduce(5,'legCircumferenceLevel')"
        />
      </div>
    </div>
    <div class="catheterType" style="flex-wrap:wrap;border-bottom:0px;">
      <div style="width:100%;border:0px;padding:0px;" class="catheterType">
        <p>穿刺侧肢体痛</p>
        <van-radio-group
          class="conduitType"
          :value="radio4"
          @change="onChange($event,'radio4','bodyPain')"
        >
          <van-radio :name="1">无</van-radio>
          <van-radio :name="2">有</van-radio>
        </van-radio-group>
      </div>

      <div class="kd" v-if="radio4 == 2">
        <span class="tengT">
          疼痛级别
          <span style="color:#3CA1FF;margin-left:100rpx;" @click="cancelSave">{{NUM}}级</span>
        </span>
        <!-- 
         
        -->
        <div v-if="!flag">
          <slider
            @change="slider1change"
            left-icon="cancel"
            right-icon="success_no_circle"
            :min="0"
            :activeColor="'#3ca1ff'"
            :value="NUM"
            :step="1"
            :max="6"
          />
          <!-- <span v-if="NUMT" class="num">{{NUM}}</span> -->
          <div class="tt">
            <span>0级无痛</span>
            <span>1-3级轻微疼痛</span>
            <span>4-6中度疼痛</span>
          </div>
          <div class="zgBtn" @click="submit">确定</div>
        </div>
      </div>
    </div>

    <div class="catheterType" style="flex-wrap:wrap;">
      <div style="width:100%;border:0px;padding:0px;" class="catheterType">
        <p>医用黏胶相关性皮肤损伤</p>
        <van-radio-group
          class="conduitType"
          :value="radio5"
          @change="onChange($event,'radio5','isSkinInjury')"
        >
          <van-radio :name="1">无</van-radio>
          <van-radio :name="2">有</van-radio>
        </van-radio-group>
      </div>
      <div v-if="radio5 == 2 && choseArr.length<=0" style="wdith:100%;">
        <!-- <baseCheckbox @checkboxChange="checkChange" :name="'check1'" :data="list"></baseCheckbox> -->
        <checkbox-group @change="checkboxChange($event,'check1')" class="check">
          <label class="checkbox" v-for="(item,index) of list" :key="index">
            <view>
              <checkbox :value="item">{{item}}</checkbox>
            </view>
          </label>
          <!-- 症状 -->
        </checkbox-group>

        <div class="zgBtn" @click="choose">确定</div>
      </div>
      <div v-else style="wdith:100%;">
        <p
          v-for="(item,index) in choseArr"
          @click="checkboxCancel"
          :key="index"
          style="margin-left:150rpx;color:#3CA1FF"
        >{{item}}</p>
      </div>

      <div class="site flex-c" style="flex-wrap:wrap; wdith:100%;" v-if="radio5 == 2">
        <div style="width:100%; " class="flex-c">
          <van-button round @click="upload($event,'skinImgs')">上传图片</van-button>
        </div>

        <div class="flex-s">
          <div style="position: relative" v-for=" (item,index) in fileList" :key="index">
            <van-icon
              name="close"
              class="closeIcon"
              @click="closePage($event,item,index,'skinImgs')"
            />
            <img :src="item" class="imgBox" />
          </div>
        </div>
      </div>
    </div>

    <div class="bz">
      <p>其他描述</p>
      <div class="flex-c" style="width:100%;">
        <div
          style="height: 200rpx;width: 97%;border: solid 2rpx  #E1E1E1;margin-top:10px;"
          @click="showDialog($event,'show')"
        >{{content}}</div>
      </div>
    </div>
    <van-toast id="van-toast" />

    <van-dialog
      use-slot
      title="备注信息"
      :show="show"
      show-cancel-button
      @confirm="saveRemark($event,'show','content','description')"
      @cancel="cancelRemark($event,'show','content','description')"
    >
      <div class="flex-c textArea" style="width:100%;">
        <textarea
          class="text"
          name
          id
          cols="30"
          rows="10"
          :value="demo"
          @change="hasInput2($event,'demo')"
        ></textarea>
      </div>
    </van-dialog>
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
      radio4: "",
      radio5: "",

      title1: "",
      title2: "",
      content: "",
      NUM: 3,
      NUMT: true,
      data: [],
      arr: [0, 0, 0, 0, 0, 0],
      flag: false,
      demo: "",
      show: false,
      content: "",
      emergeLen: " ",
      length: " ",
      wide: " ",
      area: " ",
      armCircumference: " ",
      legCircumference: " ",
      list: ["瘙痒", "红(点状、片状)", "水疱", "糜烂"],
      check1: [],
      choseArr: [],
      fileList: [],
      uploadFlag: false
    };
  },
  methods: {
    closePage(e, item, key, name) {
      this.fileList.splice(key, 1);
      wx.showLoading({
        title: "加载中"
      });
      this.fileList = [...this.fileList];
      this.$emit("upload", {
        key: name,
        value: this.fileList
      });

      setTimeout(() => {
        wx.hideLoading();
      }, 200);
    },
    //上传图片
    upload(e, key) {
      let that = this;
      this.uploadFlag = true;
      wx.chooseImage({
        count: 2,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "图片上传中"
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 1000);
          if (!that.fileList || that.fileList.length <= 0) {
            that.fileList = [];
          } else if (that.fileList.length >= 2) {
            that.$toast("已经上传两张图片了,请先删除再上传");
            return;
          }
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > 2) {
            that.$toast("当前仅可上传两张图片");
            return;
          }
          tempFilePaths.forEach(element => {
            that.uploadFile(element, key);
          });
          that.uploadFlag = false;
        },
        fail(err) {}
      });
    },
    uploadFile(element, key) {
      let that = this;
      wx.uploadFile({
        url: that.$img + "/api/upload/uploadFile/6/1", //仅为示例，非真实的接口地址
        filePath: element,
        name: "file",
        success(res) {
          let temp = JSON.parse(res.data);
          if (!that.fileList || that.fileList.length <= 0) {
            that.fileList = [];
            that.fileList.push(temp.data.fileIds);
          } else {
            that.fileList.push(temp.data.fileIds);
          }
          that.fileList = [...that.fileList];
          that.$emit("upload", {
            key: key,
            value: that.fileList
          });
          // wx.setStorageSync
        },
        fail() {
          that.uploadFile(element);
        }
      });
    },
    slider1change(e) {
      this.NUM = e.mp.detail.value;
    },
    cancelRemark(e, name, value, key) {
      this[name] = false;
      this[value] = "";
      this.demo = "";
      let data = [];
      data[key] = "";
      this.$emit("inputChange", data);
    },

    saveRemark(e, name, value, key) {
      setTimeout(() => {
        this[name] = false;
        this[value] = this.demo;
        let data = [];
        data[key] = this.demo;
        this.$emit("inputChange", data);
      }, 500);
    },
    choose() {
      if (this.check1.length > 0) {
        this.choseArr = [...this.check1];
        this.$emit("checkboxChange1", {
          name: "skinInjury",
          data: this.choseArr.join(",")
        });
      }
    },
    checkboxCancel() {
      this.choseArr = [];
      this.$emit("checkboxChange1", {
        name: "skinInjury",
        data: ""
      });
    },
    showDialog(e, show) {
      this[show] = true;
    },
    onChange(e, name, key) {
      this[name] = e.mp.detail;
      let data = {};
      data[key] = e.mp.detail;
      this.$emit("flagChange", data);
    },
    checkboxChange(e, name) {
      this[name] = e.mp.detail.value;
    },
    hasInput(e, name, key) {
      let temp = e.mp.detail.value.replace(" ", "");
      let rxp = new RegExp(/(^[0-9]{1,2}$)|(^[0-9]{1,2}[\.]{1}[0-9]{0,2}$)/)
      if (
        parseInt(temp)<10 || 
        parseInt(e.mp.detail.value) < 10
      ) {
        this.data[name] = { value: temp, key: key };
        let data = {};
        data[key] = temp;
        this.$emit("inputChange", data);
      } else {
        this[key] = " ";
        this.$toast.fail('你确定输入是否无误')
      }
    },
    hasInput2(e, name) {
      this[name] = e.mp.detail.value;
    },
    rank(name, key) {
      if (this.arr[name] >= 0 && this.arr[name] < 2) {
        this.arr[name]++;
      }
      let data = {};
      data[key] = this.arr[name];
      this.$emit("rankChange", data);
      let temp = [];
      temp = this.arr;
      this.arr = [];
      this.arr = temp;
    },
    rankduce(name, key){
      if (this.arr[name] > 0 && this.arr[name] <= 2) {
        this.arr[name]--;
      }
      let data = {};
      data[key] = this.arr[name];
      this.$emit("rankChange", data);
      let temp = [];
      temp = this.arr;
      this.arr = [];
      this.arr = temp;
    },
    submit() {
      this.flag = true;
      this.$emit("painLevel", this.NUM);
    },
    cancelSave() {
      this.flag = false;
    },
    initPage() {
      setTimeout(() => {
        if (this.oldData && Object.keys(this.oldData).length > 0) {
          let data = Object.assign({}, this.oldData);
          this.radio = String(data.catheterDamaged) || "";
          this.radio1 = String(data.catheterEmerge) || "";
          this.radio2 = String(data.haveZwh) || "";
          this.radio3 = String(data.haveSwelling) || "";
          this.radio4 = String(data.bodyPain) || "";
          // 回显皮肤损伤
          this.radio5 = String(data.isSkinInjury) || "";
          this.check1 = data.skinInjury.split(",") || [];
          if (this.check1.length > 0) {
            this.choose();
          }
          this.fileList = [];
          data.skinInjuryImgOne && this.fileList.push(data.skinInjuryImgOne);
          data.skinInjuryImgTwo && this.fileList.push(data.skinInjuryImgTwo);

          this.emergeLen = data.emergeLen || " ";
          this.length = data.length || " ";
          this.wide = data.wide || " ";
          this.area = data.area || " ";

          this.armCircumference = data.armCircumference || " ";
          this.legCircumference = data.legCircumference || " ";
          this.NUM = data.painLevel || " ";
          if (this.NUM && this.NUM > 0) {
            this.submit();
          }
          this.content = data.description || "";
          if (data.outFracture > 0) {
            this.title1 = ["1"];
            // this.arr[0] = data.outFracture;
            this.rank(0, "outFracture");
          }
          if (data.inFracture > 0) {
            this.title2 = ["2"];
            // this.arr[1] = data.inFracture;
            this.rank(1, "inFracture");
          }
          if (data.emergeLevel > 0) {
            // this.arr[2] = data.emergeLevel;
            this.rank(2, "emergeLevel");
          }
          if (data.zwhLevel > 0) {
            // this.arr[3] = data.zwhLevel;
            this.rank(3, "zwhLevel");
          }
          if (data.armCircumferenceLevel > 0) {
            // this.arr[4] = data.armCircumferenceLevel;
            this.rank(4, "armCircumferenceLevel");
          }
          if (data.legCircumference > 0) {
            // this.arr[5] = data.legCircumference;
            this.rank(5, "legCircumference");
          }
        } else {
          Object.assign(this.$data, this.$options.data.call(this));
        }
      }, 1000);
    }
  },
  // onShow() {
  //   if (!this.uploadFlag) {
  //     this.initPage();
  //   }
  // },
  mounted() {
    this.initPage();
  }
};
</script>

<style scoped>
.img {
  width: 80rpx;
  height: 64rpx;
}
/* 导管类型 */
.catheterType {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
  display: flex;
  font-size: 30rpx;
  color: #313233;
}
.conduitType {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60%;
  flex-wrap: wrap;
  margin-left: 0.89rem;
}
.conduitType > van-radio {
  width: 50%;
  font-size: 0.3rem;
  color: #313233;
}
.conduitType > van-radio:last-child {
  margin-top: 0.4rem;
}
.check {
  display: flex;
  flex-direction: column;
}
.checkbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.45rem;
  padding: 0 0.1rem;
  font-size: 0.3rem;
}
.imgBox {
  width: 100%;
  margin-top: 30rpx;
  flex-wrap: wrap !important;
}
.rank {
  display: flex;
  flex-direction: row;
  padding: 0 0.6rem;
}
.rank > .twoRank {
  margin-left: 0.2rem;
  width: 0.8rem;
  height: 0.64rem;
  line-height: 0.64rem;
  text-align: center;
  color: #ccc;
  font-size: 0.6rem;
  border: 0.01rem solid #ccc;
}
.mm {
  display: flex;
  flex-direction: row;
  padding: 0 60rpx;
  font-size: 30rpx;
  width: 61%;
  margin-top: 44rpx;
  align-content: center;
  align-items: center;
}
.borderB {
  text-align: center;
  margin: 0px;
  width: 2.6rem;
  height: 0.62rem;
  border: 0.02rem solid rgba(230, 230, 230, 1);
}
.imgBox {
  width: 238rpx !important;
  height: 240rpx !important;
  margin-left: 20prx;
}
.kd {
  position: relative;
  margin-top: 72rpx;
  width: 100%;
}
.num {
  position: absolute;
  top: -14%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tengT {
  position: absolute;
  font-size: 0.3rem;
  font-weight: bold;
  top: -0.55rem;
  left: 15%;
}
.tt {
  text-align: center;
  color: #ccc;
  margin-top: 40rpx;
}
.tt > span {
  display: inline-block;
  padding: 0 0.2rem;
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
.bz {
  padding-bottom: 0.2rem;
}
.bz > p {
  padding: 0.34rem 0 0.39rem 0.34rem;
}
.text {
  width: 5.9rem;
  height: 2rem;
  margin: 0 auto;
  border: 0.01rem solid #ccc;
  color: #3ca1ff;
  font-size: 30rpx;
}
.site > .flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 0.72rem;
}
.site > .p2 {
  margin: 0.62rem 0 0.28rem 0;
}
.site >>> .van-button--normal {
  width: 480rpx;
}
.site {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
}
.site {
  position: relative;
}
.closeIcon {
  top: 11rpx !important;
}
</style>