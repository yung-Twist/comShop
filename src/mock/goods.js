import Mock from 'mockjs';
// 商品列表
Mock.mock('/api/getgoods', 'post', {
    code: 200,
    'data|5-10': [{
        id: '@increment()',
        name: "@csentence(2,6)",
        pic: "@dataImage('200x100')",
        itro: "@csentence(20,98)",
        fruit: '@fruit'
    }]
})
// 分类
Mock.mock('/api/categoryList', 'post', {
    code: 200,
    'data|3-8': [{
        id: '@increment()',
        name: "@cword(2,4)",
    }]
})
// 分类商品
Mock.mock('/api/categoryGoods', 'post', {
    code: 200,
    'data|3-8': [{
        id: '@increment()',
        name: "@cword(4,8)",
        pic: "@dataImage('100x100')",
        itro: "@csentence(10,38)",
        price: "@float( 1, 500)",
        goodsStock: "@natural(1,800)",
        originPrice: "@float( 500, 1000)",
        sale: "@natural(0,1000)",
        buyNum: 0,
        goodsSpec: [{
                specId: '@increment()',
                specStock: "@natural(0,1000)",
                specContent: "颜色:绿色,尺寸:S",
                specPrice: "@float(1,400)",
                specImg: "@dataImage('100x100')"
            },
            {
                specId: '@increment()',
                specStock: "@natural(0,1000)",
                specContent: "颜色:红色,尺寸:S",
                specPrice: "@float(1,400)",
                specImg: "@dataImage('100x100')"
            },
            {
                specId: '@increment()',
                specStock: "@natural(0,1000)",
                specContent: "颜色:绿色,尺寸:M",
                specPrice: "@float(1,400)",
                specImg: "@dataImage('100x100')"
            },
            {
                specId: '@increment()',
                specStock: "@natural(0,1000)",
                specContent: "颜色:蓝色,尺寸:L",
                specPrice: "@float(1,400)",
                specImg: "@dataImage('100x100')"
            }
        ]
    }]
})
// 秒杀商品
Mock.mock('/api/secondGoods', 'post', {
    code: 200,
    'data|3-8': [{
        id: '@increment()',
        name: "@cword(4,8)",
        pic: "@dataImage('100x100')",
        itro: "@csentence(10,38)",
        price: "@float( 1, 500)",
        originPrice: "@float( 500, 1000)",
        sale: "@natural(0,1000)",
        isGroup: 2,
        isSecond: 1,
        buyNum: 0,
        secondStartTime: "2020/4/27 19:58:00"
    }]
})
// 拼团商品
Mock.mock('/api/groupGoods', 'post', {
    code: 200,
    'data|3-8': [{
        id: '@increment()',
        name: "@cword(4,8)",
        pic: "@dataImage('100x100')",
        itro: "@csentence(10,38)",
        price: "@float( 1, 500)",
        originPrice: "@float( 500, 1000)",
        sale: "@natural(0,1000)",
        isGroup: 1,
        isSecond: 2,
        secondStartTime: "2020/4/27 19:58:00"
    }]
})
// 秒杀和拼团
Mock.mock('/api/secondgrout', 'post', {
    code: 200,
    'data': [
        // {
        //     id: 1,
        //     name: '秒杀专区',
        //     pic: "@dataImage('200x100','秒杀专区')",
        // },
        {
            id: 2,
            name: '拼团专区',
            pic: "@dataImage('200x100','拼团专区')",
        }
    ]
})
// 购物车列表
Mock.mock('/api/shopCarGoods', 'post', {
    code: 200,
    'data|1-5': [{
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
    }]
})
// 商品详情
Mock.mock('/api/goodsdetail', 'post', {
    code: 200,
    'data': {
        id: '@increment()',
        name: "@cword(4,8)",
        pic: "@dataImage('100x100')",
        itro: "@csentence(10,38)",
        price: "@float( 1, 500)",
        goodsStock: "@natural(1,800)",
        originPrice: "@float( 500, 1000)",
        sale: "@natural(0,1000)",
        'banner|3-5': [{
            image: "@dataImage('300x250')"
        }],
        goodsSpec: [{
                specId: '@increment()',
                specStock: "@natural(0,1000)",
                specContent: "颜色:绿色,尺寸:S",
                specPrice: "@float(1,400)",
                specImg: "@dataImage('100x100')"
            },
            {
                specId: '@increment()',
                specStock: "@natural(0,1000)",
                specContent: "颜色:红色,尺寸:S",
                specPrice: "@float(1,400)",
                specImg: "@dataImage('100x100')"
            },
            {
                specId: '@increment()',
                specStock: "@natural(0,1000)",
                specContent: "颜色:绿色,尺寸:M",
                specPrice: "@float(1,400)",
                specImg: "@dataImage('100x100')"
            },
            {
                specId: '@increment()',
                specStock: "@natural(0,1000)",
                specContent: "颜色:蓝色,尺寸:L",
                specPrice: "@float(1,400)",
                specImg: "@dataImage('100x100')"
            }
        ]
    }
})