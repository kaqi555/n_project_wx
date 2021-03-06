import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/user.js'
import apiHome from '@/api/home.js'
Vue.use(Vuex)

const state = {
	hasLogin: false,
	loginProvider: "",
	userId: '',
	userName: '',
	token: '',
	userPic: '',
	userSno: '',
	userStartYear: '',
	userCollege: '',
	userClassName: '',
	userSex: '',
	userWord: '',
	userHutName: '',
	appid: 'wx87e0647ad3dfa5af',
	secret: '4d17e8c658073e0360f600fd0b0b6e9b',
	banner: [],
}

const mutations = {
	login(state, provider) {
		state.hasLogin = true;
		state.loginProvider = provider;
	},
	logout(state) {
		state.hasLogin = false
		state.openid = null
	},
	setBanner(state,banner) {
		state.banner = banner
	},
	setToken(state, token) {
		state.token = token
	},
	setUserId(state, userId) {
		state.userId = userId
	},
	setUserName(state, userName) {
		state.userName = userName
	},
	setUserPic(state, pic) {
		state.userPic = pic
	},
	setUserCollege(state, college) {
		state.userCollege = college
	},
	setUserClass(state, className) {
	    state.userClassName = className
	},
	setUserSex(state, sex) {
	    state.userSex = sex
	},
	setUserSno(state,sno){
		state.userSno = sno
	},
	setUserStartYear(state, startYear){
		state.userStartYear = startYear
	},
	setUserHutName(state, name){
		state.userHutName = name
	},
	setUserWord(state, word) {
		state.userWord = word
	},
}

const actions = {
	async getUserSystem({commit}) {
		   return new Promise((resolve, reject) => {
		     uni.getSystemInfo({
		       success: (res) => {
				  resolve()
		       },
			   fail: (err) => {
				   reject(err)
			   }
		   });
		   })
		},
		async loginProvider({commit}) {
			return new Promise((resolve, reject) => {
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
						resolve(res.provider)
				    },
					fail: (err) => {
						reject(err)
					}
				});
			})
		},
		async loginWx({commit}, data) {
			return new Promise((resolve, reject) => {
				uni.login({
				  provider: data,
				  success: function (loginRes) {
					  //console.log(loginRes)
					resolve(loginRes.code)
				  },
				  fail: (err) => {
					  reject(err)
				  }
				});
			})
		},
		async loginToken({dispatch,commit}) {
			let provider = await dispatch('loginProvider')
			let code = await dispatch('loginWx')
			return new Promise((resolve, reject) => {
				api.getToken({
					code: code,
					_method: 'PUT'
				}).then(response => {
					commit('setToken', response.data.token)
					dispatch('getUserId', response.data.token)
					resolve(response.data.token)
				}).catch(error => {
					reject(error)
				})
			})
		},
		async loginTokenHut({dispatch, commit}, data) {
			uni.showLoading({
			    title: '请稍候'
			});
			let provider = await dispatch('loginProvider')
			let code = await dispatch('loginWx')
			return new Promise((resolve, reject) => {
				api.getTokenHut({
					username: data.username,
					password: data.password,
					code: code
				}).then(response => {
					if(response.code === 200) {
					commit('setToken', response.data.token)
					}
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		async getUserId({dispatch, commit}, token) {
			return new Promise((resolve, reject) => {
				api.getUserInfo({
					token: token
				}).then(response => {
					resolve(response)
				}).catch(err => {
					console.log(err)
					reject(err)
				})
			})
			
		},
		async getHutUser({commit}, token) {
			return new Promise((resolve, reject) => {
				api.getUserHut({
					token: token
				}).then(response => {
					resolve(response)
				}).catch(err => {
					console.log(err)
					reject(err)
				})
			})
		},
		async getBanner({commit}, data) {
			//console.log(data)
			return new Promise((resolve, reject) => {
				api.getBaner({
					token: data
				}).then(response => {
					//console.log(JSON.parse(response.data))
					commit('setBanner', JSON.parse(response.data))
					//console.log(store.state.banner)
					resolve(response)
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		async setStorage({dispatch,commit,state}, data) {
			commit('setToken', data.token ?? state.token)
			commit('setUserId', data.id ?? state.id)
			commit('setUserPic', data.headPic ?? state.userPic)
			commit('setUserName', data.username ?? state.userName)
			commit('setUserSno', data.xh ?? state.userSno)
			commit('setUserCollege', data.yxmc ?? state.userCollege)
			commit('setUserSex', data.xb ?? state.userSex)
			commit('setUserClass', data.bj ?? state.userClassName)
			commit('setUserStartYear', data.rxnf ?? state.userStartYear)
			commit('setUserHutName', data.xm ?? state.userHutName)
			commit('setUserWord', data.word ?? state.userWord)
			dispatch('getBanner', data.token ?? state.token)
		}
}

export default {
	state,
	actions,
	mutations
}
