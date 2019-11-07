<template>
    <div class="user-box-2">
        <Title :infoTitle="infoTitle"/>
        <el-row class="user-box-con">
            <strong>状态</strong>
            <span
                v-for="(item,index) in stateData "
                @click="getInstation(item.value,index)"
                :key="index"
                class="state_btn"
                :class="selected == index ? 'selected' :''">
                    {{item.lable}}
            </span>
            <strong class="date-style">选择日期</strong>
            <el-date-picker
                v-model="modelTime"
                size="mini"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-row>
        <!-- 无数据显示 -->
        <div v-if="pageData.total <= 0" class="no-content">无站内信息</div>
        <div v-else>
            <el-row class="user-box-con">
                <Notice :noticeData="noticeData"/>
            </el-row>
            <el-row class="user-box-con" >
                <div class="pagination_content">
                    共&nbsp;{{pageData.total}}&nbsp;条
                    {{sumPage}}&nbsp;页
                    当前第&nbsp;{{pageData.page}}&nbsp;页&nbsp;&nbsp; 
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
            </el-row>
        </div>     
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Notice from '@/components/member/Notice'
import Pagination from '@/components/member/Pagination'
import { mapGetters, mapActions } from "vuex"
import { formatDate } from '@/js/utils'

export default {
    components:{ Title , Notice ,Pagination},
    data() {
        return {
            infoTitle: {
                title:'站内信息',
            },
            modelTime: '',//model
            selected: '0',
            stateData:[
                {lable:'全部', value: '-1'},
                {lable:'未读', value: '0'},
                {lable:'已读', value: '1'},
            ],
            read_status: '-1',//阅读状态(未读0，已读1，全部-1)
            page: 1,
            page_size: 10,
            start_time: '',// 开始时间
            end_time: '',// 结束时间
            noticeData:[],
            pageData:{},
            pageInput: 1
        }
    },
    created() {
        this.internalMessageFun()
    },
    methods:{
        ...mapActions(['internalMessage']),
        getInstation(value,index) {
            this.page = 1
            this.read_status = value
            this.selected = index
            this.internalMessageFun()
        },
        internalMessageFun() {
            this.internalMessage({
                read_status: this.read_status,
                page: this.page,
                page_size: this.page_size,
                start_time: this.start_time,
                end_time: this.end_time
            }).then((res) => {
                if(res.code == 200) {
                    this.noticeData = res.data.rows
                    this.pageData = res.data
                }
            })
        },
        goPage(target) {
            switch(target) {
                case 'index' : 
                    if(this.page != 1) {
                        this.page = 1
                        this.internalMessageFun();
                    }
                    break;
                case 'prev' : 
                    if(this.page > 1) {
                        this.page -- 
                        this.internalMessageFun();
                    }
                    break;
                case 'next' : 
                    if(this.page < this.sumPage) {
                        this.page ++ 
                        this.internalMessageFun();
                    }
                    break;
                case 'end' : 
                    if(this.page != this.sumPage) {
                        this.page = this.sumPage
                        this.internalMessageFun();
                    }
                    break;
                case 'jump' : 
                    if(this.sumPage != 1 && this.pageInput <= this.sumPage && this.pageInput > 0) {
                        this.page = this.pageInput
                        this.internalMessageFun();
                    }
                    break;
            }
        }
    },
    computed:{
        // 计算共多少页
        sumPage() {
            return Math.ceil(this.pageData.total / 10)
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
                this.internalMessageFun();
            },
            deep: true
        }
    }

}
</script>

<style lang="scss" scoped>
.date-style{
    margin-left: 20px;
    margin-right: 10px;
}
.no-content{
    text-align: center;
    padding-bottom: 20px;
}
.user-box-2{
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    background: #fff;
}
.user-box-con {
    width: 964px;
    margin: 0 auto;
    padding: 10px 0;
}
.state_btn {
    cursor: pointer;
    display: inline-block;
    margin-left: 10px;
    border-radius: 5px;
    color: #666;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
}

.selected {
    background: #ff6e01;
    color: #fff;
    text-decoration: none;
}
.state_btn:hover {
    @extend .selected;
}
.page {
    width:48px; 
    display: inline-block; 
}
.pagination_content {
    text-align: right
}
.pagination_content span{
    cursor: pointer;
}
.pagination_content span:hover {
    color: #409EFF;
}
</style>
