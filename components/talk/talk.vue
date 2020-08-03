<template>
	<view class="talkAll">
	<talkdetail v-for="(item, index) in talks" :item="item" v-on:commentInput="commentInput" v-on:commentUserInput="commentUserInput"></talkdetail>
	</view>
</template>

<script>
	import talkdetail from "@/components/talk/talkDetail.vue"
	import apiTalk from "@/api/talk.js"
	export default {
		name: 'talk',
		components: {
			talkdetail,
		},
		data() {
			return {
			showLoadMore: false,
			imgData: [],
			loadMoreText: "暂无更多",
			showInput: false,
			input_placeholder: '快来说点什么吧',
			index: '',
			talksIndex: '',
			talks: this.items,
			talkedUsername: '',
			isReply: false,
			params: {
				token: this.$store.state.user.token,
				id: this.$store.state.user.userId,
				username: this.$store.state.user.userName
			},
			}
		},
		props: ['items'],
		created() {
			let talkInterval =  setInterval(() => {
				this.talks = this.items
				if(this.items.length != 0) {
					clearInterval(talkInterval)
				} 
			}, 500)
		},
		methods: {
		}
	}
</script>

<style scoped>
@import "@/common/talk/index.css";
</style>
