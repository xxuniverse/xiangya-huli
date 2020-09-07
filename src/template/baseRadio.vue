<template>
  <div>
    <van-radio-group
      @change="onChange($event)"
      :value='radio'
      class="conduitType"
    >
      <label
        class="checkbox"
        v-for="(item,index) of data"
        :key="index"
      >
        <view>
          <van-radio :name="item.id">
            {{item.val}}
          </van-radio>
        </view>
      </label>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  props:['data','name'],
  data() {
    return {
      radio:"",
    };
  },
  methods:{
    onChange(e){
      this.radio = e.mp.detail
      this.$emit('radioChange',[e.mp.detail,this.name])
    }
  }
};
</script>

<style scoped>
.checkbox{
   display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 0.8rem;
    line-height: 0.8rem;
    margin-top: 0.40rem;
    padding: 0 30rpx 0 0;
    font-size: 0.3rem;
}
.conduitType {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
}
.conduitType > van-radio {
  width: 50%;
  margin-top: 0.64rem;
  font-size: 0.3rem;
  color: #313233;
}
</style>