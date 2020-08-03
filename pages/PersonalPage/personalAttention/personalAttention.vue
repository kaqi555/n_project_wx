<template>
	<view>
		<personalattention :attentions='attentions' @changButton='changButton'></personalattention>
	</view>
</template>

<script>
import apiHome from '@/api/home.js'
import personalattention from '@/components/attention/attention.vue'
	export default {
		components: {
			personalattention
		},
		data() {
			return {
				attentions: this.$store.state.global.attention,
				fans: this.$store.state.global.fans,
				userdId: '',
				params: {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				}
			}
		},
		onShow() {
			//this.getInfo()
		},
		methods: {
			changButton(e) {
				this.userdId = this.attentions[e].id
				switch(this.attentions[e].buttonIndex) {
					case 0:
					 this.deleteAttention()
					 this.attentions[e].buttonIndex = 1
					 break
					case 1:
					this.addAttention()
					this.attentions[e].buttonIndex = 0
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
