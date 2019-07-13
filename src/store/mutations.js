import * as types from './mutationsTypes'

const mutations = {
    // 是否登录
    [types.IS_LOGIN](state, data) {
        state.isLogin = data
    },
    
    // 个人信息
    [types.SAVE_USER_INFO](state, obj) {
        // state.userInfo = data
        Object.assign(state.userInfo, obj)
    },

    // 首页轮播图
    [types.PC_INDEX_CAROUSEL](state, data) {
        state.pcIndexCarousel = data
    },

    // 股市行情
    [types.STOCK_INFO](state, data) {
        state.stockInfo = data
    },
    // 配资百科
    [types.ENCY_CLOPEDIAS](state, data) {
        state.encyclopedias = data
    },
    // 网站公告
    [types.ANNOUNCEMENT](state, data) {
        state.announcement = data
    },
    // 关于我们
    [types.ABOUT_US](state, data) {
        state.aboutUs = data
    },
    // 帮助中心
    [types.HELP_CENTER](state, data) {
        state.helpCenter = data
    },

     // 查看文章
    [types.ABOUT_US_READ](state, data) {
        state.aboutUsRead = data.info
    },
    // 合作伙伴
    [types.COOPERATION](state, data) {
        state.cooperation = data
    },

    // 充值
    [types.PAY_DATA](state, data) {
        state.payData = data
    },

    // 系统配置
    [types.SETTING_BASE](state, data) {
        state.settingBase = data
    },
    [types.SETTING_ORDER](state, data) {
        state.settingOrder = data
    },
    [types.SETTING_FREE](state, data) {
        state.settingFree = data
    },
    [types.SETTING_DAYS](state, data) {
        state.settingDays = data
    },
    [types.SETTING_MONTHS](state, data) {
        state.settingMonths = data
    },
    [types.SETTING_VIP](state, data) {
        state.settingVip = data
    },
    //实名认证
    [types.REAL_NAME](state, data) {
        state.userInfo.is_real_name= data
    },

    //支付密码
    [types.PAY_PASS](state, data) {
        state.userInfo.is_pay_password= data
    },

    //初始化密保
    [types.PROTECT](state, data) {
        state.userInfo.is_protect= data
    },


};

export default mutations;
