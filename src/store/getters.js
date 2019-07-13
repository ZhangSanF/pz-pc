//是否登录
export const getIsLogin = (state) => {return state.isLogin}

export const getVerify = (state) => {return state.verify?state.verify:null}

// 个人信息
export const getUserInfo = (state) => {
    console.log(state.userInfo)
    return state.userInfo?state.userInfo:null}

//首页轮播图
export const getPcIndexCarousel = (state) => {return state.pcIndexCarousel}

//股市行情
export const getStockInfo = state => {return state.stockInfo}
//配资百科
export const getEncyclopedias = state => {return state.encyclopedias}
//网站公告
export const getAnnouncement = state => {return state.announcement}
//关于我们
export const getAboutUs = state => {return state.aboutUs}
//帮助中心
export const getHelpCenter = state => {return state.helpCenter}

//关于我们
export const getAboutUsRead = state => {return state.aboutUsRead}
// 合作伙伴
export const getCooperation = state => {return state.cooperation}

//安全设置
export const getSafeData = state => {
    let data = []
    const a = {
        lable:'用户名',
        value: state.userInfo.username,
        showEdit: false,
    }
    const b = {
        lable:'手机认证',
        value: state.userInfo.mobile,
        showEdit: false,
    } 
    const c = {
        lable:'实名认证',
        value: state.userInfo.is_real_name?'已设置':'未设置' ,
        showEdit: false,
    } 
    const d = {
        lable:'登录密码',
        value: '已设置',
        showEdit: false,
    }
    const e = {
        lable:'支付密码',
        value: state.userInfo.is_pay_password ?'已设置':'未设置',
        showEdit: false,
    }
    const f = {
        lable:'密码保护',
        value: state.userInfo.is_protect ?'已设置':'未设置',
        showEdit: false,
    } 
    data.push(a)
    data.push(b)
    data.push(c)
    data.push(d)
    data.push(e)
    data.push(f)
    return data
}

// 充值
export const getPayData = (state) => {return state.payData}

// 系统配置
export const getSettingBase = (state) => {return state.settingBase}
export const getSettingOrder = (state) => {return state.settingOrder}
export const getSettingFree = (state) => {return state.settingFree}
export const getSettingDays = (state) => {return state.settingDays}
export const getSettingMonths = (state) => {return state.settingMonths}
export const getSettingVip = (state) => {return state.settingVip}

// 密保问题
export const getSafeProtection = state => {return state.userInfo.password_protection}


