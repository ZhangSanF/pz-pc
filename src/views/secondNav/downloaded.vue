<template>
    <div class="downloaded">
        <div class="body-container down-bg">
            <div class="wrapper clearfix">
                <div class="down-left-img"><img src="../../assets/image/down-left-img.png" alt=""></div> 
                <div class="down-right">
                    <h3 class="tit">{{tit}}</h3>
                    <p class="brief">{{brief}}</p>
                    <div class="down-btn">
                        <div  class="dpc" @click="toDownLoald(item.src)" @mouseenter="enter(index)" @mouseleave="leave()"  v-for="(item,index) in downData" :key="index">
                            <span v-show="item.id == '1' "  class="pcLog"  alt=""></span>
                            <span v-show="item.id == '2' " class="iosLog"  alt=""></span>
                            <span v-show="item.id == '3' "  class="anLog" alt=""></span>
                            <span class="text">{{item.name}}</span>
                            <div>
                                <img class="show" v-show="item.id == '1' && isMoveOn &&index==current " src="../../assets/image/20190327145339.png" alt="">
                            </div>
                            <div>
                                <img class="show" v-show="item.id == '2' && isMoveOn &&index==current " src="../../assets/image/20190327145339.png" alt="">
                            </div>
                            <div>
                                 <img class="show" v-show="item.id == '3' && isMoveOn &&index==current " src="../../assets/image/20190327145339.png" alt="">
                            </div>
                            <!-- <div v-show="isMoveOn &&index==current"  v-html="item.img" class="show">
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import downLoaded from '../../textJson/downLoaded.json'
export default {
    data(){
        return{
            isMoveOn: false ,
            tit: '股票交易软件',
            brief: '不再是旁观者，属于您自己的交易软件',
            downData: downLoaded.data
        }
    },
    methods:{
        enter(index){
            this.isMoveOn = true;
            this.current = index;
        },
        leave(){
            this.isMoveOn = false;
            this.current = null;
        },
        toDownLoald (e) {
            // console.log(e)
        }
    }
}
</script>

<style lang="scss" scoped>
    .body-container.down-bg {
        background: url('../../assets/image/9195421.jpg') no-repeat;
        background-size: 100% 100%;
        padding-top: 141px;
        padding-bottom: 85px;
        width: 100%;
    }
     .tit {
        font-size: 44px;
        padding-left: 28px;
        font-weight: bold;
        padding-bottom: 20px;
    }
    .brief {
        font-size: 26px;
    }
    .down-right {
        padding-left: 40px;
        float: left;
        color: #fff;
    }
    .down-left-img {
        float: left;
    }
    .down-btn {
        padding: 30px 0px 0px 28px;
    }
    .down-btn .dpc {
        border-radius: 7px;
        width: 300px;
        height: 62px;
        line-height: 62px;
        background: #fff;
        text-align: center;
        display: block;
        font-size: 24px;
        margin-bottom: 38px;
        border: 0px;
    }
    .dpc {
        position: relative;
    }
    .pcLog {
        background: url('../../assets/image/win-mac-icon.png') no-repeat 0 -30px;
    }
    .text {
        color: #000;
    }
    .show {
        position: absolute;
        top: 0;
        left: 300px;
    }
</style>

