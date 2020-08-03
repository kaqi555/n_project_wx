<template>
	<view>
		<form action="">
			<view class="cu-form-group margin-top">
				<view class="cu-avatar xl round" :style="{backgroundImage: 'url(' + info.headPic + ')'}"></view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		name: 'personalinfo',
		props: ['info']
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
