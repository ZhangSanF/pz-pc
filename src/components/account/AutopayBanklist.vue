<template>
  <div class="auto-pay">
    <h3 class="money-title">请选择银行</h3>
    <div class="pay-banklist">
      <el-radio v-for="(item, index) of data" v-model="bank" :label="index" :border="true" @change="bankChange(item.bankcode,item.banktype)" :bankcode="item.bankcode" :key="index"><i :class="item.class"></i>{{item.bankname}}</el-radio>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AutopayBanklist',
  props: [ 'data' ],
  data() {
    return {
      bank: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit('bankChange', {type: this.bank});
    }, 20);
  },
  methods: {
    bankChange(c, t) {
      this.$emit('bankChange', {type: this.bank});
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
    background: antiquewhite;
    .choose-title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    /deep/ {
      .el-radio {
        width: 490px;
        height: 80px;
        padding: 14px 20px;
        margin-bottom: 20px;
        border: 1px dotted #a2a2a2;
        &:first-of-type {
            margin-left: 10px;
        }
      
        .item-detail {
          height: 40px;
          padding: 6px 8px;
          box-sizing: border-box;
          .money-style {
            font-weight: 800;
            color: #ffa965;
          }
        }
      }
      .is-checked {
        // border: 1px solid #a2a2a2;
        background: #f9d8ad;
      }
    }
    .money-title {
      font-size: 16px;
      margin:10px 0 10px 0;
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
  .pay-banklist {
    .el-radio {
      margin-bottom: 6px;
      &:first-of-type {
        margin-left: 10px;
      }
    }
  }
</style>