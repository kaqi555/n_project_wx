<template>
	<view>
		<view class="">
			<view @click="showModalBack" class="bg-img padding-top-xl flex align-end"  :style="{height: 270+'rpx',backgroundImage: 'url(' + info.bgPic + ')'}">
			</view>
		</view>
		
		<view class="">
			<view class="cu-card dynamic no-card">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view @click="showModalHead" class="cu-avatar xl round" :style="{backgroundImage: 'url(' + info.headPic + ')'}">
							</view>
							<view class="content flex-sub margin-left-xl">
								<view>
								{{info.username}}
								<view class='cu-tag bg-blue'>学生</view>
								</view>
								<view>{{college}}</view>
								<view>{{classname}}</view>
							</view>
						</view>
					</view>
					<view class="padding-xs flex align-center">
						<view class="flex-sub">
							<view class="solid-bottom text-xl padding">
								<text class="text-gray">{{info.word}}</text>
							</view>
						</view>
					</view>
					<view class="solids-bottom padding-xs flex align-center">
						<view class="flex-sub">
							<view class="solid-bottom text-xl padding">
								<text class="text-black text-bold" @click="pageNextAtten">{{attention.length + '关注'}}</text>
								<text class="text-black text-bold margin-left-xs" @click="pageNextFan">{{fans.length + '粉丝'}}</text>
							</view>
						</view>
					</view>
					<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
					<view class="cu-item arrow" @click="pageNextInfo">
						<view class="content">
							<text class="cuIcon-warn text-green"></text>
							<text class="text-grey">基础信息</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">查看个人信息</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="cuIcon-warn text-green"></text>
							<text class="text-grey">我的相关</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">查看收藏</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="cuIcon-warn text-green"></text>
							<text class="text-grey">反馈意见</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm"></text>
						</view>
					</view>
					</view>
					<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
						<view class="cu-item margin-left-xs" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
							{{tabList[index]}}
						</view>
					</scroll-view>
			    </view>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='backgroundModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
			<view class="cu-list menu text-center">
				<view v-for="(item,index) in actionBackground" class="cu-item padding flex flex-direction" :key="index">
					<button class="cu-btn bg-white margin-tb-sm "  @tap="switchBackground(index)"
					 :data-value="item.value"> {{item.name}}
					</button>
				</view>
				<view class="padding flex flex-direction cu-item">
					<button class="cu-btn bg-white margin-tb-sm lg" @click="hideModal">取消</button>
				</view>
			</view>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='headModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
			<view class="cu-list menu text-center">
				<view v-for="(item,index) in actionHead" class="cu-item padding flex flex-direction" :key="index">
					<button class="cu-btn bg-white margin-tb-sm "  @tap="switchHead(index)"
					 :data-value="item.value"> {{item.name}}
					</button>
				</view>
				<view class="padding flex flex-direction cu-item">
					<button class="cu-btn bg-white margin-tb-sm lg" @click="hideModal">取消</button>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'personalinfo',
		props: ['info', 'fans', 'attention'],
		data() {
			return {
				TabCur: '0',
				college: this.$store.state.user.userCollege,
				classname: this.$store.state.user.userClassName,
				tabList: [
					'我的说说',
					'图片'
				],
				image: [],
				actionBackground: [{
					value: 0,
					name: '查看背景'
				}, {
					value: 1,
					name: '更换背景图'
				}, {
					value: 2,
					name: '保存图片'
				},
				],
				actionHead: [{
					value: 0,
					name: '查看头像'
				}, {
					value: 1,
					name: '更换头像'
				},
				{
					value: 2,
					name: '编辑个人信息'
				},
				{
					value: 3,
					name: '保存图片'
				},
				],
				head: false,
				background: false,
				modalName: null
			};
		},
		created() {
			
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			showModalBack() {
				this.modalName = 'backgroundModal'
			},
			hideModal(e) {
				this.modalName = null
			},
			showModalHead(e) {
				this.modalName = 'headModal'
			},
			switchBackground(e) {
				switch (e) {
					case 0: 
					this.previewImage(this.info.bgPic)
					break
					case 1:
					this.background = true
					this.head = false
					this.chooserImage()
					break
					case 2:
					this.saveImage(this.info.bgPic)
					break
				}
			},
			switchHead(e) {
				switch (e) {
					case 0: 
					this.previewImage(this.info.headPic)
					break
					case 1:
					this.background = false
					this.head = true
					this.chooserImage()
					break
					case 3:
					this.saveImage(this.info.headPic)
					break
				}
			},
			previewImage(imageList) {
				 this.hideModal()	
				let imgUrl = [imageList]
				console.log(imgUrl)
				uni.previewImage({
					urls: imgUrl,
					success: function(data) {
			       	                  
					},
				});
			},
			chooserImage(imageList) {
				this.hideModal()
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success:  (res) => {
						uni.uploadFile({
						     url: 'https://www.hut-idea.top/resources/upload', //仅为示例，非真实的接口地址
						     filePath: res.tempFilePaths[0],
						     name: 'file',
						    success: (uploadFileRes) => {
								uploadFileRes.data = JSON.parse(uploadFileRes.data).data
								if(this.background === true) {
								this.$emit('changeBgpic', uploadFileRes.data)
								} else {
								this.$emit('changeHeadPic', uploadFileRes.data)
								}
						     }
						});				 
				    }
				});
			},
			saveImage(imageList) {
				this.hideModal()
				uni.downloadFile({
				    url: imageList, 
				    success: (res) => {
				        if (res.statusCode === 200) {
						console.log(res)
				          uni.saveImageToPhotosAlbum({
				             filePath: res.tempFilePath,
				              success: function () {
				                
				             }
				         });
				         }
				    }
				});
			},
			pageNextAtten() {
				uni.navigateTo({
				    url: '/pages/PersonalPage/personalAttention/personalAttention'
				});
			},
			pageNextFan() {
				uni.navigateTo({
				    url: '/pages/PersonalPage/personalFans/personalFans'
				});
			},
			pageNextInfo() {
				uni.navigateTo({
				    url: '/pages/PersonalPage/personalInfo/personalInfo'
				});
			}
		}
		
	}
</script>

<style>

</style>
