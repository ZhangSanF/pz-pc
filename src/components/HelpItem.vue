<template>
    <div>
        <div class="help_box" v-for="(item, index) in elementItem" :key="index">
            <h5 :class="[item.show ? 'up' : 'down']" @click="showItem(index, item.show)">
                <b>{{item.label}}</b>
            </h5>
            <!-- <transition name="fade"> -->
                <div class="hp_cont" v-show="item.show" ref="test" :style="{transform: 'translateY('+ (top)+'px)', transition: '5s'}">
                    <p>
                        <span v-html="item.content"></span>
                    </p>
                </div>
            <!-- </transition>   -->
        </div>
    </div>
</template>

<script>
import { constants } from 'crypto';
export default {
    props: ['dataItem'],
    data() {
        return {
            elementItem: this.dataItem,
            top: 0
        }
    },
    methods: {
        showItem(eindex, eshow) {
            // let 26*this.elementItem.length+10
            for(let i = 0; i<this.elementItem.length; i++) {
                if(i == eindex) {
                    if(eshow == true) {
                        this.elementItem[i].show = false
                    }else {
                        this.elementItem[i].show = true
                    }
                }else {
                    this.elementItem[i].show = false
                }
            }           
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.help_box{
    border-bottom: #e7eaec 1px dashed;padding-bottom: 20px;margin: 20px 0 0 30px;
    .down{
        width: 16px;height: 16px;font-size: 14px;cursor: pointer;background: url(../assets/image/sx.png) no-repeat 0px -103px;
        b{
            margin: -3px 0 0 30px;width: 570px;display: inline-block;
        }
    }
    .up{
        width: 16px;height: 16px;font-size: 14px;cursor: pointer;background: url(../assets/image/sx.png) no-repeat 0px -84px;
        b{
            margin: -3px 0 0 30px;width: 570px;display: inline-block;
        }
    }
    .hp_cont{
        padding: 10px 20px 0 30px;overflow: hidden;
        p{
            line-height: 26px;
            .font{
                font-size: 14px;
            }
        }
    }
    // .fade-enter-active, .fade-leave-active {
    //     transition: opacity .5s
    // }
    // .fade-enter, .fade-leave-active {
    //     opacity: 0
    // }
}
</style>
