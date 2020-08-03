<template>
	<view class="time-table width-100-bfb flex flex-direction" style="height: 100vh">
		<view class="">
			<view class="cu-bar bg-white text-week">
				<view class="text-picker">
				<text class="icon-start cuIcon-back"  size="30" @click="previousWeek"></text>
				<picker @change="PickerChange" :value="indexWeek" :range="pickerWeek" class="picker-item">
					<view class="header-items">
					<view class="picker">
						{{indexWeek>-1?pickerWeek[indexWeek]:''}}
					</view>
				  </view>
				</picker>
				<text class="icon-end cuIcon-right" size="30" @click="nextWeek"></text>
			     </view>
			</view>
			<view class="flex text-center page-bg-white algin-week">
				<view class="bg-grey  dashed-bottom  align-time">日期</view>
				<view class="cu-item flex-sub bg-white algin-head" v-for="(item, index) in timeList" :key="index" @click="tabSelect" :data-id="index">
					<view class="margin-tb-xs text-lg" style="color: #B1B1B1;">{{ item.week }}</view>
					<view class="text-bold text-lg time radio-circle" style="color: #B1B1B1; font-size: 30rpx;" :class="item.time === '今' ? 'text-white  radio-circle bg-black' : ''">{{ item.time }}</view>
					<text class="" style="font-size: 80rpx;line-height: 20rpx;" v-if="index + 1 === week">·</text>
				</view>
			</view>
			<view class="class-style" v-for="item in dataList" :style="{background: item.color,marginTop: (item.time-1)*200+'rpx', marginLeft: (item.weekTime-1)*90+103+'rpx'}">
				<view>
					{{item.name}}
				</view>
				
			</view>
			<view class="bg-white">
				<view class="flex solid-bottom align-center align-class" v-for="item in classList">
					<view class="bg-grey  dashed-bottom   align-self">{{item}}</view>
					<view class="bg-white border-class"></view>
					<view class="bg-white  border-class"></view>
					<view class="bg-white  border-class"></view>
					<view class="bg-white  border-class"></view>
					<view class="bg-white  border-class"></view>
					<view class="bg-white  border-class"></view>
					<view class="bg-white  border-class"></view>
				</view>
			</view>
		</view>
			
	</view>
</template>

<script>
import apiHome from '@/api/home.js'
const oneDayTimeStamp = 86400000;
import {formatDayTime} from '@/common/common.js'
const now = new Date();
const todayDayTimeStamp = now.getTime(); 
const getDay = now.getDay(); 
const todayDate = now.getDate()
const todayMonth = now.getMonth()+1
export default {
	data() {
	  return {
		 todayTime: '',
		 classList: ['1','2','3','4','5','6','7','8','9','10'],
		 pickerWeek: [],
		 dataList: [],
		 indexWeek: '',
		 timeList: [
		 	{
		 		time: '1',
		 		week: '周一'
		 	},
		 	{
		 		time: '2',
		 		week: '周二'
		 	},
		 	{
		 		time: '3',
		 		week: '周三'
		 	},
		 	{
		 		time: '4',
		 		week: '周四'
		 	},
		 	{
		 		time: '5',
		 		week: '周五'
		 	},
		 	{
		 		time: '6',
		 		week: '周六'
		 	},
		 	{
		 		time: '7',
		 		week: '周日'
		 	}
		 ],
		 weekInfo: [],
		 weekIndex: '',
		 startTime: '',
		 endTime: '',
		 yearName: '',
		 todayDate: '',
		 todayMonth: '',
		 todayWeek: '',
		 num: 0,
		 time: now.toISOString().slice(0, 10),
		 mondayDayTimeStamp: 0, 
		 sundayDayTimeStamp: 0, 
		 colorArrays: ["grey","green"],
	     params: {
			 token: this.$store.state.user.token
		 }
	   }
	},
	
	created() {
		uni.showNavigationBarLoading()
		this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1); // 星期一的时间戳
		this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp; //星期天的时间戳
		for(let i=0; i<30; i++) {
			this.pickerWeek[i] = '第' + (i+1) + '周'
		}
		this.dayList();
		this.getTodayInfo()
	},
	methods: {
		 PickerChange(e) {
			this.indexWeek = parseInt(e.detail.value)
			console.log(this.pickerWeek[this.indexWeek])
			console.log(this.indexWeek+1 > this.weekIndex)
			if(this.indexWeek+1 > this.weekIndex) {
				this.num += this.indexWeek+1 - this.weekIndex
				console.log(this.num, this.indexWeek+1 - this.weekIndex)
				if (this.num <= 0) {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(this.num)); // 下星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(this.num)); //下星期天的时间戳
				} else {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num); // 下星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num); //下星期天的时间戳
				}
			} else {
				this.num += this.indexWeek+1 - this.weekIndex
				console.log(this.num, this.indexWeek+1 - this.weekIndex)
				if (this.num >= 0) {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num); // 上星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num); //上星期天的时间戳
				} else {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(this.num)); // 上星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(this.num)); //上星期天的时间戳
				}
			}
			this.weekIndex = this.indexWeek+1
			this.dayList()
		    this.getClassSchedule()
		 },
		 async previousWeek() {
		 	console.log('上一周');
		 	//this.week = 1;
			this.indexWeek -= 1
			this.weekIndex = this.indexWeek+1
		 	this.num = this.num - 1;
		 	if (this.num === 0) this.num === -1;
		 	if (this.num >= 0) {
		 		this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num); // 上星期一的时间戳
		 		this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num); //上星期天的时间戳
		 	} else {
		 		this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(this.num)); // 上星期一的时间戳
		 		this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(this.num)); //上星期天的时间戳
		 	}
		 	this.dayList();
		 	this.time = formatDayTime(this.mondayDayTimeStamp);
			this.getClassSchedule()
		 },
		 async nextWeek() {
		 	//console.log('下一周');
		 	//this.week = 1;
			this.indexWeek += 1
			this.weekIndex = this.indexWeek+1
		 	this.num = this.num + 1;
			console.log(this.num)
		 	if (this.num === 0) this.num === 1;
		 	if (this.num <= 0) {
		 		this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(this.num)); // 下星期一的时间戳
		 		this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(this.num)); //下星期天的时间戳
		 	} else {
		 		this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num); // 下星期一的时间戳
		 		this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num); //下星期天的时间戳
		 	}
		 	this.dayList();
		 	this.time = formatDayTime(this.mondayDayTimeStamp);
			this.getClassSchedule()
		 },
		 getTodayInfo() {
			let data = this.params
			data.currDate = todayDate
			//data.currDate = '2020-04-10'
			return new Promise((resolve, reject) => {
			apiHome.getTime(data).then(response => {
				uni.hideNavigationBarLoading()
				this.weekIndex = response.data.zc
				this.indexWeek = this.weekIndex-1
				this.startTime = response.data.s_time
				this.endTime = response.data.endTime
				this.yearName = response.data.xnxqh
				data.week = response.data.zc
				data.time = response.data.xnxqh
			apiHome.getClassSchedule(data).then(response => {
			this.dataList = response.data
			this.dataList = this.dataChange()
			})
			})
			})
		},
		async getClassSchedule() {
			let data =  {
				token: this.$store.state.user.token
			}
			data.week = this.indexWeek+1
			data.time = this.yearName
			apiHome.getClassSchedule(data).then(response => {
			this.dataList = response.data
			this.dataList = this.dataChange()
			console.log(this.dataList)
			})
		},
		dayList() {
			// 获取本周日期
			for (let i = 0; i < 7; i++) {
				if (this.num === 0) {
					i + 1 === getDay ? (this.timeList[i].time = '今') : (this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8));
				} else {
					this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8);
				}
			}
		},
		dataChange() {
			for(let i=0; i<this.dataList.length; i++) {
				
				switch (this.dataList[i].sjbz) {
					case '0':
					this.dataList[i].color = this.colorArrays[1]
					break
					case '1':
					if((this.indexWeek+1)%2 === 0) {
						this.dataList[i].color = this.colorArrays[0]
					} else {
						this.dataList[i].color = this.colorArrays[1]
					}
					break
					case '2':
					if((this.indexWeek+1)%2 === 0) {
						this.dataList[i].color = this.colorArrays[1]
					} else {
						this.dataList[i].color = this.colorArrays[0]
					}
					break
				}
				switch (this.dataList[i].kssj) {
					case "08:00":
					this.dataList[i].time = 1
					break
					case "10:00":
					this.dataList[i].time = 2
					break
					case "14:00":
					this.dataList[i].time = 3
					break
					case "16:00": 
					this.dataList[i].time = 4
					break
					case "19:00":
					this.dataList[i].time = 5
					break
				}
				switch (this.dataList[i].kcsj.split('')[0]) {
					case "1":
					this.dataList[i].weekTime = 1
					break
					case "2":
					this.dataList[i].weekTime = 2
					break
					case "3":
					this.dataList[i].weekTime = 3
					break
					case "4": 
					this.dataList[i].weekTime = 4
					break
					case "5":
					this.dataList[i].weekTime = 5
					break
					case "6":
					this.dataList[i].weekTime = 6
					break
					case "7":
					this.dataList[i].weekTime = 7
					break
				}
				if(this.dataList[i].jsmc !== null) {
				this.dataList[i].name = this.dataList[i].kcmc + '(' + this.dataList[i].jsxm  + ')' + '@' + this.dataList[i].jsmc
			    } else {
					this.dataList[i].name = this.dataList[i].kcmc + '(' + this.dataList[i].jsxm  + ')'
				}
			}
			return this.dataList
		}
	}
}
</script>

<style lang="scss">
.time-table {
	.content {
		background-color: #ffffff;
	}

	.title {
		line-height: 76rpx !important;
	}
	.time {
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		margin: 0 auto;
	}
}
.width-100-bfb {
	width: 100%;
}
.border-class {
	height: 100rpx;
	width: 90rpx;
	border-style: none none dashed none; 
	border-width: 1rpx;
	align-self: center;
	margin: 10rpx 5rpx;
}
.header-items {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.algin-head {
	height: 130rpx;
	width: 140rpx;
}
.algin-week {
	height: 130rpx;
}
.align-class {
	height: 100rpx;
}
.align-time {
   height: 130rpx;
   align-self: center;
   line-height: 130rpx;
   width: 98rpx;
}
.align-self {
	height: 100rpx;
	align-self: center;
	line-height: 100rpx;
	text-align: center;
	width: 103rpx;
}
.text-primary {
	color: #409eff;
}

.text-picker {
	font-size: 50rpx;
    width: 60%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.icon-start {
	align-self: center;
}
.icon-end {
	align-self: center;
}
.picker-item {
	width: 35%;
	margin: 0 auto;
}
.class-tr {
	text-align: center;
}
.class-style {
	position: absolute;
	height: 190rpx;
	width: 85rpx;
	z-index: 100;
	font-size: 22rpx;
	border-radius: 5rpx;
}
.margin-bottom-sm {
	margin-bottom: 20rpx !important;
}

.padding-bottom-xs {
	padding-bottom: 10rpx !important;
}
.margin-bottom-xs {
	margin-bottom: 5px !important;
}
.cu-shadow {
	box-shadow: rgba(43, 111, 179, 0.15) 0px 0px 8px 0px;
}
.height-50 {
	height: 100rpx !important;
}
.padding-right-unset {
	padding-right: unset !important;
}
.radio-circle {
	border-radius: 100%;
}
.page-bg-primary {
	background: #409eff !important;
	color: #ffffff;
}
.justify-between {
	justify-content: space-between !important;
}

</style>
