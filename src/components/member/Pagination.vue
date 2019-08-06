<template>
    <div class="pagination_content">
        共&nbsp;{{pageData.total}}&nbsp;条
        {{sumPage}}&nbsp;页
        当前第&nbsp;{{pageData.page}}&nbsp;页&nbsp;&nbsp; 
        <span @click="goPage('1')">首页</span>&nbsp;&nbsp; 
        <span @click="goPage(pageData.page - 1)">上一页</span>&nbsp;&nbsp; 
        <span @click="goPage(pageData.page + 1)">下一页</span>&nbsp;&nbsp;
        <span @click="goPage(sumPage)">尾页</span>&nbsp;&nbsp;
        转到&nbsp;&nbsp;<el-input
            type="text"
            size="mini"
            v-model="pageInput"
            class="page"
            >
        </el-input>
        &nbsp;页&nbsp;&nbsp;
        <span @click="goPage(pageInput)">确定</span>
    </div>
</template>

<script>
export default {
    props:{
        pageData:{
            type: Object,
            default:()=>{return {}}
        },
        type:{
            type: String,
            default:''
        }
    },
    data() {
        return {
            pageInput: '1'
        }
    },
    methods:{
        goPage(page) {
            if(this.type == 'internalMessage') {
                this.$parent.$parent.go(page)
            }else if(this.type == 'pzManage'){
                console.log('4444')
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