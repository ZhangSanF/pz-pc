<template>
    <div class="warm clearfix" v-if="warmData.length > 0">
        <p class="warm-title">温馨提示：</p>
        <p v-for="(item,index) in warmData" :key="index">
            {{index + 1}}. &nbsp;&nbsp;{{item}}
        </p>
    </div>
</template>

<script>
export default {
        props:{
            warmData: {
                type: Array,
                default: function () { return [] }
            },
        },
}
</script>

<style lang="scss" scoped>
    .warm {
        clear: both;
        background: none repeat scroll 0 0 #fffadc;
        border: 1px solid #e3b367;
        padding: 10px 20px;
        line-height: 24px;
        color: #666;
        font-size: 12px;
        margin:0 auto; 
        margin-top:20px;
        .warm-title {
            color: #b73736;
            font-weight: 700;
        }
    }
</style>
