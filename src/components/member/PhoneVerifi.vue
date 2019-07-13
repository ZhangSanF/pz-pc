<template>
    <div>
        <div  class="options-step">
            <div class="options-step-con clearfix">
                <span :class="nowStep>0?'options-step-current': 'options-step-next' ">
                    验证原手机号码
                    <strong>1</strong>
                </span>
                <span :class="nowStep>1?'options-step-current': 'options-step-next' ">
                    验证新手机号码
                    <strong>2</strong>
                </span>
                <span :class="nowStep>2?'options-step-current': 'options-step-next' ">
                    成功
                    <strong>3</strong>
                </span>
            </div>
        </div>
        <div  class="form-style-1 clearfix"  v-show="nowStep == 1">
            <el-form class="step1-form" ref="phone-step1" label-width="200px">
                <el-form-item label="原手机号码"  prop="phone">
                    <el-input size="mini" class="step-input" ></el-input>
                    <el-button size="mini" class="step-btn" >获取短信验证码</el-button>
                </el-form-item>
                <el-form-item label="短信验证码" prop="smsCode">
                    <el-input size="mini" class="step-input"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini" class="step-btn" @click="nextStep(1)" >下一步</el-button>
                    <el-button size="mini"  >通过密保重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 验证新手机号码 -->
        <div  class="form-style-1 clearfix" v-show="nowStep == 2" >
            <el-form class="step1-form" ref="phone-step2" label-width="200px">
                <el-form-item label="新手机号码">
                    <el-input size="mini" class="step-input"></el-input>
                    <el-button size="mini" class="step-btn" >获取短信验证码</el-button>
                </el-form-item>
                <el-form-item label="短信验证码">
                    <el-input size="mini" class="step-input"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini"  class="step-btn" @click="nextStep(2)" >下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 新手机号码密保问题-->
        <div  class="form-style-1 clearfix" v-show="nowStep == 3" >
            <el-form class="step1-form" ref="phone-step3" label-width="200px">
                <el-form-item label="当前密保问题">
                    <el-input size="mini" class="step-input"></el-input>
                    <el-button size="mini" class="step-btn" >获取短信验证码</el-button>
                </el-form-item>
                <el-form-item label="请输入答案">
                    <el-input size="mini" class="step-input"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button size="mini"  class="step-btn" @click="nextStep(3)" >下一步</el-button>
                    <el-button size="mini"  >通过短信重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--手机认证 end-->
        <div id="phoneCon_succe" class="form-style-1 clearfix" v-show="nowStep == 4" >
            <div class="user-safety-options-succeed clearfix">
                <span class="user-safety-options-succeed-true">&nbsp;</span>
                <span class="user-safety-options-succeed-txt" id="switch">您的手机号已设置成功</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            //温馨提示数组
            nowStep:1
        }
    },
    methods: {
        nextStep(i) {
            const fromName = 'phone-step'+ i
            this.$refs[fromName].validate((valid) => {
                console.log(1);
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            this.nowStep = i + 1
            console.log(this.nowStep)
        }
    }
}
</script>

<style lang="scss" scoped>
    .form-style-1 {
        padding: 15px 0 30px;
    }
    .step1-form {
        margin: 0 auto;
        width: 700px;
    }
    .options-step {
        height: 48px;
        position: relative;
        border-bottom: 5px solid #dadada;
        font-size: 12px;
        line-height: 40px;
    }
    .options-step-con {
        width: 535px;
        height: 48px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0; 
        margin: auto;
        position: absolute;
    }
    .options-step-current {
        border-bottom: 5px solid #fe6e00;
        color: #fe6e00;
        float: left;
        position: relative;
        width: 33%;
        text-align: center;
        height: 48px;
    }
    .options-step-current strong {
        background: #fe6e00;
        display: block;
        width: 20px;
        height: 20px;
        margin: 0 auto;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
    }
    .options-step-next {
        float: left;
        position: relative;
        width: 33%;
        text-align: center;
        height: 48px;
        strong {
            background: #dadada;
            display: block;
            width: 20px;
            height: 20px;
            margin: 0 auto;
            line-height: 20px;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
        }
    }
    .step-btn {
        background: #fe7b20;
            color: #fff;
    }
    .step-input {
        width: 200px;
    }
</style>