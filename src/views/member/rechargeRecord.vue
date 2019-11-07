<template>
    <div class="withdrawalRecord">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con-2">
            <div class="classify-selected">
                <div class="classify-selected-1-a">
                    <dl class="classify-selected-1">
                        <dt>充值时间</dt>
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
                        <p class="classify-selected-other-date">选择日期</p>
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
                    </div>
                </div>
            </div>
            <div class="classify-selected-1">
                <dt>充值状态</dt>
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
            <div v-if="curData.total <= 0" class="no-content">无充值记录</div>
            <div v-else>
                <table class="table">
                    <thead>
                        <tr>
                            <td width="132">申请时间</td>
                            <td width="156" style="text-indent:65px;">订单号</td>
                            <td width="100" style="text-align:center;">充值账号</td>
                            <td width="120" style="text-align:center;">充值金额</td>
                            <td width="100" style="text-align:right; padding-right:18px;">手续费</td>
                            <td width="100" style="text-align:right; padding-right:18px;">状态</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in curData.rows" :key="index">
                            <td class="user-deal-record-time">
                                {{item.createtime.split(' ')[0]}} <br>
                                <span>{{item.createtime.split(' ')[1]}}</span>
                            </td>
                            <td>{{item.order_id}}</td>
                            <td style="text-align:center;">{{item.username}}</td>
                            <td style="text-align:center;">{{item.trueamount}}</td>
                            <td style="text-align:right; padding-right:18px;">{{item.userfee}}</td>
                            <td style="text-align:right; padding-right:18px;">{{item.cn_status}}</td>
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

export default {
    components:{ Title },
    data() {
        return {
            infoTitle: {
                title:'充值记录',
                todu:{
                    title:'申请充值',
                }
            },
            dealDate: [
                {name: '全部', value: '-1'},
                {name: '最近七天', value: '1'},
                {name: '1个月', value: '2'},
                {name: '3个月', value: '3'}
            ],
            dealType: [
                {name: '全部', value: '2'},
                {name: '已通过', value: '1'},
                {name: '未审核', value: '0'},
                {name: '已拒绝', value: '-2'},
                {name: '失败', value: '-1'}
            ],
            modelTime: '',//model
            start_time: '',// 开始时间
            end_time: '',// 结束时间
            quick_time: '-1',// 快选时间(全部-1，近一周1，一个月2，三个月3)
            type: '2',// 交易状态(已拒绝-2，失败-1，未审核0，已通过1，全部2)
            page: 1,// 页码
            page_size: 10,// 每页数量
            dep_with: 1,//充值或提现（1：充值，2：为提现）
            curData: [],
            pageInput: 1
        }
    },
    created() {
        this.withdrawalrecordFun()
    },
    methods:{
        ...mapActions(['paymenTrecord']),
        toDoMore() {
            this.$router.push('/member/recharge')
        },
        withdrawalrecordFun() {
            this.paymenTrecord({
                start_time: this.start_time,
                end_time: this.end_time,
                quick_time: this.quick_time,
                type: this.type,
                page: this.page,
                dep_with: this.dep_with,
                page_size: this.page_size
            }).then((res) => {
                if(res.code == 200) {
                    this.curData = res.data
                }
            })
        },
        // 选择交易日期
        changeTime(value) {
            this.page = 1
            this.quick_time = value
            this.withdrawalrecordFun()
        },
        // 选择交易类型
        changeType(value) {
            this.page = 1
            this.type = value
            this.withdrawalrecordFun()
        },
        goPage(target) {
            switch(target) {
                case 'index' : 
                    if(this.page != 1) {
                        this.page = 1
                        this.withdrawalrecordFun()
                    }
                    break;
                case 'prev' : 
                    if(this.page > 1) {
                        this.page -- 
                        this.withdrawalrecordFun()
                    }
                    break;
                case 'next' : 
                    if(this.page < this.sumPage) {
                        this.page ++ 
                        this.withdrawalrecordFun()
                    }
                    break;
                case 'end' : 
                    if(this.page != this.sumPage) {
                        this.page = this.sumPage
                        this.withdrawalrecordFun()
                    }
                    break;
                case 'jump' : 
                    if(this.sumPage != 1 && this.pageInput <= this.sumPage && this.pageInput > 0) {
                        this.page = this.pageInput
                        this.withdrawalrecordFun()
                    }
                    break;
            }
        }
    },
    computed: {
        // 计算共多少页
        sumPage() {
            return Math.ceil(this.curData.total / 10)
        }
    },
    watch: {
        'modelTime':{
            handler(val, b) {
                if(val != null) {
                    this.page = 1
                    this.start_time = formatDate(val[0].getTime(), 'YY-MM-DD hh:mm:ss')
                    this.end_time = formatDate(val[1].getTime(), 'YY-MM-DD 23:59:59')
                }else {
                    this.start_time = ''
                    this.end_time = ''
                }               
                this.withdrawalrecordFun()
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.no-content{
    text-align: center;
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
.classify-selected-other-date{
    font-weight: 700;
}
.withdrawalRecord{
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
            height: 26px;line-height: 23px;font-size: 13px;margin-bottom: 12px;
            dt{
                float: left;
                height: 24px;
                width: 65px;
                font-weight: 700;
            }
            dd{
                float: left; 
                a{
                    padding: 0 8px;display: inline-block;margin-right: 5px;
                }
                .selected{
                    background: #fe7b20;color: #fff;border-radius: 5px;height: 24px;    line-height: 24px;
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