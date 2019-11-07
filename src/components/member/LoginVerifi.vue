<template>
    <div ref="inputEle">
        <el-form
            :model="loginPwd"
            size="mini"
            ref="loginForm"
            :rules="checkRules"
            label-width="200px"
            class="step1-form">
                <el-form-item label="原登录密码" prop="opwd" >
                    <el-input  class="step-input password-font" v-model.trim="loginPwd.opwd"></el-input>
                </el-form-item>
                <el-form-item label="新登录密码" prop="npwd">
                    <el-input class="step-input password-font" v-model.trim="loginPwd.npwd"></el-input>
                </el-form-item>
                <el-form-item label="再次输入新登录密码" prop="cpwd">
                    <el-input class="step-input password-font" v-model.trim="loginPwd.cpwd"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini"  class="step-btn" @click="modifyLoginPwd()" >修改登录密码</el-button>
                </el-form-item>
        </el-form >
    </div>
</template>

<script>
import { checkRules, reChinese } from '@/config/rules'
import md5 from 'js-md5'
import { mapGetters, mapActions } from "vuex"
import { noOnCopy } from "@/config/miXin"

export default {
    inject: ['reload'],
    mixins:[noOnCopy],
    data() {
        return {
            //设置登录密码
            loginPwd:{
                opwd:'',
                npwd:'',
                cpwd:''
            },
            checkRules: checkRules,
        }
    },
    methods: {
        ...mapActions(['setLoginPassWord']),
        //修改登录密码
        modifyLoginPwd() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    const params = {
                        oldPassword: md5(this.loginPwd.opwd),
                        newPassword: md5(this.loginPwd.npwd),
                        confirmNewPassword: md5(this.loginPwd.cpwd)
                    }
                    this.setLoginPassWord(params).then((res) => {
                        if(res.code == 200) {
                            this.$message.success(res.message)
                            this.reload()
                        }
                    })
                }
            });
        }, 
    },
    watch:{
        // 去掉中文双字节字符
        'loginPwd.opwd': {
            handler(newVal, old) {
                this.loginPwd.opwd = newVal.replace(reChinese,'');
            },
            deep: true
        },
        // 去掉中文双字节字符
        'loginPwd.npwd': {
            handler(newVal, old) {
                this.loginPwd.npwd = newVal.replace(reChinese,'');
            },
            deep: true
        },
        // 去掉中文双字节字符
        'loginPwd.cpwd': {
            handler(newVal, old) {
                this.loginPwd.cpwd = newVal.replace(reChinese,'');
            },
            deep: true
        }
    },
}
</script>

<style lang="scss" scoped>
.step1-form {
    margin: 0 auto;
    padding: 30px 0 ;
    width: 700px;
}
.step-input {
    width: 200px;
}
.step-btn {
    background: #fe7b20;
    color: #fff;
}
</style>