<template>
    <div class="wrapper-content">
        <Stock/>
        <Advantage/>
        <Program 
            :programData="programData" 
            :stockType ="stockType"
            :termData ="vipData"
        />
    </div>
</template>

<script>
import Stock from '@/components/stock/Stock'
import Advantage from '@/components/stock/StockAdvantage'
import Program from '@/components/stock/StockProgram'
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'vipFinancing',
    components:{ Stock ,Advantage,Program},
    data(){
        return{
            stockType: 'vip',
            programData: [
                {
                    num:10,
                    interestRate:0.5,
                    total: 0,
                    active: true
                },
                    {
                    num:11,
                    interestRate:0.5,
                    total: 0,
                },
                {
                    num:12,
                    interestRate:0.5,
                    total: 0,
                }
            ],
            // vipData: {
            //     stepOne : '10万-500万',
            //     stepTwo: '选择杠杆，资金放大10倍',
            //     remarkOne: '不小于10万，不大于500万，且为1000的整数倍',
            //     remark: ' 按月收取利息费',
            //     placeholder:'最少10万元，最多5000万元',
            //     interestNum :' 按月收取利息费',
            //     max: 10000000,
            //     min: 100,
            //     share: 1000,
            // },
        }
    },
    computed: {
        ...mapGetters(['getSettingVip']),
        vipData() {
            return {
                stepOne : `${this.getSettingVip.vip_min_money} - ${this.getSettingVip.vip_max_money}`,
                stepTwo: '选择杠杆，资金放大10倍',
                remarkOne: `不小于${this.getSettingVip.vip_min_money}，不大于${this.getSettingVip.vip_max_money}，且为${this.getSettingVip.vip_divisor_num}的整数倍`,
                remark: ' 按月收取利息费',
                placeholder:`最少${this.getSettingVip.vip_min_money}元，最多${this.getSettingVip.vip_max_money}元`,
                interestNum :' 按月收取利息费',
                max: 10000000,
                min: 100,
                share: 1000,
            }
        },
    }
}
</script>

