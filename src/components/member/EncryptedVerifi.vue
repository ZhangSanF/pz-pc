<template>
    <div>
        <div v-if="!getUserInfo.is_protect">
            <!-- 初始化密保 -->
            <el-form 
                :model="pwdSafeInit" 
                size="mini" 
                :rules="checkRules" 
                ref="pwdSafeInit" 
                label-width="200px" 
                v-if="safeSteps == 1"
                class="step1-form">
                <el-form-item label="手机号码">
                    <span class="bank_city fl" >{{getUserInfo.mobile}}</span>
                </el-form-item>
                <el-form-item label="手机验证码" prop="mobile_verify_code">
                    <el-input v-model.trim="pwdSafeInit.mobile_verify_code" placeholder="请输入手机验证码" size="mini" class="step-input" ></el-input>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'one'">获取验证码</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'three'">重新获取({{smsCodeNumber}})</el-button>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'four'">重新获取</el-button>
                </el-form-item>
                <el-form-item label="请选择问题" prop="keyOne">
                    <el-select v-model="pwdSafeInit.keyOne" size="mini" placeholder="请选择当前密保问题">
                        <el-option
                        v-for="item in protectionData"
                        :disabled="(item.value == pwdSafeInit.keyOne|| item.value == pwdSafeInit.keyTwo ) ? true : false "
                        :key="item.value"
                        :label="item.label"                    
                        :value="item.value">
                        </el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item label="请输入答案" prop="valueOne">
                    <el-input size="mini" placeholder="请输入答案" v-model="pwdSafeInit.valueOne" class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="请选择问题" prop="keyTwo">
                    <el-select v-model="pwdSafeInit.keyTwo" size="mini" placeholder="请选择当前密保问题">
                        <el-option
                        v-for="item in protectionData"
                        :disabled="(item.value == pwdSafeInit.keyOne|| item.value == pwdSafeInit.keyTwo ) ? true : false "
                        :key="item.value"
                        :label="item.label"                       
                        :value="item.value">
                        </el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item label="请输入答案" prop="valueTwo">
                    <el-input size="mini"  v-model="pwdSafeInit.valueTwo" placeholder="请输入答案" class="step-input"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button  size="mini" class="step-btn" @click="setSafeStep">设置</el-button>
                </el-form-item>
            </el-form >
        </div>
        <div v-else>
            <!-- 重新设置密码保护 -->
            <el-form class="step1-form" label-width="200px" size="mini" v-if="safeSteps == 1">
                <el-form-item label="当前密保问题">
                    <el-input size="mini" :value="getUserInfo.password_protection[0]" disabled class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="当前密保问题">
                    <el-input size="mini" :value="getUserInfo.password_protection[1]" disabled class="step-input"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini" class="step-btn" @click="setNext">重新设置密码保护</el-button>
                </el-form-item>
            </el-form>
            <div v-if="safeSteps == 2">
                <!-- 验证当前答案  -->
                <el-form 
                    class="step1-form" 
                    ref="verifiPwd" 
                    label-width="200px"
                    :model="verifiPwd" 
                    size="mini"
                    :rules="checkRules"
                    v-if="setPwdStep"
                    >
                    <el-form-item label="当前密保问题">
                        <el-input size="mini" :value="getUserInfo.password_protection[0]" disabled class="step-input"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入答案" prop="valueOne">
                        <el-input size="mini" v-model="verifiPwd.valueOne" class="step-input"></el-input>
                    </el-form-item>
                    <el-form-item label="当前密保问题">
                        <el-input size="mini" :value="getUserInfo.password_protection[1]" disabled class="step-input"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入答案" prop="valueTwo">
                        <el-input size="mini"  v-model="verifiPwd.valueTwo"   class="step-input"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button size="mini" class="step-btn" @click="safeBySecurity">验证当前答案</el-button>
                        <el-button size="mini" v-if="isShowReset" @click="resetPhone" >通过手机重置</el-button>
                    </el-form-item>
                </el-form>
                <!-- 通过密保重置密保  -->
                <el-form 
                    v-else
                    :model="resetPwdData" 
                    size="mini" 
                    :rules="checkRules" 
                    ref="resetPwdData" 
                    label-width="200px" 
                    class="step1-form">
                    <el-form-item v-show="false"></el-form-item>
                    <el-form-item label="请选择问题" prop="keyOne">
                        <el-select v-model="resetPwdData.keyOne" size="mini" placeholder="请选择当前密保问题">
                            <el-option
                            v-for="item in protectionData"
                            :disabled="(item.value == resetPwdData.keyOne|| item.value == resetPwdData.keyTwo ) ? true : false "
                            :key="item.value"
                            :label="item.label"                    
                            :value="item.value">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item v-show="false"></el-form-item>
                    <el-form-item label="请输入答案" prop="valueOne">
                        <el-input size="mini" placeholder="请输入答案" v-model="resetPwdData.valueOne" class="step-input"></el-input>
                    </el-form-item>
                    <el-form-item v-show="false"></el-form-item>
                    <el-form-item label="请选择问题" prop="keyTwo">
                        <el-select v-model="resetPwdData.keyTwo" size="mini" placeholder="请选择当前密保问题">
                            <el-option
                            v-for="item in protectionData"
                            :disabled="(item.value == resetPwdData.keyOne|| item.value == resetPwdData.keyTwo ) ? true : false "
                            :key="item.value"
                            :label="item.label"                       
                            :value="item.value">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="请输入答案" prop="valueTwo">
                        <el-input size="mini"  v-model="resetPwdData.valueTwo" placeholder="请输入答案" class="step-input"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button  size="mini" class="step-btn" @click="resetEncrypted">设置</el-button>
                    </el-form-item>
                </el-form >
            </div>           
            <!-- 通过手机重置密保 -->
            <el-form 
                :model="iphoneEncrypted"
                size="mini"
                :rules="checkRules"
                ref="iphoneEncryptedr"
                label-width="200px"
                v-if="safeSteps == 3"
                class="step1-form">
                <el-form-item label="请选择问题" prop="keyOne">
                    <el-select   v-model="iphoneEncrypted.keyOne" size="mini" placeholder="请选择当前密保问题">
                        <el-option
                        v-for="item in protectionData"
                        :key="item.value"
                        :label="item.label"
                        :disabled="(item.value == iphoneEncrypted.keyOne|| item.value == iphoneEncrypted.keyTwo ) ? true : false "
                        :value="item.value">
                        </el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item label="请输入答案" prop="valueOne">
                    <el-input size="mini" placeholder="请输入答案" v-model="iphoneEncrypted.valueOne" class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="请选择问题" prop="keyTwo">
                    <el-select   v-model="iphoneEncrypted.keyTwo" size="mini" placeholder="请选择当前密保问题">
                        <el-option
                        v-for="item in protectionData"
                        :key="item.value"
                        :label="item.label"
                        :disabled="(item.value == iphoneEncrypted.keyOne|| item.value == iphoneEncrypted.keyTwo ) ? true : false "
                        :value="item.value">
                        </el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item label="请输入答案" prop="valueTwo">
                    <el-input size="mini"  v-model="iphoneEncrypted.valueTwo" placeholder="请输入答案" class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="" v-if="false">
                    <el-input size="mini" placeholder="请输入手机号码"  class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <span class="bank_city fl" >{{getUserInfo.mobile}}</span>
                    <!-- <el-input size="mini"  v-model.trim="iphoneEncrypted.mobile" placeholder="请输入手机号码"  class="step-input"></el-input> -->
                </el-form-item>
                <el-form-item label="短信验证码" prop="mobile_verify_code">
                    <el-input v-model.trim="iphoneEncrypted.mobile_verify_code" size="mini" placeholder="请输入短信验证码"  class="step-input"></el-input>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'one'">获取验证码</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'three'">重新获取({{smsCodeNumber}})</el-button>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'four'">重新获取</el-button>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini"  class="step-btn" @click="safeByPhone" >点击验证</el-button>
                    <el-button size="mini" v-if="!isShowReset" @click="resetPwd">通过原密保重置</el-button>
                </el-form-item>
            </el-form >
        </div>
    </div>
</template>

<script>
import { protectionData } from '@/config/index'
import { mapGetters, mapActions } from "vuex";
import { checkRules, rePhone, smsCodeNumber } from '@/config/rules'
import { smsCodeMixin } from "@/config/miXin"

export default {
    inject: ['reload'],
    mixins:[smsCodeMixin],
    data() {
        return {
            checkRules: checkRules,
            protectionData: protectionData,
            isShowSmsCode: 'one',
            actionTemplate: 'password_protection',
            smsCodeNumber: smsCodeNumber,  
            safeSteps: 1,
            pwdSafeInit :{//初始化密保数据
                mobile_verify_code: '',
                keyOne:'',
                valueOne:'',
                keyTwo:'',
                valueTwo:''
            },
            verifiPwd:{//验证当前密保数据
                valueOne:'',
                valueTwo:''
            },
            isShowReset: true,//控制手机和密保重置方式
            setPwdStep: true,//密保重置初始化
            resetPwdData: {//通过密保重置数据
                keyOne:'',
                valueOne:'',
                keyTwo:'',
                valueTwo:''
            },
            changeEncrypted: {//更换密保参数
                type: '',//1密保，2手机短信
                mobile_verify_code: ''//短信验证码
            },
            iphoneEncrypted: {// 手机号码设置密保
                keyOne:'',
                valueOne:'',
                keyTwo:'',
                valueTwo:'',
                mobile_verify_code:''
            },
        }
    },
    methods: {
        ...mapActions(['initProtection', 'sendSmsCode', 'verifyProtection', 'changeProtection']),
        //初始化密码保护
        setSafeStep() {
            this.$refs['pwdSafeInit'].validate((valid) => {
                if (valid) {
                    if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four'){
                        let params = {
                            mobile_verify_code: this.pwdSafeInit.mobile_verify_code,
                            protection:`{"${this.pwdSafeInit.keyOne}":"${this.pwdSafeInit.valueOne}","${this.pwdSafeInit.keyTwo}":"${this.pwdSafeInit.valueTwo}"}`
                        }
                        let password_protection = [this.pwdSafeInit.keyOne, this.pwdSafeInit.keyTwo]
                        this.initProtection(params).then(res=>{
                            if(res.code == 200){
                                this.$message.success(res.message)
                                this.$store.commit('PROTECT', {is_protect: true, password_protection: password_protection})
                                this.reload()
                            }
                        })
                    }else {
                        this.$message.error(`请获取短信验证码`);
                    }
                }
            });
        },
        //重新设置密码保护
        setNext() {
            this.safeSteps = 2
        },
        //验证当前答案
        safeBySecurity() {
            this.$refs['verifiPwd'].validate((valid) => {
                if (valid) {
                    let obj = {
                        [this.getUserInfo.password_protection[0]]: this.verifiPwd.valueOne,
                        [this.getUserInfo.password_protection[1]]: this.verifiPwd.valueTwo
                    }                    
                    const params = {
                        protection: JSON.stringify(obj)
                    }
                    this.verifyProtection(params).then(res => {
                        if(res.code == 200) {
                            // 保存旧密保数据
                            this.changeEncrypted.oldProtection = JSON.stringify(obj)
                            this.changeEncrypted.type = 1
                            this.setPwdStep = false
                        }
                    })                 
                }
            });
        },
        // 显示通过手机重置密保
        resetPhone() {
            this.isShowReset = false
            this.safeSteps = 3
        },
        // 显示通过密保重置密保
        resetPwd() {
            this.isShowReset = true
            this.safeSteps = 2
        },
        // 通过密保重置密保
        resetEncrypted() {
            this.$refs['resetPwdData'].validate((valid) => {
                if (valid) {
                    let obj = {
                        [this.resetPwdData.keyOne]: this.resetPwdData.valueOne,
                        [this.resetPwdData.keyTwo]: this.resetPwdData.valueTwo
                    } 
                    this.changeEncrypted.newProtection = JSON.stringify(obj)
                    this.changeEncrypted.password_protection = [this.resetPwdData.keyOne,this.resetPwdData.keyTwo]
                    this.changeProtection(this.changeEncrypted).then(res => {
                        if(res.code == 200) {
                            this.$message.success(res.message)
                            this.$store.commit('PROTECT', {is_protect: true, password_protection: this.changeEncrypted.password_protection})
                            this.changeEncrypted = {}
                            this.reload()
                        }
                    })
                }
            });
        },
        //通过手机重置密保
        safeByPhone() {
            this.$refs['iphoneEncryptedr'].validate((valid) => {
                if (valid) {
                    if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
                        let obj = {
                            [this.iphoneEncrypted.keyOne]: this.iphoneEncrypted.valueOne,
                            [this.iphoneEncrypted.keyTwo]: this.iphoneEncrypted.valueTwo
                        } 
                        this.changeEncrypted.type = 2,
                        this.changeEncrypted.mobile_verify_code = this.iphoneEncrypted.mobile_verify_code,
                        this.changeEncrypted.newProtection = JSON.stringify(obj)
                        this.changeEncrypted.password_protection = [this.iphoneEncrypted.keyOne, this.iphoneEncrypted.keyTwo]
                        this.changeProtection(this.changeEncrypted).then(res => {
                            if(res.code == 200) {
                                this.$message.success(res.message)
                                this.$store.commit('PROTECT', {is_protect: true, password_protection: this.changeEncrypted.password_protection})
                                this.changeEncrypted = {}
                                this.reload()
                            }
                        })
                    }else {
                        this.$message.error(`请获取短信验证码`);
                    }
                }
            });
        }
    },
    computed: {
        ...mapGetters(['getUserInfo']),
    }
}
</script>

<style lang="scss" scoped>
    .step-input {
        width: 200px;
    }
    .step1-form {
        margin: 0 auto;
        padding: 30px 0 ;
        width: 700px;
    }
    .step-btn {
        background: #fe7b20;
            color: #fff;
    }
</style>