<template>
    <div class="user-box-2 safe-setting">
        <Title :infoTitle="infoTitle"/>
        <el-row class="user-box-con-1" >
            <!-- 用户名 -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-check" ></span>
                    <span>用户名</span>
                </div>
                <div class="safe-value">
                    <span >{{getUserInfo.username}}</span>
                </div>
            </div>
            <!--手机认证  -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-check" ></span>
                    <span>手机认证</span>
                </div>
                <div class="safe-value">
                    <span >{{getUserInfo.mobile}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(1)">
                    <span class="options-state" >{{safeData[1].showEdit ? '取消修改':'修改'}} </span>
                </div>
                <div class=" edit clearfix"   v-if="safeData[1].showEdit">
                    <div >
                        <div class="user-safety-options-edit"  >
                            <!-- 手机认证组件 -->
                            <PhoneVerifi/>
                            <Warm :warmData="phoneWarm"/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 实名认证 -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-tanhao" v-if="!getUserInfo.is_real_name"></span>
                    <span class="icon-check" v-if="getUserInfo.is_real_name"></span>
                    <span>实名认证</span>
                </div>
                <div class="safe-value">
                    <span :class="!getUserInfo.is_real_name?' isSet':''">{{getUserInfo.is_real_name?'已设置':'未设置'}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(2)">
                    <a v-if="getUserInfo.is_real_name" @click="toAbout('注册协议', '4')" class="options-state service"  href="javascript:void(0);">《服务协议》</a>
                    <span class="options-state" >{{safeData[2].showEdit ? '取消认证':'认证'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="safeData[2].showEdit">
                    <!-- 实名认证 -->
                    <div class="user-safety-options-edit"  >
                        <!-- 实名认证 -->
                        <el-form
                        :model="verifiedForm"
                        v-if="!getUserInfo.is_real_name"
                        size="mini"
                        :rules="checkRules"
                        ref="verifiedForm"
                        label-width="200px"
                        class="step1-form">
                            <el-form-item label="用户名">
                                <span>{{getUserInfo.username}}</span>
                            </el-form-item>
                            <el-form-item label="真实姓名" prop="name">
                                <el-input class="step-input" v-model.trim="verifiedForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号码" prop="number">
                                <el-input class="step-input" v-model.trim="verifiedForm.number"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button size="mini"  class="step-btn" @click="SubmitRealName()" >提交实名认证</el-button>
                            </el-form-item>
                        </el-form >
                        <div class="succeed clearfix"  v-if="getUserInfo.is_real_name" >
                            <span  class="succeed-true">&nbsp;</span>
                            <span class="succeed-txt" >恭喜您认证成功</span>
                        </div>
                        <Warm :warmData="trueNameWarm"/>
                    </div>
                </div>
            </div>
            <!-- 登录密码 -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-check" ></span>
                    <span>登录密码</span>
                </div>
                <div class="safe-value">
                    <span>已设置</span>
                </div>
                <div class="safe-edit fr"  @click="show(3)">
                    <span class="options-state" >{{safeData[3].showEdit ? '取消修改':'修改'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="safeData[3].showEdit">
                    <!-- 登录密码 -->
                    <div class="user-safety-options-edit"  >
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
                        <Warm :warmData="pwdWarm"/>
                    </div>
                </div>
            </div>
            <!-- 支付密码 -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-tanhao" v-if="!getUserInfo.is_pay_password"></span>
                    <span class="icon-check" v-if="getUserInfo.is_pay_password"></span>
                    <span>支付密码</span>
                </div>
                <div class="safe-value">
                    <span :class="!getUserInfo.is_pay_password?' isSet':''">{{getUserInfo.is_pay_password?'已设置':'未设置'}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(4)">
                    <span class="options-state" v-if="getUserInfo.is_pay_password">{{safeData[4].showEdit? '取消修改':'修改'}} </span>
                    <span class="options-state" v-else-if="!getUserInfo.is_pay_password">{{safeData[4].showEdit ? '修改':'设置'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="safeData[4].showEdit">
                     <div class="user-safety-options-edit">
                         <!-- 支付密码组件 -->
                        <PayPasswordVerifi/>
                        <Warm :warmData="zfPwdWarm"/>
                    </div>
                </div>
            </div>
            <!-- 密码保护 -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-tanhao" v-if="!getUserInfo.is_protect"></span>
                    <span class="icon-check" v-if="getUserInfo.is_protect"></span>
                    <span>密码保护</span>
                </div>
                <div class="safe-value">
                    <span :class="!getUserInfo.is_protect ?' isSet':''">{{getUserInfo.is_protect?'已设置':'未设置'}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(5)">
                    <span class="options-state" v-if="getUserInfo.is_protect">{{safeData[5].showEdit ? '取消修改':'修改'}} </span>
                    <span class="options-state" v-else-if="!getUserInfo.is_protect">{{safeData[5].showEdit ? '取消设置':'设置'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="safeData[5].showEdit">
                    <!-- 设置密保 -->
                    <div class="user-safety-options-edit"  >
                        <EncryptedVerifi/>
                        <Warm :warmData="savePwd"/>
                     </div>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
import { checkRules, reChinese } from '@/config/rules.js'
import md5 from 'js-md5';
import { mapGetters, mapActions } from "vuex";
import Title from '@/components/member/Title'
import Warm from '@/components/member/Warm'
import PhoneVerifi from '@/components/member/PhoneVerifi'
import PayPasswordVerifi from '@/components/member/PayPasswordVerifi'
import EncryptedVerifi from '@/components/member/EncryptedVerifi'


export default {
    components:{ Title ,PhoneVerifi, PayPasswordVerifi, EncryptedVerifi, Warm },
    inject: ['reload'],
    data() {
        return {
            infoTitle: {
                title:'安全设置',
            },
            checkRules: checkRules,       
            //设置登录密码
            loginPwd:{
                opwd:'',
                npwd:'',
                cpwd:''
            },
            //实名认证
            verifiedForm:{
                name:'',
                number:''
            },
            safeData:[
                {showEdit: false},
                {showEdit: false},
                {showEdit: false},
                {showEdit: false},
                {showEdit: false},
                {showEdit: false}
            ]
        }
    },
    methods:{
        ...mapActions(['initProtection','realNameAuth','setLoginPassWord']),
        show(i) {
            for (let m = 0 ; m <this.safeData.length; m++  ) {
                if(i== -1) {
                    this.safeData[m].showEdit = false
                }
                else {
                    this.safeData[m].showEdit = m -0 !== i
                    ? false
                    :this.safeData[m].showEdit == true ? false : true
                }
            }
        },
        // 提交实名认证
        SubmitRealName() {
            this.$refs['verifiedForm'].validate((valid) => {
                if (valid) {
                    const params = {
                        real_name: this.verifiedForm.name,
                        identity_number: this.verifiedForm.number
                    }
                    this.realNameAuth(params).then(res=>{
                        if(res.code == 200){
                            this.$message.success(res.message)
                            this.$store.commit('REAL_NAME', {is_real_name: true, real_name: params.real_name, identity_number: params.identity_number})
                            this.reload()
                        }
                    })
                } 
            });
        },
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
                        // else {
                        //     this.$message.error(`${res.message}`);
                        // }
                    })
                }
            });
        },         
        // 服务协议
        toAbout(title, active) {
            this.$router.push('/user/about')
            this.$store.commit('ABOUT_QUERY', {id: '', title: title, active: active})
        }
    },
    computed: {
        ...mapGetters(['getUserInfo', 'getSettingBase']),
        // 手机认证
        phoneWarm() {
            return [
                '请填写真实有效的手机号，手机号将作为验证用户身份的重要手段。',
                '出彩速配会对用户的所有资料进行严格保密。',
                `手机认证过程遇到问题，请联系客服，${this.getSettingBase.service_telephone}。`
            ]
        },
        // 实名认证
        trueNameWarm(){
            return [
                '未满18周岁，实名认证无法通过。',
                '出彩速配会对用户的所有资料进行严格保密。',
                `实名认证过程遇到问题，请联系客服，${this.getSettingBase.service_telephone}。`
            ]
        },
        // 登录密码
        pwdWarm() {
            return [
                '请牢记您设置的新密码，登录密码可通过密码找回功能找回。',
                `邮箱验证过程遇到问题，请联系客服，${this.getSettingBase.service_telephone}。`
            ]
        },
        //支付密码
        zfPwdWarm() {
            return [
                '请牢记您设置的支付密码，支付密码将用于投资，提现等重要操作。',
                `使用过程遇到问题，请联系客服，${this.getSettingBase.service_telephone}。`
            ]
        },
        savePwd() {
            return [
                '请牢记您设置的密码保护问题，密码问题将用于找回密码等重要操作。',
                `使用过程遇到问题，请联系客服，${this.getSettingBase.service_telephone}。`
            ]
        }
    },
    watch:{
        '$route.query.showId':{
            handler(a,b) {
                if(a) return this.show(a)
            },
            deep:true
        },
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
    .user-box-2{
        border: 1px solid #e0e0e0;
        border-radius: 3px;
        background: #fff;
    }
    .user-box-con-1 {
        width: 964px;
        margin: 0 auto;
        padding: 30px 0;
    }
    .safe_content {
        border-bottom: 1px solid #e0e0e0;
        line-height: 60px;
        font-size: 14px;
        .safe-lable {
            display: inline-block;
            width: 140px;
        }
        .safe-value{
             display: inline-block;
        }
        .safe-edit{
             margin-right: 100px
        }
    }
    .icon-check{
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        background: url('../../assets/image/user_sprite.png') no-repeat -17px -842px;
    }
    .icon-tanhao {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        background: url('../../assets/image/user_sprite.png');
        background-repeat: no-repeat;
        background-position: 0 -842px;
    }
    .isSet {
        color: #d53838;
    }
    .options-state {
        width: 60px;
        height: 60px;
        overflow: hidden;
        color: #3181d8;
        cursor: pointer;
        text-align: right;
    }
    .edit {
        transition: height 2s ;
        -webkit-transition: height 2s; /* Safari prior 6.1 */
    }
    .service {
        margin-right: 20px
    }
    .user-safety-options-edit {
        position: relative;
        border: 1px solid #e0e0e0;
        background: #f5f5f5;
    }
    .step-btn {
        background: #fe7b20;
            color: #fff;
    }
    .step-input {
        width: 200px;
    }
    .step1-form {
        margin: 0 auto;
        padding: 30px 0 ;
        width: 700px;
    }
    .zcgl{
        height: 300px;overflow: hidden;
    }
    .zcgl-enter-active, .zcgl-leave-active {
        transition: opacity .5s;
        // transition: height .5s
    }
    .zcgl-enter, .zcgl-leave-active {
        height: 0
    }
    .succeed{
        line-height: 38px;
        text-align: center;
        height: 40px;
        margin-top: 40px;
        padding: 15px 0 30px;
    }
    .succeed-true{
        position: absolute;
        background-image: url('../../assets/image/user_sprite.png');
        background-repeat: no-repeat;
        background-position: -60px -20px;
        width: 38px;
        height: 40px;
        left : 38%;
        line-height: 40px;
    }
    .succeed-txt{
        font-size:18px;
        color: #333;
        height: 40px;
        font-weight: 700;
    }
</style>
<style lang="scss">
    .safe-setting{
        .el-input.is-disabled .el-input__inner{
            color: #666;
        }
    }
</style>
