<template>
    <div class="step-style">
        <div class="options-step">
            <div class="options-step-con clearfix">
                <span :class="nowStep>0?'options-step-current': 'options-step-next' ">
                    验证原手机号码
                    <strong>1</strong>
                </span>
                <span :class="nowStep>1?'options-step-current': 'options-step-next' ">
                    验证新手机号码
                    <strong>2</strong>
                </span>
                <span :class="nowStep>2?'options-step-current': 'options-step-next' ">
                    成功
                    <strong>3</strong>
                </span>
            </div>
        </div>
        <div  class="form-style-1 clearfix"  v-show="nowStep == 1">
            <!-- 通过原手机号码重置:model="phoneStep" -->
            <el-form v-if="!isEncrypted" class="step1-form" label-width="200px" >
                <el-form-item label="原手机号码">
                    <el-input size="mini" class="step-input" v-model.trim="phoneStep.mobile"></el-input>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'one'">获取短信验证码</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'three'">验证码{{smsCodeNumber}}秒有效</el-button>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'four'">重新获取验证码</el-button>
                </el-form-item>
                <el-form-item label="短信验证码">
                    <el-input size="mini" class="step-input" v-model.trim="phoneStep.mobile_verify_code"></el-input>
                </el-form-item>
            </el-form>
            <!-- 通过密保重置 -->
            <el-form v-else class="step1-form" label-width="200px" ref="pwdSafe2">
                <el-form-item label="当前密保问题">
                    <el-input size="mini" :value="getUserInfo.password_protection[0]" disabled class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="请输入答案">
                    <el-input size="mini" v-model="pwdSafe2.valueOne" class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="当前密保问题">
                    <el-input size="mini" :value="getUserInfo.password_protection[1]" disabled class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="请输入答案">
                    <el-input size="mini" v-model="pwdSafe2.valueTwo" class="step-input"></el-input>
                </el-form-item>
            </el-form>
            <el-form class="step1-form" label-width="200px">
                <el-form-item>
                    <el-button size="mini" class="step-btn" @click="nextStep(1)" >下一步</el-button>
                    <el-button size="mini"  @click="showIPone">{{isEncrypted ? '通过原手机号重置' : '通过密保重置'}}</el-button>
                </el-form-item>
            </el-form>         
        </div>
        <!-- 验证新手机号码 -->
        <div  class="form-style-1 clearfix" v-show="nowStep == 2">
            <el-form class="step1-form" label-width="200px">
                <el-form-item label="新手机号码">
                    <el-input size="mini" class="step-input" v-model.trim="phoneStep.mobile"></el-input>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'one'">获取短信验证码</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'three'">验证码{{smsCodeNumber}}秒有效</el-button>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'four'">重新获取验证码</el-button>
                </el-form-item>
                <el-form-item label="短信验证码">
                    <el-input size="mini" class="step-input" v-model.trim="phoneStep.mobile_verify_code"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini"  class="step-btn" @click="newIfone(2)" >下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--手机认证 end-->
        <div id="phoneCon_succe" class="form-style-1 clearfix" style="text-align: center;" v-show="nowStep == 3">
            <div class="user-safety-options-succeed clearfix">
                <span class="user-safety-options-succeed-true">&nbsp;</span>
                <span class="user-safety-options-succeed-txt" id="switch">您的手机号已设置成功</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    inject: ['reload'],
    data() {
        return{
            nowStep:1,
            isShowSmsCode: 'one',
            smsCodeNumber: 10,
            isEncrypted: false,
            pwdSafe2:{
                valueOne:'',
                valueTwo:''
            },
            phoneStep: {
                mobile: '',
                mobile_verify_code: ''
            },
            newSetPhone: {
                type: '',//1手机号，2密保
                oldMobile: '',//原手机号
                newMobile: '',//新手机号
                oldCode: '',//原手机的验证码
                newCode: ''//新手机的验证码
            }
        }
    },
    methods: {
        ...mapActions(['sendSmsCode', 'verifySmsCode', 'changeMobile', 'verifyProtection']),
        // 显示密保验证和手机号码验证
        showIPone() {
            this.isEncrypted = !this.isEncrypted
        },
        // 获取短信验证码
        getVerify() {
            let _this = this
            let re = /^[1]([3-9])[0-9]{9}$/;
            if (re.test(_this.phoneStep.mobile)) {
                _this.isShowSmsCode = 'two'
                let obj = {
                    template: 'modify_mobile',
                    mobile: _this.phoneStep.mobile
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
        nextStep(i) {
            // 密保验证
            if(this.isEncrypted == true) {
                if(this.pwdSafe2.valueOne == '' || this.pwdSafe2.valueTwo == '') {
                    return this.$message.error(`请填写完整信息`);
                }
                let obj = {
                    [this.getUserInfo.password_protection[0]]: this.pwdSafe2.valueOne,
                    [this.getUserInfo.password_protection[1]]: this.pwdSafe2.valueTwo
                }
                const params = {
                    protection: JSON.stringify(obj)
                }
                this.verifyProtection(params).then(res => {
                    if(res.code == 200) {
                        // 第一步后存 密保问题
                        this.newSetPhone.type = 2                
                        this.newSetPhone.password_protection = JSON.stringify(obj)
                        this.nowStep = i + 1
                    }
                    // else {
                    //     this.$message.error(`${res.message}`);
                    // }
                })   
            }else {//原手机号码验证
                if(this.phoneStep.mobile == '' || this.phoneStep.mobile_verify_code == '') {
                    return this.$message.error(`请填写完整信息`);
                }
                if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
                    this.verifySmsCode(this.phoneStep).then(res => {
                        if(res.code == 200) {
                            // 第一步后存 原手机号和验证码
                            this.newSetPhone.type = 1
                            this.newSetPhone.oldMobile = this.phoneStep.mobile
                            this.newSetPhone.oldCode = this.phoneStep.mobile_verify_code
                            // 把原有数据置空
                            this.phoneStep.mobile = ''
                            this.phoneStep.mobile_verify_code = ''
                            this.isShowSmsCode = 'one'
                            this.nowStep = i + 1
                        }
                        // else {
                        //     this.$message.error(`${res.message}`);
                        // }
                    })
                }else {
                    return this.$message.error(`请获取短信验证码`);
                }
            }
        },
        newIfone(i) {
            if(this.phoneStep.mobile == '' || this.phoneStep.mobile_verify_code == '') {
                return this.$message.error(`请填写完整信息`);
            }
            if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
                this.verifySmsCode(this.phoneStep).then(res => {
                    if(res.code == 200) {
                        // 第二步后存 新手机号和验证码
                        this.newSetPhone.newMobile = this.phoneStep.mobile
                        this.newSetPhone.newCode = this.phoneStep.mobile_verify_code
                        // 把原有数据置空
                        this.phoneStep.mobile = ''
                        this.phoneStep.mobile_verify_code = ''
                        this.changeMobile(this.newSetPhone).then(res => {
                            if(res.code == 200) {
                                this.isShowSmsCode = 'one'
                                this.nowStep = i + 1
                                let phone = this.newSetPhone.newMobile.slice(0,3) + '****' + this.newSetPhone.newMobile.slice(-4)
                                this.$store.commit('SET_MOBILE', phone)
                                this.newSetPhone = {}
                                // this.reload()
                            }
                            // else {
                            //     this.$message.error(`${res.message}`);
                            // }
                        })
                    }else {
                        // this.$message.error(`${res.message}`);
                    }
                })
            }else {
                return this.$message.error(`请获取短信验证码`);
            }
        }
    },
    computed:{
        ...mapGetters(['getUserInfo']),
    }
}
</script>

<style lang="scss" scoped>
    .form-style-1 {
        padding: 15px 0 30px;
    }
    .step1-form {
        margin: 0 auto;
        width: 700px;
    }
    .options-step {
        height: 48px;
        position: relative;
        border-bottom: 5px solid #dadada;
        font-size: 12px;
        line-height: 40px;
    }
    .options-step-con {
        width: 535px;
        height: 48px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0; 
        margin: auto;
        position: absolute;
    }
    .options-step-current {
        border-bottom: 5px solid #fe6e00;
        color: #fe6e00;
        float: left;
        position: relative;
        width: 33%;
        text-align: center;
        height: 48px;
    }
    .options-step-current strong {
        background: #fe6e00;
        display: block;
        width: 20px;
        height: 20px;
        margin: 0 auto;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
    }
    .options-step-next {
        float: left;
        position: relative;
        width: 33%;
        text-align: center;
        height: 48px;
        strong {
            background: #dadada;
            display: block;
            width: 20px;
            height: 20px;
            margin: 0 auto;
            line-height: 20px;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
        }
    }
    .step-btn {
        background: #fe7b20;
            color: #fff;
    }
    .step-input {
        width: 200px;
    }
</style>
<style lang="scss">
.step-style{
    .el-form-item{
        margin-bottom: 12px
    }
    .el-form-item__error{
        padding-top: 0;
    }
}
</style>
