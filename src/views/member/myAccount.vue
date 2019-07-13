<template>
    <div class="my-account">
        <div class="user-box user-account-info">
            <div class="user-box-con clearfix">
                <dl class="user-account-balance">
                    <dt>
                        <span class="fs-m" style="text-indent:41px;">可用余额</span>
                        <el-tooltip effect="light" placement="bottom">
                            <span slot="content">投资人可自由支配的金额</span>
                            <span class="pro_tips-1"></span>
                        </el-tooltip>
                    </dt>
                    <dd>
                        <span class="fmt_money">39803</span>
                    </dd>
                </dl>
                <dl class="user-account-balance">
                    <dt>
                        <span class="fs-m">赠送管理费</span>
                        <el-tooltip effect="light" placement="bottom">
                            <span slot="content">参入活动赠送管理费金额，只能用来抵扣利息，不能提现！</span>
                            <span class="pro_tips-1"></span>
                        </el-tooltip>
                    </dt>
                    <dd>
                        <span class="fmt_money">406.00</span>
                    </dd>
                </dl>
                <dl class="user-current-month-earnings">
                    <dd style="margin-top: 40px;">
                        <router-link class="btn-style-5" to="/member/recharge" tag="a" style="margin-left:22px">充值</router-link>
                        <router-link class="btn-style-5" to="/member/withdrawDeposit" tag="a">提现</router-link>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <span class="fs-m" style="color:#f00">签到送好礼</span>
                        <el-tooltip effect="light" placement="bottom">
                            <span slot="content">坚持签到，每天赠送1元体验金<br>仅用作于抵扣管理费</span>
                            <span class="pro_tips-1"></span>
                        </el-tooltip>
                    </dt>
                    <a v-if="!isSign" href="javascript:void(0);" class="btn-style-5" style="margin: 20px 60px;" @click="sign">签到</a>
                    <a v-else href="javascript:void(0);" class="btn-style-5" style="margin: 20px 60px;color:#666;background:#f5f5f5;">已签到</a>
                </dl>
                <dl style="border-right:none;">
                    <dt>
                        <span class="fs-m">是否开启自动续期</span>
                        <el-tooltip effect="light" placement="bottom">
                            <span slot="content">
                            1、如果用户开启了自动续期，到期自动续期1(天/月)（免费配资除外）；<br />
                            2、使用中的配资；<br />
                            3、如果帐户余额不足，不会自动续期；<br />
                            4、到期时间等于当天的15：00时触发自动续期；<br />
                            5、按(天/月)收取手续费；<br />
                            6、如果已经手动申请了续期则不会执行；<br />
                            7、自动续期没有推荐人奖励；</span>
                            <span class="pro_tips-1"></span>
                        </el-tooltip>
                    </dt>
                    <dd>
                        <span class="fmt_money">
                            <a href="" class="btn-style-5" style="margin:18px;margin-left: 58px;">开启</a>
                        </span>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="user-box-2">
            <Title :infoTitle="infoTitle"/>
            <div class="user-box-con-2">
                <PzList :curpzList="curpzList"/>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import PzList from '@/components/member/PzList'

export default {
    components:{ Title, PzList },
    data() {
        return {
            isSign: false,
            infoTitle: {
                title:'我的配资',
                todu:{
                    title:'查看更多配资记录',
                }
            },
            curpzList:[
                {
                    num: '62520082384884',
                    cpzj: '11000.00', 
                    jrzj: '10000', 
                    fxbzj: '1000.00', 
                    slx: '60', 
                    jjx: '10500.00', 
                    pcx: '12000.00', 
                    time: '2019/06/26～2019/07/25',
                    sy: '0.00',
                    syl: '0.00%',
                    zh: '10086cs1',
                    mm: '123456'
                },
                {
                    num: '62520082384884',
                    cpzj: '11000.00', 
                    jrzj: '10000', 
                    fxbzj: '1000.00', 
                    slx: '60', 
                    jjx: '10500.00', 
                    pcx: '12000.00', 
                    time: '2019/06/26～2019/07/25',
                    sy: '0.00',
                    syl: '0.00%',
                    zh: '10086cs1',
                    mm: '123456'
                }
            ]
        }
    },
    methods: {
        sign() {
            alert('签到成功')
            this.isSign = true
        },
        toDoMore() {
            this.$router.push('/member/myFinancing')
        }
    }
}
</script>

<style lang="scss" scoped>
.user-box,.user-box-2{
    border: 1px solid #e0e0e0;border-radius: 3px; margin-top: 15px; background: #fff;
}
.user-box-2{
   margin-top: 15px; 
}
.user-account-info{
    margin-top: 0;
    .user-box-con{
        padding: 10px 0;border-radius: 3px; background-color: #fff;
        dl {
            float: left;border-right: 1px solid #e9e9e9;width: 210px;height: 100px;
            dt{
                height: 16px;line-height: 16px; margin-top: 27px;color: #666;text-align: center;
                span{
                    margin-right: 4px;
                }
                .fs-m{
                    font-size: 14px;
                }
                .pro_tips-1{
                    margin-top: 3px;    display: inline-block;width: 12px;height: 12px;overflow: hidden;
                    background: url(../../assets/image/user_sprite.png) no-repeat -19px -520px;   
                }
            }
            dd{
                height: 24px;line-height: 28px;margin-top: 5px;
                span{
                    float: left;color: #666;text-align: center;font-size: 14px;
                }
            }
            .btn-style-5{
                margin-right: 10px;background: #da4848;padding: 0 27px;border: 0;text-align: center;display: block;float: left;
                height: 24px;color: #fff;line-height: 24px;font-size: 12px;cursor: pointer;
            }
        }
        .user-account-balance{
           width: 165px; 
           dd{
               span{
                   margin-right: 10px;width: 150px;
               }
           }
            
        }
        // .user-current-month-earnings{

        // }
    }
}
.user-box-con-2{
    width: 964px;margin: 0 auto;padding: 15px 0 20px;
}
</style>
