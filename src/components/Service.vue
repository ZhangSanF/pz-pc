<template>
    <div>
        <div class="service" :style="{top: domTop + 'px'}" v-if="isShowService">
            <a href="javascript:void(0);" @click="serviceLine">
                <img src="../assets/image/SurferServer.gif" alt="">
            </a>
            <a href="javascript:void(0);" class="close" @click="closeService">
                <img src="../assets/image/close.png" alt="">
            </a>
        </div>      
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            isShowService: true,
            domTop: 150
        }
    },
    methods:{
        //客服在线
        serviceLine() {
            if(this.getSettingBase.service_code != undefined) {
                let c = document.createElement('script');
                c.src = this.getSettingBase.service_code;
                let s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(c, s);
            } 
        },
        closeService() {
            this.isShowService = false
        }
    },
    mounted() {
        let _this = this
        window.onscroll = function() {
            var osTop = document.documentElement.scrollTop || document.body.srcollTop || 0;
            _this.domTop = osTop + 150
        }
    },
    computed: {
        ...mapGetters(['getSettingBase'])
    }
}
</script>

<style lang="scss" scoped>
.service{
    position: absolute;z-index: 2147480000;left: 5px;transition: .5s linear;
    .close{
        position: absolute;top: 0;right: 0;
    }
}
</style>
