(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/homePage/talkPage/talkPage","components/im-chat/chatinput"],{"146f":function(t,e,n){"use strict";var a=n("fc11"),u=n.n(a);u.a},"30be":function(t,e,n){"use strict";var a,u=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},3655:function(t,e,n){"use strict";var a={talk:function(){return n.e("components/talk/talk").then(n.bind(null,"54b4"))}},u=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},"68c3":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=u(n("0980"));u(n("c485"));function u(t){return t&&t.__esModule?t:{default:t}}var o=function(){n.e("components/talk/talk").then(function(){return resolve(n("54b4"))}.bind(null,n)).catch(n.oe)},i={components:{talk:o},data:function(){return{showLoadMore:!1,imgData:[],loadMoreText:"加载中",showInput:!1,input_placeholder:"快来说点什么吧",talks:[],temp:[],page:1,params:{token:this.$store.state.token,id:this.$store.state.userId}}},onUnload:function(){this.max=0,this.data=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){this.getNewTalks(),this.showLoadMore=!0},onPullDownRefresh:function(){this.page=1,this.getNewTalks(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},created:function(){this.getNewTalks()},methods:{getNewTalks:function(){var t=this;a.default.getNewTalks(this.params,this.page).then((function(e){t.temp=e.data,t.page+=1;for(var n=0;n<t.temp.length;n++){if(t.temp[n].pics&&(t.temp[n].pics=t.temp[n].pics.split(",")),0!=t.temp[n].talks.length)for(var a=0;a<t.temp[n].talks.length;a++)t.temp[n].talks[a].index=n;t.temp[n].userId=t.$store.state.userId}t.talks.push(t.temp)})).catch((function(t){con}))}}};e.default=i}).call(this,n("543d")["default"])},"6aea":function(t,e,n){},7041:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"chat-input",data:function(){return{inputValue:""}},props:{placeholder:{type:String,required:!0},focus:{type:Boolean,required:!0}},methods:{blur:function(){this.$emit("blur")},startRecognize:function(){var t={},e=this;t.engine="iFly",e.inputValue="",plus.speech.startRecognize(t,(function(t){console.log(t),e.inputValue+=t}),(function(t){console.log("语音识别失败："+t.message)}))},sendMessge:function(){if(this.inputValue){var e=this;this.$emit("send-message",{type:"text",content:this.inputValue}),e.inputValue=""}else t.showModal({content:"还没有输入内容哦!",showCancel:!1})}}};e.default=n}).call(this,n("543d")["default"])},7226:function(t,e,n){"use strict";(function(t){n("1828"),n("921b");a(n("66fd"));var e=a(n("be4d"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"746d":function(t,e,n){"use strict";var a=n("6aea"),u=n.n(a);u.a},be4d:function(t,e,n){"use strict";n.r(e);var a=n("3655"),u=n("e055");for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);n("746d");var i,c=n("f0c5"),s=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=s.exports},c485:function(t,e,n){"use strict";n.r(e);var a=n("30be"),u=n("e49d");for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);n("146f");var i,c=n("f0c5"),s=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=s.exports},e055:function(t,e,n){"use strict";n.r(e);var a=n("68c3"),u=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=u.a},e49d:function(t,e,n){"use strict";n.r(e);var a=n("7041"),u=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=u.a},fc11:function(t,e,n){}},[["7226","common/runtime","common/vendor"]]]);