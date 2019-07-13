<template>
    <div>
        <div class="pz_mlist" v-for="(item, index) in curpzList" :key="index">
            <div class="table_top">
                <div class="operate_state">
                    <span>股票配资：{{item.num}}</span>
                    <span class="state_all"></span>
                </div>
                <a href="" class="examine">查看网签合同</a>
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
                        <td width="12%">{{item.cpzj}}元</td>
                        <td width="13%">{{item.jrzj}}元</td>
                        <td width="13%">{{item.fxbzj}}元</td>
                        <td width="13%">{{item.slx}}元</td>
                        <td width="12%">{{item.jjx}}元</td>
                        <td width="12%">{{item.pcx}}元</td>
                        <td width="25%">{{item.time}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="stock-data">
                <div class="table_info">
                    收益：<span class="font_red14">{{item.sy}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    收益率：<span class="font_red14">{{item.syl}}</span>
                </div>
                <div class="put_up">
                    <h2>账户：{{item.zh}}</h2>
                    <h2>密码：{{item.mm}}</h2>
                </div>
            </div>
            <div class="user_oper">
                <ul>
                    <li>
                        <a class="menu_white" href="javascript:void(0);" @click="showAlert(0)">扩大配资</a>
                    </li>
                    <li>
                        <a class="menu_white" href="javascript:void(0);" @click="showAlert(1)">申请延期</a>
                    </li>
                    <li>
                        <a class="menu_white" href="javascript:void(0);" @click="showAlert(2)">提取收益</a>
                    </li>
                    <li>
                        <a class="menu_white" href="javascript:void(0);" @click="showAlert(3)">追加保证金</a>
                    </li>
                    <li>
                        <a class="menu_white" href="javascript:void(0);" @click="showAlert(4)">终止操盘</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="shade" v-if="isShowPzAlert">
            <div class="pz-alert">
                <PzAlert @listenCloseAlert="listenCloseAlert" :type="type"/>
            </div>
        </div>
    </div>
</template>

<script>
import PzAlert from './PzAlert'

export default {
    props:['curpzList'],
    components: { PzAlert },
    data() {
        return {
            isShowPzAlert: false,
            type: 0
        }
    },    
    methods: {
        listenCloseAlert(data) {
            this.isShowPzAlert = data
        },
        showAlert(type) {
            this.isShowPzAlert = true
            this.type = type
        }
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
    position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 19891015;background: rgba(0,0,0,.3);
    .pz-alert{
        position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 19891047;width: 700px;height: 350px;
    }
}
</style>
