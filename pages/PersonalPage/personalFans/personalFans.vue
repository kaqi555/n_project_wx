<template>
	<view>
		<personalfans :fans='fans' @changButton='changButton'></personalfans>
	</view>
</template>

<script>
import apiHome from '@/api/home.js'
import personalfans from '@/components/fans/fans.vue'
	export default {
		components: {
			personalfans
		},
		data() {
			return {
				attentions: this.$store.state.global.attention,
				fans: this.$store.state.global.fans
			}
		},
		methods: {
			changButton(e) {
				this.userdId = this.fans[e].id
				switch(this.fans[e].buttonIndex) {
					case 0:
					 this.deleteAttention()
					 this.fans[e].buttonIndex = 1
					 break
					case 1:
					this.addAttention()
					this.fans[e].buttonIndex = 0
					break
				}
			},
			addAttention() {
				let data =  {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				}
				data.vId = this.userdId
				apiHome.addAttention(data).then(response => {
					
				})
			},
			deleteAttention() {
				let data =  {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				}
				data.vId = this.userdId
				apiHome.deleteAttention(data).then(response => {
					
				})
			}
		}
	}
</script>

<style>

</style>
