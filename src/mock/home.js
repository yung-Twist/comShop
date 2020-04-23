import Mock from 'mockjs';
Mock.mock('api/home/goods', 'post', {
    code: 200,
    'data|3-5': [{
        classifyName: "@cword(3,6)",
        'goodslist|2-4': [{
            name: "@cword(2,6)",
            pic: "@dataImage('200x100')",
            itro: "@cword(20,98)",
            price: "@float( 1, 500)",
            originPrice: "@float( 500, 1000)",
        }]
    }]
})