(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/homePage/homePage"],{"143f":function(e,t,n){},"14a2":function(e,t,n){"use strict";var a=n("65bf"),o=n.n(a);o.a},3881:function(e,t,n){"use strict";n.r(t);var a=n("e9f7"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=o.a},5067:function(e,t,n){"use strict";(function(e){n("1828"),n("921b");a(n("66fd"));var t=a(n("769c"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"5c52":function(e,t,n){"use strict";var a={talk:function(){return n.e("components/talk/talk").then(n.bind(null,"54b4"))}},o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},"65bf":function(e,t,n){},"6cd5":function(e,t,n){"use strict";var a=n("143f"),o=n.n(a);o.a},"769c":function(e,t,n){"use strict";n.r(t);var a=n("5c52"),o=n("3881");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("14a2"),n("6cd5");var i,c=n("f0c5"),u=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,"de48e3f4",null,!1,a["a"],i);t["default"]=u.exports},e9f7:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("0980"));function o(e){return e&&e.__esModule?e:{default:e}}var r=function(){n.e("components/uni-swiper-dot/uni-swiper-dot").then(function(){return resolve(n("1236"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/uni-tag/uni-tag").then(function(){return resolve(n("3954"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/talk/talk").then(function(){return resolve(n("54b4"))}.bind(null,n)).catch(n.oe)},u={components:{uniSwiperDot:r,uniTag:i,talk:c},data:function(){return{TabCur:0,scrollLeft:0,hot_threeTab:[{name:"热门说说"},{name:"关注"},{name:"最新"}],showLoadMore:!1,imgData:[],loadMoreText:"暂无更多",showInput:!1,input_placeholder:"快来说点什么吧",items:[],index:"",indexUser:"",params:{token:this.$store.state.user.token,id:this.$store.state.user.userId},isLoad:!1,modalName:"gridModal",gridCol:4,gridBorder:!1,current:"0",mode:"dot",dotStyle:!1,cuIconList:[{cuIcon:"cardboardfill",color:"red",name:"工大说",url:"/pages/homePage/talkPage/talkPage"},{cuIcon:"upstage",color:"orange",name:"成绩查询",url:"/pages/homePage/gradeInquire/gradeInquire"},{cuIcon:"form",color:"yellow",name:"课程表",url:"/pages/homePage/classSchedulePage/classSchedulePage"},{cuIcon:"punch",color:"olive",name:"空闲教室",url:"/pages/homePage/classroomFree/classroomFree"},{cuIcon:"searchlist",color:"mauve",name:"考试安排",url:"/pages/homePage/testInquire/testInquire"},{cuIcon:"profile",color:"cyan",name:"发布/求职",url:"/pages/homePage/releaseJobPage/releaseJobPage"},{cuIcon:"recharge",color:"blue",name:"设备交易",url:"/pages/homePage/equipmentTradePage/equipmentTradePage"},{cuIcon:"discoverfill",color:"purple",name:"学习资料",url:"/pages/homePage/socialActivitypage/socialActivitypage"}]}},onLoad:function(){var e=this;if(0===this.imgData.length)var t=setInterval((function(){e.imgData=e.$store.state.user.banner,0!==e.imgData.length&&clearInterval(t)}),1e3)},onUnload:function(){this.max=0,this.data=[],this.showLoadMore=!1},onReachBottom:function(){this.isLoad=!0},onPullDownRefresh:function(){switch(this.TabCur){case"0":this.bindClickTalk();break;case"1":this.bindClickRealease();break;case"2":this.bindClickEquip();break}setTimeout((function(){e.stopPullDownRefresh()}),1e3)},created:function(){console.log(this.$store.state.user),this.bindClickTalk("0")},methods:{tabSelect:function(e){this.TabCur=e.currentTarget.dataset.id,this.scrollLeft=60*(e.currentTarget.dataset.id-1)},search:function(e){console.log(1)},cardSwiper:function(e){this.cardCur=e.detail.current},goNewPage:function(t){e.navigateTo({url:t.url})},bindClickTalk:function(e){var t=this;function n(e,t){for(var a=[],o=0;o<e.length;o++)0!=e[o].talks.length&&(a=a.concat(n(e[o].talks,t))),null!==e[o].talked_username&&(e[o].username=e[o].username),e[o].talkId=t,a.push(e[o]);return a}this.TabCur=0,a.default.getHotTalk(this.params).then((function(e){t.items=e.data;for(var a=0;a<t.items.length;a++){var o=0;t.items[a].pics&&(t.items[a].pics=t.items[a].pics.split(",")),o+=t.items[a].talks.length;for(var r=0;r<t.items[a].talks.length;r++)o+=t.items[a].talks[r].talks.length,n(t.items[a].talks[r].talks);console.log(o),t.items[a].talkLength=o,t.items[a].userId=t.$store.state.user.userId}})).catch((function(e){}))},bindClickRealease:function(){this.TabCur=1},bindClickEquip:function(){this.TabCur=2},change:function(e){this.current=e.detail.current}}};t.default=u}).call(this,n("543d")["default"])}},[["5067","common/runtime","common/vendor"]]]);