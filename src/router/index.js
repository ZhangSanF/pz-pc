import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// router.beforeEach((to, from, next) => {
//   // 是否显示初始化手机号
//   if(to.meta.showInitMobile) {
//     setTimeout(() => {
//       if(store.state.userInfo.mobile == '' || store.state.userInfo.mobile == undefined) {
//         store.commit('INIT_MOBILE', true)
//       }
//     },20)
//     next()
//   }
//   next()
// })

// router.beforeEach((to,from,next)=>{
//   if(to.meta.auth) { //是否验证
//     //是否登录
//     // if(store.state.isLogin != '') {
//       // console.log('1')
//       if(store.state.isLogin) {
//         next()
//       }else {//未登录则跳转到登录页面
//         Message.error('登录失效请重新登录')
//         next({
//           path: '/user/login',
//           query: {redirect: to.path}
//         })
//       }
//       // next()
//     // }   
//   } else {
//       next()
//   }
// })
export default router