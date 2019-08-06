<template>
    <div class="wrapper-content">
        <Stock v-show="!showEnter"/>
        <Advantage v-show="!showEnter"/>
        <Program 
            v-show="!showEnter"
            :programData="programData" 
            :stockType ="stockType"
            :termData ="monthData"
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
import { programMonth } from '@/config'

export default {
    name: 'monthFinancing',
    components:{ Stock ,Advantage,Program,Enter},
    data(){
        return{
            stockType: {
                lable: 'month',
                value: '3'
            },
            programData: programMonth,
            showEnter: false,
            pzSureData:{

            },
            pzObj:{
                
            },
            titleName: '按月配资'
        }
    },
    computed: {
        ...mapGetters(['getSettingMonths']),
        monthData() {
            return {
                warning_line: `${this.getSettingMonths.months_warning_line}`,//警告线
                close_line: `${this.getSettingMonths.months_close_line}`,//平仓线
                stepOne : `${this.getSettingMonths.months_min_money} - ${this.getSettingMonths.months_max_money}`,//选择获得资金
                max:`${this.getSettingMonths.months_max_money}`,//限制最大金额
                min:`${this.getSettingMonths.months_min_money}`,//限制最小金额
                divisor: `${this.getSettingMonths.months_divisor_num}`,//限制整数倍
                period:{//交易日
                    min: `${this.getSettingMonths.months_range.min}`,
                    max: `${this.getSettingMonths.months_range.max}`
                },
                stepTwo: '选择杠杆，资金放大2-10倍',
                remarkOne: `不小于${this.getSettingMonths.months_min_money}，不大于${this.getSettingMonths.months_max_money}，且为${this.getSettingMonths.months_divisor_num}的整数倍`,
                remark: '按月收取管理费',
                placeholder: `最少${this.getSettingMonths.months_min_money}元，最多${this.getSettingMonths.months_max_money}元`,
                interestNum : 0
            } 
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

