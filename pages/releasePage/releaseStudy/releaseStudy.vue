<template>
	<view class="release">
		<view class="head">
			<image :src="headPic" mode=""></image>
			<text>{{username}}</text>
		</view>
		
		 <view class="studyForm">
		     <form @submit="releaseStudy" @reset="">
		     	<view class="studyInput">
					<view class="title">
		     		资料名:
					</view>
					<input type="text" value="" name="studyName"/>
		     	</view>
		     	<view class="studyInput">
					<view class="title">
					资料详情:
					</view>
					<input type="text" value="" name="studyInfo"/>
		     	</view>
				<view class="studyInput">
					<view class="title">
					资料类型:
					</view>
					<picker mode="selector" @change="bindPickerChange" name="studyType" :value="index" :range="arrayPicker">
						<view>{{arrayPicker[index]}}</view>
					</picker>
				</view>
				<view class="studyInput">
					<view class="title">
					网盘地址:
					</view>
					<input type="text" value="" name="studyAddress"/>
				</view>
				<view class="studyInput">
					<view class="title">
					提取码:
					</view>
					<input type="text" value="" name="studyCode"/>
				</view>
				<view class="studyInput">
				<button  form-type="submit" plain="true">发布</button>
		        </view>
			 </form>
		</view>
	</view>
</template>

<script>
	import apiRelease from '@/api/release.js'
	export default {
		data() {
			return {
				headPic: this.$store.state.userPic,
				username: this.$store.state.userName,
				image: [],
				value: '',
				arrayPicker: ['考试资料','乐谱'],
				index: 0,
				textFocus: true,
				url: 'https://www.hut-idea.top/resources/upload',
				params: {
					token: this.$store.state.token,
					id: this.$store.state.userId
				},
			}
		},
		methods: {
			bindPickerChange(event){
			  this.index = event.target.value
			},
			releaseStudy(event) {
				event = event.detail.value
				let data = this.params
				data.name = event.studyName
				data.details = event.studyInfo
				data.url = event.studyAddress
				console.log(event)
				switch (event.studyType) {
				   case 0: 
					   data.type = '1'
					   break
				   case 1: 
				       data.type = '2'
					   break   
				}
				data.secret = event.studyCode
				console.log(data)
				apiRelease.releaseStudy(data).then(responser => {
					
				}).catch(err => {
					
				})
			}
		}
	}
</script>

<style>
.head {
display: flex;
margin: 20rpx 30rpx;
flex-direction: row;
justify-content: flex-start;
}
.head image {
	width: 100rpx;
	border-radius: 100rpx;
	align-items: center;
	height: 100rpx;
}
.head text {
	margin: 15rpx 30rpx;
	align-items: center;
	font-size: 40rpx;
}
.studyInput {
	background-color: #fff;
	padding: 1rpx 30rpx;
	display: flex;
	align-items: center;
	min-height: 100rpx;
	justify-content: space-between;
}
.studyInput .title {
	text-align: justify;
	padding-right: 30rpx;
	font-size: 30rpx;
	position: relative;
	height: 60rpx;
	line-height: 60rpx;
}
.studyInput input {
	flex: 1;
	font-size: 30rpx;
	color: #555;
	padding-right: 20rpx;
}
.studyForm button {
	border-radius: 20rpx;
	width: 90%;
	height: 90rpx;
	line-height: 90rpx;
	margin: 0 auto;
	background-color: rgb(184, 69, 56);
}
</style>
