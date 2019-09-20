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

export default {
    name: 'dayFinancing',
    components: { Stock ,Advantage,Program,Enter},
    data(){
        return{
            stockType: {
                lable: 'day',
                value: '2'
            },
            showEnter: false,
            pzSureData:{

            },
            pzObj:{
                
            },
            titleName: '按天配资'
        }
    },
    computed: {
        ...mapGetters(['getSettingDays', 'getLoansrate']),
        dayData() {
            let obj = {}
            if(this.getSettingDays != null) {
                if(Object.keys(this.getSettingDays).length !== 0) {
                    obj = {
                        stepOne :`${this.getSettingDays.money_range.min} - ${this.getSettingDays.money_range.max}`,//选择获得资金
                        max:`${this.getSettingDays.money_range.max}`,//限制最大金额
                        min:`${this.getSettingDays.money_range.min}`,//限制最小金额
                        divisor: `${this.getSettingDays.money_divisor}`,//限制整数倍
                        period:{//交易日
                            min: `${this.getSettingDays.time_range.min}`,
                            max: `${this.getSettingDays.time_range.max}`
                        },
                        stepTwo: '选择杠杆，资金放大2-10倍',
                        remarkOne: `不小于${this.getSettingDays.money_range.min}，不大于${this.getSettingDays.money_range.max}，且为${this.getSettingDays.money_divisor}的整数倍`,
                        remark: '按交易日收取管理费',
                        placeholder:`最少${this.getSettingDays.money_range.min}元，最多${this.getSettingDays.money_range.max}元`,
                        interestNum : 0,
                    }
                    return obj
                }
            }
        },
        programData() {
            // console.log(this.getLoansrate.day)           
            return this.getLoansrate.day
        }
    },
}
</script>

