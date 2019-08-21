<template>
  <div>
      <div v-if="!getUserInfo.is_protect">
            <el-form 
                :model="pwdSafe1From"
                size="mini"
                :rules="checkRules"
                ref="pwdSafe1"
                label-width="200px"
                v-if="safeSteps == 2  "
                class="step1-form">
                <el-form-item label="请选择问题" prop="keyOne">
                    <el-select   v-model="pwdSafe1From.keyOne" size="mini" placeholder="请选择当前密保问题">
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
                    <el-select   v-model="pwdSafe1From.keyTwo" size="mini" placeholder="请选择当前密保问题">
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
                    <!-- 初始化 -->
                    <el-button v-if="isInit" size="mini" class="step-btn" @click="setSafeStep(1)">设置</el-button>
                    <!-- 重置 -->
                    <el-button v-else size="mini" class="step-btn" @click="resetEncrypted(1)">设置重置</el-button>
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
                <el-form-item label="当前密保问题">
                    <el-input size="mini" 
                    :value="getUserInfo.password_protection[0]" 
                    disabled class="step-input">
                    </el-input>
                </el-form-item>
                <el-form-item label="请输入答案" prop="valueOne"  v-show="showAnswer">
                    <el-input size="mini" v-model="pwdSafe2.valueOne" class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="当前密保问题">
                    <el-input size="mini"  
                    :value="getUserInfo.password_protection[1]" 
                    disabled class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="请输入答案" prop="valueTwo"  v-show="showAnswer">
                    <el-input size="mini"  v-model="pwdSafe2.valueTwo"   class="step-input"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini" v-if="showAnswer" class="step-btn" @click="safeBySecurity()">验证当前密保</el-button>
                    <el-button size="mini" v-else class="step-btn" @click="changeAnswer()">通过密保重置</el-button>                                  
                    <el-button size="mini" v-show="!showAnswer"  @click="setSafeStep(3)" >通过手机重置</el-button>
                </el-form-item>
            </el-form>
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
                <el-form-item label="手机号码" prop="mobile">
                    <el-input size="mini"  v-model.trim="iphoneEncrypted.mobile" placeholder="请输入手机号码"  class="step-input"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码" prop="mobile_verify_code">
                    <el-input v-model.trim="iphoneEncrypted.mobile_verify_code" size="mini" placeholder="请输入短信验证码"  class="step-input"></el-input>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'one'">获取短信验证码</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
                    <el-button size="mini" class="step-btn" v-if="isShowSmsCode == 'three'">验证码{{smsCodeNumber}}秒有效</el-button>
                    <el-button size="mini" class="step-btn" @click="getVerify" v-if="isShowSmsCode == 'four'">重新获取验证码</el-button>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini"  class="step-btn" @click="safeByPhone()" >点击验证</el-button>
                    <el-button size="mini" @click="setSafeStep(2)" >通过原密保重置</el-button>
                </el-form-item>
            </el-form >
        </div>
  </div>
</template>

<script>
import { protectionData } from '@/config/index.js'
import { mapGetters, mapActions } from "vuex";
import { checkRules } from '@/config/rules.js'

export default {
    inject: ['reload'],
    data() {
        return {
            checkRules: checkRules,
            protectionData: protectionData,
            rePhone: /^[1]([3-9])[0-9]{9}$/,//手机号码
            isInit: true,//初始化密保是否为重置
            showAnswer: false,// 是否显示答案输入框
            isShowSmsCode: 'one',
            smsCodeNumber: 10,  
            safeSteps: 2,
            pwdSafe2:{
                valueOne:'',
                valueTwo:''
            },
            pwdSafe1From :{
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
                mobile:'',
                mobile_verify_code:''
            },
        }
    },
    methods: {
        ...mapActions(['initProtection','sendSmsCode', 'verifyProtection', 'changeProtection']),
        changeAnswer() {
            this.showAnswer = true
        },
        //初始化密码保护
        setSafeStep(a) {
            if(a > 1)this.safeSteps = a
            else if(a == 1){
                this.$refs['pwdSafe1'].validate((valid) => {
                    if (valid) {
                        let params = {
                            protection:`{"${this.pwdSafe1From.keyOne}":"${this.pwdSafe1From.valueOne}","${this.pwdSafe1From.keyTwo}":"${this.pwdSafe1From.valueTwo}"}`
                        }
                        let password_protection = [this.pwdSafe1From.keyOne,this.pwdSafe1From.keyTwo]
                        this.initProtection(params).then(res=>{
                            if(res.code == 200){
                                this.$message.success(res.message)
                                this.$store.commit('PROTECT', {is_protect: true, password_protection: password_protection})
                                this.reload()
                            }
                            // else {
                            //     this.$message.error(`${res.message}`);
                            // }
                        })
                    }
                });
            }
        },
        //验证当前密保
        safeBySecurity() {
            this.$refs['pwdSafe2'].validate((valid) => {
                if (valid) {
                    let obj = {
                        [this.getUserInfo.password_protection[0]]: this.pwdSafe2.valueOne,
                        [this.getUserInfo.password_protection[1]]: this.pwdSafe2.valueTwo
                    }                    
                    const params = {
                        protection: JSON.stringify(obj)
                    }
                    this.verifyProtection(params).then(res => {
                        if(res.code == 200) {
                            // 保存旧密保数据
                            this.changeEncrypted.oldProtection = JSON.stringify(obj)
                            this.changeEncrypted.type = 1
                            this.$store.commit('PROTECT', {is_protect: false, password_protection: []})
                            this.isInit = false
                        }
                        // else {
                        //     this.$message.error(`${res.message}`);
                        // }
                    })                   
                }
            });
        },
        // 通过密保重置密保
        resetEncrypted(a) {
            if(a > 1)this.safeSteps = a
            else if(a == 1){
                this.$refs['pwdSafe1'].validate((valid) => {
                    if (valid) {
                        let obj = {
                            [this.pwdSafe1From.keyOne]: this.pwdSafe1From.valueOne,
                            [this.pwdSafe1From.keyTwo]: this.pwdSafe1From.valueTwo
                        } 
                        this.changeEncrypted.newProtection = JSON.stringify(obj)
                        this.changeEncrypted.password_protection = [this.pwdSafe1From.keyOne,this.pwdSafe1From.keyTwo]
                        this.changeProtection(this.changeEncrypted).then(res => {
                            if(res.code == 200) {
                                this.$message.success(res.message)
                                this.$store.commit('PROTECT', {is_protect: true, password_protection: this.changeEncrypted.password_protection})
                                this.changeEncrypted = {}
                                this.reload()
                            }
                            // else {
                            //     this.$message.error(`${res.message}`);
                            // }
                        })
                    }
                });
            }
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
                            // else {
                            //     this.$message.error(`${res.message}`);
                            // }
                        })
                    }else {
                        this.$message.error(`请点击发送手机验证码`);
                    }
                }
            });
        }, 
        // 获取短信验证码
        getVerify() {
            let _this = this
            let obj = {
                template: 'password_protection',
                mobile: _this.iphoneEncrypted.mobile
            }
            if (_this.rePhone.test(obj.mobile)) {
                _this.isShowSmsCode = 'two'               
                _this.sendSmsCode(obj).then((res) => {
                    if(res.code == 200) {
                        _this.$message.success(res.message)
                        _this.isShowSmsCode = 'three'
                        let _run = () => {
                            setTimeout(() => {
                                _this.smsCodeNumber--
                                if (_this.smsCodeNumber > 0) {
                                    _run();
                                } else {
                                    _this.isShowSmsCode = 'four'
                                    _this.smsCodeNumber = 10
                                }
                            }, 1000);
                        };
                        _run();
                    }else {
                        _this.isShowSmsCode = 'one'
                        // this.$message.error(`${res.message}`);
                    }
                })
            }
        },
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