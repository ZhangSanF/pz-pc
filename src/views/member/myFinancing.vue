<template>
    <div class="myFinancing">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con">
            <div class="classify-selected-con clearfix">
                <div class="classify-selected-time pz-selected-time">
                    <div class="classify-selected clearfix">
                        <p class="title">配资时间</p>
                        <!-- <dd>
                            <datepicker
                                class="datepicker"                    
                                :input-class="'datepickerInput'"
                                :format="dateOption.format"
                                :language="dateOption.language"
                                v-model="create_start"
                            ></datepicker>
                           <span>-</span>
                           <datepicker
                                class="datepicker"                    
                                :input-class="'datepickerInput'"
                                :format="dateOption.format"
                                :language="dateOption.language"
                                v-model="create_end"
                            ></datepicker>
                        </dd> -->
                        <p class="start-time">
                            <el-date-picker
                            v-model="start_time"
                            size="mini"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                    </div>
                    <div class="classify-selected clearfix">
                        <p class="title">到期时间</p>
                        <p class="start-time">
                            <el-date-picker
                            v-model="end_time"
                            size="mini"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                    </div>
                </div>
                <div class="classify-selected-a">
                    <div class="classify-selected " style="margin-bottom: 15px;">
                        <p class="left">配资类型</p>
                        <p>
                            <a href="javascript:void(0);" 
                                @click="changeType(item.label, item.value)"
                                v-for="(item, index) in pzType" 
                                :key="index" 
                                :class="paTypeActive == item.label ? 'selected' : ''">
                                {{item.name}}
                            </a>
                        </p>
                    </div>
                    <div class="classify-selected " style="margin-bottom: 0;">
                        <p class="left">配资状态</p>
                        <p>
                            <a href="javascript:void(0);" 
                                @click="changeStatus(item.label, item.value)"
                                v-for="(item, index) in pzStatus" 
                                :key="index" 
                                :class="pzStatusActive == item.label ? 'selected' : ''">
                                {{item.name}}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="user-box-con-2">
            <PzList :curpzList="orderObj.list"/>
        </div>
        <div class="pagination_content">
            共&nbsp;{{orderObj.total}}&nbsp;条
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
</template>

<script>
import Title from '@/components/member/Title'
import PzList from '@/components/member/PzList'
import Pagination from '@/components/member/Pagination'
import { mapGetters, mapActions } from "vuex"
import { formatDate } from '@/js/utils'
// import Datepicker from "vuejs-datepicker"
// import { zh } from "vuejs-datepicker/dist/locale"

export default {
    components:{ Title, PzList, Pagination },
    data() {
        return {
            infoTitle: {
                title:'配资管理',
                todu:{
                    title:'',
                }
            },
            // dateOption: {
            //     language: zh,
            //     format: "yyyy-MM-dd"
            // },
            start_time: '',//model
            end_time: '',//model
            page: 1,
            page_size: 5, 
            order_type: '',
            status: '',         
            create_start: '',//配资时间-起
            create_end: '',//配资时间-止
            end_time_start: '',//结束时间-起
            end_time_end: '',//结束时间-止          
            pzType:[//配资类型
                {name: '全部', value: '', label: 'all'},
                {name: '免息', value: 1, label: 'free'},
                {name: '按天', value: 2, label: 'day'},
                {name: '按月', value: 3, label: 'month'},
                {name: 'VIP', value: 4, label: 'vip'}
            ],
            paTypeActive: 'all',
            pzStatus:[//配资状态
                {name: '全部', value: '', label: 'all'},
                {name: '待审核', value: 1, label: 'wait'},
                {name: '操盘中', value: 2, label: 'operatestop'},
                {name: '审核失败', value: 3, label: 'no'},
                {name: '操盘结束', value: 4, label: 'end'}
            ],
            pzStatusActive: 'all',
            pageInput: '1'
        }
    },
    created() {
        this.getOrderFun(this.page, this.page_size)
    },
    methods:{
        ...mapActions(['getOrder']),
        getOrderFun(page, page_size, order_type, status, create_time_start, create_time_end, end_time_start, end_time_end) {
            this.getOrder({
                page: page,//页码
                page_size: page_size,//每页数据量
                order_type: order_type || '',//订单类型(1免息2按天3按月4VIP)
                status: status || '',//状态(1待审核、2审核通过、3审核失败，4操盘结束))
                create_time_start: create_time_start || '',//配资时间-起
                create_time_end: create_time_end || '',//配资时间-止
                end_time_start: end_time_start || '',//结束时间-起
                end_time_end: end_time_end || ''//结束时间-止
            })
        },
        // 配资类型判断
        changeType(label, value) {
            this.paTypeActive = label
            this.order_type = value
            this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
        },
        // 配资状态判断
        changeStatus(label, value) {
            this.pzStatusActive = label
            this.status = value
            this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
        },
        goPage(target) {
            switch(target) {
                case 'index' : 
                    if(this.page != 1) {
                        this.page = 1
                        this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
                    }
                    break;
                case 'prev' : 
                    if(this.page > 1) {
                        this.page -- 
                        this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
                    }
                    break;
                case 'next' : 
                    if(this.page < this.sumPage) {
                        this.page ++ 
                        this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
                    }
                    break;
                case 'end' : 
                    if(this.page != this.sumPage) {
                        this.page = this.sumPage
                        this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
                    }
                    break;
                case 'jump' : 
                    if(this.sumPage != 1 && this.pageInput <= this.sumPage) {
                        this.page = this.pageInput
                        this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
                    }
                    break;
            }
        }
    },
    computed: {
        ...mapGetters(['getOrderList']),
        orderObj() {
            return this.getOrderList
        },
        // 计算共多少页
        sumPage() {
            return Math.ceil(this.orderObj.total/5)
        }
    },
    watch: {
        // 配资起止时间
        'start_time': {
            handler(val, b) {
                if(val != null) {
                    this.create_start = formatDate(val[0].getTime())
                    this.create_end = formatDate(val[1].getTime())
                }else {
                    this.create_start = ''
                    this.create_end = ''
                }               
                this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
            },
            deep: true
        },
        // 配资结束时间
        'end_time': {
            handler(val, b) {
                if(val != null) {
                    this.end_time_start = formatDate(val[0].getTime())
                    this.end_time_end = formatDate(val[1].getTime())
                }else {
                    this.end_time_start = ''
                    this.end_time_end = ''
                }               
                this.getOrderFun(this.page, this.page_size, this.order_type, this.status, this.create_start, this.create_end, this.end_time_start, this.end_time_end)
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    width:48px; 
    display: inline-block; 
}
.pagination_content {
    width: 964px;
    margin: 0 auto;
    padding-bottom: 10px;
}
.pagination_content span{
    cursor: pointer;
}
.pagination_content span:hover {
    color: #409EFF;
}
.myFinancing{
    background: #fff;border: 1px solid #e0e0e0;border-radius: 3px;
    .user-box-con{
        width: 964px;margin: 0 auto;padding:15px 0;
        .classify-selected-con{
            margin-bottom: 18px;
            .classify-selected-time{
                width: 404px;float: left;font-size: 14px; 
            }
            .classify-selected{
                display: flex;align-items: center;font-size: 13px;font-family: simsun;margin-bottom: 8px;
                .title{
                    width: 60px;margin-right: 9px;
                }
                .start-time{
                    // width: 300px;
                }
            }
            .classify-selected-a{
                width: 390px;float: left;font-size: 14px;
                a{
                    padding: 4px 10px;text-align: center;display: inline-block;
                }
                // a:hover{
                //     color: #e25353;
                // }
                .selected{
                    background: #fe7b20;color: #fff;
                }
                p{
                    display: inline-block
                }
                .left{
                    width: 60px;margin-right: 9px;
                }
            }
        }
    }
    .user-box-con-2{
        width: 964px;margin: 0 auto;padding: 15px 0 20px;
    }
}
</style>
<style lang="scss">
.pz-selected-time{
    .el-date-editor--daterange.el-input__inner{
        width: 280px;
    }
}
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