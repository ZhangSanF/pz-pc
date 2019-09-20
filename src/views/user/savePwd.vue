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
                        <span class="text">用户名</span>
                        <span class="rcf-txt-value">{{getUserFind.userName}}</span>
                    </el-form-item>  
                    <el-form-item class="reg-item" prop="password">
                        <span class="text">新密码</span>
                        <el-input  placeholder="请输入新密码" v-model.trim="resetPassword.password" class="password-font"></el-input>
                    </el-form-item>
                    <el-form-item class="reg-item">
                        <span class="text">当前密保问题</span>
                        <el-input :value="getUserFind.password_protection[0]" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="reg-item" prop="valueOne">
                        <span class="text">请输入答案</span>
                        <el-input v-model.trim="resetPassword.valueOne"></el-input>
                    </el-form-item>
                    <el-form-item class="reg-item">
                        <span class="text">当前密保问题</span>
                        <el-input :value="getUserFind.password_protection[1]" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="reg-item" prop="valueTwo">
                        <span class="text">请输入答案</span>
                        <el-input v-model.trim="resetPassword.valueTwo"></el-input>
                    </el-form-item>                  
                </el-form>
                <div class="reg-item">
                    <el-button v-if="canSave" class="reg-btn" @click="resetAction">重置密码</el-button>
                    <el-button v-else disabled class="reg-btn">重置密码</el-button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    import { checkRules, rePhone, reChinese, smsCodeNumber } from '@/config/rules.js'
    import md5 from 'js-md5';

    export default {
        data(){
            return{
                checkRules: checkRules,
                canSave: true,
                resetPassword: {
                    valueOne: '',
                    valueTwo: '',
                    type: 1,
                    username: '',
                    password: '',
                    protection: ''
                }              
            }
        },
        methods:{
            ...mapActions(['retrievePassword']),
            resetAction() {
                this.$refs['findPassword'].validate((valid) => {
                    if (valid) {    
                        this.canSave = false                  
                        this.resetPassword.username = this.getUserFind.userName
                        let protection = {
                            [this.getUserFind.password_protection[0]]: this.resetPassword.valueOne,
                            [this.getUserFind.password_protection[1]]: this.resetPassword.valueTwo
                        }   
                        this.resetPassword.protection = JSON.stringify(protection)          
                        let obj = Object.assign(this.resetPassword, {password: md5(this.resetPassword.password)})
                        this.retrievePassword(obj).then(res => {
                            if(res.code == 200) {
                                this.canSave = true
                                this.$alert('密码重置成功!')
                                this.$router.push('/user/login')
                            }else {
                                this.canSave = true
                            }
                        })
                    }
                });
            },
        },
        computed: {
            ...mapGetters(['getUserFind'])
        },
        watch: {
            // 去掉中文双字节字符
            'resetPassword.password': {
                handler(newVal, old) {
                    this.resetPassword.password = newVal.replace(reChinese,'');
                },
                deep: true
            }
        }
    }
    
</script>

<style lang="scss" scoped>
    .reg-item-reset{
        margin:23px 0 0 115px
    }
    .reg-btn-reset{
        width:170px ;
        font-size: 16px;
        background-color: #E35353;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .rcf-txt-value{
        font-size: 18px;
        font-weight: bold;
    }
    .text{
        display: inline-block;width: 25%;
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
        width: 70%;
    }
    .el-form-item__error{
          left: 110px;
    }
}
</style>