<template>
	<view>
		<view class="cu-list menu card-menu margin-top">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-locationfill text-grey"></text>
					<text class="text-grey">教室地点</text>
				</view>
				<view class="content">
					<text>{{classRoom}}</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-timefill text-grey"></text>
					<text class="text-grey">查询时间</text>
				</view>
				<view class="content">
					<text>{{time}}</text>
				</view>
			</view>
		</view>
		<view class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xl padding">
					<text class="text-black text-bold">{{classRoom}}</text>
				</view>
			</view>
		</view>
		<view class="solids-bottom padding-xs flex align-center" v-for="item in data">
			<view class="padding">{{item.jsmc}}</view>
			<view class="flex-sub text-center">
				<view class="padding">容量:{{item.zws}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				time: '',
				classRoom: '',
			}
		},
		created() {
			    console.log(this.$store.state.roomData)
				switch(this.$store.state.roomData[1]) {
					case 'allday':
					this.time = '全天'
					break
					case 'am':
					this.time = '上午'
					break
					case 'pm':
					this.time = '下午'
					break
					case 'night':
					this.time = '晚上'
					break
					case '':
					this.time = ''
					break
					default:
					if(typeof this.$store.state.roomData[1] != 'undefined') {
					this.time = this.$store.state.roomData[1].match(/\d{2}/g)
					this.time = this.time[0] + '-' +this.time[1] + '节'
					}
					//console.log(this.time.match(/\d{2}/g))
				}
				this.data = this.$store.state.roomData[0].jsList
				//this.time = this.$store.state.roomData[1]
				this.classRoom = this.$store.state.roomData[0].jxl
		},
		onUnload() {
			uni.$off('roomData',()=>{
					console.log('关闭监听选择收货地址');
				})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
