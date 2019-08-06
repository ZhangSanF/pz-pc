<template>
  <div class="auto-pay" v-loading="payLoading">
    <div class="pay-con">
      <h3 class="choose-title">请选择支付通道</h3> 
      <el-radio v-model="type" :label="index" :border="true" v-for="(item, index) of data" :key="index" @change="typeChange">
        {{item.byname}}
        <div class="item-detail">
          <p v-if="item.get_fee">选用此通道每笔需支付<span class="money-style">{{item.get_fee}}%</span>手续费</p>
          <p v-if="item.max">此通道支付限额下限<span class="money-style">{{item.min}}</span>元，上限<span class="money-style">{{item.max}}</span>元</p>
          <p class="redFont" v-if="item.int_limit_type != 0" v-text="item.int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"></p>
          <p class="redFont" v-if="item.float_limit_type == 1">该支付充值金额需有两位小数，请充值如100.66,500.05等小数金额</p>
          <p class="normalFont normalFontFirst" v-if="item.remark">{{item.remark.length > 35 ? item.remark.substring(0, 35) : item.remark}}</p>
          <p class="normalFont normalFontSecond" v-if="item.remark && item.remark.length > 35">{{item.remark.substring(35)}}</p>
        </div>
      </el-radio>

      <!-- 部分网关、快捷支付需银行列表获取 -->
      <autopay-banklist v-if="bankList" :data="bankList" @bankChange="bankChange"></autopay-banklist>

      <h3 class="money-title">请输入充值金额</h3>
      <div class="pay-input">
        <el-input v-model="money" @keyup.native="moneyKeyUp" @blur="moneyBlur">
          <template slot="append">RMB(元)</template>
        </el-input>

        <el-button type="warning" @click="payAction">提交充值</el-button>
      </div>

      <form method="post" ref="payForm" target="_blank" :action="formData.requestUrl">
        <input type="hidden" v-for="(item, index) of formData.requestData" :name="index" :value="item">
      </form>

      <el-dialog :title="scanData.payName" :visible.sync="autoscanpayDialog" :append-to-body="true"
        :modal-append-to-body="true" width="340px">
        <el-card :body-style="{ 'text-align': 'center' }">
          <img :src="scanData.filePath" class="image" width="180">
          <div style="padding: 14px;">
            <span style="font-size:20px;font-weight:600;color:#555">金额：<span style="color:orange;">{{scanData.money}}</span>元</span>
          </div>
        </el-card>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import AutopayBanklist from "./AutopayBanklist";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AutoPay",
  props: ["data", "payType"],
  data() {
    return {
      type: 0,
      money: '',
      banklistNeed: "",
      bankCode: "",
      bankType: "",
      formData: {},
      payLoading: false,
      autoscanpayDialog: false,
      scanData: {},
      bankIndex: 0,
      setTimeFunc: {}
    };
  },
  methods: {
    ...mapActions(['depositwithdrawplatform']),
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
      this.money = parseFloat(parseFloat(this.money).toFixed(2)) || '';

    },
    typeChange(e) {
      this.type = e;
    },
    bankChange(e) {
      //子组件传参
      this.bankIndex = e.type;
    },
    //支付提交
    payAction() {      
      var payData = this.data[this.type];
      var bCode = "";
      if (payData.banklist) {
        bCode = this.checkedBank.bankcode;
      } else {      
        bCode = payData.bankcode;
      }
      var m = this.money.toString();
      if(this.checkedBank.float_limit_type == 1 && (m.indexOf('.') <= 0 || m.split(".")[1].length != 2)){
        this.$alert('该支付充值金额需有两位小数，请充值如100.66, 500.05等小数金额!');
        return;
      }
      if(this.money == '' || this.money == 0) {
        this.$alert('请填写金额')
        return 
      }
      var data = {
        method: "thirdPayment",
        order_amount: this.money,
        bank_code: bCode,// 有就传
        bank_type: this.checkedBank.banktype || "",// 有就传
        pay_id: payData.id,
        card_num: '', //不需要
        card_name: '',//不需要
        password: ''//不需要
      };
      // console.log(data)
      this.payLoading = true;
      this.depositwithdrawplatform(data).then(res => {
        this.payLoading = false;
        if (res.code == 200) {
          switch (res.data.requestType) {
            case "form":
              this.formData = res.data;
              this.$confirm("即将打开支付页面", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              })
                .then(() => {
                  this.$refs.payForm.submit(); //提交支付表单
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
              break;

            case "jump":
              this.$confirm("即将打开支付页面", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              })
                .then(() => {
                  window.open(res.data.requestUrl);
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
              break;

            case "scan":
              this.scanData = res.data.requestData;
              this.autoscanpayDialog = true;
              break;

          }
        } else {
          this.$alert(
            `提交失败！请刷新页面重试或者联系客服处理！[${res.message}]`,
            `提交失败`,
            {
              type: "error"
            }
          );
        }
      });
    }
  },
  computed: {
    bankList() {
      if (this.data[this.type].banklist) {
        return this.data[this.type].banklist;
      } else {
        return null;
      }
    },
    checkedBank() {
      if (this.bankList) {
        return this.bankList[this.bankIndex];
      }
      return {};
    }
  }
};
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

  .tips {
    margin-left: 10px;
    color: #6b6b6b;
    margin-bottom: 15px;
    display: block;
    font-size: 14px;
  }

  >>> {
    .el-radio {
      width: 490px;
      height: 110px;
      padding: 14px 20px;
      margin-bottom: 20px;
      border: 1px dotted #a2a2a2;

      &:first-of-type {
        margin-left: 10px;
      }

      .item-detail {
        height: 80px;
        padding: 6px 8px;
        box-sizing: border-box;
        font-size: 12px;
        p {
          margin-top: 2px;
          word-break: normal;
          width: 100%;
          overflow: hidden;
        }

        .normalFontFirst {
          margin-top: 6px;
        }

        .money-style {
          font-weight: 800;
          color: #ffa965;
        }
      }
    }

    .is-checked {
      border: 1px solid #ff8453;
      background: #ffffff;
    }
  }

  .money-title {
    font-size: 16px;
    margin: 10px 0 10px 0;
  }

  .pay-input {
    width: 50%;
    position: relative;
    display: inline-block;

    /deep/ input {
      height: 40px !important;
      font-size: 24px !important;
      color: orangered;
    }
  }

  /deep/ button {
    position: absolute;
    right: -120px;
    top: -1px;
    margin-left: 10px;
  }

  h3 {
    color: #555;
  }
}
</style>
