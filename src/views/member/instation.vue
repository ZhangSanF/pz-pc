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
import { mapGetters, mapActions } from "vuex";

export default {
    components:{ Title , Notice ,Pagination},
    data() {
        return {
            infoTitle: {
                title:'站内信息',
            },
            selected: '0',
            stateData:[
                {lable:'全部', value: '-1'},
                {lable:'未读', value: '0'},
                {lable:'已读', value: '1'},
            ],
            stateValue: '-1',
            page: 1,
            page_size: 10,
            noticeData:[],
            pageData:{},
            pageInput: '1'
        }
    },
    created() {
        this.internalMessageFun('-1', this.page, this.page_size)
    },
    methods:{
        ...mapActions(['internalMessage']),
        getInstation(value,index) {
            this.page = 1
            this.stateValue = value
            this.selected = index
            this.internalMessageFun(value, this.page, this.page_size)
        },
        internalMessageFun(read_status, page, page_size) {
            this.internalMessage({
                read_status: read_status,
                page: page,
                page_size: page_size
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
                        this.internalMessageFun(this.stateValue, this.page, this.page_size);
                    }
                    break;
                case 'prev' : 
                    if(this.page > 1) {
                        this.page -- 
                        this.internalMessageFun(this.stateValue, this.page, this.page_size);
                    }
                    break;
                case 'next' : 
                    if(this.page < this.sumPage) {
                        this.page ++ 
                        this.internalMessageFun(this.stateValue, this.page, this.page_size);
                    }
                    break;
                case 'end' : 
                    if(this.page != this.sumPage) {
                        this.page = this.sumPage
                        this.internalMessageFun(this.stateValue, this.page, this.page_size);
                    }
                    break;
                case 'jump' : 
                    if(this.sumPage != 1 && this.pageInput <= this.sumPage) {
                        this.page = this.pageInput
                        this.internalMessageFun(this.stateValue, this.page, this.page_size);
                    }
                    break;
            }
        }
    },
    computed:{
        // 计算共多少页
        sumPage() {
            return Math.ceil(this.pageData.total/10)
        }
    }

}
</script>

<style lang="scss" scoped>
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
