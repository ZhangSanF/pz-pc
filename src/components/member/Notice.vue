<template>
    <div class="notice_content">
        <el-row class="notice_row" v-for="(item,index) in noticeData" :key="index">
            <el-col :span="22">
                <div>
                    <strong class="type">{{item.type == '1' ? ' 系统通知' :''}}</strong>
                    <span class="state" v-show="item.state == '2'" size="mini" >{{item.state == '2' ? '未读' :''}}</span>
                </div>
                <div>{{item.time}}</div>
                <div>{{item.title}}</div>
            </el-col>
            <el-col :span="2">
                <span class="show" @click="showInfo(index,item.show)">{{item.show ? '收起' : '展开'}}&nbsp;&nbsp;<strong>{{item.show ? '∧' : '∨'}}</strong></span>
            </el-col>
            <el-col :span="24"  class="info" v-show="item.show">
                    {{item.info}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button size="mini" type="danger" plain>删除</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props:{
        noticeData:{
            type: Array,
            default:()=>{return []}
        }
    },
    data() {
        return {
            showItem:[]
        }
    },
    methods:{
        showInfo(index,a) {
            this.noticeData[index].show = a == true ? false : true
        }
    }
    
}
</script>
<style lang="scss" scoped>
.show {
    position: absolute;
    top: 20px;
    right: 0;
    color: #3181d8;
    cursor: pointer;
    font-weight: 700;
}
.type {
    font-size: 15px;
    font-weight: 700;
}
.notice_row {
    padding: 15px 0;
    border-bottom: 1px solid #e0e0e0;
    line-height: 26px;
    position: relative;
}
.notice_row:hover {
    background: #f5f5f5;
}
.info {
    padding: 10px 18px;
    font-size: 14px;
    margin-top: 10px;
    color: #333;
    line-height: 28px;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
}
.state {
    background: #FF6E01;
    line-height: 24px;
    height: 24px;
    padding: 0 4px;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    border-radius: 4px;
    margin-left: 10px;
}
</style>