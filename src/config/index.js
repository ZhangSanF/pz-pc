//验证密保提示问题
export const protectionData = [
    {
        value: '您母亲的姓名是？',
        label: '您母亲的姓名是？',

    },
    {
        value: '您的配偶的生日是？',
        label: '您的配偶的生日是？',

    },
    {
        value: '您最熟悉的学校室友名字是？',
        label: '您最熟悉的学校室友名字是？',

    },
    {
        value: '我的爱好？',
        label:  '我的爱好？',

    },
    {
        value: '我出生的城市是？',
        label: '我出生的城市是？',
        
    },
    {
        value: '你的中学是？',
        label: '你的中学是？',

    },

]

// 免息配资利率
// export const programFree = [
//     {num:5, interestRate: '', total: 0, active: true}
// ]

// // 按天配资利率
// export const programDay = [
//     {
//         num:2,
//         interestRate:0.10,
//         total: 0,
//         active: true
//     },
//         {
//         num:3,
//         interestRate:0.09,
//         total: 0,
//     },
//     {
//         num:4,
//         interestRate:0.09,
//         total: 0,
//     },
//     {
//         num:5,
//         interestRate:0.08,
//         total: 0,
//     },
//     {
//         num:6,
//         interestRate:0.08,
//         total: 0,
//     },
//     {
//         num:7,
//         interestRate:0.07,
//         total: 0,
//     },
//     {
//         num:8,
//         interestRate:0.07,
//         total: 0,
//     },
//     {
//         num:9,
//         interestRate:0.065,
//         total: 0,
//     },
//     {
//         num:10,
//         interestRate:0.06,
//         total: 0,
//     },
// ]

// // 按月配资利率
// export const programMonth = [
//     {
//         num:2,
//         interestRate:1.0,
//         total: 0,
//         active: true
//     },
//         {
//         num:3,
//         interestRate:0.9,
//         total: 0,
//     },
//     {
//         num:4,
//         interestRate:0.9,
//         total: 0,
//     },
//     {
//         num:5,
//         interestRate:0.8,
//         total: 0,
//     },
//     {
//         num:6,
//         interestRate:0.8,
//         total: 0,
//     },
//     {
//         num:7,
//         interestRate:0.7,
//         total: 0,
//     },
//     {
//         num:8,
//         interestRate:0.7,
//         total: 0,
//     },
//     {
//         num:9,
//         interestRate:0.65,
//         total: 0,
//     },
//     {
//         num:10,
//         interestRate:0.6,
//         total: 0,
//     },
// ]

// // VIP配资利率
// export const programVip = [
//     {
//         num:10,
//         interestRate:0.5,
//         total: 0,
//         active: true
//     },
//         {
//         num:11,
//         interestRate:0.5,
//         total: 0,
//     },
//     {
//         num:12,
//         interestRate:0.5,
//         total: 0,
//     }
// ]
 
/**
 * 返回利率
 * @param {配资类型} order_type 
 * @param {杠杆倍数} multiple 
 */
// export const returnRate = (order_type, multiple) => {
//     // order_type   1免息2按天3按月4VIP
//     if(order_type == 2) {// 按天配资利率
//         for(let item of programDay) {
//             if(item.num == multiple) {
//                 return item.interestRate/100
//             }
//         }
//     }else if(order_type == 3) {// 按月配资利率
//         for(let item of programMonth) {
//             if(item.num == multiple) {
//                 return item.interestRate/100
//             }
//         }
//     }else if(order_type == 4) {// VIP配资利率
//         for(let item of programVip) {
//             if(item.num == multiple) {
//                 return item.interestRate/100
//             }
//         }
//     }
// }