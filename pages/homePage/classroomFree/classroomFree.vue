<template>
	<view>
		<view class="cu-form-group">
			<view class="title">日期选择</view>
			<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">校区</view>
			<picker @change="PickerChangeCollege" :value="indexCollege" :range="pickerCollege">
				<view class="picker">
					{{indexCollege>-1?pickerCollege[indexCollege]:''}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">教学楼</view>
			<picker @change="PickerChangeRoom" :value="indexRoom" :range="pickerRomDetail">
				<view class="picker">
					{{indexRoom>-1?pickerRomDetail[indexRoom]:''}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">开始节次</view>
			<picker @change="PickerChangeStart" :value="indexStart" :range="pickerStart">
				<view class="picker">
					{{indexStart>-1?pickerStart[indexStart]:'请选择开始节次'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">结束节次</view>
			<picker @change="PickerChangeEnd" :value="indexEnd" :range="pickerEnd">
				<view class="picker">
					{{indexEnd>-1?pickerEnd[indexEnd]:'请选择结束节次'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">教室人数</view>
			<picker @change="PickerChangeNumber" :value="indexNumber" :range="pickerNumber">
				<view class="picker">
					{{indexNumber>-1?pickerNumber[indexNumber]:'请选择人数'}}
				</view>
			</picker>
		</view>
		<view class="padding flex flex-direction">
		<button class="cu-btn bg-red margin-tb-sm lg" @click="inquireRoom">查询</button>
		</view>
		<view class="grid col-3 padding-lr">
			<view class="margin-tb-sm text-center" v-for="(item,index) in buttonList" :key="index" v-if="item.name!='white'">
				<button @click="selectTime(item)" class="cu-btn round  lg" :class="['bg-' + item.name , shadow?'shadow':'']">{{item.title}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import apiHome from '@/api/home.js'
	export default {
		data() {
			return {
				date: '',
				pickerCollege: ['河东校区', '河西校区', '醴陵校区'],
				pickerRom: [],
				pickerRomDetail: [],
				pickerStart: ['01','02','03','04','05','06','07','08','09','10'],
				pickerEnd: ['01','02','03','04','05','06','07','08','09','10'],
				pickerNumber: ['30', '30-40', '40-50', '60'],
				indexNumber: -1,
				time: '',
				indexCollege: 0,
				indexRoom: 0,
				indexStart: -1,
				indexEnd: -1,
				xqid: '1',
				jxlid: '',
				classroomNumber: '',
				buttonList: [{
					name: 'bg-white',
					title: '下午',
					time: 'pm'
				},{
					name: 'bg-white',
					title: '晚上',
					time: 'night'
				},{
					name: 'bg-white',
					title: '上午',
					time: 'am'
				},{
					name: 'bg-white',
					title: '全天',
					time: 'allday'
				}],
				bordersize: '',
				params: {
					token: '41648a341044861e4a04106cb1e42f62'
				}
			}
		},
		created() {
			let date = new Date()
			this.date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
		    let event = {
				detail: {
					value: 0
				}
			}
			this.PickerChangeCollege(event)
		},
		methods: {
			DateChange(e) {
				this.date = e.detail.value
			},
			selectTime(e) {
				this.time = e.time
				this.inquireRoom()
			},
			PickerChangeCollege(e) {
				this.indexCollege = e.detail.value
				console.log(this.indexCollege)
				switch (this.indexCollege) {
					case '0':
					this.xqid = '1'
					break
					case '1':
					this.xqid = '2'
					break
					case '2':
					this.xqid = 'CA700D1896D84064AE6F6168455A6885'
					break
				}
				let data = this.params
				data.xqid = this.xqid
				apiHome.getClass(data).then(response => {
					this.pickerRom = response.data
					this.pickerRomDetail = []
					for(let i=0; i<response.data.length; i++) {
					this.pickerRomDetail.push(response.data[i].jzwmc)
					}
				})
			},
			PickerChangeRoom(e) {
				this.indexRoom = e.detail.value
			},
			PickerChangeStart(e) {
				this.indexStart = e.detail.value
				this.time = this.pickerStart[this.indexStart] + this.pickerEnd[this.indexEnd]
			},
			PickerChangeEnd(e) {
				this.indexEnd = e.detail.value
				this.time = this.pickerStart[this.indexStart] + this.pickerEnd[this.indexEnd]
			},
			PickerChangeNumber(e) {
				this.indexNumber = e.detail.value
			},
			inquireRoom() {
				let data = this.params
				data.time = this.date
				data.xqid = this.xqid
				data.jxlid = this.pickerRom[this.indexRoom].jzwid
				if(this.time !== '') {
				data.state = this.time
				}else {
				 data.state = 'allday'
				}
				if(this.indexNumber !== -1) {
				data.classroomNumber = this.pickerNumber[this.indexNumber]
				}
				this.$store.dispatch('getRoom', data).then(response => {
					uni.navigateTo({
						url: '/pages/homePage/classroomFree/freeDetail'
					})	
				})
			}
		}
	}
</script>

<style>

</style>
