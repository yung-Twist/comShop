import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import axios from '@/utils/http';
import './mock/index'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$back = function () {
	if (window.history.length > 1) {
		router.go(-1)
	} else {
		router.push('/')
	}
}
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

router.beforeEach((to, from, next) => {
	// URL解析 微回调地址中code存在 ?....# 中
	if (location.href.match(/\?from.*#/)) {
		// url.match(/(\S*)\?/)[1] 截取字符串前面的内容 
		// url.match(/#(\S*)/)[1];截取字符串后面的内容
		// let leftUrl = location.href.match(/(\S*)\?/)[1];
		let rightUrl = location.href.match(/#(\S*)/)[1];
		let url = location.origin + '/#' + rightUrl;
		console.log(url)
		location.replace(url)
	}
	// http://user.weishilian.shop/?code=0614Dy1P0uaF062K1b3P0RMx1P04Dy1W&state=STATE#/login?redirect=http%3A%2F%2Fuser.weishilian.shop%2F%23%2Fhome
	if (location.href.match(/\?code.*#/)) {
		let temp = location.href.match(/\?.*#/)[0]
		if (temp.match(/=.*&/)) {
			// 解析Code
			let code = temp.match(/=.*&/)[0]
			code = code.substr(1, code.length) // 去掉 ?
			code = code.substr(0, code.length - 1) // 去掉 #
			// 通过Code请求获取openId或者用户信息(这里axios是被我封装过的)
			//   console.log(code)
			let url = location.href
			let query = url.split('#')[1].split('?')[1].split('=')[1]
			//   console.log(query)
			location.replace(`${location.origin}/#/login?code=${code}&redirect=${query}`)
		}
	}

	var ua = window.navigator.userAgent.toLowerCase();
	let isInWx = ua.match(/MicroMessenger/i) == 'micromessenger';
	let token;
	if (isInWx) {
		// 生产环境
		token = localStorage.getItem('token');
	} else {
		token = process.env.NODE_ENV == 'development' ? 'user_49d2fabb739b302785fc7b8f1e03ab6e' : ''
		localStorage.setItem('token', token)
	}
	document.title = to.meta.title;
	// if(to.path != '/ChooseStore')
	// if () {
	// 	next()
	// } else if (to.path == '/ChooseStore' || !localStorage.getItem('storeId')) {
	// 	// console.log(123)
	// 	next('/ChooseStore')
	// }


	// store.state.token = localStorage.getItem('token');

	next();
});
// 全局组件
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
const requireComponent = require.context('./components', true, /\.vue/);
requireComponent.keys().forEach(fileName => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName);
	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(
			// 获取和目录深度无关的文件名
			fileName
			.split('/')
			.pop()
			.replace(/\.\w+$/, '')
		)
	);
	// 全局注册组件
	Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');