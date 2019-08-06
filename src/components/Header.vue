<template>
    <div class="new-header-bg">
        <div class="header-top">
            <div class="wrapper left">
                <div class="tel-num">
                    欢迎访问出彩速配，易记网址：<span class="red">{{getSettingBase.site_domain}}</span>，财富热线：<span class="red">{{getSettingBase.service_telephone}}</span>
                </div>
                <div class="quick-link">                   
                    <span v-if="!getIsLogin"><router-link to="/user/login"  tag="a">您好，请登录</router-link>  |</span>
                    <span v-else><router-link to="/member" tag="a">我的账户</router-link>  |</span>
                    <span v-if="!getIsLogin"><router-link to="/user/register" tag="a">免费注册</router-link>  |</span>
                    <span v-else><a href="javascript:void(0);" @click="exitLogin">退出</a>  |</span>
                    <span><router-link to="/user/bangzhu" tag="a">帮助中心</router-link>  |</span>
                    <span><a href="javascript:void(0);" @click="toAbout('公司简介', '0')">关于我们</a></span>
                </div>
            </div>
            <div class="header">
                <div class="d_wrapM wrapper">
                    <img @click="toHome" class="header-logo" :src="getSettingBase.site_logo" alt="">
                    <ul>
                        <li class="navigation-item">
                            <router-link to="/home" tag="a">网站首页</router-link>
                        </li>
                        <li class="navigation-item">
                            <router-link to="/freefee" tag="a">免息配资</router-link>
                        </li>
                        <li class="navigation-item">
                            <router-link to="/dayFinancing" tag="a">按天配资</router-link>
                        </li>
                        <li class="navigation-item name-93">
                            <router-link to="/monthFinancing" tag="a">按月配资</router-link>
                        </li>
                        <li class="navigation-item name-94">
                            <router-link to="/vipFinancing" tag="a">VIP配资</router-link>
                        </li>
                        <li class="navigation-item">
                            <router-link to="/anquan" tag="a">安全保障</router-link>
                        </li>
                        <li class="navigation-item">
                            <router-link to="/xsrw" tag="a">新手任务</router-link>
                        </li>
                        <li class="navigation-item">
                            <router-link to="/downloaded" tag="a">软件下载</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    methods:{
        ...mapActions(['logout']),
        // 返回首页
        toHome() {
            this.$router.push('/home')
        },
        // 退出登录
        exitLogin() {
            this.logout()
        },
        // 关于我们
        toAbout(title, active) {
            this.$router.push('/user/about')
            this.$store.commit('ABOUT_QUERY', {id: '', title: title, active: active})
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters(['getIsLogin', 'getSettingBase'])
    }  
}
</script>

<style lang="scss" scoped>
.new-header-bg{
    position: fixed;top: 0px;z-index: 100;width: 100%;
    .header-top{
        height: 40px;line-height: 40px;display: block;color: #fff;background: #555555;
        .left{
            display: flex;justify-content: space-between;
            .tel-num{
                font-size: 12px;vertical-align: 5px;
                .red{
                    font-weight: bold;color: #f77e76;
                }
            }
            .quick-link{
                color: #dbdbdb;font-size: 12px;
                a{
                    color: #fff;font-size: 12px;display: inline-block;padding: 0 5px;
                }
                a:hover{
                    color: #F65C54;
                }
            }
        }
        .header {
            height: 90px;background: #fff; margin: 0 auto;box-shadow: 0px 2px 5px #ddd;
            .d_wrapM{
                display: flex;justify-content: space-between;height: 100%;align-items: center;
                .header-logo{
                    cursor: pointer;
                }
                ul{
                    .navigation-item{
                        font-weight: bold;float: left;position: relative;
                        a{
                            display: block;color: #3E3E3E;line-height: 42px;height: 42px;font-size: 16px;width: 97px;text-align: center;
                        }
                        a:hover{
                            color: #F65C54;
                        }                      
                    }
                    .name-93:before, .name-94:before{
                        content: '';display: block;width: 27px;height: 20px;position: absolute;top: -9px;right: 18px;background: url(../assets/image/hot.gif) no-repeat;
                    }
                    .name-94:before{
                        background: url(../assets/image/new.gif) no-repeat;top: -2px;
                    }
                }
            }
        }
    }
}
</style>

