<template>
    <div class="myFinancing">
        <Title :infoTitle="infoTitle"/>
        <div class="user-box-con">
            <div class="classify-selected-con clearfix">
                <div class="classify-selected-time">
                    <dl class="classify-selected clearfix">
                        <dt>配资时间</dt>
                        <dd>
                            <datepicker
                                class="datepicker"                    
                                :input-class="'datepickerInput'"
                                :format="dateOption.format"
                                :language="dateOption.language"
                                v-model="curSelectTime"
                            ></datepicker>
                           <span>-</span>
                           <datepicker
                                class="datepicker"                    
                                :input-class="'datepickerInput'"
                                :format="dateOption.format"
                                :language="dateOption.language"
                                v-model="curSelectTime"
                            ></datepicker>
                        </dd>
                    </dl>
                    <dl class="classify-selected clearfix">
                        <dt>到期时间</dt>
                        <dd>
                            <datepicker
                                class="datepicker"                    
                                :input-class="'datepickerInput'"
                                :format="dateOption.format"
                                :language="dateOption.language"
                                v-model="curSelectTime"
                            ></datepicker>
                           <span>-</span>
                           <datepicker
                                class="datepicker"                    
                                :input-class="'datepickerInput'"
                                :format="dateOption.format"
                                :language="dateOption.language"
                                v-model="curSelectTime"
                            ></datepicker>
                        </dd>
                    </dl>
                </div>
                <div class="classify-selected-a">
                    <div class="classify-selected " style="margin-bottom: 0;">
                        <p class="left">配资类别</p>
                        <p>
                            <a href="#" class="selected">全部</a>
                            <a href="#">股票</a>
                            <a href="#">期货</a>
                        </p>
                    </div>
                    <div class="classify-selected " style="margin-bottom: 0;">
                        <p class="left">配资类型</p>
                        <p>
                            <a href="#" class="selected">全部</a>
                            <a href="#">股票</a>
                            <a href="#">期货</a>
                        </p>
                    </div>
                    <div class="classify-selected " style="margin-bottom: 0;">
                        <p class="left">配资状态</p>
                        <p>
                            <a href="#" class="selected">全部</a>
                            <a href="#">股票</a>
                            <a href="#">期货</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="user-box-con-2">
            <PzList :curpzList="curpzList"/>
        </div>
        <Pagination  :pageData="pageData"/>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Datepicker from "vuejs-datepicker"
import { zh } from "vuejs-datepicker/dist/locale"
import PzList from '@/components/member/PzList'
import Pagination from '@/components/member/Pagination'

export default {
    components:{ Title, Datepicker, PzList, Pagination },
    data() {
        return {
            infoTitle: {
                title:'配资管理',
                todu:{
                    title:'',
                }
            },
            curSelectTime: new Date(),
            dateOption: {
                language: zh,
                format: "yyyy-MM-dd"
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
            ],
            pageData: {
                total: 23,
                pages: 3 ,
                nowPage: 1
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.myFinancing{
    background: #fff;border: 1px solid #e0e0e0;border-radius: 3px;
    .user-box-con{
        width: 964px;margin: 0 auto;padding:15px 0;
        .classify-selected-con{
            margin-bottom: 18px;
            .classify-selected-time{
                width: 404px;float: left;font-size: 14px; 
            }
            .classify-selected{
                height: 26px;line-height: 28px;font-size: 13px;font-family: simsun;margin-bottom: 12px;
                dt{
                    width: 60px;margin-right: 9px;float: left;
                }
            }
            .classify-selected-a{
                width: 360px;float: left;font-size: 14px;
                a{
                    padding: 4px 10px;
                }
                // a:hover{
                //     color: #e25353;
                // }
                .selected{
                    background: #fe7b20;color: #fff;
                }
                p{
                    display: inline-block
                }
                .left{
                    width: 60px;margin-right: 9px;
                }
            }
        }
    }
    .user-box-con-2{
        width: 964px;margin: 0 auto;padding: 15px 0 20px;
    }
}
</style>
<style>
.datepicker{
    display: inline-block;   
}
.datepickerInput{
    border-radius: 0;width: 137px;line-height: 26px;padding-right: 20px;cursor: pointer;border: 1px solid #d8d8d8;
    outline: none;padding-left: 10px; background: url(../../assets/image/icondate.png) 115px 4px no-repeat;
}
.datepickerInput:hover {
    border: 1px solid #feb67f;
}
.datepickerInput:focus {
    border: 1px solid #fe6e00;
}
</style>