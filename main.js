
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
import store from '@/store/store.js'

uni.$http = $http
$http.baseUrl = "https://api-hmugo-web.itheima.net"
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
	if(options.url.indexOf('/my')!==-1) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}
$http.afterRequest = function(){
	uni.hideLoading()
}
uni.$showMsg = function(title="数据加载失败！",duration=1500) {
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import {$http} from '@escook/request-miniprogram'
import store from '@/store/store.js'

uni.$http = $http
$http.baseUrl = "https://api-hmugo-web.itheima.net"
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
	if(options.url.indexOf('/my')!==-1) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}
$http.afterRequest = function(){
	uni.hideLoading()
}
uni.$showMsg = function(title="数据加载失败！",duration=1500) {
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
  }
}
// #endif