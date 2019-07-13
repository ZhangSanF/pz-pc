<template>
    <div  class="safe_content" >
        <div class="safe-lable ">
            <span class="icon-tanhao" v-if="safeList.value == '未设置'"></span>
            <span class="icon-check" v-if="safeList.value !== '未设置'"></span>
            <span>{{safeList.lable}}</span>
        </div>
        <div class="safe-value">
            <span :class="safeList.value == '未设置'?' isSet':''">{{safeList.value?safeList.value:'&nbsp;'}}</span>
        </div>
        <div class="safe-edit fr" v-if="showEdit"  @click="show(safeList.lable)" >
            <span class="options-state" v-if="safeList.value !== '未设置'">{{safeList.showEdit ? '取消修改':'修改'}} </span>
            <span class="options-state" v-else-if="safeList.value == '未设置'">{{safeList.showEdit ? '修改':'设置'}} </span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        safeList: {
            type: Object,
            default: ()=> { return {} }
        },
        showEdit:{
            type:Boolean,
            default:() =>{ return false}
        }
    },
    data() {
    },
    methods:{
        show(a) {
            console.log(a)
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
    .user-box-con-1 {
        width: 964px;
        margin: 0 auto;
        padding: 30px 0;
    }
    .safe_content {
        border-bottom: 1px solid #e0e0e0;
        line-height: 60px;
        font-size: 14px;
        .safe-lable {
            display: inline-block;
            width: 140px;
        }
        .safe-value{
             display: inline-block;
        }
        .safe-edit{
             margin-right: 100px
        }
    }
    .icon-check{
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        background: url('../../assets/image/user_sprite.png') no-repeat -17px -842px;
    }
    .icon-tanhao {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        background: url('../../assets/image/user_sprite.png');
        background-repeat: no-repeat;
        background-position: 0 -842px;
    }
    .isSet {
        color: #d53838;
    }
    .options-state {
        width: 60px;
        height: 60px;
        overflow: hidden;
        color: #3181d8;
        cursor: pointer;
        text-align: right;
    }
    .edit {
        transition: height 2s ;
        -webkit-transition: height 2s; /* Safari prior 6.1 */
    }
    .service {
        margin-right: 20px
    }
    .user-safety-options-edit {
        position: relative;
        border: 1px solid #e0e0e0;
        background: #f5f5f5;
    }
    .step-btn {
        background: #fe7b20;
            color: #fff;
    }
    .step-input {
        width: 200px;
    }
    .step1-form {
        margin: 0 auto;
        padding: 30px 0 ;
        width: 700px;
    }
    .zcgl{
        height: 300px;overflow: hidden;
    }
    .zcgl-enter-active, .zcgl-leave-active {
        transition: opacity .5s;
        // transition: height .5s
    }
    .zcgl-enter, .zcgl-leave-active {
        height: 0
    }
    .succeed{
        line-height: 38px;
        text-align: center;
        height: 40px;
        margin-top: 40px;
        padding: 15px 0 30px;
    }
    .succeed-true{
        position: absolute;
        background-image: url('../../assets/image/user_sprite.png');
        background-repeat: no-repeat;
        background-position: -60px -20px;
        width: 38px;
        height: 40px;
        left : 38%;
        line-height: 40px;
    }
    .succeed-txt{
        font-size:18px;
        color: #333;
        height: 40px;
        font-weight: 700;
    }
</style>