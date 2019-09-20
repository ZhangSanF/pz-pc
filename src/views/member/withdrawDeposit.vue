<template>
    <div class="withdrawDeposit">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con">
            <dl class="user-drawings-bank clearfix" v-show="!showBank">
                <!-- <dt>请选择银行卡</dt> -->
                <dd v-if="getUserInfo.bank_card_number && getUserInfo.bank_name" class="user-drawings-add-bank_p">
                    <p class="user-drawings-bank-num">{{getUserInfo.bank_name}}</p>
                    <div class="content">
                        <span class="font">{{getUserInfo.bank_card_number}}</span>
                        <img class="img" src="../../assets/image/pay.png" alt="">
                    </div>
                </dd>
                <dd v-else class="user-drawings-add-bank" @click="showAddBank">
                    <img src="../../assets/image/bank_img.png" alt="" width="66" height="54">
                    <span class="user-drawings-add-bank-txt">添加银行卡</span>
                </dd> 
            </dl>
            <div class="add-bank" v-show="showBank">
                <Bank :prompt="prompt"/>
            </div>
            <h3>填写提现金额：</h3>
            <div class="form-style">
                <ul>
                    <li class="form-style-item">
                        <label class="form-style-label">提现金额</label>
                        <input type="text" class="input-text-style" v-model="money" @keyup.native="moneyKeyUp" @blur="moneyBlur">
                        <span class="flmgr">元</span>
                    </li>
                    <li class="form-style-item password-font">
                        <label class="form-style-label">支付密码</label>
                        <input v-if="getUserInfo.is_pay_password" type="text" class="input-text-style" v-model.trim="password">
                        <span v-else><span class="setPass" @click="goSafeSetting(4)">设置支付密码</span>后才可以提现哦~</span>
                    </li>
                </ul>
            </div>
            <div class="form-style-submit">
                <span class="btn-style" @click="payAction">确认提现</span>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Bank from '@/components/member/Bank'
import { mapGetters, mapActions } from "vuex";
import md5 from 'js-md5';
import { reChinese } from '@/config/rules.js'

export default {
    inject: ['reload'],
    components:{ Title, Bank },
    data() {
        return {
            infoTitle: {
                title:'提现',
                todu:{
                    title:'查看提现记录',
                }
            },
            showBank: false,         
            money: '',
            password: '',
            prompt:[
                '比如您的开户行名称为"工商银行北京宣武门支行"，只需输入关键词"宣武"即可。如果推荐列表中没有符合关键词的信息，',
                '请您务必在列表中选择开户城市的银行分行，如：工商银行北京市分行营业部。',
            ],
            
        }
    },
    created() {
        // 未实名认证跳转
        if(!this.getUserInfo.is_real_name) {
            this.$alert('您还未完成身份验证，请先进行实名认证')
            this.$router.push('/member/safeSetting')
        }
    },
    methods:{
        toDoMore() {
            this.$router.push('/member/withdrawalRecord')
        },
        ...mapActions(['depositwithdrawplatform', 'getVerify']),
        goSafeSetting(id) {
            this.$router.push({ path: '/member/safeSetting', query: { showId: id} })
        },
        showAddBank() {
            this.showBank = true
        },
        moneyKeyUp(e) {
            //金额强制转浮点型 排除0 .
            if (e && (e.keyCode === 190 || e.keyCode === 48)) {
                return;
            }
            var re = /^\d{1}\d*\.{0,1}\d{0,2}$/;
            if (!re.test(this.money)) {
                this.money = "";
            }
        },
        moneyBlur(e) {
            this.money = parseFloat(parseFloat(this.money).toFixed(2)) || "";
        },
        payAction() {
            if(this.getUserInfo.is_pay_password == false) { return this.$alert('设置支付密码后才可以提现哦!'); }
            if(!this.getUserInfo.bank_card_number && !this.getUserInfo.bank_name) {
                return this.$alert('添加银行卡后才可以提现哦!');
            }
            if(!this.money || !this.password) { return this.$alert('请填写完整的信息!'); }
            if(this.money < this.getBankList.min) {return this.$alert(`提款金额不小于${this.getBankList.min}!`);}
            this.depositwithdrawplatform({
                method: 'memberWithdrawal',
                order_amount: this.money,
                password: md5(this.password)
            }).then((res) => {
                if(res.code == 200) {
                    this.$message.success(res.message)
                    this.reload()
                }
            })
        }
    },
    computed:{
        ...mapGetters(['getUserInfo', 'getBankList'])
    },
    watch: {
        // 去掉中文双字节字符
        'password': {
            handler(newVal, old) {
                this.password = newVal.replace(reChinese,'');
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.setPass{
    cursor: pointer;
    color: #e25353;
}
.setPass:hover{
    color: red;
}
.withdrawDeposit{
    background: #fff;border: 1px solid #e0e0e0;border-radius: 3px;
    .user-box-con{
       width: 964px;margin: 0 auto;padding: 30px 0; 
       .user-drawings-bank{
            margin: 0 0 20px;padding-bottom: 15px;border-bottom: 0 solid #e0e0e0;
            dt{
                margin-bottom: 10px;float: left;line-height: 30px;font-size: 14px;font-weight: 700;width: 100%;
            }
            .user-drawings-add-bank{
                border: 1px dashed #e0e0e0;background: #f5f5f5;
            }
            .user-drawings-add-bank_p{
                margin-bottom: 10px;
                width: 228px;
                height: 127px;
                margin: 20px 15px 0 0;
                border-radius: 5px;
                cursor: pointer;
                background: #f5f5f5;
                box-sizing: border-box;
                .user-drawings-bank-num{
                    border-radius: 5px 5px 0 0;
                    margin: 0 15px;
                    height: 32px;
                    line-height: 32px;
                    border-bottom: 1px solid #e0e0e0;
                    box-sizing: border-box;
                }
                .content{
                    box-sizing: border-box;
                    width: 100%;
                    height: 91px;
                    padding-left: 15px;
                    padding-top: 30px;
                    position: relative; 
                    .img{
                        width: 40px;
                        position: absolute;
                        bottom: 5px;
                        right: 15px;
                    }
                }
            }
            .user-drawings-add-bank:hover{
                border: 1px dashed #fe6e00;background: #ffe0c9;
            }
            dd{
                float: left;margin-bottom: 10px;width: 228px;height: 127px;margin-right: 15px;border-radius: 5px;
                position: relative;cursor: pointer;
                img{
                     display: block;margin: 10px auto;
                }
                .user-drawings-add-bank-txt{
                    font-size: 14px;color: #3181d8;display: block;text-align: center;padding-top: 20px;
                }
            }
       }
       h2{
        font-weight: 700;font-size: 14px;
       }
       .form-style{
           padding: 15px 0 30px;padding-top: 0;
           .form-style-item{
                width: 100%;line-height: 30px;margin-top: 15px;
                .form-style-label{
                    width: 92px;  margin-right: 20px; text-align: right;display: inline-block;
                }
                .input-text-style{
                    margin-right: 8px;width: 160px; background: 0 0;border: 0;background-color: #fff;border: 1px solid #d8d8d8;
                    border-radius: 3px;height: 28px;line-height: 28px;padding: 0 10px;outline: none;
                }
                .input-text-style:hover{
                    border: 1px solid #feb67f;
                }
                .input-text-style:focus{
                    border: 1px solid #fe6e00;
                }
                .flmgr{
                    width: 32px;display: inline-block; margin-right: 10px;
                }
                .form-style-error{
                    color: #dc0316;
                }
                .other{
                     margin-right: 8px;height: 33px;overflow: hidden;width: 115px;
                     img{
                         width: 113px;height: 30px;cursor: pointer;
                     }
                }
                .form-style-value{
                    width: 460px;margin-right: 10px;display: inline-block;
                }
           }
       }
       .form-style-submit{
            height: 33px;padding-left: 382px;width: 479px;margin-top: 15px;margin-bottom: 125px;
            .btn-style{
                display: inline-block;height: 30px;line-height: 30px;cursor: pointer;font-size: 12px;background: #fe7b20;color: #fff;
                padding: 0 20px;
            }
       }
    }
}
</style>
