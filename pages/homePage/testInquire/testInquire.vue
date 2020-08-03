<template>
	<view>
		
		<view class="" v-if="testData.length ===  0">
			<view class="flex justify-center imgNull" style="margin-top: 300rpx;">
						<image
							src="../../../static/img/not.png"
							mode=""
							
							class=""
							style="width: 100px;
			height: 80px;"
						></image>
						<text>暂无数据</text>
			</view>
		</view>
	</view>
</template>

<script>
import apiHome from '@/api/home.js'
	export default {
		data() {
			return {
				params: {
					token: this.$store.state.user.token
				},
				testData: []
			}
		},
		created() {
			this.getTestInfo()
		},
		methods: {
			getTestInfo() {
				let data = this.params
				apiHome.getTest(data).then(response => {
					this.testData = response.data
				})
			}
		}
	}
</script>

<style>
.imgNull {
	width: 30%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	font-size: 30rpx;
}
</style>
