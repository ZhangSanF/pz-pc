<template>
    <div class="notice_content">
        <el-collapse >
            <el-collapse-item v-for="(item,index) in noticeData" :key="index" @click.native="changeStatus(index, item.read_status, item.id)">
                <template slot="title">
                    <div class="notice_row">
                        <strong class="type">系统通知</strong>
                        <span class="state" size="mini" v-show="item.read_status == '0'">未读</span>
                        <div>{{item.create_time}}</div>
                        <div>{{item.title}}</div>
                    </div>
                </template>
                <div class="info">
                    {{item.content}}
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    props:{
        noticeData:{
            type: Array,
            default:()=>{return []}
        }
    },
    data() {
        return {

        }
    },
    methods:{
        ...mapActions(['internalMessageStatus']),
        changeStatus(index, read_status, id) {
            if(read_status == '1') {
                return
            }
            this.internalMessageStatus({id: id}).then((res) => {
                if(res.code == 200) {
                    this.noticeData[index].read_status = '1'
                }
            })                 
        }
    },
    watch:{

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
    padding: 10px 0;
}
.info {
    padding: 10px 18px;
    font-size: 14px;
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
<style lang="scss">
.notice_content{
    .el-collapse-item__header{
        height: 100%;
        line-height: 22px;
    }
    .el-collapse-item__header:hover .el-collapse-item{
        background: #f5f5f5 !important;
    }
    .el-collapse-item__content{
        padding-bottom: 15px;
    }
}
</style>
