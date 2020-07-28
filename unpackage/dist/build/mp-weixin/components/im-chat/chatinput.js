(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/im-chat/chatinput"],{"146f":function(t,n,e){"use strict";var u=e("fc11"),i=e.n(u);i.a},"30be":function(t,n,e){"use strict";var u,i=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return u}))},7041:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"chat-input",data:function(){return{inputValue:""}},props:{placeholder:{type:String,required:!0},focus:{type:Boolean,required:!0}},methods:{blur:function(){this.$emit("blur")},startRecognize:function(){var t={},n=this;t.engine="iFly",n.inputValue="",plus.speech.startRecognize(t,(function(t){console.log(t),n.inputValue+=t}),(function(t){console.log("语音识别失败："+t.message)}))},sendMessge:function(){if(this.inputValue){var n=this;this.$emit("send-message",{type:"text",content:this.inputValue}),n.inputValue=""}else t.showModal({content:"还没有输入内容哦!",showCancel:!1})}}};n.default=e}).call(this,e("543d")["default"])},c485:function(t,n,e){"use strict";e.r(n);var u=e("30be"),i=e("e49d");for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);e("146f");var o,a=e("f0c5"),r=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);n["default"]=r.exports},e49d:function(t,n,e){"use strict";e.r(n);var u=e("7041"),i=e.n(u);for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);n["default"]=i.a},fc11:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/im-chat/chatinput-create-component',
    {
        'components/im-chat/chatinput-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c485"))
        })
    },
    [['components/im-chat/chatinput-create-component']]
]);
