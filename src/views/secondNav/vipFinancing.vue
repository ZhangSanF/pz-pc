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
import { programVip } from '@/config'

export default {
    name: 'vipFinancing',
    components:{ Stock ,Advantage,Program ,Enter},
    data(){
        return{
            stockType: {
                lable: 'vip',
                value: '4'
            },
            programData: programVip,
            showEnter: false,
            pzSureData:{

            },
            pzObj:{
                
            },
            titleName: 'VIP配资'
        }
    },
    computed: {
        ...mapGetters(['getSettingVip']),
        vipData() {
            return {
                warning_line: `${this.getSettingVip.vip_warning_line}`,//警告线
                close_line: `${this.getSettingVip.vip_close_line}`,//平仓线
                stepOne : `${this.getSettingVip.vip_min_money} - ${this.getSettingVip.vip_max_money}`,//选择获得资金
                max:`${this.getSettingVip.vip_max_money}`,//限制最大金额
                min:`${this.getSettingVip.vip_min_money}`,//限制最小金额
                divisor: `${this.getSettingVip.vip_divisor_num}`,//限制整数倍
                period:{//交易日
                    min: `${this.getSettingVip.vip_range.min}`,
                    max: `${this.getSettingVip.vip_range.max}`
                },
                stepTwo: '选择杠杆，资金放大10倍',
                remarkOne: `不小于${this.getSettingVip.vip_min_money}，不大于${this.getSettingVip.vip_max_money}，且为${this.getSettingVip.vip_divisor_num}的整数倍`,
                remark: ' 按月收取利息费',
                placeholder:`最少${this.getSettingVip.vip_min_money}元，最多${this.getSettingVip.vip_max_money}元`,
                interestNum :' 按月收取利息费',
            }
        },
    }
}
</script>

