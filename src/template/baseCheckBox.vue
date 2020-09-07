<template>
  <div>
    <checkbox-group
      @change="checkboxChange($event)"
      class="check"
    >
      <label
        class="checkbox"
        v-for="(item,index) of data"
        :key="index"
      >
        <view>
          <checkbox :value="item.id">
            {{item.val}}
          </checkbox>
        </view>
      </label>
      <!-- 症状 -->
    </checkbox-group>
  </div>
</template>

<script>
export default {
    props:['data','name'],
    data() {
        return {

        };
    },
    methods:{
        checkboxChange(e,value){
            this.$emit('checkboxChange',[e.mp.detail.value,this.name])
        }
    }
};
</script>

<style scoped>
 .check {
    display: flex;
    flex-direction: column;
  }
  .checkbox{
     display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 0.8rem;
    margin-top: 0.40rem;
    padding: 0 10rpx 0 30rpx ;
    font-size: 0.3rem;
  }
  .checkbox:first-child{
    margin-top: 0px;
  }
</style>