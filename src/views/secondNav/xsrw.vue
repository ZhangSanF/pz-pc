<template>
    <div class="index contain">
        <div class="bannerxsrw"></div>
        <div class="task">
            <ul class="clearfix first">
                <li class="item go"></li>
                <li class="item" v-for="(item, index) in getXsrwData" :key="index" v-if="index < 2">
                    <div class="wc" v-if="item.result == 1"></div>
                    <div class="title">{{item.title}}</div>
                    <div class="desc">{{item.description}}</div>
                    <div class="money">+{{item.gift_money}}元管理费</div>
                    <a @click="isGoRouter(item.identification, item.result)" href="javascript:void(0);" :class="item.result == 1 ? 'ok' : 'next'">前往操作</a>
                </li>
            </ul>
            <div class="down"></div>
            <ul class="clearfix second">
                <li class="item" v-for="(item, index) in getXsrwData" :key="index" v-if="index >= 2 && index < 5">
                    <div class="wc" v-if="item.result == 1"></div>
                    <div class="title">{{item.title}}</div>
                    <div class="desc">{{item.description}}</div>
                    <div class="money">+{{item.gift_money}}元管理费</div>
                    <a @click="isGoRouter(item.identification, item.result)" href="javascript:void(0);" :class="item.result == 1 ? 'ok' : 'next'">前往操作</a>
                </li>
            </ul>
            <div class="down2"></div>
            <ul class="clearfix first">
                <li class="item" v-for="(item, index) in getXsrwData" :key="index" v-if="index >= 5 && index < 8">
                    <div class="wc" v-if="item.result == 1"></div>
                    <div class="title">{{item.title}}</div>
                    <div class="desc">{{item.description}}</div>
                    <div class="money">+{{item.gift_money}}元管理费</div>
                    <a @click="isGoRouter(item.identification, item.result)" href="javascript:void(0);" :class="item.result == 1 ? 'ok' : 'next'">前往操作</a>
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

import { mapGetters, mapActions } from "vuex";

export default {
        data(){
            return{

            }
        },
        created() {
            this.noviceTask()
        },
        methods:{
            ...mapActions(['noviceTask']),
            isGoRouter(routerMap, result) {
                if(result == 1) {
                    return
                }else {
                    switch(routerMap) {
                        case 'register' : this.$router.push('/user/register'); break;
                        case 'real_name_auth' : this.$router.push('/member/safeSetting'); break;
                        case 'first_loan' : this.$router.push('/monthFinancing'); break;
                        case 'first_recharge' : this.$router.push('/member/recharge'); break;
                        case 'bind_bank_card' : this.$router.push('/member/bankInfo'); break;
                        case 'first_add_loan' : this.$router.push('/member'); break;
                        case 'first_supplement_losses' : this.$router.push('/member'); break;
                        case 'first_draw_profits' : this.$router.push('/member'); break;
                    }
                }
            }
        },
        computed:{
            ...mapGetters(['getXsrwData'])
        },
        watch:{

        }
}
</script>

<style lang="scss" scoped>
    .wc{
        position: absolute;
        right: 0;
        top: 0;
        width: 141px;
        height: 111px;
        background: url('../../assets/image/over.png') no-repeat;
        background-size: contain;
    }
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
        margin-left: 8%
    }
    .first>.item:nth-child(1){
        margin-left: 0
    }
    .first>.item:nth-child(1)::before{
        display: none
    }
    .first>.item::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -73px;
        transform: translate(0,-50%);
        width: 60px;
        height: 60px;
        background: url('../../assets/image/jt_right.png') no-repeat center;
        background-size: contain;
    }
    .second>.item{
        float: right
    }
    .second>.item:nth-child(3){
        margin-left: 0
    }
    .second>.item::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -73px;
        transform: translate(0,-50%);
        width: 60px;
        height: 60px;
        background: url('../../assets/image/jt_left.png') no-repeat center;
        background-size: contain;
    }
    .second>.item:nth-child(3)::before{
        display: none
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
        display: inline-block;
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

