<template>
    <div class="bank_content" >
        <el-form ref="bankForm" label-width="100px" size="small">
            <el-form-item label="持卡人" >
                {{getUserInfo.real_name}}
            </el-form-item>
            <el-form-item label="银行" >
                <el-select class="bank_input" v-model="bankForm.bank_name"  placeholder="请选择">
                    <el-option
                        v-for="(item, index) in getBankList"
                        :key="index"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="卡号" >
                <el-input  v-model.trim="bankForm.bank_card_number" class="bank_input"  placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="开户城市" >
                <area-select type="text" v-model="selectedCity" :data="pca" :placeholders="['请选择省','请选择市']"></area-select>
            </el-form-item>          
            <el-form-item label="开户行" >
                <el-input  v-model="bankForm.bank_branch_name" class="bank_input"  placeholder="请输入开户行"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" >
                <el-input  v-model.trim="bankPhone" class="bank_input"  placeholder="请输入手机号码"></el-input>
                <!-- <span class="bank_city fl" >{{getUserInfo.mobile}}</span> -->
            </el-form-item>
            <el-form-item label="短信验证码" >
                 <el-input  v-model.trim="bankForm.mobile_verify_code" class="bank_input"  placeholder="请输入短信验证码"></el-input>
                 <el-button @click="getVerify" v-if="isShowSmsCode == 'one'" size="mini" class="bank_city" type="warning">获取短信验证码</el-button>
                <el-button v-if="isShowSmsCode == 'two'" size="mini" class="bank_city" type="warning">短信发送中...</el-button>
                <el-button v-if="isShowSmsCode == 'three'" size="mini" class="bank_city" type="warning">验证码{{smsCodeNumber}}秒有效</el-button>
                <el-button @click="getVerify" v-if="isShowSmsCode == 'four'" size="mini" class="bank_city" type="warning">重新获取验证码</el-button>
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
import { mapGetters, mapActions } from "vuex";
import { pca } from 'area-data'; // v5 or higher

export default {
    inject: ['reload'],
    props:{
        prompt: {
            type: Array,
            default: ()=> { return [] }
        }
    },
    data() {
        return {
            selectedCity: [],
            pca: pca,
            bankForm: {
                bank_name: '', //开户银行
                bank_card_number: '',//卡号
                bank_province: '',//省
                bank_city: '',//市
                bank_branch_name: '',//支行名称
                mobile_verify_code: ''//短信验证码
            },
            bankPhone: '',
            isShowSmsCode: 'one',
            smsCodeNumber: 10
        }
    },
    methods:{
        ...mapActions(['bindBankCard', 'sendSmsCode']),
        resetForm() {
            const obj = this.bankForm? this.bankForm: {}
            Object.keys(obj).forEach(function(key){
                if(key =='name' || key =='bankPhone') return false
                obj[key] =  ''
            });
            this.bankForm = obj
            this.bankPhone = ''
        },
        add(obj) {
            if(
                !obj.bank_name || 
                !obj.bank_card_number || 
                !obj.bank_province ||
                !obj.bank_city ||
                !obj.bank_branch_name ||
                !obj.mobile_verify_code
            ) {
                this.$alert('请填写完整信息');
                return
            }

            // if(obj.bank_name == '') {
            //     this.$message({type: "error", message: "开户银行不能为空"})
            //     return false
            // }
            // let regex = /^([1-9]{1})(\d{15}|\d{18})$/
            // if(obj.bank_card_number == '' || !regex.test(obj.bank_card_number)) {
            //     this.$message({type: "error", message: "请填写正确的银行卡号"})
            //     return false
            // }
            // if(obj.bank_province == '' || obj.bank_city == '') {
            //     this.$message({type: "error", message: "开户城市不能为空"})
            //     return false
            // }
            // if(obj.bank_branch_name == '') {
            //     this.$message({type: "error", message: "开户行不能为空"})
            //     return false
            // }
            // if(this.smsCode == '') {
            //     this.$message({type: "error", message: "验证码不能为空"})
            //     return false
            // }

            this.bindBankCard(obj).then((res) => {
                if(res.code == 200) {
                    this.$message.success(res.message)
                    this.$store.commit('ADD_BANK', {bank_card_number: res.data.bank_card_number, bank_name: res.data.bank_name})
                    this.reload()
                }
                // else {
                //     this.$message.error(`${res.message}`);
                // }
            })
        },
        // 获取短信验证码
        getVerify() {
            let _this = this
            let re = /^[1]([3-9])[0-9]{9}$/;
            if (re.test(_this.bankPhone)) {
                _this.isShowSmsCode = 'two'
                let obj = {
                    template: 'bank_card',
                    mobile: _this.bankPhone
                }
                _this.sendSmsCode(obj).then((res) => {
                    if(res.code == 200) {
                        _this.$message.success(res.message)
                        _this.isShowSmsCode = 'three'
                        let _run = () => {
                            setTimeout(() => {
                                _this.smsCodeNumber--
                                if (_this.smsCodeNumber > 0) {
                                    _run();
                                } else {
                                    _this.isShowSmsCode = 'four'
                                    _this.smsCodeNumber = 10
                                }
                            }, 1000);
                        };
                        _run();
                    }else {
                        _this.isShowSmsCode = 'one'
                        // this.$message.error(`${res.message}`);
                    }
                })
            }
        },
    },
    computed: {
        ...mapGetters(['getUserInfo', 'getBankList'])
    },
    watch:{
        'selectedCity': {
            handler(val, b) {
                this.bankForm.bank_province = val[0]
                this.bankForm.bank_city = val[1]
            },
            deep: true
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
<style lang="scss">
.bank_content{
    .area-select-wrap .area-select{
        margin-left: 0;
    }
    .area-select .area-selected-trigger{
        padding:0 0 0 10px
    }
    .area-selectable-list-wrap{
        margin: 0;
        top: 34px !important;
    }
}
</style>
