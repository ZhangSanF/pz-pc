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

export default {
    name: 'monthFinancing',
    components:{ Stock ,Advantage,Program,Enter},
    data(){
        return{
            stockType: {
                lable: 'month',
                value: '3'
            },
            showEnter: false,
            pzSureData:{

            },
            pzObj:{
                
            },
            titleName: '按月配资'
        }
    },
    computed: {
        ...mapGetters(['getSettingMonths', 'getLoansrate']),
        monthData() {
            let obj = {}
            if(this.getSettingMonths != null) {
                if(Object.keys(this.getSettingMonths).length !== 0) {
                    obj = {
                        stepOne : `${this.getSettingMonths.money_range.min} - ${this.getSettingMonths.money_range.max}`,//选择获得资金
                        max:`${this.getSettingMonths.money_range.max}`,//限制最大金额
                        min:`${this.getSettingMonths.money_range.min}`,//限制最小金额
                        divisor: `${this.getSettingMonths.money_divisor}`,//限制整数倍
                        period:{//交易日
                            min: `${this.getSettingMonths.time_range.min}`,
                            max: `${this.getSettingMonths.time_range.max}`
                        },
                        stepTwo: '选择杠杆，资金放大2-10倍',
                        remarkOne: `不小于${this.getSettingMonths.money_range.min}，不大于${this.getSettingMonths.money_range.max}，且为${this.getSettingMonths.money_divisor}的整数倍`,
                        remark: '按月收取管理费',
                        placeholder: `最少${this.getSettingMonths.money_range.min}元，最多${this.getSettingMonths.money_range.max}元`,
                        interestNum : 0
                    }
                    return obj
                }
            }  
        },
        programData() {
            return this.getLoansrate.month
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

