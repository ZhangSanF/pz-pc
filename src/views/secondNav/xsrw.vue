<template>
    <div class="index contain">
        <div class="bannerxsrw"></div>
        <div class="task">
            <ul class="clearfix">
                <li class="item go"  style="">
                </li>
                <li style="width:8%;">
                    <div class="right"></div>
                </li>
                <li class="item ">
                    <div class="title">完成注册</div>
                    <div class="desc">打开配资新体验</div>
                    <div class="money">+288元管理费</div>
                    <div class="button">
                    <router-link :class="step -0 > 1?'ok':'next'" to="user/register" tag="a">前往注册</router-link>
                </div>
                </li>
                <li style="width:8%">
                    <div class="right"></div>
                </li>
                <li class="item ">
                    <div class="title">实名认证</div>
                    <div class="desc">真实身份信息认证</div>
                    <div class="money">+200元管理费</div>
                    <router-link :class="step -0 > 2?'ok':'next'" to="user/login" tag="a">前往实名</router-link>
                </li>
            </ul>
            <div class="down"></div>
            <ul class="clearfix">
            <li class="item ">
                <div class="title">首次配资</div>
                <div class="desc">免费体验合约除外</div>
                <div class="money">+200元管理费</div>
                <router-link :class="step -0 >3?'ok':'next'" to="monthFinancing" tag="a">申请合约</router-link>
            </li>
                <li style="width:8%">
                    <div class="left"></div>
                </li>
                <li class="item ">
                    <div class="title">首次充值</div>
                    <div class="desc">首次体验充值功能</div>
                    <div class="money">+200元管理费</div>
                    <span :class="step -0 > 4?'ok':'next'" @click="isLogin('monthFinancing')">申请合约</span>
                </li>
                <li style="width:8%">
                    <div class="left"></div>
                </li>
                <li class="item ">
                    <div class="title">绑定银行卡</div>
                    <div class="desc">开户名与实名认证同名</div>
                    <div class="money">+200元管理费</div>
                    <span :class="step -0 > 5?'ok':'next'" @click="isLogin('monthFinancing')">前往绑定</span>
                </li>
            </ul>
            <div class="down2"></div>
            <ul class="clearfix">
                <li class="item ">                
                    <div class="title">首次追加配资</div>
                    <div class="desc">首次体验追加配资功能</div>
                    <div class="money">+300元管理费</div>
                    <span :class="step -0 > 6?'ok':'next'" @click="isLogin('monthFinancing')">前往操作</span>
                </li>
                <li style="width:8%;">
                    <div class="right"></div>
                </li>
                <li class="item ">                
                    <div class="title">首次补亏</div>
                    <div class="desc">首次体验补亏功能</div>
                    <div class="money">+300元管理费</div>
                    <span :class="step -0 > 7?'ok':'next'" @click="isLogin('monthFinancing')">前往操作</span>
                </li>
                <li style="width:8%;">
                    <div class="right"></div>
                </li>
                <li class="item ">                
                    <div class="title">首次提盈</div>
                    <div class="desc">首次体验提盈功能</div>
                    <div class="money">+200元管理费</div>
                    <span :class="step -0 > 8?'ok':'next'" @click="isLogin('monthFinancing')">前往操作</span>
                </li>
            </ul>

            <div style="margin: 33px 0;font-size: 21px;font-weight: 800;color: #ff5064;">
                <p>温馨提示：以上所有奖励机制仅限于用户抵扣管理费！</p>
            </div>
        </div>
        <div style="height:40px"></div>

    </div>
</template>

<script>
import {getLocalStorage} from '../../config/mUtils'
export default {
        data(){
            return{
                step: '5',
            }
        },
        methods:{
            isLogin(path) {
            //  const a =  getLocalStorage('pzToken')  
             if(!a) return  this.$router.push({path:'/user/login'})
             this.$router.push({path:path})
            }
        }
}
</script>

<style lang="scss" scoped>
    .index {
       background: url('../../assets/image/bg0.jpg') repeat;
    }
    .bannerxsrw {
        height: 409px;
        background: url('../../assets/image/banner02.png')  no-repeat center;
    }
    .task {
        width: 1080px;
        margin: 0 auto;
        border: 8px solid #ee878f;
        border-radius: 10px;
        background: #ffffff80;
        padding: 60px 60px 0;
    }

    .task .item {
        background: #fff;
        border-radius: 5px;
        padding: 40px 0;
        position: relative;
    }

    .task li {
        display: block;
        width: 28%;
        float: left;
        text-align: center;
    }
    .task .right {
        width: 60px;
        height: 60px;
        background: url('../../assets/image/jt_right.png') no-repeat center;
        background-size: contain;
        margin: 86px auto;
    }
    .task li .title {
        color: #ff8b19;
        font-size: 24px;
    }
    .task li .desc {
        color: #bcbcbc;
        font-size: 14px;
        margin: 10px 0px;
    }
    .task li .money {
        color: #ff8b19;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .task .down {
        width: 60px;
        height: 60px;
        background: url('../../assets/image/jt_down.png') no-repeat center;
        background-size: contain;
        margin: 10px 0px 10px 920px;
    }
    .task .down2 {
        width: 60px;
        height: 60px;
        background: url('../../assets/image/jt_down.png') no-repeat center;
        background-size: contain;
        margin: 10px 0px 10px 118px;
    }
    .task .left {
        width: 60px;
        height: 60px;
       background: url('../../assets/image/jt_left.png') no-repeat center;
        background-size: contain;
        margin: 86px auto;
    }
    .go {
        background:url('../../assets/image/caishen.png') no-repeat center !important;
        background-size: contain !important;
        height: 152px !important;
    }
    .ok {
        display: block;
        background: #ddd;
        border-radius: 4px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        width: 70%;
        margin: 0px auto;
    }
     .next {
        display: block;
        background: #ff5064;
        border-radius: 4px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        width: 70%;
        margin: 0px auto;
    }
</style>

