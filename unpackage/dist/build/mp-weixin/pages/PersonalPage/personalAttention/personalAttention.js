(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/PersonalPage/personalAttention/personalAttention"],{2231:function(t,e,n){"use strict";var o,s=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))},"38ec":function(t,e,n){"use strict";(function(t){n("1828"),n("921b");o(n("66fd"));var e=o(n("f78a"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},6011:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=s(n("2cc2"));function s(t){return t&&t.__esModule?t:{default:t}}var a=function(){n.e("components/attention/attention").then(function(){return resolve(n("5a21"))}.bind(null,n)).catch(n.oe)},u={components:{personalattention:a},data:function(){return{attentions:this.$store.state.global.attention,fans:this.$store.state.global.fans,userdId:"",params:{token:this.$store.state.user.token,id:this.$store.state.user.userId}}},onShow:function(){},methods:{changButton:function(t){switch(this.userdId=this.attentions[t].id,this.attentions[t].buttonIndex){case 0:this.deleteAttention(),this.attentions[t].buttonIndex=1;break;case 1:this.addAttention(),this.attentions[t].buttonIndex=0;break}},addAttention:function(){var t={token:this.$store.state.user.token,id:this.$store.state.user.userId};t.vId=this.userdId,o.default.addAttention(t).then((function(t){}))},deleteAttention:function(){var t={token:this.$store.state.user.token,id:this.$store.state.user.userId};t.vId=this.userdId,o.default.deleteAttention(t).then((function(t){}))}}};e.default=u},cd16:function(t,e,n){"use strict";n.r(e);var o=n("6011"),s=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=s.a},f78a:function(t,e,n){"use strict";n.r(e);var o=n("2231"),s=n("cd16");for(var a in s)"default"!==a&&function(t){n.d(e,t,(function(){return s[t]}))}(a);var u,i=n("f0c5"),r=Object(i["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=r.exports}},[["38ec","common/runtime","common/vendor"]]]);