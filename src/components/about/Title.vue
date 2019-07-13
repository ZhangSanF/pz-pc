<template>
    <div class="title" >
        <h2>{{infoTitle}}</h2>
        <div class="user-box-title-more">
            <!-- <strong class="blue" @click="parentToDo">分享到：</strong> -->
        </div>
    </div>
</template>

<script>
export default {
        props:['infoTitle'],
        methods:{
            parentToDo() {
               this.$parent.toDoMore()
            }
        }
}
</script>

<style lang="scss" scoped>
.blue {
    float: left;
    height: 18px;
    line-height: 18px;
    margin-top: 20px;
    font-weight: 400;
    cursor: pointer;
}
.title{
    width: 100%;
    height: 50px;
    line-height: 60px;
    border-bottom: 2px solid #e0e0e0;
    position: relative;
    z-index: 0;
    background-color: #fff;margin: 0 auto;
    h2{
        height: 50px;
        overflow: hidden;
        color: #666;
        float: left;
        font: normal 22px/50px 'Microsoft Yahei';
        border-bottom: 2px solid#b31d23;
        z-index: 1; 
    }
    .user-box-title-more{
        height: 50px;
        float: right; 
        strong{
            float: left;
            padding-right: 100px;
            color: #333;
        }
    }
}
</style>
