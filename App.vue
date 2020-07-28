<script>
import store from './store'
export default {
	onLaunch: function() {
		let user = uni.getStorageSync('user')
		//console.log(id)
		console.log(user)
		if(user.token  != undefined || user.token != null) {
			let data = {
				id: user.id,
				username: user.username,
				headPic: user.headPic,
				token: user.token,
				xh: user.xh,
				rxnf: user.rxnf,
				xm: user.xm
			}
			console.log(data)
			this.$store.dispatch('setStorage', data)
			uni.switchTab({
				  url: '/pages/tabBar/homePage/homePage'
			})
		}
		// #ifdef APP-PLUS
		uni.onTabBarMidButtonTap(()=>{
		    uni.navigateTo({
			  url:"pages/tabBar/releasePage",
			  animationType:'slide-in-bottom'
			})
		})
		// #endif
	},
	onShareAppMessage(e) {
	   console.log(e)
	   if (e.from === 'button') {
	     var id = e.target.id;
	     //相对于说说详情界面来说
	     var backUrl = '../../talkText/talk/talk';
	     if (e.target.dataset.imgsrc) {
	       var img = e.target.dataset.imgsrc;
	     } else {
	       var img = e.target.dataset.head;
	     }
	     return {
	       title: '快来看看我分享的川音说吧！',
	       path: '/pages/publicText/talkDetail/talkDetail?backUrl=' + backUrl + '&id=' + id,
	       imageUrl: img,
	     }
	   } else {
	     return {
	       title: '跟着我的脚步，进来逛逛吧！',
	       path: '/pages/index/index',
	       imageUrl: '@/static/img/logo.jpg',
	     }
	   }
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
	}
	
};
</script>

<style>
@import "colorui/main.css";
@import "colorui/icon.css";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
