<template>
    <div>
        <div class="title" v-if="type == 0">扩大配资</div>
        <div class="title" v-if="type == 1">申请延期</div>
        <div class="title" v-if="type == 2">提取收益</div>
        <div class="title" v-if="type == 3">追加保证金</div>
        <div class="title" v-if="type == 4">终止操盘</div>
        <div class="content">
            <div class="frame-page-wrapper">
                <div class="jump_word" v-if="type == 0">
                    1. 扩大配资产生的利息费，需要一次性付清。<br>
                    2. 按月配资以30天为一个月计算，不满一个月的部分，按照占 30天的百分比计算。
                </div>
                <div class="jump_problem" v-if="type == 1">
                    续期要先把之前欠的利息先还上（信用至上），再根据当前平台设置的利率重新算，收取费用的公式和申请配资一样 
                </div>
                <div class="box_prompt" v-if="type == 2">
                    配资用户的可用资金大于总操盘资金，且只能提取盈利部分，提取盈利最少为100元，<br>
                    以10元单位为递增，即可申请提取盈利。
                </div>
                <div class="box_prompt" v-if="type == 3">
                    每次追加保证金不能小于当前方案总操盘资金的1%，注：追加保证金没有放大资金的效果。<br>
                    如需放大资金，请申请扩大配资。
                </div>
                <div class="jump_problem" v-if="type == 4">
                    您确定要申请终止操盘吗？
                </div>
                <div class="box_word" style="padding:0" v-if="type == 0">
                    当前账户余额：<span class="font_red14">39803</span>元<br>
                    追加金额：<input type="text" class="input_jump" value="100">&nbsp;元<br>
                    手续费：<span class="font_red14 j-fee">4.8元</span>
                </div>
                <div class="box_word_duan" v-if="type == 1">
                    <span>续期时间：</span>
                    <select name="duration" style="width:100px">
                        <option :value="item.value" v-for="(item, index) in monthSelect" :key="index">{{item.name}}</option>
                    </select>
                </div>
                <div class="box_word" v-if="type == 2">
                    提取金额：<input type="text" class="input_jump">&nbsp;元
                </div>
                <div class="box_word" v-if="type == 3">
                    当前账户余额：<span class="font_red14">39803</span>元<br>
                    追加金额：<input type="text" class="input_jump">&nbsp;元<br>
                </div>
                <div class="jump_word" v-if="type == 4">
                    1. 按天按月配资，不返回系统已经扣除的管理费及其他费用。<br>
                    2. 请确保您的交易账户已经卖出，否则我们有权把您持有进行强制处理（不保证平仓价）。<br>
                    3. 免息配资方案我们不会扣除任何费用。
                </div>
                <div class="box_menu">
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="type == 0">确认扩大</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="type == 0" @click="closeAlert">取消扩大</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="type == 1">确认续期</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="type == 1" @click="closeAlert">取消续期</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="type == 2">确认提取</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="type == 2" @click="closeAlert">取消提取</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="type == 3">确认追加</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="type == 3" @click="closeAlert">取消追加</a>
                    <a href="javascript:void(0);" class="menu_jump_blue" v-if="type == 4">确认终止</a>
                    <a href="javascript:void(0);" class="menu_jump_gary" v-if="type == 4" @click="closeAlert">取消终止</a>
                </div>
            </div>
        </div>
        <div class="setwin" @click="closeAlert">
            <a href="javascript:void(0);"></a>
        </div>
    </div>
</template>

<script>
export default {
    /**
     * type 0  扩大配资
     * type 1  申请延期
     * type 2  提取收益
     * type 3  追加保证金
     * type 4  终止操盘
     */
    props:['type'],
    data() {
        return {
            monthSelect:[
                {value : 1, name: '1月'}, {value : 2, name: '2月'}, {value : 3, name: '3月'}, {value : 4, name: '4月'},
                {value : 5, name: '5月'}, {value : 6, name: '6月'}, {value : 7, name: '7月'}, {value : 8, name: '8月'},
                {value : 9, name: '9月'}, {value : 10, name: '10月'}, {value : 11, name: '11月'}, {value : 12, name: '12月'}
            ]
        }
    },
    methods: {
        closeAlert() {
            this.$emit('listenCloseAlert', false)
        }
    },
    mounted() {
        // console.log(this.type)
    }
}
</script>

<style lang="scss" scoped>
.title{
    padding: 0 80px 0 10px;height: 35px;line-height: 35px;border-bottom: 1px solid #D5D5D5;font-size: 14px;color: #333;
    overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background-color: #EAEAEA;
}
.content{
    height: 314px;background: #FFF; color: #666;
    .frame-page-wrapper{
        min-width: 600px;padding: 30px;
        .jump_word{
            color: #f60;font-size: 14px;line-height: 24px;margin: 20px 30px 0 45px;padding-bottom: 10px;text-align: left;
        }
        .jump_problem{
            color: #333;font-size: 16px;line-height: 25px;margin: 10px auto auto 10px;padding-left: 35px; text-align: left;
        }
        .box_prompt{
            background: #fffcef;border: 1px solid #ffbb76;color: #e6760c;font-size: 14px;line-height: 24px;padding: 8px 10px 8px 50px;text-align: left;
        }
        .box_word{
            font-size: 14px;line-height: 40px;padding-top: 10px;text-align: center;
            .input_jump {
                border: medium none;height: 28px;line-height: 28px;    outline: none;
                padding-left: 5px;width: 132px;border: 1px solid #ddd;
            }
        }
        .box_word_duan{
            margin: 37px 0;text-align: center;
            span{
                font-size: 15px;
            }
        }
        .box_menu{
            margin-top: 20px;text-align: center; 
            a{
                margin: 0 5px;font-size: 14px; height: 30px;width: 92px;display: inline-block;line-height: 30px;
            }
            .menu_jump_blue{
                background: url(../../assets/image/menu_white.png) repeat scroll -92px 0;color: #fff;
                
            }
            .menu_jump_gary{
                background: url(../../assets/image/menu_white.png) repeat scroll -184px 0;color: #555;
            }
        }
    }
}
.setwin{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 0;
    line-height: initial;
    a{
        background: url(../../assets/image/icon.png) no-repeat -5px -55px; width: 14px;display: inline-block;height: 14px;
    }
}
</style>

