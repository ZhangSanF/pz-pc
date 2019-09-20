<template>
    <div class="wrapper-content">
        <Stock v-show="!showEnter"/>
        <Advantage v-show="!showEnter"/>
        <Program 
            v-show="!showEnter"
            :programData="programData" 
            :stockType ="stockType"
            :termData ="vipData"
        />
        <Enter v-show="showEnter" :pzSureData ="pzSureData" :pzObj="pzObj" :titleName="titleName"/>
    </div>
</template>

<script>
import Stock from '@/components/stock/Stock'
import Advantage from '@/components/stock/StockAdvantage'
import Program from '@/components/stock/StockProgram'
import { mapGetters, mapActions } from "vuex"
import Enter from '@/components/stock/stockEnter'

export default {
    name: 'vipFinancing',
    components:{ Stock ,Advantage,Program ,Enter},
    data(){
        return{
            stockType: {
                lable: 'vip',
                value: '4'
            },
            showEnter: false,
            pzSureData:{

            },
            pzObj:{
                
            },
            titleName: 'VIP配资'
        }
    },
    computed: {
        ...mapGetters(['getSettingVip', 'getLoansrate']),
        vipData() {
            let obj = {}
            if(this.getSettingVip != null) {
                if(Object.keys(this.getSettingVip).length !== 0) {
                    obj = {
                        stepOne : `${this.getSettingVip.money_range.min} - ${this.getSettingVip.money_range.max}`,//选择获得资金
                        max:`${this.getSettingVip.money_range.max}`,//限制最大金额
                        min:`${this.getSettingVip.money_range.min}`,//限制最小金额
                        divisor: `${this.getSettingVip.money_divisor}`,//限制整数倍
                        period:{//交易日
                            min: `${this.getSettingVip.time_range.min}`,
                            max: `${this.getSettingVip.time_range.max}`
                        },
                        stepTwo: '选择杠杆，资金放大10倍',
                        remarkOne: `不小于${this.getSettingVip.money_range.min}，不大于${this.getSettingVip.money_range.max}，且为${this.getSettingVip.money_divisor}的整数倍`,
                        remark: ' 按月收取利息费',
                        placeholder:`最少${this.getSettingVip.money_range.min}元，最多${this.getSettingVip.money_range.max}元`,
                        interestNum :' 按月收取利息费',
                    }
                    return obj
                }
            }
        },
        programData() {
            return this.getLoansrate.vip
        }
    }
}
</script>

