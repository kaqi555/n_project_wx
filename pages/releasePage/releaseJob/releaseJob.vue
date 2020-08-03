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
		     		招聘岗位:
					</view>
					<input type="text" value="" name="jobPost"/>
		     	</view>
		     	<view class="studyInput">
					<view class="title">
					联系电话:
					</view>
					<input type="number" value="" name="jobPhone"/>
		     	</view>
				<view class="studyInput">
					 <textarea name="jobContent"   :focus="textFocus" placeholder="招聘要求/详情"/>
				</view>
				<view class="">
					<sunui-upimg :url ="url" @change = "changeImage"></sunui-upimg>
				</view>
				<view class="studyInput">
				<button  form-type="submit" plain="true">发布</button>
		        </view>
			 </form>
		</view>
	</view>
</template>

<script>
	import sunuiupimg from '@/components/sunui-upimg/sunui-upimg.vue'
	import apiRelease from '@/api/release.js'
	export default {
		components: {
			sunuiupimg
		},
		data() {
			return {
				headPic: this.$store.state.user.userPic,
				username: this.$store.state.user.userName,
				image: [],
				value: '',
				textFocus: true,
				url: 'https://www.hut-idea.top/resources/upload',
				params: {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				},
			}
		},
		methods: {
			changeImage(event) {
				this.image = event
			},
			bindPickerChange(event){
			  this.index = event.target.value
			},
			releaseStudy(event) {
				event = event.detail.value
				let data = this.params
				data.name = event.jobPost
				data.details = event.jobContent
				data.phone = event.jobPhone
				data.pics = []
				for(let i=0; i<this.image.length; i++) {
					this.image[i].pop()
					data.pics[i] = this.image[i]
				}
				apiRelease.releaseJob(data).then(response => {
					if(response.code === 200) {
						
					}
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
