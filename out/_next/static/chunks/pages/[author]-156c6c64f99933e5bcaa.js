(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[446],{84110:function(e){e.exports=function(){"use strict";return function(e,t,n){e=e||{};var r=t.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function a(e,t,n,i){return r.fromToBase(e,t,n,i)}n.en.relativeTime=i,r.fromToBase=function(t,r,a,s,o){for(var l,u,c,d=a.$locale().relativeTime||i,f=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],p=f.length,h=0;h<p;h+=1){var y=f[h];y.d&&(l=s?n(t).diff(a,y.d,!0):a.diff(t,y.d,!0));var m=(e.rounding||Math.round)(Math.abs(l));if(c=l>0,m<=y.r||!y.r){m<=1&&h>0&&(y=f[h-1]);var v=d[y.l];o&&(m=o(""+m)),u="string"==typeof v?v.replace("%d",m):v(m,r,y.l,c);break}}if(r)return u;var x=c?d.future:d.past;return"function"==typeof x?x(u):x.replace("%s",u)},r.to=function(e,t){return a(e,t,this,!0)},r.from=function(e,t){return a(e,t,this)};var s=function(e){return e.$u?n.utc():n()};r.toNow=function(e){return this.to(s(this),e)},r.fromNow=function(e){return this.from(s(this),e)}}}()},97076:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var r=n(30266),i=n(809),a=n.n(i),s=n(11163),o=n(67294),l=n(45051),u=n(87893),c=n(83789),d=n(80318),f=n(47320),p=n(60590),h=n.n(p),y=n(27484),m=n.n(y),v=n(84110),x=n.n(v),b=n(79352),g=n(5434),w=n(37039),_=n(85893);m().extend(x()),m()().format();var P=function(e){var t=e.post,n=(0,o.useState)([]),r=n[0],i=n[1],a=(0,o.useState)(""),l=a[0],u=a[1],p=(0,o.useState)(null),y=p[0],m=p[1],v=(0,o.useState)(null),x=v[0],P=v[1],j=(0,o.useState)(!1),S=j[0],N=j[1],k=(0,s.useRouter)(),M=(0,w.$G)().t,O=(0,w.cQ)(),F=(0,d.Z)(O,1)[0];return(0,o.useEffect)((function(){h().api.getContent(t.author,t.permlink,(function(e,t){e&&console.log(e),m(t)}))}),[]),(0,o.useEffect)((function(){if(y){var e=JSON.parse(y.json_metadata);P(e)}}),[y]),(0,o.useEffect)((function(){var e=x;if(e)if(e.app.includes("3speak")){N(!0);var t="https://ipfs.io/ipfs/"+e.video.info.ipfs,n="https://ipfs.io/ipfs/"+e.video.info.ipfsThumbnail;n&&t&&i((function(e){return[].concat((0,c.Z)(e),[{file:t,image:n}])}))}else{var r;(r=e.image&&Array.isArray(e.image)?e.image[0]:"string"==typeof e.image?e.image:e.Hash360&&(e.Hash360,1)?"https://ipfs.io/ipfs/".concat(e.Hash360):"https://www.dlux.io/img/dlux-sdk.png")&&"https"!==r.substr(0,5)&&(r="https://www.dlux.io/img/dlux-sdk.png"),u(r)}}),[x]),x&&(0,_.jsxs)("div",{className:"relative border-2 text-white py-1 sm:p-3 rounded-xl h-full border-gray-800 bg-gray-600 w-full flex flex-col items-center justify-center",children:[S?(0,_.jsx)("div",{className:"w-full flex justify-center",children:(0,_.jsx)(f.Z,{className:"rounded-xl w-4/5",playerId:"my-unique-id",playerScript:"https://cdn.jwplayer.com/libraries/HT7Dts3H.js",playlist:r})}):(0,_.jsx)("div",{className:"flex justify-center w-full",children:(0,_.jsx)("img",{src:l,className:"w-4/5",alt:"appPhoto"})}),(0,_.jsx)("h1",{className:"text-center text-xl my-2 max-w-md font-bold",children:y.root_title}),(0,_.jsxs)("div",{className:"flex justify-between w-full",children:[(0,_.jsxs)("div",{className:"flex items-center gap-1",children:[(0,_.jsx)(b.iB2,{}),(0,_.jsxs)("h1",{children:["(",y.active_votes.length,")"]})]}),(0,_.jsxs)("div",{onClick:function(){return k.push({pathname:"/@".concat(y.author,"/").concat(y.permlink),query:F})},className:"flex items-center gap-1 cursor-pointer hover:text-gray-300",children:[(0,_.jsx)(g.Hlg,{}),(0,_.jsx)("h1",{children:M("comment")})]})]})]})},j=n(45155),S=n(34415),N=n(43196),k=function(){var e=new u.Client(["https://api.hive.blog","https://api.hivekings.com","https://anyx.io","https://api.openhive.network"]),t=(0,s.useRouter)().query.author,n=(0,o.useState)({username:"",provider:""}),i=n[0],c=n[1],d=(0,o.useState)([]),f=d[0],p=d[1],h=(0,o.useState)(null),y=h[0],m=h[1],v=(0,S.useHiveKeychainCeramic)(),x=(0,w.$G)().t;return(0,o.useEffect)((function(){t&&"@"===t.substr(0,1)?c({username:t.substr(1,t.length),provider:"hive"}):c({username:t,provider:"ceramic"})}),[t]),(0,o.useEffect)((function(){var t=function(){var e=(0,r.Z)(a().mark((function e(t){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.idx.get("basicProfile",t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();if(i)if("hive"===i.provider){var n={tag:i.username,limit:10};e.database.getDiscussions("blog",n).then((function(e){p(e)})),e.database.getAccounts([i.username]).then((function(e){e[0]&&m(JSON.parse(e[0].posting_json_metadata).profile)}))}else i.username&&(t(i.username).then((function(e){e&&m(e.profile)})),(0,N.ww)(i.username).then((function(e){console.log(e)})))}),[i]),(0,_.jsxs)("div",{className:"flex flex-col text-white my-10 mx-2 sm:mx-10",children:[(0,_.jsx)("div",{className:"flex flex-col items-center w-full",children:(0,_.jsxs)("div",{className:"relative overflow-hidden border-2 text-white p-5 rounded-xl border-gray-800 ".concat(null!==y&&void 0!==y&&y.cover_image?"bg-black":"bg-gray-600"," flex flex-col sm:flex-row items-center sm:items-start gap-3 w-full"),children:[(0,_.jsxs)("div",{className:"flex flex-col items-center justify-center z-10",children:[y&&(0,_.jsx)("img",{height:165,width:165,src:y.profile_image?y.profile_image:l.$8,alt:"profile"}),(0,_.jsx)("h1",{className:"text-xl my-2",children:"hive"===i.provider?t:null===y||void 0===y?void 0:y.name})]}),y&&(0,_.jsxs)("div",{className:"z-40 mx-5 my-auto",children:[(0,_.jsx)("h1",{className:"text-2xl mt-2",children:null===y||void 0===y?void 0:y.name}),y.about&&(0,_.jsxs)("div",{className:"flex items-center gap-2",children:[(0,_.jsx)(b.IIZ,{}),(0,_.jsx)("h1",{children:y.about})]}),y.location&&(0,_.jsxs)("div",{className:"flex items-center gap-2",children:[(0,_.jsx)(b.l65,{}),(0,_.jsx)("h1",{children:y.location})]}),y.website&&(0,_.jsx)("a",{target:"_blank",href:y.website,children:(0,_.jsxs)("div",{className:"flex items-center gap-2 hover:text-gray-300",children:[(0,_.jsx)(b.Utb,{}),(0,_.jsx)("h1",{children:"https://www."===y.website.substr(0,12)?y.website.substr(12,y.website.length):y.website})]})})]}),y&&(0,_.jsxs)("div",{className:"sm:absolute z-20 right-7 bottom-6 flex gap-3",children:[y.facebook&&(0,_.jsx)("a",{target:"_blank",href:"https://www.facebook.com/"+y.facebook,className:"hover:text-gray-300",children:(0,_.jsx)(j.kKz,{size:25})}),y.instagram&&(0,_.jsx)("a",{target:"_blank",className:"hover:text-gray-300",href:"https://www.instagram.com/"+y.instagram,children:(0,_.jsx)(j.Z8w,{size:25})}),y.github&&(0,_.jsx)("a",{target:"_blank",className:"hover:text-gray-300",href:"https://www.github.com/"+y.github,children:(0,_.jsx)(j.lfl,{size:25})}),y.linkedin&&(0,_.jsx)("a",{target:"_blank",className:"hover:text-gray-300",href:"https://www.linkedin.com/"+y.linkedin,children:(0,_.jsx)(j.juy,{size:25})}),y.twitter&&(0,_.jsx)("a",{target:"_blank",className:"hover:text-gray-300",href:"https://www.twitter.com/"+y.twitter,children:(0,_.jsx)(j.Xai,{size:25})})]}),y&&y.cover_image&&(0,_.jsx)("img",{className:"absolute top-0 left-0 z-0 w-full pb-1 opacity-40",src:y.cover_image,width:120,height:120,alt:"coverPhoto"})]})}),(0,_.jsxs)("div",{className:"text-center",children:[(0,_.jsx)("h1",{className:"my-3 font-bold text-xl",children:x("recent")}),(0,_.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-5 w-full my-4",children:f.map((function(e){return(0,_.jsx)(P,{post:e},e.permlink)}))})]})]})}},18977:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[author]",function(){return n(97076)}])},42804:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=c(n(34171)),i=c(n(96359)),a=c(n(99569)),s=c(n(98886)),o=c(n(78454)),l=c(n(56565)),u=c(n(84515));function c(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return{onAdPlay:r.default.bind(e),onBeforePlay:i.default.bind(e),onFullScreen:a.default.bind(e),onMute:s.default.bind(e),onPlay:o.default.bind(e),onTime:l.default.bind(e),onVideoLoad:u.default.bind(e)}}},34171:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){this.state.adHasPlayed?this.props.onAdResume(e):(this.props.onAdPlay(e),this.setState({adHasPlayed:!0}))}},96359:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=t.getPlaylistItem();this.state.hasPlayed||this.state.adHasPlayed||"function"!==typeof this.props.generatePrerollUrl||t.playAd(this.props.generatePrerollUrl(n))}},99569:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){e.fullscreen?this.props.onEnterFullScreen(e):this.props.onExitFullScreen(e)}},98886:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){e.mute?this.props.onMute(e):this.props.onUnmute(e)}},78454:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){"autostart"===e.playReason?(this.setState({hasPlayed:!0}),this.props.onAutoStart(e)):!this.state.hasPlayed||"buffering"!==e.oldstate&&"paused"!==e.oldstate?(this.props.onPlay(e),this.setState({hasPlayed:!0})):this.props.onResume(e)}},56565:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=this.state.hasFired,n=e.position,r=e.duration,i=!1;this.props.onTime(e),!t.threeSeconds&&n>3&&(this.props.onThreeSeconds(),t.threeSeconds=!0,i=!0),!t.tenSeconds&&n>10&&(this.props.onTenSeconds(),t.tenSeconds=!0,i=!0),!t.thirtySeconds&&n>30&&(this.props.onThirtySeconds(),t.thirtySeconds=!0,i=!0),!t.twentyFivePercent&&n/r*100>25&&(this.props.onTwentyFivePercent(),t.twentyFivePercent=!0,i=!0),!t.fiftyPercent&&n/r*100>50&&(this.props.onFiftyPercent(),t.fiftyPercent=!0,i=!0),!t.seventyFivePercent&&n/r*100>75&&(this.props.onSeventyFivePercent(),t.seventyFivePercent=!0,i=!0),!t.ninetyFivePercent&&n/r*100>95&&(this.props.onNinetyFivePercent(),t.ninetyFivePercent=!0,i=!0),i&&this.setState({hasFired:t})}},84515:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){this.setState({hasFired:{}}),this.props.onVideoLoad(e)}},19090:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){},r={aspectRatio:"inherit",file:"",isAutoPlay:void 0,isMuted:void 0,onAdPlay:n,onAdResume:n,onAdSkipped:n,onAdComplete:n,onEnterFullScreen:n,onExitFullScreen:n,onMute:n,onUnmute:n,onAutoStart:n,onResume:n,onPlay:n,onClose:n,onReady:n,onError:n,onAdPause:n,onPause:n,onVideoLoad:n,onOneHundredPercent:n,onThreeSeconds:n,onTenSeconds:n,onThirtySeconds:n,onTwentyFivePercent:n,onFiftyPercent:n,onSeventyFivePercent:n,onNinetyFivePercent:n,onTime:n,onBuffer:n,onBufferChange:n,playlist:"",useMultiplePlayerScripts:!1};t.default=r},53817:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e.onload||function(){};return function(){n(),t()}}},4080:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t;if("on"===e.slice(0,2)){var n=e.slice(2),r=(t=n,Array.isArray(t)?t:Array.from(t)),i=r[0],a=r.slice(1);return""+i.toLowerCase()+a.join("")}return null}},87890:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e){var t=e.aspectRatio,r=e.customProps,i=void 0===r?{}:r,a=e.file,s=e.generatePrerollUrl,o=e.image,l=e.isAutoPlay,u=e.isMuted,c=e.licenseKey,d=e.playlist,f=!!s,p={};return c&&(p.key=c),d?p.playlist=d:a&&(p.file=a),t&&"inherit"!==t&&(p.aspectratio=t),f&&(p.advertising={client:"googima",admessage:"Ad \u2014 xxs left",autoplayadsmuted:!0}),"undefined"!==typeof l&&(p.autostart=!!l),"undefined"!==typeof u&&(p.mute=!!u),o&&(p.image=o),n(p,i)}},7512:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n(4080),a=(r=i)&&r.__esModule?r:{default:r};t.default=function(e){var t=e.component,n=e.player,r=e.playerOpts;n.setup(r);var i={};Object.keys(t.props).forEach((function(e){var n=(0,a.default)(e);n&&(i[n]=t.props[e])})),i.adPlay=t.eventHandlers.onAdPlay,i.beforeComplete=t.props.onOneHundredPercent,i.beforePlay=function(e){t.eventHandlers.onBeforePlay(e,n)},i.fullscreen=t.eventHandlers.onFullScreen,i.mute=t.eventHandlers.onMute,i.play=t.eventHandlers.onPlay,i.playlistItem=t.eventHandlers.onVideoLoad,i.time=t.eventHandlers.onTime,Object.keys(i).forEach((function(e){n.on(e,i[e])}))}},12876:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.context,n=e.onLoadCallback,r=e.scriptSrc,i=e.uniqueScriptId,a=t.createElement("script");a.id=i,a.src=r,a.onload=n,t.head.appendChild(a)}},40648:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=t.jwplayer&&t.jwplayer(e);n&&n.remove()}},57668:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=e.context,n=e.playerId,r=t.__JW_PLAYER_CONFIGS__=t.__JW_PLAYER_CONFIGS__||{},i=r[n];i?t.jwplayer.defaults=i:r[n]=t.jwplayer.defaults}},84606:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n(45697),a=(r=i)&&r.__esModule?r:{default:r};var s={aspectRatio:a.default.oneOf(["inherit","1:1","16:9"]),className:a.default.string,customProps:a.default.object,file:a.default.string,generatePrerollUrl:a.default.func,image:a.default.string,isAutoPlay:a.default.bool,isMuted:a.default.bool,licenseKey:a.default.string,onAdPause:a.default.func,onAdPlay:a.default.func,onAdResume:a.default.func,onAdSkipped:a.default.func,onAdComplete:a.default.func,onAutoStart:a.default.func,onEnterFullScreen:a.default.func,onError:a.default.func,onExitFullScreen:a.default.func,onFiftyPercent:a.default.func,onMute:a.default.func,onNinetyFivePercent:a.default.func,onOneHundredPercent:a.default.func,onPause:a.default.func,onPlay:a.default.func,onReady:a.default.func,onResume:a.default.func,onSeventyFivePercent:a.default.func,onTenSeconds:a.default.func,onThirtySeconds:a.default.func,onThreeSeconds:a.default.func,onTwentyFivePercent:a.default.func,onUnmute:a.default.func,onVideoLoad:a.default.func,onBuffer:a.default.func,onBufferChange:a.default.func,playerId:a.default.string.isRequired,playerScript:a.default.string.isRequired,playlist:a.default.oneOfType([a.default.string,a.default.array]),useMultiplePlayerScripts:a.default.bool};t.default=s},47320:function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(67294),a=m(i),s=m(n(69590)),o=m(n(42804)),l=m(n(53817)),u=m(n(87890)),c=m(n(7512)),d=m(n(12876)),f=m(n(40648)),p=m(n(57668)),h=m(n(19090)),y=m(n(84606));function m(e){return e&&e.__esModule?e:{default:e}}var v=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={adHasPlayed:!1,hasPlayed:!1,hasFired:{}},n.eventHandlers=(0,o.default)(n),n.uniqueScriptId="jw-player-script",e.useMultiplePlayerScripts&&(n.uniqueScriptId+="-"+e.playerId),n.videoRef=null,n._initialize=n._initialize.bind(n),n._setVideoRef=n._setVideoRef.bind(n),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){var e=!!window.jwplayer,t=document.getElementById(this.uniqueScriptId),n=this.props.useMultiplePlayerScripts;n||!e?n&&t?this._initialize():t?t.onload=(0,l.default)(t,this._initialize):(0,d.default)({context:document,onLoadCallback:this._initialize,scriptSrc:this.props.playerScript,uniqueScriptId:this.uniqueScriptId}):this._initialize()}},{key:"shouldComponentUpdate",value:function(e){var t=this.props.file!==e.file,n=!(0,s.default)(this.props.playlist,e.playlist);return t||n}},{key:"componentDidUpdate",value:function(){window.jwplayer&&window.jwplayer(this.videoRef)&&this._initialize()}},{key:"componentWillUnmount",value:function(){(0,f.default)(this.videoRef,window)}},{key:"_initialize",value:function(){var e=this.props,t=e.playerId;e.useMultiplePlayerScripts&&(0,p.default)({context:window,playerId:t});var n=window.jwplayer(this.videoRef);if(n){var r=(0,u.default)(this.props);(0,c.default)({component:this,player:n,playerOpts:r})}}},{key:"_setVideoRef",value:function(e){this.videoRef=e}},{key:"render",value:function(){return a.default.createElement("div",{className:this.props.className},a.default.createElement("div",{id:this.props.playerId,ref:this._setVideoRef}))}}]),t}(i.Component);v.defaultProps=h.default,v.displayName="ReactJWPlayer",v.propTypes=y.default,t.Z=v}},function(e){e.O(0,[937,158,774,888,179],(function(){return t=18977,e(e.s=t);var t}));var t=e.O();_N_E=t}]);