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
                <el-form ref="ruleForm" :model="ruleForm"  :rules="rules" >
                    <el-form-item  prop="username"  class="reg-item" style="" >
                        <el-input  placeholder="请输入用户名(字母数字组合),开头为字母,6-12位数"  autocomplete="off" v-model.trim="ruleForm.username "></el-input>
                    </el-form-item>
                    <el-form-item  prop="mobile" class="reg-item">
                        <el-input type="phone"  placeholder="请输入11位中国大陆手机号"  v-model.trim="ruleForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item prop="verifi" class="reg-item" >
                        <el-input class="verifi-input"  placeholder="请输入验证码"  v-model.trim="ruleForm.verifi">
                             <el-button slot="append" @click="changeVerifi" >
                                <img :src="verifySrc" alt="">
                             </el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="smsCode" class="reg-item" >
                        <el-input class="verifi-input"  placeholder="请输入验证码"  v-model.trim="ruleForm.smsCode">
                            <template slot-scope="">
                                <el-button slot="append" @click="getCode"  >点击发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="password"  class="reg-item">
                        <el-input type="password" placeholder="请输入密码"  v-model.trim="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item   class="reg-item" prop="confirm_password">
                        <el-input type="password" placeholder="请再次输入密码"  v-model.trim="ruleForm.confirm_password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                        <el-input  placeholder="请输入推荐人,如果没有，可以不填写" v-model.trim="ruleForm.recommend"></el-input>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                       <el-checkbox  v-model="isAgree" >同意</el-checkbox> <a href="">《注册服务协议 》</a>
                        <router-link  class="fr login"  to="login" tag="a">[立即登录]</router-link>
                        <span  class="fr">已有账号</span >
                    </el-form-item>
                    <el-form-item  class="reg-item">
                            <el-button v-if="canSave" class="reg-btn" style="" @click="toRegister">同意协议并注册</el-button>
                            <el-button v-else disabled class="reg-btn"  >立即登录</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
        </div>
    </div>
</template>
<script>
import { mapActions,mapState ,mapGetters } from "vuex";
import {getSessionStorage} from '../../config/mUtils'
import md5 from 'js-md5';
export default {
        name: 'register',
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
                verifySrc: 'https://www-peizi-dev.e2048.com/index/account/verify',
                isAgree: true,
                canSave: true,
                ruleForm: {
                    username: '',
                    verifi: '',
                    mobile: '',
                    smsCode: '',
                    recommend: '',
                    password:'',
                    confirm_password:''
                },
                loginPwd: {
                    password:'',
                    confirm_password:'',
                },
                rules: {
                    password: [
                        { required: true, 
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/, 
                            message: '密码6-20位字母和数字组合',
                            max: 20,
                            min: 6,
                            trigger: 'blur' },
                    ],
                    confirm_password: [
                        { required: true, 
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/,
                            message: '密码6-20位字母和数字组合',
                            max: 20,
                            min: 6,
                            trigger: 'blur' },
                        { validator: checkPass, trigger: 'blur' }
                    ],
                    username: [
                        { required: true,  
                            pattern: /^[a-zA-Z][a-zA-Z0-9]{6,12}$/,
                            message: '用户名6-12位字母和数字组合',
                            max: 12,
                            min: 6,
                            trigger: 'blur' },
                    ],
                    mobile: [
                        {
                            required: true,
                            pattern: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/,
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
        methods:{
            ...mapActions(["login",'register','getVerify']),
            toRegister() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if(!this.canSave) return false
                        this.canSave = false
                        const a =  md5(this.ruleForm.password)
                        const b =  md5(this.ruleForm.confirm_password)
                        const md5Password = {
                            password: a,
                            confirm_password: b
                        }
                        this.register(Object.assign(this.ruleForm, md5Password))
                        this.canSave = true
                    } else {
                        console.log('error submit!!')
                    }
                });
            },
            changeVerifi() {
                this.verifySrc = 'https://www-peizi-dev.e2048.com/index/account/verify'
            },
            getCode() {
                console.log(3)
            },
            toLogin() {

            },
        },
        computed: {
            ...mapState(["userInfo","isLogin"]),
            ...mapGetters(['getUserInfo'])
        },
    }
</script>
<style lang="scss" scoped>
    .index {
        width: 100% !important;
        background-color: #fff;
        padding-bottom: 200px 
    }
    .reg-bg {
        background-size: 100% 100%;
        padding: 65px 0px 0 0px !important;
    }

</style>