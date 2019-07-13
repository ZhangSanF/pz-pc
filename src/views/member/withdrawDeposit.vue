<template>
    <div class="withdrawDeposit">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con">
            <dl class="user-drawings-bank clearfix" v-show="!showBank">
                <dt>请选择银行卡</dt>
                <dd class="user-drawings-add-bank" @click="showAddBank">
                    <img src="../../assets/image/bank_img.png" alt="" width="66" height="54">
                    <span class="user-drawings-add-bank-txt">添加银行卡</span>
                </dd>
            </dl>
            <div class="add-bank" v-show="showBank">
                <Bank :bankForm="bankForm" :add="add" :prompt="prompt" />
            </div>
            <h3>填写提现金额：</h3>
            <div class="form-style">
                <ul>
                    <li class="form-style-item">
                        <label class="form-style-label">提现金额</label>
                        <input type="text" class="input-text-style">
                        <span class="flmgr">元</span>
                        <span class="form-style-error">请填写提现金额</span>
                    </li>
                    <li class="form-style-item">
                        <label class="form-style-label">支付密码</label>
                        <input type="password" class="input-text-style">
                        <span class="flmgr"></span>
                        <span class="form-style-error">请填写提现金额</span>
                    </li>
                    <li class="form-style-item">
                        <label class="form-style-label">验证码</label>
                        <input type="text" class="input-text-style" placeholder="点击获取验证码" style="width:100px" maxlength="4">
                        <span class="other">
                            <img src="" alt="点击获取验证码" title="点击获取验证码">
                        </span>
                        <span class="form-style-error">请填写提现金额</span>
                    </li>
                    <li class="form-style-item">
                        <label class="form-style-label"></label>
                        <span class="form-style-value">
                            <input type="checkbox" id="important">
                            <label for="important">我已阅读并确认下方重要提示信息</label>
                        </span>
                        <span class="form-style-error">请填写提现金额</span>
                    </li>
                </ul>
            </div>
            <div class="form-style-submit">
                <span class="btn-style">确认提现</span>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Bank from '@/components/member/Bank'

export default {
    components:{ Title, Bank },
    data() {
        return {
            infoTitle: {
                title:'提现',
                todu:{
                    title:'查看提现记录',
                }
            },
            bankForm: {
                name: '周伟',
                bankType:'',
                bankNumber:'',
                bankPhone: '3c0*****d7a0',
                smsCode:''
            },
            add:function(item){
                console.log(item)
            },
            prompt:[
                '比如您的开户行名称为"工商银行北京宣武门支行"，只需输入关键词"宣武"即可。如果推荐列表中没有符合关键词的信息，',
                '请您务必在列表中选择开户城市的银行分行，如：工商银行北京市分行营业部。',
            ],
            showBank: false
        }
    },
    methods:{
        showAddBank() {
            this.showBank = true
        }
    }
}
</script>

<style lang="scss" scoped>
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
