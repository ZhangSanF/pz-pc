<template>
    <div class="user-box-2">
        <Title :infoTitle="infoTitle"/>
        <el-row class="user-box-con-1">
            <strong>我的银行卡</strong>
            <el-row v-if="!isAdd" class="bank_content">
                <div v-if="getUserInfo.bank_card_number && getUserInfo.bank_name" class="bank">
                    <p class="user-drawings-bank-num">{{getUserInfo.bank_card_number}}</p>
                    <div class="content">
                        <span class="img">{{getUserInfo.bank_name}}</span>
                    </div>
                </div>
                <div v-else class="add_bank" @click="addBank(false)">
                    <div class="bank_img">
                        <img src="../../assets/image/bank_img.png" >
                    </div>
                    <div class="add">添加银行卡</div>
                </div>
            </el-row>
            <el-row  v-if="isAdd">
                <Bank :prompt="prompt"/>
            </el-row>
            <div class="form-warm-prompt-1 clearfix" v-if="isAdd">
                <span class="form-warm-prompt-title">温馨提示：</span>
                    <p class="form-warm-prompt-con form-warm-prompt-con-a">
                <span style="color:#B73736">
                    1.&nbsp;&nbsp;提现手续费收取说明及提现金额的先后顺序：<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;a. 已赚取利息（免手续费）<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;b. 到期本金（免手续费；投资可得续投积分，积分可以 <a href="#" style="color:#fe6e00;" class="strong">兑换优惠券</a>）<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;c. 充值未投资金额（收取0.5%手续费）<br>
                    </span>
                    2.&nbsp;&nbsp;为了您的资金安全，请确保提现银行账号的姓名和您进行实名验证的姓名一致。<br>
                    3.&nbsp;&nbsp;请确保您输入的是正确的储蓄卡账号，而非信用卡账号。<br>
                    4.&nbsp;&nbsp;您确认提现后，我们将在1个工作日(国家节假日除外)之内将钱转入您网站上填写的银行账号。规则如下： <br>
                    &nbsp;&nbsp;&nbsp;&nbsp; ♦ 每个工作日17:50之前的用户提现申请，将在下个工作日进行打款操作。 <br>
                    &nbsp;&nbsp;&nbsp;&nbsp; ♦ 17:50之后的提现申请将同下个工作日的申请一并处理。
                    <br>5.&nbsp;&nbsp;提现过程遇到问题，请联系客服，<span>{{getSettingBase.service_telephone}}</span>	                        </p>
            </div>
        </el-row>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Bank from '@/components/member/Bank'
import { mapGetters, mapActions } from "vuex";

export default {
    components:{ Title,Bank },
    data() {
        return {
            infoTitle: {
                title:'银行卡信息',
                todu:{
                    title:'查看提现记录',
                }
            },
            isAdd: false,
            prompt:[
                '为确保您的资金划转安全高效，出彩速配建议您完善开户行信息。 您只需在分支行框内输入分支行关键词。',
                '比如您的开户行名称为"工商银行北京宣武门支行"，只需输入关键词"宣武"即可。如果推荐列表中没有符合关键词的信息，',
                '请您务必在列表中选择开户城市的银行分行，如：工商银行北京市分行营业部。',
            ]
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
        addBank(e) {
            this.isAdd = e == true? false : true
        }
    },
    computed:{
        ...mapGetters(['getUserInfo', 'getSettingBase'])
    }
}
</script>

<style lang="scss" scoped>
    .user-drawings-bank-num{
        border-radius: 5px 5px 0 0;
        text-align: center;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #e0e0e0;
        background: #f5f5f5;
        box-sizing: border-box;
    }
    .content{
        width: 100%;
        height: 91px;
        background: #fff;
        position: relative;
        .img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%)
        }
    }
    .user-box-2{
        border: 1px solid #e0e0e0;
        border-radius: 3px;
        background: #fff;
    }
    .bank_content {
        padding: 30px 0;
    }
    .user-box-con-1 {
        width: 964px;
        margin: 0 auto;
        padding: 30px 0;
    }
    .bank_img {
        text-align: center;
        margin-top:10px !important;
    }
    .add_bank {
        margin-bottom: 10px;
        width: 228px;
        height: 127px;
        margin: 20px 15px 0 0;
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        text-align: center;
        border: 1px dashed #e0e0e0;
        background: #f5f5f5;
        box-sizing: border-box;
    }
    .add_bank:hover{
        border: 1px dashed #fe6e00;background: #ffe0c9;
    }
    .bank {
        margin-bottom: 10px;
        width: 228px;
        height: 127px;
        margin: 20px 15px 0 0;
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        text-align: center;
        border: 1px solid #fe6e00;;
        background: #f5f5f5;
        box-sizing: border-box;
    }
    .add {
        font-size: 14px;
        color: #3181d8;
        padding-top: 20px;
    }
    .form-warm-prompt-1 {
        clear: both;
        background: none repeat scroll 0 0 #fffadc;
        border: 1px solid #e3b367;
        padding: 10px 20px;
        line-height: 24px;
        color: #666;
        font-size: 12px;
    }
    .form-warm-prompt-1 .form-warm-prompt-title {
        color: #b73736;
        font-weight: 700;
        float: left;
        width: 100%;

    }
    .form-warm-prompt-1 .form-warm-prompt-con {
        float: left;
        width: 720px;
    }

</style>
