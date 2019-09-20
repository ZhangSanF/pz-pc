<template>
    <div class="index">
        <div class="body-container  reg-bg">
          <div class="register_main   clearfix">
                <div class="register_form clearfix"> 
                    <div class="logtit">
                        <h3 class="fl"><span>|</span>找回密码-选择找回密码方式</h3>
                    <span class="fr">市场有风险，投资需谨慎</span> 
                    </div>
                </div>
                <div class="content">
                    <router-link class="btn" tag="span" to="/user/phonePwd">通过手机号找回密码</router-link>
                    <router-link v-if="getUserFind.password_protection.length > 0" class="btn" tag="span" to="/user/savePwd">通过密保找回密码</router-link>
                    <span v-else class="btn-one" title="您还未设置密保">通过密保找回密码</span>
                </div>
        </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"

export default {   
    data(){
        return{
            
        }
    },
    created() {

    },
    methods:{
        toFindPwd() {
            if(this.getUserFind.password_protection.length > 0) {
                this.$router.push('/user/savePwd')
            }
        }
    },
    computed: {
        ...mapGetters(['getUserFind'])
    },
}
    
</script>
<style lang="scss" scoped>
    .content{
        display: flex;
        justify-content: space-between;
        padding: 0 50px;
        margin: 0 auto;
    }
    .content-one{
        display: flex;
        justify-content: center;
    }
    .btn{
        display: inline-block;
        font-size: 16px;
        width: 230px;
        text-align: center;
        background-color: #E35353;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
    }
    .btn-one{
        display: inline-block;
        font-size: 16px;
        width: 230px;
        text-align: center;
        color: #fff;
        border: none;
        border-radius: 5px;
        background-color: #ccc;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
    }
    .text{
        display: inline-block;width: 20%;
    }
    .index {
        width: 100% !important;
         background-color: #fff;
    }
   .reg-bg {
        background: url(../../assets/image/login.jpg) no-repeat left top;
        background-size: 100% 100%;
        height: 550px;
        padding: 65px 0px 65px 0px;
    }
   .register_main{
        width: 600px;
        margin: 0px auto 0px auto;
        background-color: #FFF;
        padding: 10px 30px 30px 30px;
        border-radius: 5px;
   }
   .fr{
           color: #bebebe;
    font-size: 12px;
   }
</style>
<style lang="scss">

</style>