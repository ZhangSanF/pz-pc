<template>
    <div class="title" >
        <h2>{{infoTitle.title}}</h2>
        <div class="user-box-title-more" v-if="infoTitle.todu">
            <strong class="blue" @click="parentToDo">{{infoTitle.todu.title}}</strong>
        </div>
    </div>
</template>

<script>
export default {
        props:{
            infoTitle: {
                type: Object,
                default: function () { return {} }
            },
        },
        methods:{
            parentToDo() {
               this.$parent.toDoMore()
            }
        }
}
</script>

<style lang="scss" scoped>
.blue {
    color: #3181d8;float: left;height: 18px;line-height: 18px;margin-top: 20px;font-weight: 400;color: #3181d8;cursor: pointer;
}
.title{
    width: 964px;height: 50px;line-height: 60px;border-bottom: 2px solid #e0e0e0;position: relative;z-index: 0;background-color: #fff;margin: 0 auto;
    h2{
        font-size: 18px;font-weight: 700;height: 50px;overflow: hidden;color: #333;float: left;border-bottom: 2px solid gray;z-index: 1; 
    }
    .user-box-title-more{
        height: 50px;float: right; 
        a{
            color: #3181d8;
            strong{
                float: left;height: 18px;line-height: 18px;margin-top: 20px;font-weight: 400;color: #3181d8;cursor: pointer;
            }
        }
    }
}
</style>
