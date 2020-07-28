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
				token: this.$store.state.token,
				id: this.$store.state.userId,
				username: this.$store.state.userName
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
			commentInput(event) {
				this.isReply = false
				this.params.talkId = event.id
				this.params.talkedId  = 0
				this.params.talkedUsername = ''
			    this.index = this.items.findIndex((item) => item.id === event.id)
				this.showInput = true
				this.focus = true;
				this.params.talkId = event.id
			},
			commentUserInput(event) {
				console.log(event)
				this.isReply = true
				this.params.talkedId = event.id
				if(event.talked_username != null) {
				console.log(event.username.split('回复'))
				this.params.talkedUsername = event.username.split('回复')[0]
				} else {
					this.params.talkedUsername = event.username
				}
				this.index = event.index
				this.params.talkId = event.talkId 
				this.index = this.items.findIndex((item) => item.id === event.talkId) 
				this.showInput = true
				this.focus = true
			},
			blur: function() {
				this.init_input();
			},
			init_input() {
				this.showInput = false;
				this.focus = false;
				this.input_placeholder = '快来说点什么吧';
			},
			send_comment(message) {
				let data = this.params
				data.content = message.content
				apiTalk.getTalkComment(data).then(response => {
				if(response.code === 200) {
				if(this.isReply === false) {
				this.items[this.index].talks.push({
					username: this.$store.state.userName,
					content: data.content,
					talkId: data.talkId,
					id: response.data,
				})
				} else {
					this.items[this.index].talks.push({
					username: this.$store.state.userName + '回复' + data.talkedUsername,
				    content: data.content,
					talkId: data.talkId,
					id: response.data,
					talkedId: data.talkedId,
					talked_username: this.talkedUsername
				})
				}
				this.showInput = false
				}
				})
			}
		}
	}
</script>

<style scoped>
@import "@/common/talk/index.css";
</style>
