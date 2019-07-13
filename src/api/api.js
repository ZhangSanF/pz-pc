import axios from "./axios";
import * as urls from "./apiUrl";

// 注册
export function register(params) {
    if(!params && params !== Object ) return false
    return axios.put(urls.registerApi(), params);
}

// 登录
export function login(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.loginApi(), params);
}

// 是否登录
export function isLogin() {
    return axios.get(urls.isLoginApi());
}

// 获取验证码
export function getVerify(params) {
    if(!params && params !== Object ) return false
    return axios.get(urls.getVerifyApi(), params);
}

// 退出登录
export function logout() {
    return axios.get(urls.logoutApi());
}

// 广告
export function getAdvertisement(params) {
    let param = Object.assign({}, {
        category_identification: params.category_identification || '',
    });
    return axios.get(urls.advertisementApi(), param);
}

// 系统配置
export function getSetting() {
    return axios.get(urls.settingApi());
}

// 文章列表 
export function getArticles(params) {
    let param = Object.assign({}, {
        category_identification: params.category_identification || '',
    });
    return axios.get(urls.articlesApi(), param);
}


// 文章详情
export function readArticles(params) {
    if(!params && params !== Object ) return false
    return axios.get(urls.readArticlesApi(), params)
}

// 个人信息
export function getModifybasicdata(params) {
    let param = Object.assign({}, {
        gender: params.gender,
        education: params.education,
        province: params.province,
        city: params.city,
        area: params.area,
        address: params.address,
        marital_status: params.marital_status,
        working_company: params.working_company,
        job: params.job,
        monthly_income: params.monthly_income,
        emergency_name: params.emergency_name,
        emergency_mobile: params.emergency_mobile,
        emergency_relationship: params.emergency_relationship,
    });
    return axios.post(urls.modifybasicdataApi(), param);
}

// 获取所有支付信息
export function paymentinfo() {
    return axios.get(urls.paymentinfoApi());
}

// 支付、充值请求接口
export function depositwithdrawplatform(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.depositwithdrawplatformApi(), params);
}

/*
 * 个人中心
*/
//验证密保

export function verifyProtection(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.verifyProtectionApi(params));
}

//初始化密保

export function initProtection(params) {
    if(!params && params !== Object ) return false
    return axios.put(urls.initProtectionApi(),params);
}

//更换密保

export function changeProtection() {
    return axios.get(urls.changeProtectionApi());
}

//修改支付密码

export function changePayPassword(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.changePayPasswordApi(),params);
}

//修改登录密码

export function changeLoginPassword(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.changeLoginPasswordApi(),params);
}

//实名认证

export function realNameAuth(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.realNameAuthApi(),params);
}

//上传头像

export function portraitUpload(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.portraitUploadApi(),params);
}