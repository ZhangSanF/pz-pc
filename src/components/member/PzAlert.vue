<template>
    <div>
        <div class="title" v-if="postData.modifyType == 1">扩大配资</div>
        <div class="title" v-if="postData.modifyType == 2">申请延期</div>
        <div class="title" v-if="postData.modifyType == 3">提取收益</div>
        <div class="title" v-if="postData.modifyType == 4">追加保证金</div>
        <div class="title" v-if="postData.modifyType == 5">终止操盘</div>
        <div class="content">
            <div class="frame-page-wrapper">
                <div class="jump_word" v-if="postData.modifyType == 1">
                    1. 扩大配资产生的利息费，需要一次性付清。<br>
                    2. 按月配资按剩余操盘时间占总操盘时间的百分比计算
                </div>
                <div class="jump_problem" v-if="postData.modifyType == 2">
                    续期根据当前平台设置的利率重新算，收取费用的公式和申请配资一样
                </div>
                <div class="box_prompt" v-if="postData.modifyType == 3">
                    配资用户的可用资金大于总操盘资金，且只能提取盈利部分，提取盈利最少为100元，<br>
                    以10元单位为递增，即可申请提取盈利。
                </div>
                <div class="box_prompt" v-if="postData.modifyType == 4">
                    每次追加保证金不能小于当前方案总操盘资金的1%，注：追加保证金没有放大资金的效果。如需放大资金，请申请扩大配资。
                </div>
                <div class="jump_problem" v-if="postData.modifyType == 5">
                    您确定要申请终止操盘吗？
                </div>
                <div class="box_word" style="padding:0" v-if="postData.modifyType == 1">
                    当前账户余额：<span class="font_red14">{{getUserInfo.available_money | number}}</span>元<br>
                    追加金额：<input type="text" class="input_jump" v-model="pushMoney" @keyup.native="moneyKeyUp" @blur="moneyBlur">&nbsp;元<br>
                    手续费：<span class="font_red14 j-fee">{{comPushMoney | number}}元</span>
                </div>
                <div class="box_word_duan" v-if="postData.modifyType == 2">
                    <span>续期时间：</span>
                    <select name="duration" style="width:100px" v-model="extension">
                        <option :value="item.value" v-for="(item, index) in periodData" :key="index">{{item.lable}}</option>
                    </select>
                </div>
                <div class="end-style" v-if="postData.modifyType == 2 && getInterestMoney.interest_money*1 > 0">
                    您已到期 {{getInterestMoney.days}} {{computedData.order_type == 1 || computedData.order_type == 2 ? '个交易日' : '天'}}
                </div>
                <div class="box_word" v-if="postData.modifyType == 3">
                    提取金额：<input type="text" class="input_jump" v-model="extract">&nbsp;元
                </div>
                <div class="box_word" v-if="postData.modifyType == 4">
                    当前账户余额：<span class="font_red14">{{getUserInfo.available_money | number}}</span>元<br>
                    追加金额：<input type="text" class="input_jump" v-model="addMoney">&nbsp;元<br>
                </div>
                <div class="jump_word" v-if="postData.modifyType == 5">
                    1. 按天按月配资，不返回系统已经扣除的管理费及其他费用。<br>
                    2. 请确保您的交易账户已经卖出。<br>
                    3. 免息配资方案我们不会扣除任何费用。
                </div>
                <div class="end-style" v-if="postData.modifyType == 5 && getInterestMoney.interest_money*1 > 0">
                    您已到期 {{getInterestMoney.days}} {{computedData.order_type == 1 || computedData.order_type == 2 ? '个交易日' : '天'}}，
                    需支付利息&nbsp;&nbsp;{{getInterestMoney.interest_money | number}}&nbsp;&nbsp;元。
                </div>
                <div class="box_menu">
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 1 && canAction" @click="pushAction(postData)">确认扩大</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 1 && !canAction">确认扩大</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 1" @click="closeAlert">取消扩大</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 2 && canAction" @click="postponeAction(postData)">确认续期</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 2 && !canAction">确认续期</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 2" @click="closeAlert">取消续期</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 3 && canAction" @click="extractAction(postData)">确认提取</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 3 && !canAction">确认提取</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 3" @click="closeAlert">取消提取</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 4 && canAction" @click="addAction(postData)">确认追加</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 4 && !canAction">确认追加</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 4" @click="closeAlert">取消追加</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 5 && canAction" @click="endAction(postData)">确认终止</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 5 && !canAction">确认终止</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 5" @click="closeAlert">取消终止</a>
                </div>
            </div>
        </div>
        <div class="setwin" @click="closeAlert">
            <a href="javascript:void(0);"></a>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    /**
     * modifyType 1  扩大配资
     * modifyType 2  申请延期
     * modifyType 3  提取收益
     * modifyType 4  追加保证金
     * modifyType 5  终止操盘
     */
    props:['postData', 'computedData'],
    data() {
        return {
            canAction: true,
            pushMoney: '',//追加金额
            extension: '',//申请延期
            extract: '',//提取收益
            addMoney: '',//追加保证金
        }
    },
    filters: {
        number(value) {
            var toFixedNum = Number(value).toFixed(2);
            return toFixedNum;
        }
    },
    methods: {
        ...mapActions(['getModifyorderr']),
        closeAlert() {
            this.$emit('listenCloseAlert', false)
        },
        moneyKeyUp(e) { //金额强制转浮点型 排除0 .
            if(e && (e.keyCode === 190 || e.keyCode === 48)){return;}
        },
        moneyBlur(e) {
            this.pushMoney = parseFloat(parseFloat(this.pushMoney).toFixed(2)) || '';
        },
        // 扩大配资
        pushAction(data) {
            if(this.pushMoney == '') return this.$message.error(`请输入金额`)
            if(!this.canAction) return false
            this.canAction = false
            this.getModifyorderr(Object.assign({expandMoney: this.pushMoney}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                    this.canAction = true
                }else {
                    this.canAction = true
                }
            })
        },
        // 申请延期
        postponeAction(data) {        
            if(this.extension == '') return this.$message.error(`请输入续期时间`)
            if(!this.canAction) return false
            this.canAction = false
            this.getModifyorderr(Object.assign({extension: this.extension}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                    this.canAction = true
                }else {
                    this.canAction = true
                }
            })
        },
        // 提取收益
        extractAction(data) {
            //提取收益必须在当天的9点之前和15点之后
            let timer = new Date().getHours()
            console.log(timer)
            if(timer < 15 && timer > 9) return this.$message.error(`请在9点之前和15点之后提取收益`)
            if(this.extract == '') return this.$message.error(`请输入金额`)
            if(this.extract*1 < 100) return this.$message.error(`金额不小于100`)
            if(!this.canAction) return false
            this.canAction = false
            this.getModifyorderr(Object.assign({extractMoney: this.extract}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                    this.canAction = true
                }else {
                    this.canAction = true
                }
            })
        },
        // 追加保证金
        addAction(data) {
            if(this.addMoney == '') return this.$message.error(`请输入金额`)
            if(!this.canAction) return false
            this.canAction = false           
            this.getModifyorderr(Object.assign({appendMoney: this.addMoney}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                    this.canAction = true
                }else {
                    this.canAction = true
                }
            })
        },
        // 终止操盘
        endAction(data) {
            if(!this.canAction) return false
            this.canAction = false
            this.getModifyorderr(Object.assign({end: 'end'}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                    this.canAction = true
                }else {
                    this.canAction = true
                }
            })
        },
        // 申请延期续期时间方法
        timeFun(min, max, order_type) {
            let day = '天'
            let monthV = '月'
            let arr = []
            for(let i = min; i <= max; i++) {
                // 交易类型是按天
                if(order_type == 2) {
                    arr.push({
                        value: Number(i),
                        lable: i + day
                    })
                }else {//交易类型按月，vip
                    arr.push({
                        value: Number(i),
                        lable: i + monthV
                    })
                }
            }
            return arr
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters([
            'getUserInfo', 
            'getSettingFree', 
            'getSettingDays', 
            'getSettingMonths', 
            'getSettingVip', 
            'getLoansrate',
            'getPeriodNumber',
            'getInterestMoney'
        ]),
        // 计算扩大配资管理费(本金*杠杆倍数*利率*周期)
        comPushMoney() {
            if(isNaN(this.pushMoney) || this.pushMoney == '') return 0
            let rate = 0
            let arr = []
            switch(this.computedData.order_type) {
                case 1 : arr = this.getLoansrate.free; break;
                case 2 : arr = this.getLoansrate.day; break;
                case 3 : arr = this.getLoansrate.month; break;
                case 4 : arr = this.getLoansrate.vip; break;
            }
            for(let item of arr) {
                if(item.multiple == this.computedData.multiple) {
                    // 利率
                    rate = item.rate / 100
                }
            }
            // console.log('this.pushMoney',this.pushMoney)
            // console.log('this.computedData.multiple',this.computedData.multiple)
            // console.log('rate',rate)
            // console.log('this.getPeriodNumber',this.getPeriodNumber)
            return this.pushMoney * this.computedData.multiple * rate * this.getPeriodNumber.period
        },
        // 计算续期时间
        periodData() {
            if(this.computedData.order_type == 2) {
                return this.timeFun(this.getSettingDays.time_range.min, this.getSettingDays.time_range.max, 2)
            }else if(this.computedData.order_type == 3) {
                return this.timeFun(this.getSettingMonths.time_range.min, this.getSettingMonths.time_range.max, 3)
            }else if(this.computedData.order_type == 4) {
                return this.timeFun(this.getSettingVip.time_range.min, this.getSettingVip.time_range.max, 4)
            }
        },
        // minMoney() {
        //     switch(this.computedData.order_type) {
        //         case 1 : return this.getSettingFree.money_range.min; break;
        //         case 2 : return this.getSettingDays.money_range.min; break;
        //         case 3 : return this.getSettingMonths.money_range.min; break;
        //         case 4 : return this.getSettingVip.money_range.min; break;
        //     }
        // },
        // maxMoney() {
        //     switch(this.computedData.order_type) {
        //         case 1 : return this.getSettingFree.money_range.max; break;
        //         case 2 : return this.getSettingDays.money_range.max; break;
        //         case 3 : return this.getSettingMonths.money_range.max; break;
        //         case 4 : return this.getSettingVip.money_range.max; break;
        //     }
        // }
    },
    watch: {
        
    }
}
</script>

<style lang="scss" scoped>
.end-style{
    text-align: center;color: red;
}
.title{
    padding: 0 80px 0 10px;height: 35px;line-height: 35px;border-bottom: 1px solid #D5D5D5;font-size: 14px;color: #333;
    overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background-color: #EAEAEA;
}
.content{
    height: 314px;background: #FFF; color: #666;
    .frame-page-wrapper{
        min-width: 600px;padding: 30px;
        .jump_word{
            color: #f60;font-size: 14px;line-height: 24px;margin: 20px 30px 0 45px;padding-bottom: 10px;text-align: left;
        }
        .jump_problem{
            color: #333;font-size: 16px;line-height: 25px;margin: 10px auto auto 10px;padding-left: 35px; text-align: left;
        }
        .box_prompt{
            background: #fffcef;border: 1px solid #ffbb76;color: #e6760c;font-size: 14px;line-height: 24px;padding: 8px 10px 8px 50px;text-align: left;
        }
        .box_word{
            font-size: 14px;line-height: 40px;padding-top: 10px;text-align: center;
            .input_jump {
                border: medium none;height: 28px;line-height: 28px;    outline: none;
                padding-left: 5px;width: 132px;border: 1px solid #ddd;
            }
        }
        .box_word_duan{
            margin: 25px 0;text-align: center;
            span{
                font-size: 15px;
            }
        }
        .box_menu{
            margin-top: 20px;text-align: center; 
            a{
                margin: 0 5px;font-size: 14px; height: 30px;width: 92px;display: inline-block;line-height: 30px;
            }
            .menu_jump_blue{
                background: url(../../assets/image/menu_white.png) repeat scroll -92px 0;color: #fff;               
            }
            .menu_jump_gary{
                background: url(../../assets/image/menu_white.png) repeat scroll -184px 0;color: #555;
            }
        }
    }
}
.setwin{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 0;
    line-height: initial;
    a{
        background: url(../../assets/image/icon.png) no-repeat -5px -55px; width: 14px;display: inline-block;height: 14px;
    }
}
</style>

