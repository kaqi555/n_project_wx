import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import global from './modules/global.js'

Vue.use(Vuex)
const store = new Vuex.Store({
	 modules: {
	   user:user,
	   global: global
	  }
})

export default store
