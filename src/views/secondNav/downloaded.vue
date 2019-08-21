<template>
    <div class="downloaded">
        <div class="body-container down-bg">
            <div class="wrapper clearfix">
                <div class="down-left-img"><img src="../../assets/image/down-left-img.png" alt=""></div> 
                <div class="down-right">
                    <h3 class="tit">{{tit}}</h3>
                    <p class="brief">{{brief}}</p>
                    <div class="down-btn">
                        <a :href="getSettingBase.shares_pc_url" class="dpc">
                            <el-tooltip effect="light" placement="right">
                                <div slot="content">
                                    <p class="ti-title">下载说明</p>
                                    <p>安装前请退出360杀毒软件!</p>
                                </div>
                                <div>
                                    <span class="pcLog win-mac-icon"></span>
                                    <span class="text">Win版下载</span>
                                </div>
                            </el-tooltip>
                        </a>
                        <a href="javascript:void(0);" class="dpc">
                            <el-tooltip effect="light" placement="right">
                                <div slot="content">
                                    <img :src="getSettingBase.shares_app_img" alt="">
                                </div>
                                <div>
                                    <span class="iosLog win-mac-icon"></span>
                                    <span class="text">IOS版下载</span>
                                </div>
                            </el-tooltip>                           
                        </a>
                        <a href="javascript:void(0);" class="dpc">
                            <el-tooltip effect="light" placement="right">
                                <div slot="content">
                                    <img :src="getSettingBase.shares_app_img" alt="">
                                </div>
                                <div>
                                    <span class="anLog win-mac-icon"></span>
                                    <span class="text">安卓版下载</span>
                                </div>
                            </el-tooltip>                             
                        </a>
                        <!-- <a  class="dpc" @mouseenter="enter(index)" @mouseleave="leave()"  v-for="(item,index) in downData" :key="index">
                            <span v-show="item.id == '1' "  class="pcLog win-mac-icon"  alt=""></span>
                            <span v-show="item.id == '2' " class="iosLog win-mac-icon"  alt=""></span>
                            <span v-show="item.id == '3' "  class="anLog win-mac-icon" alt=""></span>
                            <span class="text">{{item.name}}</span>
                            <div>
                                <img class="show" v-show="item.id == '1' && isMoveOn &&index==current " :src="getSettingBase.shares_app_img" alt="">
                            </div>
                            <div>
                                <img class="show" v-show="item.id == '2' && isMoveOn &&index==current " :src="getSettingBase.shares_app_img" alt="">
                            </div>
                            <div>
                                 <img class="show" v-show="item.id == '3' && isMoveOn &&index==current " :src="getSettingBase.shares_app_img" alt="">
                            </div>
                        </a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data(){
        return{
            isMoveOn: false ,
            tit: '股票交易软件',
            brief: '不再是旁观者，属于您自己的交易软件',
            downData: [
                {
                    "id":"1",
                    "name":"Win版下载",
                    "img":"<img src='../../assets/image/20190327095659.jpg'>",
                    "src": ``,
                    "logImg": "<img src='../../assets/image/20190327095659.jpg'>"
                },
                {
                    "id":"2",
                    "name":"IOS版下载",
                    "img": "<img src='../../assets/image/20190327095659.jpg'>",
                    "src": "./",
                    "logImg": "<img src='../../assets/image/20190327095659.jpg'>"
                },
                {
                    "id":"3",
                    "name":"安卓版下载",
                    "img": "<img src='../../assets/image/20190327095659.jpg'>",
                    "src": "./",
                    "logImg": "<img src='../../assets/image/20190327095659.jpg'>"
                }
            ]
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
        }
    },
    computed: {
        ...mapGetters(['getSettingBase'])
    },
}
</script>

<style lang="scss" scoped>
    .ti-title{
        font-size: 17px; font-weight: 500;color: #000;
    }
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
        cursor: pointer;
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
    // .dpc:hover .show{
    //     display: block;
    // }
    .pcLog {
        background: url(../../assets/image/win-mac-icon.png) no-repeat;
    }
    .iosLog{
        background: url(../../assets/image/win-mac-icon.png) no-repeat  -60px 1px;
    }
    .anLog{
        background: url(../../assets/image/win-mac-icon.png) no-repeat -122px 1px;
    }
    .text {
        color: #000;
    }
    .show {
        // display: none;
        position: absolute;
        top: 0;
        left: 305px;
    }
    .win-mac-icon{
        width: 50px;
        height: 50px;
        display: block;
        float: left;
        position: relative;
        top: 5px;
        left: 22px;
        
    }
</style>

