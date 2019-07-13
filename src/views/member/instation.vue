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
                :class="selected == index ? 'selected' :''"
                >
                {{item.lable}}</span>
        </el-row>
        <el-row class="user-box-con">
            <Notice :noticeData="noticeData"/>
        </el-row>
        <el-row class="user-box-con" >
            <Pagination  :pageData="pageData"/>
        </el-row>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Notice from '@/components/member/Notice'
import Pagination from '@/components/member/Pagination'
export default {
    components:{ Title , Notice ,Pagination},
    data() {
        return {
            infoTitle: {
                title:'站内信息',
            },
            stateData:[
                {
                    lable:'全部',
                    value: 'all',
                },
                {
                    lable:'未读',
                    value: 'nosee',
                },
                {
                    lable:'已读',
                    value: 'see',
                },
            ],
            noticeData:[
                {
                    type: '1',
                    time: '2019-06-30 08:21:11',
                    title: '配资审核',
                    info: '亲爱的出彩速配用户，您的 申请配资 审核未通过。',
                    state: '1',
                    show: false
                },
                {
                    type: '1',
                    time: '2019-06-30 08:21:11',
                    title: '配资审核',
                    info: '亲爱的出彩速配用户，您的 申请配资 审核未通过。',
                    state: '2',
                    show: false
                },
                {
                    type: '1',
                    time: '2019-06-30 08:21:11',
                    title: '配资审核',
                    info: '亲爱的出彩速配用户，您的 申请配资 审核未通过。',
                    state: '1',
                    show: false
                },
                {
                    type: '1',
                    time: '2019-06-30 08:21:11',
                    title: '配资审核',
                    info: '亲爱的出彩速配用户，您的 申请配资 审核未通过。',
                    state: '2',
                    show: false
                },
                {
                    type: '1',
                    time: '2019-06-30 08:21:11',
                    title: '配资审核',
                    info: '亲爱的出彩速配用户，您的 申请配资 审核未通过。',
                    state: '2',
                    show: false
                },
            ],
            selectData:{
                lable:'全部',
                value: 'all',
            },
            selected: '0',
            pageData: {
                total: 23,
                pages: 3 ,
                nowPage: 1
            }
        }
    },
    methods:{
        getInstation(item,index) {
            if(this.selected == index) return false
            this.selectData = item
            this.selected = index
        },
        go(page) {
            console.log(page)
        }
    }

}
</script>

<style lang="scss" scoped>
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
</style>
