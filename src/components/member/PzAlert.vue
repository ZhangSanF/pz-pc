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
                    2. 按月配资以30天为一个月计算，不满一个月的部分，按照占 30天的百分比计算。
                </div>
                <div class="jump_problem" v-if="postData.modifyType == 2">
                    续期要先把之前欠的利息先还上（信用至上），再根据当前平台设置的利率重新算，收取费用的公式和申请配资一样 
                </div>
                <div class="box_prompt" v-if="postData.modifyType == 3">
                    配资用户的可用资金大于总操盘资金，且只能提取盈利部分，提取盈利最少为100元，<br>
                    以10元单位为递增，即可申请提取盈利。
                </div>
                <div class="box_prompt" v-if="postData.modifyType == 4">
                    每次追加保证金不能小于当前方案总操盘资金的1%，注：追加保证金没有放大资金的效果。<br>
                    如需放大资金，请申请扩大配资。
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
                <div class="box_word" v-if="postData.modifyType == 3">
                    提取金额：<input type="text" class="input_jump" v-model="extract">&nbsp;元
                </div>
                <div class="box_word" v-if="postData.modifyType == 4">
                    当前账户余额：<span class="font_red14">{{getUserInfo.available_money | number}}</span>元<br>
                    追加金额：<input type="text" class="input_jump" v-model="addMoney">&nbsp;元<br>
                </div>
                <div class="jump_word" v-if="postData.modifyType == 5">
                    1. 按天按月配资，不返回系统已经扣除的管理费及其他费用。<br>
                    2. 请确保您的交易账户已经卖出，否则我们有权把您持有进行强制处理（不保证平仓价）。<br>
                    3. 免息配资方案我们不会扣除任何费用。
                </div>
                <div class="box_menu">
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 1" @click="pushAction(postData)">确认扩大</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 1" @click="closeAlert">取消扩大</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 2" @click="postponeAction(postData)">确认续期</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 2" @click="closeAlert">取消续期</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 3" @click="extractAction(postData)">确认提取</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 3" @click="closeAlert">取消提取</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 4" @click="addAction(postData)">确认追加</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="postData.modifyType == 4" @click="closeAlert">取消追加</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="postData.modifyType == 5" @click="endAction(postData)">确认终止</a>
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
import { mapGetters, mapActions } from "vuex";
import { returnRate } from '@/config'

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
            pushMoney: '',//追加金额
            extension: '',//申请延期
            extract: '',//提取收益
            addMoney: '',//追加保证金
            renewalTimeMax: ''//续期时间最大值
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
            if(this.pushMoney == '') return this.$message.error(`请输入金额`);
            if(this.pushMoney < 100 || this.pushMoney > 1000000) return this.$message.error(`金额不小于100且不大于1000000`);
            this.getModifyorderr(Object.assign({expandMoney: this.pushMoney}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                }else {
                    this.closeAlert()
                    this.$alert(
                        `${res.message}`,
                        {
                            type: 'error'
                        }
                    )
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
        },
        // 申请延期
        postponeAction(data) {        
            if(this.extension == '') return this.$message.error(`请输入续期时间`);
            if((this.extension-0) + (this.computedData.period-0) > this.renewalTimeMax) return this.$message.error(`续期时间不能超过最大值`);
            this.getModifyorderr(Object.assign({extension: this.extension}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                }else {
                    this.closeAlert()
                    this.$alert(
                        `${res.message}`,
                        {
                            type: 'error'
                        }
                    )
                }
            })
        },
        // 提取收益
        extractAction(data) {
            //提取收益必须在当天的9点之前和15点之后
            if(new Date().getHours() < 15 || new Date().getHours() > 9) return this.$message.error(`请在9点之前和15点之后提取收益`);
            if(this.extract == '') return this.$message.error(`请输入金额`);
            if(this.extract < 100) return this.$message.error(`金额不小于100`);
            this.getModifyorderr(Object.assign({extractMoney: this.extract}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                }else {
                    this.closeAlert()
                    this.$alert(
                        `${res.message}`,
                        {
                            type: 'error'
                        }
                    )
                }
            })
        },
        // 追加保证金
        addAction(data) {
            if(this.addMoney == '') return this.$message.error(`请输入金额`);
            this.getModifyorderr(Object.assign({appendMoney: this.addMoney}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                }else {
                    this.closeAlert()
                    this.$alert(
                        `${res.message}`,
                        {
                            type: 'error'
                        }
                    )
                }
            })
        },
        // 终止操盘
        endAction(data) {
            //终止操盘必须在当天的9点之前和15点之后
            if(new Date().getHours() < 15 || new Date().getHours() > 9) return this.$message.error(`请在9点之前和15点之后终止操盘`);
            this.getModifyorderr(Object.assign({end: 'end'}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$message.success(res.message)
                }else {
                    this.closeAlert()
                    this.$alert(
                        `${res.message}`,
                        {
                            type: 'error'
                        }
                    )
                }
            })
        },
    },
    mounted() {

    },
    computed: {
        ...mapGetters(['getUserInfo', 'getSettingFree', 'getSettingDays', 'getSettingMonths', 'getSettingVip']),
        // 计算扩大配资管理费(本金*杠杆倍数*利率*周期)
        comPushMoney() {
            if(isNaN(this.pushMoney) || this.pushMoney == '') return 0
            //利率
            let rate = returnRate(this.computedData.order_type, this.computedData.multiple)
            return (this.pushMoney * this.computedData.multiple * (rate*1000) * this.computedData.period)/1000
        },
        // 计算续期时间
        periodData() {
            if(this.computedData.order_type == 2) {
                this.renewalTimeMax = this.getSettingDays.days_range.max
                return this.timeFun(this.getSettingDays.days_range.min, this.getSettingDays.days_range.max, 2)
            }else if(this.computedData.order_type == 3) {
                this.renewalTimeMax = this.getSettingMonths.months_range.max
                return this.timeFun(this.getSettingMonths.months_range.min, this.getSettingMonths.months_range.max, 3)
            }else if(this.computedData.order_type == 4) {
                this.renewalTimeMax = this.getSettingVip.vip_range.max
                return this.timeFun(this.getSettingVip.vip_range.min, this.getSettingVip.vip_range.max, 4)
            }
        },
    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>
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
            margin: 37px 0;text-align: center;
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

