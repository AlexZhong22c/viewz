(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{246:function(t,n,o){},252:function(t,n,o){"use strict";o(246)},253:function(t,n,o){"use strict";var i={name:"ZButton",components:{ZIcon:o(46).a},props:{icon:{},loading:{type:Boolean,default:!1},iconPosition:{type:String,default:"left",validator:t=>["left","right"].includes(t)}}},s=(o(252),o(11)),a=Object(s.a)(i,(function(){var t=this,n=t._self._c;return n("button",{staticClass:"z-button",class:["z-icon-"+t.iconPosition],on:{click:function(n){return t.$emit("click")}}},[!t.loading&&t.icon?n("z-icon",{staticClass:"icon",attrs:{name:t.icon}}):t._e(),t._v(" "),t.loading?n("z-icon",{staticClass:"icon loading",attrs:{name:"loading"}}):t._e(),t._v(" "),n("div",{staticClass:"z-button-content"},[t._t("default")],2)],1)}),[],!1,null,null,null);n.a=a.exports},375:function(t,n,o){"use strict";o.r(n);var i={name:"buttonDemos",components:{ZButton:o(253).a},data:()=>({content:'\n          <z-button>默认按钮</z-button>\n          <z-button icon="settings">默认按钮</z-button>\n          <z-button :loading="true">默认按钮</z-button>\n          <z-button disabled>默认按钮</z-button>\n      '.replace(/^ {8}/gm,"").trim()})},s=o(11),a=Object(s.a)(i,(function(){var t=this,n=t._self._c;return n("div",{staticStyle:{"padding-top":"16px"}},[n("h2",[t._v("简单用法")]),t._v(" "),t._m(0),t._v(" "),n("z-button",[t._v("默认按钮")]),t._v(" "),n("z-button",{attrs:{icon:"settings"}},[t._v("默认按钮")]),t._v(" "),n("z-button",{attrs:{loading:!0}},[t._v("默认按钮")]),t._v(" "),n("z-button",{attrs:{disabled:""}},[t._v("默认按钮")]),t._v(" "),t._m(1),t._v(" "),n("pre",[n("code",[t._v(t._s(t.content))])])],1)}),[function(){var t=this._self._c;return t("p",[t("strong",[this._v("预览")])])},function(){var t=this._self._c;return t("p",[t("strong",[this._v("代码")])])}],!1,null,null,null);n.default=a.exports}}]);