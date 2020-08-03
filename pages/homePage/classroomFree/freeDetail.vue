<template>
	<view>
		<view class="cu-list menu card-menu margin-top">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-locationfill  text-orange"></text>
					<text class="">教室地点</text>
				</view>
				<view class="content  text-grey">
					<text>{{classRoom}}</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-timefill text-orange"></text>
					<text class="">查询时间</text>
				</view>
				<view class="content text-grey">
					<text>{{time}}</text>
				</view>
			</view>
		</view>
		<view class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class="text-xl padding">
					<text class="text-black text-bold">{{classRoom}}</text>
				</view>
			</view>
		</view>
		<view class="solids-bottom padding-xs flex align-center class-style-result" v-for="item in data">
			<view class="padding">{{item.jsmc}}</view>
			<view class=" text-center">
				<view class="padding" style="color: green;">容量:{{item.zws}}</view>
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
			    console.log(this.$store.state.global.roomData)
				switch(this.$store.state.global.roomData[1]) {
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
					if(typeof this.$store.state.global.roomData[1] != 'undefined') {
					this.time = this.$store.state.global.roomData[1].match(/\d{2}/g)
					this.time = this.time[0] + '-' +this.time[1] + '节'
					}
					//console.log(this.time.match(/\d{2}/g))
				}
				this.data = this.$store.state.global.roomData[0].jsList
				//this.time = this.$store.state.user.roomData[1]
				this.classRoom = this.$store.state.global.roomData[0].jxl
		},
		onUnload() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
.class-style-result{
	display: flex;
	justify-content: space-between;
	background-color: white;
}
</style>
