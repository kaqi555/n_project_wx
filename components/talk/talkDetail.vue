<template>
	<view class="cu-card dynamic" :class="isCard?'no-card':''">
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg">
						<image :src="headPic" class="cu-avatar round lg"  mode=""></image>
					</view>
					<view class="content flex-sub">
						<view>{{username}}</view>
						<view class="text-gray text-sm flex justify-between">
							{{time}}
						</view>
					</view>
				</view>
			</view>
			<view class="text-content">
				{{content}}
			</view>
			<view class="grid flex-sub padding-lr" :class="pics.length !== 1?'col-3 grid-square':'col-1'">
				<view  class="bg-img" :class="pics.length !== 1?'':'only-img'" style="background-image: url();"
				 v-for="(pic,index) in pics" :key="index">
				 <image :src="pic" mode="" @click="previewImage(pics,index)" class="imageOne"></image>
				</view>
			</view>
			
			<view class="text-gray text-sm text-right padding actionAll" :class="pics.length === 1 ? 'actionOne': '' ">
				<view class="cu-item head" >
					<view class="action">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" v-for="likeUrl in likeName">
							<image class="cu-avatar round sm" :src="likeUrl" mode=""></image>
						    </view>
						</view>
						<text class="text-grey text-xl">{{likeName.length}}</text>
					</view>
				</view>
				<text class="cuIcon-appreciatefill margin-lr-xs iconMax" :class="like ? 'text-red' : ''" @click="addLike">{{likes}}</text> 
				<text class="cuIcon-messagefill margin-lr-xs iconMax" @click="showComment">{{talkLength}}</text> 
			    <text class="margin-lr-xs iconMax" :class="collected ? 'cuIcon-favorfill text-red' : 'cuIcon-favor'" @click="addFavor"></text> 
			    <button  class="cu-btn round sm buttonShare" open-type='share' plain="true" :data-imgsrc='pics[0]' :data-id="items.id" :data-head="headPic">
					<text class="cuIcon-share margin-lr-xs iconMax"></text>
				</button>
				
			</view>
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="cuIcon-close iconMax" @click="hideModal"></view>
					</view>
					<view class="padding-xl">
						<view class="cu-list menu-avatar comment solids-top">
							<view class="cu-item" v-for="(comment,comment_index) in talks">
								<view class="cu-avatar round" >
									<image class="cu-avatar round" :src="comment.headPic" mode=""></image>
								</view>
								<view class="content">
									<view class="text-grey">{{comment.username}}</view>
									<view class="text-gray text-content text-df">
										{{comment.content}}
									</view>
									<view class="margin-top-sm flex justify-between">
										<view class="text-gray text-df">{{comment.time}}</view>
										<view>
											<text class=" text-blue margin-right-sm" @click="commentIsReply(comment,comment_index)">回复</text>
										</view>
									</view>
									<view class="bg-grey padding-sm radius margin-top-sm  text-sm" v-if="comment.talks.length != 0" v-for="com in comment.talks">
										<view class="flex">
											<view>{{com.username}}</view>
											<view class="flex-sub">{{com.content}}</view>
										</view>
										<view class="margin-top-sm flex justify-between">
											<view class="text-gray text-df">{{com.time}}</view>
											<view>
												<text class=" text-blue margin-right-sm" @click="commentIsReply(com,comment_index)">回复</text>
											</view>
										</view>
									</view>
				
								</view>
							</view>
						</view>
					</view>
						<view class="cu-bar input inputTalk">
							<view class="cu-avatar round">
								<image :src="headUser" class="cu-avatar round" mode=""></image>
							</view>
							<input   :placeholder="commentPlace" v-model="inputValue" :adjust-position="false" class="solid-bottom"   maxlength="300" cursor-spacing="0" ></input>
							<button class="cu-btn bg-green shadow-blur" @click="sendComment">发送</button>
						</view>
					</view>
				
			</view>
			
		</view>
	</view>

</template>

<script>
	import apiTalk from '@/api/talk.js'
	
	export default {
		name: 'talkdetail',
		props: ['item'],
		data() {
			return {
				inputValue: '',
				commentPlace: '快来说点什么吧',
				showLoadMore: false,
				talkLength: this.item.talkLength,
				headPic: this.item.headPic,
				username: this.item.username,
				time: this.item.time,
				content: this.item.content,
				pics: this.item.pics,
				like: this.item.like,
				likes: this.item.likes,
				talks: this.item.talks,
				isReply: false,
				collected: this.item.collected,
				likeName: this.item.likeUser,
				params: {
					token: this.$store.state.token,
					id: this.$store.state.userId,
				},
				index: 0,
				comment: {
					token: this.$store.state.token,
					id: this.$store.state.userId,
					username: this.$store.state.userName,
					talkId: this.item.id
				},
				headUser: this.$store.state.userPic,
				modalName: null,
				img:{
				talkShare: '../../static/img/share.png',
				likeFill: '../../static/img/like.png',
				like: '../../static/img/islike.png',
				talks: '../../static/img/comment.png',
				isLiked: '../../static/img/liked.png',
				favorFill: '../../static/img/tabfavorFill.png',
				favor: '../../static/img/tabfavor.png',
				},
				isCard: true
			}
		},
		created() {
		},
		methods: {
			test(){
				this.navigateTo('../test/test');
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			hideModal(e) {
				this.modalName = null
			},
			showComment() {
				this.modalName = 'bottomModal'
				this.comment.talkedId  = 0
				this.comment.talkedUsername = ''
				this.isReply = false
			},
			commentIsReply(event, index) {
				console.log(index)
				console.log(this.talks)
				this.index = index
	            this.commentPlace = '回复' + event.username
				this.comment.talkedId  = event.id
				this.comment.talkedUsername = event.username
				this.isReply = true
			},
			sendComment() {
			let data = this.comment
			data.content = this.inputValue		
			this.inputValue = ''
			apiTalk.getTalkComment(data).then(response => {
			if(response.code === 200) {
			if(this.isReply === false) {
			this.talks.push({
				username: this.$store.state.userName,
				content: data.content,
				talkId: data.talkId,
				id: response.data,
				talks: []
			})
			} else {
			
			this.talks[this.index].talks.push({
				username: this.$store.state.userName,
				content: data.content,
				talkId: data.talkId,
				id: response.data,
				talkedId: data.talkedId,
				talked_username: this.talkedUsername,
				headPic: this.$store.state.userPic
			})
			this.isReply = false
			}
			}
			})
			},
			addLike(index) {
				console.log(this.like)
				let data = this.params
				data.talkId  = this.item.id
				console.log(this.likeName)
				apiTalk.getTalkGood(this.params).then(response => {
					if(response.code === 200) {
						this.like = !this.like
						 if (this.like) {
							 this.likes++
						 	this.likeName.push(this.$store.state.userPic);
						 } else {
							 this.likes--
						 	this.likeName.splice(this.likeName.indexOf(
						 		this.$store.state.userPic
						 	), 1);
						 }
					}
				}).catch(err => {
					console.log(err)
				})
			},
			addFavor() {
				let data = this.params
				data.talkId = this.item.id
				apiTalk.getTalkCollected(data).then(response => {
					if(response.code === 200) {
						this.collected = !this.collected
					}
				}).catch(err => {
					console.log(err)
				})
			},
			previewImage(imageList, image_index) {
				var current = imageList[image_index];
				uni.previewImage({
					current: current,
					urls: imageList
				});
			}
		}
	}
</script>

<style scoped>
.iconMax {
	font-size: 50rpx;
}
.actionOne {
	margin-top: 80rpx;
}
.head {
	float: left;
}
.buttonShare {
	border: none;
	background-color: #FFFFFF;
}
.imageOne {
	width: 800rpx;
	height: 400rpx;
}
.inputTalk {
	position: fixed;
	width: 100%;
	
}

</style>
