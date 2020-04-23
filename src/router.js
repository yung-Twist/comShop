import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
        keepAlive: false,
        showtar: true
      }
    },
    {
      path: '/goodsdetail',
      name: 'Goodsdetail',
      component: () => import('@/views/goods/goodsdetail'),
      meta: {
        title: '商品详情',
        keepAlive: false,
        showtar: false
      },
    },
    {
      path: '/goodsgroupdetail',
      name: 'Goodsgroupdetail',
      component: () => import('@/views/goods/goodsGroupDetail'),
      meta: {
        title: '拼团商品详情',
        keepAlive: false,
        showtar: false
      },
    },
    {
      path: '/goodsGroupProcess',
      name: 'GoodsGroupProcess',
      component: () => import('@/views/goods/goodsGroupProcess'),
      meta: {
        title: '拼团进度',
        keepAlive: false,
        showtar: false
      },
    },
    {
      path: '/second',
      name: 'Second',
      component: () => import('@/views/home/second'),
      meta: {
        title: '秒杀专区',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/group',
      name: 'Group',
      component: () => import('@/views/home/group'),
      meta: {
        title: '拼团专区',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/classify',
      name: 'Classify',
      component: () => import('@/views/classify/Classify.vue'),
      meta: {
        title: '分类',
        keepAlive: false,
        showtar: true
      }
    },
    {
      path: '/shopcar',
      name: 'Shopcar',
      component: () => import('@/views/shopcar/Shopcar.vue'),
      meta: {
        title: '购物车',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/submitorder',
      name: 'Submitorder',
      component: () => import('@/views/shopcar/Submitorder.vue'),
      meta: {
        title: '提交订单',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/submitgrouporder',
      name: 'SubmitGrouporder',
      component: () => import('@/views/shopcar/SubmitGroupOrder'),
      meta: {
        title: '提交拼团订单',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/myorder',
      name: 'Myorder',
      component: () => import('@/views/mine/Myorder.vue'),
      meta: {
        title: '我的订单',
        keepAlive: false,
        showtar: true
      }
    },
    {
      path: '/orderGoodsDetail',
      name: 'OrderGoodsDetail',
      component: () => import('@/views/mine/orderGoodsDetail.vue'),
      meta: {
        title: '订单详情',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/authphone',
      name: 'AuthPhone',
      component: () => import('@/views/mine/AuthPhone.vue'),
      meta: {
        title: '手机验证',
        keepAlive: false,
        showtar: true
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/views/mine/Mine.vue'),
      meta: {
        title: '我的',
        keepAlive: false,
        showtar: true
      }
    },
    {
      path: '/sorelist',
      name: 'Storelist',
      component: () => import('@/views/store/storelist'),
      meta: {
        title: '网点列表',
        keepAlive: false,
        showtar: true
      }
    },
    {
      path: '/site',
      name: 'Site',
      component: () => import('@/views/mine/Sitemanage.vue'),
      meta: {
        title: '地址管理',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/editsite',
      name: 'Editsite',
      component: () => import('@/views/mine/Editsite.vue'),
      meta: {
        title: '编辑地址',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/misslogin',
      name: 'MissLogin',
      component: () => import('@/views/login/missLogin.vue'),
      meta: {
        title: '登录',
        keepAlive: false,
        showtar: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login.vue'),
      meta: {
        title: '登录',
        keepAlive: false,
        showtar: false
      }
    }
  ]
})