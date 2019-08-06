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
import { programFree } from '@/config'

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
            programData: programFree,
            pzSureData:{

            },
            pzObj:{

            },
            titleName: '免息配资'
        }
    },
    computed: {
        ...mapGetters(['getSettingFree']),
        freeData() {
            return {
                divided: `${this.getSettingFree.free_divided}`,//用户可收收益 盈利
                warning_line: `${this.getSettingFree.free_warning_line}`,//警告线
                close_line: `${this.getSettingFree.free_close_line}`,//平仓线
                stepOne : `${this.getSettingFree.free_min_money} - ${this.getSettingFree.free_max_money}`,//选择获得资金
                max:`${this.getSettingFree.free_max_money}`,//限制最大金额
                min:`${this.getSettingFree.free_min_money}`,//限制最小金额
                divisor: `${this.getSettingFree.free_divisor_num}`,//限制整数倍
                period:{//交易日
                    min: `${this.getSettingFree.free_range.min}`,
                    max: `${this.getSettingFree.free_range.max}`
                },
                stepTwo: '固定5倍杠杆',
                remarkOne: `不小于${this.getSettingFree.free_min_money}，不大于${this.getSettingFree.free_max_money}，且为${this.getSettingFree.free_divisor_num}的整数倍`,
                placeholder:`最少${this.getSettingFree.free_min_money}元，最多${this.getSettingFree.free_max_money}元`,
                interestNum :'不收取任何利息'
            }
        }
    }
}
</script>