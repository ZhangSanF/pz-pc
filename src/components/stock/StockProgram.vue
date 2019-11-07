<template>
    <div class="program" v-if="termData != undefined">
        <h3 class="stock-lable">
            <span> 选择配资方案</span>
            <img style="vertical-align: middle "  src="../../assets/image/peiziimgxjt.jpg">
        </h3>
        <div class="program-left">
            <div class="program-left-1">
                第一步：
                <span>输入投资本金（{{termData.stepOne}}）</span>
            </div>
            <div>
                <el-input class="firststep-input" :placeholder="termData.placeholder" v-model.trim="principal" @keyup.native="moneyKeyUp" @blur="moneyBlur" clearable></el-input>
                <em class="firststep-money">元</em>
            </div> 
            <div  class="first-remark">
                <span>备注：</span> 
                <span>{{termData.remarkOne}}</span>
            </div>
            <div class="program-left-2">
                <span>第二步：</span>
                <!-- <span >选择获得资金（{{termData.stepTwo}}）</span> -->
                <span>选择获得资金</span>
            </div>
            <el-row :gutter="30" class="sel">
                <el-col :span="8" 
                        class="sel-content"
                        :class="index === active ? 'sel-active' : ''" 
                        v-for="(item, index) in programData" 
                        :key="index">
                    <div @click="pzActive(index, item)">
                        <i></i><strong class="sel-strong">{{item.multiple}}</strong>倍
                        <div v-if="pzType === 'free'" class="sel-interest">
                            <span>免息</span>
                        </div>
                        <div v-else class="sel-interest">
                            <span v-if="pzType === 'day'">
                                日利率
                            </span>
                            <span v-else>
                                月利率
                            </span>
                            <span>
                                {{item.rate}}%
                            </span>
                        </div>
                        <p><span>{{pzMoney(item.multiple)}}</span>元</p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="program-right">
            <div class="right-first" >
                第三步：
                <span >
                    选择你的配资周期
                </span>
            </div>

            <div>
                <span class="term"> 期限：</span>
                <el-select v-if="periodData.length > 1" style="width:120px" v-model="term" size="mini"  placeholder="选择期限">
                    <el-option
                        v-for="item in periodData"
                        :key="item.value"
                        :value="item.value"
                        :label="item.lable"
                        >
                    </el-option>
                </el-select> 
                <span class="term" v-else>&nbsp;
                    <span v-if="pzType === 'day' || pzType === 'free'">{{periodData[0]}}个交易日</span>
                    <span v-else>{{periodData[0]}}个自然月</span>
                </span>                             
                <span class="interestfee">&nbsp; {{pzType === 'vip' ? ' 利息费' :'账户管理费'}} ：</span>          
                <span class="interestfee-num interestfee" v-if="pzType === 'free'">{{termData.interestNum}}</span>
                <span class="interestfee-num interestfee" v-else>{{mFee | number}}</span>
                <span class="term" v-if="pzType === 'day'" >元 / 交易日</span>
                <span class="term" v-if="pzType === 'month' || pzType === 'vip' " >元 / 自然月</span>
            </div>
            <div class="remarks" v-if="pzType !== 'free'">
                <span>备注：</span> 
                {{termData.remark}}
            </div>
            <!-- 按天配资 -->
            <div class="lable" >
                第四步：
                <span style="font-weight: 400">
                    选择开始交易时间
                </span>
            </div>
            <div>
                <span class="btn-active btn-span" v-if="showTake">立即生效</span>
                <span class="btn-active btn-span" v-if="!showTake">下个交易日</span>
            </div>
            <div class="remarks">备注：当日交易12点之前立即生效，12点后下个交易日生效</div>
            <div class="lable" >
                第五步：
                <span style="font-weight: 400">
                    确认配资信息
                </span>
            </div>
            <table class="table tableborder tabletree tablemony" style="width:95%;">
                <tbody>
                    <tr>
                        <th width="100">配资须知</th>
                        <td>
                          {{pzType === 'free' ? `盈利${termData.divided}%全归您` : '盈利全归您'}}   
                        </td>
                    </tr>
                    <tr>
                        <th>总配资资金</th>
                        <td>
                            <em style="color: #fe5911;">{{ principal * 1 + multiple * principal}}元</em> 
                            <small style="color:#555">{{principal || 0}}(本金) + {{multiple * principal}}(配资资金)</small>
                        </td>
                    </tr>
                    <tr>
                        <th>亏损警戒线</th>
                        <td>
                            <em style="color: #fe5911;">{{multiple * principal + principal * ((100 - getSettingStock.risk_warning_line*1)/100) }}元</em>
                            <small style="color:#555">(警戒线 = 配资资金 + 本金 × {{100 - getSettingStock.risk_warning_line}}%)</small>
                        </td>
                    </tr>
                    <tr>
                        <th>亏损平仓线</th>
                        <td>
                            <em style="color: #fe5911;">{{multiple * principal + principal * ((100 - getSettingStock.risk_closeout_line*1)/100) }}元</em>
                            <small style="color:#555">(平仓线 = 配资资金 + 本金 × {{100 - getSettingStock.risk_closeout_line}}%)</small>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="program-under"  >
            <p class="under-header" >
                <span>备注:您需支付的金额为：保证金</span>
                <span>{{principal || 0}}</span>
                <span v-if="pzType === 'free'">+ 0元（管理费）= {{principal || 0}} 元</span>
                <span v-else>+ {{sumManagement | number}}元（管理费）= {{sumMoney | number}} 元</span>
            </p>
            <p class="under-middle" style="">
                <span> 有任何不清楚，请咨询客服QQ：</span>
                <span>{{serviceQQ}}</span></p>
            <p class="under-middle">
                <input  class="confrim"
                type="button"
                value="我要配资"
                @click="confrimPay"
                >
            </p>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
    filters: {
        number(value) {
            var toFixedNum = Number(value).toFixed(2);
            return toFixedNum;
        }
    },
    name: 'stockProgram',
    props: ["programData",'stockType','termData'],
    data(){
        return{
            active: 0,
            pzType: '',
            orderType: null,
            // principal: 100,//input金额
            principal: 0,//input金额
            term: '',//交易周期
            mFee: 0,//账户管理费
            multiple: 0,//杠杆倍数
            rate: 0,//利率
        }
    },
    mounted(){
        setTimeout(()=> {
            this.rate = this.programData[0].rate
            this.mFee = (this.programData[0].multiple * this.principal) * (this.programData[0].rate / 100)
            this.multiple = this.programData[0].multiple
            this.pzType = this.stockType.lable
            this.orderType = this.stockType.value
            this.principal = this.termData.min
        },20)
    },
    methods: {
        pzActive (i,item) {
            this.active = i 
            this.multiple = item.multiple
            this.rate = item.rate
            // 账户管理费 (/交易日&&//自然月)(配资总资金 * 利率)
            this.mFee = this.principal * this.multiple * (item.rate/100)
        },
        moneyKeyUp(e) { //金额强制转浮点型 排除0 .
            this.principal=this.principal.replace(/[^\d]/g,'')
            if(e && (e.keyCode === 190 || e.keyCode === 48)){return;}
        },
        moneyBlur(e) {
            this.principal = parseFloat(parseFloat(this.principal).toFixed(2)) || '';
        },
        // 配资资金(本金 * 杠杆倍数)
        pzMoney(multiple) {
            return this.principal * multiple
        },
        confrimPay() {
            // 判断登录状态
            if(!this.getIsLogin) {
                this.$router.push({path: '/user/login', query: {redirect: this.$route.path}})
                return
            }
            // 判断是否实名认证
            if(!this.getUserInfo.is_real_name) {
                this.$alert('您还未完成身份验证，请先进行实名认证')
                this.$router.push('/member/safeSetting')
                return
            }
            // 判断金额
            if( (this.principal*1) < (this.termData.min*1) || 
                (this.principal*1) > (this.termData.max*1) || 
                (this.principal*1) % (this.termData.divisor*1) !==0) {
                return this.$message.error(`本金不小于${this.termData.min}元,不大于${this.termData.max},且为${this.termData.divisor}的倍数`);
            }
            // 判断是否可以选择期限（配资周期）
            if(this.periodData.length > 1 && this.term == '') return this.$message.error('请选择你的配资周期');
            //提交给后台的数据
            let obj = {
                orderMoney: this.principal || '0',//金额
                orderType: this.orderType,//配资单类型1免息2按天3按月4VIP
                multiple:  this.multiple ,//杠杆倍数
                period: this.periodData.length > 1 ? this.term : this.periodData[0]//期限，周期
            }
            // 确认配资页面显示的数据
            let pzData = {
                principal: this.principal || 0, //保证金
                period: this.periodData.length > 1 ? this.term : this.periodData[0],//期限，周期 
                sumMFee: this.sumManagement, //总利息 
                mFee: this.pzType == 'free' ? 0 : this.mFee , //利息(每天的利息)    
                pzMoney: this.principal * this.multiple, //配资金额   
                funds:  this.principal*1 + this.principal * this.multiple , //配资资金
                lineOf: this.multiple * this.principal + this.principal * ((100 - this.getSettingStock.risk_warning_line*1)/100),//预警线
                opeLine: this.multiple * this.principal + this.principal * ((100 - this.getSettingStock.risk_closeout_line*1)/100),//平仓线
                pzType: this.pzType
            }
            this.$parent.showEnter = true
            this.$parent.pzObj = obj
            this.$parent.pzSureData = pzData
            // 回到顶部
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
    },
    computed: {
        ...mapGetters(['getIsLogin', 'getSettingBase', 'getSettingStock', 'getUserInfo']),
        // 计算交易周期
        periodData() {
            let day = '个交易日'
            let monthV = '个自然月'
            let arr = []
            if(this.termData.period) {
                let min = this.termData.period.min
                let max = this.termData.period.max
                if(min == max) {
                    return [min]
                }else {
                    for(let i = min; i <= max; i++) {
                        if(this.pzType == 'day' || this.pzType == 'free') {
                            arr.push({
                                value: Number(i),
                                lable: i + day
                            })
                        }else {
                            arr.push({
                                value: i,
                                lable: i + monthV
                            })
                        }
                    }
                    this.term = arr[0].value
                    return arr
                }
            }
        },
        // 总金额
        sumMoney() {
            return this.sumManagement*1 + this.principal*1
        },    
        // 计算 交易日 * 交易日每天的管理费（总管理费）
        sumManagement() {
            return this.mFee * this.term
        },
        // 时间判断显示是否为当日生效(true)&下个交易日生效(false)
        showTake() {
            let myDate = new Date().getHours()
            if(myDate >= 12) {
                return false
            }else {
                return true
            }
        },
        // 客服qq
        serviceQQ() {
            return this.getSettingBase.service_qq.split('|')[0]
        }
    },
    watch:{
        principal:{
            handler(a,b) {
                if(a <= 0) {
                    this.principal = ''
                    this.mFee = 0
                    return false                 
                }
                if(a.length > this.termData.max.length) {
                    this.principal = this.termData.max
                }              
                this.mFee = this.principal * this.multiple * (this.rate /100)
            },
            deep: true
        }
    },
}
</script>
<style lang="scss" scoped>
    .sel-content:hover {
        height: 100px;
        color: #ff5256;
        top: -15px;
        border: 2px solid #ff5256;
    }
    .lable {
            color:#ff6f06;
            font-size: 16px;
            font-weight: bold;
            margin: 16px 0px;
    }
    .btn-active {
        background: #ff6f06 !important;
        color: #fff !important;
        border: 1px solid #ff6f06 !important;
    }

    .btn-span {
        margin-right: 15px;
        padding: 3px 25px;
        display: inline-block;
        border: 1px solid #ccc;
        background: #FFF;
        color: #999;font-size: 13px;
        cursor: pointer;
    }
    .lable-text{
        font-size: 16px;
        color:#6a6a6a;
    }
    .remarks{
        color:#8e8e8e;
        margin: 10px 0;
        font-size: 13px;
    }
    .lable-span {
        font-weight: 400
    }
    .program-content {
        width:505px;
        // height: 550px;
        padding-left:32px;
        border:1px solid #c2c2c2;
        display:block;
        min-height: 550px;
    }
    .program-left {
         @extend .program-content;
         float:left; 
         .program-left-1{
         @extend .lable;
            span{
                @extend .lable-span;
            }

        }
        .firststep-input{
            height: 50px;
            line-height: 50px;
            width: 400px;
            text-align: center; 
            font-size: 18px;
        }
        .firststep-money {
            font-size: 24px; 
            font-style: normal; 
            color: #666; margin-left: 10px;
        }
        .first-remark{
         @extend .remarks;
        }
        .program-left-2{
            @extend .program-left-1;
        }
    }
    .sel-content {
            height: 100px;
            width: 142px;
            display: table-cell;
            vertical-align: middle;
            border: 2px solid #ddd;
            padding: 0;
            margin: 5px;
            text-align: center;
            font-size: 16px;
            color: #999;
            border-radius: 5px;
            top: -15px;
            cursor: pointer;
    }
    .sel-active {
        height: 100px !important;
        color: #ff5256 !important;
        top: -15px !important;
        border: 2px solid #ff5256 !important;
        color: #fff !important;;
        background: #ff6f06 !important;
    }
    .sel-strong {
        font-size: 40px;
        font-family: Arial;
        line-height: 58px;
    }
    .sel-interest{
        font-size: 0.75em;
        margin: -5px 0px;
    }
    .program-right {
        @extend .program-content;
        float: right;
        .term{
             @extend .lable-text;
        }
        .interestfee {
            @extend .lable-text;
        }
        .interestfee-num{
            font-style: normal;
            color: #ff6f06
        }
        .interestfee-text{
            @extend .interestfee ;
        }
        .interestfee-remarks{
            @extend .remarks;
        }
    }
    .right-first{
        @extend .lable;
        span{
            @extend .lable-span;
        }
    }
    .tablemony th {
        color: #555;
        background-color: #ffe9e9;
        font-size: 14px;
        font-weight: normal;
        padding-right: 15px;
    }
    .tablemony td, .tablemony th {
        padding: 12px 6px;
    }
    .tabletree th {
        text-align: center;
    }
    .tableborder td, .tableborder th {
        border: 1px solid #ddd;
    }
    .tablemony td {
        color: #555;
    }
    .tablemony td, .tablemony th {
        padding: 18px 6px;
    }
    .tabletree td {
        text-align: left;
    }
    .tableborder td, .tableborder th {
        border: 1px solid #ddd;
    }
    .program-under {
        padding-top: 30px;
        border-bottom:1px solid #ddd;
        clear:both; 
        margin-top:40px
    }
    .under-header {
        color:#ff6f06; 
        text-align: center;
        margin: 10px 0; 
        font-size: 16px;
    }
    .under-middle {
        padding: 10px;
        text-align: center;
    }
    .confrim {
        height: 40px; 
        line-height: 40px;
        border: none;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        font-family: microsoft yahei;
        color: #fff;
        overflow: visible;
        border-radius: 5px;
        font-size: 18px;
        width: 165px;
        background-color: #d72800;
    }
</style>