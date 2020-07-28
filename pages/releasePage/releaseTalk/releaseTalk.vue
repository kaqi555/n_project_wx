<template>
	<view class="release">
		<view class="head">
			<image :src="headPic" mode=""></image>
			<text>{{username}}</text>
		</view>
		
		 <view class="uni-textarea">
		      <textarea :value="value"  @input="inputValue" @confirm="releaseTalk" :focus="textFocus" placeholder="怎么说"/>
		</view>
		
		<view class="">
			<sunui-upimg :url ="url" @change = "changeImage"></sunui-upimg>
		</view>
		
		<view class="releaseButton">
			<button type="default" @click="releaseTalk">发布</button>
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
				headPic: this.$store.state.userPic,
				username: this.$store.state.userName,
				image: [],
				imgList: [],
				value: '',
				textFocus: true,
				url: 'https://www.hut-idea.top/resources/upload',
				params: {
					token: this.$store.state.token,
					id: this.$store.state.userId
				},
			}
		},
		methods: {
			changeImage(event) {
				console.log(event)
				this.image = event
			},
			inputValue(event) {
				this.value =  event.detail.value
			},
			releaseTalk(event) {
				console.log(this.value)
				let data = this.params
				data.content = this.value
				data.pics = []
				for(let i=0; i<this.image.length; i++) {
					this.image[i].pop()
					data.pics[i] = this.image[i]
				}
				//console.log(data)
				apiRelease.releaseTalk(data).then(responser => {
					
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
.releaseButton button {
	border-radius: 20rpx;
	width: 90%;
	height: 90rpx;
	line-height: 90rpx;
	margin: 0 auto;
	background-color: rgb(184, 69, 56);
}
</style>
