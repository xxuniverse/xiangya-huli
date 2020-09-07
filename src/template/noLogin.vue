<template>
  <div>
    <div class="item flex-c" style="margin-top: 70px;">
      <div class="flex-c" style="flex-wrap:wrap;">
        <div style="width:100%;" class="flex-c">
          <img
            src="https://youjiao.douziit.com/imgs/imgs/noLogin.png"
            style="width:154rpx;height:154rpx;"
          />
        </div>
        <p class="text">您尚未登录</p>
        <div class="loginButton" @click="toCheck">立即登录</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: [],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.text {
  width: 100%;
  text-align: center;
  padding: 10px 0px;
  font-size: 30rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgb(153, 153, 153);
}

.loginButton {
  margin-top: 14rpx;
  width: 300rpx;
  height: 49px;
  line-height: 49px;
  border-radius: 25px;
  text-align: center;
  background-color: #52affe;
  overflow: hidden;
  color: #ffffff;
  border: 0px;
  position: relative;
}

.loginButton::before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: #000;
  border: inherit;
  border-color: #000;
  border-radius: inherit;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  opacity: 0;
  content: " ";
}
.loginButton:active::before {
  opacity: 0.1;
}
</style>