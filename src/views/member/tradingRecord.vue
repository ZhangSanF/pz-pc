<template>
    <div class="tradingRecord">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con-2">
            <div class="classify-selected">
                <div class="classify-selected-1-a">
                    <dl class="classify-selected-1">
                        <dt>交易日期</dt>
                        <dd>
                            <a 
                            href="javascript:void(0);" 
                            v-for="(item, index) in dealDate" 
                            :key="index"
                            @click="changeTime(item.value)"
                            :class="item.value == quick_time ? 'selected' : ''">
                                {{item.name}}
                            </a>
                        </dd>
                    </dl>
                </div>
                <div class="classify-selected-1-time">
                    <div class="classify-selected-1 change-time">
                        <p>选择日期</p>
                        <p class="start-time">
                            <el-date-picker
                            v-model="modelTime"
                            size="mini"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                        <!-- <dd>
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
                        </dd> -->
                    </div>
                </div>
            </div>
            <div class="classify-selected-1">
                <dt>交易类型</dt>
                <dd style="width: 500px">
                    <a href="javascript:void(0);" 
                    v-for="(item, index) in dealType" 
                    :key="index"
                    @click="changeType(item.value)"
                    :class="item.value == type ? 'selected' : ''">
                        {{item.name}}
                    </a>
                </dd>
            </div>
            <!-- 无数据显示 -->
            <div v-if="curData.total <= 0" class="no-content">无交易记录</div>
            <div v-else>
                <table class="table">
                    <thead>
                        <tr>
                            <td width="132">时间</td>
                            <td width="126">交易类型</td>
                            <td width="210" style="text-indent:23px;">交易详情</td>
                            <td width="100" style="text-align:right;padding-right:45px;">变动金额</td>
                            <td width="140" style="text-align:right; padding-right:18px;">余额</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in curData.rows" :key="index">
                            <td class="user-deal-record-time">
                                {{item.create_time.split(' ')[0]}} <br>
                                <span>{{item.create_time.split(' ')[1]}}</span>
                            </td>
                            <td>{{item.cn_type}}</td>
                            <td>
                                <el-tooltip effect="light" placement="bottom">
                                    <span slot="content">交易序号：{{item.id}}<br>交易类型：{{item.cn_type}}<br>交易对方：@{{item.admin}}@</span>
                                    <span class="icon-xiala"></span>
                                </el-tooltip>
                                <span :title="item.remark" class="info-data">{{item.remark}}</span>
                            </td>
                            <td class="user-deal-record-money"><span class="change-money" title="变动金额">{{item.change_money}}</span> | <span class="gift-change-money" title="管理费">{{item.gift_change_money}}</span> </td>
                            <td style="text-align:right; padding-right:18px;">{{item.available_money}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination_content">
                    共&nbsp;{{curData.total}}&nbsp;条
                    {{sumPage}}&nbsp;页
                    当前第&nbsp;{{page}}&nbsp;页&nbsp;&nbsp; 
                    <span @click="goPage('index')">首页</span>&nbsp;&nbsp; 
                    <span @click="goPage('prev')">上一页</span>&nbsp;&nbsp; 
                    <span @click="goPage('next')">下一页</span>&nbsp;&nbsp;
                    <span @click="goPage('end')">尾页</span>&nbsp;&nbsp;
                    转到&nbsp;&nbsp;<el-input
                        type="text"
                        size="mini"
                        v-model="pageInput"
                        class="page"
                        >
                    </el-input>
                    &nbsp;页&nbsp;&nbsp;
                    <span @click="goPage('jump')">确定</span>
                </div>
            </div>         
        </div>       
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import { mapGetters, mapActions } from "vuex";
import { formatDate } from '@/js/utils'
// import Datepicker from "vuejs-datepicker";
// import { zh } from "vuejs-datepicker/dist/locale";

export default {
    components:{ Title },
    data() {
        return {
            // curSelectTime: new Date(),
            // dateOption: {
            //     language: zh,
            //     format: "yyyy-MM-dd"
            // },
            infoTitle: {
                title:'交易记录',
                todu:{
                    title:'',
                }
            },
            dealDate: [
                {name: '全部', value: '-1'},
                {name: '最近七天', value: '1'},
                {name: '1个月', value: '2'},
                {name: '3个月', value: '3'}
            ],
            dealType: [
                {name: '全部', value: '-1'},
                {name: '充值', value: '1'} 
            ],
            modelTime: '',//model
            start_time: '',// 开始时间
            end_time: '',// 结束时间
            quick_time: '-1',// 快选时间(全部-1，近一周1，一个月2，三个月3)
            type: '-1',// 交易类型(充值1，全部-1)
            page: 1,// 页码
            page_size: 10,// 每页数量
            curData: [],
            pageInput: 1
        }
    },
    created() {
        this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
    },
    methods:{
        ...mapActions(['transacTionrecord']),
        transacTionrecordFun(start_time, end_time, quick_time, type, page, page_size) {
            this.transacTionrecord({
                start_time: start_time,
                end_time: end_time,
                quick_time: quick_time,
                type: type,
                page: page,
                page_size: page_size
            }).then((res) => {
                if(res.code == 200) {
                    this.curData = res.data
                }
            })
        },
        // 选择交易日期
        changeTime(value) {
            this.quick_time = value
            this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
        },
        // 选择交易类型
        changeType(value) {
            this.type = value
            this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
        },
        goPage(target) {
            switch(target) {
                case 'index' : 
                    if(this.page != 1) {
                        this.page = 1
                        this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
                    }
                    break;
                case 'prev' : 
                    if(this.page > 1) {
                        this.page -- 
                        this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
                    }
                    break;
                case 'next' : 
                    if(this.page < this.sumPage) {
                        this.page ++ 
                        this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
                    }
                    break;
                case 'end' : 
                    if(this.page != this.sumPage) {
                        this.page = this.sumPage
                        this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
                    }
                    break;
                case 'jump' : 
                    if(this.sumPage != 1 && this.pageInput <= this.sumPage) {
                        this.page = this.pageInput
                        this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
                    }
                    break;
            }
        }
    },
    computed: {
        // 计算共多少页
        sumPage() {
            return Math.ceil(this.curData.total/10)
        }
    },
    watch: {
        'modelTime':{
            handler(val, b) {
                if(val != null) {
                    this.start_time = formatDate(val[0].getTime(), 'YY-MM-DD hh:mm:ss')
                    this.end_time = formatDate(val[1].getTime(), 'YY-MM-DD 23:59:59')
                }else {
                    this.start_time = ''
                    this.end_time = ''
                }               
                this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.no-content{
    text-align: center;
    // padding-bottom: 30px;
}
.change-money{
    display: inline-block;width: 70px;text-align: center;
}
.gift-change-money{
     display: inline-block;width: 50px;text-align: center;
}
.page {
    width:48px; 
    display: inline-block; 
}
.pagination_content {
    text-align: center;
    width: 964px;
    margin: 0 auto;
    padding-top: 15px;
    // padding-bottom: 10px;
}
.pagination_content span{
    cursor: pointer;
}
.pagination_content span:hover {
    color: #409EFF;
}
.change-time{
    display: flex;align-items: center;
    .start-time{
        margin-left: 10px;
    }
}
.info-data{
    display: inline-block;width: 180px;height: 19px;line-height: 25px;overflow: hidden;
    text-overflow: ellipsis;white-space: nowrap;
}
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
            height: 26px;line-height: 23px;font-size: 13px;font-family: simsun;margin-bottom: 12px;
            dt{
                float: left;width: 60px;margin-right: 9px;
            }
            dd{
                float: left; 
                a{
                    padding: 0 8px;display: inline-block;
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
<style lang="scss">
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
.change-time{
    .el-date-editor--daterange.el-input__inner{
        width: 280px;
    }
}
</style>
