<template>
    <div class="user-box-2">
        <Title :infoTitle="infoTitle"/>
        <el-row class="user-box-con-1" >
            <!-- 用户名 -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-tanhao" v-if="getSafeData[0].value == '未设置'"></span>
                    <span class="icon-check" v-if="getSafeData[0].value !== '未设置'"></span>
                    <span>{{getSafeData[1].lable}}</span>
                </div>
                <div class="safe-value">
                    <span :class="getSafeData[0].value == '未设置'?' isSet':''">{{getSafeData[0].value?getSafeData[0].value:'&nbsp;'}}</span>
                </div>
            </div>
            <!--手机认证  -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-tanhao" v-if="getSafeData[1].value == '未设置'"></span>
                    <span class="icon-check" v-if="getSafeData[1].value !== '未设置'"></span>
                    <span>{{getSafeData[1].lable}}</span>
                </div>
                <div class="safe-value">
                    <span :class="getSafeData[1].value == '未设置'?' isSet':''">{{getSafeData[1].value?getSafeData[1].value:'&nbsp;'}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(1,getSafeData[1].showEdit)">
                    <span class="options-state" v-if="getSafeData[1].value !== '未设置'">{{getSafeData[1].showEdit ? '取消修改':'修改'}} </span>
                    <span class="options-state" v-else-if="getSafeData[1].value == '未设置'">{{getSafeData[1].showEdit ? '修改':'设置'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="getSafeData[1].showEdit">
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
                    <span class="icon-tanhao" v-if="getSafeData[2].value == '未设置'"></span>
                    <span class="icon-check" v-if="getSafeData[2].value !== '未设置'"></span>
                    <span>{{getSafeData[2].lable}}</span>
                </div>
                <div class="safe-value">
                    <span :class="getSafeData[2].value == '未设置'?' isSet':''">{{getSafeData[2].value?getSafeData[2].value:'&nbsp;'}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(2,getSafeData[2].showEdit)">
                    <router-link to="/" v-if="getSafeData[2].value !== '未设置' " class="options-state service">《服务协议》 </router-link>
                    <span class="options-state" v-if="getSafeData[2].lable == '实名认证'">{{getSafeData[2].showEdit ? '取消认证':'认证'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="getSafeData[2].showEdit">
                    <!-- 实名认证 -->
                    <div class="user-safety-options-edit"  >
                        <!-- 实名认证 -->
                        <el-form
                        :model="verifiedForm"
                        v-if="getSafeData[2].value == '未设置'"
                        size="mini"
                        :rules="checkRules"
                        ref="verifiedForm"
                        label-width="200px"
                        class="step1-form">
                            <el-form-item label="用户名">
                                <span>{{userName}}</span>
                            </el-form-item>
                            <el-form-item label="真实姓名" prop="name">
                                <el-input class="step-input" v-model="verifiedForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号码" prop="number">
                                <el-input class="step-input" v-model="verifiedForm.number"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button size="mini"  class="step-btn" @click="SubmitRealName()" >提交实名认证</el-button>
                            </el-form-item>
                        </el-form >
                        <div class="succeed clearfix"  v-if="getSafeData[2].value == '已设置'" >
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
                    <span class="icon-tanhao" v-if="getSafeData[3].value == '未设置'"></span>
                    <span class="icon-check" v-if="getSafeData[3].value !== '未设置'"></span>
                    <span>{{getSafeData[3].lable}}</span>
                </div>
                <div class="safe-value">
                    <span :class="getSafeData[3].value == '未设置'?' isSet':''">{{getSafeData[3].value?getSafeData[3].value:'&nbsp;'}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(3,getSafeData[3].showEdit)">
                    <span class="options-state" v-if="getSafeData[3].value !== '未设置'">{{getSafeData[3].showEdit ? '取消修改':'修改'}} </span>
                    <span class="options-state" v-else-if="getSafeData[3].value == '未设置'">{{getSafeData[3].showEdit ? '修改':'设置'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="getSafeData[3].showEdit">
                    <!-- 登录密码 -->
                    <div class="user-safety-options-edit" v-if="getSafeData[3].lable == '登录密码'" >
                        <el-form
                        :model="loginPwd"
                        size="mini"
                        ref="loginForm"
                        :rules="checkRules"
                        label-width="200px"
                        class="step1-form">
                            <el-form-item label="原登录密码" prop="opwd" >
                                <el-input class="step-input" v-model="loginPwd.opwd"></el-input>
                            </el-form-item>
                            <el-form-item label="新登录密码" prop="npwd">
                                <el-input class="step-input" v-model="loginPwd.npwd"></el-input>
                            </el-form-item>
                            <el-form-item label="再次输入新登录密码" prop="cpwd">
                                <el-input class="step-input" v-model="loginPwd.cpwd"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button size="mini"  class="step-btn" @click="modifyLoginPwd()" >修改登录密码</el-button>
                            </el-form-item>
                        </el-form >

                        <Warm :warmData="pwdWarm"/>
                    </div>
                </div>
            </div>
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-tanhao" v-if="getSafeData[4].value == '未设置'"></span>
                    <span class="icon-check" v-if="getSafeData[4].value !== '未设置'"></span>
                    <span>{{getSafeData[4].lable}}</span>
                </div>
                <div class="safe-value">
                    <span :class="getSafeData[4].value == '未设置'?' isSet':''">{{getSafeData[4].value?getSafeData[4].value:'&nbsp;'}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(4,getSafeData[4].showEdit)">
                    <span class="options-state" v-if="getSafeData[4].value !== '未设置'">{{getSafeData[4].showEdit ? '取消修改':'修改'}} </span>
                    <span class="options-state" v-else-if="getSafeData[4].value == '未设置'">{{getSafeData[4].showEdit ? '修改':'设置'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="getSafeData[4].showEdit">
                     <div class="user-safety-options-edit"  >
                        <!-- 设置支付密码 -->
                        <el-form
                            class="step1-form" 
                            ref="setPayPwd" 
                            :rules="checkRules" 
                            size="mini"
                            v-if="!isRetrieve && getSafeData[3].value == '未设置' "
                            :model="setPayPwdForm"
                            label-width="200px">
                            <el-form-item label="设置支付密码" prop="payPwd">
                                <el-input size="mini" v-model="setPayPwdForm.payPwd" class="step-input"></el-input>
                            </el-form-item>
                            <el-form-item label="再次输入支付密码" prop="againPayPwd">
                                <el-input size="mini"  v-model="setPayPwdForm.againPayPwd" class="step-input"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button size="mini"  class="step-btn" @click="setPayPwd(1)" >设置支付密码</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 修改支付密码 -->
                        <el-form 
                            :model="modifyPayPwdForm"
                            size="mini"
                            :rules="checkRules"
                            ref="modifyPayPwd"
                            label-width="200px"
                            v-if="!isRetrieve && getSafeData[3].value !== '未设置'"
                            class="step1-form">
                            <el-form-item label="原支付密码" prop="oldPassword">
                                <el-input size="mini" placeholder="请输入答案" v-model="modifyPayPwdForm.oldPassword" class="step-input"></el-input>
                            </el-form-item>
                            <el-form-item label="新支付密码" prop="newPassword">
                                <el-input size="mini"  v-model="modifyPayPwdForm.newPassword" placeholder="请输入答案" class="step-input"></el-input>
                            </el-form-item>
                            <el-form-item label="确认支付密码" prop="confirmNewPassword">
                                <el-input size="mini"  v-model="modifyPayPwdForm.confirmNewPassword" placeholder="请输入答案" class="step-input"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button size="mini"  class="step-btn" @click="modifyPayPwd()" >修改支付密码</el-button>
                                <el-button size="mini"   @click="retrievePayPwd(true)" >找回支付密码</el-button>
                            </el-form-item>
                        </el-form >
                        <!-- 找回支付密码 -->
                        <el-form class="step1-form" ref="retrievePayPwd" v-if="isRetrieve" label-width="200px">
                            <el-form-item label="手机验证码">
                                <el-input size="mini" class="step-input"></el-input>
                            </el-form-item>
                            <el-form-item label="新支付密码">
                                <el-input size="mini" class="step-input"></el-input>
                            </el-form-item>
                            <el-form-item label="确认支付密码">
                                <el-input size="mini" class="step-input"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button size="mini"  class="step-btn" @click="modifyPayPwd()" >修改支付密码</el-button>
                                <el-button size="mini"   @click="retrievePayPwd(false)" >取消</el-button>
                            </el-form-item>
                        </el-form>
                        <Warm :warmData="pwdWarm"/>
                    </div>
                </div>
            </div>
            <!-- 密码保护 -->
            <div  class="safe_content" >
                <div class="safe-lable ">
                    <span class="icon-tanhao" v-if="getSafeData[5].value == '未设置'"></span>
                    <span class="icon-check" v-if="getSafeData[5].value !== '未设置'"></span>
                    <span>{{getSafeData[5].lable}}</span>
                </div>
                <div class="safe-value">
                    <span :class="getSafeData[5].value == '未设置'?' isSet':''">{{getSafeData[5].value?getSafeData[5].value:'&nbsp;'}}</span>
                </div>
                <div class="safe-edit fr"  @click="show(5,getSafeData[5].showEdit)">
                    <span class="options-state" v-if="getSafeData[5].value !== '未设置'">{{getSafeData[5].showEdit ? '取消修改':'修改'}} </span>
                    <span class="options-state" v-else-if="getSafeData[5].value == '未设置'">{{getSafeData[5].showEdit ? '修改':'设置'}} </span>
                </div>
                <div class=" edit clearfix"  v-if="getSafeData[5].showEdit">
                    <!-- 设置密保 -->
                    <div class="user-safety-options-edit"  >
                        <div v-if="getSafeData[5].value == '未设置'">
                            <el-form 
                                :model="pwdSafe1From"
                                size="mini"
                                :rules="checkRules"
                                ref="pwdSafe1"
                                label-width="200px"
                                v-if="safeSteps == 2  "
                                class="step1-form">
                                <el-form-item label="请选择问题" prop="keyOne">
                                    <el-select   v-model="pwdSafe1From.keyOne" size="mini" placeholder="请选择当前密保问题1">
                                        <el-option
                                        v-for="item in protectionData"
                                        :key="item.value"
                                        :label="item.label"
                                        :disabled="(item.value == pwdSafe1From.keyOne|| item.value == pwdSafe1From.keyTwo ) ? true : false "
                                        :value="item.value">
                                        </el-option>
                                    </el-select> 
                                </el-form-item>
                                <el-form-item label="请输入答案" prop="valueOne">
                                    <el-input size="mini" placeholder="请输入答案" v-model="pwdSafe1From.valueOne" class="step-input"></el-input>
                                </el-form-item>
                                <el-form-item label="请选择问题" prop="keyTwo">
                                    <el-select   v-model="pwdSafe1From.keyTwo" size="mini" placeholder="请选择当前密保问题1">
                                        <el-option
                                        v-for="item in protectionData"
                                        :key="item.value"
                                        :label="item.label"
                                        :disabled="(item.value == pwdSafe1From.keyOne|| item.value == pwdSafe1From.keyTwo ) ? true : false "
                                        :value="item.value">
                                        </el-option>
                                    </el-select> 
                                </el-form-item>
                                <el-form-item label="请输入答案" prop="valueTwo">
                                        <el-input size="mini"  v-model="pwdSafe1From.valueTwo" placeholder="请输入答案" class="step-input"></el-input>
                                </el-form-item>
                                <el-form-item >
                                    <el-button size="mini" v-if="getSafeData[5].value == '未设置'"  class="step-btn" @click="setSafeStep(1)" >设置</el-button>
                                    <el-button size="mini"  v-if="getSafeData[5].value !== '未设置'"  class="step-btn" @click="setSafeStep(2)" >重置设置密码保护</el-button>
                                </el-form-item>
                            </el-form >
                        </div>
                        <div v-else>
                            <!-- 通过原密保重置 -->
                            <el-form 
                                class="step1-form" 
                                ref="pwdSafe2" 
                                label-width="200px"
                                :model="pwdSafe2" 
                                size="mini"
                                :rules="checkRules"
                                v-if="safeSteps == 2  ">
                                <el-form-item label="当前密保问题1">
                                    <el-input size="mini" :value="protectionOne" disabled class="step-input"></el-input>
                                </el-form-item>
                                <el-form-item label="请输入答案" prop="valueOne"  v-show="showAnswer">
                                    <el-input size="mini" v-model="pwdSafe2.valueOne" class="step-input"></el-input>
                                </el-form-item>
                                <el-form-item label="当前密保问题2">
                                    <el-input size="mini"  :value="protectionTwo" disabled class="step-input"></el-input>
                                </el-form-item>
                                <el-form-item label="请输入答案" prop="valueTwo"  v-show="showAnswer">
                                    <el-input size="mini"  v-model="pwdSafe2.valueTwo"   class="step-input"></el-input>
                                </el-form-item>
                                <el-form-item >
                                    <el-button size="mini"  class="step-btn" @click="safeBySecurity()" >验证当前答案</el-button>
                                    <el-button size="mini"   @click="setSafeStep(3)" >通过手机重置</el-button>
                                </el-form-item>
                            </el-form>
                            <!-- 通过手机重置密保 -->
                            <el-form 
                                class="step1-form" 
                                ref="pwdSafe3" 
                                label-width="200px" 
                                size="mini"
                                v-if="safeSteps == 3"
                                >
                                <el-form-item label="短信验证码">
                                    <el-input size="mini" placeholder="请输入短信验证码"  class="step-input"></el-input>
                                    <el-button size="mini" class="step-btn" >获取短信验证码</el-button>
                                </el-form-item>
                                <el-form-item >
                                    <el-button size="mini"  class="step-btn" @click="safeByPhone()" >点击验证</el-button>
                                    <el-button size="mini"    @click="setSafeStep(2)" >通过原密保重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                     </div>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Warm from '@/components/member/Warm'
import { mapGetters, mapActions } from "vuex";
import PhoneVerifi from '@/components/member/PhoneVerifi'
import {protectionData} from '@/config/index.js'
import {checkRules} from '@/config/rules.js'
import md5 from 'js-md5';
export default {
    components:{ Title ,PhoneVerifi,Warm },
    inject: ['reload'],
    data() {
        return {
            infoTitle: {
                title:'安全设置',
            },
            active: 0,
            isRetrieve: false,
            safeSteps: 2,
            userName:'',
            protectionData: protectionData,
            checkRules: checkRules,
            protectionOne:'', //密保问题1
            protectionTwo:'', //密保问题2
            showAnswer: false,// 是否显示答案输入框
            safeData:[
            ],
            //手机提示
            phoneWarm: [
                '请填写真实有效的手机号，手机号将作为验证用户身份的重要手段。',
                '出彩速配会对用户的所有资料进行严格保密。',
                '手机认证过程遇到问题，请联系客服，400-8357-678。'
            ],
            //真实姓名提示
            trueNameWarm: [
                '未满18周岁，实名认证无法通过。',
                ' 出彩速配会对用户的所有资料进行严格保密。',
                '实名认证过程遇到问题，请联系客服，400-8357-678'
            ],
            //密码提示
            pwdWarm: [
                ' 请牢记您设置的新密码，登录密码可通过密码找回功能找回。',
                '  邮箱验证过程遇到问题，请联系客服，400-8357-678'
            ],
            pwdSafe1From :{
                keyOne:'',
                valueOne:'',
                keyTwo:'',
                valueTwo:''
            },
            //设置登录密码
            loginPwd:{
                opwd:'',
                npwd:'',
                cpwd:''
            },
            //设置支付密码
            setPayPwdForm:{
                oldPwd:'',
                payPwd:'',
                againPayPwd:''
            },
            //修改支付密码
            modifyPayPwdForm:{
                oldPassword:'',
                newPassword:'',
                confirmNewPassword:''
            },
            //实名认证
            verifiedForm:{
                name:'',
                number:''
            },
            pwdSafe2:{
                valueOne:'',
                valueTwo:''
            }

        }
    },
    methods:{
        ...mapActions(['initProtection','realNameAuth', 'setPayPassWord','verifyProtection','setLoginPassWord']),
        show(i,b) {
            for (let m = 0 ; m <this.getSafeData.length; m++  ) {
                this.getSafeData[m].showEdit = m -0 !== i
                ? false
                :b == true ? false : true
            }
        },
        //找回密码
        retrievePayPwd(a) {
            this.isRetrieve =  a
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
                    this.setLoginPassWord(params)
                    this.show(-1,false)
                } else {
                }
            });
        },
        //修改支付密码
        modifyPayPwd() {
            this.$refs['modifyPayPwd'].validate((valid) => {
                if (valid) {
                    const params = {
                        oldPassword: this.modifyPayPwdForm.oldPassword,
                        newPassword: this.modifyPayPwdForm.newPassword,
                        confirmNewPassword: this.modifyPayPwdForm.confirmNewPassword
                    }
                    this.setPayPassWord(params)
                    this.show(-1,false)
                } else {
                }
            });
        },
        //修改密码保护
        modifyPwdSafe() {

        },
        //密码保护s
        setSafeStep(a) {
            if(a > 1)this.safeSteps = a
            else if(a ==1){
                console.log(this.pwdSafe1From);
            this.$refs['pwdSafe1'].validate((valid) => {
                if (valid) {
                    let params ={}
                    params.data = {
                        protection:`{"${this.pwdSafe1From.keyOne}":"${this.pwdSafe1From.valueOne}","${this.pwdSafe1From.keyTwo}":"${this.pwdSafe1From.valueTwo}"}`
                    }
                    params.protection = [this.pwdSafe1From.keyOne,this.pwdSafe1From.keyTwo]
                    this.initProtection(params)
                   
                } else {
                    console.log('error submit!!')
                }
            });
            }
        },
        //验证当前密保
        safeBySecurity() {
            this.showAnswer = true
            this.$refs['pwdSafe2'].validate((valid) => {
                if (valid) {
                    const  params = {
                        protection:`{"${this.protectionOne}":"${this.pwdSafe2.valueOne}","${this.protectionTwo}":"${this.pwdSafe2.valueTwo}"}`
                    }
                    console.log(params);
                    this.verifyProtection(params)
                } else {
                    console.log(2)
                }
            });
        },
        //验证当前手机
        safeByPhone() {

        },
        seeProtection(a) {
            console.log(a);

        },
        // 提交实名认证
        SubmitRealName() {
            this.$refs['verifiedForm'].validate((valid) => {
                if (valid) {
                    const params = {
                        real_name: this.verifiedForm.name,
                        identity_number: this.verifiedForm.number
                    }
                    this.realNameAuth(params)
                    this.show(-1,false)
                } else {
                    console.log('error submit!!')
                }
            });
        },
        //设置支付密码
        setPayPwd() {
            this.$refs['setPayPwd'].validate((valid) => {
                if (valid) {
                    const params = {
                        oldPassword: '',
                        newPassword: this.setPayPwdForm.payPwd,
                        confirmNewPassword: this.setPayPwdForm.againPayPwd
                    }
                    this.setPayPassWord(params)
                    this.show(-1,false)
                } else {
                }
            });
        }
    },
    computed: {
        ...mapGetters(['getSafeData','getUserInfo','getSafeProtection']),
    },
    mounted() {
        const a = this.getSafeData
        this.safeData = a
        const b = this.getSafeData[0].value
        this.userName = b
        this.protectionOne = this.getSafeProtection ?  this.getSafeProtection[0] :''
        this.protectionTwo = this.getSafeProtection ?this.getSafeProtection[1] :''
    }
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
