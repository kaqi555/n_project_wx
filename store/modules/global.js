import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/user.js'
import apiHome from '@/api/home.js'
Vue.use(Vuex)

const state = {
	hasLogin: false,
	roomData: [],
	fans: [],
	attention: []
}

const mutations = {
	setRoomData(state, data) {
		state.roomData = data
	},
	setFans(state, fans) {
		state.fans = fans
	},
	setAttention(state, attention) {
		state.attention = attention
	}
}

const actions = {
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
	async getAttention({commit},data) {
		return new Promise((resolve, reject) => {
				apiHome.getPersonalAttention(data).then(response => {
					if(response.code === 200) {
					for(let i=0; i<response.data.length; i++) {
						response.data[i].buttonIndex = 0
					}
				    commit('setAttention', response.data)
					}
			    resolve(response)
			    }).catch(err => {
			    reject(error)
	           })
		})
	},
	async getFans({commit},data) {
		let newData = {
			token: data.token,
			id: data.id
		}
		return new Promise((resolve, reject) => {
				apiHome.getPersonalFans(newData).then(response => {
					if(response.code === 200) {
					for(let i=0; i<response.data.length; i++) {
					  for(let j=0; j<data.personalAttention.length; j++) {
						  if(data.personalAttention[j].id === response.data[i].id) {
							  response.data[i].buttonIndex = 0
						  } else {
							   response.data[i].buttonIndex = 1
						  }
					  } 
					}
					console.log(response.data)
				    commit('setFans', response.data)
					}
			    resolve(response)
			    }).catch(err => {
			    reject(error)
	           })
		})
	},
} 

export default {
	state,
	actions,
	mutations
}
