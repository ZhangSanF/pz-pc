<template>
    <div>
        <div class="pz_mlist" v-for="(item, index) in curpzList" :key="index">
            <div class="table_top">
                <div class="operate_state">
                    <span>股票配资：{{item.order_number}}</span>
                    <!-- 状态(1待审核、2审核通过、3审核失败，4操盘结束) -->
                    <span v-show="item.status == 1" class="state_all state_wait"></span>
                    <span v-show="item.status == 2" class="state_all"></span>
                    <span v-show="item.status == 3" class="state_all state_no"></span>
                    <span v-show="item.status == 4" class="state_all state_end"></span>
                </div>
                <a href="#" class="examine">查看网签合同</a>
            </div>
            <table class="table_user" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <th>操盘资金</th>
                        <th>借入资金</th>
                        <th>风险保证金</th>
                        <th>总利息</th>
                        <th>警戒线</th>
                        <th>平仓线</th>
                        <th>操盘时间</th>
                    </tr>
                    <tr>
                        <td width="12%">{{item.trader_money | number}}元</td>
                        <td width="13%">{{item.trader_money - item.member_money | number}}元</td>
                        <td width="13%">{{item.member_money | number}}元</td>
                        <td width="13%">{{item.interest_money | number}}元</td>
                        <td width="12%">{{warningLine(item.trader_money, item.member_money, item.order_type) | number}}元</td>
                        <td width="12%">{{closeLine(item.trader_money, item.member_money, item.order_type) | number}}元</td>
                        <td width="25%">{{item.start_time.split(' ')[0]}} ~ {{item.end_time.split(' ')[0]}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="stock-data">
                <div class="table_info">
                    收益：<span class="font_red14">{{item.sy}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    收益率：<span class="font_red14">{{item.syl}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    操盘周期：<span class="font_red14">
                        {{item.period}}
                        <span v-if="item.order_type == 1 || item.order_type == 2">天</span>
                        <span v-else>个月</span>
                    </span>
                </div>
                <div class="put_up">
                    <h2>账户：{{item.username}}</h2>
                    <h2>密码：{{item.password}}</h2>
                </div>
            </div>
            <div class="user_oper" v-if="item.status == 2">
                <ul>
                    <li v-if="item.order_type != 1">
                        <a 
                        class="menu_white" 
                        href="javascript:void(0);" 
                        @click="showAlert(1, item.id, item.order_type, item.multiple, item.period)">
                        扩大配资
                        </a>
                    </li>
                    <li v-if="item.order_type != 1">
                        <a 
                        class="menu_white" 
                        href="javascript:void(0);" 
                        @click="showAlert(2, item.id, item.order_type, item.multiple, item.period)">
                        申请延期
                        </a>
                    </li>
                    <li>
                        <a 
                        class="menu_white" 
                        href="javascript:void(0);" 
                        @click="showAlert(3, item.id, item.order_type, item.multiple, item.period)">
                        提取收益
                        </a>
                    </li>
                    <li>
                        <a 
                        class="menu_white" 
                        href="javascript:void(0);" 
                        @click="showAlert(4, item.id, item.order_type, item.multiple, item.period)">
                        追加保证金
                        </a>
                    </li>
                    <li>
                        <a 
                        class="menu_white" 
                        href="javascript:void(0);" 
                        @click="showAlert(5, item.id, item.order_type, item.multiple, item.period)">
                        终止操盘
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="shade" v-if="isShowPzAlert">
            <!-- @mousedown="move" -->
            <div class="pz-alert" ref="mytip">
                <PzAlert @listenCloseAlert="listenCloseAlert" :postData="postData" :computedData="computedData"/>
            </div>
        </div>
    </div>
</template>

<script>
import PzAlert from './PzAlert'
import { mapGetters, mapActions } from "vuex";

export default {
    props:['curpzList'],
    components: { PzAlert },
    data() {
        return {
            isShowPzAlert: false,
            // 发送给后台参数
            postData: {
                modifyType: '',
                orderId: ''
            },
            // 计算参数
            computedData: {
                order_type: '',//配资类型(扩大配资管理费, 续期时间)
                multiple: '',//杠杆倍数(扩大配资管理费)
                period: ''//周期(扩大配资管理费, 续期时间)
            }
        }
    },
    filters: {
        number(value) {
            var toFixedNum = Number(value).toFixed(2);
            return toFixedNum;
        }
    },    
    methods: {
        // 拖拽
        // move(e) {
        //     let odiv = this.$refs.mytip;
        //     let disX = e.clientX - odiv.offsetLeft;
        //     let disY = e.clientY - odiv.offsetTop;
        //     document.onmousemove = (e)=>{
        //         let left = e.clientX - disX;    
        //         let top = e.clientY - disY;
        //         this.positionX = top;
        //         this.positionY = left;
        //         odiv.style.left = left + 'px';
        //         odiv.style.top = top + 'px';
        //     };
        //     document.onmouseup = (e) => {
        //         document.onmousemove = null;
        //         document.onmouseup = null;
        //     };
        // },
        listenCloseAlert(data) {
            this.isShowPzAlert = data
        },
        showAlert(type, id, order_type, multiple, period) {
            this.isShowPzAlert = true
            // 发送请求参数
            this.postData.modifyType = type
            this.postData.orderId = id
            // 计算管理费参数
            this.computedData.order_type = order_type
            this.computedData.multiple = multiple
            this.computedData.period = period
        },
        // 警戒线(警戒线 = 配资资金 + 本金 * 警告线)
        warningLine(trader_money, member_money, order_type) {
            // trader_money 操盘资金 
            // member_money 本金 
            // trader_money - member_money 配资资金
            // 根据 order_type 拿到警告线 1免息2按天3按月4VIP
            switch (order_type) {
                case 1 : return (trader_money - member_money) + (member_money*this.getSettingFree.free_warning_line)/100; break;
                case 2 : return (trader_money - member_money) + (member_money*this.getSettingDays.days_warning_line)/100; break;
                case 3 : return (trader_money - member_money) + (member_money*this.getSettingMonths.months_warning_line)/100; break;
                case 4 : return (trader_money - member_money) + (member_money*this.getSettingVip.vip_warning_line)/100; break;
            }
        },
        // 平仓线(平仓线 = 配资资金 + 本金 * 平仓线)
        closeLine(trader_money, member_money, order_type) {
            switch (order_type) {
                case 1 : return (trader_money - member_money) + (member_money*this.getSettingFree.free_close_line)/100; break;
                case 2 : return (trader_money - member_money) + (member_money*this.getSettingDays.days_close_line)/100; break;
                case 3 : return (trader_money - member_money) + (member_money*this.getSettingMonths.months_close_line)/100; break;
                case 4 : return (trader_money - member_money) + (member_money*this.getSettingVip.vip_close_line)/100; break;
            }
        }
    },
    computed: {
        ...mapGetters(['getSettingFree', 'getSettingDays', 'getSettingMonths', 'getSettingVip'])
    }
}
</script>

<style lang="scss" scoped>
.table_top{
    background: #f4f4f4;border: 1px solid #e5e5e5;border-bottom: none;height: 38px;padding: 0 15px;
    margin-top: 20px;display: flex;justify-content: space-between;align-items: center;
    .operate_state{
        color: #425368;font-size: 14px;
        .state_all{
            width: 50px;height: 21px;margin-left: 10px;float: right;background: url(../../assets/image/icon_state.png) no-repeat;
        }
        .state_operate {background-position:0 0;}/*结束*/
        .state_operatestop {background-position:0px -63px;}/*使用中*/
        .state_settle {background-position:0 -21px;}/*待结算*/
        .state_wait {background-position:0 -42px;}/*待审核*/
        .state_end {background-position:0 -64px;}/*已结束*/
        .state_no {background-position:0 -106px;}/*审核未通过*/
    }
    .examine{
        color: #fe7b20;
    }
}
.table_user {
    border: 1px solid #e5e5e5;border-collapse: collapse;background: #fff;
    th{
        border-bottom: 1px solid #e5e5e5;height: 38px;line-height: 38px;text-align: center;    font-style: normal;font-weight: 400;
    }
    td{
        border-bottom: 1px solid #e5e5e5;height: 38px;line-height: 38px;text-align: center;
    }
}
.stock-data {
    line-height: 45px;border: 1px solid #e5e5e5;border-top: none;display: flex;justify-content: space-between;padding: 0 20px;
    .table_info{
        font-size: 14px;
    }
    .put_up{
        h2{
            float: left;
        }
    }
}
.user_oper {
    border: 1px solid #e5e5e5;border-top: none;background: #f8f8f8;height: 36px;padding-left: 20px;padding-top: 6px;margin-bottom: 20px;
    ul{
        li{
            float: left;padding-right: 5px;
            .menu_white{
                width: 92px;height: 30px;background: url(../../assets/image/menu_white.png);text-align: center;display: block;text-align: center;
                font-size: 14px;color: #666;text-decoration: none;line-height: 30px;
            }
            .menu_white:hover{
                    background: url(../../assets/image/menu_white.png) -92px 0;color: #fff;
            }
        }
    }
}
.shade{
    position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 2000;background: rgba(0,0,0,.3);
    .pz-alert{
        position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 2001;width: 700px;height: 350px;
    }
}
</style>
