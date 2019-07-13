<template>
    <div class="member">
        <div class="wrapper user-main">
            <!-- left -->
            <div class="user-sidebar">
                <!-- info -->
                <div class="user-sidebar-box user-info">
                    <div class="user-info-detail">
                        <div class="user-head-portrait">
                            <router-link to="/member/userInfo" tag="a">
                                <img src="../../assets/image/noavatar_middle.gif" alt="">
                            </router-link>
                        </div>
                        <div class="user-name">
                            <strong>
                                <a href="#" title="10086">10086</a>
                            </strong>
                        </div>
                    </div>
                    <div class="user-info-status clearfix">
                        <el-tooltip class="item" effect="light" placement="bottom">
                            <span slot="content">您尚未完成实名认证 <a href='' style='color:rgb(20,104,236)'>点击认证</a></span>
                            <span class="identity-not-static"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" placement="bottom">
                            <span slot="content">您已绑定手机3c05f33aea8f5db52c250eab11d0d7a0 <a href='' style='color:rgb(20,104,236)'>点击修改</a></span>
                            <span class="phone-yes-static"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" placement="bottom">
                            <span slot="content">您已设置支付密码 <a href='' style='color:rgb(20,104,236)'>点击修改</a></span>
                            <span class="password-yes-static"></span>
                        </el-tooltip>
                        <div class="user-info-status-progress"></div>
                        <div class="user-info-status-txt">
                            <div style="float:left">
                                安全等级：
                                <strong style="color: #00c25f">中</strong>
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
    </div>
</template>

<script>
export default {
    data() {
        return{
            zcgl: false,
            pzgl: false,
            xxgl: false,
            zhgl: false,            
            activeRouter: ''
        }
    },
    created() {
        this.activeRouter = this.$route.path
        this.isNavActive()
    },
    methods: {
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
            }else {
                this.zhgl = true
            }
        }
    },
    watch: {
        $route(to, from) {
            this.activeRouter = to.path
            this.isNavActive()
        }
    }
}
</script>

<style lang="scss" scoped>
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
                    .identity-not-static{
                       background: url(../../assets/image/user_sprite.png) no-repeat 0 -711px;
                    }
                    .phone-yes-static{
                        background: url(../../assets/image/user_sprite.png) no-repeat 0 -801px;
                    }
                    .password-yes-static{
                        background: url(../../assets/image/user_sprite.png) no-repeat -31px -31px;
                    }
                    .user-info-status-progress{
                        float: left; width: 136px;height: 8px;margin-top: 8px;border-radius: 5px;background: #ebebeb; 
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
</style>
