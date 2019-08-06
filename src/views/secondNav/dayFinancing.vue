<template>
    <div class="wrapper-content">
        <Stock v-show="!showEnter"/>
        <Advantage v-show="!showEnter"/>
        <Program 
        v-show="!showEnter"
        :programData="programData" 
        :stockType ="stockType"
        :termData ="dayData"
        />
        <Enter v-show="showEnter" :pzSureData ="pzSureData" :pzObj="pzObj" :titleName="titleName"/>
    </div>
</template>
<script>
import Stock from '@/components/stock/Stock'
import Advantage from '@/components/stock/StockAdvantage'
import Program from '@/components/stock/StockProgram'
import { mapGetters, mapActions } from "vuex";
import Enter from '@/components/stock/stockEnter'
import { programDay } from '@/config'

export default {
    name: 'dayFinancing',
    components: { Stock ,Advantage,Program,Enter},
    data(){
        return{
            stockType: {
                lable: 'day',
                value: '2'
            },
            programData: programDay,
            showEnter: false,
            pzSureData:{

            },
            pzObj:{
                
            },
            titleName: '按天配资'
        }
    },
    computed: {
        ...mapGetters(['getSettingDays']),
        dayData() {
            return {
                warning_line: `${this.getSettingDays.days_warning_line}`,//警告线
                close_line: `${this.getSettingDays.days_close_line}`,//平仓线
                stepOne :`${this.getSettingDays.days_min_money} - ${this.getSettingDays.days_max_money}`,//选择获得资金
                max:`${this.getSettingDays.days_max_money}`,//限制最大金额
                min:`${this.getSettingDays.days_min_money}`,//限制最小金额
                divisor: `${this.getSettingDays.days_divisor_num}`,//限制整数倍
                period:{//交易日
                    min: `${this.getSettingDays.days_range.min}`,
                    max: `${this.getSettingDays.days_range.max}`
                },
                stepTwo: '选择杠杆，资金放大2-10倍',
                remarkOne: `不小于${this.getSettingDays.days_min_money}，不大于${this.getSettingDays.days_max_money}，且为${this.getSettingDays.days_divisor_num}的整数倍`,
                remark: '按交易日收取管理费',
                placeholder:`最少${this.getSettingDays.days_min_money}元，最多${this.getSettingDays.days_max_money}元`,
                interestNum : 0,
            }
        },
    }
}
</script>

