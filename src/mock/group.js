import Mock from 'mockjs';
Mock.mock('/api/groupList', 'post', {
    code: 200,
    'data|3-8': [{
        id: '@increment()',
        userName: "@cword(2,6)",
        avator: "@dataImage('100x100')",
        secondStartTime: "2020/4/27 19:58:00",
        groupCount: "@natural(3,5)",
        'hasJoinGroup|1-3': [{
            avator: "@dataImage('100x100')",
            userName: "@cword(2,6)"
        }]
    }]
})
// 提交订单商品信息
Mock.mock('/api/subGroupGoods', 'post', {
    code: 200,
    'data': {
        id: '@increment()',
        name: "@cword(4,8)",
        pic: "@dataImage('100x100')",
        itro: "@csentence(10,38)",
        price: "@float( 1, 500)",
        originPrice: "@float( 500, 1000)",
        sale: "@natural(0,1000)",
        isGroup: "@boolean",
        isSecond: "@boolean",
        cartNumber: "@natural(1,10)"
    }
})
//单商品拼团详情
Mock.mock('/api/groupGroupProcress', 'post', {
    code: 200,
    'data': {
        id: '@increment()',
        userName: "@cword(2,6)",
        avator: "@dataImage('100x100')",
        secondStartTime: "2020/4/27 19:58:00",
        groupCount: "@natural(3,5)",
        'hasJoinGroup|1-3': [{
            avator: "@dataImage('100x100')",
            userName: "@cword(2,6)"
        }]
    }
})
//订单详情页拼团信息
Mock.mock('/api/groupOrderProcress', 'post', {
    code: 200,
    'data': {
        id: '@increment()',
        userName: "@cword(2,6)",
        avator: "@dataImage('100x100')",
        secondStartTime: "2020/4/27 19:58:00",
        groupCount: 4,
        'hasJoinGroup|4': [{
            avator: "@dataImage('100x100')",
            userName: "@cword(2,6)"
        }]
    }
})