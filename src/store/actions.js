import * as types from './mutationsTypes';
import * as api from '@/api/api'
import router from '../router'
import {  Message } from 'element-ui'

//注册
export const register = ({commit, state},params) =>{
    return api.register(params)
}

//登录
export const login = ({commit, state},params) =>{
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
            commit(types.SAVE_USER_INFO, {})
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
            commit(types.INDUSTRY_CERTIFICATION, res.data.industry_certification)// 底部行业认证
        }
    })
}

//系统配置
export const setting = ({commit, state}) =>{
    return api.getSetting().then(res=>{
        if( res.code == 200){
            // 网站标题
            document.title = res.data.system.base.site_name;
            // 网站favicon
            document.querySelector('#favicon').setAttribute('href',res.data.system.base.site_favicon);
            // 网站关键词
            var metaList = document.getElementsByTagName("meta");
            for (var i = 0; i < metaList.length; i++) {
              if (metaList[i].getAttribute("name") == "keywords") {
                metaList[i].content = res.data.system.base.site_keywords;
              }
            }
            commit(types.SETTING_BASE, res.data.system.base) // base
            commit(types.SETTING_STOCK, res.data.stock)//stock
            commit(types.SETTING_ORDER, res.data.credit.base) // order
            commit(types.SETTING_FREE, res.data.credit.free) // free
            commit(types.SETTING_DAYS, res.data.credit.day) // days
            commit(types.SETTING_MONTHS, res.data.credit.month) // months
            commit(types.SETTING_VIP, res.data.credit.vip) // vip
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
                if(state.aboutQuery.title == '') {
                    commit(types.ABOUT_QUERY, {id: res.data.rows[0].id, title: res.data.rows[0].title, active: '0'})
                }
            }else { // 帮助中心
                commit(types.HELP_CENTER, res.data)
                if(state.bangzhuQuery.title == '') {
                    commit(types.BANGZHU_QUERY, {id: res.data.rows[0].id, title: res.data.rows[0].title})
                }
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
    return api.initProtection(params)
}

//验证密保
export const verifyProtection = ({commit, state},params) =>{
    return api.verifyProtection(params)
}

//更换密保
export const changeProtection = ({commit, state},params) =>{
    return api.changeProtection(params)
}

//实名认证
export const realNameAuth = ({commit, state},params) =>{
    return api.realNameAuth(params)
}

//设置支付密码
export const setPayPassWord = ({commit, state},params) =>{
    return api.changePayPassword(params)
}


//设置登录密码
export const setLoginPassWord = ({commit, state},params) =>{
    return api.changeLoginPassword(params)
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
            Message.success(res.message)
            router.push('/member/myAccount')
        }
    })
}

//获取个人信息
export const getMemberinfo = ({commit, state}) =>{
    return api.getMemberinfo().then(res=>{
        if(res.code == 200){
            commit(types.SAVE_USER_INFO, res.data)
            // 是否初始化手机号码
            if(res.data.mobile == '' || res.data.mobile == undefined) {
                commit(types.INIT_MOBILE, true)
            }else {
                commit(types.INIT_MOBILE, false)
            }
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

//短信验证码(发送)
export const sendSmsCode = ({commit, state},params) =>{
    return api.sendSmsCode(params)
}

//短信验证码(验证)
export const verifySmsCode = ({commit, state},params) =>{
    return api.verifySmsCode(params)
}

//用户是否存在
export const verifyUserName = ({commit, state},params) =>{
    return api.verifyUserName(params)
}

//修改手机号
export const changeMobile = ({commit, state},params) =>{
    return api.changeMobile(params)
}

// 找回支付密码
export const retrievepayPassWord = ({commit, state},params) =>{
    return api.retrievepayPassWord(params)
}

// 找回登陆密码
export const retrievePassword = ({commit, state},params) =>{
    return api.retrievePassword(params)
}

//首页今日充值
export const todayDeposit = ({commit, state}) =>{
    return api.todayDeposit().then(res=>{
        if(res.code == 200){
            commit(types.DEPOSIT_LIST, res.data)
        }
    })
}

// 合同
export const contract = ({commit, state},params) =>{
    return api.contract(params)
}

//利率/倍数
export const loansrate = ({commit, state}) =>{
    return api.loansrate().then(res=>{
        if(res.code == 200){
            commit(types.LOANSRATE_DATA, res.data)
        }
    })
}

// 剩余期数(扩大配资，时使用)
export const remainingPeriod = ({commit, state},params) =>{
    return api.remainingPeriod(params).then(res =>{
        if(res.code == 200) {
            commit(types.PERIOD_NUMBER, res.data.info)
        }
    })
}

// 延期利息(终止操盘，时使用)
export const interestMoneybyend = ({commit, state},params) =>{
    return api.interestMoneybyend(params).then(res =>{
        if(res.code == 200) {
            commit(types.INTEREST_MONEY, res.data)
        }
    })
}

// 初始化手机号码
export const initMobile = ({commit, state},params) =>{
    return api.initMobile(params)
}