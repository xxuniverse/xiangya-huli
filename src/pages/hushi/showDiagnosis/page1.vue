<template>
  <div class="containerLogin">
    <div class="sect_container">
      <div class="hint">
        <p style="padding:0px;">导管情况</p>
      </div>
      <!-- <div class="catheterType">
        <p>有无导管</p>
        <van-radio-group :value="form.haveCatheter" :disabled="true" class="conduitType">
          <van-radio :name="1">无</van-radio>
          <van-radio :name="2">有</van-radio>
        </van-radio-group>
      </div>-->
      <div class="site">
        <p style="padding:0px;">导管类型</p>
        <p
          v-for="(item,index) in form.catheterType"
          :key="index"
          style="margin-left:150rpx;color:#3CA1FF"
        >{{item.val}}</p>
      </div>
      <div class="site">
        <p>
          所在部位
          <span
            style="color:#3CA1FF;margin-left:100rpx;"
          >{{ form.position&& form.position.val }}</span>
        </p>
      </div>
      <div class="site">
        <p>
          所在静脉
          <span style="color:#3CA1FF;margin-left:100rpx;">{{form.vein && form.vein.val}}</span>
        </p>
      </div>
    </div>
    <!-- --------------------------------------- -->
    <div class="hint">
      <p>置管史</p>
    </div>
    <div class="catheterType">
      <p>有无置管史</p>
      <van-radio-group class="conduitType" :disabled="true" :value="form.placement">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div class="site">
      <p style="padding:0px;">置管类型</p>
      <p
        v-for="(item,index) in form.placementType"
        :key="index"
        style="margin-left:150rpx;color:#3CA1FF"
      >{{item.val}}</p>
    </div>
    <!-- ---------------------------------------- -->
    <div class="hint">
      <p>服务需求</p>
    </div>
    <div class="check">
      <label class="checkbox">
        <view>
          <checkbox value="1" :disabled="true" shape="square">导管维护</checkbox>
        </view>
      </label>
    </div>
    <p
      v-for="(item,index) in form.catheterAccendant"
      :key="index"
      style="margin-left:100rpx;color:#3CA1FF"
    >{{item.val}}</p>
    <div class="check">
      <label class="checkbox">
        <view>
          <checkbox value="1" :disabled="true" shape="square">并发症处理</checkbox>
        </view>
      </label>
    </div>
    <p
      v-for="(item,index) in form.neopathy"
      :key="index"
      style="margin-left:100rpx;color:#3CA1FF"
    >{{item.val}}</p>
    <!-- ---------------------------- -->
    <div class="hint">
      <p>过敏史</p>
    </div>
    <div class="catheterType">
      <p>有无过敏史</p>
      <van-radio-group class="conduitType" :disabled="true" :value="form.haveAllergy">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div class="site">
      <p
        v-for="(item,index) in form.allergyType"
        :key="index"
        style="margin-left:100rpx;color:#3CA1FF"
      >{{item.val}}</p>
    </div>

    <!-- --------------------------------- -->
    <div class="hint">
      <p>用药情况</p>
    </div>
    <div class="catheterType">
      <p>有无用药</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.haveDrug">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div class="site">
      <p
        v-for="(item,index) in form.drugType"
        :key="index"
        style="margin-left:100rpx;color:#3CA1FF"
      >{{item.val}}</p>
    </div>
    <!-- -------------------------------- -->
    <div class="hint">
      <p>局部症状与体征</p>
    </div>
    <div class="catheterType">
      <p>导管破损</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.catheterDamaged">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div>
      <div class="check">
        <label class="checkbox" style="padding: 0 60rpx;margin-top:10px;">
          <view>
            <checkbox :disabled="true" />体外断裂
          </view>
        </label>
      </div>
      <div class="rank">
        <div class="twoRank" v-if="form.outFracture < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:10rpx;"
          v-if="form.outFracture  >= 1"
        />

        <div class="twoRank" v-if="form.outFracture <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="form.outFracture >= 2"
        />
      </div>

      <div class="check">
        <label class="checkbox" style="padding: 0 60rpx;">
          <view>
            <checkbox :disabled="true" />体内断裂
          </view>
        </label>
      </div>

      <div class="rank">
        <div class="twoRank" v-if="form.inFracture < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:10rpx;"
          v-if="form.inFracture  >= 1"
        />

        <div class="twoRank" v-if="form.inFracture <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="form.inFracture >= 2"
        />
      </div>
    </div>
    <div class="catheterType" style="border-top:2rpx solid #E6E6E6;border-bottom:0px;">
      <p>导管脱出</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.catheterEmerge">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <!-- v-if="form.catheterEmerge == 2" -->
    <div style="border-bottom:2rpx solid #E6E6E6;padding-bottom:30rpx;">
      <div class="mm" style="width: 100%;">
        <span style="margin-right:10rpx;">脱出长度</span>
        <input
          class="borderB"
          type="text"
          :value="form.emergeLen"
          :disabled="true"
          style="margin-right:10rpx;"
        />
        <span>cm</span>
        <div class="rank" style="padding:0px;">
          <div class="twoRank" v-if="form.emergeLevel < 1">+</div>

          <img
            src="/static/images/login/add-blue.png"
            style="margin-left:10rpx;"
            class="img"
            v-if="form.emergeLevel  >= 1"
          />

          <div class="twoRank" v-if="form.emergeLevel <= 1">+</div>

          <img
            src="/static/images/login/add-blue.png"
            class="img"
            style="margin-left:20rpx;"
            v-if="form.emergeLevel >= 2"
          />
        </div>
      </div>
    </div>
    <div class="catheterType" style="border-bottom:0px;">
      <p>穿刺点周围红</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.haveZwh">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div>
      <div class="mm">
        <span style="margin-right:10rpx;">长度</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          :disabled="true"
          :value="form.length"
          type="text"
        />
        <span>cm</span>
      </div>
      <div class="mm">
        <span style="margin-right:10rpx;">宽度</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          :disabled="true"
          :value="form.wide"
          type="text"
        />
        <span>cm</span>
      </div>
      <div class="mm">
        <span style="margin-right:10rpx;">面积</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          :disabled="true"
          :value="form.area"
          type="text"
        />
        <span>cm²</span>
      </div>
      <div
        class="rank flex-c"
        style="margin-top:20rpx;border-bottom:2rpx solid #E6E6E6;padding-bottom:30rpx;"
      >
        <div class="twoRank" v-if="form.zwhLevel < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          style="margin-left:10rpx;"
          class="img"
          v-if="form.zwhLevel  >= 1"
        />

        <div class="twoRank" v-if="form.zwhLevel <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="form.zwhLevel >= 2"
        />
      </div>
    </div>
    <div class="catheterType" style="border-bottom:0px;">
      <p>穿刺侧肢体肿</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.haveSwelling">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div>
      <div class="mm" style="width:100%;">
        <span style="margin-right:10rpx;">肘上10cm臂围</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          :value="form.armCircumference"
          :disabled="true"
          type="text"
        />
        <span>cm</span>
      </div>
      <div class="rank flex-c" style="margin-top:20rpx;">
        <div class="twoRank" v-if="form.armCircumferenceLevel < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          style="margin-left:10rpx;"
          class="img"
          v-if="form.armCircumferenceLevel  >= 1"
        />

        <div class="twoRank" v-if="form.armCircumferenceLevel <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="form.armCircumferenceLevel >= 2"
        />
      </div>
      <div class="mm" style="width:100%;">
        <span style="margin-right:10rpx;">腹股沟下10cm腿围</span>
        <input
          class="borderB"
          style="margin-right:10rpx;"
          type="text"
          :value="form.legCircumference"
          :disabled="true"
        />
        <span>cm</span>
      </div>
      <div
        class="rank flex-c"
        style="margin-top:20rpx;border-bottom:2rpx solid #E6E6E6;padding-bottom:30rpx;"
      >
        <div class="twoRank" v-if="form.legCircumferenceLevel < 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          style="margin-left:10rpx;"
          class="img"
          v-if="form.legCircumferenceLevel  >= 1"
        />

        <div class="twoRank" v-if="form.legCircumferenceLevel <= 1">+</div>

        <img
          src="/static/images/login/add-blue.png"
          class="img"
          style="margin-left:20rpx;"
          v-if="form.legCircumferenceLevel >= 2"
        />
      </div>
    </div>
    <div class="catheterType" style="border-bottom:0px;">
      <p>穿刺侧肢体痛</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.bodyPain">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <p style="height: 54rpx;padding: 0 60px;font-size: 32rpx;" class="content-box">
      疼痛级别
      <span style="color:#3CA1FF;margin-left:100rpx;">{{form.painLevel}}级</span>
    </p>

    <!-- 皮肤破损 -->
    <div class="catheterType" style="flex-wrap:wrap;">
      <div style="width:100%;border:0px;padding:0px;" class="catheterType">
        <p>医用黏胶相关性皮肤损伤</p>
        <van-radio-group class="conduitType" :value="form.isSkinInjury" :disabled="true">
          <van-radio :name="1">无</van-radio>
          <van-radio :name="2">有</van-radio>
        </van-radio-group>
      </div>
      <div style="wdith:100%;">
        <p
          v-for="(item,index) in form.skinInjury"
          :key="index"
          style="margin-left:150rpx;color:#3CA1FF"
        >{{item}}</p>
      </div>

      <div class="site flex-c" style="flex-wrap:wrap; width:100%;">
        <div class="flex-s">
          <div style="position: relative" v-for=" (item,index) in fileList1" :key="index">
            <img :src="item" class="imgBox2" />
          </div>
        </div>
      </div>
    </div>

    <div class="bz">
      <p style="padding-bottom:10px;">其他描述</p>
      <div class="flex-c" style="width:100%;">
        <div
          style="height: 200rpx;width: 97%;border: solid 2rpx  #E1E1E1;margin-top:10px;"
        >{{form.description}}</div>
      </div>
    </div>
    <!-- ----------------------------- -->
    <div class="hint">
      <p>神志清醒与配合程度</p>
    </div>
    <div class="catheterType" style="border-bottom:0px;">
      <p>
        神志状况
        <span
          style="color:#3CA1FF;margin-left:100rpx;"
        >{{form.mindCondition && form.mindCondition.val}}</span>
      </p>
    </div>
    <div class="catheterType" style="padding-top:0px;">
      <p>
        配合情况
        <span
          style="color:#3CA1FF;margin-left:100rpx;"
        >{{ form.coordinateCondition =='1'?"配合":form.coordinateCondition =='2'?"不配合":"" }}</span>
      </p>
    </div>
    <!-- ----------------- -->
    <div class="hint">
      <p>肢体活动障碍</p>
    </div>
    <div class="catheterType" style="border-bottom:0px; padding-bottom: 0px;">
      <p>肢体活动障碍</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.limbsActivityObstacle">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div class="site">
      <p>所在部位</p>
      <p
        v-for="(item,index) in form.limbsPosition"
        :key="index"
        style="margin-left:150rpx;color:#3CA1FF"
      >{{item.val}}</p>
    </div>
    <!-- ------------------------- -->
    <div class="hint">
      <p>身体症状与体征</p>
    </div>
    <div class="catheterType" style="border-bottom:0px; padding-bottom: 0px">
      <p>发热</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.haveHeat">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div>
      <div class="mz">
        <span>腋温</span>
        <input class="borderB" type="text" :value="form.axilTemp" :disabled="true" />
        <span>度</span>
      </div>
      <div class="mz content-box">
        <span>额温</span>
        <input class="borderB" type="text" :value="form.browTemp" :disabled="true" />
        <span>度</span>
      </div>
    </div>
    <div class="catheterType" style="border-bottom:0px;padding-bottom: 0px">
      <p>气促</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.anhelation">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div class="mz content-box">
      <span>呼吸</span>
      <input class="borderB" type="text" :value="form.breathe" :disabled="true" />
      <span>次/分钟</span>
    </div>
    <div class="catheterType" style="border-bottom:0px;padding-bottom: 0px">
      <p>胸痛</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.windPain">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div class="mz">
      <span>部位</span>
      <input
        class="borderB"
        type="text"
        style="margin-left: 83rpx;"
        :value="form.windPosition"
        :disabled="true"
      />
    </div>
    <div class="mz content-box">
      <span>持续时间</span>
      <input class="borderB" type="text" :value="form.windTime" :disabled="true" />
    </div>
    <div class="catheterType" style="border-bottom:0px;padding-bottom: 0px">
      <p>咯血</p>
      <van-radio-group :disabled="true" class="conduitType" :value="form.hemoptysis">
        <van-radio :name="1">无</van-radio>
        <van-radio :name="2">有</van-radio>
      </van-radio-group>
    </div>
    <div class="mz">
      <span>颜色</span>
      <input class="borderB" type="text" :value="form.pigment" :disabled="true" />
    </div>
    <div class="mz content-box">
      <span>量</span>
      <input
        class="borderB"
        type="text"
        :value="form.bulk"
        :disabled="true"
        style="margin-left: 29px;"
      />
      <span>ml</span>
    </div>
    <div class="mz">
      <span>血压</span>
      <input
        class="borderB"
        type="text"
        :value="form.bloodPressure"
        :disabled="true"
        style="margin-left: 29px;"
      />
    </div>
    <div class="mz">
      <span>收缩压</span>
      <input class="borderB" type="text" :value="form.systolicPressure" :disabled="true" />
      <span>mmHg</span>
    </div>
    <div class="mz content-box">
      <span>舒张压</span>
      <input class="borderB" type="text" :value="form.diastolicPressure" :disabled="true" />
      <span>mmHg</span>
    </div>
    <div class="mz">
      <span>脉搏</span>
      <input class="borderB" type="text" :value="form.pulse" :disabled="true" />
    </div>
    <div class="mz content-box">
      <span>脉搏频率</span>
      <input class="borderB" type="text" :value="form.pulseRate" :disabled="true" />
      <span>次/分钟</span>
    </div>
    <!-- ----------------------------- -->
    <div class="bz">
      <p style="padding-top:0px;">其他备注</p>
      <div class="text">{{form.remark}}</div>
    </div>

    <div class="hint">
      <p>诊疗前图片</p>
    </div>
    <div class="site">
      <div class="flex-s imgBox">
        <div style="position: relative" v-for="(item,index) in fileList" :key="index">
          <!-- <van-icon
            name="close"
            class="closeIcon"
            @click="closePage($event,item,index,'beforeDiagnosisImg')"
          />-->
          <img :src="item" class="imgBox2" />
        </div>
      </div>
    </div>
    <van-toast id="van-toast"></van-toast>
    <!-- <div class="btn">
      <div class="submit"
           @click="back">返回</div>
    </div>-->
  </div>
</template>

<script>
import Https from "../../../utils/https";
import store from "../../../utils/store";
let H = new Https();

export default {
  data() {
    return {
      form: {},
      flag: false,
      orderNo: "",
      fileList: [],
      fileList1: []
    };
  },
  methods: {
    getData() {
      let nurseData = "";
      if (wx.getStorageSync("nurseData")) {
        nurseData = wx.getStorageSync("nurseData");
      } else {
        nurseData = wx.getStorageSync("patientData");
      }
      let header = {
        "content-type": "application/json",
        "API-User-Token": nurseData.token
      };
      H.selectAppraiseInfo(header, "post", this.orderNo, res => {
        if (res.data.code == 0) {
          this.filterData(res.data.data);
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    filterData(data) {
      this.form.haveCatheter = String(2);
      // String(data.haveCatheter) || ""; //有无导管
      this.form.placement = String(data.placement) || ""; //有无置管史；1.无   2.有
      this.form.haveAllergy = String(data.haveAllergy) || ""; //有无过敏史；1.无  2.有
      this.form.haveDrug = String(data.haveDrug) || ""; //有无用药 ；1.无  2.有
      this.form.limbsActivityObstacle =
        String(data.limbsActivityObstacle) || ""; //肢体活动障碍；1.无  2.有

      this.form.catheterType =
        data.catheterType && JSON.parse(data.catheterType); //导管类型
      this.form.position = data.position && JSON.parse(data.position); //所在部位
      this.form.vein = data.vein && JSON.parse(data.vein); //所在静脉
      this.form.placementType =
        data.placementType && JSON.parse(data.placementType); //置管类型

      this.form.catheterAccendant =
        data.catheterAccendant && JSON.parse(data.catheterAccendant); //{\"id\":41,\"val\":\"PICC\"}",//导管维护
      this.form.neopathy = data.neopathy && JSON.parse(data.neopathy); //并发症处理

      this.form.allergyType = data.allergyType && JSON.parse(data.allergyType); //过敏种类
      this.form.drugType = data.drugType && JSON.parse(data.drugType); //用药种类
      this.form.catheterDamaged = String(data.catheterDamaged) || ""; //导管是否破损 1.无   2.有
      this.form.inFracture = data.inFracture; //体内断裂等级  （1-2）
      this.form.outFracture = data.outFracture; //体外断裂等级  （1-2）
      this.form.catheterEmerge = String(data.catheterEmerge) || ""; //导管是否脱出；1.无  2.有
      this.form.emergeLen = data.emergeLen; //脱出长度（单位CM）
      this.form.emergeLevel = data.emergeLevel; //导管脱出程度 （1-2）
      this.form.haveZwh = String(data.haveZwh) || ""; //穿刺点周围红；1.无  2.有
      this.form.length = data.length; // 长（单位CM）
      this.form.wide = data.wide; //宽（单位CM）
      this.form.area = data.area; //面积（单位c㎡）
      this.form.zwhLevel = data.zwhLevel; //穿刺点周围红程度（1-2）
      this.form.haveSwelling = String(data.haveSwelling) || ""; //穿刺侧肢体肿 ;  1.无   2.有
      this.form.armCircumference = data.armCircumference; //肘上10CM臂围（单位CM）
      this.form.armCircumferenceLevel = data.armCircumferenceLevel; //臂围体肿程度（1-2）
      this.form.legCircumference = data.legCircumference; //腹股沟下10CM腿围（单位CM）
      this.form.legCircumferenceLevel = data.legCircumferenceLevel; //腿围体肿程度（1-2）
      this.form.bodyPain = String(data.bodyPain) || ""; // 穿刺侧肢体痛；1.无  2.有
      this.form.painLevel = data.painLevel; //疼痛级别 0-无痛 1-3：轻度疼痛 4-6：中度疼痛  7-9：重度疼痛  10剧痛
      this.form.description = data.description; //其他描述
      this.form.mindCondition =
        data.mindCondition && JSON.parse(data.mindCondition); //神志状况；示列：{ id  =1, val  = 清醒 }
      this.form.coordinateCondition = data.coordinateCondition; //配合情况；1.配合   2.不配合
      this.form.limbsPosition =
        data.limbsPosition && JSON.parse(data.limbsPosition); //肢体所在部位；[{ id  =1, val  = 四肢 }]
      this.form.haveHeat = String(data.haveHeat) || ""; //发热；1.无   2.有
      this.form.axilTemp = data.axilTemp; //腋温（单位°）
      this.form.browTemp = data.browTemp; //额温（单位°）
      this.form.anhelation = String(data.anhelation) || ""; //气促；1.无  2.有
      this.form.breathe = data.breathe; //呼吸多少次/分钟
      this.form.windPain = String(data.windPain) || ""; //胸痛；1.无   2.有
      this.form.windPosition = data.windPosition; //胸痛部位
      this.form.windTime = data.windTime; //胸痛持续时间（单位分钟）
      this.form.hemoptysis = String(data.hemoptysis) || ""; //咯血；1.无  2.有
      this.form.pigment = data.pigment; //颜色
      this.form.bulk = data.bulk; //量（单位ml）
      this.form.bloodPressure = data.bloodPressure; //血压
      this.form.systolicPressure = data.systolicPressure; //收缩压（mmHh）
      this.form.diastolicPressure = data.diastolicPressure; //舒张压（mmHh）
      this.form.pulse = data.pulse; //脉搏
      this.form.pulseRate = data.pulseRate; //脉搏频率  次/分钟
      this.form.remark = data.remark; //其他备注

      // 回显皮肤损伤
      this.form.isSkinInjury = String(data.isSkinInjury) || "";
      this.form.skinInjury = data.skinInjury.split(",") || [];

      this.fileList1 = [];

      data.skinInjuryImgOne && this.fileList1.push(data.skinInjuryImgOne);
      data.skinInjuryImgTwo && this.fileList1.push(data.skinInjuryImgTwo);
      this.fileList = [];
      data.beforeDiagnosisImg && this.fileList.push(data.beforeDiagnosisImg);

      let demo = this.form;
      this.form = "";
      this.form = demo;
    },
    initPage(option) {
      this.orderNo = option.id || option.orderNo || store.state.orderNo;
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
.content-box {
  padding-bottom: 20px !important;
  border-bottom: 0.02rem solid #e6e6e6;
}

.rank {
  display: flex;
  justify-content: center;
  margin: 5px 0px;
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
.imgBox {
  width: 100%;
  margin-top: 30rpx;
  flex-wrap: wrap !important;
}
.imgBox2 {
  width: 238rpx !important;
  height: 240rpx !important;
  margin-left: 20prx;
}
.mz {
  display: flex;
  flex-direction: row;
  margin: 35rpx auto 30rpx;
  font-size: 0.3rem;
  padding: 0 0.58rem;
  align-items: center;
}
.threeRank {
  margin-left: 0.2rem;
  width: 0.8rem;
  height: 0.64rem;
  line-height: 0.64rem;
  text-align: center;
  color: white;
  font-size: 0.3rem;
  background-color: #4ba4fe;
  /* border: 0.01rem solid #ccc; */
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
.borderB {
  text-align: center;
  margin: 0px 10px;
  width: 2.6rem;
  height: 0.62rem;
  border: 0.02rem solid rgba(230, 230, 230, 1);
  color: #3ca1ff;
  font-size: 30rpx;
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
/* 导管规格 */
.site {
  padding: 0.36rem 0.4rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #e6e6e6;
}
/* 管制地点 */
.site {
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
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.45rem;
  padding: 0 0.1rem;
  font-size: 0.3rem;
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
/* 维护时间，维护原因 */
.border {
  border-bottom: 0.01rem solid #e6e6e6;
}
.btn {
  background-color: white;
}
p {
  font-size: 0.3rem;
  color: #313233;
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
  margin-top: 0.8rem;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  color: white;
}
.img {
  width: 80rpx;
  height: 64rpx;
}
</style>
