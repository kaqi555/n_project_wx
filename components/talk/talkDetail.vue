<template>
	<view class="cu-card dynamic" :class="isCard?'no-card':''">
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg">
						<image :src="headPic" class="cu-avatar round lg" mode=""></image>
					</view>
					<view class="content flex-sub">
						<view>{{username}}
						<view class='margin-left-sm' :class="attentionIndex ? 'text-gray': 'text-blue'" @click="switchAttention">{{attentionText}}</view>
						</view>
						<view class="text-gray text-sm flex justify-between">
							{{time}}
						</view>
					</view>
				</view>
			</view>
			<!-- //文本 -->
			<view class="text-content">
				{{content}}
			</view>
			<!-- 图片 -->
			<view class="grid flex-sub padding-lr" :class="pics.length !== 1?'col-3 grid-square':'col-1'">
				<view class="bg-img" :class="pics.length !== 1?'':'only-img'" style="background-image: url();" v-for="(pic,index) in pics"
				 :key="index">
					<image :src="pic" mode="" @click="previewImage(pics,index)" class="imageOne"></image>
				</view>
			</view>
			<!-- 转赞评 -->
			<view class="text-gray text-sm text-right actionAll padding-bottom" :class="pics.length === 1 ? 'actionOne': '' ">
				<!-- 点赞人头 -->
				<view class="cu-item head">
					<view class="action" style="font-size: 34rpx;display: flex;justify-content: center;align-items: center;">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" v-for="likeUrl in likeName">
								<image class="cu-avatar round sm" :src="likeUrl" mode=""></image>
							</view>
						</view>
						{{likeName.length}}
					</view>
				</view>
				<!-- 点赞评论转发收藏数 -->
				<text class="cuIcon-appreciatefill margin-lr-xs iconMax" :class="like ? 'text-red' : ''" @click="addLike">{{likes}}</text>
				<text class="cuIcon-messagefill margin-lr-xs iconMax" @click="showComment">{{talkLength}}</text>
				<text class="margin-lr-xs iconMax" :class="collected ? 'cuIcon-favorfill text-red' : 'cuIcon-favor'" @click="addFavor"></text>
				<button class="cu-btn round sm buttonShare" open-type='share' plain="true" :data-imgsrc='pics[0]' :data-id="items.id"
				 :data-head="headPic">
					<text class="cuIcon-share  iconMax"></text>
				</button>

			</view>

		<view class="" @touchmove.stop.prevent = "stopPenetrate"></view>
			<view   style="position: fixed;bottom:0rpx; z-index: 3000;width: 750rpx;" v-if="modalName?true:false" @touchmove.stop.prevent = "stopPenetrate">
				<scroll-view style="width: 100%;height:91vh;background-color: white;margin-bottom: 98rpx;" scroll-y="false">
				<!-- <view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''"> -->
				<view class="cu-dialog" style="width:100%;">
					<!-- 小x -->
					<view class="cu-bar bg-white">
						<view class="cuIcon-close iconMax" @click="hideModal" style="padding:0 20rpx;"></view>
					</view>

					<view class="">
						<view class="cu-list menu-avatar comment solids-top">
							<!-- 别人评论一级ok-->
							<view class="cu-item" v-for="(comment,comment_index) in talks" style="margin:5rpx 0">
								<!-- 头像 ok-->
								<view class="cu-avatar round">
									<image class="cu-avatar round" :src="comment.headPic" mode="aspectFill"></image>
								</view>
								<!-- 评论所有内容ok -->
								<view class="content" style="word-break: break-all;">
									<!-- 1名字 ok-->
									<view class="name-weight">{{comment.username}}</view>
									<!-- 1内容 ok-->
									<view class="content-style-declare">
										{{comment.content}}
									</view>
									<!-- 1时间与回复 ok-->
									<view class="margin-top-sm flex justify-between" style="margin-top:0px">
										<view class="text-gray text-df tm-size">{{comment.time}}</view>
										<view>
											<text class=" text-blue margin-right-sm declare-size" @click="commentIsReply(comment,comment_index)">回复</text>
										</view>
									</view>
									<!-- 二级评论 -->
									<view class="radius margin-top-sm  text-sm second-declare" v-if="comment.talks.length != 0" v-for="com in comment.talks"
									 style="">
										<view class="" style="text-align: left;">
											<view class="name-weight" style="font-size: 26rpx;">{{com.username}}</view>
											<text class="flex-sub" style="margin-top:0 ;font-size:23rpx">{{com.content}}</text>
										</view>
										<view class="margin-top-sm flex justify-between" style="margin-top: 0;">
											<view class="text-gray text-df tm-size" style="margin-top:0px">{{com.time}}</view>
											<view>
												<text class="margin-right-sm declare-size" @click="commentIsReply(com,comment_index)">回复</text>
											</view>
										</view>
									</view>

								</view>
							</view>
						</view>


					</view>

				</view></scroll-view>
			</view>
		
			<!--  框框 -->
			<view class="cu-bar input uni-input" style="position: fixed;bottom: 0;width:100%;z-index: 5000;" v-if="modalName?true:false">
				<view class="cu-avatar round" mode="widthFix" style="width: 64rpx;" :style="{backgroundImage: 'url(' + headUser + ')'}"></view>
				<input style="margin-left: 20rpx;" :style="inputHeight" :placeholder="commentPlace" v-model="inputValue" :adjust-position="false" 
				class="solid-bottom" adjust-position="true" maxlength="300" cursor-spacing="10" :focus="inputFocus"></input>
				<button class="cu-btn bg-red shadow-blur" @click="sendComment">发送</button>
			</view>
		</view>
	</view>

</template>

<script>
	import apiTalk from '@/api/talk.js'
    import apiHome from '@/api/home.js'
	export default {
		name: 'talkdetail',
		props: ['item'],
		data() {
			return {
				inputValue: '',
				inputFocus: false,
				attentionText: '关注',
				inputHeight: '',
				attentionIndex: this.item.attention,
				commentPlace: '快来说点什么吧',
				showLoadMore: false,
				talkLength: this.item.talkLength,
				headPic: this.item.headPic,
				username: this.item.username,
				userid: this.item.user_id,
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
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId,
				},
				index: 0,
				comment: {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId,
					username: this.$store.state.user.userName,
					talkId: this.item.id
				},
				headUser: this.$store.state.user.userPic,
				modalName: false,
				img: {
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
			switch (this.attentionIndex) {
				case true: 
				 this.attentionText = '已关注' 
				 break
				case false:
				 this.attentionText = '关注' 
				 break
			}
			if(this.$store.state.user.userId === this.userid) {
				 this.attentionText = ''
			}
		},
		methods: {
			stopPenetrate(){
			    return;
			},
			switchAttention() {
				switch (this.attentionIndex) {
					case true: 
					 this.attentionText = '关注' 
					 this.deleteattention()
					 break
					 case false:
					 this.attentionText = '已关注' 
					 this.addattention()
					  break
				}
				this.attentionIndex = ! this.attentionIndex
			},
			addattention() {
				let data = {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId,
				}
				data.vId = this.userid
				apiHome.addAttention(data).then(response => {
					console.log(response)
				})
			},
			deleteattention() {
				let data = {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId,
				}
				data.vId = this.userid
				data._method = 'delete'
				apiHome.deleteAttention(data).then(response => {
					
				})
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			hideModal(e) {
				// this.modalName = null
				this.modalName = false;
				console.log("00000");
			},
			commentFocus(e) {
				//this.inputHeight = 'bottom: '+e.detail.height+'px;'
			},
			commentBlur(e) {
				//this.inputHeight = 'bottom: 0px;'
			},
			showComment() {
				// this.modalName = 'bottomModal'
				this.modalName = true;
				this.comment.talkedId = 0
				this.comment.talkedUsername = ''
				this.isReply = false
			},
			commentIsReply(event, index) {
				console.log(index)
				console.log(this.talks)
				this.index = index
				this.inputFocus = ! this.inputFocus
				console.log(this.inputFocus)
				this.commentPlace = '回复' + event.username
				this.comment.talkedId = event.id
				this.comment.talkedUsername = event.username
				this.isReply = true
			},
			sendComment() {
				let data = this.comment
				data.content = this.inputValue
				if(this.isReply === true) {
					data.content = '@' + this.comment.talkedUsername + ':  ' + data.content
				}
				this.inputValue = ''
				this.commentPlace = ''
				apiTalk.getTalkComment(data).then(response => {
					if (response.code === 200) {
						if (this.isReply === false) {
							this.talks.push({
								username: this.$store.state.user.userName,
								content: data.content,
								talkId: data.talkId,
								id: response.data,
								talks: []
							})
						} else {
							this.talks[this.index].talks.push({
								username: this.$store.state.user.userName,
								content: data.content,
								talkId: data.talkId,
								id: response.data,
								talkedId: data.talkedId,
								talked_username: this.talkedUsername,
								headPic: this.$store.state.user.userPic
							})
							this.isReply = false
						}
					}
				})
			},
			addLike(index) {
				console.log(this.like)
				let data = this.params
				data.talkId = this.item.id
				console.log(this.likeName)
				apiTalk.getTalkGood(this.params).then(response => {
					if (response.code === 200) {
						this.like = !this.like
						if (this.like) {
							this.likes++
							this.likeName.push(this.$store.state.user.userPic);
						} else {
							this.likes--
							this.likeName.splice(this.likeName.indexOf(
								this.$store.state.user.userPic
							), 1);
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			addFavor() {
				let data = this.params
				if(this.collected === true) {
					data._method = 'delete'
					data.collectionId = this.item.collectedId
				} else {
					data.talkId = this.item.id
				}
				apiTalk.getTalkCollected(data).then(response => {
					if (response.code === 200) {
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
	.padding-bottom {
		width: 100%;
		padding: 35rpx 10rpx 35rpx 35rpx;
	}

	.iconMax {
		font-size: 28rpx;
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
		width: 100%;
		height: 15vh;
		position: fixed;
	}

	.tm-size,
	.declare-size {
		font-size: 23rpx;
	}

	.declare-size {
		color: #094DCC;
		font-weight: 400;
	}

	.second-declare {
		margin-left: 52rpx;
	}

	.name-weight {
		font-weight: 900;
	}

	.content-style-declare {
		margin-top: 20rpx;
		font-size: 27rpx;
		text-align: left;
	}

	.cu-modal-my {
		position: absolute;
		top: 10vh;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 1;
		outline: 0;
		text-align: center;
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}
</style>
