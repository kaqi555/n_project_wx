(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/attention/attention"],{"0f9d":function(t,n,e){"use strict";var u,r=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}))},"23a8":function(t,n,e){"use strict";e.r(n);var u=e("597b"),r=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=r.a},"597b":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;u(e("2cc2"));function u(t){return t&&t.__esModule?t:{default:t}}var r={name:"personalattention",props:["attentions"],data:function(){return{buttonText:["已关注","关注"],userdId:"",params:{token:this.$store.state.user.token,id:this.$store.state.user.userId}}},methods:{switchSeclect:function(t){this.$emit("changButton",t)}}};n.default=r},"5a21":function(t,n,e){"use strict";e.r(n);var u=e("0f9d"),r=e("23a8");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);var o,c=e("f0c5"),i=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);n["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/attention/attention-create-component',
    {
        'components/attention/attention-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5a21"))
        })
    },
    [['components/attention/attention-create-component']]
]);
