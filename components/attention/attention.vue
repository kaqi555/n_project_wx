<template>
	<view>
		<view class="cu-list menu-avatar" >
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(attention,index) in attentions" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
				<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' + attention.headPic + ')'}"></view>
				<view class="content">
					<view class="text-grey">{{attention.username}}</view>
					<view class="text-gray text-sm">
						<text class=" text-red  margin-right-xs"></text>{{attention.word}}</view>
				</view>
				<view class="">
					<view class="margin-tb-sm text-center">
					<button class="cu-btn round lg" :class="attention.buttonIndex === 0 ? 'bg-grey':'bg-black' " @click="switchSeclect(index)">{{buttonText[attention.buttonIndex]}}</button>
				    </view>
				</view>
				<view class="move">
					<view class="bg-grey">置顶</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import apiHome from '@/api/home.js'
	export default {
		name: 'personalattention',
		props: ['attentions'],
		data() {
			return {
				buttonText: ['已关注','关注'],
				userdId: '',
				params: {
					token: this.$store.state.user.token,
					id: this.$store.state.user.userId
				}
				
			};
		},
		
		methods: {
			switchSeclect(index) {
				this.$emit('changButton', index)
			},
		}
	}
</script>

<style>

</style>
