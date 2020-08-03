<template>
	<view>
		<view class="" v-for="talk in talks" >
	       <talk :items="talk"></talk>
	       <view class="cu-load bg-white" :class="!isLoad?'loading':'over'" v-if="showLoad"></view>
		</view>
	</view>
</template>

<script>
	import talk from "@/components/talk/talk.vue"
	import apiTalk from "@/api/talk.js"
	import chatInput from '@/components/im-chat/chatinput.vue'; 
	export default {
		components: {
			talk,
		},
		data() {
			return {
				isLoad: false,
				imgData: [],
				showLoad: true,
				showInput: false,
				input_placeholder: '快来说点什么吧', 
				talks: [],
				temp: [],
				page: 1,
				params: {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				},
			}
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() { //监听上拉触底事件
		    this.showLoad = true
		    this.getNewTalks()
			this.showLoad = false
			//this.isLoad = true;
		},
		onPullDownRefresh() { //监听下拉刷新动作
		    this.page = 1
			this.getNewTalks()
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		created() {
			this.getNewTalks()
		},
		methods: {
			getNewTalks() {
				let data = this.params
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
				data.type = '0'
				apiTalk.getNewTalks(data, this.page).then(response => {
					this.temp = response.data.talks
					this.page += 1
					for(let i=0; i<this.temp.length; i++) {
						let num = 0
						if(this.temp[i].pics) {
						this.temp[i].pics = this.temp[i].pics.split(',')
						}
						num += this.temp[i].talks.length
						for(let j=0; j<this.temp[i].talks.length; j++) {
							num += this.temp[i].talks[j].talks.length
							flatten(this.temp[i].talks[j].talks)
						}
						this.temp[i].talkLength = num
						this.temp[i].userId = this.$store.state.user.userId
					}
					this.talks.push(this.temp)
				}).catch(err => {
					
				})
			}
		}
	}
</script>

<style>
@import '@/common/uni.css';
@import url('@/common/talk/index.css');
</style>
