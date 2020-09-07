<template>
  <div class="containerLogin">
    <div class="sect_container">
      <div class="hint">
        <p>炎症指标</p>
      </div>
      <div class="site flex-c" style="flex-wrap:wrap;">
        <div
          class="flex-s"
          style="width:100%;margin-top:30rpx;flex-wrap: wrap;"
          v-if="form.inflammatoryImg"
        >
          <img :src="item" class="img" v-for=" (item,index) in form.inflammatoryImg" :key="index" />
        </div>
      </div>
      <div class="site">
        <p>血常规</p>
        <p class="p2">白细胞（3.5-9.5*10⁹/L）</p>
        <div class="flex">
          <picker class="backInput9" :value="form.hemadStatus" :disabled="true" :range="array">
            <view class="picker picBorder">
              {{array[form.hemadStatus]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <!-- <span>宽度</span> -->
            <input
              class="borderB"
              type="text"
              :value="form.hemadBulk"
              :disabled="true"
              style="margin-right:10rpx;"
            />
            <span>*10⁹/L</span>
          </div>
        </div>
        <p class="p2">血小板（125-350*10⁹/L）</p>
        <div class="flex">
          <picker class="backInput9" :value="form.soterocyteStatus" :disabled="true" :range="array">
            <view class="picker picBorder">
              {{array[form.soterocyteStatus]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <!-- <span>宽度</span> -->
            <input
              class="borderB"
              type="text"
              :value="form.soterocyteBulk"
              :disabled="true"
              style="margin-right:10rpx;"
            />
            <span>*10⁹/L</span>
          </div>
        </div>
        <p class="p2">血红蛋白（115-150g/L）</p>
        <div class="flex">
          <picker class="backInput9" :disabled="true" :value="form.oxyphoraseStatus" :range="array">
            <view class="picker picBorder">
              {{array[form.oxyphoraseStatus]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <!-- <span>宽度</span> -->
            <input
              class="borderB"
              type="text"
              :value="form.oxyphoraseBulk"
              :disabled="true"
              style="margin-right:10rpx;"
            />
            <span>*10⁹/L</span>
          </div>
        </div>
      </div>
    </div>
    <div class="site">
      <p>血沉</p>
      <p class="p2">血沉（0-38mm/h）</p>
      <div class="flex">
        <picker class="backInput9" :value="form.esrStatus" :disabled="true" :range="array">
          <view class="picker picBorder">
            {{array[form.esrStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.esrBulk"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>mm/h</span>
        </div>
      </div>
    </div>
    <div class="site">
      <p>CRP</p>
      <p class="p2">CRP（0-8mg/L）</p>
      <div class="flex">
        <picker class="backInput9" :value="form.crpStatus" :disabled="true" :range="array">
          <view class="picker picBorder">
            {{array[form.crpStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.croBulk"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>mg/L</span>
        </div>
      </div>
    </div>
    <div class="site">
      <p>降钙素原</p>
      <p class="p2">降钙素原（＜0.05ng/mL）</p>
      <div class="flex">
        <picker
          class="backInput9"
          :value="form.thyrocalcitoninStatus"
          :disabled="true"
          :range="array"
        >
          <view class="picker picBorder">
            {{array[form.thyrocalcitoninStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.thyrocalcitoninBulk"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>ng/mL</span>
        </div>
      </div>
    </div>
    <div class="hint">
      <p>凝血指标</p>
    </div>
    <div class="site flex-c" style="flex-wrap:wrap;">
      <div class="flex-s" style="width:100%;margin-top:30rpx;flex-wrap: wrap;" v-if="form.cruorImg">
        <img :src="item" v-for=" (item,index) in form.cruorImg" :key="index" class="img" />
      </div>
    </div>

    <div class="site">
      <p>凝血常规</p>
      <p class="p2">凝血酶原（10-16s）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.thrombinStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.thrombinStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.thrombinValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>s</span>
        </div>
      </div>
      <p class="p2">凝血酶原百分比（70-140%）</p>
      <div class="flex">
        <picker
          class="backInput9"
          :disabled="true"
          :value="form.thrombinPercentumStatus"
          :range="array"
        >
          <view class="picker picBorder">
            {{array[form.thrombinPercentumStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.thrombinPercentumValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>%</span>
        </div>
      </div>
      <p class="p2">国际标准比值（0.8-1.2）</p>
      <div class="flex">
        <picker
          class="backInput9"
          :disabled="true"
          :value="form.internationalStandardStatus"
          :range="array"
        >
          <view class="picker picBorder">
            {{array[form.internationalStandardStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.internationalStandardValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>%</span> -->
        </div>
      </div>

      <p class="p2">活化部分凝血酶原时间（25.0-43.0）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.hhbfnxmysjStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.hhbfnxmysjStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.hhbfnxmysjValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>s</span>
        </div>
      </div>
      <p class="p2">凝血酶时间（14.0-21.0s）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.nxmsjStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.nxmsjStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.nxmsjValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>s</span>
        </div>
      </div>
      <p class="p2">D-二聚体（0-0.5mg/L）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.dejtStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.dejtStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.dejtValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>mg/L</span>
        </div>
      </div>
      <p class="p2">纤维蛋白原（2.0-4.0）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.xwdbyStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.xwdbyStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.xwdbyValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>g/L</span>
        </div>
      </div>
      <p class="p2">血浆纤维蛋白（原）降解产物（0-0.5mg/L）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.xjxwdbyjjcwStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.xjxwdbyjjcwStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <!-- <span>宽度</span> -->
          <input
            class="borderB"
            type="text"
            :value="form.xjxwdbyjjcwValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <span>mg/L</span>
        </div>
      </div>
    </div>
    <div class="site">
      <p>血栓弹力图</p>
      <p class="p2">反应时间（R）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.fysjStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.fysjStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.fysjValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
      <p class="p2">凝固时间（K）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.ngsjStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.ngsjStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.ngsjValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
      <p class="p2">图中两侧曲线的最宽距离（MA）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.maxRangeStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.maxRangeStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.maxRangeValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
      <p class="p2">最大凝固时间（m）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.zdngsjStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.zdngsjStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.zdngsjValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
    </div>
    <div class="hint">
      <p>其它指标</p>
    </div>
    <div class="site flex-c" style="flex-wrap:wrap;">
      <div class="flex-s" style="width:100%;margin-top:30rpx;flex-wrap: wrap;" v-if="form.qtzbImg">
        <img :src="item" v-for=" (item,index) in form.qtzbImg" :key="index" class="img" />
      </div>
    </div>

    <div class="site">
      <p>肝功能</p>
      <p class="p2">谷丙转氨酶（7.0-40.0U/L）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.gbzamStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.gbzamStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.gbzamValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
      <p class="p2">谷草转氨酶（13.0-35.0U/L）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.gczamStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.gczamStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.gczamValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
      <p class="p2">白/球（1.2-2.4）</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.whiteStatus" :range="array">
          <view class="picker picBorder">
            {{array[form.whiteStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.whiteValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
    </div>
    <div class="hint">
      <p>血管彩超</p>
    </div>
    <div class="site flex-c" style="flex-wrap:wrap;">
      <div class="flex-s" style="width:100%;margin-top:30rpx;flex-wrap: wrap;" v-if="form.xgccImg">
        <img :src="item" v-for=" (item,index) in form.xgccImg " :key="index" class="img" />
      </div>
    </div>

    <div class="site">
      <p class="p2">血管彩超</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.xgccStatus" :range="array1">
          <view class="picker picBorder">
            {{array1[form.xgccStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.xgccValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
    </div>
    <div class="hint">
      <p>肺部CT</p>
    </div>
    <div class="site flex-c" style="flex-wrap:wrap;">
      <div class="flex-s" style="width:100%;margin-top:30rpx;flex-wrap: wrap;" v-if="form.fbctImg">
        <img :src="item" v-for=" (item,index) in form.fbctImg" :key="index" class="img" />
      </div>
    </div>

    <div class="site">
      <p class="p2">肺部CT</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.fbctStatus" :range="array1">
          <view class="picker picBorder">
            {{array[form.fbctStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.fbctValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
    </div>
    <div class="hint">
      <p>胸部X线</p>
    </div>

    <div class="site flex-c" style="flex-wrap:wrap;">
      <div class="flex-s" style="width:100%;margin-top:30rpx;flex-wrap: wrap;" v-if="form.xbxxImg">
        <img :src="item" v-for=" (item,index) in form.xbxxImg " :key="index" class="img" />
      </div>
    </div>

    <div class="site">
      <p class="p2">胸部X线</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.xbxxStatus" :range="array1">
          <view class="picker picBorder">
            {{array[form.xbxxStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.xbxxValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
    </div>
    <div class="hint">
      <p>肺动脉CTA</p>
    </div>
    <div class="site flex-c" style="flex-wrap:wrap;">
      <div
        class="flex-s"
        style="width:100%;margin-top:30rpx;flex-wrap: wrap;"
        v-if="form.fdmctaImg"
      >
        <img :src="item" v-for=" (item,index) in form.fdmctaImg" :key="index" class="img" />
      </div>
    </div>

    <div class="site">
      <p class="p2">肺动脉CTA</p>
      <div class="flex">
        <picker class="backInput9" :disabled="true" :value="form.fdmctaStatus" :range="array1">
          <view class="picker picBorder">
            {{array1[form.fdmctaStatus]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="form.fdmctaValue"
            :disabled="true"
            style="margin-right:10rpx;"
          />
        </div>
      </div>
    </div>
    <div class="hint">
      <p>护士签名</p>
    </div>
    <div class="frontCard" @click="uploadPhoto">
      <div class="updatePhoto2">
        <img :src="imgUrl" alt />
      </div>
    </div>
    <!-- <div class="btn"
         @click="submit">
      <div class="submit">保存</div>
    </div>-->
    <van-toast id="van-toast"></van-toast>
  </div>
</template>

<script>
import Https from "../../../utils/https";
import store from "../../../utils/store";
let H = new Https();
export default {
  props: ["orderNo"],
  data() {
    return {
      array: ["", "正常", "异常"],
      array1: ["", "正常", "异常", "无"],
      nurseData: {},
      form: {},
      imgUrl: ""
    };
  },

  methods: {
    getData() {
      if (wx.getStorageSync("nurseData")) {
        this.nurseData = wx.getStorageSync("nurseData");
      } else {
        this.nurseData = wx.getStorageSync("patientData");
      }
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.getCheckResultInfo(header, "get", this.orderNo, res => {
        if (res.data.code == 0) {
          let data = res.data.data;
          this.imgUrl = data.signPicture; //患者端要显示的护士签名
          this.form.inflammatoryImg =
            data.inflammatoryImg && JSON.parse(data.inflammatoryImg); //炎症指标图片
          this.form.cruorImg = data.cruorImg && JSON.parse(data.cruorImg); ////凝血指标图片
          this.form.qtzbImg = data.qtzbImg && JSON.parse(data.qtzbImg); ////其他指标图片
          this.form.xgccImg = data.xgccImg && JSON.parse(data.xgccImg); ////血管彩超图片
          this.form.fbctImg = data.fbctImg && JSON.parse(data.fbctImg); ////肺部CT图片
          this.form.xbxxImg = data.xbxxImg && JSON.parse(data.xbxxImg); //胸部X线
          this.form.fdmctaImg = data.fdmctaImg && JSON.parse(data.fdmctaImg); //肺动脉CTA图片
          this.form.sigImage = data.signPicture;
          this.form.hemadStatus = data.hemadStatus; //血细胞状态；1.正常  2.异常
          this.form.hemadBulk = data.hemadBulk; //血细胞容量  *10^9/L
          this.form.soterocyteStatus = data.soterocyteStatus; //血小板状态；1.正常  2.异常
          this.form.soterocyteBulk = data.soterocyteBulk; //血小板容量  *10^9/L
          this.form.oxyphoraseStatus = data.oxyphoraseStatus; //血红蛋白状态；1.正常  2.异常
          this.form.oxyphoraseBulk = data.oxyphoraseBulk; //血红蛋白容量 g/L
          this.form.esrStatus = data.esrStatus; //血沉状态；1.正常  2.异常
          this.form.esrBulk = data.esrBulk; //血沉量  mm/h

          this.form.crpStatus = data.crpStatus; //CRP状态；1.正常  2.异常
          this.form.croBulk = data.croBulk; //CRP量 mg/L
          this.form.thyrocalcitoninStatus = data.thyrocalcitoninStatus; //降钙素原状态；1.正常  2.异常
          this.form.thyrocalcitoninBulk = data.thyrocalcitoninBulk; //降钙素原量  ng/mL
          this.form.thrombinStatus = data.thrombinStatus; //凝血酶原状态；1.正常  2.异常
          this.form.thrombinValue = data.thrombinValue; //凝血酶原（10-16s）
          this.form.thrombinPercentumStatus = data.thrombinPercentumStatus; // 凝血酶原百分比状态；1.正常  2.异常
          this.form.thrombinPercentumValue = data.thrombinPercentumValue; //凝血酶原百分比(70-140%)

          this.form.internationalStandardStatus =
            data.internationalStandardStatus; //国际标准比值；1.正常  2.异常
          this.form.internationalStandardValue =
            data.internationalStandardValue; //国际标准比值(0.8-1.2)
          this.form.hhbfnxmysjStatus = data.hhbfnxmysjStatus; //活化部分凝血酶原时间状态；1.正常  2.异常
          this.form.hhbfnxmysjValue = data.hhbfnxmysjValue; //活化部分凝血酶原时间值 （25.0-43.0 s）
          this.form.nxmsjStatus = data.nxmsjStatus; //凝血酶时间状态；1.正常   2.异常
          this.form.nxmsjValue = data.nxmsjValue; //凝血酶时间（14.0-21.0s）
          this.form.dejtStatus = data.dejtStatus; //D-二聚体；1.正常  2.异常
          this.form.dejtValue = data.dejtValue; //D-二聚体 （mg/L）
          this.form.xwdbyStatus = data.xwdbyStatus; //纤维蛋白原；1.正常  2.异常
          this.form.xwdbyValue = data.xwdbyValue; //纤维蛋白原 （2.0-4.0）
          this.form.xjxwdbyjjcwStatus = data.xjxwdbyjjcwStatus; //血浆纤维蛋白原降解产物；1.正常  2.异常
          this.form.xjxwdbyjjcwValue = data.xjxwdbyjjcwValue; //血浆纤维蛋白原降解产物(0-0.5mg/L)
          this.form.fysjStatus = data.fysjStatus; //反应时间；1.正常  2.异常
          this.form.fysjValue = data.fysjValue; //反应时间 （R）

          this.form.ngsjStatus = data.ngsjStatus; //凝固时间；1.正常  2.异常
          this.form.ngsjValue = data.ngsjValue; //凝固时间 （K）
          this.form.maxRangeStatus = data.maxRangeStatus; // 图中两侧曲线的最宽距离；1.正常  2.异常
          this.form.maxRangeValue = data.maxRangeValue; // 图中两侧曲线的最宽距离 （MA）
          this.form.zdngsjStatus = data.zdngsjStatus; //最大凝固时间；1.正常  2.异常
          this.form.zdngsjValue = data.zdngsjValue; //最大凝固时间
          this.form.gbzamStatus = data.gbzamStatus; //谷丙转氨酶；1.正常  2.异常
          this.form.gbzamValue = data.gbzamValue; //谷丙转氨酶(7.0-40.0U/L)

          this.form.gczamStatus = data.gczamStatus; //谷草转氨酶；1.正常  2.异常
          this.form.gczamValue = data.gczamValue; //谷草转氨酶(13.0-35.0U/L)
          this.form.whiteStatus = data.whiteStatus; //白/球；1.正常  2.异常
          this.form.whiteValue = data.whiteValue; //白/球(1.2-2.4)
          this.form.xgccStatus = data.xgccStatus; //血管彩超 ；0.无  1.正常   2.异常
          this.form.xgccValue = data.xgccValue; //血管彩超 value
          this.form.fbctStatus = data.fbctStatus; //肺部CT；0.无   1.正常   2.异常
          this.form.fbctValue = data.fbctValue; // 肺部CT value
          this.form.xbxxStatus = data.xbxxStatus; // 胸部X线；0.无   1.正常   2.异常
          this.form.xbxxValue = data.xbxxValue; //胸部X线 value
          this.form.fdmctaStatus = data.fdmctaStatus; //肺动脉CTA；0.无   1.正常   2.异常
          this.form.fdmctaValue = data.fdmctaValue; //肺动脉CTA

          let temp = this.form;
          this.form = {};
          this.form = temp;
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    initPage(option) {
      this.orderNo =option.id || option.orderNo || store.state.orderNo;
      this.getData();
    }
  },
  onLoad(option) {
    Object.assign(this.$data, this.$options.data.call(this));
    this.initPage(option);
  },
  onShow() {
    Object.assign(this.$data, this.$options.data.call(this));
    this.initPage();
  }
};
</script>

<style scoped>
.borderB {
  line-height: 0.72rem;
  text-align: center;
  /* margin: -0.2rem 0.07rem 0 0.27rem; */
  width: 3.1rem;
  height: 0.72rem;
  border: 0.02rem solid rgba(230, 230, 230, 1);
  color: #3ca1ff;
  font-size: 30rpx;
}
.picBorder {
  height: 72rpx;
  font-size: 30rpx;
  color: #999999;
  text-align: center;
  line-height: 72rpx;
  border: 1rpx solid #e6e6e6;
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
.mar {
  margin-bottom: 0.3rem;
}
.site >>> .van-button--normal {
  width: 480rpx;
}
.frontCard {
  height: 3.47rem;
  width: 5.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.3rem auto;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 0.27rem;
}
.frontCard > div {
  width: 100%;
  height: 100%;
}
.mm {
  display: flex;
  flex-direction: row;
  /* margin: 0.5rem auto 0.3rem; */
  padding: 0 0.2rem;
  font-size: 0.3rem;
}
.tt {
  text-align: center;
  color: #ccc;
}
.tt > span {
  display: inline-block;
  padding: 0 0.2rem;
}
.p {
  margin-top: 46rpx;
  padding: 0 58rpx;
}
.z {
  padding: 0 0.8rem;
}
.bz {
  padding-bottom: 0.2rem;
  padding-top: 0.2rem;
}
.bz > p {
  padding: 0.34rem 0 0.39rem 0.34rem;
}
.text {
  width: 5.9rem;
  height: 2rem;
  margin: 0 auto;
  border: 0.01rem solid #ccc;
}
.backInput9 {
  /* position: absolute; */
  /* left: 24%; */
  display: inline-block;
  width: 50%;
  /* border-bottom: 1rpx solid #e6e6e6; */
  /* bottom: 280rpx; */
}
.relative {
  position: relative;
}
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.section {
  width: 100%;
  position: absolute;
  overflow-y: scroll;
  /* background-color: #f2f2f2; */
}
.section::-webkit-scrollbar {
  display: none;
}
/* .sect_container{
  overflow-y: scroll;
} */
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
.updatePhoto {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.updatePhoto img {
  width: 0.91rem;
  height: 0.79rem;
  margin-top: 1.06rem;
  margin-bottom: 0.27rem;
}
.img {
  width: 238rpx !important;
  height: 240rpx !important;
  margin-left: 20prx;
}
.updatePhoto2 {
  width: 100%;
  height: 100%;
}
.updatePhoto2 > img {
  width: 5.6rem;
  height: 3.47rem;
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
  border-bottom: 0.02rem solid #e6e6e6;
}
.catheterStandards,
.controlSite {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.catheterStandards > van-radio,

/* 管制地点 */
.site {
  position: relative;
}
.backInput {
  position: absolute;
  left: 30%;
  bottom: 0.36rem;
  display: inline-block;
  width: 50%;
  border-bottom: 0.01rem solid #e6e6e6;
}

.rote {
  display: inline-block;
  transform: rotate(90deg);
}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}
/* 维护时间，维护原因 */
.border {
  border-bottom: 0.01rem solid #e6e6e6;
}

.btn {
  background-color: white;
}

/* 护士签名 */
.signature {
  margin: 0.3rem auto;
  width: 6.7rem;
  height: 2.4rem;
  border: 0.02rem solid #e6e6e6;
}
.signature > img {
  width: 100%;
  height: 100%;
}

.submit {
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
p {
  font-size: 0.3rem;
  color: #313233;
}
</style>
