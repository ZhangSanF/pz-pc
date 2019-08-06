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
export function getVerify() {
    return axios.imgGet(urls.getVerifyApi());
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

// 修改个人信息
export function getModifybasicdata(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.modifybasicdataApi(), params);
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
    if(!params && params !== Object ) return false
    return axios.post(urls.changeProtectionApi());
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

//新手任务
export function noviceTask() {
    return axios.get(urls.noviceTaskApi());
}

//站内信(列表)
export function internalMessage(params) {
    if(!params && params !== Object ) return false
    return axios.get(urls.internalMessageApi(),params);
}

//站内信(设置已读)
export function internalMessageStatus(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.internalMessageStatusApi(),params);
}

//绑定银行卡
export function bindBankCard(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.bindBankCardApi(),params);
}

//签到
export function signin() {
    return axios.put(urls.signinApi());
}

//获取银行卡列表
export function bankList() {
    return axios.get(urls.bankListApi());
}

//配资单申请
export function addOrder(params) {
    if(!params && params !== Object ) return false
    return axios.put(urls.addOrderApi(),params);
}

//获取个人信息
export function getMemberinfo() {
    return axios.get(urls.getMemberinfoApi());
}

//配资单列表
export function getOrder(params) {
    if(!params && params !== Object ) return false
    return axios.get(urls.getOrderApi(),params);
}

//配资单修改
export function getModifyorderr(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.modifyorderApi(),params);
}

//交易记录
export function transacTionrecord(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.transacTionrecordApi(),params);
}

//提现记录
export function withdrawalrecord(params) {
    if(!params && params !== Object ) return false
    return axios.post(urls.withdrawalrecordApi(),params);
}