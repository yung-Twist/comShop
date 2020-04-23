import Mock from 'mockjs';
// 个人信息
Mock.mock('/api/userinfo', 'post', {
    code: 200,
    'data': {
        id: '1',
        userNickName: '@cname',
        userHeadImageUrl: "@dataImage('100x100')"
    }
})
// 我的订单
Mock.mock('/api/orderlist', 'post', {
    code: 200,
    'data|3-8': [{
        id: '@increment()',
        orderNumber: "@natural(1000000000000,99999999999999)",
        orderPrice: "@float( 100, 20000)",
        orderStatus: "@natural(1,6)",
        'orderGoodsList|1-3': [{
            orderGoodsImagePath: "@dataImage('200x200')",
            orderGoodsGoodsName: "@cword(4,8)",
            orderGoodsPrice: "@float( 1, 500)",
            orderGoodsSpecContent: "@csentence(10,38)",
            orderGoodsNumber: "@natural(1,5)",
        }]
    }]
})
// 订单详情
Mock.mock('/api/orderdetail', 'post', {
    code: 200,
    'data': {
        id: '@increment()',
        orderNumber: "@natural(1000000000000,99999999999999)",
        orderPrice: "@float( 100, 20000)",
        orderStatus: "@natural(1,6)",
        'orderGoodsList|1-3': [{
            orderGoodsImagePath: "@dataImage('200x200')",
            orderGoodsGoodsName: "@cword(4,8)",
            orderGoodsPrice: "@float( 1, 500)",
            orderGoodsSpecContent: "@csentence(10,38)",
            orderGoodsNumber: "@natural(1,5)",
        }]
    }
})
// 获取海报背景图
Mock.mock('/api/shareImage', 'post', {
    code: 200,
    data: {
        share_image_path: "@dataImage('300x500')",
    }
})