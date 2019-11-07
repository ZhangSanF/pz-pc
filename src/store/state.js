
const state = {
    isLogin: JSON.parse(sessionStorage.getItem("store")) == null ? '' : JSON.parse(sessionStorage.getItem("store")).isLogin,//是否登录
    depositList:[],//首页今日充值
    userInfo: {},//个人信息
    isShowPhone: false,//是否显示初始化手机
    pcIndexCarousel: [],//首页轮播图
    stockInfo: [],//股市行情
    encyclopedias: [],//配资百科
    announcement: [],//网站公告
    aboutUs: [],//关于我们
    helpCenter: [],//帮助中心
    cooperation: [],//合作伙伴
    industryCertification: [],//底部行业认证
    payData:{},//充值
    settingBase:{},//系统配置
    settingSys:{},
    settingStock:{},//系统配置
    settingOrder:{},//系统配置
    settingFree:{},//系统配置
    settingDays:{},//系统配置
    settingMonths:{},//系统配置
    settingVip:{},//系统配置
    xsrwData:[],//新手任务
    bankList: {},//获取银行卡列表
    bangzhuQuery: {//帮助中心参数
        id: '',
        title: ''
    },
    aboutQuery: {//关于我们参数
        id: '',
        title: '',
        active: ''
    },
    articleQuery: {//网站公告&&配资百科&&股市行情参数
        id: '',
        title: '',
        active: '',
        showList: ''
    },
    orderList:[],//配资单列表
    userFind: {},//手机号码&用户名&id&密保
    loansrate: {},//利率/倍数
    periodNumber: '',//剩余期数(扩大配资，时使用)
    interestMoney: '',//延期利息(终止操盘，时使用)
};

export default state;
