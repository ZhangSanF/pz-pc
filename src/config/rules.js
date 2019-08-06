export const checkRules ={
    //真实姓名
    name :[
        { required: true,
            message: '请输入真实姓名',
            trigger: 'blur',
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
        }
    ],
    //身份证号
    number :[
        { required: true,
            message: '请输入正确身份证号码',
            trigger: 'blur',
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        }
    ],
    //密码
    opwd:[
        {required:true,  message:"请输入密码", trigger:'blur'}
    ],
    npwd:[
        {required:true, message:"请输入密码", trigger:'blur'}
    ],
    cpwd:[
        {required:true, message:"请输入密码", trigger:'blur'}
    ],
    oldPassword:[
        { required: true,
            message: '支付密码6位数',
            trigger: 'blur',
            min: 6,
            max: 6,
        }
    ],
    newPassword:[
        { required: true,
            message: '支付密码6位数',
            trigger: 'blur',
            min: 6,
            max: 6,
        }
    ],
    confirmNewPassword:[
        { required: true,
            message: '支付密码6位数',
            trigger: 'blur',
            min: 6,
            max: 6,
        }
    ],
    //问题一
    keyOne:[
        {   required: true,
            message: '请选择问题一',
            trigger: 'change',
        },
    ],
    //答案一
    valueOne:[
        { required: true, message: '请输入答案一', trigger: 'blur' },
    ],
    //问题二
    keyTwo:[
        { required: true, message: '请选择问题二', trigger: 'change' },
    ],
    //答案二
    valueTwo:[
        { required: true, message: '请输入答案二', trigger: 'blur' },
    ]
}
