<template>
    <div>
        <div class="service" :style="{top: domTop + 'px'}">
            <a href="#">
                <img src="../assets/image/SurferServer.gif" alt="">
            </a>
            <a href="#" class="close" @click="closeService">
                <img src="../assets/image/close.png" alt="">
            </a>
        </div>      
    </div>
</template>

<script>
export default {
    data() {
        return {
            domTop: 150
        }
    },
    methods:{
        closeService() {
            alert('3')
        }
    },
    mounted() {
        let _this = this
        window.onscroll = function() {
            var osTop = document.documentElement.scrollTop || document.body.srcollTop || 0;
            _this.domTop = osTop + 150
        }
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
