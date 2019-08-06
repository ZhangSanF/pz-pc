
const state = {
    isLogin: JSON.parse(sessionStorage.getItem("store")) == null ? '' : JSON.parse(sessionStorage.getItem("store")).isLogin,//是否登录
    userInfo: {},//个人信息
    pcIndexCarousel: [],//首页轮播图
    stockInfo: [],//股市行情
    encyclopedias: [],//配资百科
    announcement: [],//网站公告
    aboutUs: [],//关于我们
    helpCenter: [],//帮助中心
    cooperation: [],//合作伙伴
    payData:{},//充值
    settingBase:{},//系统配置
    settingOrder:{},//系统配置
    settingFree:{},//系统配置
    settingDays:{},//系统配置
    settingMonths:{},//系统配置
    settingVip:{},//系统配置
    xsrwData:[],//新手任务
    bankList: {},//获取银行卡列表
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
};

export default state;
