<template>
    <div class="wrapper-content">
        <Stock/>
        <Advantage/>
        <Program 
            :programData="programData" 
            :stockType ="stockType"
            :termData ="monthData"
        />
    </div>
</template>

<script>
import Stock from '@/components/stock/Stock'
import Advantage from '@/components/stock/StockAdvantage'
import Program from '@/components/stock/StockProgram'
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'monthFinancing',
    components:{ Stock ,Advantage,Program},
    data(){
        return{
            stockType: 'month',
            // monthData: {
            //     stepOne : '1百-5000万',
            //     stepTwo: '选择杠杆，资金放大2-10倍',
            //     remarkOne: '不小于1百，不大于5000万，且为100的整数倍',
            //     remark: '按月收取利息费',
            //     placeholder:'最少1百元，最多5000万元',
            //     interestNum : 0,
            //     max:10000000,
            //     min:100,
            //     share: 1000,
            // },
            programData: [
                {
                    num:2,
                    interestRate:0.10,
                    total: 0,
                    active: true
                },
                    {
                    num:3,
                    interestRate:0.09,
                    total: 0,
                },
                {
                    num:4,
                    interestRate:0.09,
                    total: 0,
                },
                {
                    num:5,
                    interestRate:0.08,
                    total: 0,
                },
                {
                    num:6,
                    interestRate:0.08,
                    total: 0,
                },
                {
                    num:7,
                    interestRate:0.07,
                    total: 0,
                },
                {
                    num:8,
                    interestRate:0.07,
                    total: 0,
                },
                {
                    num:9,
                    interestRate:0.065,
                    total: 0,
                },
                {
                    num:10,
                    interestRate:0.06,
                    total: 0,
                },
            ],
        }
    },
    computed: {
        ...mapGetters(['getSettingMonths']),
        monthData() {
            return {
                stepOne : `${this.getSettingMonths.months_min_money} - ${this.getSettingMonths.months_max_money}`,
                stepTwo: '选择杠杆，资金放大2-10倍',
                remarkOne: `不小于${this.getSettingMonths.months_min_money}，不大于${this.getSettingMonths.months_max_money}，且为${this.getSettingMonths.months_divisor_num}的整数倍`,
                remark: '按月收取利息费',
                placeholder: `最少${this.getSettingMonths.months_min_money}元，最多${this.getSettingMonths.months_max_money}元`,
                interestNum : 0,
                max:10000000,
                min:100,
                share: 1000,
            } 
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

