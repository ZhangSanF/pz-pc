<template>
  <div class="scan-pay">
    <div class="pay-con">

      <h3 class="money-title">1. 请选择您方便转入的银行</h3>
      <div class="pay-cards">
        <p>以下是目前有效的银行卡，转账时请核实收款账号信息:</p>
        <el-radio v-for="(item, index) of data" :key="index" v-model="bank" :label="index" :border="true" @change="radioChange(index)">
          {{item.bank_name}}
        </el-radio>
        <!-- <p class="rebateText" v-if="parseFloat(bankInfo.rebate) > 0">当前支付方式赠送充值金额的<span class="rebateMoney">{{parseFloat(bankInfo.rebate)}}%</span></p> -->
      </div>

      <h3 class="money-title" v-text="type == 'bankcard' ? '2. 请转账到以下账户:' : '2. 请用支付宝APP扫描二维码转账:'"></h3>
      <div v-if="type == 'bankcard'" class="pay-input card-con" v-loading="loading" element-loading-text="正在获取银行卡信息">
        <p class="input-item">
          <span class="input-item-title">卡号：</span>
          <input type="text" id="num" readonly :value="bankInfo.card_num">
          <el-tooltip class="item" effect="dark" content="点击选中后按 ctrl + c 复制即可" placement="right">
            <el-button type="primary" size="mini" plain @click="copy('num')">复制</el-button>
          </el-tooltip>
        </p>

        <p class="input-item">
          <span class="input-item-title">持卡人：</span>
          <input type="text" id="name" readonly :value="bankInfo.cardholder">
          <el-tooltip class="item" effect="dark" content="点击选中后按 ctrl + c 复制即可" placement="right">
            <el-button type="primary" size="mini" plain @click="copy('name')">复制</el-button>
          </el-tooltip>
        </p>

        <p class="input-item">
          <span class="input-item-title">开户行：</span>
          <span class="card-info-detail">{{bankInfo.bank_adress}}</span>
        </p>

        <p class="redFont" v-if="bankInfo.int_limit_type != 0" v-text="bankInfo.int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"></p>
        <p class="redFont" v-if="bankInfo.float_limit_type == 1">该支付充值金额需有两位小数，请充值如100.66,500.05等小数金额</p>
      </div>

      <div class="pay-input" v-else>
        <div class="scanImg" v-if="bankInfo.qrcode_url">
          <img width="140" :src="bankInfo.qrcode_url" alt="二维码图片获取失败，请刷新重试">
        </div>
        <div class="bankCardInfo">
          <p class="font">
            <span>银行：</span><span class="colorOrangered">{{bankInfo.bank_name}}</span>
          </p>
          <p class="font">
            <span>卡号：</span><span class="colorOrangered">{{bankInfo.card_num}}</span>
          </p>
          <p class="font">
            <span>持卡人：</span><span class="colorOrangered">{{bankInfo.cardholder}}</span>
          </p>
        </div>
        <p class="font">请用支付宝APP扫描上方二维码转账</p>
        <p class="font">转账完成后在下方填写转账信息，提交稍后即可自动到账</p>
      </div>

      <h3 class="money-title">3. 请填入您的转账信息</h3>
      <div class="pay-input">

        <p class="input-item">
          <span class="input-item-title">账户名：</span>
          <el-input placeholder="请输入账户名" v-model="name" clearable></el-input>
        </p>

        <p class="input-item" v-if="type == 'bankcard'" >
          <span class="input-item-title">账号：</span>
          <el-input placeholder="请输入账号" v-model="account" clearable></el-input>
        </p>

        <p class="input-item">
          <span class="input-item-title">转账金额：</span>
          <el-input placeholder="请输入转账金额" v-model="money" @keyup.native="moneyKeyUp" @blur="moneyBlur" clearable></el-input>
        </p>
        

        <p class="input-item">
          <span class="input-item-title">转账时间：</span>
          <el-date-picker popper-class="date-picker-pop" v-model="date" type="datetime" placeholder="点击选择日期时间">
          </el-date-picker>
        </p>

      </div>

      <el-button type="warning" @click="payAction">提交充值</el-button>

      <div class="notice">
        <p>温馨提示:</p>
        <p class="notice-important">&nbsp;1. 每次转账充值前请重新获取银行卡信息，若入款到过期的账号，视为无效的存款，平台一概不负责!</p>
        <p>&nbsp;2. 最低金额{{bankInfo.min}}人民币,为确保财务第一时间为您添加游戏额度,请您转账为整数(例如：欲入￥5000，不要￥5000.68)谢谢!</p>
        <p>&nbsp;3. 可以使用支付宝转账至我司的银行账户，支付宝显示到账成功后提交入款表格即可！</p>
        <p>&nbsp;4. 为了保证准确核实您的款项，请精确选择存款的 年-月-日 时:分 ，秒可以忽略,例如:2016-12-12 14:25:00。
        </p>
      </div>

    </div>

    

  </div>
</template>

<script>
  import BankcardPay from './BankcardPay'
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'BankcardPay',
    props: ['data', 'type'],
    components: {
      BankcardPay
    },
    data() {
      return {
        money: '',
        date: '',
        name: '',
        account: '',
        bank: 0,
        bankIndex: 0,
        loading: true,
        cardInfo: {
          num: 20001000200101001,
          name: '老司机',
          bank: '招商银行'
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    methods: {
      ...mapActions(['depositwithdrawplatform']),
      typeChange(item) {
        this.typeIndex = item.index;
      },
      moneyKeyUp(e) { //金额强制转浮点型 排除0 .
        if(e && (e.keyCode === 190 || e.keyCode === 48)){
          return;
        }
        var re=/^\d{1}\d*\.{0,1}\d{0,2}$/;
        if(!re.test(this.money)){
          this.money ="";
        }
      },
      moneyBlur(e) {
        this.money = parseFloat(parseFloat(this.money).toFixed(2)) || '';
      },
      radioChange(e) {
        this.bankIndex = e;
      },
      copy(id) {
        document.getElementById(id).select();
      },
      payAction() {
        if(!this.name || (!this.account && this.type != 'alipay_bank') || !this.date || !this.money){
          this.$alert('请填写完整的信息!');
          return ;
        }
        var m = this.money;
        if(this.bankInfo.float_limit_type == 1 && (m.indexOf('.') <= 0 || m.split(".")[1].length != 2)){
          this.$alert('该支付充值金额需有两位小数，请充值如100.66, 500.05等小数金额!');
          return;
        }
        if(!/^[\d]+$/.test(this.account)) {
          this.$alert('账号必须为数字!');
          return ;
        }
        var data = {
          method: `artificialTransfer`,
          order_amount: this.money,
          bank_code: '',//不需要
          bank_type: '',//不需要
          pay_id: `bank_${this.bankInfo.id}`,
          card_num: this.account,
          card_name: this.name,
          password: '',//不需要
        };
        this.depositwithdrawplatform(data).then((res) => {
          if(res.code == 200){
            this.name= '';
            this.account= '';
            this.money= '';
            this.date= '';
            this.$alert('您的存款信息已提交，请稍后客服处理！', '提交成功', {type: 'success'});
          }
        })
        .catch(err=>{
          this.$alert(`${err}`, '提交失败', {type: 'error'})
        });
      }
    },
    computed: {
      bankInfo() {
        if(this.data){
          // console.log(this.data[this.bankIndex])
          return this.data[this.bankIndex];
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .pay-con {
    // width: 1100px;
    // min-height: 560px;
    padding: 20px 40px;
    border-radius: 4px;
    box-sizing: border-box;
    background: #eeeeee;
    .choose-title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .pay-cards {
      padding: 10px 20px;
    }
    .card-info {
      .el-form-item {
        margin: 0;
        width: 600px;
      }
    }
    .pay-account-info {
      font-size: 14px;
      .pay-account {
        color: red;
      }
    }
    .money-title {
      font-size: 16px;
      margin: 10px 0 2px 0;
    }
    .card-con {
      input {
        background: #e8e8e8;
        border: none;
        box-sizing: border-box;
        padding: 2px 0 2px 8px;
        width: 250px;
      }
    }
    .pay-input {
      padding: 10px 20px;
      width: 50%;
      position: relative;
      display: inline-block;
      .card-info-detail {
        font-size: 14px;
      }
      .input-item {
        margin: 0 0 6px 0;
        .el-button--mini, .el-button--mini.is-round {
          padding: 5px 15px;
          position: relative;
          top: -1px;
        }
        .input-item-title {
          font-size: 16px;
          display: inline-block;
          width: 100px;
        }
        /deep/ {
          .el-date-editor {
            position: relative;
            // left: -4px;
            .el-input__prefix,
            .el-input__suffix {
              top: -5px;
            }
          }
          .el-input {
            display: inline-block;
            width: 60%;
            .el-input__inner {
              height: 30px;
            }
          }
        }

      }
      .scanImg {
        height: 140px;
      }
      .font {
        font-size: 14px !important;
      }
    }
    /deep/ button {
      margin-left: 10px;
      position: relative;
      top: -6px;
    }
    h3 {
      color: #555;
    }
  }
  .notice {
      padding: 10px;
      font-size: 14px;
      color: #83806b;
      .notice-important {
        color: #f00;
      }
  }
  .rebateText {
    font-size: 15px;
    color: orangered;
  }

  .bankCardInfo {
    margin-bottom: 10px;
  }

  .colorOrangered {
    color: orangered;
  }

</style>
