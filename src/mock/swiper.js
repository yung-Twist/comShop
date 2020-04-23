import Mock from 'mockjs';
Mock.mock('/api/getswiper', 'post', {
    code: 200,
    'data|3-5': [{
        id: '@increment()',
        carouselImageImagePath: "@dataImage('300x250')"
    }]
})