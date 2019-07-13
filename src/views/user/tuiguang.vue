<template>
    <div>
        <div class="nei-ye-banner">
            <span class="rebate">
                推荐好友并配资得<span style="color: red">20%</span>返利
            </span>
        </div>
        <div class="invite-input">
            <div class="main">
                <div class="input">
                    <input type="text" readonly="readonly" value="登陆后获得分享链接">
                </div>
            </div>
        </div>
        <div class="invite-table">
            <div class="main">
                <div class="box">
                    <p>邀请用户共  人</p>
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            <tr>
                                <td class="tit">用户名</td>
                                <td class="tit">注册时间</td>
                                <td class="tit">手机号码</td>
                                <td class="tit">注册ip</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.nei-ye-banner{
    background: url(../../assets/image/invite-bj1.png) center top no-repeat;height: 1073px;
    .rebate{
        position: relative;left: 502px;top: 370px;font-size: 42px;font-weight: bold;color: #fff;
    }
}
.invite-input{
    background: url(../../assets/image/invite-bj2.png) center top no-repeat;overflow: hidden;height: 1315px;  
    .main{
        width: 1000px;position: relative;margin: 0 auto;float: none;
        .input{
             width: 506px;height: 41px;position: absolute;left: 345px;top: 18px;
             input{
                outline:none;border: none;width: 390px;height: 35px;font-size: 20px;text-align: center;line-height: 35px;color: #e74a4a;
                display: inline-block;background-repeat: no-repeat;background-position: center center;margin: 3px;
             }
        }
    }
}
.invite-table{
    background-color: #fee5c7;overflow: hidden;
    .main{
        width: 1000px;position: relative;margin: 0 auto;float: none;
        .box{
            width: 916px;height: auto;display: block;padding: 8px 10px;border: 1px solid #eee;margin: 10px 15px;position: relative;
            border-radius: 3px;
            p{
                color: #dc4846;font-size: 18px;
            }
            table{
                border-radius: 5px;-moz-border-radius: 5px; -webkit-border-radius: 5px;margin-bottom: 50px;margin-top: 15px;
                width: 100%;height: auto;border: 1px solid #dc4846;
                td{
                    width: 25%;height: 45px;line-height: 45px;border: 1px solid #ea7c55;text-align: center;
                }
                .tit{
                    padding: 15px 0px;color: #ffffff; font-size: 20px; background-color: #dc4846;
                }
            }
        }
    }
}
</style>

