<template>
    <div class="index">
        <div class="body-container  reg-bg">
          <div class="register_main   clearfix">
                <div class="register_form clearfix"> 
                    <div class="logtit">
                        <h3 class="fl"><span>|</span>用户登录</h3>
                    <span class="fr">市场有风险，投资需谨慎</span> 
                    </div>
                </div>
            <div class="reg-form">
                <el-form ref="ruleForm" :model="ruleForm"  :rules="rules" >
                    <el-form-item  prop="username"  class="reg-item" style="" >
                        <el-input  placeholder="请输入用户名(字母数字组合)" autocomplete="off" v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="verifi" class="reg-item" >
                        <el-input class="verifi-input"  placeholder="请输入验证码" v-model="ruleForm.verifi">
                             <el-button slot="append" @click="changeVerifi" >
                                  <img :src="verifySrc" alt="">
                             </el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="password"  class="reg-item">
                        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                        <a  class="fr" href="">忘记密码</a>
                        <span  class="fl">没有账号</span >
                        <router-link  class="fl login"  to="register" tag="a">[立即注册]</router-link>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                            <el-button v-if="canSave" class="reg-btn"  @click="toLogin">立即登录</el-button>
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
import md5 from 'js-md5';
import {getSessionStorage} from '../../config/mUtils'
export default {
        name: 'login',
        data(){
            return{
                verifySrc: 'https://www-peizi-dev.e2048.com/index/account/verify',
                ruleForm: {
                    username: '',
                    verifi: '',
                    password:'',
                },
                canSave: true,
                rules: {
                    verifi: [
                            { required: true, 
                                pattern: /^\w{4}$/i,
                                message: '验证码4位数',
                                max: 4,
                                min: 4,
                                trigger: 'blur' },
                    ],
                    username: [
                        { required: true,  
                            pattern: /^[a-zA-Z][a-zA-Z0-9]{6,12}$/,
                            message: '用户名6-12位字母和数字组合',
                            max: 12,
                            min: 6,
                            trigger: 'blur' },
                    ],
                    password: [
                        { required: true, 
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/, 
                            message: '密码6-20位字母和数字组合',
                            max: 20,
                            min: 6,
                            trigger: 'blur' },
                    ],
                }
            }
        },
        methods:{
            ...mapActions(["login"]),
            toLogin() {
                this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if(!this.canSave) return false
                    this.canSave = false
                    const md5Password = {
                        password: md5(this.ruleForm.password),
                    }
                    console.log(md5Password)
                    const data = this.ruleForm
                    this.login(Object.assign(data, md5Password))
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
    }
   .reg-bg {
        background-size: 100% 100%;
        padding: 40px 0 100px 0 !important;
    }
   

</style>