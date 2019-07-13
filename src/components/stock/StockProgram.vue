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
                <input class="firststep-input"  
                    :placeholder="termDatas.placeholder"
                    v-model="principal"
                    @input="inputFun"
                    type="text" 
                    size="30" 
                    maxlength="8">
                <em class="firststep-money" style="">元</em>
            </div> 
            <div  class="first-remark" style="">
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
                        <div class="sel-interest" >
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
            <!-- 免息配资 -->
            <div  >
                <span class="term" > 期限：</span>
                <el-select v-if="pzType === 'day'"  style="width:120px" v-model="term"  placeholder="选择期限">
                    <el-option
                    v-for="item in dayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-if="pzType === 'month' || pzType === 'vip'"  style="width:120px" v-model="term"  placeholder="选择期限">
                    <el-option
                    v-for="item in monthOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span v-if="pzType === 'free'" class="term">&nbsp; {{ pzType === 'free' ? termDatas.interest :interest }} </span>
                <span class="interestfee"  >&nbsp; {{pzType === 'vip' ? ' 利息费' :'账户管理费'}} ：</span>
                <span class="interestfee-num interestfee" >{{ pzType === 'free' ? termDatas.interestNum : mFee }}</span>
                <span class="term" v-if="pzType === 'day'" >元 / 交易日</span>
                <span class="term" v-if="pzType === 'month' || pzType === 'vip' " >元 / 自然月</span>
            </div>
            <!-- 免息配资 -->
            <div class="remarks">
                <span>备注：</span> 
                {{termDatas.remark}}
            </div>
            <!-- 按天配资 -->

            <div class="lable" >
                第四步：
                <span style="font-weight: 400">
                    选择开始交易时间
                </span>
            </div>
            <!--  -->
            <div>
                <span
                :class="index === tActive?'btn-active':''" 
                class="btn-span"
                @click="timeActive(index)"
                v-for="(item,index) in transaction"
                :key="index"
                >
                {{item.name}}
                </span>
            </div>
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
                          {{pzType === 'free' ? `盈利${getSettingFree.free_divided}%全归您` : '盈利全归您'}}   
                        </td>
                    </tr>
                    <tr>
                        <th>总配资资金</th>
                        <td ><em id="">{{ principal*1 + activeData.total*1 }}</em>元 
                            <small  style="color:#555">
                            {{principal}}(本金)+{{activeData.total}}(配资资金)</small>
                        </td>
                    </tr>
                    <tr>
                        <th>亏损警戒线</th>
                        <td >
                            <em >{{activeData.total*1 + (principal* 0.5) }}</em>元
                            <small  style="color:#555">(警戒线=配资资金+本金×50%)</small>
                            <span  title="当总配资资金低于警戒线以下时，只能平仓不能建仓，需要尽快补充风险保证金，以免低于亏损平仓线被平仓">
                                <i style="width:18px; height:18px; vertical-align:middle; margin-left:6px; cursor: pointer;" class="ico ico-help"></i>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>亏损平仓线</th>
                        <td >
                            <em id="outLine">{{activeData.total*1 + (principal* 0.2) }}</em>元
                            <small id="kspcx" style="color:#555">(平仓线=配资资金+本金×20%)</small>
                            <span class="small-area simpletooltip"  title="当总配资资金低于平仓线以下时，我们将有权把您的股票进行平仓，为避免平仓发生，请时刻关注风险保证金是否充足"><i style="width:18px; height:18px; vertical-align:middle; margin-left:6px; cursor: pointer;" class="ico ico-help"></i></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="program-under"  >
            <p class="under-header" >
                <span>备注:您需支付的金额为：保证金</span>
                <span v-if="pzType === 'free'"> {{principal > 0 ? 100 : 0}}</span>
                <span v-if="pzType === 'free'">+ {{0.00}}元（利息）= {{principal > 0 ? 100 : 0}} 元</span>
                <span v-if="pzType !== 'free'">  {{principal }}</span>
                <span v-if="pzType !== 'free'">+ {{principal > 0 ? pmFee : 100}}元（利息）= {{(principal*1 + pmFee*1) | number }} 元</span>
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
    data(){
        return{
            margin:0,
            interest:0.00,
            pay:0,
            serviceQQ:'356377777',
            pzSel :[
            ],
            termDatas: {},
            term:'',
            active: 0,
            pzType: '',
            tActive: 0,
            activeData: {},
            interestfee: 0,
            monthOptions: [
                {
                    value:'1',
                    lable:'1个自然月',
                },
                {
                    lable:'2个自然月',
                    value:'2'
                },
                {
                    lable:'3个自然月',
                    value:'3'
                },
                {
                    lable:'4个自然月',
                    value:'4'
                },
                {
                    lable:'5个自然月',
                    value:'5'
                },
                {
                    lable:'6个自然月',
                    value:'6'
                },
                {
                    lable:'7个自然月',
                    value:'7'
                },
            ],
            dayOptions: [
                {
                    value:'2',
                    lable:'2交易日',
                },
                {
                    lable:'2交易日',
                    value:'3'
                },
                {
                    lable:'4交易日',
                    value:'4'
                },
                {
                    lable:'5交易日',
                    value:'5'
                },
                {
                    lable:'6交易日',
                    value:'6'
                },
                {
                    lable:'7交易日',
                    value:'7'
                },
                {
                    lable:'8交易日',
                    value:'8'
                },
                {
                    lable:'9交易日',
                    value:'9'
                },
                {
                    lable:'9交易日',
                    value:'9交易日'
                },
                {
                    lable:'10交易日',
                    value:'10交易日'
                },
                {
                    lable:'11交易日',
                    value:'11交易日'
                },
                {
                    lable:'12交易日',
                    value:'12交易日'
                },
                {
                    lable:'13交易日',
                    value:'13交易日'
                },
                {
                    lable:'14交易日',
                    value:'14交易日'
                },
            ],
            mFee:0,
            gFee:0,
            pFee:0,
            aFee:0,
            pmFee:0,
            transaction: [
                {
                    name:'下个交易日',
                    value:'2'
                }
            ],
            totalAmount:0,
            principal:'',
            term:'',
            days:''
        }
    },
    filters: {
        number(value) {
        var toFixedNum = Number(value).toFixed(2);
        return toFixedNum;
        }
    },
    mounted(){
        this.pzSel = this.programData
        this.termDatas = this.termData
        this.pzType = this.stockType
        this.activeData = this.programData[0]
        this.getTime()
    },
    methods: {
        pzActive (i,item) {
            this.active = i 
            this.activeData = item
        },
        timeActive(i) {
            this.tActive = i
        },
        initPrincipal (max,min,share,p) {
            if(p >min && p < max) {
                const num = Math.floor(p/share)
                // console.log(1)
                // this.principal  = num * share
            }
            else
            if(p > max) {
                console.log(2)
                    this.principal  = max
            }else {
                console.log(3)
                // this.principal  = min
            }
        },
        inputFun(e){
            const d = this.activeData //选择的杠杆
            const p = e.target.value.replace(/[^0-9]/g,'') //输入的本金
            const b = d.interestRate ? d.interestRate : 0//利率
            const n =  d.num ? d.num : 0 //倍数
            const t =  d.num ? d.num : 0 //期限
            this.interestfee  = (p*t).toFixed(2)
            this.mFee = (p *b * n /100) .toFixed(2)
            this.pmFee = (p *b * n * t/100) .toFixed(2)
            this.initPrincipal(this.termDatas.max,this.termDatas.min,this.termDatas.share,p)
            // this.managementFee(b)
            // this.marginFee()
            // this.principalFee()
            // this.accountFee()
            this.pzSel.map(i=> {
                return i.total = this.principal * i.num
            })
        },
        confrimPay() {
            if( this.principal<100 ) return this.$message.error('请输入本金');
        },
        getTime() {
            let myDate = new Date()
            let currentTime = myDate.getHours()
            const nextDayTime = [{
                name:'下个交易日',
                value:'2'
            }]
            const todayTime = [
                {
                    name:'立即生效',
                    value:'1'
                },
                {
                    name:'下个交易日',
                    value:'2'
                }
            ]
            this.transaction =  currentTime > 14 ? nextDayTime:todayTime
        },
        //管理费
        managementFee (){
            console.log(1)
        },
        //保证金
        marginFee () {

        },
        //本金
        principalFee () {

        },
        //账户管理费
        accountFee () {

        }
    },
    computed: {
        ...mapGetters(['getSettingFree']),
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