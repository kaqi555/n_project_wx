<template>
	<view class="">
		
		<view class="box">
			<view class="cu-bar search bg-white searchAll">
				<view class="search-form round searchInput">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round">搜索</button>
				</view>
			</view>
		</view>
		
		<view class="">
		   <swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		    :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		    indicator-active-color="#0081ff">
		   	<swiper-item v-for="(item ,index) in imgData" :key="index" :class="cardCur==index?'cur':''">
		   		<view class="swiper-item">
		   			<image :src="item.url" mode="aspectFill"></image>
		   			<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
		   		</view>
		   	</swiper-item>
		   </swiper>
		</view>
		
			<view class="buttonModal" :class="modalName=='gridModal'?'show':''">
				<view class="cu-list grid gridRow" :class="['col-' + gridCol,gridBorder?'':'no-border']">
					<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="goNewPage(item)" v-if="index<gridCol*2">
						<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						</view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		<view class="tagFlex">
			<uni-tag text="工大说"  :clickTag='selectStatus == 1'   @click="bindClickTalk" inverted="true"></uni-tag>
			<uni-tag text="发布/求职"  :clickTag='selectStatus == 2' @click="bindClickRealease"  inverted="true"></uni-tag>
			<uni-tag text="设备交易"   :clickTag='selectStatus == 3' @click="bindClickEquip"></uni-tag>
		</view>
		<view>
		<talk :items="items"></talk>
		<view class="cu-load bg-white" :class="!isLoad?'loading':'over'"></view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	var domModule = weex.requireModule('dom');
	domModule.addRule('fontFace', {
	    'fontFamily': "uniicons",
	    'src': "url('/static/uni.ttf')"
	});
	// #endif
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import talk from "@/components/talk/talk.vue"
	import apiTalk from "@/api/talk.js"
	
	export default {
		components: {
			uniSwiperDot,
			uniTag,
			talk,
		},
		data() {
			return {
				
				showLoadMore: false,
				imgData: [],
				loadMoreText: "暂无更多",
				showInput: false,
				input_placeholder: '快来说点什么吧', 
				selectStatus: '1',
				items: [],
				index: '',
				indexUser: '',
				params: {
					token: this.$store.state.token,
					id: this.$store.state.userId
				},
				isLoad: false,
				modalName: 'gridModal',
				gridCol: 4,
				gridBorder: false,
				current: '0',
				mode: 'dot',
				dotStyle: false,
				cuIconList: [{
					cuIcon: 'cardboardfill',
						color: 'red',
						name: '工大说',
						url: "/pages/homePage/talkPage/talkPage"
					}, {
						cuIcon: 'recordfill',
						color: 'orange',
						name: '成绩查询',
						url: "/pages/homePage/gradeInquire/gradeInquire"
					}, {
						cuIcon: 'picfill',
						color: 'yellow',
						name: '课程表',
						url: "/pages/homePage/classSchedulePage/classSchedulePage"
					}, {
						cuIcon: 'noticefill',
						color: 'olive',
						name: '空闲教室',
						url: "/pages/homePage/classroomFree/classroomFree"
					}, {
						cuIcon: 'upstagefill',
						color: 'cyan',
						name: '发布/求职',
						url: "/pages/homePage/releaseJobPage/releaseJobPage"
					}, {
						cuIcon: 'clothesfill',
						color: 'blue',
						name: '设备交易',
						url:  "/pages/homePage/equipmentTradePage/equipmentTradePage"
					}, {
						cuIcon: 'discoverfill',
						color: 'purple',
						name: '学习资料',
						url: "/pages/homePage/socialActivitypage/socialActivitypage"
					}, {
						cuIcon: 'questionfill',
						color: 'mauve',
						name: '社团活动'
					}]
			}
		},
		onLoad: function (){
			if(this.imgData.length === 0) {
			 let imgInteravl = setInterval(() => {
					this.imgData = this.$store.state.banner
					if(this.imgData.length !== 0) {
						clearInterval(imgInteravl)
					}
				}, 1000
				)
			}
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.showLoadMore = false;
		},
		onReachBottom() { //监听上拉触底事件
			this.isLoad = true;
		},
		onPullDownRefresh() { //监听下拉刷新动作
			switch (this.selectStatus) {
				case '1': 
				    this.bindClickTalk()
					break
				case '2':
				    this.bindClickRealease()
					break
				case '3': 
				    this.bindClickEquip()
				    break
			}
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		created() {
			this.bindClickTalk()
		},
		methods: {
			search(value) {
				console.log(1)
			},
			cardSwiper(event) {
				this.cardCur = event.detail.current
			},
			goNewPage(event) {
			uni.navigateTo({
				url: event.url
			})
			},
			bindClickTalk() {
				this.selectStatus = 1
				function flatten(arr,id) {
					var res = [];
				    for (let i = 0; i < arr.length; i++) {
				      if (arr[i].talks.length != 0) {
				        res = res.concat(flatten(arr[i].talks,id));
				      }
					  if(arr[i].talked_username !== null) {
					  arr[i].username = arr[i].username
					  }
					  arr[i].talkId = id;
				      res.push(arr[i]);
				    }
				    return res;
				 }
				apiTalk.getHotTalk(this.params).then(response => {
					this.items = response.data
					for(let i=0; i<this.items.length; i++) {
						let num = 0
						if(this.items[i].pics) {
						this.items[i].pics = this.items[i].pics.split(',')
					    }
					    num += this.items[i].talks.length
						for(let j=0; j<this.items[i].talks.length; j++) {
							num += this.items[i].talks[j].talks.length
							flatten(this.items[i].talks[j].talks)
						}
						this.items[i].talkLength = num
						this.items[i].userId = this.$store.state.userId
					}
					///console.log(this.items)
				}).catch(err => {
					
				})
			},
			bindClickRealease() {
				this.selectStatus = 2
			},
			bindClickEquip() {
				this.selectStatus = 3
			},
			change(e) {
			   this.current = e.detail.current;
			}
		} 
	}
</script>

<style scoped>
.box {
		margin: 20upx 0;
}
.box view.cu-bar {
	margin-top: 20upx;
}
.searchAll {
	flex-direction: row;
}
.searchInput {
	width: 90%;
	flex-direction: row;
	margin: 0 auto;
}
.buttonModal {
	position: relative;
	border: none;
}
.gridRow {
	flex-direction: row;
}
.imgButton {
	width: 120rpx;
	height: 120rpx;
}
.talkAll {
	width: 100%;
	margin: 0 auto;
}
.tagFlex {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	justify-content: flex-start;
}
</style>
