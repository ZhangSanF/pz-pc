import * as types from './mutationsTypes';
import * as api from '@/api/api'
import router from '../router'
import {  Message } from 'element-ui'

//注册
export const register = ({commit, state, dispatch},params) =>{
    return api.register(params).then(res=>{ 
        if( res.code == 200) {
            const login  = {
                username: params.username,
                password: params.password
            }
            api.login(login).then(res=>{
                if(res.code == 200){
                    dispatch('getMemberinfo')
                    commit(types.IS_LOGIN, true)
                    router.push({path:'/member'})
                }
            })
        }else {
            Message.error(res.message)
        }
    })
}

//登录
export const login = ({commit, state, dispatch},params) =>{
    return api.login(params)
}

//是否登录
export const isLogin = ({commit, state, dispatch}) =>{
    return api.isLogin().then(res=>{
        if( res.code == 200){
            commit(types.IS_LOGIN, res.data.info)
            if(res.data.info == true) {
                // 获取个人信息
                dispatch('getMemberinfo')
            }
        }
    })
}

// 获取验证码
export const getVerify = ({commit, state}) =>{
    return api.getVerify()
}

//退出登录
export const logout = ({commit, state}) =>{
    return api.logout().then(res=>{
        if(res.code == 200){
            router.push('/')
            commit(types.IS_LOGIN, false)         
        }
    })
}

//广告
export const getAdvertisement = ({commit, state},params) =>{
    return api.getAdvertisement(params).then(res=>{
        if( res.code == 200){
            commit(types.PC_INDEX_CAROUSEL, res.data.pc_index_carousel)// 轮播
            commit(types.COOPERATION, res.data.cooperation)// 合作伙伴
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
    return api.getModifybasicdata(params)
}

//获取所有支付信息
export const paymentinfo = ({commit, state}) =>{
    return api.paymentinfo().then(res=>{
        if(res.code == 200){
            commit(types.PAY_DATA, res.data)
        }       
    })
}

//支付、充值请求接口
export const depositwithdrawplatform = ({commit, state},params) =>{
    return api.depositwithdrawplatform(params)
}

//初始化密保
export const initProtection = ({commit, state},params) =>{
    return api.initProtection(params.data).then(res=>{
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
            commit(types.REAL_NAME, {is_real_name: true, real_name: params.real_name, identity_number: params.identity_number})
        }
    })
}

//设置支付密码
export const setPayPassWord = ({commit, state},params) =>{
    return api.changePayPassword(params).then(res=>{
        if(res.code == 200){
            commit(types.PAY_PASS, {is_pay_password: true})
        }
    })
}


//设置登录密码
export const setLoginPassWord = ({commit, state},params) =>{
    return api.changeLoginPassword(params)
}


//验证密保
export const verifyProtection = ({commit, state},params) =>{
    return api.verifyProtection(params).then(res=>{
        if(res.code == 200){
            
        }
    })
}

//上传头像
export const portraitUpload = ({commit, state},params) =>{
    return api.portraitUpload(params)
}

//新手任务
export const noviceTask = ({commit, state}) =>{
    return api.noviceTask().then(res=>{
        if(res.code == 200){
            commit(types.XSRW_DATA, res.data)
        }
    })
}

//站内信(列表)
export const internalMessage = ({commit, state},params) =>{
    return api.internalMessage(params)
}

//站内信(设置已读)
export const internalMessageStatus = ({commit, state},params) =>{
    return api.internalMessageStatus(params)
}

//绑定银行卡
export const bindBankCard = ({commit, state},params) =>{
    return api.bindBankCard(params)
}

//签到
export const signin = ({commit, state}) =>{
    return api.signin()
}

//获取银行卡列表
export const bankList = ({commit, state}) =>{
    return api.bankList().then(res=>{
        if(res.code == 200){
            commit(types.BANK_LIST, res.data)
        }
    })
}

//配资单申请
export const addOrder = ({commit, state},params) =>{
    return api.addOrder(params).then(res=>{
        if(res.code == 200){
            router.push('/member/myAccount')
        }
    })
}

//获取个人信息
export const getMemberinfo = ({commit, state}) =>{
    return api.getMemberinfo().then(res=>{
        if(res.code == 200){
            commit(types.SAVE_USER_INFO, res.data)
        }
    })
}

//配资单列表
export const getOrder = ({commit, state},params) =>{
    return api.getOrder(params).then(res=>{
        if(res.code == 200){
            commit(types.ORDER_LIST, res.data)
        }
    })
}

//配资单修改
export const getModifyorderr = ({commit, state},params) =>{
    return api.getModifyorderr(params)
}

//交易记录
export const transacTionrecord = ({commit, state},params) =>{
    return api.transacTionrecord(params)
}

//提现记录
export const withdrawalrecord = ({commit, state},params) =>{
    return api.withdrawalrecord(params)
}