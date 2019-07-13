import * as types from './mutationsTypes';
import * as api from '@/api/api'
import Vue from "vue";
import {setSessionStorage, removeSession} from '../config/mUtils'
import router from '../router'

//注册
export const register = ({commit, state},params) =>{
    return api.register(params).then(res=>{ 
        if( res.code == 200) {
            const login  = {
                username: params.username,
                password: params.password
            }
            api.login(login).then(res=>{
                if( res.code == 200){
                    commit(types.SAVE_USER_INFO, res.data)
                    setSessionStorage('isLogin','1')
                    commit(types.IS_LOGIN, true)
                    router.push({path:'/member'})
                }
            })
        }
    })
}

//登录
export const login = ({commit, state},params) =>{
    return api.login(params).then(res=>{
        if( res.code == 200){
            commit(types.SAVE_USER_INFO, res.data)
            setSessionStorage('isLogin','1')
            commit(types.IS_LOGIN, true)
            router.push({path:'/member'})
        }
    })
}

//是否登录
export const isLogin = ({commit, state}) =>{
    return api.isLogin().then(res=>{
        if( res.code == 200){
            commit(types.IS_LOGIN, res.data.info)
            if(res.data.info == false) {
                router.push({path:'/'})
            }else if(res.data.info == true) {
                setSessionStorage('isLogin','1')
            }
        }
    })
}

// 获取验证码
export const getVerify = ({commit, state},params) =>{
    return api.getVerify(params)
}

//退出登录
export const logout = ({commit, state}) =>{
    return api.logout().then(res=>{
        if(res.code == 200){
            removeSession('isLogin')
            window.sessionStorage.removeItem('store');
            commit(types.IS_LOGIN, false)
            router.push('/')
        }
    })
}

//广告
export const getAdvertisement = ({commit, state},params) =>{
    return api.getAdvertisement(params).then(res=>{
        if( res.code == 200){
            // 轮播
            commit(types.PC_INDEX_CAROUSEL, res.data.pc_index_carousel)
            // 合作伙伴
            commit(types.COOPERATION, res.data.cooperation)
        }
    })
}

//系统配置
export const setting = ({commit, state}) =>{
    return api.getSetting().then(res=>{
        if( res.code == 200){
            document.title = res.data.base.site_name;
            document.querySelector('#favicon').setAttribute('href',res.data.base.site_favicon);
            commit(types.SETTING_BASE, res.data.base) // base
            commit(types.SETTING_ORDER, res.data.order) // order
            commit(types.SETTING_FREE, res.data.free) // free
            commit(types.SETTING_DAYS, res.data.days) // days
            commit(types.SETTING_MONTHS, res.data.months) // months
            commit(types.SETTING_VIP, res.data.vip) // vip
        }
    })
}

// 文章列表
export const getAboutUsList = ({commit, state},params) =>{
     api.getArticles(params).then(res=>{
        if( res.code == 200) { 
            if(params.category_identification == 'announcement') { // 网站公告
                commit(types.ANNOUNCEMENT, res.data)
            }else if(params.category_identification == 'stock_market') { // 股市行情
                commit(types.STOCK_INFO, res.data)
            }else if(params.category_identification == 'encyclopedias') { // 配资百科
                commit(types.ENCY_CLOPEDIAS, res.data)
            }else if(params.category_identification == 'about_us') { // 关于我们
                commit(types.ABOUT_US, res.data)
            }else { // 帮助中心
                commit(types.HELP_CENTER, res.data)
            }
        }
    })
}

//文章详情
export const getReadArticles =  ({commit, state},params) =>{
    return api.readArticles(params)
}

// 修改个人信息
export const getModifybasicdata =  ({commit, state},params) =>{
    api.getModifybasicdata(params).then(res=>{
        if( res.code == 200){
            Object.assign(state.userInfo,params)
            // 
            // router.push('/member/userInfo')
        }      
    })
}

//获取所有支付信息
export const paymentinfo = ({commit, state}) =>{
    return api.paymentinfo().then(res=>{
        if(res.code == 200){
            commit(types.PAY_DATA, res.data)
        }       
    })
}


//初始化密保
export const initProtection = ({commit, state},params) =>{
    return api.initProtection(params.data).then(res=>{
        console.log(res);
        if(res.code == 200){
            commit(types.PROTECT, true)
            router.push('/member/safeSetting')
        }
    })
}


//实名认证
export const realNameAuth = ({commit, state},params) =>{
    return api.realNameAuth(params).then(res=>{
        if(res.code == 200){
            commit(types.REAL_NAME, true)
            router.push('/member/safeSetting')
        }
    })
}
//支付、充值请求接口
export const depositwithdrawplatform = ({commit, state},params) =>{
    return api.depositwithdrawplatform(params).then(res=>{
        if(res.code == 200){
            console.log(res.data)
        }       
    })
}


//设置支付密码
export const setPayPassWord = ({commit, state},params) =>{
    return api.changePayPassword(params).then(res=>{
        if(res.code == 200){
            // commit(types.PAY_PASS, true)
            commit(types.SAVE_USER_INFO, {is_pay_password: true})
            // router.push('/member/safeSetting')
        }
    })
}


//设置登录密码
export const setLoginPassWord = ({commit, state},params) =>{
    return api.changeLoginPassword(params).then(res=>{
        if(res.code == 200){
            console.log(res.data)
            router.push('/member/safeSetting')
        }
    })
}


//验证密保
export const verifyProtection = ({commit, state},params) =>{
    return api.verifyProtection(params).then(res=>{
        console.log(res);
        if(res.code == 200){
            console.log(1);
        }
    })
}

//上传头像
export const portraitUpload = ({commit, state},params) =>{
    return api.portraitUpload(params).then(res=>{
        if(res.code == 200){
        }
    })
}