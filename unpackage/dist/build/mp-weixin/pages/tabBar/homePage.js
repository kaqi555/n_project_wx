(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/homePage"],{"06c7":function(t,e,n){"use strict";var i=n("db99"),a=n.n(i);a.a},"1ef1":function(t,e,n){"use strict";var i=n("93ed"),a=n.n(i);a.a},"30e6":function(t,e,n){"use strict";var i={uniSearchBar:function(){return n.e("components/uni-search-bar/uni-search-bar").then(n.bind(null,"79d6"))},uniSwiperDot:function(){return n.e("components/uni-swiper-dot/uni-swiper-dot").then(n.bind(null,"1236"))},uniTag:function(){return n.e("components/uni-tag/uni-tag").then(n.bind(null,"3954"))},talk:function(){return n.e("components/talk/talk").then(n.bind(null,"54b4"))}},a=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},"36c2":function(t,e,n){"use strict";(function(t){n("1828"),n("921b");i(n("66fd"));var e=i(n("cab6"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"66e2":function(t,e,n){"use strict";n.r(e);var i=n("6fea"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},"6fea":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("0980"));function a(t){return t&&t.__esModule?t:{default:t}}var s=function(){n.e("components/uni-swiper-dot/uni-swiper-dot").then(function(){return resolve(n("1236"))}.bind(null,n)).catch(n.oe)},o=function(){n.e("components/uni-tag/uni-tag").then(function(){return resolve(n("3954"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/talk/talk").then(function(){return resolve(n("54b4"))}.bind(null,n)).catch(n.oe)},c={components:{uniSwiperDot:s,uniTag:o,talk:u},data:function(){return{showLoadMore:!1,imgData:[],loadMoreText:"暂无更多",showInput:!1,input_placeholder:"快来说点什么吧",current:"0",mode:"dot",selectStatus:"1",items:[],index:"",indexUser:"",params:{token:this.$store.state.token,id:this.$store.state.userId},modularButtons:[{id:"0",name:"工大说",src:"../../static/img/talk.png",url:"/pages/homePage/talkPage/talkPage"},{id:"1",name:"成绩查询",src:"../../static/img/study.png",url:"/pages/homePage/gradeInquire/gradeInquire"},{id:"2",name:"课程表",src:"../../static/img/class.png",url:"/pages/homePage/classSchedulePage/classSchedulePage"},{id:"3",name:"考试资料",src:"../../static/img/club.png",url:"/pages/homePage/socialActivitypage/socialActivitypage"},{id:"4",name:"发布/求职",src:"../../static/img/position.png",url:"/pages/homePage/releaseJobPage/releaseJobPage"},{id:"5",name:"设备交易",src:"../../static/img/cat.png",url:"/pages/homePage/equipmentTradePage/equipmentTradePage"}]}},onLoad:function(){var t=this;if(0===this.imgData.length)var e=setInterval((function(){t.imgData=t.$store.state.banner,0!==t.imgData.length&&clearInterval(e)}),1e3)},onUnload:function(){this.max=0,this.data=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){this.showLoadMore=!0},onPullDownRefresh:function(){switch(this.selectStatus){case"1":this.bindClickTalk();break;case"2":this.bindClickRealease();break;case"3":this.bindClickEquip();break}setTimeout((function(){t.stopPullDownRefresh()}),1e3)},created:function(){this.bindClickTalk()},methods:{search:function(t){console.log(1)},goNewPage:function(e){t.navigateTo({url:e.url})},commentInput:function(t){console.log(t),this.index=this.items.findIndex((function(e){return e.id===t.id})),this.showInput=!0,this.focus=!0,this.params.talkId=t.id},commentUserInput:function(t){console.log(t),this.params.talkId=t.id,this.index=t.index,this.indexUser=this.items[this.index].talks.findIndex((function(e){return e.id===t.id})),console.log(this.index),this.showInput=!0,this.input_placeholder="回复"+t.username,this.focus=!0},blur:function(){this.init_input()},init_input:function(){this.showInput=!1,this.focus=!1,this.input_placeholder="快来说点什么吧"},send_comment:function(t){var e=this,n=this.params;n.content=t.content,i.default.getTalkComment(n).then((function(t){200===t.code&&(console.log(t),e.items[e.index].talks.push({username:e.$store.state.userName,content:n.content}),e.showInput=!1)}))},bindClickTalk:function(){var t=this;function e(t,n){for(var i=[],a=0;a<t.length;a++)0!=t[a].talks.length&&(i=i.concat(e(t[a].talks,n))),null!==t[a].talked_username&&(t[a].username=t[a].username+" 回复 "+t[a].talked_username),t[a].talkId=n,i.push(t[a]);return i}this.selectStatus=1,i.default.getHotTalk(this.params).then((function(n){t.items=n.data;for(var i=0;i<t.items.length;i++){if(t.items[i].pics&&(t.items[i].pics=t.items[i].pics.split(",")),0!=t.items[i].talks.length)for(var a=0;a<t.items[i].talks.length;a++)t.items[i].talks[a].index=i;t.items[i].userId=t.$store.state.userId,0!==t.items[i].talks.length&&(t.items[i].talks=e(t.items[i].talks,t.items[i].id))}})).catch((function(t){}))},bindClickRealease:function(){this.selectStatus=2},bindClickEquip:function(){this.selectStatus=3},change:function(t){this.current=t.detail.current}}};e.default=c}).call(this,n("543d")["default"])},"93ed":function(t,e,n){},cab6:function(t,e,n){"use strict";n.r(e);var i=n("30e6"),a=n("66e2");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("1ef1"),n("06c7");var o,u=n("f0c5"),c=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=c.exports},db99:function(t,e,n){}},[["36c2","common/runtime","common/vendor"]]]);