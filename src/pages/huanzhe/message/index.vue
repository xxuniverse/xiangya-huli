<template>
    <div class="containerLogin">
        <frames :obj="obj"></frames>
        <div class="wrap">
            <ul>
                <li>
                    <span>头像</span>
                    <div class="img-wrap">
                        <img class="user" :src="patientData.header" alt="">
                        <!-- <img class="back" src="../../../../static/images/login/user_back.png" alt=""> -->
                    </div>
                </li>
                <li>
                    <span>昵称</span>
                    <span>{{patientData.userNickname}}</span>
                </li>
                <li>
                    <span>性别</span>
                    <span>{{patientData.sex == 2 ? "男" : "女"}}</span>
                </li>
                <li>
                    <span>手机号码</span>
                    <span>{{patientData.phone}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
    

<script>
    import frames from "../../../components/frames";
    import store from "../../../utils/store";
    import Http from "../../../utils/https";
    
    export default {
        data() {
            return {
                obj: {
                    text: '详细信息',
                    state: true,
                },
                patientData: {}
            }
        },
        onLoad(){
            this.patientData = wx.getStorageSync("patientData");
            console.log( this.patientData );
        },
        components: {frames},
        
    }
</script>

<style scoped>
    .wrap ul li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.1rem;
        padding: 0 0.3rem;
        border-bottom: 0.01rem solid #E6E6E6;
    }
    .user{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
    }
    .back{
        width: 0.14rem;
        height: 0.26rem;
        margin-left: 0.1rem;
    }
    .img-wrap{
        display: flex;
        align-items: center;
    }
</style>