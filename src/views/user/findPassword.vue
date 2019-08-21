<template>
    <div class="index">
        <div class="body-container  reg-bg">
          <div class="register_main   clearfix">
                <div class="register_form clearfix"> 
                    <div class="logtit">
                        <h3 class="fl"><span>|</span>找回密码-输入登录账号</h3>
                    <span class="fr">市场有风险，投资需谨慎</span> 
                    </div>
                </div>
            <div class="reg-form find-password">
                <el-form ref="eloginForm" :model="loginForm"  :rules="checkRules" >
                    <el-form-item  prop="username"  class="reg-item" style="">
                        <span class="text">用户名</span>
                        <el-input  placeholder="请输入用户名" v-model.trim="loginForm.username"></el-input>
                    </el-form-item>                   
                    <el-form-item prop="captcha" class="reg-item" >
                        <span class="text">验&nbsp;证&nbsp;码</span>
                        <el-input class="verifi-input"  placeholder="请输入验证码" v-model.trim="loginForm.captcha">
                             <el-button slot="append" @click="changeVerifi" >
                                  <img :src="verifySrc" alt="">
                             </el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                            <el-button v-if="canSave" class="reg-btn" @click="toNext">下一步</el-button>
                            <el-button v-else disabled class="reg-btn">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { checkRules } from '@/config/rules.js'

export default {
        data(){
            return{
                canSave: true,
                checkRules: checkRules,
                verifySrc: '',
                loginForm: {
                    username: '',
                    captcha: ''
                }               
            }
        },
        created() {
            this.getVerifyFun()
        },
        methods:{
            ...mapActions(['getVerify', 'verifyUserName']),
            getVerifyFun() {
                this.getVerify().then((res) => {
                    let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                    this.verifySrc = imgUrl
                })
            },
            // 改变验证码
            changeVerifi() {
                this.getVerifyFun()
            },
            toNext() {
                this.$refs['eloginForm'].validate((valid) => {
                    if (valid) {
                        if(!this.canSave) return false
                        this.canSave = false
                        // 判断用户是否存在
                        this.verifyUserName(this.loginForm).then((res) => {
                            if(res.code == 200) {
                                this.canSave = true                               
                                this.$store.commit('USER_PHONE', res.data.info)
                                this.$router.push('/user/authentication')
                            }else {
                                this.canSave = true
                                // this.$message.error(res.message);
                                this.loginForm = {}
                                this.getVerifyFun()
                            }
                        })
                    }
                });
            }
        }
    }
    
</script>
<style lang="scss" scoped>
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