<template>
    <div class="footer">
        <!-- footer-module -->
        <div class="footer-module">
            <div class="footer-nav">
                <div class="related-link ">
                    <div>
                        <p class="first-row">关于我们</p>
                        <p>
                          <router-link :to="{path: '/user/about',query: {title: '公司简介', active: '0'}}" tag="a">平台简介</router-link>
                        </p>
                        <p>
                          <router-link :to="{path: '/user/about',query: {title: '办公环境', active: '1'}}" tag="a">办公环境</router-link>
                        </p>
                        <p>
                          <router-link :to="{path: '/user/about',query: {title: '联系我们', active: '6'}}" tag="a">联系我们</router-link>
                        </p>
                        <p>
                          <router-link :to="{path: '/user/about',query: {title: '配资细则', active: '2'}}" tag="a">配资细则</router-link>
                        </p>
                    </div>
                    <div>
                        <p class="first-row">股票配资</p>
                        <p>
                          <router-link to="/freefee" tag="a">免息计划</router-link>
                        </p>
                        <p>
                          <router-link to="/dayFinancing" tag="a">按天计划</router-link>
                        </p>
                        <p>
                          <router-link to="/monthFinancing" tag="a">按月计划</router-link>
                        </p>
                        <p>
                          <router-link to="/vipFinancing" tag="a">VIP计划</router-link>
                        </p>
                    </div>
                    <div>
                        <p class="first-row">贴心指引</p>
                        <p>
                          <router-link :to="{path: '/user/about',query: {title: '新手指南', active: '3'}}" tag="a">新手指南</router-link>
                        </p>
                        <p>
                          <router-link to="/anquan" tag="a">安全保障</router-link>
                        </p>
                        <p>
                          <router-link to="/downloaded" tag="a">交易软件</router-link>
                        </p>
                    </div>
                    <div>
                        <p class="first-row">帮助中心</p>
                        <p>
                          <router-link :to="{path: '/user/about',query: {title: '注册协议', active: '4'}}" tag="a">注册协议</router-link>
                        </p>
                        <p>
                          <router-link to="/user/bangzhu" tag="a">帮助中心</router-link>
                        </p>
                        <p>
                          <router-link to="/user/tuiguang" tag="a">推广赚钱</router-link>
                        </p>
                    </div>
                </div>
                <div class="qr-code-module">
                    <div class="qr-code-item">
                        <p>
                            <img src="../assets/image/20190611180622.png" alt="">
                        </p>
                        <p>扫一扫，微信客服</p>
                    </div>
                </div>
                <div class="qr-code-module">
                    <div class="qr-code-item">
                        <p>
                            <img src="../assets/image/20190327095659.jpg" alt="">
                        </p>
                        <p>扫一扫，微信公众号</p>
                    </div>
                </div>
                <div class="service-num-module">
                    <h2>
                        <span>
                            <strong>全国咨询热线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                        </span>
                    </h2>
                    <p class="dianhua">{{getSettingBase.service_telephone}}</p>
                    <p style=" margin-top: 10px; ">交 易 日：08:30 - 18:30</p>
                    <p style=" padding-left: 58px; line-height: 15px;">节 假 日：12:00 - 17:00</p>
                </div>
            </div>
        </div>
      <!-- footer -->
      <div class="company-copyright">
        <div class="wrapper">
          <div class="copyright">
            <div class="top">
              <p>{{getSettingBase.site_icp}}</p>
              <p>{{getSettingBase.site_description}}</p>
            </div>
          </div>
            <a href="">
                <img height="40px" src="../assets/image/label_sm_90030.png" alt="">
            </a>
            <a href="">
                <img height="40px" src="../assets/image/crz2.png" alt="">
            </a>
            <a href="">
                <img height="40px" src="../assets/image/shiming.png" alt="">
            </a>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(['getSettingBase'])
  },
}
</script>

<style scoped lang="scss">
  .footer-module{
    clear: both;background: #414141;color: #fff;border-top: 1px solid #eee;padding-bottom: 25px;height: 250px;
    .footer-nav{
      width: 1100px;margin: 0 auto;
      .related-link {
        float: left;width: 473px;border-right: 1px solid #323840;box-sizing: border-box;overflow: hidden;margin-top: 36px;
        div{
          float: left;font-size: 14px;text-align: center;color: #888;line-height: 32px;margin-right: 46px;
          .first-row{
            font-size: 18px;color: #fff;
          }
          a{
            color: #ffffff;
          }
        }
      }
      .qr-code-module{
        float: left;width: 177px;padding-left: 23px;border-right: 1px solid #323840;box-sizing: border-box;overflow: hidden;margin-top: 36px;
        .qr-code-item{
          float: left;
          p{
            font-size: 14px;line-height: 33px;color: #fff;text-align: center;
            img{
              margin: 0px;width: 150px;height: 150px;float: none;
            }
          }
        }
      }
      .service-num-module{
        float: right;text-align: right;width: 270px;margin-top: 36px;line-height: 20px;font-size: 14px;color: #fff;
        h2{
          span{
            font-family: simsun;
          }
        }
        .dianhua{
          font-size: 29px;color: #ff7300;padding: 20px 0;font-weight: bold;
        }
      }
    }
  }
  .company-copyright{
    width: 100%;background: #555555;line-height: 28px;font-size: 12px;color: #9c9c9c;text-align: center;height: 155px;
    .copyright{
      width: 100%;float: left;line-height: 30px;font-size: 14px;color: #fff;border-top: 1px solid #323840;padding: 17px 0;
    }
  }
</style>
