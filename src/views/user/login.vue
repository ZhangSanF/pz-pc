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
            <div class="reg-form" ref="inputEle">
                <el-form ref="loginForm" :model="loginForm" :rules="checkRules">
                    <el-form-item  prop="username"  class="reg-item" >
                        <el-input  placeholder="请输入用户名" v-model.trim="loginForm.username"></el-input>
                    </el-form-item>                   
                    <el-form-item  prop="password"  class="reg-item">
                        <el-input class="password-font" type="text" placeholder="请输入密码" v-model.trim="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha" class="reg-item" v-if="getSettingSys.close_login_captcha !== '1'">
                        <el-input class="verifi-input"  placeholder="请输入验证码" v-model.trim="loginForm.captcha">
                             <el-button slot="append" @click="changeVerifi" >
                                  <img :src="verifySrc" alt="">
                             </el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                        <router-link style="color: #333;" class="fr" to="/user/findPassword" tag="a">忘记密码</router-link>
                        <span  class="fl">没有账号</span >
                        <router-link  class="fl login"  to="register" tag="a">[立即注册]</router-link>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                            <el-button v-if="canSave" class="reg-btn"  @click="toLogin">立即登录</el-button>
                            <el-button v-else disabled class="reg-btn">立即登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import md5 from 'js-md5';
import { checkRules, reChinese } from '@/config/rules'
import { noOnCopy } from "@/config/miXin"

export default {
    name: 'login',
    mixins:[noOnCopy],
    data(){
        return{
            canSave: true,
            checkRules: checkRules,
            verifySrc: '',
            loginForm: {
                username: '',
                captcha: '',
                password:''
            }               
        }
    },
    created() {
        this.getVerifyFun()
    },
    methods:{
        ...mapActions(["login", 'getMemberinfo', 'getVerify']),
        toLogin() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    if(!this.canSave) return false
                    this.canSave = false
                    const md5Password = {
                        password: md5(this.loginForm.password),
                    }
                    const data = this.loginForm
                    // console.log(md5Password)
                    this.login(Object.assign(data, md5Password)).then((res) => {
                        if(res.code == 200) {
                            this.$message.success(`登录成功`)
                            // 获取个人信息
                            this.getMemberinfo()
                            this.$store.commit('IS_LOGIN', true)
                            let redirect = ''
                            // 获取拦截路由
                            if(Object.keys(this.$route.query).length !== 0) {
                                redirect = this.$route.query.redirect
                            }else {
                                redirect = '/member'
                            }
                            this.$router.push(redirect)
                            this.canSave = true
                        }else {
                            this.canSave = true
                            this.loginForm = {}
                            this.getVerifyFun()
                        }
                    })
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
        }
    },
    computed: {
        ...mapGetters(['getSettingSys'])
    },
    watch: {
        // 去掉中文双字节字符
        'loginForm.password': {
            handler(newVal, old) {
                this.loginForm.password = newVal.replace(reChinese,'');
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>   
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

