<template>
  <div class="scan-pay">
    <div class="pay-con">
      <div class="left">
        <el-tabs type="border-card" @tab-click="typeChange">
          <el-tab-pane v-for="(item, index) of data"  :key="index" >
            <span slot="label"><i class="el-icon-date"></i> {{getPayName(item)}}</span>
            <span class="tips">温馨提示：最低充值{{payItem.min}}元,请不要保存二维码重复支付，我们会不定时更换收款码。</span>
            <h5 class="choose-title" v-if="item.type == 12 || item.type == 13">1. 请用转账到下方账户。</h5>
            <h5 class="choose-title" v-else>1. 请用APP扫描下方二维码，转账前请核对账号和账户名。</h5>
            <div class="pay-img">
              <img :src="item.code_url" alt="">
            </div>
            <p class="pay-account-info">账号：<span class="pay-account">{{item.account}}</span></p>
            <p class="pay-account-info">账户名：<span class="pay-account">{{item.name}}</span></p>
            <p class="redFont" v-if="item.int_limit_type != 0" v-text="item.int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"></p>
            <p class="redFont" v-if="item.float_limit_type == 1">该支付充值金额需有两位小数，请充值如100.66,500.05等小数金额</p>
            <p class="redFont" v-if="parseFloat(item.get_fee)">选用此通道每笔需支付<span class="money-style">{{item.get_fee}}%</span>手续费</p>
            <p v-if="item.remark">备注: {{item.remark}}</p>
          </el-tab-pane>
        </el-tabs>

        <h5 class="money-title">2. 请填入您的转账信息</h5>
        <div class="box-info">
          <div class="pay-input">
            <p class="input-item">
              <span class="input-item-title">账户姓名：</span><el-input placeholder="请输入账户名" v-model="name" clearable></el-input>
            </p>
            <p class="input-item">
              <span class="input-item-title">账号：</span><el-input placeholder="请输入账号" v-model="account" clearable></el-input>
            </p>
            <p class="input-item">
              <span class="input-item-title">转账金额：</span><el-input placeholder="请输入转账金额" v-model="money" @keyup.native="moneyKeyUp" @blur="moneyBlur" clearable></el-input>
            </p>
            <p class="input-item">
              <span class="input-item-title">转账时间：</span>
              <el-date-picker
                popper-class="date-picker-pop"
                v-model="date"
                type="datetime"
                placeholder="点击选择日期时间">
              </el-date-picker>
            </p>         
          </div>       
          <el-button type="warning" @click="payAction">提交充值</el-button>
        </div>
      </div>
      
      <div class="right">
        <img :src="studyImg">
      </div>

    </div>

  </div>
</template>

<script>
  import AutopayBanklist from './AutopayBanklist'
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'ScanPay',
    props: ['data'],
    components: {
      AutopayBanklist
    },
    data() {
      return {
        type: 0,
        money: '',
        name: '',
        account: '',
        date: '',
        typeIndex: 0,
      }
    },
    mounted() {

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
      payAction() {
        if(!this.name || !this.account || !this.date || !this.money){
          this.$alert('请填写完整的信息!');
          return ;
        }
        if(!/^[\u4e00-\u9fa5]+$/.test(this.name)){
          this.$alert('账户姓名必须全是中文!');
          return;
        }
        var m = this.money.toString();
        if(this.payItem.float_limit_type == 1 && (m.indexOf('.') <= 0 || m.split(".")[1].length != 2)){
          this.$alert('该支付充值金额需有两位小数，请充值如100.66, 500.05等小数金额!');
          return;
        }
        var data = {
          method: `artificialTransfer`,
          order_amount: this.money,
          bank_code: '',//不需要
          bank_type: '',//不需要
          pay_id: `code_${this.payItem.id}`,
          card_num: this.account,
          card_name: this.name,
          password: ''//不需要
        };
        this.depositwithdrawplatform(data).then((res) => {
          if(res.code == 200){
            this.name = '';
            this.account = '';
            this.money = '';
            this.date = '';
            this.$alert('您的存款信息已提交，请稍后客服处理！', '提交成功', {type: 'success'});
          }
        })
        .catch(err=>{
          this.$alert(`${err}`, '提交失败', {type: 'error'});
        });
      },
      //支付名称判断 根据type值
      getPayName(e) {
        if(e && e.type){
          switch(parseInt(e.type)) {
            case 3:
              return '支付宝扫码支付';
              break;           
            case 4:
              return '微信扫码支付';
              break;
            case 12:
              return '人工支付宝收款';
              break;
            case 13:
              return '微信/支付宝转帐';
              break;
            default:
              return '支付通道';
          }
        }else{
          return '支付通道';
        }
      }
    },
    computed: {
      payItem() {
        return this.data[this.typeIndex];
      },
      studyImg() {
        return this.payItem.study_url;
      },
    }
  }

</script>

<style lang="scss" scoped>
  .pay-con {
    height: 600px;
    padding: 20px 40px;
    border-radius: 4px;
    box-sizing: border-box;
    background: #eeeeee;
    .left {
      width: 470px;
      float: left;
      background: #fff;
      
    }
    .choose-title {
      font-size: 13px;
      margin-bottom: 10px;
    }
    .pay-img {
      width: 160px;
      height: 160px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pay-account-info {
      font-size: 14px;
      .pay-account {
        color: red;
      }
    }
    .money-title {
      font-size: 13px;
      margin: 10px 0 2px 10px;
    }
    .pay-input {
      padding: 10px;
      // width: 50%;
      position: relative;
      display: inline-block;
      
      .input-item {
        margin: 0 0 6px 0;
        .input-item-title {
          font-size: 16px;
          display: inline-block;
          width: 100px;
        }
        /deep/ {
          .el-date-editor {
            position: relative;
            left: -4px;
            .el-input__prefix, .el-input__suffix {
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
      
    }
    /deep/ button {
      // margin-left: 10px;
      position: absolute;
      bottom: 15px;
      right: 15px;
    }
    h3 {
      color: #555;
    }
  }

   .tips{
      margin-left: 10px;
      color: #6b6b6b;
      margin-bottom: 15px;
      display: block;
      font-size: 14px;
    }

  .right {
    width: 360px;
    height: 493px;
    // background: #e5e5e5;
    float: right;
    overflow: auto;
    img {
      width: 100%;
    }
  }

  .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }
  .box-info{
    position: relative;
  }
</style>
<style lang="scss" >
.scan-pay{
  .el-tabs__content {
    background-color: #fff ;
    min-height: 300px !important;
  }
}
</style>

