import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import {getSessionStorage} from '@/config/mUtils'
import {  Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }

})
router.beforeEach((to,from,next)=>{
  const a = getSessionStorage('isLogin')
  if(to.meta.auth) { //是否验证
    if(a) { //是否登录
        next()
      } else { //未登录则跳转到登录页面
        Message.error('登录失效请重新登录')
        next({
            name: 'login',
        })
      }
  } else {
      next()
  }
})

export default router