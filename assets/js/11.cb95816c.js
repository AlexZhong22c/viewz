(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{261:function(t,n,e){},262:function(t,n,e){},263:function(t,n,e){},264:function(t,n,e){},265:function(t,n,e){},284:function(t,n,e){"use strict";e(261)},285:function(t,n,e){"use strict";e(262)},286:function(t,n,e){"use strict";e(263)},287:function(t,n,e){"use strict";e(264)},288:function(t,n,e){"use strict";e(265)},296:function(t,n,e){"use strict";var s={name:"ZLayout",data:()=>({layoutClass:{hasSider:!1}}),mounted(){this.$children.forEach(t=>{"ZSider"===t.$options.name&&(this.layoutClass.hasSider=!0)})}},i=(e(284),e(11)),o=Object(i.a)(s,(function(){return(0,this._self._c)("div",{staticClass:"z-layout",class:this.layoutClass},[this._t("default")],2)}),[],!1,null,null,null);n.a=o.exports},297:function(t,n,e){"use strict";var s={name:"ZHeader"},i=(e(285),e(11)),o=Object(i.a)(s,(function(){return(0,this._self._c)("div",{staticClass:"z-header"},[this._t("default")],2)}),[],!1,null,null,null);n.a=o.exports},298:function(t,n,e){"use strict";var s={name:"ZFooter"},i=(e(286),e(11)),o=Object(i.a)(s,(function(){return(0,this._self._c)("div",{staticClass:"z-footer"},[this._t("default")],2)}),[],!1,null,null,null);n.a=o.exports},299:function(t,n,e){"use strict";var s={name:"ZContent"},i=(e(287),e(11)),o=Object(i.a)(s,(function(){return(0,this._self._c)("div",{staticClass:"z-content"},[this._t("default")],2)}),[],!1,null,null,null);n.a=o.exports},300:function(t,n,e){"use strict";var s={name:"ZSider",data:()=>({visible:!0})},i=(e(288),e(11)),o=Object(i.a)(s,(function(){var t=this,n=t._self._c;return t.visible?n("div",{staticClass:"z-sider"},[t._t("default"),t._v(" "),n("button",{on:{click:function(n){t.visible=!1}}},[t._v("收起")])],2):t._e()}),[],!1,null,null,null);n.a=o.exports},321:function(t,n,e){},352:function(t,n,e){"use strict";e(321)},380:function(t,n,e){"use strict";e.r(n);var s=e(296),i=e(297),o=e(298),a=e(299),u=e(300),l={components:{ZLayout:s.a,ZHeader:i.a,ZFooter:o.a,ZContent:a.a,ZSider:u.a},data:()=>({content:'\n        <z-layout style="color: white; margin-bottom:50px;">\n          <z-header style="height: 50px; background:lightskyblue;">\n            header\n          </z-header>\n          <z-content style="height: 100px; background:deepskyblue;">\n            content\n          </z-content>\n          <z-footer style="height: 50px; background:lightskyblue;">\n            footer\n          </z-footer>\n        </z-layout>\n      '.replace(/^ {8}/gm,"").trim()})},c=(e(352),e(11)),r=Object(c.a)(l,(function(){var t=this,n=t._self._c;return n("div",{staticStyle:{"padding-top":"16px"}},[n("h2",[t._v("布局")]),t._v(" "),t._m(0),t._v(" "),n("z-layout",{staticStyle:{color:"white","margin-bottom":"50px"}},[n("z-header",{staticStyle:{height:"50px",background:"lightskyblue"}},[t._v("\n      header\n    ")]),t._v(" "),n("z-content",{staticStyle:{height:"100px",background:"deepskyblue"}},[t._v("\n      content\n    ")]),t._v(" "),n("z-footer",{staticStyle:{height:"50px",background:"lightskyblue"}},[t._v("\n      footer\n    ")])],1),t._v(" "),t._m(1),t._v(" "),n("pre",[n("code",[t._v(t._s(t.content))])])],1)}),[function(){var t=this._self._c;return t("p",[t("strong",[this._v("预览")])])},function(){var t=this._self._c;return t("p",[t("strong",[this._v("代码")])])}],!1,null,"47968edc",null);n.default=r.exports}}]);