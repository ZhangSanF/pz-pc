<template>
    <div class="wrapper-content">
        <Stock/>
        <Advantage />
        <Program 
            :programData="programData" 
            :stockType ="stockType"
            :termData ="freeData"
        />
    </div>
</template>
<script>
import Stock from '@/components/stock/Stock'
import Advantage from '@/components/stock/StockAdvantage'
import Program from '@/components/stock/StockProgram'
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'freefee',
    components:{ Stock ,Advantage,Program},
    data(){
        return{
            stockType: 'free',
            // freeData:{
            //     stepOne : '1百-1000万',
            //     stepTwo: '固定5倍杠杆',
            //     remarkOne: '不小于1百，不大于1000万，且为100的整数倍',
            //     remark: '第20个交易日14:00终止配资并结算',
            //     placeholder:'最少1百元，最多1000万元',
            //     interestNum :'不收取任何利息',
            //     interest :'20个交易日',
            //     max:10000000,
            //     min:100,
            //     share: 100,
            // },
            programData:[
                {num:2, interestRate:0.10, total: 0, active: true}
            ],
            labelOne:'股票配资流程',
        }
    },
    computed: {
        ...mapGetters(['getSettingFree']),
        freeData() {
            return {
                stepOne : `${this.getSettingFree.free_min_money} - ${this.getSettingFree.free_max_money}`,
                stepTwo: '固定5倍杠杆',
                remarkOne: `不小于${this.getSettingFree.free_min_money}，不大于${this.getSettingFree.free_max_money}，且为${this.getSettingFree.free_divisor_num}的整数倍`,
                remark: '第20个交易日14:00终止配资并结算',
                placeholder:`最少${this.getSettingFree.free_min_money}元，最多${this.getSettingFree.free_max_money}元`,
                interestNum :'不收取任何利息',
                interest :'20个交易日',
                max:10000000,
                min:100,
                share: 100
            }
        }

    },
    created() {

    },
    mounted() {

    },
    methods: {
    }
}
</script>