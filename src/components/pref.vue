<template>
  <div class="containerLogin" :style="{height:height+'px'}">
    <div class="sect_container">
      <div class="hint">
        <p>炎症指标</p>
      </div>
      <div class="site flex-c" style="flex-wrap:wrap;">
        <div style="width:100%; " class="flex-c">
          <van-button round @click="upload(0,'inflammatoryImg')">上传图片</van-button>
        </div>

        <div class="flex-s imgBox">
          <div style="position: relative" v-for=" (item,index) in fileList[0]" :key="index">
            <van-icon
              name="close"
              class="closeIcon"
              @click="closePage($event,0,item,index,'inflammatoryImg')"
            />
            <img :src="item" class="img" />
          </div>
        </div>
      </div>
      <div class="site">
        <p>血常规</p>
        <van-radio-group
          @change="onChange($event,'hasXueCg')"
          :value="hasXueCg"
          class="conduitType"
        >
          <label class="checkbox">
            <view>
              <van-radio name="0">无</van-radio>
            </view>
          </label>
          <label class="checkbox">
            <view>
              <van-radio name="1">有</van-radio>
            </view>
          </label>
        </van-radio-group>
        <div v-if="hasXueCg == 1">
          <p class="p2">白细胞（3.5-9.5*10⁹/L）</p>
          <div class="flex">
            <picker
              class="backInput9"
              @change="bindPickerChange($event,0,'hemadStatus')"
              :value="list[0]"
              :range="array"
            >
              <view class="picker picBorder">
                {{array[list[0]]}}
                <span class="rote">
                  <van-icon name="play" />
                </span>
              </view>
            </picker>
            <div class="mm">
              <input
                class="borderB"
                :value="hemadBulk"
                v-model="hemadBulk"
                type="text"
                @change="hasInput($event,0,'hemadBulk')"
                style="margin-right:10rpx;"
              />
              <span>*10⁹/L</span>
            </div>
          </div>

          <p class="p2">血小板（125-350*10⁹/L）</p>
          <div class="flex">
            <picker
              class="backInput9"
              @change="bindPickerChange($event,1,'soterocyteStatus')"
              :value="list[1]"
              :range="array"
            >
              <view class="picker picBorder">
                {{array[list[1]]}}
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
                v-model="soterocyteBulk"
                :value="soterocyteBulk"
                @change="hasInput($event,1,'soterocyteBulk')"
                style="margin-right:10rpx;"
              />
              <span>*10⁹/L</span>
            </div>
          </div>

          <p class="p2">血红蛋白（115-150g/L）</p>
          <div class="flex">
            <picker
              class="backInput9"
              @change="bindPickerChange($event,2,'oxyphoraseStatus')"
              :value="list[2]"
              :range="array"
            >
              <view class="picker picBorder">
                {{array[list[2]]}}
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
                v-model="oxyphoraseBulk"
                :value="oxyphoraseBulk"
                @change="hasInput($event,2,'oxyphoraseBulk')"
                style="margin-right:10rpx;"
              />
              <span>*10⁹/L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 血常规 ------------------------------------------>
    <div class="site">
      <p>血沉</p>
      <van-radio-group
        @change="onChange($event,'hasXueCheng')"
        :value="hasXueCheng"
        class="conduitType"
      >
        <label class="checkbox">
          <view>
            <van-radio name="0">无</van-radio>
          </view>
        </label>
        <label class="checkbox">
          <view>
            <van-radio name="1">有</van-radio>
          </view>
        </label>
      </van-radio-group>
      <div v-if="hasXueCheng == 1">
        <p class="p2">血沉（0-38mm/h）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,3,'esrStatus')"
            :value="list[3]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[3]]}}
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
              v-model="esrBulk"
              :value="esrBulk"
              @change="hasInput($event,3,'esrBulk')"
              style="margin-right:10rpx;"
            />
            <span>mm/h</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 血沉 ------------------------------------------>
    <div class="site">
      <p>CRP</p>
      <van-radio-group @change="onChange($event,'hasCRP')" :value="hasCRP" class="conduitType">
        <label class="checkbox">
          <view>
            <van-radio name="0">无</van-radio>
          </view>
        </label>
        <label class="checkbox">
          <view>
            <van-radio name="1">有</van-radio>
          </view>
        </label>
      </van-radio-group>
      <div v-if="hasCRP == 1">
        <p class="p2">CRP（0-8mg/L）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,4,'crpStatus')"
            :value="list[4]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[4]]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <input
              class="borderB"
              type="text"
              v-model="croBulk"
              :value="croBulk"
              @change="hasInput($event,4,'croBulk')"
              style="margin-right:10rpx;"
            />
            <span>mg/L</span>
          </div>
        </div>
      </div>
    </div>
    <!-- CRP ------------------------------------------>
    <div class="site">
      <p>降钙素原</p>
      <van-radio-group @change="onChange($event,'hasJGYS')" :value="hasJGYS" class="conduitType">
        <label class="checkbox">
          <view>
            <van-radio name="0">无</van-radio>
          </view>
        </label>
        <label class="checkbox">
          <view>
            <van-radio name="1">有</van-radio>
          </view>
        </label>
      </van-radio-group>

      <div v-if="hasJGYS == 1">
        <p class="p2">降钙素原（＜0.05ng/mL）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,5,'thyrocalcitoninStatus')"
            :value="list[5]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[5]]}}
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
              v-model="thyrocalcitoninBulk"
              :value="thyrocalcitoninBulk"
              @change="hasInput($event,5,'thyrocalcitoninBulk')"
              style="margin-right:10rpx;"
            />
            <span>ng/mL</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 降钙素原 ------------------------------------------>
    <div class="hint">
      <p>凝血指标</p>
    </div>
    <div class="site flex-c" style="flex-wrap:wrap;">
      <div style="width:100%; " class="flex-c">
        <van-button round @click="upload(1,'cruorImg')">上传图片</van-button>
      </div>

      <div class="flex-s imgBox">
        <div style="position: relative" v-for=" (item,index) in fileList[1]" :key="index">
          <van-icon
            name="close"
            class="closeIcon"
            @click="closePage($event,1,item,index,'cruorImg')"
          />
          <img :src="item" class="img" />
        </div>
      </div>
    </div>
    <div class="site">
      <p>凝血常规</p>
      <van-radio-group @change="onChange($event,'hasNXCG')" :value="hasNXCG" class="conduitType">
        <label class="checkbox">
          <view>
            <van-radio name="0">无</van-radio>
          </view>
        </label>
        <label class="checkbox">
          <view>
            <van-radio name="1">有</van-radio>
          </view>
        </label>
      </van-radio-group>

      <div v-if="hasNXCG == 1">
        <p class="p2">凝血酶原（10-16s）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,6,'thrombinStatus')"
            :value="list[6]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[6]]}}
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
              v-model="thrombinValue"
              :value="thrombinValue"
              @change="hasInput($event,6,'thrombinValue')"
              style="margin-right:10rpx;"
            />
            <span>s</span>
          </div>
        </div>
        <p class="p2">凝血酶原百分比（70-140%）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,7,'thrombinPercentumStatus')"
            :value="list[7]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[7]]}}
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
              v-model="thrombinPercentumValue"
              :value="thrombinPercentumValue"
              @change="hasInput($event,7,'thrombinPercentumValue')"
              style="margin-right:10rpx;"
            />
            <span>%</span>
          </div>
        </div>
        <p class="p2">国际标准比值（0.8-1.2）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,8,'internationalStandardStatus')"
            :value="list[8]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[8]]}}
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
              v-model="internationalStandardValue"
              :value="internationalStandardValue"
              @change="hasInput($event,8,'internationalStandardValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>%</span> -->
          </div>
        </div>
        <p class="p2">活化部分凝血酶原时间（25.0-43.0）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,9,'hhbfnxmysjStatus')"
            :value="list[9]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[9]]}}
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
              v-model="hhbfnxmysjValue"
              :value="hhbfnxmysjValue"
              @change="hasInput($event,9,'hhbfnxmysjValue')"
              style="margin-right:10rpx;"
            />
            <span>s</span>
          </div>
        </div>
        <p class="p2">凝血酶时间（14.0-21.0s）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,10,'nxmsjStatus')"
            :value="list[10]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[10]]}}
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
              v-model="nxmsjValue"
              :value="nxmsjValue"
              @change="hasInput($event,10,'nxmsjValue')"
              style="margin-right:10rpx;"
            />
            <span>s</span>
          </div>
        </div>
        <p class="p2">D-二聚体（0-0.5mg/L）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,11,'dejtStatus')"
            :value="list[11]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[11]]}}
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
              v-model="dejtValue"
              :value="dejtValue"
              @change="hasInput($event,11,'dejtValue')"
              style="margin-right:10rpx;"
            />
            <span>mg/L</span>
          </div>
        </div>
        <p class="p2">纤维蛋白原（2.0-4.0）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,12,'xwdbyStatus')"
            :value="list[12]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[12]]}}
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
              v-model="xwdbyValue"
              :value="xwdbyValue"
              @change="hasInput($event,12,'xwdbyValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>g</span> -->
          </div>
        </div>
        <p class="p2">血浆纤维蛋白（原）降解产物（0-0.5mg/L）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,13,'xjxwdbyjjcwStatus')"
            :value="list[13]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[13]]}}
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
              v-model="xjxwdbyjjcwValue"
              :value="xjxwdbyjjcwValue"
              @change="hasInput($event,13,'xjxwdbyjjcwValue')"
              style="margin-right:10rpx;"
            />
            <span>mg/L</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 凝血常规 ------------------------------------------->
    <div class="site">
      <p>血栓弹力图</p>
      <van-radio-group @change="onChange($event,'hasXSTLT')" :value="hasXSTLT" class="conduitType">
        <label class="checkbox">
          <view>
            <van-radio name="0">无</van-radio>
          </view>
        </label>
        <label class="checkbox">
          <view>
            <van-radio name="1">有</van-radio>
          </view>
        </label>
      </van-radio-group>

      <div v-if="hasXSTLT ==1">
        <p class="p2">反应时间（R）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,14,'fysjStatus')"
            :value="list[14]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[14]]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <input
              class="borderB"
              type="text"
              v-model="fysjValue"
              :value="fysjValue"
              @change="hasInput2($event,14,'fysjValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>ng/mL</span> -->
          </div>
        </div>
        <p class="p2">凝固时间（K）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,15,'ngsjStatus')"
            :value="list[15]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[15]]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <input
              class="borderB"
              type="text"
              v-model="ngsjValue"
              :value="ngsjValue"
              @change="hasInput2($event,15,'ngsjValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>ng/mL</span> -->
          </div>
        </div>
        <p class="p2">图中两侧曲线的最宽距离（MA）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,16,'maxRangeStatus')"
            :value="list[16]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[16]]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <input
              class="borderB"
              type="text"
              v-model="maxRangeValue"
              :value="maxRangeValue"
              @change="hasInput2($event,16,'maxRangeValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>ng/mL</span> -->
          </div>
        </div>
        <p class="p2">最大凝固时间（m）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,17,'zdngsjStatus')"
            :value="list[17]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[17]]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <input
              class="borderB"
              type="text"
              v-model="zdngsjValue"
              :value="zdngsjValue"
              @change="hasInput2($event,17,'zdngsjValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>ng/mL</span> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 血栓弹力图 ------------------------------------------->

    <div class="hint">
      <p>其它指标</p>
    </div>
    <div class="site flex-c" style="flex-wrap:wrap;">
      <div style="width:100%; " class="flex-c">
        <van-button round @click="upload(2,'qtzbImg')">上传图片</van-button>
      </div>

      <div class="flex-s imgBox">
        <div style="position: relative" v-for=" (item,index) in fileList[2]" :key="index">
          <van-icon
            name="close"
            class="closeIcon"
            @click="closePage($event,2,item,index,'qtzbImg')"
          />
          <img :src="item" class="img" />
        </div>
      </div>
    </div>

    <div class="site">
      <p>肝功能</p>

      <van-radio-group @change="onChange($event,'hasGGN')" :value="hasGGN" class="conduitType">
        <label class="checkbox">
          <view>
            <van-radio name="0">无</van-radio>
          </view>
        </label>
        <label class="checkbox">
          <view>
            <van-radio name="1">有</van-radio>
          </view>
        </label>
      </van-radio-group>

      <div v-if="hasGGN == 1">
        <p class="p2">谷丙转氨酶（7.0-40.0U/L）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,18,'gbzamStatus')"
            :value="list[18]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[18]]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <input
              class="borderB"
              :value="gbzamValue"
              type="text"
              v-model="gbzamValue"
              @change="hasInput($event,18,'gbzamValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>ng/mL</span> -->
          </div>
        </div>
        <p class="p2">谷草转氨酶（13.0-35.0U/L）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,19,'gczamStatus')"
            :value="list[19]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[19]]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <input
              class="borderB"
              :value="gczamValue"
              type="text"
              v-model="gczamValue"
              @change="hasInput($event,19,'gczamValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>ng/mL</span> -->
          </div>
        </div>
        <p class="p2">白/球（1.2-2.4）</p>
        <div class="flex">
          <picker
            class="backInput9"
            @change="bindPickerChange($event,20,'whiteStatus')"
            :value="list[20]"
            :range="array"
          >
            <view class="picker picBorder">
              {{array[list[20]]}}
              <span class="rote">
                <van-icon name="play" />
              </span>
            </view>
          </picker>
          <div class="mm">
            <input
              class="borderB"
              :value="whiteValue"
              type="text"
              v-model="whiteValue"
              @change="hasInput($event,20,'whiteValue')"
              style="margin-right:10rpx;"
            />
            <!-- <span>ng/mL</span> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 肝功能 ---------------------------------- -->
    <div class="hint">
      <p>血管彩超</p>
    </div>
    <div class="site flex-c" style="flex-wrap:wrap;">
      <div style="width:100%; " class="flex-c">
        <van-button round @click="upload(3,'xgccImg')">上传图片</van-button>
      </div>

      <div class="flex-s imgBox">
        <div style="position: relative" v-for=" (item,index) in fileList[3]" :key="index">
          <van-icon
            name="close"
            class="closeIcon"
            @click="closePage($event,3,item,index,'xgccImg')"
          />
          <img :src="item" class="img" />
        </div>
      </div>
    </div>

    <div class="site">
      <p class="p2">血管彩超</p>
      <div class="flex">
        <picker
          class="backInput9"
          @change="bindPickerChange($event,21,'xgccStatus',1)"
          :value="list[21]"
          :range="array1"
        >
          <view class="picker picBorder">
            {{array1[list[21]]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            v-model="xgccValue"
            :value="xgccValue"
            @change="hasInput2($event,21,'xgccValue')"
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
      <div style="width:100%; " class="flex-c">
        <van-button round @click="upload(4,'fbctImg')">上传图片</van-button>
      </div>

      <div class="flex-s imgBox">
        <div style="position: relative" v-for=" (item,index) in fileList[4]" :key="index">
          <van-icon
            name="close"
            class="closeIcon"
            @click="closePage($event,4,item,index,'fbctImg')"
          />
          <img :src="item" class="img" />
        </div>
      </div>
    </div>

    <div class="site">
      <p class="p2">肺部CT</p>
      <div class="flex">
        <picker
          class="backInput9"
          @change="bindPickerChange($event,22,'fbctStatus',1)"
          :value="list[22]"
          :range="array1"
        >
          <view class="picker picBorder">
            {{array1[list[22]]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="fbctValue"
            v-model="fbctValue"
            @change="hasInput2($event,22,'fbctValue')"
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
      <div style="width:100%; " class="flex-c">
        <van-button round @click="upload(5,'xbxxImg')">上传图片</van-button>
      </div>

      <div class="flex-s imgBox">
        <div style="position: relative" v-for=" (item,index) in fileList[5]" :key="index">
          <van-icon
            name="close"
            class="closeIcon"
            @click="closePage($event,5,item,index,'xbxxImg')"
          />
          <img :src="item" class="img" />
        </div>
      </div>
    </div>

    <div class="site">
      <p class="p2">胸部X线</p>
      <div class="flex">
        <picker
          class="backInput9"
          @change="bindPickerChange($event,23,'xbxxStatus',1)"
          :value="list[23]"
          :range="array1"
        >
          <view class="picker picBorder">
            {{array1[list[23]]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            :value="xbxxValue"
            v-model="xbxxValue"
            @change="hasInput2($event,23,'xbxxValue')"
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
      <div style="width:100%; " class="flex-c">
        <van-button round @click="upload(6,'fdmctaImg')">上传图片</van-button>
      </div>
      <div class="flex-s imgBox">
        <div style="position: relative" v-for=" (item,index) in fileList[6]" :key="index">
          <van-icon
            name="close"
            class="closeIcon"
            @click="closePage($event,6,item,index,'fdmctaImg')"
          />
          <img :src="item" class="img" />
        </div>
      </div>
    </div>

    <div class="site">
      <p class="p2">肺动脉CTA</p>
      <div class="flex">
        <picker
          class="backInput9"
          @change="bindPickerChange($event,24,'fdmctaStatus',1)"
          :value="list[24]"
          :range="array1"
        >
          <view class="picker picBorder">
            {{array1[list[24]]}}
            <span class="rote">
              <van-icon name="play" />
            </span>
          </view>
        </picker>
        <div class="mm">
          <input
            class="borderB"
            type="text"
            v-model="fdmctaValue"
            :value="fdmctaValue"
            @change="hasInput2($event,24,'fdmctaValue')"
            style="margin-right:10rpx;"
          />
          <!-- <span>ng/mL</span> -->
        </div>
      </div>
    </div>
    <div class="hint">
      <p>护士签名</p>
    </div>
    <div class="frontCard" @click="uploadPhoto">
      <div class="updatePhoto2">
        <img :src="nurseData.signImg" alt />
      </div>
    </div>
    <div class="btn" @click="submit">
      <div class="submit">保存</div>
    </div>
    <van-toast id="van-toast"></van-toast>
  </div>
</template>

<script>
import Https from "../utils/https";
import Dialog from "../../static/vant/dist/dialog/dialog";
import store from "../utils/store";

let H = new Https();
export default {
  props: ["orderNo", "height"],
  data() {
    return {
      fileList: [],
      array: ["正常", "异常"],
      array1: ["无", "正常", "异常"],
      list: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      nurseData: {},
      objData: {},
      hemadBulk: " ",
      soterocyteBulk: " ",
      oxyphoraseBulk: " ",
      esrBulk: " ",
      croBulk: " ",
      thyrocalcitoninBulk: " ",
      thrombinValue: " ",
      thrombinPercentumValue: " ",
      internationalStandardValue: " ",
      hhbfnxmysjValue: " ",
      nxmsjValue: " ",
      dejtValue: " ",
      xwdbyValue: " ",
      xjxwdbyjjcwValue: " ",
      gbzamValue: " ",
      gczamValue: " ",
      whiteValue: " ",
      right: "",
      fdmctaValue: " ",
      xbxxValue: " ",
      fbctValue: " ",
      xgccValue: " ",
      zdngsjValue: " ",
      maxRangeValue: " ",
      ngsjValue: " ",
      fysjValue: " ",
      uploadFlag: false,

      hasXueCg: "",
      hasGGN: "",
      hasXSTLT: "",
      hasNXCG: "",
      hasJGYS: "",
      hasCRP: "",
      hasXueCheng: ""
    };
  },

  methods: {
    onChange(val, name) {
      this[name] = val.mp.detail;
      this.objData[name] = val.mp.detail;
      if (val.mp.detail == "0") {
        if (name == "hasXueCg") {
          this.list[0] = ""; //血细胞状态；1.正常  2.异常
          this.objData["hemadStatus"] = "";

          this.hemadBulk = " "; //血细胞容量  *10^9/L
          this.objData["hemadBulk"] = " ";

          this.list[1] = ""; //血小板状态；1.正常  2.异常
          this.objData["soterocyteStatus"] = "";

          this.soterocyteBulk = " "; //血小板容量  *10^9/L
          this.objData["soterocyteBulk"] = " ";

          this.list[2] = ""; //血红蛋白状态；1.正常  2.异常
          this.objData["oxyphoraseStatus"] = "";

          this.oxyphoraseBulk = " "; //血红蛋白容量 g/L
          this.objData["oxyphoraseBulk"] = " ";
        }
        if (name == "hasXueCheng") {
          this.list[3] = ""; //血沉状态；1.正常  2.异常
          this.objData["esrStatus"] = "";
          this.esrBulk = " "; //血沉量  mm/h
          this.objData["esrBulk"] = " ";
        }
        if (name == "hasCRP") {
          this.list[4] = ""; //CRP状态；1.正常  2.异常
          this.objData["crpStatus"] = "";
          this.croBulk = " "; //CRP量 mg/L
          this.objData["croBulk"] = " ";
        }
        if (name == "hasJGYS") {
          this.list[5] = ""; //降钙素原状态；1.正常  2.异常
          this.objData["thyrocalcitoninStatus"] = "";
          this.thyrocalcitoninBulk = " "; //降钙素原量  ng/mL
          this.objData["thyrocalcitoninBulk"] = " ";
        }
        if (name == "hasNXCG") {
          this.list[6] = ""; //凝血酶原状态；1.正常  2.异常
          this.thrombinValue = " "; //凝血酶原（10-16s）
          this.list[7] = ""; // 凝血酶原百分比状态；1.正常  2.异常
          this.thrombinPercentumValue = " "; //凝血酶原百分比(70-140%)
          this.list[8] = ""; //国际标准比值；1.正常  2.异常
          this.internationalStandardValue = " "; //国际标准比值(0.8-1.2)
          this.list[9] = ""; //活化部分凝血酶原时间状态；1.正常  2.异常
          this.hhbfnxmysjValue = " "; //活化部分凝血酶原时间值 （25.0-43.0 s）
          this.list[10] = ""; //凝血酶时间状态；1.正常   2.异常
          this.nxmsjValue = " "; //凝血酶时间（14.0-21.0s）
          this.list[11] = ""; //D-二聚体；1.正常  2.异常
          this.dejtValue = " "; //D-二聚体 （mg/L）
          this.list[12] = ""; //纤维蛋白原；1.正常  2.异常
          this.xwdbyValue = " "; //纤维蛋白原 （2.0-4.0）
          this.list[13] = ""; //血浆纤维蛋白原降解产物；1.正常  2.异常
          this.xjxwdbyjjcwValue = " "; //血浆纤维蛋白原降解产物(0-0.5mg/L)
          // -----------------
          this.objData["thrombinStatus"] = "";
          this.objData["thrombinPercentumStatus"] = "";
          this.objData["internationalStandardStatus"] = "";
          this.objData["hhbfnxmysjStatus"] = "";
          this.objData["nxmsjStatus"] = "";
          this.objData["dejtStatus"] = "";
          this.objData["xwdbyStatus"] = "";
          this.objData["xjxwdbyjjcwStatus"] = "";
          // ------------------
          this.objData["thrombinValue"] = " "; //凝血酶原（10-16s）
          this.objData["thrombinPercentumValue ="] = " "; //凝血酶原百分比(70-140%)
          this.objData["internationalStandardValue"] = " "; //国际标准比值(0.8-1.2)
          this.objData["hhbfnxmysjValue"] = " "; //活化部分凝血酶原时间值 （25.0-43.0 s）
          this.objData["nxmsjValue"] = " "; //凝血酶时间（14.0-21.0s）
          this.objData["dejtValue"] = " "; //D-二聚体 （mg/L）
          this.objData["xwdbyValue"] = " "; //纤维蛋白原 （2.0-4.0）
          this.objData["xjxwdbyjjcwValue"] = " "; //血浆纤维蛋白原降解产物(0-0.5mg/L)
        }
        if (name == "hasXSTLT") {
          this.list[14] = ""; //反应时间；1.正常  2.异常
          this.fysjValue = " "; //反应时间 （R）
          this.list[15] = ""; //凝固时间；1.正常  2.异常
          this.ngsjValue = " "; //凝固时间 （K）
          this.list[16] = ""; // 图中两侧曲线的最宽距离；1.正常  2.异常
          this.maxRangeValue = " "; // 图中两侧曲线的最宽距离 （MA）
          this.list[17] = ""; //最大凝固时间；1.正常  2.异常
          this.zdngsjValue = " "; //最大凝固时间

          this.objData["fysjStatus"] = ""; //反应时间；1.正常  2.异常
          this.objData["ngsjStatus"] = ""; //凝固时间；1.正常  2.异常
          this.objData["maxRangeStatus"] = ""; // 图中两侧曲线的最宽距离；1.正常  2.异常
          this.objData["zdngsjStatus"] = "";

          this.objData["fysjValue"] = " "; //反应时间 （R）
          this.objData["ngsjValue"] = " "; //凝固时间 （K）
          this.objData["maxRangeValue"] = " "; // 图中两侧曲线的最宽距离 （MA）
          this.objData["zdngsjValue"] = " "; //最大凝固时间
        }
        if (name == "hasGGN") {
          this.list[18] = ""; //谷丙转氨酶；1.正常  2.异常
          this.gbzamValue = " "; //谷丙转氨酶(7.0-40.0U/L)

          this.list[19] = ""; //谷草转氨酶；1.正常  2.异常
          this.gczamValue = " "; //谷草转氨酶(13.0-35.0U/L)

          this.list[20] = ""; //白/球；1.正常  2.异常
          this.whiteValue = " "; //白/球(1.2-2.4)

          this.objData["gbzamStatus"] = "";
          this.objData["gczamStatus"] = "";
          this.objData["whiteStatus"] = "";

          this.objData["gbzamValue"] = " "; //谷丙转氨酶(7.0-40.0U/L)
          this.objData["gczamValue"] = " "; //谷草转氨酶(13.0-35.0U/L)
          this.objData["whiteValue"] = " "; //白/球(1.2-2.4)
        }
      }
    },
    closePage(e, index, item, key, name) {
      this.fileList[index].splice(key, 1);
      wx.showLoading({
        title: "加载中"
      });
      this.fileList = [...this.fileList];
      this.objData[name] = JSON.stringify(this.fileList[index]);
      this.saveData();
      setTimeout(() => {
        wx.hideLoading();
      }, 200);
    },
    //上传图片
    upload(index, key) {
      let that = this;
      this.uploadFlag = true;
      wx.chooseImage({
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "图片上传中"
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 1000);
          if (!that.fileList[index] || that.fileList[index].length <= 0) {
            that.fileList[index] = [];
          }
          const tempFilePaths = res.tempFilePaths;
          tempFilePaths.forEach(element => {
            that.uploadFile(element, index, key);
          });
          that.uploadFlag = false;
        },
        fail(err) {
          console.log(err);
          // Dialog.alert({
          //   title: "提示",
          //   message: "图片上传失败"
          // }).then(() => {
          //   // on close
          // });
        }
      });
    },
    uploadFile(element, index, key) {
      let that = this;
      wx.uploadFile({
        url: that.$img + "/api/upload/uploadFile/8/1", //仅为示例，非真实的接口地址
        filePath: element,
        name: "file",
        success(res) {
          let temp = JSON.parse(res.data);
          if (!that.fileList[index] || that.fileList[index].length <= 0) {
            that.fileList[index] = [];
            that.fileList[index].push(temp.data.fileIds);
          } else {
            that.fileList[index].push(temp.data.fileIds);
          }
          that.fileList = [...that.fileList];
          that.objData[key] = JSON.stringify(that.fileList[index]);
          that.saveData();
        },
        fail() {
          that.uploadFile(element);
        }
      });
    },
    bindPickerChange(e, index, key, flag) {
      this.list[index] = Number(e.mp.detail.value);
      let temp = [];
      temp = this.list;
      this.list = [];
      this.list = temp;
      if (flag) {
        this.objData[key] = Number(this.list[index]);
        return;
      } else {
        this.objData[key] = Number(this.list[index]) + 1;
      }
      this.saveData();
    },
    hasInput2(e, index, key) {
      this[key] = e.mp.detail.value;
      this.objData[key] = e.mp.detail.value;
      this.saveData();
    },
    hasInput(e, index, key) {
      let temp = e.mp.detail.value.replace(" ", "");
      if (
        /^\d+\.?\d{0,4}$/g.test(temp) ||
        /^\d+\.?\d{0,4}$/g.test(e.mp.detail.value)
      ) {
        this[key] = temp;
        this.objData[key] = temp;
      } else {
        this[key] = " ";
      }
      this.saveData();
    },
    submit() {
      if (this.nurseData.signImg) {
        this.objData["orderNo"] = this.orderNo;
        this.objData["signPicture"] = this.nurseData.signImg;
        this.$emit("objData", this.objData);
      } else {
        Dialog.alert({
          title: "提示",
          message: "请先在后台上传护士签名"
        }).then(() => {
          // on close
        });
      }
    },
    getData() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.getUserInfo(header, "get", "", res => {
        if (res.data.code == 0) {
          this.nurseData.signImg = res.data.data.signImg;
          wx.setStorageSync("nurseData", this.nurseData);
        } else {
          Dialog.alert({
            title: "提示",
            message: "获取护士签名失败"
          }).then(() => {
            // on close
          });
        }
      });
    },
    getBeforeData() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.getCheckResultInfo(header, "get", this.orderNo, res => {
        if (res.data.code == 0) {
          this.right = res.data.data;
          if (Object.keys(this.right).length > 0) {
            this.filterData(this.right);
          } else {
            let temp = store.state.prefData;
            if (temp && Object.keys(temp).length > 0) {
              this.filterData(temp);
            }
          }
        } else {
          let temp = store.state.prefData;
          if (temp && Object.keys(temp).length > 0) {
            this.filterData(temp);
          }
          // this.$toast(`${res.data.message}`);
        }
      });
    },
    filterData(temp) {
      let data = Object.assign({}, temp);

      this.fileList[0] =
        data.inflammatoryImg && JSON.parse(data.inflammatoryImg); //炎症指标图片
      this.fileList[1] = data.cruorImg && JSON.parse(data.cruorImg); //凝血指标图片
      this.fileList[2] = data.qtzbImg && JSON.parse(data.qtzbImg); //其他指标图片
      this.fileList[3] = data.xgccImg && JSON.parse(data.xgccImg); //血管彩超图片
      this.fileList[4] = data.fbctImg && JSON.parse(data.fbctImg); //肺部CT图片
      this.fileList[5] = data.xbxxImg && JSON.parse(data.xbxxImg); //胸部X线
      this.fileList[6] = data.fdmctaImg && JSON.parse(data.fdmctaImg); //肺动脉CTA图片

      this.list[0] = data.hemadStatus && data.hemadStatus - 1; //血细胞状态；1.正常  2.异常
      this.list[1] = data.soterocyteStatus && data.soterocyteStatus - 1; //血小板状态；1.正常  2.异常
      this.list[2] = data.oxyphoraseStatus && data.oxyphoraseStatus - 1; //血红蛋白状态；1.正常  2.异常
      this.list[3] = data.esrStatus && data.esrStatus - 1; //血沉状态；1.正常  2.异常
      this.list[4] = data.crpStatus && data.crpStatus - 1; //CRP状态；1.正常  2.异常
      this.list[5] =
        data.thyrocalcitoninStatus && data.thyrocalcitoninStatus - 1; //降钙素原状态；1.正常  2.异常
      //-----------------------
      this.list[6] = data.thrombinStatus && data.thrombinStatus - 1; //凝血酶原状态；1.正常  2.异常
      this.list[7] =
        data.thrombinPercentumStatus && data.thrombinPercentumStatus - 1; // 凝血酶原百分比状态；1.正常  2.异常
      this.list[8] =
        data.internationalStandardStatus &&
        data.internationalStandardStatus - 1; //国际标准比值；1.正常  2.异常
      this.list[9] = data.hhbfnxmysjStatus && data.hhbfnxmysjStatus - 1; //活化部分凝血酶原时间状态；1.正常  2.异常
      this.list[10] = data.nxmsjStatus && data.nxmsjStatus - 1; //凝血酶时间状态；1.正常   2.异常
      this.list[11] = data.dejtStatus && data.dejtStatus - 1; //D-二聚体；1.正常  2.异常
      this.list[12] = data.xwdbyStatus && data.xwdbyStatus - 1; //纤维蛋白原；1.正常  2.异常
      this.list[13] = data.xjxwdbyjjcwStatus && data.xjxwdbyjjcwStatus - 1; //血浆纤维蛋白原降解产物；1.正常  2.异常
      //---------------------------
      this.list[14] = data.fysjStatus && data.fysjStatus - 1; //反应时间；1.正常  2.异常
      this.list[15] = data.ngsjStatus && data.ngsjStatus - 1; //凝固时间；1.正常  2.异常
      this.list[16] = data.maxRangeStatus && data.maxRangeStatus - 1; // 图中两侧曲线的最宽距离；1.正常  2.异常
      this.list[17] = data.zdngsjStatus && data.zdngsjStatus - 1; //最大凝固时间；1.正常  2.异常
      //------------------------
      this.list[18] = data.gbzamStatus && data.gbzamStatus - 1; //谷丙转氨酶；1.正常  2.异常
      this.list[19] = data.gczamStatus && data.gczamStatus - 1; //谷草转氨酶；1.正常  2.异常
      this.list[20] = data.whiteStatus && data.whiteStatus - 1; //白/球；1.正常  2.异常
      //-------------------
      this.list[21] = data.xgccStatus && data.xgccStatus; //血管彩超 ；0.无  1.正常   2.异常
      this.list[22] = data.fbctStatus && data.fbctStatus; //肺部CT；0.无   1.正常   2.异常
      this.list[23] = data.xbxxStatus && data.xbxxStatus; // 胸部X线；0.无   1.正常   2.异常
      this.list[24] = data.fdmctaStatus && data.fdmctaStatus; //肺动脉CTA；0.无   1.正常   2.异常

      this.hemadBulk = data.hemadBulk || " "; //血细胞容量  *10^9/L

      this.soterocyteBulk = data.soterocyteBulk || " "; //血小板容量  *10^9/L
      this.oxyphoraseBulk = data.oxyphoraseBulk || " "; //血红蛋白容量 g/L
      this.esrBulk = data.esrBulk || " "; //血沉量  mm/h
      this.croBulk = data.croBulk || " "; //CRP量 mg/L
      this.thyrocalcitoninBulk = data.thyrocalcitoninBulk || " "; //降钙素原量  ng/mL
      this.thrombinValue = data.thrombinValue || " "; //凝血酶原（10-16s）
      this.thrombinPercentumValue = data.thrombinPercentumValue || " "; //凝血酶原百分比(70-140%)
      this.internationalStandardValue = data.internationalStandardValue || " "; //国际标准比值(0.8-1.2)
      this.hhbfnxmysjValue = data.hhbfnxmysjValue || " "; //活化部分凝血酶原时间值 （25.0-43.0 s）
      this.nxmsjValue = data.nxmsjValue || " "; //凝血酶时间（14.0-21.0s）
      this.dejtValue = data.dejtValue || " "; //D-二聚体 （mg/L）
      this.xwdbyValue = data.xwdbyValue || " "; //纤维蛋白原 （2.0-4.0）
      this.xjxwdbyjjcwValue = data.xjxwdbyjjcwValue || " "; //血浆纤维蛋白原降解产物(0-0.5mg/L)
      this.fysjValue = data.fysjValue || " "; //反应时间 （R）
      this.ngsjValue = data.ngsjValue || " "; //凝固时间 （K）
      this.maxRangeValue = data.maxRangeValue || " "; // 图中两侧曲线的最宽距离 （MA）
      this.zdngsjValue = data.zdngsjValue || " "; //最大凝固时间
      this.gbzamValue = data.gbzamValue || " "; //谷丙转氨酶(7.0-40.0U/L)
      this.gczamValue = data.gczamValue || " "; //谷草转氨酶(13.0-35.0U/L)
      this.whiteValue = data.whiteValue || " "; //白/球(1.2-2.4)
      this.xgccValue = data.xgccValue || " "; //血管彩超 value
      this.fbctValue = data.fbctValue || " "; // 肺部CT value
      this.xbxxValue = data.xbxxValue || " "; //胸部X线 value
      this.fdmctaValue = data.fdmctaValue || " "; //
      // =------------------
      this.hasXueCg = data.hasXueCg || "";
      this.hasGGN = data.hasGGN || "";
      this.hasXSTLT = data.hasXSTLT || "";
      this.hasNXCG = data.hasNXCG || "";
      this.hasJGYS = data.hasJGYS || "";
      this.hasCRP = data.hasCRP || "";
      this.hasXueCheng = data.hasXueCheng;

      this.objData = data;
    },
    saveData() {
      store.commit("savePref", this.objData);
    },
    initPage() {
      this.orderNo = store.state.orderNo;
      this.nurseData = wx.getStorageSync("nurseData");
      !this.nurseData.signImg && this.getData(); //获取护士签名
      this.getBeforeData();
    }
  },
  mounted() {
    console.log("pree");
    // Object.assign(this.$data, this.$options.data.call(this));
    this.initPage();
  },
  onUnload() {
    store.commit("changeOldOrder", this.orderNo);
    this.saveData();
  }
  // onShow() {
  //   if (!this.uploadFlag) {
  //     Object.assign(this.$data, this.$options.data.call(this));
  //     this.initPage();
  //   }
  // }
};
</script>

<style scoped>
.imgBox {
  width: 100%;
  margin-top: 30rpx;
  flex-wrap: wrap !important;
}
.borderB {
  line-height: 0.72rem;
  text-align: center;
  /* margin: -0.2rem 0.07rem 0 0.27rem; */
  width: 3.1rem;
  height: 0.72rem;
  border: 0.02rem solid rgba(230, 230, 230, 1);
}
.picBorder {
  height: 72rpx;
  font-size: 30rpx;
  color: #999999;
  text-align: center;
  line-height: 72rpx;
  border: 1rpx solid #e6e6e6;
}
.site .flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 0.72rem;
}
.site .p2 {
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
  width: 100%;
  /* height: 100%; */
  height: 600px;

  overflow-x: hidden;
  overflow-y: auto;
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
  padding-bottom: 36px;
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
  margin-top: 29rpx;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
  color: white;
  margin-bottom: 20px;
}
p {
  font-size: 0.3rem;
  color: #313233;
}
.checkbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.4rem;
  padding: 0 30rpx 0 0;
  font-size: 0.3rem;
}
</style>
