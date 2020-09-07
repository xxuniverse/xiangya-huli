<template>
  <div class="containerLogin">
    <frames :obj="obj"></frames>
    <div class="section" :style="{height:dataHeigth+'px',top:headHeigth+'px'}">
      <div class="inpBox">
        <div>
          <span>姓名</span>
          <input
            v-model="userName"
            type="text"
            name
            id
            placeholder="请填写"
            placeholder-style="text-align:right"
          />
        </div>
        <div>
          <span>手机号码</span>
          <input
            v-model="phone"
            type="text"
            @input="hasChange($event,'phone')"
            placeholder="请填写"
            placeholder-style="text-align:right"
          />
        </div>
        <div>
          <span>服务地址</span>
          <input
            v-model="address"
            type="text"
            :disabled="true"
            @click="textareaShow"
            placeholder="选择地址"
            placeholder-style="text-align:right"
          />
        </div>
      </div>
      <div class="quitLogin" @click="submit">保存</div>
      <van-toast id="van-toast"></van-toast>
    </div>
  </div>
</template>

<script>
import frames from "../../../components/frames";
import store from "../../../utils/store";
import Dialog from "../../../../static/vant/dist/dialog/dialog";
import Http from "../../../utils/https";
let H = new Http();
export default {
  components: { frames },
  data() {
    return {
      id: "", // 地址id
      patientData: {}, //所有数据
      phone: "",
      userName:"",
      location: {}, //经纬度
      address: "", // 详细地址
      obj: {
        text: "服务地址",
        state: true
      },
      dataHeigth: 0,
      headHeigth: 0,
      street: ""
    };
  },
  methods: {
    hasChange(e, name) {
      this[name] = e.mp.detail.value;
    },
    textareaShow() {
      // 选择地址
      let _this = this;
      wx.chooseLocation({
        success(res) {
          // success
          if (res.name == "") {
            _this.$toast("请先选择地址");
          } else {
            _this.location = {
              latitude: res.latitude,
              longitude: res.longitude
            };
            _this.street = res.name;
            _this.address = res.address;
          }
        },
        fail(err) {
          console.log(err);
          // fail
        },
        complete() {
          // complete
        }
      });
    },
    submit() {
      if (this.phone && this.address && this.userName) {
        //获取经纬度
        let header = {
          "content-type": "application/json",
          "API-User-Token": this.patientData.token
        };
        let data = {
          province: "无", //省(必填)
          city: "无", //市(必填)
          area: "无", //区(必填)
          street: "无", //街道
          address: this.address, //详细地址(必填)
          lng: this.location.longitude, //经度(必填)
          lat: this.location.latitude, //纬度(必填)
          contactName: this.userName, //联系人姓名(必填),必须是患者姓名不能更改
          contactPhone: this.phone //联系人电话(必填)
        };
        if (this.id != "") {
          data.id = this.id;
        }
        H.saveAddressInfo(header, "POST", data, res => {
          if (res.data.code == 0) {
            this.$toast("保存成功");
            wx.navigateBack({
              delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            });
          } else {
            this.$toast(`${res.data.message}`);
          }
        });
      } else {
        this.$toast("信息么有填完整哦");
      }
    },
    init() {
      this.patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": this.patientData.token
      };
      // 查询保存的地址
      H.getAddressInfo(header, "GET", {}, res => {
        let data = res.data.data
        //判断数据是否为空
        if (!data || Object.keys(data).length<=0 ) {
          this.address = "";
        } else {
          this.id = data.id;
          this.phone = data.contactPhone
          this.userName = data.contactName
          this.address = data.address;
          this.location = {
            longitude: data.lng,
            latitude: data.lat
          };
        }
      });
    }
  },
  onLoad() {
    this.init();
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.dataHeigth = store.state.screenHeight - store.state.statusBarHeight;
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
  position: absolute;
  overflow-y: scroll;
  width: 100%;
}

.section::-webkit-scrollbar {
  display: none;
}

.inpBox {
  width: 100%;
}

.inpBox > div {
  display: flex;
  flex-direction: row;
  height: 1.1rem;
  padding: 0 0.3rem;
  border-bottom: 0.01rem solid #e6e6e6;
}

.inpBox > div span {
  display: inline-block;
  margin: 0.36rem 0 0.34rem 0;
  font-size: 0.3rem;
}

.inpBox > div input {
  font-size: 0.3rem;
  flex: 1;
  margin: 0.36rem 0 0.34rem 0;
  padding-left: 0.25rem;
  text-align: right;
}

.pullDown {
  width: 0.2rem;
  height: 0.11rem;
  vertical-align: middle;
  margin-left: 0.14rem;
}

picker {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.picker {
  display: inline-block;
  margin: 0.35rem 0;
  font-size: 0.3rem;
  color: #333333;
}

.detailedAddress {
  padding: 0.3rem 0.3rem;
  line-height: 0.5rem;
  font-size: 0.3rem;
  display: flex;
  flex-direction: row;
  /* color: #cccccc; */
}

.quitLogin {
  position: absolute;
  left: 1.35rem;
  bottom: 3.61rem;
  height: 0.9rem;
  width: 4.8rem;
  padding: 0.02rem;
  border: 0.02rem solid #3ca1ff;
  border-radius: 0.45rem;
  line-height: 0.9rem;
  font-size: 0.3rem;
  color: #3ca1ff;
  text-align: center;
}

.textarea {
  box-sizing: border-box;
  width: 5rem;
  height: 1.8rem;
  font-size: 0.28rem;
}

.textarea2 {
  box-sizing: border-box;
  width: 90%;
  height: 1.8rem;
  padding: 0.2rem;
  border: 0.02rem solid #e1e1e1;
  margin: 0 0.3rem 0.4rem 0.3rem;
  font-size: 0.28rem;
}
</style>
