<template>
	<view>
		
		<view>
			<view class="cu-bar search bg-white searchAll" style="background-color: #d00000; margin-top: 0upx;">
				<view class="search-form round searchInput" style="margin:0 15upx 0 10upx;">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn  round">搜索</button>
				</view>
			</view>
		</view>
		<view class="">
		  <swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		   :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		   indicator-active-color="#0081ff">
		  	<swiper-item v-for="(item ,index) in imgData" :key="index" :class="cardCur==index?'cur':''" mode="aspectFill" style="width:100%">
		  		<!-- <view class="swiper-item" style="width:100%"> -->
		  			<image :src="item.url" mode="widthFix"></image>
		  			<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
		  		<!-- </view> -->
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
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" 
					v-for="(item,index) in hot_threeTab" :key="index" @tap="tabSelect" :data-id="index">
					
						<!-- <view @click="item.tab_click"> -->
							{{item.name}}
						
					</view>
				</view>
			</scroll-view>
<!-- 		<view class="tagFlex">
			<uni-tag text="工大说"  :clickTag='selectStatus == 1'   @click="bindClickTalk" inverted="true"></uni-tag>
			<uni-tag text="发布/求职"  :clickTag='selectStatus == 2' @click="bindClickRealease"  inverted="true"></uni-tag>
			<uni-tag text="设备交易"   :clickTag='selectStatus == 3' @click="bindClickEquip"></uni-tag>
		</view> -->
		<view v-if="TabCur==0">
		<talk :items="items"></talk>
		<view class="cu-load bg-white" :class="!isLoad?'loading':'over'"></view>
		</view>
		<view v-if="TabCur==1" >
			<talk :items="items"></talk>
		</view>
		<view v-if="TabCur==2" >
			<talk :items="items"></talk>
		</view>
	</view>
</template>
<style scoped>
	.ser_color{
		background-color: #d00000;
		opacity: 0.8;
		color:white;
	}
</style>
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
				TabCur: 0,
				scrollLeft: 0,
				hot_threeTab:[
					{
						name:'热门说说',
					
						
					},{
						name:'关注',
						
					},{
						name:'最新',
						
						},
					],
				showLoadMore: false,
				imgData: [],
				loadMoreText: "暂无更多",
				showInput: false,
				input_placeholder: '快来说点什么吧', 
				items: [],
				index: '',
				indexUser: '',
				params: {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
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
						cuIcon: 'upstage',
						color: 'orange',
						name: '成绩查询',
						url: "/pages/homePage/gradeInquire/gradeInquire"
					}, {
						cuIcon: 'form',
						color: 'yellow',
						name: '课程表',
						url: "/pages/homePage/classSchedulePage/classSchedulePage"
					}, {
						cuIcon: 'punch',
						color: 'olive',
						name: '空闲教室',
						url: "/pages/homePage/classroomFree/classroomFree"
					},{
						cuIcon: 'searchlist',
						color: 'mauve',
						name: '考试安排',
						url: "/pages/homePage/testInquire/testInquire"
					}, {
						cuIcon: 'profile',
						color: 'cyan',
						name: '发布/求职',
						url: "/pages/homePage/releaseJobPage/releaseJobPage"
					}, {
						cuIcon: 'recharge',
						color: 'blue',
						name: '设备交易',
						url:  "/pages/homePage/equipmentTradePage/equipmentTradePage"
					}, {
						cuIcon: 'discoverfill',
						color: 'purple',
						name: '学习资料',
						url: "/pages/homePage/socialActivitypage/socialActivitypage"
					}]
			}
		},
		onLoad: function (){
			if(this.imgData.length === 0) {
			 let imgInteravl = setInterval(() => {
					this.imgData = this.$store.state.user.banner
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
			switch (this.TabCur) {
				case '0': 
				    this.bindClickTalk()
					break
				case '1':
				    this.bindClickRealease()
					break
				case '2': 
				    this.bindClickEquip()
				    break
			}
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		created() {
			console.log(this.$store.state.user)
			this.bindClickTalk('0')
		},
		methods: {
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
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
			bindClickTalk(event) {
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
				this.TabCur = 0
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
						console.log(num)
						this.items[i].talkLength = num
						this.items[i].userId = this.$store.state.user.userId
					}
					///console.log(this.items)
				}).catch(err => {
					
				})
			},
			bindClickRealease() {
				this.TabCur = 1
			},
			bindClickEquip() {
				this.TabCur = 2
			},
			change(e) {
			   this.current = e.detail.current;
			}
		} 
	}
</script>

<style scoped>
.box {
		margin: 0 0 20upx 0;
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
	background-color: white;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	justify-content: flex-start;
} 
.tagFlex uni-tag{
	width:33.3%;
	margin:10px 0px;
}

</style>

