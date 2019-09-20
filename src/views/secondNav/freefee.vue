<template>
    <div class="wrapper-content">
        <Stock v-show="!showEnter"/>
        <Advantage v-show="!showEnter" />
        <Program 
            v-show="!showEnter"
            :programData="programData" 
            :stockType ="stockType"
            :termData ="freeData"
        />
        <Enter v-show="showEnter" :pzSureData ="pzSureData" :pzObj="pzObj" :titleName="titleName"/>
    </div>
</template>
<script>
import Stock from '@/components/stock/Stock'
import Advantage from '@/components/stock/StockAdvantage'
import Program from '@/components/stock/StockProgram'
import Enter from '@/components/stock/stockEnter'
import { mapGetters, mapActions } from "vuex"

export default {
    name: 'freefee',
    components:{ Stock ,Advantage,Program,Enter},
    data(){
        return{
            stockType: {
                lable: 'free',
                value: '1'
            },
            showEnter: false,
            pzSureData:{

            },
            pzObj:{

            },
            titleName: '免息配资'
        }
    },
    created() {

    },
    computed: {
        ...mapGetters(['getSettingFree', 'getLoansrate']),
        freeData() {
            let obj = {}
            if(this.getSettingFree != null) {
                if(Object.keys(this.getSettingFree).length !== 0) {
                    obj = {
                        divided: `${this.getSettingFree.divided}`,//用户可收收益 盈利
                        stepOne : `${this.getSettingFree.money_range.min} - ${this.getSettingFree.money_range.max}`,//选择获得资金
                        max:`${this.getSettingFree.money_range.max}`,//限制最大金额
                        min:`${this.getSettingFree.money_range.min}`,//限制最小金额
                        divisor: `${this.getSettingFree.money_divisor}`,//限制整数倍
                        period:{//交易日
                            min: `${this.getSettingFree.time_range.min}`,
                            max: `${this.getSettingFree.time_range.max}`
                        },
                        stepTwo: '固定5倍杠杆',
                        remarkOne: `不小于${this.getSettingFree.money_range.min}，不大于${this.getSettingFree.money_range.max}，且为${this.getSettingFree.money_divisor}的整数倍`,
                        placeholder:`最少${this.getSettingFree.money_range.min}元，最多${this.getSettingFree.money_range.max}元`,
                        interestNum :'不收取任何利息'
                    }
                    return obj
                }
            }                    
        },
        programData() {
            return this.getLoansrate.free
        }
    },
    watch: {

    }
}
</script>