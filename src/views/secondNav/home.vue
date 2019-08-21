<template>
    <div class="home">
      <!--轮播图-->
      <div class="carousel">       
        <swiper :options="swiperOption" v-if="getPcIndexCarousel.length > 1">
          <swiper-slide v-for="(item, index) in getPcIndexCarousel" :key="index">
            <img style="cursor: pointer;" :src="item.img" @click="goImgUrl(item.url)" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="f-p">
          <div class="float-box">
            <div class="popbox">
              <div class="popbox-bg"></div>
              <div class="popbox-main">
                <div class="head">
                  <div class="slogan">您炒股，我出钱</div>
                  <h1>目前免息配资20天</h1>
                </div>
                <div class="bottom">
                  <div class="register" v-if="!getIsLogin">
                    <router-link class="btn-block btn-primary" to="/user/register" tag="a">免费注册</router-link>
                    <router-link class="btn-block btn-primary" to="/user/login" style="background:#2baffc" tag="a">立即登录</router-link>
                  </div>
                  <div class="register" v-else>
                    <router-link class="btn-block btn-primary" to="/member" style="background:#2baffc;width: 95%;" tag="a">我的账户</router-link>
                  </div>
                  <div class="tips">资金100%双重保障，100%实盘交易</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="newbee_bg">
        <div class="p2p_pname wrapper">
          <div class="left">
            <s></s>
            网站公告
          </div>
          <div class="content">
            <marquee onmouseover="this.stop()" onmouseout="this.start()">
              <ul>
                <li v-for="(item, index) in getAnnouncement.rows" :key="index">
                  <a href="javascript:void(0);" @click="toArticle('网站公告', '0', item.id, false)">{{item.title}}</a>
                </li>
              </ul>
            </marquee>
          </div>
          <a href="javascript:void(0);" class="more-notice" @click="toArticle('网站公告', '0', '', true)">查看更多></a>
        </div>
      </div>
      <!-- 统计 -->
      <div class="statistics wrapper">
        <div class="pb1">
          <ul>
            <li>
              <strong><span>累积配资人数</span></strong>
              <p>
                <span>{{fundingRenC}}</span>
                <span>人</span>
              </p>
            </li>
            <li>
              <strong><span>累积配资金额</span></strong>
              <p>
                <span>{{fundingMoney}}</span>
                <span>万元</span>
              </p>
            </li>
            <li>
              <strong><span>累积利润赚取</span></strong>
              <p>
                <span>{{profitMoney}}</span>
                <span>万元</span>
              </p>
            </li>
            <li>
              <strong><span>按月配资余额</span></strong>
              <p>
                <span>{{monthMoney}}</span>
                <span>万元</span>
              </p>
            </li>
            <li>
              <strong><span>按天配资余额</span></strong>
              <p>
                <span>{{dayMoney}}</span>
                <span>万元</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="newbee">
          <ul class="wrapper newbee-box">
            <li class="js-item">
              <div class="figure">
                <img src="../../assets/image/icon-1.png" alt="">
              </div>
              <div class="item-body">
                <div class="title">资金保障</div>
                <div class="text">资金第三方托管，专款专用</div>
              </div>
            </li>
            <li class="js-item">
              <div class="figure">
                <img src="../../assets/image/icon-2.png" alt="">
              </div>
              <div class="item-body">
                <div class="title">真实交易</div>
                <div class="text">100%实盘</div>
              </div>
            </li>
            <li class="js-item">
              <div class="figure">
                <img src="../../assets/image/icon-3.png" alt="">
              </div>
              <div class="item-body">
                <div class="title">快捷提现</div>
                <div class="text">闪电提现，三十分钟到账</div>
              </div>
            </li>
            <li class="js-item">
              <div class="figure">
                <img src="../../assets/image/icon-4.png" alt="">
              </div>
              <div class="item-body">
                <div class="title">专业服务</div>
                <div class="text">客户体验至上为宗旨</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 股票配资 -->
      <div class="pei_con wrapper">
        <div class="peizi-tit">
          <img src="../../assets/image/gppz.png" alt="">
        </div>
        <ul class="peizi-box">
          <li v-for="(item, index) in peiziList" :key="index">
            <div class="pei_sx_bj">
              <p class="pei_sx_head">{{item.title}}</p>
              <p class="pei_sx_info" v-html="item.content"></p>
              <a href="javascript:void(0);" @click="toPlan(index)">
                <span class="btn-red-01">立即申请</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <!-- 股票走势 -->
      <div class="wrapper">
        <div class="pb4">
          <div class="index_mod4">
            <div class="mod_right">
              <h3 class="right-tit">行情中心</h3>
              <div class="s_menu">
                <ul>
                  <li v-for="(item, index) in exponentList" :key="index">
                    <a 
                    @click="changExponent(item.lable)" 
                    :class="item.lable == isExponent ? 'active' : ''" 
                    href="javascript:void(0);">
                    {{item.name}}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mod_left">
              <div class="hq_con">
                <div class="hq_txt">
                  <a 
                  @click="changLine(item.lable)"
                  :class="item.lable == isLine ? 'cur' : ''"
                  href="javascript:void(0);" 
                  v-for="(item, index) in exponentLine" 
                  :key="index">
                  {{item.name}}
                  </a>
                </div>
                <div class="hq_img">
                  <img :src="imgUrl" width="550" height="300" alt="">
                </div>
              </div>
              <div class="hq_sv">
                <div class="hq_st">
                  <!-- 1 -->
                  <div class="hq_a1" :style="{color: upDown ? '#FF0000' : '#009900'}">
                    <li class="sv">{{zhishu1[1] | number}}</li>
                    <li class="ico" v-if="upDown"></li>
                    <li class="dw" v-else></li>
                    <li class="icon-right">{{zhishu1[2] | number}}</li>
                    <li class="icon-right">{{zhishu1[3] | number}}%</li>
                  </div>
                  <!-- 2 -->
                  <div class="hq_aq1_xq" >
                    <p>
                      <span>
                        <span class="xq-color">今开：</span>
                        <font :style="{color: upDown ? '#FF0000' : '#009900'}">{{zhishu2[1] | number}}</font>
                      </span>
                      <span>
                        <span class="xq-color">成交量：</span>
                        <font :style="{color: upDown ? '#FF0000' : '#009900'}">{{makeQuantity}}手</font>
                      </span>
                      <span>
                        <span class="xq-color">振幅：</span>
                        <font :style="{color: upDown ? '#FF0000' : '#009900'}">{{amplitude | number}}%</font>
                      </span>
                      <span>
                        <span class="xq-color">最高：</span>
                        <font :style="{color: upDown ? '#FF0000' : '#009900'}">{{zhishu2[4] | number}}</font>
                      </span>
                      <span>
                        <span class="xq-color">最低：</span>
                        <font :style="{color: upDown ? '#FF0000' : '#009900'}">{{zhishu2[5] | number}}</font>
                      </span>
                      <span>
                        <span class="xq-color">成交额：</span>
                        <font :style="{color: upDown ? '#FF0000' : '#009900'}">{{yesterdayClosed}}</font>
                      </span>
                      <span>
                        <span class="xq-color">昨收：</span>
                        <font :style="{color: upDown ? '#FF0000' : '#009900'}">{{zhishu2[2] | number}}</font>
                      </span>
                    </p>
                  </div>
                  <!-- 3 -->
                  <div class="gupiao">
                    <table>
                      <thead>
                        <tr>
                          <td colspan="2"> 领涨板块 </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in goUp" :key="index" v-show="index < 4">
                          <td>{{item.split(',')[1]}}</td>
                          <td style="color:#FF0000">{{item.split(',')[5]}}%</td>
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <thead>
                        <tr>
                          <td colspan="2"> 领跌板块 </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in goDown" :key="index" v-show="index < 4">
                          <td>{{item.split(',')[1]}}</td>
                          <td style="color:#009900">{{item.split(',')[5]}}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 新闻 -->
      <div class="wrapper">
        <div class="pb6">
          <div class="bd dd">
            <p>
              <span>股市行情</span>
              <a href="javascript:void(0);" @click="toArticle('股市行情', '1', '', true)">更多 +</a>
            </p>
            <ul>
              <li v-for="(item, index) in getStockInfo.rows" :key="index" v-show="index < 6">
                <a href="javascript:void(0);" @click="toArticle('股市行情', '1', item.id, false)">
                  <strong>·</strong>
                  &nbsp;&nbsp;{{item.title}}
                </a>
                <span class="date">{{(item.create_time).split(" ")[0]}}</span> 
              </li>
            </ul>
          </div>
          <div class="bd dd">
            <p>
              <span>配资百科</span>
              <a href="javascript:void(0);" @click="toArticle('配资百科', '2', '', true)">更多 +</a>
            </p>
            <ul>
              <li v-for="(item, index) in getEncyclopedias.rows" :key="index" v-show="index < 6">
                <a href="javascript:void(0);" @click="toArticle('配资百科', '2', item.id, false)">
                  <strong>·</strong>
                  &nbsp;&nbsp;{{item.title}}
                </a>
                <span class="date">{{(item.create_time).split(" ")[0]}}</span>
              </li>
            </ul>
          </div>
          <div class="dd recharge"  >
            <p class="dd_line">
              <span>今日充值</span>
            </p>
            <div class="jlsjd">
              <ul :style=" isTransition ? {transform: 'translateY('+ (top)+'px)', transition: '1.5s'}: {transform: 'translateY('+ (0)+'px)'}" >
                <li v-for="(item, index) in todayPrepaid" :key="index"  class="item prepaid-item">
                  <span>{{item.phone}}充值</span>
                  <span>{{item.money}}元</span>
                </li>
              </ul>              
            </div>
          </div>
        </div>
      </div>
      <!-- 合作伙伴 -->
      <div class="pb6-bg">
        <div class="wrapper">
          <div class="pb7-bottom">
            <div class="floor-hd">
              <i class="index_link_icon"></i>
              <h3>合作伙伴</h3>
            </div>
            <div class="linkM">
              <div class="linkPic">
                <a :href="item.url" v-for="(item, index) in getCooperation" :key="index" target="_blank">
                  <img width="150px" height="50px" :src="item.img" alt="">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
</template>

<script>
import 'swiper/dist/css/swiper.css'  
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapActions } from "vuex";
import { goImgUrl, format } from '@/js/utils'

export default {
  filters: {
    number(value) {
      var toFixedNum = Number(value).toFixed(2);
      return toFixedNum;
    }
  },
  name: 'home',
  components: { swiper, swiperSlide },
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        slidesPerView: 'auto',
        centeredSlides:true,
        spaceBetween: 10,
        effect: 'fade',// 渐变
        paginationClickable:true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }      
      },
      fundingRenC:1000,//累积配资人数
      fundingMoney:1000,//累积配资金额
      profitMoney:2000,//累积利润赚取
      monthMoney:2000,//按月配资余额
      dayMoney:1000,//按天配资余额
      //今日充值
      todayPrepaid:[
        {phone: '1', money: 58888},{phone: '2', money: 46666},{phone: '3', money: 58888},
        {phone: '4', money: 58888},{phone: '5', money: 27666},{phone: '6', money: 58888},
        {phone: '7', money: 58888},
        {phone: '8', money: 58888}
      ],
      top: -45,
      isTransition: false,
      isExponent: 'topExponent',
      exponentList: [//指数list
        {name: '上证指数', lable: 'topExponent'},
        {name: '深证指数', lable: 'shenExponent'}
      ],
      isLine: 'minuteLine',
      exponentLine: [//指数线
        {name: '分时线', lable: 'minuteLine'},
        {name: '日K线', lable: 'dayLine'},
        {name: '周K线', lable: 'weekLine'},
        {name: '月K线', lable: 'monthLine'},
      ],
      goUp: [],//领涨板块
      goDown: [],//领跌板块
      imgUrl: 'http://image.sinajs.cn/newchart/min/n/sh000001.gif',
      zhishu1:[],
      zhishu2:[]
    }
  },
  created() {
    this.setting()
    //初始为上证指数
    this.zhishu1 = hq_str_s_sh000001.split(',')
    this.zhishu2 = hq_str_sh000001.split(',')
    //获取领涨，跌板块
    this.goUp = sinaindustry_up
    this.goDown = sinaindustry_down
  },
  methods:{
    ...mapActions(['setting']),
    //新闻今日充值
    showPrepaid() {     
      let _this = this     
      let _run = () => {
        setTimeout(() => {
          if(_this.isTransition == false) {
            _this.isTransition = true
          }else {
            let fastTemp = _this.todayPrepaid[0]         
            _this.todayPrepaid.push(fastTemp)
            _this.isTransition = false
            _this.todayPrepaid.shift()
          }
          _run()
        },1500)
      }
      _run()
    },
    //跳转计划
    toPlan(index) {
      if(index == 0) {
        this.$router.push('/freefee')
      }else if(index == 1) {
        this.$router.push('/dayFinancing')
      }else if(index == 2) {
        this.$router.push('/monthFinancing')
      }else {
        this.$router.push('/vipFinancing')
      }
    },
    //网站公告&&配资百科&&股市行情跳转
    toArticle(title, active, id, showList) {
      this.$router.push('/user/article')
      this.$store.commit('ARTICLE_QUERY', {title: title, active: active, id: id, showList: showList})
    },
    // 改变行情中心
    changExponent(lable) {
      // 上证指数
      if(lable == 'topExponent') {
        this.zhishu1 = hq_str_s_sh000001.split(',')
        this.zhishu2 = hq_str_sh000001.split(',')
        this.imgUrl = 'http://image.sinajs.cn/newchart/min/n/sh000001.gif'
      }else {// 深证指数
        this.zhishu1 = hq_str_s_sz399001.split(',')
        this.zhishu2 = hq_str_sz399001.split(',')
        this.imgUrl = 'http://image.sinajs.cn/newchart/min/n/sz399001.gif'
      }
      this.isLine = 'minuteLine'
      this.isExponent = lable
    },
    // 改变分时线
    changLine(lable) {
      // 上证指数
      if(this.isExponent == 'topExponent') {
        if(lable == 'minuteLine') {//分时线
          this.imgUrl = 'http://image.sinajs.cn/newchart/min/n/sh000001.gif'
        }else if(lable == 'dayLine') {//日K线
          this.imgUrl = 'http://image.sinajs.cn/newchart/daily/n/sh000001.gif'
        }else if(lable == 'weekLine') {//周K线
          this.imgUrl = 'http://image.sinajs.cn/newchart/weekly/n/sh000001.gif'
        }else {//月K线
          this.imgUrl = 'http://image.sinajs.cn/newchart/monthly/n/sh000001.gif'
        }
      }else {// 深证指数
        if(lable == 'minuteLine') {//分时线
          this.imgUrl = 'http://image.sinajs.cn/newchart/min/n/sz399001.gif'
        }else if(lable == 'dayLine') {//日K线
          this.imgUrl = 'http://image.sinajs.cn/newchart/daily/n/sz399001.gif'
        }else if(lable == 'weekLine') {//周K线
          this.imgUrl = 'http://image.sinajs.cn/newchart/weekly/n/sz399001.gif'
        }else {//月K线
          this.imgUrl = 'http://image.sinajs.cn/newchart/monthly/n/sz399001.gif'
        }
      }    
      this.isLine = lable
    },
    goImgUrl(url) {
      goImgUrl(url)
    }
  },
  mounted() {
    this.showPrepaid()     
  },
  computed: {
    ...mapGetters([
      'getPcIndexCarousel', 
      'getIsLogin', 
      'getCooperation', 
      'getSettingOrder',
      'getStockInfo', 
      'getEncyclopedias',
      'getAnnouncement',
      'getSettingFree', 
      'getFreeMoney',
      'getSettingDays', 
      'getSettingMonths', 
      'getSettingVip'
    ]),
    peiziList() {
      if(this.getSettingFree.money_range != undefined) {
        return [
          {title: '免息计划', content: `我出钱，您炒股<br>盈利${this.getSettingFree.divided}%归您<br>最低${this.getSettingFree.money_range.min}元申请<br>资金放大5倍，最长配资20天`},
          {title: '按天计划', content: `低门槛${this.getSettingDays.money_range.min}元起<br>资金放大1-10倍<br>支持单票满仓<br>利息用几天算几天，短线投资更便捷`},
          {title: '按月计划', content: `低门槛${this.getSettingMonths.money_range.min}元起<br>资金放大1-10倍<br>支持单票满仓<br>长线配资更划算，利息最低0.6%`},
          {title: 'VIP计划', content: `${this.getSettingVip.money_range.min}元起申请<br>资金放大10倍以上<br>利息减半，VIP服务<br>交易佣金万一，最高可以配资${this.getSettingVip.money_range.max}`}
        ]
      }
    },
    //计算成交量
    makeQuantity() {
      return format(this.zhishu2[8])
    },
    // 成交额
    yesterdayClosed() {
      return format(this.zhishu2[9])
    },
    // 计算振幅((最高-最低)/昨收)
    amplitude() {
      return (this.zhishu2[4] - this.zhishu2[5])/this.zhishu2[2] * 100
    },
    // 涨跌(最新指数比较昨收)
    upDown() {
      if(this.zhishu1[1] > this.zhishu2[2]) {//今日大于昨收
        return true
      }else {
        return false
      }
    }
  },
  watch: {
    //累积配资人数
    'getSettingOrder.lenders_quantity':{
      handler(newVal, oldVal) { 
        let _this = this
        let _run = () => {     
          setTimeout(() => {
            if(_this.fundingRenC < newVal) {  
              _this.fundingRenC += 555     
              _run()
            }else {
              _this.fundingRenC = newVal
            }
          },10)         
        }     
        _run() 
      },
      deep: true
    },
    //累积配资金额
    'getSettingOrder.lenders_amount':{
      handler(newVal, oldVal) {  
        let _this = this
        let _run = () => {     
        setTimeout(() => {
          if(_this.fundingMoney < newVal) {  
            _this.fundingMoney += 555     
              _run()
            }else {
              _this.fundingMoney = newVal
            }
          },10)         
        }     
        _run() 
      },
      deep: true
    },
    //累积利润赚取
    'getSettingOrder.accumulated_profit':{
      handler(newVal, oldVal) {  
        let _this = this
        let _run = () => {     
        setTimeout(() => {
          if(_this.profitMoney < newVal) {  
            _this.profitMoney += 555     
              _run()
            }else {
              _this.profitMoney = newVal
            }
          },10)         
        }     
        _run() 
      },
      deep: true
    },
    //按月配资余额
    'getSettingOrder.loan_balance_month':{
      handler(newVal, oldVal) {  
        let _this = this
        let _run = () => {     
        setTimeout(() => {
          if(_this.monthMoney < newVal) {  
            _this.monthMoney += 555     
              _run()
            }else {
              _this.monthMoney = newVal
            }
          },10)         
        }     
        _run() 
      },
      deep: true
    },
    //按天配资余额
    'getSettingOrder.loan_balance_day':{
      handler(newVal, oldVal) {  
        let _this = this
        let _run = () => {     
        setTimeout(() => {
          if(_this.dayMoney < newVal) {  
            _this.dayMoney += 555     
              _run()
            }else {
              _this.dayMoney = newVal
            }
          },10)         
        }     
        _run() 
      },
      deep: true
    }
  }  
}
</script>

<style lang="scss" scoped>
  .carousel{
    width: 100%;height: 400px;position: relative;
    .f-p{width: 1200px;position: absolute;top: 0;left: 50%;transform: translate(-50%, 0);z-index: 3;}
    .float-box{
      position: absolute;z-index: 2;right: 0;top: 60px;width: 326px;height: 235px;padding: 30px 0 0 30px;text-align: center;border-radius: 15px;
      .popbox{
        float: right;width: 326px;text-align: center;margin: 0;
        .popbox-bg{
          background: #000000;opacity: 0.3;-moz-opacity: 0.7;filter: alpha(opacity=70);width: 326px;height: 235px;display: block;position: absolute;top: 0px;
        }
        .popbox-main{
          margin: 0;position: relative;padding: 0px 0px;
          .head{
            padding: 0 20px;
            .slogan{
              line-height: 40px;padding: 0;color: #fff;font-size: 21px;
            }
            h1{
              font-size: 29.7px;line-height: 1.5;color: #fff;
            }
          }
          .bottom{
            padding: 20px 20px 10px;
            .btn-block{
              display: block;width: 44%;margin: 0px 3%;text-align: center;transition: background .3s;float: left;
            }
            .btn-primary{
              background-color: #fb4945; color: #fff;font-size: 16px;line-height: 42px;
            }
            .tips{
              line-height: 40px;font-size: 14.86px;color: #fff;
            }
          }
        }
      }
    }
  }
  .newbee_bg{
    background: #fff;border-bottom: 1px solid #f3f3f3;
    .p2p_pname{
      display: flex;justify-content: space-between;height: 48px;align-items: center;position: relative;padding-left:32px;box-sizing: border-box;
      .left{    
        font-size: 15px;color: #5e5e5e;
        s{
          display: block;width: 28px;height: 28px;position: absolute;left: 0;top: 13px;background: url(../../assets/image/icons.png) no-repeat -67px -116px;
        }
      }
      .content{
        flex: 1;overflow: hidden;margin: 0 12px;    white-space: nowrap;
        ul{
          li{
            display: inline-block;margin-right: 120px;
            a{
              color: red;
            }
          }
        }
      }
    }
  }
  .statistics{
    .pb1 {
      background: #fff;height: 120px;width: 1200px;margin: 0 auto;margin-bottom: 20px;
      ul{
        display: flex;justify-content: space-between;align-items: center;height: 100%;
        li{
          flex: 1;text-align: center;
          strong{
            span{
              font-size: 14px;color: #666;font-weight: 300;
            }
          }
          p{
            span{
              font-size: 20px;padding-top: 7px;display: inline-block;color: #CB3B3B;
            }
          }
        }
      }
    }
    .newbee{
      padding: 30px 0;background-color: #fff;margin-bottom: 20px;
      .newbee-box{
        display: flex;justify-content: space-between;padding: 0 20px;box-sizing: border-box;
        li{
          flex:1;cursor: pointer;
          .figure{
            float: left;margin-right: 30px;
            img{
              width: 60px;height: 60px;transition: all .3s linear;
            }
          }
          .item-body{
            .title{
              font-size: 18px;color: #333333;line-height: 2;
            }
            .text{
              color: #999999;
            }
          }
        }
        .js-item:hover .figure img{
          transform:rotateY(360deg);
        }
        .js-item:hover .title{
          color: #B69942;
        }
        .js-item:hover .text{
          color: #B69942;
        }
      }
    }
  }
  .pei_con{
    height: 370px;background: #fff;border: 1px solid #e4e4e4;box-sizing: border-box;margin-top: 21px;margin-bottom: 21px;
    .peizi-tit{
      text-align: center;margin-bottom: 15px;
    }
    .peizi-box{
      display: flex;justify-content: space-between;
      li{
        height: 280px;border: 1px solid #fff;flex: 1; position: relative;
        .pei_sx_bj{
          margin-top: 20px;font-size: 16px;color: #8b8b8b;
          .pei_sx_head{
            width: 100%;color: #fb4945;text-align: center;line-height: 2;font-size: 20px;font-weight: bold;margin-bottom: 10px;
          }
          .pei_sx_info{
            width: 100%;color: #666666;text-align: center;line-height: 2;
          }
          .btn-red-01{
            display: block;width: 160px;background-color: #fff;color: #fb4945;font-size: 16px;font-weight: bold;line-height: 40px;
            border: 1px solid #fb4945;position: absolute;margin-top: 10px;left: 65px;text-align: center;border-radius: 5px;
          }
        }
      }
      li:hover{
        border: 1px solid #f7515e;box-shadow: 0px 0px 30px rgba(247,81,94,0.3);-webkit-box-shadow: 0px 0px 30px rgba(247,81,94,0.3);-moz-box-shadow: 0px 0px 30px rgba(247,81,94,0.3);
      }
      li:nth-child(even){
        .pei_sx_head{color: #2baffc;}
        .btn-red-01{    border: 1px solid #2baffc;color: #2baffc;}
      }
    }
  }
  .pb4{
    padding: 0px;height: 360px;background: #fff;overflow: hidden;border: 1px solid #eeeeee;
    .index_mod4{
      overflow: hidden;border: 1px solid #f1f1f1;
      .mod_right{
        background: url(../../assets/image/img-market.jpg) no-repeat 0px 0px;width: 300px;height: 358px;float: left;position: relative;
        .right-tit{
          font-size: 32px;height: 35px;line-height: 35px;width: 100%;margin: 76px 0px;color: #fff;text-align: center;
        }
        .s_menu{
          position: absolute;top: 165px;left: 91px;
          li{
            margin-bottom: 10px;
            a{
              display: block;height: 38px;line-height: 38px;border-style: solid;border-color: #fff;border-width: 1px;background-color: rgba(255, 255, 255, .1);
              font-size: 18px;color: #fff;-webkit-transition: all .1s ease-in-out;-moz-transition: all .1s ease-in-out;-ms-transition: all .1s ease-in-out;
              transition: all .1s ease-in-out;text-decoration: none;cursor: pointer;padding-left: 20px;padding-right: 20px;width: 73px;
            }
            .active{
              color: #fc8819;background: #fff;
            }
          }
        }
      }
      .mod_left{
        height: 357px;float: left;
        .hq_con{
          width: 575px;border-right: solid 1px #eeeeee;height: 357px;float: left;overflow: hidden;
          .hq_txt{
            margin: 16px 0 13px 56px;
            a{
              background: #d5e7f6;font-size: 14px;margin-right: 10px;padding: 5px 28px 5px 28px;color: #4a4949;text-decoration: none;
            }
            .cur{
              font-size: 14px;background-color: #02A1ED;color: #fff;
            }
          }
          .hq_img{
            margin-left: 20px;
          }
        }
        .hq_sv{
          width: 309px;float: left;
          .hq_a1{
            padding-left: 80px;border-bottom: solid 1px #e4e4e4;padding-top: 20px;overflow: hidden;padding-bottom: 20px;
            li{
              float: left;font-size: 18px;line-height: 36px;
            }
            .sv{
              float: left;font-size: 24px;
            }
            .dw{
              width: 35px;height: 36px;background-image: url(../../assets/image/index_tr_down.jpg);background-repeat: no-repeat;background-position: center center;
            }
            .ico{
              width: 35px;height: 36px;
              background-image: url(../../assets/image/index_tr_up.jpg);
              background-repeat: no-repeat;
              background-position: center center;
            }
            .icon-right{
              font-size: 12px;margin-right: 15px;height: 16px;line-height: 16px;width: 70px;
            }
          }
          .hq_aq1_xq{
            font-size: 12px;line-height: 28px;width: 95%;padding: 0 0 0 9px;float: left;
            span{
              width: 50%;display: block;float: left;overflow: hidden;padding: 0px;margin: 0px;
              .xq-color{
                text-align: right;
              }
              font{
                // color: #237C02;
              }
            }
          }
          .gupiao{
            padding: 0px 0px 0px 19px;margin-top: 10px;border-top: solid 1px #e4e4e4;float: left;width: 100%;
            table{
              width: 50%;float: left;
              tr{
                td{
                  height: 28px;line-height: 28px;font-size: 12px !important;
                }
              }
            }
          }
        }
      }
    }
  }
  .pb6{
    height: 350px;overflow: hidden;margin-bottom: 20px;background: #fff;margin-top: 20px;display: flex;justify-content: space-between;
    .bd{
      float: left;
    }
    .dd{
      width: 450px;height: 348px;
      p{
        width: 93%;height: 74px;border-bottom: 1px dashed #ccc; margin-left: 30px;
        span{
          float: left;padding-left: 20px;padding-top: 29px;font-size: 20px;color: #333333;position: relative;
        }
        span:before{
          content: "";position: absolute;width: 0;height: 15px;border-right: #fb4945 solid 3px;left: 0; top: 37px;
        }
        a{
          width: 62px;float: right;margin-top: 32px;color: #ffffff;font-size: 12px;background: #ccc;text-align: center;border-radius: 5px;
        }
        a:hover{
          color: red;
        }
      }
      >ul{
        width: 407px;line-height: 45px;padding-left: 20px; height: 260px;
        li{
          padding-left: 10px;width: 407px;height: 45px;display: flex;justify-content: space-between;box-sizing: border-box;align-items: center;
          .date{
            color: #999999;
          }
          a{
            color: #333;transition: all 1s ease 0s;border-radius: 3px;font-size: 15px;width: 270px;
            overflow: hidden;height: 20px;line-height: 20px;text-overflow:ellipsis;white-space: nowrap;
          }
          a:hover{
            padding:2px 8px;color:red;transition: all 0.3s ease 0s;box-shadow:2px 2px 2px 3px #d1d1d1;
          }
        }
      }
    }
    .recharge{
      float: left;width: 285px;height: 100%;padding-left: 10px;
      .dd_line{
        width: 90%;height: 74px;border-bottom: 1px dashed #ccc;background: #fff;margin-left: 0;
      }
      .jlsjd{
        height: 265px;overflow: hidden;width: 90%;position: relative;
        ul{
          position: absolute;width: 100%;
          .item{
            display: flex;justify-content: space-between;line-height: 45px;color: #333;
          }
        }
        
      }
    }
  }
  .pb6-bg{
    background: #fff;
    .pb7-bottom{clear: both;overflow: hidden;}
    .floor-hd{
      margin-top: 25px;
      .index_link_icon{
        height: 17px;float: left;border: 2px solid red;
      }
      h3{
        float: left;padding: 0 10px;font-size: 16px;font-weight: bold;
      }
    }
    .linkM{
      min-height: 50px;display: block;padding: 0;position: relative;z-index: 0;margin-top: -1px;margin-bottom: 15px;
      .linkPic{
        width: 100%;display: inline-block;
        a{
          padding: 7px 15px;margin-top: 25px;border: 1px solid #ddd;text-align: center;float: left; display: block;margin-right: 20.6px;
        }
        a:nth-child(6),a:nth-child(12){
          margin-right: 0;
        }
      }
    }
  }
</style>
<style>
.swiper-pagination-bullet{
  display: inline-block;cursor: pointer;margin: 0 5px;height: 15px;width: 15px;background: #fff;border-radius: 50%;opacity: 0.6;background-color: #fff;
}
.swiper-pagination-bullet-active{
  opacity: 1;height: 18px;width: 18px;
}
</style>
