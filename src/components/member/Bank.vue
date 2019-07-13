<template>
    <div class="bank_content" >
        <el-form ref="bankForm" label-width="100px" size="small "   :model="bankForm">
            <el-form-item label="持卡人" >
                {{bankForm.name}}
            </el-form-item>
            <el-form-item label="银行" >
                <el-select class="bank_input" v-model="bankForm.bankType"  placeholder="请选择">
                    <el-option
                    v-for="item in bankList"
                    :key="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="卡号" >
                <el-input  v-model="bankForm.bankNumber" class="bank_input"  placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="开户城市" >
                <el-select class="bank_city" v-model="bankForm.bankType"  placeholder="请选择">
                    <el-option
                    v-for="item in bankList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="bank_city" v-model="bankForm.bankType"  placeholder="请选择">
                    <el-option
                    v-for="item in bankList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码" >
                <span class="bank_city fl" >{{bankForm.bankPhone}}</span>
                <el-button class="bank_city "  type="warning" size="mini">获取短信验证码</el-button>
            </el-form-item>
            <el-form-item label="短信验证码" >
                 <el-input  v-model="bankForm.smsCode" class="bank_input"  placeholder="请输入短信验证码"></el-input>
            </el-form-item>
            <el-form-item v-if="prompt.length > 0" label="温馨提示" >
                 <p class="prompt" v-for="(item,index) in prompt" :key="index">
                    {{item}}
                 </p>
            </el-form-item>
            <el-form-item  >
                <el-button size="mini" @click="add(bankForm)"  type="warning">添加</el-button>
                <el-button  size="mini" @click="resetForm()" type="info" plain>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props:{
        bankForm: {
            type: Object,
            default: ()=> { return {} }
        },
        prompt: {
            type: Array,
            default: ()=> { return [] }
        },
        add: {
            type: Function,
        },
    },
    data() {
        return {
            bankList: [
                { value: "gongshang", name: "工商银行" },
                { value: "longye", name: "农业银行" },
                { value: "jianshe", name: "建设银行" },
                { value: "zhaoshang", name: "招商银行" },
                { value: "zhongguo", name: "中国银行" },
                { value: "pufa", name: "浦发银行" },
                { value: "zhongxin", name: "中信银行" },
                { value: "jiaotong", name: "交通银行" },
                { value: "minshen", name: "民生银行" },
                { value: "xingye", name: "兴业银行" },
                { value: "youzhen", name: "邮政银行" },
                { value: "guangda", name: "光大银行" },
                { value: "huaxia", name: "华夏银行" },
                { value: "zheshang", name: "浙商银行" },
                { value: "baoshang", name: "包商银行" },
                { value: "beijing", name: "北京银行" },
                { value: "shanghai", name: "上海银行" },
                { value: "hrb", name: "哈尔滨银行" },
                { value: "jiangsu", name: "江苏银行" },
            ],

        }
    },
    methods:{
        resetForm() {
            const obj = this.bankForm? this.bankForm: {}
            Object.keys(obj).forEach(function(key){
                if(key =='name' || key =='bankPhone') return false
                obj[key] =  ''
            });
            this.bankForm = obj
        },
        parentToDo() {
            console.log(this)
            this.$parent.toDoMore()
        }
    }
}
</script>
<style lang="scss" scoped>
    .bank_content {
        padding: 30px 0;
    }
    .bank_input {
        width: 322px !important;
    }
    .bank_city {
        width: 160px !important;
    }
    .prompt {
        color: #e25353;
    }

</style>