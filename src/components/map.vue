<template>
  <div>
    <map
      id="map"
      :longitude="commodityInformation.longitude"
      :latitude="commodityInformation.latitude"
      scale="8"
      @callouttap="callouttap"
      style="width: 100%; height: 140px;"
      :include-points="point"
      :markers="markers"
    ></map>
    <van-toast id="van-toast"></van-toast>
  </div>
</template>

<script>
import store from "../utils/store";
export default {
  props: ["commodityInformation"],
  data() {
    return {
      markers: [
        {
          iconPath: "/static/images/login/mapMe.png",
          id: 0,
          latitude: "",
          longitude: "",
          width: 18,
          height: 26,
          callout: {
            content: "",
            fontSize: 14,
            color: "#666666",
            bgColor: "white",
            padding: 8,
            borderRadius: 4,
            boxShadow: "4px 8px 16px 0 rgba(0)",
            display: "ALWAYS"
          }
        },
        {
          iconPath: "/static/images/login/mapHe.png",
          id: 1,
          latitude: "",
          longitude: "",
          width: 18,
          height: 26,
          callout: {
            content: "我",
            fontSize: 14,
            color: "#666666",
            bgColor: "white",
            padding: 8,
            borderRadius: 4,
            boxShadow: "4px 8px 16px 0 rgba(0)",
            display: "ALWAYS"
          }
        }
      ],
      point: [
        {
          latitude: "",
          longitude: ""
        },
        {
          latitude: "",
          longitude: ""
        }
      ],
      orderLocation: {} // 订单经纬度
    };
  },
  methods: {
    callouttap(e) {
      if (e.mp.markerId == 0) {
        this.$toast("进入会话");
      }
    },
    init() {
      this.markers[0].callout.content = this.data.userName;
      this.orderLocation = {
        longitude: this.data.lng,
        latitude: this.data.lat
      };
      let location = this.orderLocation;
      this.point[0].latitude = this.markers[0].latitude = location.latitude;
      this.point[0].longitude = this.markers[0].longitude = location.longitude;
    },
    initPage() {
      this.data = this.commodityInformation;
      this.init();
      this.point[1].latitude = this.markers[1].latitude =
        store.state.address.latitude;
      this.point[1].longitude = this.markers[1].longitude =
        store.state.address.longitude;
    }
  },
  onLoad() {
    setTimeout(() => {
      this.initPage();
    }, 500);
  }
};
</script>

<style scoped>
</style>