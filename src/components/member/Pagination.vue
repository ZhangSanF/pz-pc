<template>
    <div class="pagination_content">
        <div >
            共&nbsp;<span>{{pageData.total}} </span>&nbsp;条
            <span >{{pageData.pages}} </span>&nbsp;页
            当前第&nbsp;<span >{{pageData.nowPage}}</span>&nbsp;&nbsp; 
            <span @click="goPage('1')">首页</span> 
            <span @click="goPage(pageData.nowPage - 1)">上一页</span>
            <span @click="goPage(pageData.nowPage + 1)">下一页</span>  
            &nbsp;
            <el-input
                type="text"
                size="mini"
                :value="pageData.nowPage"
                v-model="pageInput"
                class="page"
                >
            </el-input>
            &nbsp;页&nbsp;&nbsp;
            <el-button 
                type="text"  
                class="page"  
                style=" " 
                size="mini" 
                @click="goPage(pageInput)"  
                plain>确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        pageData:{
            type: Object,
            default:()=>{return {}}
        }
    },
    data() {
        return {
            pageInput: '1'
        }
    },
    methods:{
        goPage(page) {
            this.$parent.$parent.go(page)
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
.pagination_content span:hover {
    color: #409EFF;
}
</style>