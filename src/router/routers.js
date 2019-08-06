const routes =  [
        {
        path: '/',
        component: () => import ('@/views/index'),
        redirect: '/home',
        children:[
        {
            path: '/home',
            component: () => import ('@/views/secondNav/home'),//网站首页
        },
        {
            path: '/freefee',
            component: () => import ('@/views/secondNav/freefee'),//免息配资
        },
        {
            path: '/dayFinancing',
            component: () => import ('@/views/secondNav/dayFinancing'),//按天配资
        },
        {
            path: '/monthFinancing',
            component: () => import ('@/views/secondNav/monthFinancing'),//按月配资
        },
        {
            path: '/vipFinancing',
            component: () => import ('@/views/secondNav/vipFinancing'),//VIP配资
        },
        {
            path: '/anquan',
            component: () => import ('@/views/secondNav/anquan'),//安全保障
        },
        {
            path: '/xsrw',
            component: () => import ('@/views/secondNav/xsrw'),//新手任务
        },
        {
            path: '/downloaded',
            component: () => import ('@/views/secondNav/downloaded'),//软件下载
        },
        {
            path: '/user/register',
            component: () => import ('@/views/user/register'),//用户注册
        },
        {
            path: '/user/login',
            name:'login',
            component: () => import ('@/views/user/login'),//用户登录
        },
        {
            path: '/user/findPassword',
            component: () => import ('@/views/user/findPassword'),//找回密码
        },
        {
            path: '/user/authentication',
            component: () => import ('@/views/user/authentication'),//验证身份
        },
        {
            path: '/user/about',
            component: () => import ('@/views/user/about'),//关于我们
        },
        {
            path: '/user/article',
            component: () => import ('@/views/user/article'),//文章页面
        },
        {
            path: '/user/bangzhu',
            component: () => import ('@/views/user/bangzhu'),//帮助中心
        },
        {
            path: '/user/tuiguang',
            component: () => import ('@/views/user/tuiguang'),//推广赚钱
        },
        {
            path: '/member',
            component: () => import ('@/views/member'),//个人中心
            redirect: '/member/myAccount',
            meta: {
                auth: true,
                keep: true
            },
            children: [
            {
                path: 'myAccount',
                component: () => import ('@/views/member/myAccount'),//我的账户
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'tradingRecord',
                component: () => import ('@/views/member/tradingRecord'),//交易记录
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'withdrawalRecord',
                component: () => import ('@/views/member/withdrawalRecord'),//提现记录
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'recharge',
                component: () => import ('@/views/member/recharge'),//充值
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'withdrawDeposit',
                component: () => import ('@/views/member/withdrawDeposit'),//提现
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'myFinancing',
                component: () => import ('@/views/member/myFinancing'),//我的配资
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'instation',
                component: () => import ('@/views/member/instation'),//站内信息
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'userInfo',
                component: () => import ('@/views/member/userInfo'),//个人信息
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'bankInfo',
                component: () => import ('@/views/member/bankInfo'),//银行卡信息
                meta: {
                    auth: true,
                    keep: true
                }
            },
            {
                path: 'safeSetting',
                component: () => import ('@/views/member/safeSetting'),//安全设置
                meta: {
                    auth: true,
                    keep: true
                }
            }
            ]
        }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default routes