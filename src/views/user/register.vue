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
                <el-form ref="ruleForm" :model="ruleForm"  :rules="rules"  >
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
                    <el-form-item prop="verifi" class="reg-item" >
                        <el-input  class="verifi-input"  placeholder="请输入验证码"   v-model.trim="ruleForm.verifi">
                             <el-button slot="append" @click="changeVerifi" >
                                <img :src="verifySrc" alt="">                              
                             </el-button>
                        </el-input>
                    </el-form-item>   
                    <el-form-item prop="smsCode" class="reg-item" >
                        <el-input  class="verifi-input"  placeholder="请输入验证码"  v-model.trim="ruleForm.smsCode">
                            <template slot-scope="">
                                <el-button slot="append" @click="getCode">点击发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>                    
                    <el-form-item  class="reg-item">
                        <el-input  placeholder="请输入推荐人,如果没有，可以不填写" v-model.trim="ruleForm.invitation_code"></el-input>
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
        <ActionsReg ref="mychild" :ruleForm="ruleForm"/>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { getUrlKey } from '@/js/utils'
import ActionsReg from '@/components/ActionsReg'

export default {
        name: 'register',
        components:{ ActionsReg },
        data(){
            let checkPass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return{
                verifySrc: '',
                isAgree: true,
                ruleForm: {
                    username: '',
                    verifi: '',
                    mobile: '',
                    smsCode: '',
                    invitation_code: '',//邀请码
                    agent_code: getUrlKey("agent_code") || '',//代理码(地址栏)
                    password:'',
                    confirm_password:''
                },
                rules: {
                    password: [
                        { required: true, 
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, 
                            message: '密码6-20位字母和数字组合',
                            max: 20,
                            min: 6,
                            trigger: 'blur' },
                    ],
                    confirm_password: [
                        { required: true, 
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                            message: '密码6-20位字母和数字组合',
                            max: 20,
                            min: 6,
                            trigger: 'blur' },
                        { validator: checkPass, trigger: 'blur' }
                    ],
                    username: [
                        { required: true,  
                            pattern: /^(?=.{6,16}$)[a-zA-Z]+[A-Za-z0-9_]+$/,
                            message: '用户名由6-16字母和数字和下划线组合且必须以字母开头',
                            max: 16,
                            min: 6,
                            trigger: 'blur' },
                    ],
                    mobile: [
                        {
                            required: true,
                            pattern: /^[1]([3-9])[0-9]{9}$/,
                            message: '手机号不正确',
                            max: 11,
                            min: 11,
                            trigger: 'blur'
                        },
                    ],
                    verifi: [
                            { required: true, 
                                pattern: /^\w{4}$/i,
                                message: '验证码4位数',
                                max: 4,
                                min: 4,
                                trigger: 'blur' },
                    ],
                    smsCode: [
                            { required: true, 
                                pattern: /^\w{6}$/i, 
                                message: '短信验证码限制6位',
                                max: 6,
                                min: 6,
                                trigger: 'blur' },
                    ],
                }
            }
        },
        created() {
            this.getVerifyFun()
        },
        methods:{
            ...mapActions(['getVerify']),
            toAbout(title, active) {
                this.$router.push('/user/about')
                this.$store.commit('ABOUT_QUERY', {id: '', title: title, active: active})
            },
            toRegister() {              
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {                      
                        if(!this.isAgree) return this.$message.error(`请勾选注册服务协议`);
                        // 执行子组件方法发请求
                        this.$refs.mychild.actionsReg()
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
            getCode() {}
        }
    }
</script>
<style lang="scss" scoped>
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