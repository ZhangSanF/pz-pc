<template>
    <div class="tradingRecord">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con-2">
            <div class="classify-selected">
                <div class="classify-selected-1-a">
                    <dl class="classify-selected-1">
                        <dt>交易日期</dt>
                        <dd>
                            <a href="#" class="selected">全部</a>
                            <a href="#">最近七天</a>
                            <a href="#">1个月</a>
                            <a href="#">3个月</a>
                        </dd>
                    </dl>
                </div>
                <div class="classify-selected-1-time">
                    <dl class="classify-selected-1">
                        <dt>选择日期</dt>
                        <dd>
                           <datepicker
                                class="datepicker"                    
                                :input-class="'datepickerInput'"
                                :format="dateOption.format"
                                :language="dateOption.language"
                                v-model="curSelectTime"
                            ></datepicker>
                           <span>-</span>
                           <datepicker
                                class="datepicker"                    
                                :input-class="'datepickerInput'"
                                :format="dateOption.format"
                                :language="dateOption.language"
                                v-model="curSelectTime"
                            ></datepicker>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="classify-selected-1">
                <dt>交易类型</dt>
                <dd style="width: 500px">
                    <a href="#" class="selected">全部</a>
                    <a href="#">充值</a>
                </dd>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <td width="132">时间</td>
                        <td width="126">交易类型</td>
                        <td width="210" style="text-indent:23px;">交易详情</td>
                        <td width="80" style="text-align:right">金额</td>
                        <td width="160" style="text-align:right; padding-right:18px;">余额</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in jiluData" :key="index">
                        <td class="user-deal-record-time">
                            {{item.date}} <br>
                            <span>{{item.time}}</span>
                        </td>
                        <td>{{item.type}}</td>
                        <td>
                            <el-tooltip effect="light" placement="bottom">
                                <span slot="content">交易序号：9047<br>交易类型：签到返利<br>交易对方：@网站管理员@</span>
                                <span class="icon-xiala"></span>
                            </el-tooltip>
                            <span title="每日签到，赠送管理费1元">{{item.info}}</span>
                        </td>
                        <td class="user-deal-record-money">{{item.money}}</td>
                        <td style="text-align:right; padding-right:18px;">{{item.allMoney}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";

export default {
    components:{ Title, Datepicker },
    data() {
        return {
            infoTitle: {
                title:'交易记录',
                todu:{
                    title:'',
                }
            },
            curSelectTime: new Date(),
            dateOption: {
                language: zh,
                format: "yyyy-MM-dd"
            },
            jiluData:[
                {date: '2019-07-02', time: '15:45:03', type: '签到返利', info: '每日签到，赠送管理费1元', money: '1.00', allMoney: '39803'},
                {date: '2019-07-02', time: '15:45:03', type: '签到返利', info: '每日签到，赠送管理费1元', money: '1.00', allMoney: '39803'},
                {date: '2019-07-02', time: '15:45:03', type: '签到返利', info: '每日签到，赠送管理费1元', money: '1.00', allMoney: '39803'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.tradingRecord{
    background: #fff;border: 1px solid #e0e0e0;border-radius: 3px;
    .user-box-con-2{
         width: 964px; margin: 0 auto;padding: 15px 0 20px;
         .classify-selected{
             display: flex;
             .classify-selected-1-a{
                 width: 360px; font-size: 14px; 
             }
            .classify-selected-1-time{
                width: 404px; font-size: 14px;
                
            }
         }
         .classify-selected-1{
            height: 26px;line-height: 28px;font-size: 13px;font-family: simsun;margin-bottom: 12px;
            dt{
                float: left;width: 60px;margin-right: 9px;
            }
            dd{
                float: left; 
                a{
                    padding: 4px 8px;
                }
                .selected{
                    background: #fe7b20;color: #fff;
                }
            }
        }
        .table{
            width: 100%;
            thead{
                tr{
                    background: #f5f5f5;
                    td{
                        border-top: 1px solid #e0e0e0;    padding-left: 10px;border-bottom: 1px solid #e0e0e0;
                        background: #f5f5f5;height: 40px;line-height: 40px;
                    }
                }
            }
            tbody{
                tr{
                    td{
                        height: 50px;line-height: 50px;border-bottom: 1px solid #e0e0e0;padding-left: 10px;
                    }
                    .user-deal-record-time{
                        line-height: 22px;
                        span{
                            color: #999;
                        }
                    }
                    .user-deal-record-money{
                        text-align: right; padding-left: 0;    color: #fb6e02;font-size: 12px;
                    }
                    .icon-xiala{
                        margin: 16px 8px 0 0;cursor: pointer; float: left; width: 15px;height: 15px;
                        background: url(../../assets/image/user_sprite.png) no-repeat -21px -661px;
                    }
                    .icon-xiala:hover{
                        background: url(../../assets/image/user_sprite.png) no-repeat -21px -677px;
                    }
                }
            }
        }
    }
}
</style>
<style>
.datepicker{
    display: inline-block;   
}
.datepickerInput{
    border-radius: 0;width: 137px;line-height: 26px;padding-right: 20px;cursor: pointer;border: 1px solid #d8d8d8;
    outline: none;padding-left: 10px; background: url(../../assets/image/icondate.png) 115px 4px no-repeat;
}
.datepickerInput:hover {
    border: 1px solid #feb67f;
}
.datepickerInput:focus {
    border: 1px solid #fe6e00;
}
</style>
