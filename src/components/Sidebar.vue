<template>
    <div class="sidebar-right">
        <span class="item">
            <img src="../assets/image/ct_sidebar-1.png" alt="">
            <p>QQ客服</p>
            <div class="dropdown">
                <ul>
                    <li>
                        <span class="f-qq">客服QQ：</span>
                        <a :href="serviceQQ" target="_blank">
                            <img src="../assets/image/button_11.gif" alt="">
                        </a>
                    </li>
                    <li>
                        <span class="f-qq">财务QQ：</span>
                        <a :href="financeQQ" target="_blank">
                            <img src="../assets/image/button_11.gif" alt="">
                        </a>
                    </li>
                </ul>
            </div>
        </span>
        <span>
            <a class="xszn" href="javascript:void(0);" @click="toAbout('新手指南', '3')">
                <img src="../assets/image/ct_sidebar-3.png" alt="新手指南">
                <p>新手指南</p>
            </a>
        </span>
        <span>
            <img src="../assets/image/ct_sidebar-4.png" alt="微信客服">
            <p>微信客服</p>
            <div class="saoma">
                <img class="wxkf" :src="getSettingBase.weixin_service_img" alt="">
            </div>
        </span>
        <span>
            <img src="../assets/image/ct_sidebar-4.png" alt="网站APP">
            <p>网站APP</p>
            <div class="saoma">
                <img class="wxkf" :src="getSettingBase.website_app_img" alt="">
            </div>
        </span>
        <span>
            <img src="../assets/image/ct_sidebar-4.png" alt="网站APP">
            <p>交易APP</p>
            <div class="saoma">
                <img class="wxkf" :src="getSettingBase.shares_app_img" alt="">
            </div>
        </span>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {

        }
    },
    methods: {
        toAbout(title, active) {
            this.$router.push('/user/about')
            this.$store.commit('ABOUT_QUERY', {id: '', title: title, active: active})
        }
    },
    computed: {
        ...mapGetters(['getSettingBase']),
        //客服QQ
        serviceQQ() {
            if(this.getSettingBase.service_qq != undefined) {
                let qq = this.getSettingBase.service_qq.split('|')[0]
                return `https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`
            }           
        },
        // //财务QQ
        financeQQ() {
            if(this.getSettingBase.service_qq != undefined) {
                let qq = this.getSettingBase.service_qq.split('|')[1]
                return `https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar-right{
    position: fixed;top: 20%; right: 10px;z-index: 999;
    >span{
        display: block;width: 60px;height: 69px;margin-bottom: 5px;text-align: center;font-size: 12px;color: #fff;
        background-color: #E7282F;position: relative;
        >img{
            display: block;margin: 0 auto;padding: 6px 0 2px 0;
        }
        .dropdown{
            display: none;position: absolute;top: 0;left: -172px;width: 170px;border: 1px solid #ccc;color: #666;padding: 20px 0;
            background-color: #fff;z-index: 9999;
            li{
                display: flex;align-items: center;justify-content: center;padding: 4px 15px;cursor: pointer;
                .f-qq{
                    color: #838383;
                }
            }
        }
        .xszn{
            color: #fff;display: block;padding: 5px 0px;
        }
        .saoma{
            display: none;position: absolute;top: 0;width: 150px;height: 150px;left: -170px; padding: 10px 10px;background: #E7282F;z-index: 9999;
            .wxkf{
                margin: 0px;width: 150px;height: 150px;float: none; 
            }
        }
    }
    >span:hover{
        background-color: #F75750;  
    }
    >span:hover .dropdown{
        display: block;  
    }
    >span:hover .saoma{
        display: block;  
    }
}
</style>
