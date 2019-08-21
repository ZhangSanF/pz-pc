<template>
    <div class="index">
        <div class="body-container  reg-bg">
          <div class="register_main   clearfix">
                <div class="register_form clearfix"> 
                    <div class="logtit">
                        <h3 class="fl"><span>|</span>找回密码-重置密码</h3>
                    <span class="fr">市场有风险，投资需谨慎</span> 
                    </div>
                </div>
            <div class="reg-form find-password">
                <el-form ref="findPassword" :rules="checkRules" :model="resetPassword">
                    <el-form-item class="reg-item">
                        <span class="text">手机号</span>
                        <span class="rcf-txt-value">{{getUserPhone}}</span>
                    </el-form-item>  
                    <el-form-item class="reg-item" prop="username">
                        <span class="text">用户名</span>
                        <el-input  placeholder="请输入用户名" v-model.trim="resetPassword.username"></el-input>
                    </el-form-item>  
                    <el-form-item class="reg-item" prop="password">
                        <span class="text">新密码</span>
                        <el-input  placeholder="请输入新密码" v-model.trim="resetPassword.password" class="password-font"></el-input>
                    </el-form-item>                      
                    <el-form-item class="reg-item" prop="mobile">
                        <span class="text">手机号</span>
                        <el-input  placeholder="请重新输入手机号" v-model.trim="resetPassword.mobile"></el-input>
                    </el-form-item>                   
                    <el-form-item class="reg-item" prop="mobile_verify_code">
                        <span class="text">验证码</span>
                        <el-input  class="verifi-input"  placeholder="请输入手机验证码"  v-model.trim="resetPassword.mobile_verify_code">
                            <template slot-scope="">
                                <el-button slot="append" @click="getCode" v-if="isShowSmsCode == 'one'">点击发送验证码</el-button>
                                <el-button slot="append" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
                                <el-button slot="append" class="second" v-if="isShowSmsCode == 'three'">{{smsCodeNumber}}秒</el-button>
                                <el-button slot="append" @click="getCode" v-if="isShowSmsCode == 'four'">重新获取验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                        <el-button v-if="canSave" class="reg-btn" @click="resetAction">重置密码</el-button>
                        <el-button v-else disabled class="reg-btn">重置密码</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    import { checkRules } from '@/config/rules.js'
    import md5 from 'js-md5';

    export default {
        data(){
            return{
                checkRules: checkRules,
                rePhone: /^[1]([3-9])[0-9]{9}$/,//手机号码
                canSave: true,
                isShowSmsCode: 'one',
                smsCodeNumber: 10,
                resetPassword: {
                    username: '',
                    password: '',
                    mobile: '',
                    mobile_verify_code: ''
                }              
            }
        },
        created() {
            
        },
        methods:{
            ...mapActions(['sendSmsCode', 'retrievePassword']),
            resetAction() {
                this.$refs['findPassword'].validate((valid) => {
                    if (valid) {                      
                        if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
                            this.canSave = false
                            let obj = Object.assign(this.resetPassword, {password: md5(this.resetPassword.password)})
                            this.retrievePassword(obj).then(res => {
                                if(res.code == 200) {
                                    this.canSave = true
                                    this.$alert('密码重置成功!')
                                    this.$router.push('/user/login')
                                }else {
                                    this.canSave = true
                                    // this.$message.error(res.message);
                                }
                            })
                        }else {
                            this.$message.error(`请点击发送手机验证码`);
                        }
                    }
                });
            },
            //获取手机验证码
            getCode() {
                let _this = this
                if (_this.rePhone.test(_this.resetPassword.mobile)) {
                    _this.isShowSmsCode = 'two'
                    let obj = {
                        template: 'retrieve_password',
                        mobile: _this.resetPassword.mobile
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
            }
        },
        computed: {
            ...mapGetters(['getUserPhone'])
        }
    }
    
</script>

<style lang="scss" scoped>
    .rcf-txt-value{
        // float: left;
        // height: 42px;
        // line-height: 42px;
        // width: 358px;
        font-size: 18px;
        font-weight: bold;
    }
    .text{
        display: inline-block;width: 20%;
    }
    .index {
        width: 100% !important;
         background-color: #fff;
    }
   .reg-bg {
        background: url(../../assets/image/login.jpg) no-repeat left top;
        background-size: 100% 100%;
        height: 550px;
        padding: 65px 0px 65px 0px;
        // background-size: 100% 100%;
        // padding: 40px 0 100px 0 !important;
    }
   .register_main{
        width: 600px;
        margin: 0px auto 0px auto;
        background-color: #FFF;
        padding: 10px 30px 30px 30px;
        border-radius: 5px;
   }
   .fr{
           color: #bebebe;
    font-size: 12px;
   }
</style>
<style lang="scss">
.find-password{    

    .el-input{
        width: 75%;
    }
    .el-form-item__error{
          left: 88px;
    }
}
</style>