<template>
	<view style="background-color: white;margin:14rpx">
		<view class="headerSelect">
			<picker class="headerItems" mode="selector" :value="index" :range="arrayPicker" @change="getGrade">
				<view class="headerItems">
				<view>{{arrayPicker[index]}}</view>
				<uni-icons class="" type="arrowdown" size="15"></uni-icons>
				</view>
			</picker>
		</view>
		<view class="headerUser">
			<view class="userText">
				<text class="cuIcon-upstage text-orange"></text>
				<text>成绩单</text>
			</view>
			<view class="userInfo">
				<text>姓名:{{userName}}</text>
				<text>学号:{{userSno}}</text>
			</view>
		</view>
		<view class="">
			<z-table :emptyText="emptyText" :columns="columns" :tableData = "tableData"></z-table>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import zTable  from "@/components/z-table/z-table.vue"
	import apiHome from '@/api/home.js'
	export default {
		components: {
			uniIcons,
			zTable
		},
		data() {
			return {
				arrayPicker: [],
				index: '0',
				userName: this.$store.state.user.userHutName,
				userSno:this.$store.state.user.userSno,
				params: {
					token: this.$store.state.user.token
				},
				tableData: [],
				emptyText: '暂无数据',
				columns: [{
					title: "课程",
					key: "kcmc",
					width: 350
				},
				{
					title: "课程性质",
					key: "kcxzmc",
					width: 200
				},
				{
					title: "学分",
					key: "xf",
					width: 100
				},{
					title: "成绩",
					key: "zcj",
					width: 100
				},
			    ]
			}
		},
		created() {
			let startYear = this.$store.state.user.userStartYear
			let temp
			startYear++
			startYear--
			for(let i=0; i<3 ;i++) {
				for(let j=0; j<2;j++) {
					switch (j) {
						case 0:
						temp = '第一学期'
						break
						case 1:
						temp = '第二学期'
						break
					}
					let startYearTemp = startYear+ 1
					//console.log(startYearTemp)
					this.arrayPicker.push(startYear + '-' + startYearTemp + '学年  ' + temp)
				}
				startYear++
			}
			let event = {
				detail: {
					value: 0
				}
			}
			this.getGrade(event)
		},
		methods: {
			getGrade(event) {
				this.index = event.detail.value
				let index = event.detail.value
				let temp = 1
				if(index%2 === 0 || index === 0) {
				    temp = 1 
				} else {
					temp = 2
				}
				let data = this.params
				data.time = this.arrayPicker[index].match(/\d+[-]\d+/g) + '-' + temp
				//console.log(data)
				//console.log(event.detail.value)
				apiHome.getGrade(data).then(response =>{
					this.tableData = response.data
					console.log(response)
				})
			}
		}
	}
</script>

<style>
.headerSelect {
	width:100%;
	margin:30rpx;
	font-weight:500;
	height:70rpx;
}
.headerItems{
	padding-top:17rpx;
	display: flex;
	flex-direction: row;
}

.headerUser {
	display: flex;
	flex-direction: column;
}
.userText {
	width:100%;
	text-align: center;
	font-size: 40rpx;
}
.userInfo{
	display: flex;
	justify-content: space-between;
}
.userInfo text{
	font-size: 30rpx;
	margin:30rpx;
}
</style>
