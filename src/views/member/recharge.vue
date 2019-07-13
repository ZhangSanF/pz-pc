<template>
    <div class="recharge">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con">
            <dl class="user-pay-list">
                <dt>充值方式</dt>
                <dd>
                    <ul class="clearfix pay-list">
                        <li :class="[activeTab == item.label ? 'active' : '', 'list']"  v-for="(item, index) in titleList" :key="index" @click="changPayTitle(item.label)">
                            {{item.name}}
                        </li>
                    </ul>
                </dd>
            </dl>
            <div class="pay-con">
                <h3 class="choose-title">请选择支付通道</h3>
                <div v-for="(item, index) in getPayData" :key="index" v-show="activeTab == index">
                    <div v-for="(obj, key) in item" :key="key">
                        <el-radio v-model="radio" :label="key" class="pay-c-item" @change="changeRadio(key)">
                            {{obj.byname}}
                            <div class="item-detail">
                                <p>选用此通道每笔需支付<span class="money-style">{{obj.get_fee}}%</span>手续费</p>
                                <p>此通道支付限额下限<span class="money-style">{{obj.min}}</span>元，上限<span class="money-style">{{obj.max}}</span>元</p>
                                <p>{{obj.remark}}</p>
                            </div>
                        </el-radio>
                        <div class="submit-btn">
                            <h3 class="money-title">请输入充值金额</h3>
                            <el-input class="money-input"></el-input><span class="font-rmb">RMB(元)</span>
                            <span class="tijiao" @click="submitFun(obj.bankcode, obj.payment_type, obj.id)">提交充值</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="promot">
                <p class="form-warm-prompt-title">温馨提示：</p>
                <p class="form-warm-prompt-con">
                    1.  为了您的资金安全，请您在充值前完成手机绑定，身份认证及支付密码设置。<br>
                    2.  充值过程遇到问题，请联系客服，400-8357-678
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import { mapGetters, mapActions } from "vuex";

export default {
    components:{ Title },
    data() {
        return {
            infoTitle: {
                title:'充值',
                todu:{
                    title:'',
                }
            },
            titleList:[
                {name: 'QQ支付', label: 'qqpay'},
                {name: '银联快捷支付', label: 'quick'},
                {name: '银联扫码支付', label: 'union'},
                {name: '网银在线支付', label: 'online'},
                {name: '微信扫码支付', label: 'weixinpay'},
                {name: '支付宝支付', label: 'alipay'},
                {name: '支付宝扫码支付', label: 'scanalipay'},
                {name: '银行卡汇款', label: 'bankcard'}
            ],
            activeTab: 'qqpay',
            radio: 0
        }
    },
    created() {
        this.paymentinfo()
    },
    methods:{
        ...mapActions(['paymentinfo', 'depositwithdrawplatform']),
        changPayTitle(label) {
            this.activeTab = label
        },
        changeRadio(key) {
            // console.log(key)
        },
        submitFun(bankcode, payment_type, id) {
            let obj = {
                method: 'thirdPayment', //交易方式
                order_amount: '333', // 金额
                bank_code: bankcode, // 支付code码
                bank_type: payment_type, // 支付type码,部分银行需要
                pay_id: id, // 支付id
                card_num: '', // 转账账号
                card_name: '', //转账用户名
                password: '' //	提款密码
            }
            console.log(obj)
            // this.depositwithdrawplatform(obj)
        }
    },
    mounted() {
        
    },
    computed:{
        ...mapGetters(['getPayData'])
    },
    watch:{

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
            .pay-c-item{
                width: 415px; margin-left: 10px;height: 110px;padding: 14px 20px;margin-bottom: 20px;
                border: 1px dotted #a2a2a2;box-sizing: border-box;
                .item-detail{
                    padding: 6px 8px;box-sizing: border-box;font-size: 12px;
                    p{
                        margin-top: 2px;word-break: normal;width: 100%;overflow: hidden;
                        .money-style{
                            font-weight: 800;color: #ffa965;
                        }
                    }
                }
            }
            .submit-btn{
                .money-title{
                    font-size: 16px;margin: 10px 0;color: #555;font-weight: bold;
                }
                .money-input{
                    width: 400px;
                }
                .font-rmb{
                    background-color: #f5f7fa;text-align: center;color: #909399;display: inline-block;
                    border: 1px solid #dcdfe6;border-radius: 4px; border-left: none;border-top-left-radius: 0;
                    border-bottom-left-radius: 0;height: 38px;line-height: 38px;padding: 0 20px;
                }
                .tijiao{
                    display: inline-block;height: 38px;line-height: 38px;color: #fff;border: 1px solid #e6a23c;margin-left: 10px;
                    background: #e6a23c;box-sizing: border-box;padding: 0 20px; font-size: 14px;cursor: pointer;border-radius: 4px;
                }
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
</style>
