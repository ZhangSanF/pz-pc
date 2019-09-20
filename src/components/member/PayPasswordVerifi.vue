<template>
  <div>
      <!-- 设置支付密码 -->
    <el-form
        class="step1-form" 
        size="mini"
        v-if="!isRetrieve && !getUserInfo.is_pay_password "
        label-width="200px">
        <el-form-item label="设置支付密码">
            <el-input size="mini" v-model.trim="setPayPwdForm.payPwd" class="step-input password-font" placeholder="请输入支付密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入支付密码">
            <el-input size="mini"  v-model.trim="setPayPwdForm.againPayPwd" class="step-input password-font" placeholder="请再次输入支付密码"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button size="mini"  class="step-btn" @click="setPayPwd(1)" >设置支付密码</el-button>
        </el-form-item>
    </el-form>
    <!-- 修改支付密码 -->
    <el-form 
        size="mini"
        label-width="200px"
        v-if="!isRetrieve && getUserInfo.is_pay_password"
        class="step1-form">
        <el-form-item label="原支付密码">
            <el-input size="mini" v-model.trim="modifyPayPwdForm.oldPassword" class="step-input password-font" placeholder="请输入原支付密码"></el-input>
        </el-form-item>
        <el-form-item label="新支付密码">
            <el-input size="mini"  v-model.trim="modifyPayPwdForm.newPassword" class="step-input password-font" placeholder="请输入新支付密码"></el-input>
        </el-form-item>
        <el-form-item label="确认支付密码">
            <el-input size="mini"  v-model.trim="modifyPayPwdForm.confirmNewPassword" class="step-input password-font" placeholder="请再次输入新支付密码"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button size="mini"  class="step-btn" @click="modifyPayPwd()" >修改支付密码</el-button>
            <el-button size="mini"   @click="retrievePayPwd(true)" >找回支付密码</el-button>
        </el-form-item>
    </el-form >
    <!-- 找回支付密码 -->
    <el-form class="step1-form" v-if="isRetrieve" label-width="200px">
        <el-form-item label="手机号码">
            <span class="bank_city fl" >{{getUserInfo.mobile}}</span>
            <!-- <el-input v-model.trim="findPayPwd.mobile" placeholder="请输入手机号码"  class="step-input" size="mini"></el-input> -->
        </el-form-item>
        <el-form-item label="手机验证码">
            <el-input v-model.trim="findPayPwd.mobile_verify_code" placeholder="请输入手机验证码" size="mini" class="step-input" ></el-input>
            <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'one'">获取短信验证码</el-button>
            <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
            <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'three'">验证码{{smsCodeNumber}}秒有效</el-button>
            <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'four'">重新获取验证码</el-button>
        </el-form-item>
        <el-form-item label="新支付密码">
            <el-input v-model.trim="findPayPwd.pay_password" placeholder="请输入新支付密码" size="mini" class="step-input password-font"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button size="mini" class="step-btn" @click="fondPayPwdAction()">修改支付密码</el-button>
            <el-button size="mini" @click="retrievePayPwd(false)" >取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import md5 from 'js-md5';
import { payPassword, rePhone, reChinese, smsCodeNumber } from '@/config/rules.js'

export default {
    inject: ['reload'],
    data() {
        return {
            isRetrieve: false,
            isShowSmsCode: 'one',
            smsCodeNumber: smsCodeNumber, 
            //设置支付密码
            setPayPwdForm:{
                oldPwd:'',
                payPwd:'',
                againPayPwd:''
            },
            //修改支付密码
            modifyPayPwdForm:{
                oldPassword:'',
                newPassword:'',
                confirmNewPassword:''
            },
            // 找回支付密码
            findPayPwd: {
                // mobile: '',
                pay_password: '',
                mobile_verify_code: ''
            },
        }
    },
    methods: {
        ...mapActions(['setPayPassWord', 'retrievepayPassWord', 'sendSmsCode']),
        //找回密码
        retrievePayPwd(a) {
            this.isRetrieve =  a
        }, 
        //设置支付密码
        setPayPwd() {
            if(this.setPayPwdForm.payPwd == '' || this.setPayPwdForm.againPayPwd == '') {return this.$message.error(`请填写完整信息`);}
            if(payPassword.test(this.setPayPwdForm.payPwd) && payPassword.test(this.setPayPwdForm.againPayPwd)) {
                const params = {
                    oldPassword: '',
                    newPassword: md5(this.setPayPwdForm.payPwd),
                    confirmNewPassword: md5(this.setPayPwdForm.againPayPwd)
                }
                this.setPayPassWord(params).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.message)
                        this.$store.commit('PAY_PASS', {is_pay_password: true})
                        this.reload()
                    }
                })
            }else {
                this.$message.error(`支付密码必须由6-20位字母和数字符号之间的两种组合`)
            }
        }, 
        //修改支付密码
        modifyPayPwd() {
            if(this.modifyPayPwdForm.oldPassword == '' || this.modifyPayPwdForm.newPassword == '' || this.modifyPayPwdForm.confirmNewPassword == '') {
                return this.$message.error(`请填写完整信息`);
            }
            if(
                payPassword.test(this.modifyPayPwdForm.oldPassword) && 
                payPassword.test(this.modifyPayPwdForm.newPassword) && 
                payPassword.test(this.modifyPayPwdForm.confirmNewPassword)) {
                    const params = {
                        oldPassword: md5(this.modifyPayPwdForm.oldPassword),
                        newPassword: md5(this.modifyPayPwdForm.newPassword),
                        confirmNewPassword: md5(this.modifyPayPwdForm.confirmNewPassword)
                    }
                    this.setPayPassWord(params).then(res=>{
                        if(res.code == 200){
                            this.$message.success(res.message)
                            this.$store.commit('PAY_PASS', {is_pay_password: true})
                            this.reload()
                        }
                    })
            }else {
                this.$message.error(`支付密码必须由6-20位字母和数字符号之间的两种组合`)
            }
        },
        // 找回支付密码
        fondPayPwdAction() {
            if(this.findPayPwd.pay_password == '' || this.findPayPwd.mobile_verify_code == '') {
                return this.$message.error(`请填写完整信息`);
            }
            if(payPassword.test(this.findPayPwd.pay_password)) {
                if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
                    const params = {
                        pay_password: md5(this.findPayPwd.pay_password),
                        mobile_verify_code: this.findPayPwd.mobile_verify_code
                    }
                    this.retrievepayPassWord(params).then(res=>{
                        if(res.code == 200){
                            this.$message.success(res.message)
                            this.reload()
                        }
                    })
                }else {
                    this.$message.error(`请获取短信验证码`);
                }
            }else {
                this.$message.error(`支付密码必须由6-20位字母和数字符号之间的两种组合`)
            }
        },
        // 获取短信验证码
        getVerify() {
            let _this = this
            let obj = {
                template: 'retrieve_pay_password',
                member_id: this.getUserInfo.id
            }
            // if (rePhone.test(obj.mobile)) {
                _this.isShowSmsCode = 'two'               
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
                                    _this.smsCodeNumber = smsCodeNumber
                                }
                            }, 1000);
                        };
                        _run();
                    }else {
                        _this.isShowSmsCode = 'one'
                    }
                })
            // }else {
            //     this.$message.error(`请输入正确的手机号`);
            // }
        }, 
    },
    computed: {
        ...mapGetters(['getUserInfo']),
    },
    watch: {
        // 去掉中文双字节字符
        'setPayPwdForm.payPwd': {
            handler(newVal, old) {
                this.setPayPwdForm.payPwd = newVal.replace(reChinese,'');
            },
            deep: true
        },
        // 去掉中文双字节字符
        'setPayPwdForm.againPayPwd': {
            handler(newVal, old) {
                this.setPayPwdForm.againPayPwd = newVal.replace(reChinese,'');
            },
            deep: true
        },
        // 去掉中文双字节字符
        'modifyPayPwdForm.oldPassword': {
            handler(newVal, old) {
                this.modifyPayPwdForm.oldPassword = newVal.replace(reChinese,'');
            },
            deep: true
        },
        // 去掉中文双字节字符
        'modifyPayPwdForm.newPassword': {
            handler(newVal, old) {
                this.modifyPayPwdForm.newPassword = newVal.replace(reChinese,'');
            },
            deep: true
        },
        // 去掉中文双字节字符
        'modifyPayPwdForm.confirmNewPassword': {
            handler(newVal, old) {
                this.modifyPayPwdForm.confirmNewPassword = newVal.replace(reChinese,'');
            },
            deep: true
        },
        // 去掉中文双字节字符
        'findPayPwd.pay_password': {
            handler(newVal, old) {
                this.findPayPwd.pay_password = newVal.replace(reChinese,'');
            },
            deep: true
        },
    }
}
</script>

<style lang="scss" scoped>
    .step-input {
            width: 200px;
    }
    .step1-form {
        margin: 0 auto;
        padding: 30px 0 ;
        width: 700px;
    }
    .step-btn {
        background: #fe7b20;
            color: #fff;
    }
</style>