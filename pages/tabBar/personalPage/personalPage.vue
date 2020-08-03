<template>
	<view>
		<personalinfo :info="personalInfo" :fans="personalFans" :attention="personalAttention"
		@changeBgpic= 'changeBgpic'
		@changeHeadPic = 'changeHeadPic'></personalinfo>
	</view>
</template>

<script>
import personalinfo from "@/components/personal/personal.vue"
import apiHome from '@/api/home.js'
	export default {
		components: {
			personalinfo
		},
		data() {
			return {
				personalInfo: {},
				personalFans: [],
				personalAttention: [],
				params: {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				}
			}
		},
		onShow() {
			this.getPersonalinfo()
		},
		methods: {
			getPersonalinfo() {
				let data = this.params
				apiHome.getPersonalInfo(data).then(response => {
					//console.log(response)
					this.personalInfo = response.data
					this.$store.dispatch('setStorage', response.data)
					console.log(this.personalInfo.bgPic)
				})
				this.$store.dispatch('getAttention', data).then(response => {
					console.log(response)
					this.personalAttention = response.data
					data.personalAttention = response.data
					this.$store.dispatch('getFans', data).then(response => {
						console.log(response)
						this.personalFans = response.data
					})
				})
			},
			changeBgpic(e) {
				console.log(e[0])
				this.personalInfo.bgPic = e[1]
				let data = {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				}
				data.bgpic = e[1]
				//console.log(e)
				apiHome.reviseUserInfo(data).then(response => {
					
				})
			},
			changeHeadPic(e) {
				this.personalInfo.headPic = e[1]
				let data = {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				}
				data.headPic = e[1]
				//console.log(e)
				apiHome.reviseUserInfo(data).then(response => {
					
				})
			}
		}
	}
</script>

<style>

</style>
