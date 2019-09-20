<template>
  <div class="Lending_Agreement">
      <div class="Lending_Agreement_center" >
            <div class="name_inf">
                <a href="javascript:void(0);" v-print="'#printTest'">【打印合同】</a>
            </div> 
            <div id="printTest">
                <div class="lending_top_inf">
                    <div class="lending_logo">
                        <div class="lenging_left_logo">
                            <img @click="toHome" class="header-logo" :src="getSettingBase.site_logo" alt="">
                        </div>
                    </div>
                </div>
                <div v-html="infoContent"></div>
            </div>
      </div>    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            infoContent: ''
        }
    },
    created() {
        this.contract({order_id: this.$route.params.id}).then(res => {
            if(res.code == 200) {
                this.infoContent = res.data.info
            }
            else{
                // this.$router.push({path: '/user/login', query: {redirect: this.$route.path}})
            }
        })
    },
    methods: {
        ...mapActions(['contract']),
        toHome() {
            this.$router.push('/home')
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters(['getSettingBase'])
    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>
.name_inf{
    position: absolute;right: 10px;top: 60px;
    a{
        font-size: 16px;
        font-weight: bold;
        color: #E67714;
    }
}
.header-logo{
    cursor: pointer;
}
.Lending_Agreement{
    box-sizing: border-box;
    width: 100%;
    height: auto;
    margin: 0px;
    padding: 8px;
    background: #fff;
    .Lending_Agreement_center{
        width: 1024px;
        height: auto;
        margin: 0 auto;
        border: 1px solid #EEEEEE;
        position: relative;
        .lending_top_inf{
            width: 1000px;
            height: auto;
            margin-left: 10px;
            .lending_logo{
                width: 1000px;
                height: 100px;
                line-height: 100px;
                border-bottom: 2px solid #EEEEEE;
                .lenging_left_logo{
                    width: 252px;
                    height: 100px;
                    float: left;
                    border-bottom: 2px solid #00ADEE;
                }
            }
        }
    }
}
</style>