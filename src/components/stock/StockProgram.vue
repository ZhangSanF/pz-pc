<template>
    <div class="program">
        <h3 class="stock-lable">
            <span> 选择配资方案</span>
            <img style="vertical-align: middle "  src="../../assets/image/peiziimgxjt.jpg">
        </h3>
        <div class="program-left">
            <div class="program-left-1">
                第一步：
                <span>选择获得资金（{{termDatas.stepOne}}）</span>
            </div>
            <div>
                <el-input class="firststep-input" :placeholder="termDatas.placeholder" v-model.trim="principal" @keyup.native="moneyKeyUp" @blur="moneyBlur" clearable></el-input>
                <em class="firststep-money">元</em>
            </div> 
            <div  class="first-remark">
                <span>备注：</span> 
                <span>{{termDatas.remarkOne}}</span>
            </div>
            <div class="program-left-2">
                <span>第二步：</span>
                <span >选择获得资金（{{termDatas.stepTwo}}）</span>
            </div>
            <el-row :gutter="30" class="sel">
                <el-col :span="8" 
                        class="sel-content"
                        :class="index === active?'sel-active':''" 
                        v-for="(item, index) in pzSel" 
                        :key="index">
                    <div @click="pzActive(index,item)">
                        <i></i><strong class="sel-strong">{{item.num}}</strong>倍
                        <div v-if="pzType === 'free'" class="sel-interest">
                            <span>免息</span>
                        </div>
                        <div v-else class="sel-interest">
                            <span>
                                月利率
                            </span>
                            <span>
                                {{item.interestRate}}%
                            </span>
                        </div>
                        <p><span>{{item.total}}</span>元</p>
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
                <span class="term" > 期限：</span>
                <span v-if="pzType === 'free'" class="term">&nbsp; {{ pzType === 'free' ? periodData + '个交易日' : interest }} </span>
                <el-select v-else style="width:120px"  v-model="term" size="mini"  placeholder="选择期限">
                    <el-option
                        v-for="item in periodData"
                        :key="item.value"
                        :value="item.value"
                        :label="item.lable"
                        >
                    </el-option>
                </el-select>              
                <span class="interestfee">&nbsp; {{pzType === 'vip' ? ' 利息费' :'账户管理费'}} ：</span>
                <span class="interestfee-num interestfee" >{{ pzType === 'free' ? termDatas.interestNum : mFee }}</span>
                <span class="term" v-if="pzType === 'day'" >元 / 交易日</span>
                <span class="term" v-if="pzType === 'month' || pzType === 'vip' " >元 / 自然月</span>
            </div>
            <div class="remarks">
                <span>备注：</span> 
                {{ pzType === 'free' ? `第${periodData}个交易日14:00终止配资并结算` : termDatas.remark }}
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
                          {{pzType === 'free' ? `盈利${termDatas.divided}%全归您` : '盈利全归您'}}   
                        </td>
                    </tr>
                    <tr>
                        <th>总配资资金</th>
                        <td>
                            <em style="color: #fe5911;">{{ principal*1 + activeData.total*1 }}元</em> 
                            <small style="color:#555">{{principal || 0}}(本金)+{{activeData.total}}(配资资金)</small>
                        </td>
                    </tr>
                    <tr>
                        <th>亏损警戒线</th>
                        <td>
                            <em style="color: #fe5911;">{{activeData.total * 1 + (principal * (termDatas.warning_line/100)) }}元</em>
                            <small style="color:#555">(警戒线 = 配资资金 + 本金 × {{termDatas.warning_line}}%)</small>
                        </td>
                    </tr>
                    <tr>
                        <th>亏损平仓线</th>
                        <td>
                            <em style="color: #fe5911;">{{activeData.total * 1 + (principal * (termDatas.close_line/100)) }}元</em>
                            <small style="color:#555">(平仓线 = 配资资金 + 本金 × {{termDatas.close_line}}%)</small>
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
                <span v-else>+ {{sumManagement}}元（管理费）= {{Number(principal) + Number(sumManagement)}} 元</span>
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
    name: 'stockProgram',
    props: ["programData",'stockType','termData'],
    watch:{
        principal:{
            handler(a,b) {
                var re=/[^\d，,]]*/g;
                this.principal = String(a).replace(re,"");
                this.getNum()
            },
            deep: true
        }
    },
    data(){
        return{
            interest:0.00,
            serviceQQ:'xxx',
            pzSel :[],
            termDatas: {},
            active: 0,
            pzType: '',
            orderType: null,
            activeData: {},
            interestfee: 0,
            mFee:0,
            gFee:0,
            pFee:0,
            aFee:0,
            pmFee:0,
            totalAmount:0,
            principal:'',
            term:'',
            days:''
        }
    },
    mounted(){
        this.pzSel = this.programData
        this.termDatas = this.termData
        this.pzType = this.stockType.lable
        this.orderType = this.stockType.value
        this.activeData = this.programData[0]
    },
    methods: {
        pzActive (i,item) {
            this.active = i 
            this.activeData = item
            if(this.principal - 0 >0) {
                this.getNum()
            }
        },
        moneyKeyUp(e) { //金额强制转浮点型 排除0 .
            if(e && (e.keyCode === 190 || e.keyCode === 48)){return;}
            // this.getNum()
        },
        getNum() {
            // 判断金额大小
            if(this.principal-0 > this.termDatas.max -0) {
                this.principal = this.termDatas.max
                return this.$message.error('金额不能大于最大金额');
            }
            const d = this.activeData //选择的杠杆
            const b = d.interestRate ? d.interestRate : 0//利率
            const n =  d.num ? d.num : 0 //倍数
            const t =  d.num ? d.num : 0 //期限
            this.interestfee  = (this.principal*t).toFixed(2)
            this.mFee = (this.principal *b * n /100) .toFixed(2)
            this.pmFee = (this.principal *b * n * t/100) .toFixed(2)
            // 杠杆金额
            this.pzSel.map(i=> {
                return i.total = this.principal * i.num
            })
        },
        moneyBlur(e) {
            this.principal = parseFloat(parseFloat(this.principal).toFixed(2)) || '';
        },
        confrimPay() {
            // 判断登录状态
            if(!this.getIsLogin) {
                this.$router.push({path: '/user/login', query: {redirect: this.$route.path}})
                return
            }
            // 判断金额
            if( this.principal-0 < this.termDatas.min || (this.principal-0) % (this.termDatas.divisor-0) !==0) {
                return this.$message.error(`本金不小于${this.termDatas.min}元,且为${this.termDatas.divisor}的倍数`);
            }
            if( this.term == '' &&  this.pzType !== 'free' ) return this.$message.error('请选择你的配资周期');
            //提交给后台的数据
            let obj = {
                orderMoney: this.principal || '0',//金额
                orderType: this.orderType,//配资单类型1免息2按天3按月4VIP
                multiple:  this.activeData.num || '0',//杠杆倍数
                period: this.pzType == 'free' ? this.periodData : this.term//期限，周期
            }
            //确认配资页面显示的数据
            let pzData = {
                principal: this.principal || 0, //保证金
                period: this.pzType == 'free' ? this.periodData : this.term ,//期限，周期  
                sumMFee: this.sumManagement, //总利息 
                mFee: this.pzType == 'free' ? 0 : this.mFee , //利息(每天的利息)                
                pzMoney: this.activeData.total || '0', //配资金额                                           
                funds:  (this.activeData.total*1 + this.principal *1) , //配资资金
                lineOf: this.activeData.total*1 + (this.principal * (this.termDatas.warning_line/100)), //预警线 
                opeLine: this.activeData.total*1 + (this.principal * (this.termDatas.close_line/100)), //平仓线
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
        ...mapGetters(['getIsLogin']),
        // 计算交易周期
        periodData() {
            let day = '个交易日'
            let monthV = '个自然月'
            let arr = []
            if(this.termDatas.period) {
                let min = this.termDatas.period.min
                let max = this.termDatas.period.max
                if(min == max) {
                    // arr.push(min)
                    return min
                }else {
                    for(let i = min; i <= max; i++) {
                        if(this.pzType == 'day') {
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
                    return arr
                }
            }
        },
        // 计算 交易日 * 交易日每天的管理费（总管理费）
        sumManagement() {
            return ((this.mFee*1000) * (this.term*1000))/1000000
        },
        // 时间判断显示是否为当日生效(true)&下个交易日生效(false)
        showTake() {
            let myDate = new Date().getHours()
            if(myDate >= 12) {
                return false
            }else {
                return true
            }
        }
    }
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
        height: 550px;
        padding-left:32px;
        border:1px solid #c2c2c2;
        display:block;
        min-height: 496px;
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