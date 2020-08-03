<template>
	<view>
		<form action="" @submit="formSubmit">
			<view class="cu-form-group margin-top">
				<view class="cu-avatar xl round" :style="{backgroundImage: 'url(' + headPic + ')'}"></view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title text-grey">昵称</view>
				<input :value="userName" name="username" class="text-black"></input>
			</view>
			<view class="cu-list menu">
			<view class="cu-item arrow" @click="pageNextInfo">
				<view class="content">
					<text class=" text-grey">真实姓名</text>
					<text class="text-black margin-left-xl">{{userHutName}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">公开</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class=" text-grey">性别</text>
					<text class="text-black margin-left-xl">{{userSex}}</text>
				</view>
				
			</view>
			<view class="cu-item arrow" @click="pageNextInfo">
				<view class="content">
					<text class=" text-grey">教育经历</text>
					<text class="text-black margin-left-xl">{{userCollege}}</text>
					<text class="text-black margin-left-xl">{{userClassName}}</text>
					<text class="text-black margin-left-xl">{{userStartYear}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">个性签名</view>
				<textarea maxlength="-1" :disabled="modalName!=null" name='userWord' :value="word"></textarea>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
import apiHome from '@/api/home.js'
	export default {
		data() {
			return {
				headPic: this.$store.state.user.userPic,
				userName: this.$store.state.user.userName,
				userHutName: this.$store.state.user.userHutName,
				userCollege: this.$store.state.user.userCollege,
				userClassName: this.$store.state.user.userClassName,
				userStartYear:this.$store.state.user.userStartYear,
				word: this.$store.state.user.userWord,
				userSex:  this.$store.state.user.userSex,
				params: {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId,
				},
			}
		},
		methods: {
			formSubmit(e) {
				console.log(e.detail.value)
				let data = this.params
				data.username = e.detail.value.username
				data.word = e.detail.value.userWord
				apiHome.reviseUserInfo(data).then(response => {
					console.log(response)
				})
			}
		}
	}
</script>

<style>

</style>
