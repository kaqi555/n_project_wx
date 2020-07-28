<template >
	<view class="talkFor">
	  <view class="talkLeft">
		 <!--  头像 -->
		<view class="talkHead margin-right-sm">
			<image :src="item.headPic" mode="" class="headImage"></image>
		</view>
	  <view class="talkAllContent">
		 <!--  用户名 -->
		<view class="talkName">
			{{username}}
		</view>
		 <!--  时间 -->
		<view class="talkTime">
			{{time}}
		</view>
		 <!--  说说内容-->
		<view class="talkContent">
			{{content}}
		</view>
		<block v-for="item in pics" :key="pics" class="imageAll">
		  <block v-if="pics.length==1">
		    <image @load="loadImage" :src="item" style="imageSize.direction(size,windowWidth)"  mode="aspectFit" @tap.native.stop="openImage"></image>
		  </block>
		  <block v-else-if="pics.length==4">
		  <view class="images images-even"><image :src="item" mode="aspectFill" @tap.native.stop="openImage"></image></view>
		  </block>
		  <block v-else>
		    <view class="images" ><image :src="item"   mode="aspectFill" @tap.native.stop="openImage"></image></view>
		  </block>
		</block>
		 <!--  五个按钮 -->
		<view class="talkAllColumn">
			<view class="talkColumn">
				<button  open-type="share" plain="true" :data-imgsrc='item.pics[0]' :data-id="item.user_id" :data-head="item.headPic">
				<image :src="img.talkShare" mode=""></image>
				</button>
			</view>
			<view class="talkColumn" @click="addLike">
				<image  :src="like? img.likeFill:img.like" mode=""></image>
				<text class="talkText margin-left-xs" >{{likes}}</text>
			</view>
			<view class="talkColumn" @click="openColumn">
				<image :src="img.talks" mode=""></image>
				<text class="talkText margin-left-xs" >{{talks.length}}</text>
			</view>
			<view class="uni-form-item uni-column">
			    <view class="title">控制键盘的input</view>
			    <input class="uni-input" ref="input1" @input="hideKeyboard" placeholder="输入123自动收起键盘" />
			 </view>
			<view class="talkColumn" @click="addCollected">
				<image :src="collected ? img.favorFill: img.favor" mode=""></image>
			</view>
			<view class="" v-if="item.userId === item.user_id">
				<text>删除</text>
			</view>
		 </view>
		</view>
	  </view>
	</view>
</template>
<script>
	import apiTalk from '@/api/talk.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		name: 'talk',
		components: {
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				headPic: this.item.headPic,
				username: this.item.username,
				time: this.item.time,
				content: this.item.content,
				pics: this.item.pics,
				like: this.item.like,
				likes: this.item.likes,
				talks: this.item.talks,
				collected: this.item.collected,
				params: {
					talkId: this.item.id,
					id: this.$store.state.userId,
					token: this.$store.state.token
				}
			}
		},
		props: {
			item: Object,
			img: {
			talkShare: {
				type: String,
				default: '',
			},
			likeFill: {
				type: String,
				default: '',
			},
			like: {
				type: String,
				default: '',
			},
			talks: {
				type: String,
				default: '',
			},
			favor: {
				type: String,
				default: '',
			},
			favorFill: {
				type: String,
				default: '',
			},
		},
		itemLike: "",
		},
		methods: {
			loadImage(e) {
				console.log('1000')
			},
			addLike() {
				apiTalk.getTalkGood(this.params).then(response => {
					if(response.code === 200) {
						this.like = !this.like
						 if (this.like) {
						     this.likes = this.likes + 1;
						 } else {
						    this.likes = this.likes - 1;
						 }
					
					}
				}).catch(err => {
					console.log(err)
				})
			},
			addCollected() {
				apiTalk.getTalkCollected(this.params).then(response => {
					if(response.code === 200) {
						this.collected = !this.collected
					}
				}).catch(err => {
					console.log(err)
				})
			},
			openColumn() {
				this.$refs.popup.open()
			}
		}
		
	}
</script>

<style>
.talkFor {
	width: 120%;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	justify-content: space-between;
	margin-top: 15rpx;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-direction: row;

}
.talkLeft {
	width: 70%;
	display: flex;
	flex-direction: row;
}
.talkHead {
	height: 100%;
	width: 100rpx;
}
.headImage {
	width: 88rpx;
	height: 88rpx;
	border-radius: 100rpx;
}
.talkAllContent {
	width: 450rpx;
	height: 100%;
}
.talkName {
	font-size: 30rpx;
	color: rgb(184, 69, 56);
}
.talkTime {
	font-size: 30rpx;
	color: #898989;
}
.talkContent {
    font-size: 30rpx;
    color: #3e3a39;
}
.talkImage {
	width: 100%;
	min-height: 50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
}
.talkImage image{
	
}
.contentImage {
	padding-bottom: 100%;
	height: 0;
	margin-right: 0;
}
.talkAllColumn {
	width: 120%;
	height: 17px;
	overflow: hidden;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
.talkColumn {
	width: 17%;
	flex-wrap: wrap;
	display: flex;
	flex-direction: row;
	min-height: 100%;
}
.talkColumn image{
	width: 45rpx;
	height: 45rpx;
	margin: 0;
	padding: 0;
}
.talkColumn  button {
    border: 0;
    padding: 0;
    width: 100%;
    height: 40rpx;
    display: flex;
    margin: 0;
    align-items: flex-start;
}

.talkText {
	color: #b5b5b6;
}
.margin-right-sm {
    margin-right: 20rpx;
}
.margin-left-xs {
   margin-left: 10rpx;
}
.imageAll {
	display: flex;
	flex-direction: row;
}
.images {
 position: relative;
  display: block;
  margin-right: 1%;
  width: 32.3%;
  padding-bottom: 32.3%;
  height: 0;
  text-align: center;
  margin-bottom: 1vw;
  float: left;
}

.images image {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0; /*margin-top:100%必须添加top值*/
  left: 0; /*margin-top:100%必须添加left值*/
}

.images-even:nth-of-type(even) {
  margin-right: 30%;
}
</style>
