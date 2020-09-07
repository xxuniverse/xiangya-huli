    <template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{top:headHeigth+'px'}">
      <div class="wrap">
        <div class="box" v-if="countArr[0]">
          <h2>耗材费用</h2>
          <div class="box_main" v-for="(item,index) in arr[0]" :key="index">
            <div class="mainImg">
              <img :src="item.picture" v-if="item.picture" alt />
              <img src="/static/images/login/e1.png" v-else alt />
            </div>
            <div class="mainList">
              <p>{{item.name}}</p>
              <span>￥{{item.price}}/{{item.unit}}</span>
            </div>
            <div class="compute">
              <span>x&nbsp;{{item.count || 0}}</span>
            </div>
          </div>
          <div class="summation">
            <span>合计:</span>
            <span>￥{{countArr[0]}}</span>
          </div>
        </div>
        <div class="box" v-if="countArr[1]">
          <h2>治疗费</h2>
          <div class="box_main" v-for="(item,index) in arr[1]" :key="index">
            <div class="mainImg">
              <img :src="item.picture" v-if="item.picture" alt />
              <img src="/static/images/login/e1.png" v-else alt />
            </div>
            <div class="mainList">
              <p>{{item.name}}</p>
              <span>￥{{item.price}}/次</span>
            </div>
            <div class="compute">
              <span>x&nbsp;{{item.count}}</span>
            </div>
          </div>
          <div class="summation">
            <span>合计:</span>
            <span>￥{{countArr[1]}}</span>
          </div>
        </div>
        <div class="box noBorder" v-if="countArr[2]">
          <h2>远程协助费</h2>
          <div class="box_main" v-for="(item,index) in arr[2]" :key="index">
            <div class="mainList">
              <p>{{item.name}}</p>
              <span>￥{{item.price}}/{{item.unit}}</span>
            </div>
            <div class="compute">
              <span>x&nbsp;{{item.count}}</span>
            </div>
          </div>
          <div class="coadjutant">
            <span>协助人员姓名：</span>
            <div>
              <!-- <input type="text" placeholder="请输入姓名" v-if="countArr[2]>0"  @change="hasChange($event,'name')" v-model="name"/> -->
              <input type="text" :placeholder="name" disabled v-model="name" />
            </div>
          </div>
          <div class="summation">
            <span>合计:</span>
            <span>￥{{countArr[2]}}</span>
          </div>
        </div>
      </div>

      <div class="otherBtn">
        <div>
          <span>合计:</span>
          <span class="colorOrange">￥{{count}}</span>
        </div>
        <div class="btn-wrap">
          <van-button @click="goback">返回</van-button>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Https from "../../../utils/https";

let H = new Https();

export default {
  components: { frames },
  data() {
    return {
      show: false,
      obj: {
        text: "查看耗材费用",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      arr: [],
      countArr: [0, 0, 0],
      count: 0.0,
      orderNo: "",
      userId: "",
      name: "",
      nurseData: {}
    };
  },
  methods: {
    hasChange(e, name) {
      this[name] = e.mp.detail.value;
    },
    getBase() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.selectOtherFeeInfos(header, "get", "", res => {
        if (res.data.code == 0) {
          if (Object.keys(res.data.data).length <= 0) {
            this.arr = [];
          } else {
            this.filterData(res.data.data);
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    getData() {
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.nurseData.token
      };
      H.se;
      let url = `${this.orderNo}`;
      //  let url =  '2019120321292656836534'
      H.selectOtherWelfareInfo(header, "post", url, res => {
        if (res.data.code == 0) {
          if (res.data.code == 0) {
            if (
              Object.keys(res.data.data.consumption).length <= 0 &&
              Object.keys(res.data.data.treatment).length <= 0
            ) {
              this.getBase();
            } else {
              let result = res.data.data;
              let temp = [
                {
                  name: "远程协助费",
                  price: result.remoteCost,
                  count: result.remoteNum || 0
                }
              ];
              let temp1 = result.consumption && JSON.parse(result.consumption);
              let temp2 = result.consumption && JSON.parse(result.treatment);
              this.countArr = [
                result.consumptionCost,
                result.treatmentCost,
                result.remoteCost
              ];
              this.count = result.otherPayAmt;
              this.name = result.remoteUser;

              this.arr = [temp1, temp2, temp];
            }
          }
        } else {
          this.$toast(`${res.data.message}`);
        }
      });
    },
    goback() {
      wx.navigateBack({
        delta: 1
      });
    },
    filterData(data) {
      let temp = [
        {
          name: data.remoteName,
          price: data.remotePrice,
          count: 0
        }
      ];
      let temp1 = [];
      let temp2 = [];
      // type //类型  1-耗材费用   2-治疗费用
      data.feeInfos.forEach(el => {
        if (el.type == 1) {
          temp1.push({
            name: el.feeName,
            picture: el.feePicture,
            price: el.price,
            unit: el.feeUnit,
            count: 0
          });
        }
        if (el.type == 2) {
          temp2.push({
            name: el.feeName,
            price: el.price,
            picture: el.feePicture,
            unit: el.feeUnit,
            count: 0
          });
        }
      });
      this.arr = [temp1, temp2, temp];
    }
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data.call(this));

    this.orderNo = options.orderNo;
    this.userId = options.userId;
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
    if (wx.getStorageSync("nurseData")) {
      this.nurseData = wx.getStorageSync("nurseData");
    } else {
      this.nurseData = wx.getStorageSync("patientData");
    }
    this.getData();
  }
};
</script>

<style scoped>
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.section {
  overflow-y: auto;
  position: absolute;
  width: 100%;
  overflow-x: hidden;
  bottom: 0px;
}

.section::-webkit-scrollbar {
  display: none;
}

.box {
  border-bottom: 0.1rem solid #f2f2f2;
}

.box h2 {
  padding: 0 0.3rem;
  height: 0.94rem;
  line-height: 0.94rem;
  font-size: 0.32rem;
}

.box_main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0.3rem;
  margin-bottom: 0.3rem;
}

.mainImg,
.mainImg img {
  height: 1.2rem;
  width: 1.4rem;
}

.mainList {
  width: 3.33rem;
}

.mainList > p {
  height: 0.72rem;
  line-height: 0.72rem;
  font-size: 0.28rem;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  font-size: 28 rpx;
  color: #313233;
}

.mainList > span {
  color: #999999 !important;
  font-size: 26 rpx !important;
}

.compute {
  line-height: 1.2rem;
}

.compute > img {
  width: 0.46rem;
  height: 0.46rem;
  vertical-align: middle;
}

.img {
  width: 0.46rem;
  height: 0.46rem;
  vertical-align: middle;
}

.compute >>> .van-button--normal {
  height: 49 rpx;
  padding: 0px;
  line-height: 0px;
  border: 0px;
  border-radius: 50%;
}

.compute > span {
  display: inline-block;
  margin: 0 0.24rem;
}

.summation {
  padding: 0 0.3rem;
  margin: 0.17rem 0 0.38rem 0;
  text-align: right;
}

.summation span:last-child {
  color: orange;
}

.coadjutant {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.72rem;
  line-height: 0.72rem;
  padding: 0 0.3rem;
  margin-top: -0.3rem;
  margin-bottom: 0.37rem;
}

.coadjutant > div {
  width: 4.5rem;
  padding: 0.16rem 0.22rem;
  border: 0.01rem solid #ccc;
}

.coadjutant > div input {
  font-size: 0.3rem;
}

.coadjutant > span {
  font-size: 0.26rem;
}

.otherBtn {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.otherBtn > div {
  flex: 1;
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
}

.otherBtn > div:nth-child(1) {
  border-top: 0.02rem solid #e6e6e6;
  box-sizing: border-box;
  background-color: white;
  font-size: 0.3rem;
}

.otherBtn > div:nth-child(2) {
  font-size: 0.36rem;
  color: white;
  background: linear-gradient(
    90deg,
    rgba(75, 164, 255, 1) 0%,
    rgba(86, 181, 254, 1) 100%
  );
}

.noBorder {
  border: none;
}

.colorOrange {
  color: orange;
}

.btn-wrap >>> .van-button--normal {
  border: 0px;
  outline: 0px;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36 rpx;
  color: #ffffff;
}

.wrap {
  position: absolute;
  left: 0px;
  width: 100%;
  bottom: 1.2rem;
  top: 0px;
  overflow: auto;
}
</style>
