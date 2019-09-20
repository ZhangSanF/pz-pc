<template>
    <div class="program">
        <div class=" pz-sure">
            <h2>{{titleName}}确认付款</h2>
            <div class="pz-mf">
                <div class="pz-mf1">
                    <h2>配资保证金</h2>
                    <p><span>{{pzSureData.principal || 0}}</span>元</p>
                </div>
                <div class="pz-circledata1">
                   {{pzSureData.period || 0}}
                   <span v-if="pzSureData.pzType == 'free' || pzSureData.pzType == 'day'">天</span>
                   <span v-else>月</span>
                </div>
                <div class="pz-mf2">
                    <h2>配资利息</h2>
                    <p>
                        <span>{{pzSureData.sumMFee | number}} </span>元
                        <b v-if="pzSureData.pzType == 'day'">({{pzSureData.mFee | number}}元/天)</b>
                        <b v-if="pzSureData.pzType == 'month' || pzSureData.pzType == 'vip'">({{pzSureData.mFee | number}}元/月)</b>
                    </p>
                </div>
                <div class="pz-circledata2">
                    配资
                </div>
                <div class="pz-mf3">
                    <h2>配资金额</h2>
                    <p><span>{{pzSureData.pzMoney || 0}}</span>元</p>
                </div>
            </div>

            <div class="pz-detail-all">
                <table>
                    <tbody>
                    <tr class="pz-detail-all-name">
                        <td>利息</td>
                        <td>配资周期</td>
                        <td>配资资金</td>
                        <td v-if="pzSureData.pzType != 'free'">预警线</td>
                        <td v-if="pzSureData.pzType != 'free'">平仓线</td>
                    </tr>
                    <tr class="pz-detail-color">
                        <td> {{pzSureData.sumMFee | number}}元</td>
                        <td v-if="pzSureData.pzType == 'free' || pzSureData.pzType == 'day'">{{pzSureData.period || 0}}天</td>
                        <td v-else>{{pzSureData.period || 0}}月</td>
                        <td>{{pzSureData.funds || 0}}元</td>
                        <td v-if="pzSureData.pzType != 'free'">{{pzSureData.lineOf}}元</td>
                        <td v-if="pzSureData.pzType != 'free'">{{pzSureData.opeLine}}元</td>
                    </tr>
                </tbody></table>
                <div class="pz-illustrate">
                    <ul>
                        <li>支付保证金<span>{{pzSureData.principal || 0}}元</span>，利息<span>{{pzSureData.sumMFee | number}}元</span></li>
                        <li v-show="pzSureData.pzType !== 'free'">本次账户管理费在配资成功后一次性收取。</li>
                        <li v-if="showRecharge">
                            <p style="float:left;">您的账户余额<span>{{getUserInfo.available_money | number}}元</span>， 还需
                                <span>
                                    {{showRecharge | number}}元
                                </span>
                            </p>
                            <router-link to="/member/recharge" tag="a">立即充值</router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="pz-agmt-btn">
                <h3>如果您不清楚规则，或有其他疑问，请拨打客服 {{getSettingBase.service_telephone}} 或与在线客服联系</h3>
                <label>
                    <span><input type="checkbox" v-model="isCheckbox" id="agreementCheckbox">我已经同意</span>
                    <a style="color:#f00;" href="javascript:void(0);" @click="toAbout('配资合作协议', '11')">《出彩速配配资协议》</a>
                </label>
                <span href="javascript:;" class="pz-me" @click="applyFinancing()">确认配资</span>
            </div>
        </div>
        <div class=" pz-ware-software">
            <div>
                <ul id="waring-software" class="clearfix">
                    <li><a href="javascript:void(0)" class="active">注意事项</a></li>
                </ul>
            </div>
            <div class="ware-software-content">
                <div id="pzwaring" style="display:block;">
                    <ul>
                        <li><em>1</em>不得购买S、ST、*ST、S*ST、SST、以及被交易所特别处理的股票；</li>
                        <li><em>2</em>不得购买权证类可以T+0交易的证券；</li>
                        <li><em>3</em>不得购买或持有上市新股，次新股（或复牌股票）及不设涨跌停板限制的股票；</li>
                        <li><em>4</em>可以满仓单支股票，但请保持账户内有足够的保证金，总投顾资金高于预警线，以免低于平仓线，被风控部门强制平仓；</li>
                        <li><em>5</em>不得进行坐庄、对敲、接盘、大宗交易、内幕信息等违反股票交易法律法规及证券公司规定的交易。</li>
                        <li><em>6</em>全程无需支付账户管理费，股市有风险，投资需谨慎！市场风险莫测，务请谨慎行事</li>
                        <li><em>7</em>资金使用期限：全程按月或按天支付利息（选择自动延期，请保持账户内资金够扣当天、月的费用）!</li>
                        <li><em>8</em>风险保证金：在您投顾出现亏损后用于支付亏损金，结束时如无亏损全额退还，保证金越低收益越大，同时风险也越大。</li>
                        <li><em>9</em>亏损警戒线：当总投顾资金低于警戒线以下时，只能平仓不能建仓，需要尽快补充风险保证金，以免低于亏损平仓线被平仓；</li>
                        <li><em>10</em>亏损平仓线：当总投顾资金低于平仓线以下时，我们将有权把您的股票进行平仓，为避免平仓发生，请时刻关注风险保证金是否充足；</li>
                        <li><em>11</em>开始交易时间：当日交易12点之前立即生效，12点后下个交易日生效；</li>
                        <li><em>12</em>平仓备注：符合平仓条件且当前交易日平仓失败的，在下一个交易日9:20以集合竞价方式平仓。</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'stockEnter',
    props:{
        pzSureData: {
            type: Object,
            default: function () { return {} }
        },
        pzObj: {
            type: Object,
            default: function () { return {} }
        },
        titleName: {
            type: String,
            default: ''
        }
    },
    filters: {
        number(value) {
            var toFixedNum = Number(value).toFixed(2);
            return toFixedNum;
        }
    },
    data(){
        return{
            isCheckbox: true
        }
    },
    methods:{
        ...mapActions(['addOrder']),
        //确认配资
        applyFinancing() {
            if(this.isCheckbox == false) return this.$message.error('请勾选我已同意出彩速配配资协议！');
            this.addOrder(this.pzObj)
        },
        toAbout(title, active) {
            this.$router.push('/user/about')
            this.$store.commit('ABOUT_QUERY', {id: '', title: title, active: active})
        }
    },
    computed: {
        ...mapGetters(['getUserInfo', 'getSettingBase']),
        // 还需充值金额（是否显示 充值提醒）
        showRecharge() {
            let show_money = 0;
            let money = this.getUserInfo.available_money - this.pzSureData.principal;
            let rate  = this.getUserInfo.gift_money - this.pzSureData.sumMFee;
            if(rate < 0) {
                money = money - Math.abs(rate);
            }
            money >= 0 ? show_money = 0 : show_money = Math.abs(money);
            return show_money
        }
        // 计算账户余额还需多少
        // moneyC() {
        //     // 共需要多少金额
        //     let money = this.pzSureData.principal*1 + this.pzSureData.sumMFee*1
        //     let sumMoney = money*1 - this.getUserInfo.available_money*1 - this.getUserInfo.gift_money*1
        //     return sumMoney
        // },
        //是否显示需要充值
        // showRecharge() {
        //     // true为显示需要充值
        //     // pzSureData.principal 保证金
        //     // pzSureData.sumMFee 利息
        //     // getUserInfo.available_money 账户余额
        //     // getUserInfo.gift_money 账户管理费
        //     // 账户余额大于保证金且账户利息小于当前利息
        //     if((this.getUserInfo.available_money*1) > (this.pzSureData.principal*1) && (this.getUserInfo.gift_money*1) < (this.pzSureData.sumMFee*1)) {
        //         let zMoney = this.getUserInfo.available_money - this.pzSureData.principal // 账户余额扣除保证金后还剩的money
        //         let lMoney = this.pzSureData.sumMFee - this.getUserInfo.gift_money // 还差多少利息
        //         if(zMoney > lMoney) {
        //             return false
        //         }else {
        //             return true
        //         }
        //     // 账户余额大于保证金且账户利息大于当前利息
        //     }else if((this.getUserInfo.available_money*1) > (this.pzSureData.principal*1) && (this.getUserInfo.gift_money*1) > (this.pzSureData.sumMFee*1)) {
        //         return false
        //     }else {
        //         return true     
        //     }
        // }
    }
}
</script>
<style lang="scss" scoped>
/**************确认配资**************/
.pz-sure{
    background-color: #fff;
}
.pz-sure h2{
    line-height:50px;
    font-size:20px;
    color:#F23030;
    text-align:center;
    font-weight:bold;
    height:60px;}
.pz-mf{
    background:url('../../assets/image/pz-surebg.png') top center no-repeat;
    height:116px;
    padding: 0 50px}
.pz-mf1{float: left;
width: 282px;
text-align: center;
  overflow: hidden;}
.pz-mf2{float: left;
width: 272px;
text-align: center;
  overflow: hidden;}
.pz-mf3{
    float: left;
    width: 272px;
    text-align: center;
     overflow: hidden;}
.pz-mf h2{
    font-size:15px;
    color:#000;
    font-weight:bold;}
.pz-mf p{
    font-size:15px;
    color:#000;
    line-height:35px;}
.pz-mf p span{
    font-size:25px;
    color:#F23030;}
.pz-circledata1{
float: left;
width: 76px;
text-align: center;
margin-top: 36px;
color: #fff;
font-size: 19px;}
.pz-circledata2{
    float: left;
    width: 76px;
    text-align: center;
    margin-top: 36px;
    color: #fff;
    font-size: 19px;}
.pz-detail-all{
    padding-top: 30px;
    margin: auto 45px ;
    background-color: #fff;}
.pz-detail-all table{
    width:100%;
    border:1px solid #ccc;}
.pz-detail-all table tr{
    border-bottom:1px solid #ccc;}
.pz-detail-all-name{
    background:#F4F4F4;
    font-size:15px;
    color:#000;}
.pz-detail-all table tr td{
    width:20%;
    height:45px;
    line-height:45px;
    text-align:center;}
.pz-detail-color{
    color:#F23030;
    font-size:15px;}

.pz-illustrate{
    width:940px;
    padding: 30px 30px 45px;}
.pz-illustrate ul li{
    line-height:35px;
    font-size:15px;
    color:#000;}
.pz-illustrate ul li span{
    color:#E95B5B;}
.pz-illustrate ul li a{
    margin-left:10px;
    color:#fff;
    width:120px;
    text-align:center;
    height:30px;
    line-height:30px;
    background:#E95B5B;
    display:block;
    float:left;}
.pz-agmt-btn {
    text-align:  center;
    padding-bottom: 30px;
}
.pz-me {
    cursor: pointer;
    display: block;
    font-size: 20px;
    width: 300px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #E95B5B;
    color: #fff;
    margin: 20px auto;
}
.pz-agmt-btn h3{
    color:#000;
    font-size: 17px;
    line-height: 30px;}
/**************确认配资**************/


.index_hz{
    border: 1px solid #e4e4e4;
    padding: 10px 0;}
.index_hz img{ 
    margin-left: 34px;
    margin-top: 12px;
    width: 160px;}
.pz-ware-software{
    margin-top:20px;
    margin-bottom:30px;}
#waring-software{
    top:2px;
    position: relative;}
#waring-software li a{
    float:left;
    width:125px;
    text-align:center;
    height:40px;
    line-height:40px;
    margin-right:15px;
    border:1px solid #ccc;
    border-bottom:none;
    font-size:18px;
    color:#000;}
#waring-software li a.active{
    width:125px;
    text-align:center;
    height:40px;
    line-height:40px;
    color:#000;
    border-top:2px solid #D03B00;
    background:#F4F1E5;}
.ware-software-content{
    background:#F4F1E5;
    padding: 25px;
    border: 1px solid #ccc;
    min-height:212px;}

#pzwaring ul li{
    line-height: 35px;
    font-size: 14px;
    color:#5F5F5F;}
#pzwaring ul li em{
    width:20px;
    text-align:center;
    height:20px;
    line-height:20px;
    background:#E95B5B;
    color:#fff;
    display:block;
    float:left;
    margin-top:7px;
    font-style:italic;
    margin-right:8px;
    border-radius:3px;}
/*********注意事项和交易软件***********/
.mFee{
    font-size: 15px;
    color: #000 ;
    line-height: 35px;
}
</style>