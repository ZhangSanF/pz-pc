<template>
    <div class="recharge">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con">
            <dl class="user-pay-list">
                <dt>充值方式</dt>
                <dd>
                    <div class="pay" v-if="getPayData">
                    <el-tabs type="border-card">
                        <el-tab-pane type="border-card" v-if="getPayData.online">
                            <span slot="label"> 网银在线支付</span>
                            <auto-pay :data='getPayData.online'></auto-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card" v-if="getPayData.quick">
                            <span slot="label"> 银联快捷支付</span>
                            <auto-pay :data='getPayData.quick'></auto-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card" v-if="getPayData.scanysfpay">
                            <span slot="label"> 云闪付扫码支付</span>
                            <scan-pay :data="getPayData.scanysfpay"></scan-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card" v-if="getPayData.union">
                            <span slot="label"> 银联扫码支付</span>
                            <auto-pay :data='getPayData.union'></auto-pay>
                        </el-tab-pane>
                        <el-tab-pane v-if="getPayData.alipay">
                            <span slot="label"> 支付宝支付</span>
                            <auto-pay :data='getPayData.alipay'></auto-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card"  v-if="getPayData.weixinpay">
                            <span slot="label"> 微信支付</span>
                            <auto-pay :data='getPayData.weixinpay'></auto-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card"  v-if="getPayData.qqpay">
                            <span slot="label"> QQ支付</span>
                            <auto-pay :data='getPayData.qqpay'></auto-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card"  v-if="getPayData.jdpay">
                            <span slot="label"> 京东支付</span>
                            <auto-pay :data='getPayData.jdpay'></auto-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card" v-if="getPayData.scanwxpay">
                            <span slot="label"> 微信扫码支付</span>
                            <scan-pay :data="getPayData.scanwxpay"></scan-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card" v-if="getPayData.scanalipay">
                            <span slot="label"> 支付宝扫码支付</span>
                            <scan-pay :data="getPayData.scanalipay"></scan-pay>
                        </el-tab-pane>

                        <el-tab-pane type="border-card" v-if="getPayData.otc">
                            <span slot="label"> 微信/支付宝OTC</span>
                            <auto-pay :data='getPayData.otc' payType="otc"></auto-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card" v-if="getPayData.bankcard">
                            <span slot="label"> 银行卡汇款</span>
                            <bankcard-pay :data="getPayData.bankcard" type="bankcard"></bankcard-pay>
                        </el-tab-pane>
                        <el-tab-pane type="border-card" v-if="getPayData.alipay_bank">
                            <span slot="label"> 支付宝转银行卡</span>
                            <bankcard-pay :data="getPayData.alipay_bank" type="alipay_bank"></bankcard-pay>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                </dd>
            </dl>
            <!-- <div class="pay-con">
                <h3 class="choose-title">请选择支付通道</h3>
            </div>
            <div class="promot">
                <p class="form-warm-prompt-title">温馨提示：</p>
                <p class="form-warm-prompt-con">
                    1.  为了您的资金安全，请您在充值前完成手机绑定，身份认证及支付密码设置。<br>
                    2.  充值过程遇到问题，请联系客服，400-8357-678
                </p>
            </div> -->
        </div>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import AutoPay from '@/components/account/AutoPay'
import ScanPay from '@/components/account/ScanPay'
import BankcardPay from '@/components/account/BankcardPay'
import { mapGetters, mapActions } from "vuex";

export default {
    components:{ Title, AutoPay, ScanPay, BankcardPay },
    data() {
        return {
            infoTitle: {
                title:'充值',
                todu:{
                    title:'查看充值记录',
                }
            }
        }
    },
    created() {
        this.paymentinfo()
    },
    methods:{
        ...mapActions(['paymentinfo']),
        toDoMore() {
            this.$router.push('/member/rechargeRecord')
        },
    },
    mounted() {
        
    },
    computed:{
        ...mapGetters(['getPayData'])
    }
}
</script>

<style lang="scss" scoped>
.recharge{
    background: #fff;border: 1px solid #e0e0e0;border-radius: 3px;
    .user-box-con{
        width: 964px;margin: 0 auto;padding: 30px 0; 
        .user-pay-list{
            margin-bottom: 25px;
            dt{
                height: 20px;line-height: 20px;margin-bottom: 20px;font-size: 16px;
            }
            dd{
                .pay-list{
                    height: 40px;background: #ff894e;display: flex;
                    .list{
                        flex: 1;height: 100%;line-height: 40px;text-align: center;color: #fff;cursor: pointer;
                    }
                    .list:hover{
                        color: #ffc666;
                    }
                    .active{
                        color: #000;
                    }
                }
            }
        }
        .pay-con{
            padding: 20px 40px;border-radius: 4px;box-sizing: border-box;background: #eee;
            .choose-title{
                font-size: 16px;margin-bottom: 10px; color: #555;font-weight: bold;
            }
        }
        .promot{
            margin-top: 10px;background: none repeat scroll 0 0 #fffadc;border: 1px solid #e3b367;padding: 10px 20px;
            line-height: 24px;color: #666;font-size: 12px;
            .form-warm-prompt-title{
                color: #b73736;font-weight: 700;  
            }
            .form-warm-prompt-con{
                width: 720px;
            }
        }
    }
}
</style>
<style lang="scss">
.money-input{
    .el-input__inner{
        border-top-right-radius: 0 !important;border-bottom-right-radius: 0 !important;
    }  
}
.pay {
    margin-top: 10px;
    /deep/ .el-tabs__header {
      z-index: 1;
      background: #ff894e;
       .el-tabs__item {
         color: #fff;
       }
       .is-active {
         color: #000;
       }
      .el-tabs__item:hover{
        color: #ffc666;
      }
    }
  }

</style>
