let regexs = {
    // 匹配 max_length(12) => ["max_length",12]
    rule: /^(.+?)\((.+)\)$/,
    numericRegex: /^[0-9]+$/,
    email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
    fax: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    phone: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[03678]|18[0-9])\d{8}$/,
    url: /[a-zA-z]+:\/\/[^\s]/,
    money: /^(0|[1-9]\d*)(\.\d+)?$/,
    english: /^[A-Za-z]+$/,
    chinese: /^[\u0391-\uFFE5]+$/,
    percent: /^(?:[1-9][0-9]?|100)(?:\.[0-9]{1,2})?$/,
    name:/^[a-zA-Z][a-zA-Z0-9]*$/,
    pass:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/,
    verifi:/^[0-9]{4,4}$/,
    smsCode:/^[0-9]{6,6}$/
}
let _testHook = {
    // 验证合法邮箱
    is_email: function(field) {
        return regexs.email.test(field);
    },
    // 验证合法 ip 地址
    is_ip: function(field) {
        return regexs.ip.test(field);
    },
    //验证合法账号
    is_name: function(field) {
        return regexs.name.test(field);  
    },
    //验证密码
    is_pass: function(field) {
        return regexs.pass.test(field);  
    },
    //验证4位验证码
    is_verifi: function(field) {
        return regexs.verifi.test(field);  
    },
    //验证6位短信验证码

    is_smsCode: function(field) {
        return regexs.smsCode.test(field);  
    },
    // 验证传真
    is_fax: function(field) {
        return regexs.fax.test(field);
    },
    // 验证座机
    is_tel: function(field) {
        return regexs.fax.test(field);
    },
    // 验证手机
    is_phone: function(field) {
        return regexs.phone.test(field);
    },
    // 验证URL
    is_url: function(field) {
        return regexs.url.test(field);
    },
    is_money: function(field) {
        return regexs.money.test(field);
    },
    is_english: function(field) {
        return regexs.english.test(field);
    },
    is_chinese: function(field) {
        return regexs.chinese.test(field);
    },
    is_percent: function(field) {
        return regexs.percent.test(field);
    },
    // 是否为必填
    required: function(field) {
        var value = field;
        if (field.type === "checkbox" || field.type === "radio") {
            return field.checked === true;
        }
        return value !== null && value !== "";
    },
    // 最大长度
    max_length: function(field, length) {
        if (!regexs.numericRegex.test(length)) return false;
        return field.length <= parseInt(length, 10);
    },
    // 最小长度
    min_length: function(field, length) {
        if (!regexs.numericRegex.test(length)) return false;
        return field.length >= parseInt(length, 10);
    },
    // 指定字段内容是否相同
    same: function(field, newField) {
        var value1 = field;
        var value2 = this.fields[newField].element;
        return value1 == value2;
    },
    // 拒绝与某个字段相等,比如登录密码与交易密码情况
    different: function(field, newField) {
        return !this.same(field, newField);
    },
    // 直接判断字符串是否相等
    contains: function(field, value) {
        var value1 = field;
        return value1 == value;
    },
    // 用于服务条款,是否同意时相当有用,不限制checkbox与radio,有可能submit button直接附带value情况
    accepted: function(field) {
        var value = field;
        return "YES" == value.toUpperCase() || "ON" == value.toUpperCase() || 1 == value || false == value ? true : false;
    }
}
//验证手机号
export function isPhone(rule, value, callback) {
    if (!value) {
        return callback(new Error('手机号不可以为空'));
    }
    if(_testHook.is_phone(value)){
        return callback()
    }
    return callback(new Error('输入的手机号错误'))
}

//验证注册账号
export function isName(rule, value, callback) {
    if (!value) {
        return callback(new Error('账号不可以为空'));
    }
    if(_testHook.is_name(value)){
        return callback()
    }
    return callback(new Error('开头为字母!只能是数字和字母组合'))
}

//验证密码
export function isPass(rule, value, callback) {
    if (!value) {
        return callback(new Error('密码不可以为空'));
    }
    if(_testHook.is_pass(value)){
        return callback()
    }
    return callback(new Error('6-21字母和数字组成，不能是纯数字或纯英文'))
}

//验证重复密码
export function isSamePass(rule, value, callback) {
    if (!value) {
        return callback(new Error('重复密码不可以为空'));
    }
    if(_testHook.same(value,newField)){
        return callback()
    }
    return callback(new Error('两次输入密码不一致'))
}

//验证验证码
export function isVerifi(rule, value, callback) {
    if (!value) {
        return callback(new Error('验证码不可以为空'));
    }
    if(_testHook.is_verifi(value)){
        return callback()
    }
    return callback(new Error('验证码4位数字'))
}

//验证短信验证码
export function isSmsCode(rule, value, callback) {
    if (!value) {
        return callback(new Error('短信验证码不可以为空'));
    }
    if(_testHook.is_smsCode(value)){
        return callback()
    }
    return callback(new Error('验证码6位数字'))
}

