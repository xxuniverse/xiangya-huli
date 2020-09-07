<template>
  <div class="containerLogin" :style="{ height: screenHeight + 'px' }">
    <frames :obj="obj"></frames>
    <div class="seaction" :style="{ height: dataHeigth + 'px', top: headHeigth + 'px' }">
      <div class="banner">
        <div class="left">
          <img :src="pageUpData.welfarePicture" alt />
        </div>
        <div class="right">
          <span>{{ pageUpData.welfareName }}</span>
          <span>￥{{ pageUpData.totalFee }}/次</span>
        </div>
      </div>
      <div class="inpBox">
        <div>
          <span>服务时间</span>
          <picker
            mode="date"
            :value="date"
            :start="timerT"
            end="2029-09-01"
            @change="bindDateChange"
          >
            <view class="picker">{{ date }}</view>
            <img class="pullDown" src="/static/images/login/pull_down.png" alt />
          </picker>
        </div>
      </div>
      <div class="box">
        <div class="list">
          <div style="margin: 10rpx 0px;">
            <span style="color: red; margin: 0px 4rpx;">*</span>导管图
            <span style="font-size: 28rpx;">(导管图片简短说明)</span>
          </div>
          <div class="flex_c">
            <img
              src="https://youjiao.douziit.com/imgs/imgs/daoguan.jpg"
              alt
              @click="
                showPopup('https://youjiao.douziit.com/imgs/imgs/daoguan.jpg')
              "
            />
          </div>
          <div class="flex_c" style="font-size: 24rpx;">本图为示例图</div>
          <div class="pic">
            <div v-for="(item, index) of picImg_1" :key="index">
              <div v-if="item.img" style="margin-right: 0.3rem; margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
                <van-icon name="clear" class="del" v-if="item.del" @click="del(index)" />
              </div>
            </div>
            <view class="add" v-if="pic_1" @click="pic1">
              <span class="addImg">+</span>
            </view>
          </div>
        </div>
        <div class="list">
          <div style="margin: 10rpx 0px;">
            <span>出院小结</span>
            <span style="font-size: 28rpx;">(门诊患者无需上传)</span>
          </div>
          <div class="flex_c">
            <img
              src="https://youjiao.douziit.com/imgs/imgs/chuyuan.jpg"
              alt
              @click="
                showPopup('https://youjiao.douziit.com/imgs/imgs/chuyuan.jpg')
              "
            />
          </div>
          <div class="flex_c" style="font-size: 24rpx;">本图为示例图</div>
          <div class="pic">
            <div v-for="(item, index) of picImg_2" :key="index">
              <div v-if="item.img" style="margin-right: 0.3rem; margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
                <van-icon name="clear" class="del" v-if="item.del" @click="del2(index)" />
              </div>
            </div>
            <view class="add" v-if="pic_2" @click="pic2">
              <span class="addImg">+</span>
            </view>
          </div>
        </div>
        <div class="list">
          <div style="margin: 10rpx 0px;">
            <span style="color: red; margin: 0px 4rpx;">*</span>维护手册
            <span style="font-size: 30rpx;">(维护手册简短说明)</span>
          </div>
          <div class="flex_c">
            <img
              src="https://youjiao.douziit.com/imgs/imgs/weihu.jpg"
              alt
              @click="
                showPopup('https://youjiao.douziit.com/imgs/imgs/weihu.jpg')
              "
            />
          </div>
          <div class="flex_c" style="font-size: 24rpx;">本图为示例图</div>
          <div class="pic">
            <div :key="index" v-for="(item, index) of picImg_3">
              <div v-if="item.img" style="margin-right: 0.3rem; margin-left: 0;">
                <img :src="item.userPicture" alt @click="showPopup(item.userPicture)" />
                <van-icon name="clear" class="del" v-if="item.del" @click="del3(index)" />
              </div>
            </div>
            <view class="add" v-if="pic_3" @click="pic3">
              <span class="addImg">+</span>
            </view>
          </div>
        </div>

        <div class="list">
          <h2>备注信息</h2>
          <p v-text="remark" @click="textareaShow" class="textarea"></p>
        </div>
        <div class="address">
          <h3>服务地址</h3>
          <div v-if="!addressShow" class="addAddress" @click="addAddRess">
            <img src="/static/images/login/add_blue.png" alt />
            <span>添加服务地址</span>
          </div>
          <div v-if="addressShow" class="addressUser" @click="addAddRess_2">
            <div class="header">
              <van-icon name="location" size="20" color="#41a8fc" />
              <span class="name">{{ addressData.contactName }}</span>
              <span>{{ addressData.contactPhone }}</span>
            </div>
            <div class="addressCity">
              <p>{{ addressData.address }}</p>
              <van-icon class="right" name="arrow" />
            </div>
            <div class="warmPrompt" v-if="pricesPrompt">
              温馨提示：您选择的服务地址与湘雅附一医院的距离为：{{
              distanceInt
              }}公里， 需要补缴超出的{{ outrange }}公里来回交通费。
            </div>
          </div>
        </div>
        <div class="carFare" v-if="pricesPrompt">
          <h3>远距离交通费</h3>
          <div class="fare">
            <div class="fareMany">
              <div>超{{ outrange }}公里来回交通费补贴</div>
              <div>￥{{ trafficMoney }}/公里</div>
            </div>
            <div class="calculate">
              <div class="price">{{ outrange }}</div>
              <div class="two">x2</div>
              <span>公里</span>
            </div>
          </div>
          <div class="total">
            <span>合计:</span>
            <span>￥{{ distanceTotal }}</span>
          </div>
        </div>
        <div class="weChat">
          <h3>支付方式</h3>
          <div class="weChatPay">
            <van-icon name="wechat" size="24" color="#2CAF38" />
            <span>微信支付</span>
          </div>
        </div>
        <div class="btn">
          <div class="const">
            <span>合计:</span>
            <span>￥{{ totalPrice }}</span>
          </div>
          <div class="ok" @click="pay">支付</div>
        </div>
      </div>
      <van-dialog id="van-dialog" />
      <van-dialog use-slot title="备注" :show="show2" showConfirmButton @close="onClose2">
        <textarea
          v-model="remark2"
          placeholder="80字内"
          maxlength="80"
          @blur="hasChange($event, 'remark')"
          name
          id
          class="textarea nineWidth"
        />
      </van-dialog>
      <van-toast id="van-toast"></van-toast>
    </div>
  </div>
</template>

<script>
import store from "../../../utils/store";
import frames from "../../../components/frames";
import orderFormData from "../../../components/orderFormData";
import appoint from "../../../components/appoint";
import Dialog from "../../../../static/vant/dist/dialog/dialog";
import Http from "../../../utils/https";
import dayjs from "dayjs";

let H = new Http();
// import designate from "../../components/designate";
export default {
  components: { frames, orderFormData, appoint },
  data() {
    return {
      trafficMoney: "", //远距离交通费用
      timerT: "", //日期
      remark: "备注: 请填写备注信息~", // 备注
      remark2: "", // 备注
      pricesPrompt: false, //价格提示界面是否显示
      totalPrice: 0, //总价格
      distanceTotal: 0, //距离价格合计
      distanceInt: 0, //向上取整后的距离
      outrange: 0,
      distance: {}, // 两地距离返回值  from to distance 距离米 duration驾时间秒
      addressShow: false, //是否要添加新地址
      date: "2019-11-07",
      show: false, //是否弹窗
      show2: false,
      showImg: require("../../../../static/images/login/e1.png"), // 弹窗显示的图片
      userName: "",
      age: "",
      pic_1: true, //添加图片是否显示
      example_1: true, //拍摄样片文字是否显示
      pic_2: true,
      pic_3: true,
      example_2: true,
      example_3: true,
      picImg_1: [],
      picImg_2: [],
      picImg_3: [],
      obj: {
        text: "订单支付",
        state: true,
      },
      headHeigth: 0,
      screenHeight: 0,
      dataHeigth: 0,
      tabbarHeight: 0,
      styleStore: false,
      num: 1,
      num2: 1,
      num3: 1,
      pageUpData: {}, // 前面界面的数据
      addressData: {},
      uploadFlag: false,
    };
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data.call(this));
    //清空数据
    this.init();
    this.getAddress();
    if (!this.uploadFlag) {
      if (this.num <= 3) {
        this.pic_1 = true;
      }
    }
  },
  methods: {
    init() {
      this.remark2 = "";
      this.remark = "";
      this.date = dayjs().format("YYYY-MM-DD");
      this.pageUpData = JSON.parse(wx.getStorageSync("welfareInfo"));
      this.totalPrice = this.pageUpData.totalFee;
      // 第一次进入页面先获取一遍患者保存的地址
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token,
      };
      //查询远距离交通费用管理
      H.welfareDetail(header, "get", this.pageUpData.welfareId, (res) => {
        //保存远距离交通费用
        this.trafficMoney = res.data.data.farTrafficUnitPrice.content;
        if (this.trafficMoney) {
          //请设置远距离交通费用
        }
      });
    },
    rem() {
      this.remark = this.remark2;
      if (this.remark2.length == 0) {
        this.remark = "备注：";
      }
    },
    textareaShow() {
      this.show2 = true;
    },
    onClose2() {
      this.show2 = false;
    },
    //添加服务地址
    addAddRess() {
      let _this = this
      wx.chooseLocation({
        success(res) {
          if (res.name == "") {
            _this.$toast("请先选择地址");
          } else {
            _this.addressShow = true
            _this.addressData.address = res.address
              _this.addressData.lat = res.latitude
            _this.addressData.lng = res.longitude
            _this.addressData = Object.assign({},_this.addressData)
            _this.getCountData({
              lng:res.longitude,
              lat:res.latitude
            })
          }
        },
        fail(err) {
          console.log(err);
          // fail
        },
      });
    },
    addAddRess_2() {
      let _this = this
       wx.chooseLocation({
        success(res) {
          if (res.name == "") {
            _this.$toast("请先选择地址");
          } else {
            _this.addressShow = true
            _this.addressData.address = res.address
            _this.addressData.lat = res.latitude
            _this.addressData.lng = res.longitude
            _this.addressData = Object.assign({},_this.addressData)
            _this.getCountData()
          }
        },
        fail(err) {
          console.log(err);
          // fail
        },
      });
    },
    //选取时间
    bindDateChange: function (e) {
      this.date = e.mp.detail.value;
    },
    hasChange(e, name) {
      this[name] = e.mp.detail.value;
    },
    getAddress() {
      let patientData = wx.getStorageSync("patientData");
      // 第一次进入页面先获取一遍患者保存的地址
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token,
      };
      H.getAddressInfo(header, "GET", {}, (res) => {
        let {
          data: { data },
        } = res;
        if (data === "") {
          this.addressShow = false;
        } else {
          this.addressData = data;
          this.getCountData()
          this.addressShow = true;
        }
      });
    },
    getCountData(){
        wx.showLoading({
            title: "正在加载中",
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 500);
        let url =
            "https://restapi.amap.com/v3/geocode/geo?address=长沙市开福区湘雅路87号&output=JSON&key=f056e3e5fd10705a0bf23be902adfea5";
          wx.request({
            url,
            success: (res) => {
              if (res.data.infocode == "10000") {
                let to = res.data.geocodes[0].location;
                let form = this.addressData.lng + "," + this.addressData.lat;
                let url2 = `https://restapi.amap.com/v3/distance?origins=${form}&destination=${to}&output=JSON&key=f056e3e5fd10705a0bf23be902adfea5`;
                wx.request({
                  url: url2,
                  success: (rst) => {
                    if (rst.data.infocode == "10000") {
                      let distance = rst.data.results[0].distance;

                      this.distanceInt = Math.ceil(distance / 1000);

                      if (this.distanceInt > 4) {
                        // 计算超出距离
                        this.pricesPrompt = true;

                        this.outrange = Math.ceil(
                          (distance / 1000).toFixed(2) - 5
                        );
                        // 计算超出费用
                        this.distanceTotal = (
                          this.outrange *
                          2 *
                          this.trafficMoney
                        ).toFixed(2);
                        //计算总费用
                        // ,'问题')
                        this.totalPrice = (
                          this.pageUpData.totalFee + Number(this.distanceTotal)
                        ).toFixed(2);
                      } else {
                        this.outrange = 0;
                        this.distanceTotal = 0;
                        this.pricesPrompt = false;
                        this.totalPrice = this.pageUpData.totalFee;
                      }
                    }
                  },
                  fail: (err) => {
                    console.log(err);
                  },
                });
              }
            },
            fail: (err) => {
              console.log(err);
            },
          });
    },
    // 支付并且提交
    pay() {
      let patientData = wx.getStorageSync("patientData");
      let header = {
        "content-type": "application/json",
        "API-User-Token": patientData.token,
      };
      if (!this.picImg_1 || this.picImg_1.length <= 0) {
        this.$toast("请上传导管图片");
        return;
      } else if (!this.picImg_3 || this.picImg_3.length <= 0) {
        this.$toast("请上传维护手册图片");
        return;
      }  else if (!this.addressShow) {
        this.$toast("请先添加地址信息 ~ ~");
        return;
      } else {
        let list = [...this.picImg_1, ...this.picImg_2, ...this.picImg_3];
        let orderPictures = [];
        list.forEach((el) => {
          orderPictures.push({
            userPicture: el.userPicture,
            pictureType: el.pictureType,
          });
        });
        let data = {
          welfareId: this.pageUpData.welfareId, //服务ID
          bespeakTime: this.date, //患者预约时间
          remark: this.remark, // 备注
          remoteTrafficFee: this.distanceTotal, //交通费
          totalPayAmt: 0.01, //支付总价
          // totalPayAmt: this.totalPrice, //支付总价
          address: this.addressData.address, //详情地址
          contactName: this.addressData.contactName, //联系人姓名
          contactPhone: this.addressData.contactPhone, //联系人手机号
          lat: this.addressData.lat, // 维度
          lng: this.addressData.lng, // 经度
          orderPictures,
        };
        // 提交订单，返回订单号
        H.addWelfareOrder(header, "POST", data, (res) => {
          if (res.data.code !== 0) {
            this.$toast(`${res.data.message}`);
            return;
          }
          let {
            data: { data },
          } = res; //订单号
          let parameter = data + "/" + patientData.openId;
          // 微信支付
          H.payWelfareOrder(header, "GET", parameter, (res) => {
            if (res.data.code == 0) {
              let {
                data: { data },
              } = res;
              wx.requestPayment({
                timeStamp: String(data.timeStamp), //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
                nonceStr: data.nonceStr, //随机字符串，长度为32个字符以下,
                package: data.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
                signType: "MD5", //签名算法，暂支持 MD5,
                paySign: data.sign, //签名,具体签名方案参见小程序支付接口文档,
                success: (res) => {
                  let data = {
                    text: "支付成功",
                    p: "支付成功，3s后页面自动跳转",
                  };
                  this.num = 1;
                  this.example_1 = true;
                  this.remark = "";
                  this.pic_1 = true;
                  this.picImg_1 = [];
                  wx.navigateTo({
                    url:
                      "/pages/huanzhe/paymentSuccess/main?data=" +
                      JSON.stringify(data),
                  });
                },
                fail: () => {},
              });
            } else {
              this.$toast(`${res.data.message}`);
            }
          });
        });
      }
    },
    showPopup(img) {
      wx.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img], // 需要预览的图片http链接列表
      });
    },
    onClose() {
      this.show = false;
    },
    //导管删除图片
    del(index) {
      this.picImg_1.splice(index, 1);
      // this.picImg_1[index].img = false;
      if (this.num <= 3) {
        this.pic_1 = true;
      }
      if (this.picImg_1.length == 1) {
        this.num = 2;
      }
      if (this.picImg_1.length == 0) {
        this.num = 1;
        this.example_1 = true;
        this.picImg_1 = [];
      }
    },
    //删除出院小结图片
    del2(index) {
      this.picImg_2.splice(index, 1);
      // this.picImg_1[index].img = false;
      if (this.num2 <= 3) {
        this.pic_2 = true;
      }
      if (this.picImg_2.length == 1) {
        this.num2 = 2;
      }
      if (this.picImg_2.length == 0) {
        this.num2 = 1;
        this.example_2 = true;
        this.picImg_2 = [];
      }
    },
    //删除维护手册图片
    del3(index) {
      this.picImg_3.splice(index, 1);
      // this.picImg_1[index].img = false;
      if (this.num3 <= 3) {
        this.pic_3 = true;
      }
      if (this.picImg_3.length == 1) {
        this.num3 = 2;
      }
      if (this.picImg_3.length == 0) {
        this.num3 = 1;
        this.example_3 = true;
        this.picImg_3 = [];
      }
    },
    //导管图
    pic1() {
      let _this = this;
      this.uploadFlag = true;

      wx.chooseImage({
        count: 3,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "图片上传中",
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 500);
          const tempFilePaths = res.tempFilePaths;
          tempFilePaths.forEach((r) => {
            wx.uploadFile({
              url: "http://192.168.0.113:9091/api/upload/uploadFile/1/1", //仅为示例，非真实的接口地址
              // url: "https://huli.novocare.cn/api/upload/uploadFile/1/1", //仅为示例，非真实的接口地址
              filePath: r,
              name: "file",
              success(res) {
                const data = JSON.parse(res.data);
                let {
                  data: { fileIds },
                } = data;
                if (_this.num == 1) {
                  _this.picImg_1[0] = {
                    img: true,
                    pictureType: 1,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.example_1 = false;
                  _this.num++;
                } else if (_this.num == 2) {
                  _this.picImg_1[1] = {
                    img: true,
                    pictureType: 1,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.num++;
                } else if (_this.num >= 3) {
                  _this.picImg_1[2] = {
                    img: true,
                    pictureType: 1,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.pic_1 = false;
                }
                _this.uploadFlag = false;
              },
            });
          });
        },
      });
    },
    // 出院小结
    pic2() {
      let _this = this;
      this.uploadFlag = true;

      wx.chooseImage({
        count: 3,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "图片上传中",
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 500);
          const tempFilePaths = res.tempFilePaths;

          tempFilePaths.forEach((key) => {
            wx.uploadFile({
              url: "http://192.168.0.113:9091/api/upload/uploadFile/2/1", //仅为示例，非真实的接口地址
              // url: "https://huli.novocare.cn/api/upload/uploadFile/2/1", //仅为示例，非真实的接口地址
              filePath: key,
              name: "file",
              success(res) {
                const data = JSON.parse(res.data);
                let {
                  data: { fileIds },
                } = data;
                if (_this.num2 == 1) {
                  _this.picImg_2[0] = {
                    img: true,
                    pictureType: 2,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.example_2 = false;
                  _this.num2++;
                } else if (_this.num2 == 2) {
                  _this.picImg_2[1] = {
                    img: true,
                    pictureType: 2,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.num2++;
                } else if (_this.num2 >= 3) {
                  _this.picImg_2[2] = {
                    img: true,
                    pictureType: 2,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.pic_2 = false;
                }
                _this.uploadFlag = false;
              },
            });
          });
        },
      });
    },
    //维护手册
    pic3() {
      let _this = this;
      this.uploadFlag = true;
      wx.chooseImage({
        count: 3,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          wx.showLoading({
            title: "图片上传中",
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 500);
          const tempFilePaths = res.tempFilePaths;
          tempFilePaths.forEach((key) => {
            wx.uploadFile({
              url: "http://192.168.0.113:9091/api/upload/uploadFile/3/1", //仅为示例，非真实的接口地址
              // url: "https://huli.novocare.cn/api/upload/uploadFile/3/1", //仅为示例，非真实的接口地址
              filePath: key,
              name: "file",
              success(res) {
                const data = JSON.parse(res.data);
                let {
                  data: { fileIds },
                } = data;
                if (_this.num3 == 1) {
                  _this.picImg_3[0] = {
                    img: true,
                    pictureType: 3,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.example_3 = false;
                  _this.num3++;
                } else if (_this.num3 == 2) {
                  _this.picImg_3[1] = {
                    img: true,
                    pictureType: 3,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.num3++;
                } else if (_this.num3 >= 3) {
                  _this.picImg_3[2] = {
                    img: true,
                    pictureType: 3,
                    userPicture: fileIds,
                    del: true,
                  };
                  _this.pic_3 = false;
                }
                _this.uploadFlag = false;
              },
            });
          });
        },
      });
    },
  },
  mounted() {
    this.headHeigth = store.state.statusBarHeight;
    this.screenHeight = store.state.screenHeight;
    this.tabbarHeight = this.screenHeight - store.state.windowHeight;
    this.dataHeigth = this.screenHeight - this.headHeigth;
  },
};
</script>

<style scoped>
.popupImg {
  width: 100%;
  height: 100%;
}

/* .popup{
          width: 100%;
          height: 100%;
        } */
view {
  box-sizing: border-box;
}

.none {
  display: none;
}

.containerLogin {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* height: 100%; */
}

.seaction {
  position: absolute;
  left: 0;
  width: 100%;
  /* background-color: #f2f2f2; */
  overflow-y: scroll;
  /* overflow: hidden; */
}

.seaction::-webkit-scrollbar {
  display: none;
}

.user input {
  margin-top: 0.35rem;
  font-size: 0.3rem;
  text-align: right;
  flex: 4;
}

.user span {
  flex: 1;
}

.userName,
.age {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1.1rem;
  line-height: 1.1rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  color: #333333;
}
.flex_c {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex_c image {
  height: 320rpx;
}
.age {
  border-top: 0.01rem solid #e6e6e6;
}

.list {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-top: 0.1rem solid #f2f2f2;
}

.list span {
  color: #000;
}

h2 {
  font-size: 0.3rem;
  color: #333333;
  margin: 0.4rem 0 0.2rem 0;
  display: inline-block;
}

.h2 {
  margin-right: 0.3rem;
}

.pic {
  position: relative;
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  /* justify-content: space-between; */
  padding-bottom: 0.4rem;
  margin-top: 0.2rem;
}

.pic > div {
  position: relative;
  width: 2.1rem;
  height: 2.1rem;
  margin-left: 0.3rem;
}

.pic img {
  width: 2.1rem;
  height: 2.1rem;
}

.pic > div:nth-child(1) {
  margin-left: 0;
}

.add {
  width: 2.1rem;
  height: 2.1rem;
  padding: -0.02rem;
  border: 0.02rem solid #e1e1e1;
  line-height: 2.1rem;
  text-align: center;
  margin-left: 0.2rem;
}
.add:first-child {
  margin-left: 0px;
}

.addImg {
  font-size: 1rem;
  color: #cccccc;
}

.example {
  position: absolute;
  left: 0;
  bottom: 0.42rem;
  height: 0.7rem;
  width: 2.1rem;
  line-height: 0.7rem;
  text-align: center;
  color: white;
  font-size: 0.23rem;
  background-color: rgba(0, 0, 0, 0.5);
}

.del {
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.2rem;
  text-align: center;
  top: -0.1rem;
  right: -0.1rem;
  border: 0.01rem solid #ccc;
  border-radius: 50%;
  color: white;
  background-color: #cccccc;
  font-size: 0.3rem;
}

.btn {
  width: 100%;
}

.banner {
  margin-top: 0.5rem;
  padding: 0 0.3rem;
  display: flex;
  flex-direction: row;
  padding-bottom: 0.3rem;
  border-bottom: 0.01rem solid #e6e6e6;
}

.left > img {
  height: 2.25rem;
  width: 3rem;
}

.right {
  margin-left: 0.4rem;
  display: flex;
  flex-direction: column;
}

.right > span:nth-child(1) {
  font-size: 0.34rem;
  color: #333333;
}

.right > span:nth-child(2) {
  display: inline-block;
  font-size: 0.34rem;
  color: #f1884e;
  margin-top: 0.6rem;
}

.inpBox {
  width: 100%;
}

.inpBox > div {
  display: flex;
  flex-direction: row;
  height: 1.1rem;
  padding: 0 0.3rem;
}

.inpBox > div span {
  display: inline-block;
  margin: 0.36rem 0 0.34rem 0;
  font-size: 0.3rem;
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
  color: #999999;
}

.textarea {
  box-sizing: border-box;
  width: 6.4rem;
  height: 1.8rem;
  padding: 0.2rem;
  border: 0.02rem solid #e1e1e1;
  margin: 0 0.3rem 0.4rem 0.3rem;
  font-size: 0.28rem;
  overflow: hidden;
}

.address {
  /* height: 2.78rem; */
  width: 100%;
  padding: 0 0.3rem;
  border-top: 0.1rem solid #f2f2f2;
  box-sizing: border-box;
}

.address > h3,
.carFare > h3,
.weChat > h3 {
  margin-top: 0.4rem;
  font-size: 0.3rem;
  color: #333333;
  font-weight: 500;
}

.addAddress {
  text-align: center;
  width: 4.4rem;
  height: 0.9rem;
  margin: 0.6rem auto;
  line-height: 0.8rem;
  padding: 0.02rem;
  border: 0.02rem solid #3ca1ff;
  border-radius: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.addAddress > img {
  width: 0.3rem;
  height: 0.3rem;
  vertical-align: text-bottom;
  margin-right: 0.11rem;
  margin-top: -1 rpx;
}

.addAddress > span {
  font-size: 0.3rem;
  color: #3ca1ff;
  vertical-align: middle;
}

.carFare,
.weChat {
  width: 100%;
  padding: 0 0.3rem;
  border-top: 0.1rem solid #f2f2f2;
}

.fare {
  margin-top: 0.3rem;
  width: 6.9rem;
  height: 1.77rem;
  background-color: #f2f2f2;
  overflow: hidden;
  color: #999999;
  font-size: 0.28rem;
}

.fare > .fareMany {
  padding: 0 0.3rem;
  margin: 0.3rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.calculate {
  padding: 0 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  line-height: 0.6rem;
}

.price {
  width: 1rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  background-color: white;
  padding: 0.01rem;
  border: 0.01rem solid #ccc;
}

.two {
  margin: 0 0.28rem 0 0.15rem;
}

.total {
  width: 100%;
  margin: 0.3rem 0 0.4rem 0;
  padding: 0 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 0.3rem;
  box-sizing: border-box;
}

.total > span:nth-child(2),
.const > span:nth-child(2) {
  color: orange;
  display: inline-block;
  margin-left: 0.3rem;
}

.weChatPay {
  margin: 0.3rem 0 1.4rem 0;
}

.weChatPay > span {
  display: inline-block;
  margin-left: 0.16rem;
  vertical-align: top;
  font-size: 0.3rem;
  color: #333333;
}

.btn {
  height: 1.2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  line-height: 1.2rem;
  text-align: center;
}

.const {
  flex: 1;
}

.ok {
  flex: 1;
  color: white;
  background: linear-gradient(
    90deg,
    rgba(60, 161, 255, 1),
    rgba(86, 181, 254, 1)
  );
}

.addressUser {
  margin-top: 0.35rem;
}

.addressUser > .header {
  height: 0.5rem;
  display: flex;
  flex-direction: row;
  font-size: 0.3rem;
  color: #333333;
}

.header > .name {
  margin: 0 0.27rem 0 0.2rem;
}

.addressCity {
  height: 0.73rem;
  margin: 0.24rem 0 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
}

.addressCity > p {
  width: 5.28rem;
  padding-left: 0.6rem;
  font-size: 0.3rem;
  color: #333333;
}

.addressCity > .right {
  margin-top: 0.26rem;
}

.warmPrompt {
  font-size: 0.24rem;
  color: #6ea2d2;
  line-height: 0.35rem;
  margin-bottom: 0.5rem;
}

.fontSize {
  font-size: 0.3rem;
}

.nineWidth {
  width: 90%;
}
</style>
