<template>
    <div class="member" v-if="Object.keys(getUserInfo).length !== 0">
        <div class="wrapper user-main">
            <!-- left -->
            <div class="user-sidebar">
                <!-- info -->
                <div class="user-sidebar-box user-info">
                    <div class="user-info-detail">
                        <div class="user-head-portrait">
                            <router-link to="/member/userInfo" tag="a">
                                <img v-if="getUserInfo.portrait == null" src="../../assets/image/noavatar_middle.gif" alt="">
                                <img v-else :src="getUserInfo.portrait" alt="">
                            </router-link>
                        </div>
                        <div class="user-name">
                            <strong>
                                <router-link to="/member/userInfo" tag="a" :title="getUserInfo.username">
                                    {{getUserInfo.username}}
                                </router-link>
                            </strong>
                        </div>
                    </div>
                    <div class="user-info-status clearfix">
                        <el-tooltip class="item" effect="light" placement="bottom">
                            <span slot="content">
                            {{getUserInfo.is_real_name?'您已完成实名认证':'您尚未完成实名认证'}}
                                <span  
                                :class="getUserInfo.is_real_name?'':''"
                                @click="goSafeSetting(2)"
                                class="blue" >
                                {{getUserInfo.is_real_name?'点击修改':'点击认证'}}
                                </span>
                            </span>
                            <span :class="getUserInfo.is_real_name?'identity-yes-static':'identity-not-static'"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" placement="bottom">
                            <span slot="content">
                                <span v-if="getUserInfo.mobile == '' || getUserInfo.mobile == undefined">您尚未绑定手机</span>
                                <span v-else>
                                    您已绑定手机{{getUserInfo.mobile}}
                                    <span 
                                    @click="goSafeSetting(1)"
                                    class="blue" >
                                    点击修改
                                    </span>
                                </span>
                            </span>
                            <span :class="getUserInfo.mobile ? 'phone-yes-static' : 'phone-not-static'" ></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" placement="bottom">
                            <span  slot="content"> 
                                {{getUserInfo.is_pay_password?'您已设置支付密码':'您未设置支付密码'}} 
                                <span 
                                @click="goSafeSetting(4)"
                                :class="getUserInfo.is_pay_password?'':''"
                                class="blue" >{{getUserInfo.is_pay_password?'点击修改':'点击设置'}} 
                                </span>
                            </span>
                            <span :class="getUserInfo.is_pay_password?'password-yes-static':'password-not-static'" ></span>
                        </el-tooltip>
                        <div class="user-info-status-progress" v-if="percentage">
                            <el-progress :percentage="percentage"></el-progress>
                        </div>
                        <div class="user-info-status-txt">
                            <div style="float:left">
                                安全等级：
                                <strong  style="color: #00c25f" v-if="safeNum == 1 || safeNum == 0" >低</strong>
                                <strong  style="color: #00c25f" v-if="safeNum == 2" >中</strong>
                                <strong  style="color: #00c25f" v-if="safeNum == 3" >高</strong>
                            </div>
                            <router-link to="/member/safeSetting" tag="a">[提升]</router-link>
                        </div>
                    </div>
                </div>
                <!-- nav -->
                <div class="user-sidebar-box user-account-nav">
                    <ul class="user-account-nav-list clearfix">
                        <li class="user-account-nav-list-item">
                            <router-link class="user-account-nav-item" to="/member/myAccount" tag="a">
                                <i class="user-nav-main"></i>
                                <span>账户主页</span>
                            </router-link>
                        </li>
                        <li class="user-account-nav-list-item">
                            <div class="user-account-nav-item" @click="zcgl = !zcgl">
                                <i class="user-nav-money-manage"></i>
                                <span>资产管理</span>
                            </div>
                            <transition name="zcgl">
                                <ul class="zcgl" v-if="zcgl">
                                    <li>
                                        <router-link :class="activeRouter == '/member/tradingRecord' ? 'active' : ''" to="/member/tradingRecord" tag="a">交易记录</router-link>
                                    </li>
                                    <li>
                                        <router-link :class="activeRouter == '/member/recharge' ? 'active' : ''" to="/member/recharge" tag="a">充值</router-link>
                                    </li>
                                    <li>
                                        <router-link :class="activeRouter == '/member/withdrawDeposit' ? 'active' : ''" to="/member/withdrawDeposit" tag="a">提现</router-link>
                                    </li>
                                </ul>
                            </transition>
                        </li>
                        <li class="user-account-nav-list-item">
                            <div class="user-account-nav-item" @click="pzgl = !pzgl">
                                <i class="user-nav-invest-manage"></i>
                                <span>配资管理</span>
                            </div>
                            <transition name="zcgl">
                                <ul class="pzgl" v-if="pzgl">
                                    <li>
                                        <router-link :class="activeRouter == '/member/myFinancing' ? 'active' : ''" to="/member/myFinancing" tag="a">我的配资</router-link>
                                    </li>
                                </ul>
                            </transition>
                        </li>
                        <li class="user-account-nav-list-item">
                            <div class="user-account-nav-item" @click="xxgl = !xxgl">
                                <i class="user-nav-message-manage"></i>
                                <span>消息管理</span>
                            </div>
                            <transition name="zcgl">
                                <ul class="pzgl" v-if="xxgl">
                                    <li>
                                        <router-link :class="activeRouter == '/member/instation' ? 'active' : ''" to="/member/instation" tag="a">站内信息</router-link>
                                    </li>
                                </ul>
                            </transition>
                        </li>
                        <li class="user-account-nav-list-item">
                            <div class="user-account-nav-item" @click="zhgl = !zhgl">
                                <i class="user-nav-account-manage"></i>
                                <span>账户管理</span>
                            </div>
                            <transition name="zcgl">
                                <ul class="zcgl" v-if="zhgl">
                                    <li>
                                        <router-link :class="activeRouter == '/member/userInfo' ? 'active' : ''" to="/member/userInfo" tag="a">个人信息</router-link>
                                    </li>
                                    <li>
                                        <router-link :class="activeRouter == '/member/bankInfo' ? 'active' : ''" to="/member/bankInfo" tag="a">银行卡信息</router-link>
                                    </li>
                                    <li>
                                        <router-link :class="activeRouter == '/member/safeSetting' ? 'active' : ''" to="/member/safeSetting" tag="a">安全设置</router-link>
                                    </li>
                                </ul>
                            </transition>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- right -->
            <div class="user-con">
                <router-view/>
            </div>
        </div>
        <!-- 会员手机号认证 -->
        <div class="init-mobile" v-if="getIsShowPhone">
            <div class="mobile-alert">
                <div class="title">验证手机号</div>
                <div class="info">您还未对手机验证，请先进行验证！</div>
                <div class="setwin" @click="closeAlert">
                    <a href="javascript:void(0);"></a>
                </div>
                <el-form ref="ruleForm" :model="ruleForm"  :rules="checkRules">
                    <el-form-item  prop="mobile" class="reg-item">
                        <el-input  type="phone"  placeholder="请输入11位中国大陆手机号"  v-model.trim="ruleForm.mobile"></el-input>
                    </el-form-item>   
                    <el-form-item prop="mobile_verify_code" class="reg-item" >
                        <el-input  class="verifi-input" placeholder="请输入手机验证码"  v-model.trim="ruleForm.mobile_verify_code">
                            <template slot-scope="">
                                <el-button slot="append" @click="getCode" v-if="isShowSmsCode == 'one'">获取验证码</el-button>
                                <el-button slot="append" v-if="isShowSmsCode == 'two'">短信发送中...</el-button>
                                <el-button slot="append" class="second" v-if="isShowSmsCode == 'three'">重新获取({{smsCodeNumber}})</el-button>
                                <el-button slot="append" @click="getCode" v-if="isShowSmsCode == 'four'">重新获取</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item  class="reg-item">
                        <el-button class="reg-btn" @click="initMobileAction">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>       
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { checkRules, rePhone, smsCodeNumber } from '@/config/rules'

export default {
    data() {
        return{
            checkRules: checkRules,
            isShowSmsCode: 'one',
            smsCodeNumber: smsCodeNumber,
            ruleForm: {
                mobile: '',
                mobile_verify_codeL: ''
            },
            zcgl: false,
            pzgl: false,
            xxgl: false,
            zhgl: false,            
            activeRouter: '',
        }
    },
    created() {
        // 判断登录状态
        if(!this.getIsLogin) {
            this.$router.push({path: '/user/login', query: {redirect: this.$route.path}})
        }
        this.activeRouter = this.$route.path
        this.isNavActive()
    },
    methods: {
        ...mapActions(['sendSmsCode', 'initMobile']),
        // 判断 nav 是否展开
        isNavActive() {
            if(this.activeRouter == '/member/tradingRecord' || 
                this.activeRouter == '/member/recharge' || 
                this.activeRouter == '/member/withdrawDeposit') {
                this.zcgl = true
            }else if(this.activeRouter == '/member/myFinancing') {
                this.pzgl = true
            }else if(this.activeRouter == '/member/instation') {
                this.xxgl = true
            }else if(this.activeRouter == '/member/userInfo' ||
                        this.activeRouter == '/member/bankInfo' ||
                        this.activeRouter == '/member/safeSetting') {
                this.zhgl = true
            }
        },
        goSafeSetting(id) {
            this.$router.push({ path: '/member/safeSetting', query: { showId: id} })
        },
        closeAlert() {
            this.$store.commit('IS_SHOW_PHONE', false)
        },
        // 初始化手机
        initMobileAction() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {                      
                    if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
                        this.initMobile(this.ruleForm).then(res=>{ 
                            if( res.code == 200) {
                                this.$store.commit('IS_SHOW_PHONE', false)
                                this.$message.success(res.message)
                                let phone = this.ruleForm.mobile.slice(0,3) + '****' + this.ruleForm.mobile.slice(-4)
                                this.$store.commit('SET_MOBILE',  phone)
                            }
                        })
                    }else {
                        this.$message.error(`请点击发送手机验证码`);
                    }
                }
            });
        },
        //获取手机验证码
        getCode() {
            let _this = this
            if (rePhone.test(_this.ruleForm.mobile)) {
                _this.isShowSmsCode = 'two'
                let obj = {
                    template: 'register',
                    mobile: _this.ruleForm.mobile
                }
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
                                    _this.smsCodeNumber = smsCodeNumber
                                }
                            }, 1000);
                        };
                        _run();
                    }else {
                        _this.isShowSmsCode = 'one'
                    }
                })
            }else {
                this.$message.error(`请输入正确的手机号`);
            }
        }
    },
    mounted() {

    },
    computed:{
        ...mapGetters(['getUserInfo', 'getIsLogin', 'getIsShowPhone']),
        safeNum() {
            let phone = 0
            if(this.getUserInfo.mobile) {
                phone = 1
            }
            return Number(this.getUserInfo.is_real_name) + Number(this.getUserInfo.is_pay_password) + phone
        },
        percentage() {
            if(this.safeNum == 0) {
                return 10
            }else {
                return Number(this.safeNum) * 30
            }
        }
    },
    watch: {
        $route(to, from) {
            this.activeRouter = to.path
            this.isNavActive()
            // 判断是否有初始化手机号码 
            if(this.$store.state.userInfo.mobile == '' || this.$store.state.userInfo.mobile == undefined) {
                this.$store.commit('IS_SHOW_PHONE', true)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.init-mobile{
    position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 2000;background: rgba(0,0,0,.3);
    .mobile-alert{
        position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 2001;width: 400px;height: 280px;background: #fff;
        .title{
            padding: 0 80px 0 10px;height: 35px;line-height: 35px;border-bottom: 1px solid #D5D5D5;font-size: 14px;color: #333;
            overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background-color: #EAEAEA;
        }
        .info{
            text-align: center;
            margin-top: 10px;
        } 
    }
}
.setwin{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 0;
    line-height: initial;
    a{
        background: url(../../assets/image/icon.png) no-repeat -5px -55px; width: 14px;display: inline-block;height: 14px;
    }
}
.member{
    padding-top: 33px;
    .user-main{
        display: flex;justify-content: space-between;
        .user-sidebar{
            width: 168px;
            .user-sidebar-box{
                border: 1px solid #e0e0e0;background: #fff;margin-bottom: 13px;border-radius: 3px;
                .user-info-detail{
                    position: relative;height: 60px; width: 168px;border-bottom: 1px solid #e6e6e6;
                    .user-head-portrait{
                        position: absolute;top: -10px;left: 8px;height: 50px;width: 50px;border: 1px solid #e6e6e6;border-radius: 3px;padding: 4px;background: #fff;
                        img{
                            width: 50px;height: 50px;
                        }
                    }
                    .user-name{
                        position: absolute;top: 7px;left: 77px;width: 78px;height: 42px;word-wrap: break-word;overflow: hidden; 
                        strong{
                            font-size: 14px;
                        }
                    }
                }
                .user-info-status{
                    padding: 10px 0;padding-left: 15px;
                    .item{
                        margin-right: 7px;background-color: #eee;cursor: pointer;float: left; height: 30px; width: 29px;
                    }
                    .identity-not-static{background-image:url(../../assets/image/user_sprite.png);background-repeat:no-repeat;background-position:0 -711px}
                    .phone-not-static{background-image:url(../../assets/image/user_sprite.png);background-repeat:no-repeat;background-position:0 -771px}
                    .mail-not-static{background-image:url(../../assets/image/user_sprite.png);background-repeat:no-repeat;background-position:-31px -60px}
                    .password-not-static{background-image:url(../../assets/image/user_sprite.png);background-repeat:no-repeat;background-position:-31px 0}
                    .identity-yes-static{background-image:url(../../assets/image/user_sprite.png);background-repeat:no-repeat;background-position:0 -742px}
                    .phone-yes-static{background-image:url(../../assets/image/user_sprite.png);background-repeat:no-repeat;background-position:-0px -801px}
                    .mail-yes-static{background-image:url(../../assets/image/user_sprite.png);background-repeat:no-repeat;background-position:-31px -90px}
                    .password-yes-static{background-image:url(../../assets/image/user_sprite.png);background-repeat:no-repeat;background-position:-31px -31px}
                    .user-info-status-progress{
                        float: left; width: 136px;height: 8px;margin-top: 8px;
                    }
                    .user-info-status-txt{
                        float: left;margin-top: 10px;width: 138px;
                        a{
                            color: #3181d8;float: right;
                        }
                    }
                }
                .user-account-nav-list {
                    width: 162px;
                    margin: 0 auto;
                    .user-account-nav-list-item{
                        float: left;width: 100%; 
                        .user-account-nav-item{
                           display: block;cursor: pointer;margin-top: 2px;height: 40px;line-height: 40px;color: #666;
                            background: -webkit-gradient(linear,0 0,0 100%,from(#fafafa),to(#f0f0f0)); 
                            i{
                                float: left;display: inline;margin-left: 16px;margin-top: 13px;height: 15px;width: 15px;margin-right: 8px;
                            }
                            .user-nav-main {
                                background: url(../../assets/image/user_sprite.png) no-repeat -32px -135px;
                            }
                            .user-nav-money-manage{
                                background: url(../../assets/image/user_sprite.png) no-repeat -17px -141px;
                            }
                            .user-nav-invest-manage{
                                background: url(../../assets/image/user_sprite.png) no-repeat -21px -646px;
                            }
                            .user-nav-message-manage{
                                background: url(../../assets/image/user_sprite.png) no-repeat -21px -533px;
                            }
                            .user-nav-account-manage{
                                background: url(../../assets/image/user_sprite.png) no-repeat -31px -120px;
                            }
                        }
                        .user-account-nav-item span:hover{
                            color:#fb6e02
                        }
                        .user-account-nav-item:hover i{animation:userNav .5s ease;-moz-animation:userNav .5s ease;-webkit-animation:userNav .5s ease;-o-animation:userNav .5s ease}
                        @keyframes userNav{0%{transform:rotate(30deg);-moz-transform:rotate(30deg);-o-transform:rotate(30deg);-webkit-transform:rotate(30deg)}45%{transform:rotate(-15deg);-moz-transform:rotate(-15deg);-o-transform:rotate(-15deg);-webkit-transform:rotate(-15deg)}60%{transform:rotate(10deg);-moz-transform:rotate(10deg);-o-transform:rotate(10deg);-webkit-transform:rotate(10deg)}85%{transform:rotate(-6deg);-moz-transform:rotate(-6deg);-o-transform:rotate(-6deg);-webkit-transform:rotate(-6deg)}100%{transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);-webkit-transform:rotate(0deg)}}
                        .user-account-nav-item:hover .user-nav-main{background:url(../../assets/image/user_sprite.png) no-repeat -47px -135px;}
                        .user-account-nav-item:hover .user-nav-money-manage{background:url(../../assets/image/user_sprite.png) no-repeat -17px -156px}
                        .user-account-nav-item:hover .user-nav-invest-manage{background:url(../../assets/image/user_sprite.png) no-repeat -21px -632px}
                        .user-account-nav-item:hover .user-nav-award-manage{background:url(../../assets/image/user_sprite.png) no-repeat -2px -557px}
                        .user-account-nav-item:hover .user-nav-message-manage{background:url(../../assets/image/user_sprite.png) no-repeat -21px -550px}
                        .user-account-nav-item:hover .user-nav-account-manage{background:url(../../assets/image/user_sprite.png) no-repeat -46px -120px}
                        ul{
                            li{
                                width: 100%;height: 42px;line-height: 42px;border-bottom: 1px solid #f0f0f0;text-indent: 40px;
                                a{
                                    display: block;color:#666;
                                }
                                a:hover{
                                   color: #fb6e02; 
                                }
                                .active{
                                    color: #fb6e02;
                                }
                            }
                        }
                        .zcgl{
                            height: 129px;overflow: hidden;
                        }
                        .pzgl{
                            height: 43px;overflow: hidden;
                        }
                        .zcgl-enter-active, .zcgl-leave-active {
                            transition: height .5s
                        }
                        .zcgl-enter, .zcgl-leave-active {
                            height: 0
                        }
                    }
                }
            }
        }
        .user-con{
            width: 1019px;
        }
    }
}
.blue {
    cursor: pointer;
    color:rgb(20,104,236)
}
.ok-set {
    color:#00c25f
}
</style>
<style lang="scss">
.user-info-status-progress{
    .el-progress__text{display:none;}
    .el-progress-bar{padding-right: 0;}
}
.init-mobile{
    .reg-item{
        margin: 20px 40px;
    }
    .reg-btn{
        width: 320px;
    }
}
</style>
