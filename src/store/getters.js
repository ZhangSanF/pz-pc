import {compare} from '../js/utils'

//是否登录
export const getIsLogin = state => state.isLogin

// 个人信息
export const getUserInfo = state =>  state.userInfo?state.userInfo:null

//首页轮播图
export const getPcIndexCarousel = state => state.pcIndexCarousel

//股市行情
export const getStockInfo = state => state.stockInfo
//配资百科
export const getEncyclopedias = state =>  state.encyclopedias
//网站公告
export const getAnnouncement = state =>  state.announcement
//关于我们
export const getAboutUs = state =>  state.aboutUs
//帮助中心
export const getHelpCenter = state =>  state.helpCenter

// 合作伙伴
export const getCooperation = state => state.cooperation

// 底部行业认证
export const getIndustryCertification = state => state.industryCertification

// 充值
export const getPayData = state => state.payData

// 系统配置
export const getSettingBase = state =>  state.settingBase
export const getSettingOrder = state =>  state.settingOrder
export const getSettingFree = state =>  state.settingFree
export const getSettingDays = state =>  state.settingDays
export const getSettingMonths = state =>  state.settingMonths
export const getSettingVip = state =>  state.settingVip

//新手任务
export const getXsrwData = state =>  {
    return state.xsrwData.sort(compare("sort"));
}

//获取银行卡列表
export const getBankList = state =>  state.bankList

//关于我们参数
export const getAboutQuery = state =>  state.aboutQuery

//网站公告&&配资百科&&股市行情参数
export const getArticleQuery = state =>  state.articleQuery

//配资单列表
export const getOrderList = state =>  state.orderList

//手机号
export const getUserPhone = state =>  state.userPhone
