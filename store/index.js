import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/user.js'
import apiHome from '@/api/home.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	 
	state: {
		hasLogin: false,
		roomData: [],
		loginProvider: "",
		userId: '',
		userName: '',
		token: '',
		userPic: '',
		userSno: '',
		userStartYear: '',
		userHutName: '',
		appid: 'wx87e0647ad3dfa5af',
		secret: '4d17e8c658073e0360f600fd0b0b6e9b',
		banner: [],
		testvuex:false,
        colorIndex: 0,
        colorList: ['#FF0000','#00FF00','#0000FF']
	},
	mutations: {
		setRoomData(state, data) {
			state.roomData = data
		},
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
		setUserSno(state,sno){
			state.userSno = sno
		},
		setUserStartYear(state, startYear){
			state.userStartYear = startYear
		},
		setUserHutName(state, name){
			state.userHutName = name
		},
	},
    getters:{
        currentColor(state){
            return state.colorList[state.colorIndex]
        }
    },
	actions: {
		// lazy loading openid
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
		async getRoom({commit},data) {
				  return new Promise((resolve, reject) => {
					  apiHome.getFreeRoom(data).then(response => {
						  if(response.code === 200) {
							  response.data.push(data.state)
							  commit('setRoomData', response.data)
						  }
						  resolve(response)
					  }).catch(err => {
						  reject(error)
					  })
				  })
		},
		async setStorage({dispatch,commit}, data) {
			commit('setToken', data.token)
			commit('setUserId', data.id)
			commit('setUserPic', data.headPic)
			commit('setUserName', data.username)
			commit('setUserSno', data.xh)
			commit('setUserStartYear', data.rxnf)
			commit('setUserHutName', data.xm)
			dispatch('getBanner', data.token)
		}
	}
})

export default store
