<template>
    <div></div>
</template>

<script>
import { mapActions } from "vuex";
import md5 from 'js-md5';
export default {
    props:{
        ruleForm: {
            type: Object,
            default: function () { return {} }
        }
    },
    data() {
        return {
            fromData: {}
        }
    },
    created() {

    },
    methods: {
        ...mapActions(['register']),
        actionsReg() {
            let reg = this.ruleForm
            let actionData = {
                username: reg.username,
                verifi: reg.verifi,
                mobile: reg.mobile,
                smsCode: reg.smsCode,
                invitation_code: reg.invitation_code,//邀请码
                agent_code: reg.agent_code,//代理码(地址栏)
                password: md5(reg.password),
                confirm_password: md5(reg.confirm_password),
            }
            this.register(actionData)
        }
    }
}
</script>
