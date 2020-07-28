import Vue from 'vue'
import App from './App'
import store from './store'
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'


Vue.prototype.$store = store  
Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
	store,
	...App
})
app.$mount()
