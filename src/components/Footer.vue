<template>
    <div class="footer">
        <!-- footer-module -->
        <div class="footer-module">
            <div class="footer-nav">
                <div class="related-link ">
                    <div>
                        <p class="first-row">关于我们</p>
                        <p>
                          <a href="javascript:void(0);" @click="toAbout('公司简介', '0')">平台简介</a>
                        </p>
                        <p>
                          <a href="javascript:void(0);" @click="toAbout('办公环境', '1')">办公环境</a>
                        </p>
                        <p>
                          <a href="javascript:void(0);" @click="toAbout('联系我们', '6')">联系我们</a>
                        </p>
                        <p>
                          <a href="javascript:void(0);" @click="toAbout('配资细则', '2')">配资细则</a>
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
                          <a href="javascript:void(0);" @click="toAbout('新手指南', '3')">新手指南</a>
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
                          <a href="javascript:void(0);" @click="toAbout('注册协议', '4')">注册协议</a>
                        </p>
                        <p>
                          <router-link to="/user/bangzhu" tag="a">帮助中心</router-link>
                        </p>
                        <!-- <p>
                          <router-link to="/user/tuiguang" tag="a">推广赚钱</router-link>
                        </p> -->
                    </div>
                </div>
                <div class="qr-code-module">
                    <div class="qr-code-item">
                        <p>
                            <img :src="getSettingBase.weixin_service_img" alt="">
                        </p>
                        <p>扫一扫，微信客服</p>
                    </div>
                </div>
                <div class="qr-code-module">
                    <div class="qr-code-item">
                        <p>
                            <img :src="getSettingBase.weixin_public_img" alt="">
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
                    <p style=" margin-top: 10px; ">交 易 日：{{getSettingBase.working_time_trading}}</p>
                    <p style=" padding-left: 58px; line-height: 15px;">节 假 日：{{getSettingBase.working_time_holiday}}</p>
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
            <a :href="item.url" v-for="(item, index) in getIndustryCertification" :key="index" target="_blank">
                <img class="tab-img" :src="item.img" alt="">
            </a>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    toAbout(title, active) {
      this.$router.push('/user/about')
      this.$store.commit('ABOUT_QUERY', {id: '', title: title, active: active})
    }
  },
  computed: {
    ...mapGetters(['getSettingBase', 'getIndustryCertification'])
  },
}
</script>

<style scoped lang="scss">
.tab-img{
  height: 40px;margin-right: 10px;
}
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
