<template>
    <div >
        <div class="index" @mouseenter="enter('0')" @mouseleave="leave()">
            <div class=" wrapper-content   safe_top" >
                        <div class="fl"  :style="{ transform: 'translateX('+ transformData[0].left+'px)',transition: '2s'}"  >
                            <div class="grid-content bg-purple left">
                                <h4><span>强</span>实力</h4>
                                <strong>荣获国家批准经营许可证</strong>
                                <p>公司位于广州市南沙区，经广州市政府批准成立并在广州市工商行政管理区，平台已通过安全可信，诚信网站等等，公司统一社会信用代码：91440101MA5CL5LA0E。</p>
                            </div>
                        </div>
                <div  class="safe_img fr " :style="{ transform: 'translateX('+transformData[0].right+'px)',transition: '2s'}" >
                    <img   src="../../assets/image/pic-16.png" alt=""  >
                </div>
            </div>
        </div>
        <div class="index" @mouseenter="enter('1')" @mouseleave="leave()">
            <div class=" wrapper-content   safe_top"  >
                <div class="fl safe_img"  :style="{ transform: 'translateX('+ transformData[1].left+'px)',transition: '2s'}" >
                    <img src="../../assets/image/pic-21.png" alt="">
                </div>
                <div class=" fr" :style="{ transform: 'translateX('+ transformData[1].right+'px)',transition: '2s'}">
                    <div class="grid-content bg-purple left">
                        <h4>有<span>保险</span></h4>
                        <strong>阳光保险100%风险保障</strong>
                        <p>阳光保险承保“信用履约保证保险”。如果被保险人（即平台方）不按照合同约定或法律的规定履行义务，阳光对投资人风险全额保障。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="index" @mouseenter="enter('2')" @mouseleave="leave()">
            <div class=" wrapper-content   safe_top">
                <div class="fl" :style="{ transform: 'translateX('+ transformData[2].left+'px)',transition: '2s'}">
                    <div class="grid-content bg-purple left">
                    <h4><span>技术</span>保障</h4>
                    <strong>专业的技术保障交易安全</strong>
                    <p>强大的技术团队、独立研发系统、科学严格的权限管理及银行级数据灾备系统保障用户信息以及交易信息的绝对安全，为用户资金及个人信息提供360度无死角的安全保障。</p>
                    </div>
                </div>
                <div  class="safe_img fr " :style="{ transform: 'translateX('+transformData[2].right+'px)',transition: '2s'}">
                    <img src="../../assets/image/pic-18.png" alt="">
                </div>
            </div>
        </div>
        <div class="index" @mouseenter="enter('3')" @mouseleave="leave()">
            <div class=" wrapper-content   safe_top">
                <div class="fl " :style="{ transform: 'translateX('+ transformData[3].left+'px)',transition: '2s'}">
                        <img src="../../assets/image/pic-17.jpg" alt="">
                </div>
                <div class="safe_img fr" :style="{ transform: 'translateX('+ transformData[3].right+'px)',transition: '2s'}">
                    <div class="grid-content bg-purple left">
                        <h4><span>风控</span>实力</h4>
                        <strong>科学严密的风控运维体系</strong>
                        <p>采用先进的安全风控体系，由一批业内顶尖的风控专业人员建立并完善了一系列风险控制机制和风险管理制度，确保用户的个人信息、交易信息安全，并及时采取风控措施降低用户交易风险。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="index" @mouseenter="enter('4')" @mouseleave="leave()">
            <div class=" wrapper-content   safe_top">
                <div class="fl" :style="{ transform: 'translateX('+ transformData[4].left+'px)',transition: '2s'}">
                    <div class="grid-content bg-purple left">
                        <h4>资金<span>安全</span></h4>
                        <strong>资金三方存管，专款专用</strong>
                        <p>资金由第三方支付机构存管。所有投资人资金通过支付机构进行托管，专款专用，杜绝资金管理风险；平台用户通过实名认证绑定后无法更改，保证提现资金的安全性，即使密码泄露也不会造成资金被盗取的损失。</p>
                    </div>
                </div>
                <div  class="safe_img  fr" :style="{ transform: 'translateX('+ transformData[4].right+'px)',transition: '2s'}">
                    <img src="../../assets/image/pic-19.png" alt="">
                </div>
            </div>
        </div>
        <div class="index" @mouseenter="enter('5')" @mouseleave="leave()">
            <div class=" wrapper-content   safe_top">
                <div class="fl safe_img" :style="{ transform: 'translateX('+ transformData[5].left+'px)',transition: '2s'}">
                    <img class="w350" src="../../assets/image/xuke.png" alt="">
                </div>
                <div  class="safe_img  fr" :style="{ transform: 'translateX('+ transformData[5].right+'px)',transition: '2s'}">
                    <img  class="w350" src="../../assets/image/zhizh.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
        data(){
            return{
                strengthImg: '../../assets/image/pic-16.png',
                a : false,
               transformData:[
                    {
                        left: 0,
                        right:0,
                    },
                    {
                        left: 0,
                        right:0,
                    },
                    {
                        left: 0,
                        right:0,
                    },
                    {
                        left: 0,
                        right:0,
                    },
                    {
                        left: 0,
                        right:0,
                    },
                    {
                        left: 0,
                        right:0,
                    },
                ],
                
                left: 0,
                right:0,
            }
        },
        methods:{
            enter(type) {
                console.log(type)
                this.transformData[type].left = 150
                this.transformData[type].right = -150
            },
            leave() {
                // this.left =0
                // this.right = 350
            },
        },
}
</script>

<style lang="scss" scoped>  
    .index {
        background: #fff !important;
        border-bottom: 1px solid #f0f0f0  !important;;
    }
    .index:after{
      content: '';
      display: block;
      clear: both;
    }
    .safe_top{
        padding-top: 85px;
        height: 450px;
    }
    .wrapper-content {
        margin-top: 0 !important;
        width: 1200px !important;
        height: 450px;
    }

    .safe_con{
        padding-top: 110px;
        height: 540px;
      
    }

    .grid-content h4 {
        font-size: 60px;
        line-height: 76px;
        color: #4b4b4b;
        text-align: center;
        font-weight: normal;
    }
    .grid-content h4 span {
        color: #f84202;
    }
    .w350 {
        width: 350px
    }
    .grid-content strong {
        font-size: 22px;
        line-height: 50px;
        color: #ff6600;
        font-weight: normal;
        text-align: center;
        display: block;
        padding-bottom: 45px;
    }
    .grid-content p {
        font-size: 16px;
        line-height: 30px;
        color: #787878;
        width: 360px;
    }

    .safe_img {
        
        img {
            vertical-align:middle;
        }
    }
    .content{
        background: #fff !important;
    }
    .safe_bottom{
        margin-bottom: 100px
    }
    // 接着为过渡类名添加规则
    .fade-enter-active 
    .fade-leave-active {
        transform: translateX(100px); /* Equal to translate(10px) */
    }

    .fade-enter .fade-leave-active {
        transform: translateY(70px); /* Equal to translate(10px) */
    }

</style>

