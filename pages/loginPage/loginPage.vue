<template>
	<view>
		<form @submit="login" @reset="">
		<view class="form-item">
			<input class="form-input" type="number"  @input="studentInput" :value="studentNumber" placeholder="请输入学号"/>
		</view>
		<view class="form-item uni-column">
			<input class="form-input" password @input="passwordInput" :value="passwordNumber" type="text" placeholder="请输入密码" />
		</view>
		<view class="form-button">
			<button class="button" form-type="submit">登录</button>
		</view>
	    </form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				studentNumber: '',
				passwordNumber: '',
			}
		},
		methods: {
			studentInput(e) {
				this.studentNumber = e.detail.value 
			},
			passwordInput(e) {
				this.passwordNumber = e.detail.value
			},
			login: function(e) {
				let user = {
					username: this.studentNumber,
					password: this.passwordNumber
				}
				this.$store.dispatch('loginTokenHut', user).then(response => {
					console.log(response)
					if(response.code === 200) {
					//this.$store.dispatch('getBanner', response.data.token)
					let data = {
						token: response.data.token,
					}
					this.$store.dispatch('getUserId', response.data.token).then(response => {
					data.id = response.data.id
					data.headPic = response.data.headPic
					data.username= response.data.username
					data.word= response.data.word
					})
					this.$store.dispatch('getHutUser', response.data.token).then(response => {
						response.data.token = data.token
						response.data.id = data.id
						response.data.word = data.word
						response.data.headPic = data.headPic
						response.data.username = data.username
						this.$store.dispatch('setStorage', response.data)
						uni.setStorage({
						    key: 'user',
						    data: response.data,
						    success: function () {
						        uni.switchTab({
						        	  url: "/pages/tabBar/homePage/homePage"
						        })
						    }
						});
					})
					}
					else if(response.code === 400){
						uni.showToast({
						    title: '用户不存在',
							icon: 'none',
						    duration: 1000
						});
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
.form-item {
	margin: 80rpx 0;
	font-size: 37rpx;
}
.form-input {
	caret-color: rgb(184, 69, 56);
	border-bottom: 7rpx solid #EEEEEE; 
	border-top: none; 
	border-left: none;
	border-right: none;
}
.button {
	border-radius: 50rpx;
	width: 90%;
	height: 90rpx;
	margin: 0 auto;
	background-color: rgb(184, 69, 56);
}
</style>
