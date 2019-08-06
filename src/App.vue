<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  created () {
    //在页面加载时读取localStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })

    this.getAdvertisement({})
    this.getAboutUsListFun('announcement')
    this.getAboutUsListFun('stock_market')
    this.getAboutUsListFun('encyclopedias')
  },
  methods: {
    ...mapActions(['getAdvertisement', 'getAboutUsList']),
    // 刷新
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    getAboutUsListFun(category_identification) {
      this.getAboutUsList({
        page: 1,
        page_size: 20,
        category_identification: category_identification
      })
    },
  }
}
</script>

<style lang="scss">
@font-face {
    font-family: 'password';
    src: url(./assets/font/password.ttf);
}
.password-font{    
    .el-input__inner,.input-text-style {
        font-family: 'password';
    }
}
</style>

