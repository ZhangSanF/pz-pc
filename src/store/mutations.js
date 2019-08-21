import * as types from './mutationsTypes'

const mutations = {
    // 是否登录
    [types.IS_LOGIN](state, data) {
        state.isLogin = data
    },
    
    // 个人信息
    [types.SAVE_USER_INFO](state, obj) {
        state.userInfo = obj
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

    // 合作伙伴
    [types.COOPERATION](state, data) {
        state.cooperation = data
    },

    // 底部行业认证
    [types.INDUSTRY_CERTIFICATION](state, data) {
        state.industryCertification = data
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
        state.userInfo.is_real_name= data.is_real_name
        state.userInfo.real_name= data.real_name
        state.userInfo.identity_number= data.identity_number
    },

    //支付密码
    [types.PAY_PASS](state, data) {
        state.userInfo.is_pay_password= data.is_pay_password
    },

    //初始化密保
    [types.PROTECT](state, data) {
        state.userInfo.is_protect = data.is_protect
        state.userInfo.password_protection = data.password_protection
    },

    //新手任务
    [types.XSRW_DATA](state, data) {
        state.xsrwData = data
    },

    //签到
    [types.SIGN](state, data) {
        state.userInfo.is_sign_in = data
    },

    //上传图片
    [types.PORTRAIT](state, data) {
        state.userInfo.portrait = data
    },

    //获取银行卡列表
    [types.BANK_LIST](state, data) {
        state.bankList = data
    },

    //添加银行卡
    [types.ADD_BANK](state, data) {
        state.userInfo.bank_card_number = data.bank_card_number
        state.userInfo.bank_name = data.bank_name
    },

    //关于我们参数
    [types.ABOUT_QUERY](state, obj) {
        state.aboutQuery = obj
    },

    //网站公告&&配资百科&&股市行情参数
    [types.ARTICLE_QUERY](state, obj) {
        state.articleQuery = obj
    },

    //配资单列表
    [types.ORDER_LIST](state, data) {
        state.orderList = data
    },

    //修改手机号
    [types.SET_MOBILE](state, data) {
        state.userInfo.mobile = data
    },

    //手机号
    [types.USER_PHONE](state, data) {
        state.userPhone = data
    },

};

export default mutations;
