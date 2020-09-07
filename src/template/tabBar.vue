<template>
    <div>
        <van-tabbar :active="active"  @change="hasClick" class="tabbar">
            <van-tabbar-item  name="order">
                <span class="item">订单</span>
                <img slot="icon" 
                    src="/static/images/login/oderFrom.png"
                    class="img"
                    >
                <img slot="icon-active" 
                    src="/static/images/login/oderFromNew.png"
                    class="img"
                    >
            </van-tabbar-item>
            <van-tabbar-item  name="token">
                <span class="item">通讯</span>
                 <img slot="icon" 
                    src="/static/images/login/dialogue.png"
                    class="img"
                    >
                <img slot="icon-active" 
                    src="/static/images/login/dialogueNew.png"
                    class="img"
                    >
            </van-tabbar-item>
            <van-tabbar-item name="call">
                <span class="item">报警</span>
                 <img slot="icon" 
                    src="/static/images/login/police.png"
                    class="img"
                    >
                <img slot="icon-active" 
                    src="/static/images/login/policeNew.png"
                    class="img"
                    >
            </van-tabbar-item>
            <van-tabbar-item name="mine">
                <span class="item">我的</span>
                <img slot="icon" 
                    src="/static/images/login/my.png"
                    class="img"
                    >
                <img slot="icon-active" 
                    src="/static/images/login/myNew.png"
                    class="img"
                    >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    props:['name'],
    data(){
        return{
            active:'order',
        }
    },
    methods:{
        hasClick(val){
            console.log(val);
            
            this.active = val.mp.detail
            //提交至vuex
            this.$store.commit('changeActive',this.active)
            //告诉首页切换组件
            this.$emit('hasChange',this.active)
        }
    },
    mounted(){
        console.log(123);
        
    }
}
</script>

<style scoped>
.item{
    font-size: 22rpx;
}
.tabbar>>> .img{
    width: 38rpx!important;
    width: 38rpx!important;
}

</style>