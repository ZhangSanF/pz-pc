<template>
    <div class="index">
        <div class="  reg-bg">
          <div class="register_main   clearfix">
                <div class="register_form clearfix"> 
                    <div class="logtit">
                        <h3 class="fl"><span>|</span>新用户注册</h3>
                    <span class="fr">市场有风险，投资需谨慎</span> 
                    </div>
                </div>
            <div class="reg-form">
                <el-form ref="ruleForm" :model="ruleForm"  :rules="checkRules">
                    <el-form-item  prop="username" class="reg-item" >
                        <el-input  placeholder="请输入用户名" v-model.trim="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item  prop="password"  class="reg-item">
                        <el-input class="password-font" type="text"  placeholder="请输入密码"  v-model.trim="ruleForm.password" ></el-input>
                    </el-form-item>
                    <el-form-item   class="reg-item" prop="confirm_password">
                        <el-input class="password-font" type="text"  placeholder="请再次输入密码"  v-model.trim="ruleForm.confirm_password"></el-input>
                    </el-form-item>
                    <el-form-item  prop="mobile" class="reg-item">
                        <el-input  type="phone"  placeholder="请输入11位中国大陆手机号"  v-model.trim="ruleForm.mobile"></el-input>
                    </el-form-item>   
                    <el-form-item prop="mobile_verify_code" class="reg-item" >
                        <el-input  class="verifi-input"  placeholder="请输入手机验证码"  v-model.trim="ruleForm.mobile_verify_code">
                            <template slot-scope="">
                                <el-button slot="append" @click="getCode" v-if="isShowSmsCode == 'one'">点击发送验证码</el-button>
                                <el-button slot="append" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
                                <el-button slot="append" class="second" v-if="isShowSmsCode == 'three'">{{smsCodeNumber}}秒</el-button>
                                <el-button slot="append" @click="getCode" v-if="isShowSmsCode == 'four'">重新获取验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item> 
                    <el-form-item prop="captcha" class="reg-item" >
                        <el-input  class="verifi-input"  placeholder="请输入验证码"   v-model.trim="ruleForm.captcha">
                             <el-button slot="append" @click="changeVerifi" >
                                <img :src="verifySrc" alt="">                              
                             </el-button>
                        </el-input>
                    </el-form-item>                   
                    <el-form-item  class="reg-item">
                        <el-input  placeholder="请输入推荐人，如果没有，可以不填写" v-model.trim="ruleForm.invitation_code"></el-input>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                       <el-checkbox  v-model="isAgree" >同意</el-checkbox> 
                       <a href="javascript:void(0);" @click="toAbout('注册协议', '4')">《注册服务协议》</a>
                        <router-link  class="fr login"  to="login" tag="a">[立即登录]</router-link>
                        <span  class="fr" style="color: #333;">已有账号</span >
                    </el-form-item>
                    <el-form-item  class="reg-item">
                            <el-button class="reg-btn" @click="toRegister">同意协议并注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { getUrlKey } from '@/js/utils'
import { checkRules } from '@/config/rules.js'
import md5 from 'js-md5'

export default {
        name: 'register',
        data(){
            // let checkPass = (rule, value, callback) => {
            //     if (value === '') {
            //     callback(new Error('请再次输入密码'));
            //     } else if (value !== this.ruleForm.password) {
            //     callback(new Error('两次输入密码不一致!'));
            //     } else {
            //     callback();
            //     }
            // };
            return{
                checkRules: checkRules,
                isAgree: true,
                verifySrc: '',              
                isShowSmsCode: 'one',
                smsCodeNumber: 10,
                ruleForm: {
                    username: '',
                    captcha: '',
                    mobile: '',
                    mobile_verify_code: '',
                    invitation_code: '',//邀请码
                    agent_code: getUrlKey("agent_code") || '',//代理码(地址栏)
                    password:'',
                    confirm_password:''
                }                          
            }
        },
        created() {
            this.getVerifyFun()
        },
        methods:{
            ...mapActions(['getVerify', 'sendSmsCode', 'register', 'getMemberinfo']),
            toAbout(title, active) {
                this.$router.push('/user/about')
                this.$store.commit('ABOUT_QUERY', {id: '', title: title, active: active})
            },
            toRegister() {              
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {                      
                        if(!this.isAgree) return this.$message.error(`请勾选注册服务协议`);
                        if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
                            let reg = this.ruleForm
                            let actionData = {
                                username: reg.username,
                                captcha: reg.captcha,//图片验证码
                                mobile: reg.mobile,
                                mobile_verify_code: reg.mobile_verify_code,//短信验证码
                                invitation_code: reg.invitation_code,//邀请码
                                agent_code: reg.agent_code,//代理码(地址栏)
                                password: md5(reg.password),
                                confirm_password: md5(reg.confirm_password),
                            }
                            this.register(actionData).then(res=>{ 
                                if( res.code == 200) {
                                    this.$message.success(res.message)
                                    this.getMemberinfo()
                                    this.$store.commit('IS_LOGIN', true)
                                    this.$router.push({path:'/member'})
                                }else {
                                    this.getVerifyFun()
                                }
                            })
                        }else {
                            this.$message.error(`请点击发送手机验证码`);
                        }
                    }
                });
            },
            getVerifyFun() {
                this.getVerify().then((res) => {
                    let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                    this.verifySrc = imgUrl
                })
            },
            changeVerifi() {
                this.getVerifyFun()
            },
            //获取手机验证码
            getCode() {
                let _this = this
                let re = /^[1]([3-9])[0-9]{9}$/;
                if (re.test(_this.ruleForm.mobile)) {
                    _this.isShowSmsCode = 'two'
                    let obj = {
                        template: 'register',
                        mobile: _this.ruleForm.mobile
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
        }
    }
</script>
<style lang="scss" scoped>
    .second{
        padding: 0 50px;
    }
    .index {
        width: 100% !important;
        background-color: #fff;
        // padding-bottom: 200px 
    }
    .reg-bg {
        background: url(../../assets/image/login.jpg) no-repeat left top;
        background-size: 100% 100%;
        padding: 65px 0px !important;
    }
    .register_main{
        width: 600px;
        // margin: 0px auto 65px auto;
        background-color: #FFF;
        padding: 10px 30px 30px 30px;
        border-radius: 5px;
    }
.fr{
           color: #bebebe;
    font-size: 12px;
   }
   .login{
           color: #f77e76;
   }
</style>