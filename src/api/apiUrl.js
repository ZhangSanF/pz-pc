//注册
export function registerApi(){
    return {
        url: '/index/account/register'
    }
}

//登录
export function loginApi(){
    return {
        url: '/index/account/login'
    }
}

//是否登录
export function isLoginApi(){
    return {
        url: '/index/account/islogin'
    }
}

//验证码
export function getVerifyApi(){
    return {
        url: '/index/account/verify'
    }
}

//退出登录
export function logoutApi(){
    return {
        url: '/index/member/logout'
    }
}

// 广告
export function advertisementApi(){
    return {
        url: '/index/advertisement/index'
    }
}
// 系统配置
export function settingApi(){
    return {
        url: '/index/index/setting'
    }
}

// 文章列表 category_identification {announcement ：网站公告} {about_us 关于我们} {help_center ：帮助中心} {encyclopedias： 配资百科} {stock_market ： 股市行情} 
export function articlesApi(){
    return {
        url: '/index/articles/index'
    }
}

// 文章内页
export function readArticlesApi(){
    return {
        url: '/index/articles/read'
    }
}

// 个人信息
export function modifybasicdataApi(){
    return {
        url: '/index/member/modifybasicdata'
    }
}

// 获取所有支付信息
export function paymentinfoApi(){
    return {
        url: '/index/allpayment/getpaymentinfo'
    }
}
// 支付、充值请求接口
export function depositwithdrawplatformApi(){
    return {
        url: '/index/allpayment/depositwithdrawplatform'
    }
}
/*
 * 个人中心
*/
//验证密保
export function verifyProtectionApi(){
    return {
        url: '/index/member/verifyprotection'
    }
}

//初始化密保

export function initProtectionApi(){
    return {
        url: '/index/member/initprotection'
    }
}

//更换密保

export function changeProtectionApi(){
    return {
        url: '/index/member/changeprotection'
    }
}

//修改支付密码

export function changePayPasswordApi(){
    return {
        url: '/index/member/changepaypassword'
    }
}

//修改登录密码

export function changeLoginPasswordApi(){
    return {
        url: '/index/member/changeloginpassword'
    }
}

//实名认证

export function realNameAuthApi(){
    return {
        url: '/index/member/realnameauth'
    }
}


//上传头像

export function portraitUploadApi(){
    return {
        url: '/index/member/portraitupload'
    }
}