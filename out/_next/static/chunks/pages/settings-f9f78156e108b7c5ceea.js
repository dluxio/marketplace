(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[662],{29640:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return N}});var r=n(80318),i=n(67294),s=n(9669),a=n.n(s),o=n(2804),c=n(95276),l=n.n(c),u=n(37039),d=n(89583),m=n(99176),h=n(63569),p=n(92809),f=n(94649),x=n(86733),g=n(85893);function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){(0,p.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){var t=e.handleSubmit;return(0,g.jsxs)("div",{className:"w-full mx-2 my-4",children:[(0,g.jsx)("h1",{className:"text-2xl",children:"Witness settings"}),(0,g.jsx)(f.J9,{initialValues:{escrow:!0,mirror:!1,bidRate:20,marketingRate:20,domain:"",pubKey:"",prevKey:""},validate:function(e){var t=e.domain,n=e.pubKey,r=e.prevKey,i={};return t||(i.domain="Required!"),n||(i.pubKey="Required!"),r||(i.prevKey="Required!"),i},onSubmit:function(e,n){var r=n.setSubmitting;t(v(v({},e),{},{prevKey:e.prevKey.trim(),pubKey:e.pubKey.trim()})),r(!1)},children:function(e){var t=e.values,n=e.errors,r=e.touched,i=e.handleChange,s=e.handleBlur,a=e.handleSubmit;return(0,g.jsx)("div",{className:"w-full sm:w-2/3 bg-gray-600 px-7 py-3 text-base rounded-xl border-2 border-gray-700",children:(0,g.jsxs)("form",{onSubmit:a,children:[(0,g.jsx)(x.y,{name:"domain",sideTitle:"https://",errors:n.domain,handleBlur:s,handleChange:i,touched:r.domain,value:t.domain}),(0,g.jsxs)("div",{className:"flex gap-2 items-end mt-3",children:[(0,g.jsxs)("div",{className:"relative",children:[(0,g.jsx)("h1",{className:"absolute top-8 right-8",children:"%"}),(0,g.jsx)(x.y,{name:"bidRate",title:"Node Inflation Vote",type:"number",min:1,errors:n.bidRate,handleBlur:s,handleChange:i,touched:r.bidRate,value:t.bidRate})]}),(0,g.jsxs)("div",{className:"relative",children:[(0,g.jsx)("h1",{className:"absolute top-8 right-8",children:"%"}),(0,g.jsx)(x.y,{name:"marketingRate",min:1,title:"DAO Inflation Vote",type:"number",errors:n.marketingRate,handleBlur:s,handleChange:i,touched:r.marketingRate,value:t.marketingRate})]}),(0,g.jsxs)("div",{className:"flex flex-col align-center justify-center",children:[(0,g.jsxs)("div",{className:"flex items-center align-center gap-2",children:[(0,g.jsx)("input",{name:"escrow",title:"Escrow agent",type:"checkbox",onChange:i,onBlur:s,value:t.escrow?1:0}),(0,g.jsx)("h1",{children:"Escrow agent"})]}),(0,g.jsxs)("div",{className:"flex items-center align-center gap-2",children:[(0,g.jsx)("input",{name:"mirror",type:"checkbox",onChange:i,onBlur:s,value:t.mirror?1:0}),(0,g.jsx)("h1",{children:"Mirror Leader"})]})]})]}),(0,g.jsxs)("div",{className:"flex gap-2 mt-3",children:[(0,g.jsx)(x.y,{name:"pubKey",title:"DLUX MS Witness Pub Key",errors:n.pubKey,handleBlur:s,handleChange:i,touched:r.pubKey,value:t.pubKey}),(0,g.jsx)(x.y,{name:"prevKey",title:"DLUX MS Witness Private Key",errors:n.prevKey,handleBlur:s,handleChange:i,touched:r.prevKey,value:t.prevKey})]}),(0,g.jsx)("button",{type:"submit",className:"px-2 py-1 mx-auto mt-5 flex items-center gap-3 rounded-lg border-2 text-white bg-gradient-to-b from-pink-500 to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600",children:"Submit"})]})})}})]})},j=n(43196),w=new(l()),N=function(){var e=(0,i.useState)(!1),t=e[0],n=e[1],s=(0,i.useState)(),c=s[0],l=s[1],p=(0,i.useState)([]),f=p[0],x=p[1],b=(0,o.FV)(h.H3),v=(0,r.Z)(b,2),N=v[0],k=v[1],K=(0,u.$G)().t,O=(0,o.sJ)(h.KL);(0,i.useEffect)((function(){x([]),a().get("".concat(N,"api/mirrors")).then((function(e){var t=e.data,n=[];t.apis.forEach((function(e){e.api_url.includes(e.node)&&n.push(e)})),l(n)}))}),[]),(0,i.useEffect)((function(){var e=[];c?(c.forEach((function(t){w.ping(t.api_url).catch((function(n){e.push({value:t.api_url,label:"".concat(n,"ms | ").concat(t.node," | ").concat(t.api_url),pingTime:n})}))})),c.find((function(e){return e.node===O.name}))&&n(!0),x(e.sort((function(e,t){return e.pingTime<t.pingTime?1:-1})))):x(c)}),[c]);return(0,g.jsx)("div",{className:"text-white text-3xl",children:(0,g.jsxs)("div",{className:"mx-10 my-10",children:[(0,g.jsx)("h1",{className:"my-5",children:K("settings")}),(0,g.jsxs)("div",{className:"w-full my-10 mx-2 sm:w-1/2",children:[(0,g.jsx)("h1",{className:"text-2xl",children:K("APIlink")}),(0,g.jsx)(m.ZP,{className:"my-1 text-sm h-3 text-black",placeholder:K("select"),options:f,onChange:function(e){k(e.value)}})]}),t&&(0,g.jsx)(y,{handleSubmit:function(e){(0,j.cY)(e,O.name)}}),(0,g.jsxs)("div",{className:"w-full mx-2 sm:w-1/2",children:[(0,g.jsx)("h1",{className:"text-2xl mb-3",children:K("desktopApp")}),(0,g.jsxs)("div",{className:"flex flex-col sm:flex-row gap-3",children:[(0,g.jsx)("button",{className:"transition text-xl px-4 py-2 rounded-lg border-2 text-white bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700",children:(0,g.jsxs)("div",{className:"flex gap-2 items-center",children:[(0,g.jsx)(d.zTP,{}),"Windows"]})}),(0,g.jsx)("button",{className:"text-xl px-4 py-2 rounded-lg border-2 text-white bg-gradient-to-r from-red-500 to-pink-400 focus:outline-none focus:ring-2 focus:ring-red-700",children:(0,g.jsxs)("div",{className:"flex gap-2 items-center",children:[(0,g.jsx)(d.oPZ,{}),"MacOS"]})}),(0,g.jsx)("button",{className:"text-xl px-4 py-2 rounded-lg border-2 text-white bg-gradient-to-r from-purple-400 to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-700",children:(0,g.jsxs)("div",{className:"flex gap-2 items-center",children:[(0,g.jsx)(d._Aq,{}),"Linux"]})})]}),(0,g.jsx)("h1",{className:"text-sm my-2 text-red-400",children:"WARNING! The desktop app is not ready for release yet..."})]})]})})}},19471:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settings",function(){return n(29640)}])},95276:function(e,t,n){var r=n(93956);e.exports=r},93956:function(e){var t=function(e){this.opt=e||{},this.favicon=this.opt.favicon||"/favicon.ico",this.timeout=this.opt.timeout||0,this.logError=this.opt.logError||!1};t.prototype.ping=function(e,t){var n,r,i;"undefined"!==typeof Promise&&(n=new Promise((function(e,t){r=e,i=t})));var s,a=this;a.wasSuccess=!1,a.img=new Image,a.img.onload=function(e){a.wasSuccess=!0,c.call(a,e)},a.img.onerror=function(e){a.wasSuccess=!1,c.call(a,e)};var o=new Date;function c(){s&&clearTimeout(s);var e=new Date-o;if(t){if("function"===typeof t)return this.wasSuccess?(n&&r(e),t(null,e)):(a.logError&&console.error("error loading resource"),n&&i(e),t("error",e));throw new Error("Callback is not a function.")}if(n)return this.wasSuccess?r(e):i(e);throw new Error("Promise is not supported by your browser. Use callback instead.")}return a.timeout&&(s=setTimeout((function(){c.call(a,void 0)}),a.timeout)),a.img.src=e+a.favicon+"?"+ +new Date,n},e.exports&&(e.exports=t)}},function(e){e.O(0,[774,888,179],(function(){return t=19471,e(e.s=t);var t}));var t=e.O();_N_E=t}]);