(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[747],{10937:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return N}});var s=n(83789),i=n(80318),r=n(67294),a=n(11163),l=n(60590),o=n.n(l),c=n(87893),u=n(43196),d=n(2804),m=n(63569),f=n(89583),p=n(60155),h=n(85893),x=function(e){var t=e.comment,n=(0,d.sJ)(m.KL),s=(0,r.useState)(!1),i=s[0],l=s[1],c=(0,r.useState)(""),x=c[0],g=c[1],v=(0,r.useState)("#000"),j=v[0],y=v[1];(0,r.useEffect)((function(){var e=document.getElementById("comment-body-".concat(t.id));e&&(e.innerHTML=t.body)}),[]);return(0,r.useEffect)((function(){o().api.getDiscussionsByComments({start_author:t.author,start_permlink:t.permlink,limit:10},(function(e,t){console.log(t)}))})),(0,h.jsxs)("div",{className:"text-white bg-gray-600 p-4 rounded-xl border-2 border-gray-800",children:[(0,h.jsx)("h1",{onClick:function(){return a.default.push("/@".concat(t.author))},className:"text-xl font-semibold mb-2 hover:text-blue-200 cursor-pointer",children:t.author}),(0,h.jsxs)("div",{className:"text-white mx-1 whitespace-pre-wrap break-words",children:[(0,h.jsx)("div",{id:"comment-body-".concat(t.id)}),(0,h.jsxs)("div",{className:"w-auto",children:[(0,h.jsx)("div",{className:"flex",children:(0,h.jsxs)("div",{onClick:function(){return l(!i)},className:"hover:bg-gray-700 px-2 py-1 my-1 rounded-xl cursor-pointer flex items-center gap-2",children:[(0,h.jsx)(f.Bjt,{size:20,color:"#fff",className:"my-3"}),"(",t.replies.length,")"]})}),i&&(0,h.jsxs)("div",{className:"relative flex w-1/2",children:[(0,h.jsx)("input",{type:"text",className:"text-black w-full outline-none p-2 rounded-xl my-2",placeholder:"Write a reply",onChange:function(e){return g(e.target.value)}}),(0,h.jsx)(p.yhK,{color:j,size:25,onMouseEnter:function(){return y("#dcdcdc")},onMouseLeave:function(){return y("#000")},onClick:function(){(0,u.Hi)({author:n.name,body:x,parent_author:t.author,parent_permlink:t.permlink,permlink:"re-previous-".concat(t.author,"-").concat(t.permlink)})},className:"absolute right-4 top-4 cursor-pointer"})]})]})]}),t.replies.map((function(e){var n=document.getElementById("comment-body-".concat(t.id,"-replie-").concat(e.id));return n&&(n.innerHTML=e.body),(0,h.jsxs)("div",{className:"mx-3",children:[(0,h.jsx)("a",{target:"_blank",href:"https://peakd.com/@".concat(e.author),children:(0,h.jsx)("h1",{className:"text-xl font-semibold text-white hover:text-blue-200 cursor-pointer",children:e.author})}),(0,h.jsx)("h1",{id:"comment-body-".concat(t.id,"-replie-").concat(e.id),className:"text-white mx-2"})]})}))]})},g=n(9336),v=n(47320),j=n(83225),y=n.n(j),b=n(37039),w=n(53990),N=function(){var e,t=new c.Client(["https://api.hive.blog","https://api.hivekings.com","https://anyx.io","https://api.openhive.network"]),n=(0,r.useState)(0),l=n[0],j=n[1],N=(0,r.useState)(""),k=N[0],_=N[1],C=(0,r.useState)([]),S=C[0],E=C[1],H=(0,r.useState)(null),z=H[0],L=H[1],J=(0,r.useState)(!1),O=J[0],A=J[1],B=(0,r.useState)("#000"),I=B[0],Z=B[1],M=(0,r.useState)(!1),T=M[0],D=M[1],K=(0,r.useState)(!1),X=K[0],q=K[1],P=(0,r.useState)([]),U=P[0],$=P[1],F=(0,r.useState)(!1),V=F[0],G=F[1],Q=(0,r.useState)(""),R=Q[0],W=Q[1],Y=(0,r.useState)(!1),ee=Y[0],te=Y[1],ne=(0,r.useState)(""),se=ne[0],ie=ne[1],re=(0,r.useState)([]),ae=re[0],le=re[1],oe=(0,d.FV)(m.D2),ce=(0,i.Z)(oe,2),ue=(ce[0],ce[1]),de=(0,r.useState)(null),me=de[0],fe=de[1],pe=(0,d.FV)(m.Lf),he=(0,i.Z)(pe,2),xe=he[0],ge=he[1],ve=(0,a.useRouter)(),je=(0,d.sJ)(m.KL),ye=ve.query,be=ye.permlink,we=ye.author,Ne=(0,b.$G)().t;(0,r.useEffect)((function(){if(ee){document.title="DLUX | ".concat(me.title);var e=me.json_metadata,t=JSON.parse(e).vrHash,n=JSON.parse(e).scrolling,s=location.href.split("?")[1],i=document.createElement("iframe");i.id="theIframe",i.setAttribute("scrolling",n||"yes"),i.width="100%",i.height="100%",i.setAttribute("allowfullscreen","true"),i.setAttribute("allow","gyroscope; accelerometer; microphone; camera"),i.src="".concat(xe,"ipfs/").concat(t,"?").concat(s),document.getElementById("iframe-app")&&document.getElementById("iframe-app").appendChild(i)}}),[ee]);var ke=function(){(0,u.Ns)(je.name,se,be,l).then((function(e){e&&e.success&&ue((function(t){return[].concat((0,s.Z)(t),[e])}))}))};(0,r.useEffect)((function(){if(we||ve.push("/"),we&&"@"===we.substr(0,1)){if("https://anywhere.ipfs.dlux.io/"===xe){var e=we.substr(1,we.length).replace(".","-");ge("https://".concat(e,".ipfs.dlux.io/"))}ie(we.substr(1,we.length))}}),[]);return(0,r.useEffect)((function(){""!==se&&(o().api.getContent(se,be,(function(e,t){e&&console.log(e),fe(t),L(JSON.parse(t.json_metadata))})),t.database.call("get_content_replies",[se,be]).then((function(e){le(e)})))}),[se]),(0,r.useEffect)((function(){if(z){console.log(z);var e=[];if(z.image.forEach((function(t){e.push({url:t})})),0!==e.length&&$(e),z.app.includes("3speak")){A(!0);var t="https://ipfs.io/ipfs/"+z.video.info.ipfs,n="https://ipfs.io/ipfs/"+z.video.info.ipfsThumbnail;n&&t&&E((function(e){return[].concat((0,s.Z)(e),[{file:t,image:n}])}))}else{var i;(i=z.image&&Array.isArray(z.image)?z.image[0]:"string"==typeof z.image?z.image:z.Hash360&&(z.Hash360,1)?"https://ipfs.io/ipfs/".concat(z.Hash360):"https://www.dlux.io/img/dlux-sdk.png")&&"https"!==i.substr(0,5)&&(i="https://www.dlux.io/img/dlux-sdk.png"),W(i)}}}),[z]),ee?(0,h.jsxs)("div",{className:"w-full h-screen fixed top-0 left-0 bg-black text-white text-2xl font-bold bg-opacity-70",children:[(0,h.jsxs)("div",{className:"flex px-10 justify-between w-full bg-blue-500",children:[(0,h.jsx)("span",{className:"hover:text-gray-500 cursor-pointer",onClick:function(){document.querySelectorAll("iframe").forEach((function(e){return e.remove()})),te(!1)},children:"DLUX"}),(0,h.jsx)("span",{children:null===me||void 0===me?void 0:me.title})]}),(0,h.jsx)("div",{className:"w-full h-full",id:"iframe-app"})]}):me&&(0,h.jsxs)("div",{className:"w-full mx-auto max-w-3xl",children:[(0,h.jsx)("div",{className:"".concat(X?"":"hidden"," fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-50"),children:(0,h.jsx)("div",{className:"flex justify-center items-center w-full h-full",children:(0,h.jsxs)("div",{className:"w-2/3 h-auto relative bg-gray-500 border-2 border-gray-800 rounded-xl p-5",children:[(0,h.jsx)("button",{className:"m-2 absolute top-0 right-0",children:(0,h.jsx)(w.sQZ,{size:15,color:"#fff",opacity:100,onClick:function(){return q(!1)}})}),0!==U.length&&(0,h.jsx)("div",{className:"p-2",children:(0,h.jsx)("div",{className:"rounded-xl flex justify-center",children:(0,h.jsx)(y(),{height:500,width:1e3,images:U,showBullets:!0,showNavs:!0})})}),(0,h.jsx)("h1",{className:"my-5 text-center text-white font-semibold text-xl",children:me.root_title}),(0,h.jsx)(g.Z,{className:"mb-2 max-h-52 overflow-y-scroll text-white",children:me.body})]})})}),(0,h.jsxs)("div",{className:"flex justify-evenly flex-col w-full mt-10",children:[O?(0,h.jsx)("div",{onClick:function(){return q(!0)},className:"cursor-pointer w-full flex justify-center my-2",children:(0,h.jsx)(v.Z,{className:"rounded-xl w-4/5",playerId:"my-unique-id",playerScript:"https://cdn.jwplayer.com/libraries/HT7Dts3H.js",playlist:S})}):(0,h.jsx)("div",{onClick:function(){return q(!0)},className:"cursor-pointer flex justify-center w-full my-2",children:(0,h.jsx)("img",{src:R,className:"w-4/5",alt:"appPhoto"})}),JSON.parse(me.json_metadata).vrHash&&(0,h.jsx)("button",{className:"mx-auto px-4 py-2 rounded-lg border-2 text-white bg-blue-500 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700",onClick:function(){return te(!0)},children:Ne("runApp")}),(0,h.jsxs)("div",{className:"p-5",children:[(0,h.jsx)("h1",{className:"text-white text-3xl",children:null===me||void 0===me?void 0:me.title}),(0,h.jsx)("h1",{onClick:function(){return q(!0)},className:"text-white text-center sm:mx-3 sm:text-left text-lg cursor-pointer",children:null===(e=JSON.parse(me.json_metadata))||void 0===e?void 0:e.description}),(0,h.jsxs)("div",{className:"flex items-center w-full my-5 mx-2 gap-2",children:[T?(0,h.jsxs)("div",{onClick:ke,className:"flex text-white mx-1 gap-2 rounded-xl px-2 py-1 bg-green-500 cursor-pointer",children:[(0,h.jsx)(f.$0H,{size:25,color:"#fff"}),l/100,"%"]}):(0,h.jsx)("div",{className:"px-2 py-1 cursor-pointer",children:(0,h.jsx)(f.$0H,{size:25,color:"#fff",onClick:function(){G(!1),D(!0)}})}),V?(0,h.jsxs)("div",{onClick:ke,className:"flex text-white mx-1 gap-2 rounded-xl px-2 py-1 bg-red-500 cursor-pointer",children:[(0,h.jsx)(f.c0u,{size:25,color:"#fff"}),l/100,"%"]}):(0,h.jsx)("div",{className:"px-2 py-1 cursor-pointer",children:(0,h.jsx)(f.c0u,{size:25,color:"#fff",onClick:function(){D(!1),G(!0)}})}),(0,h.jsxs)("h1",{className:"text-white text-xl cursor-pointer",onClick:function(){D(!1),G(!1)},children:["(",me.active_votes.length,")"]})]}),(0,h.jsxs)("div",{className:"w-full",children:[T&&(0,h.jsx)("input",{className:"my-2 w-full",onChange:function(e){return j(+e.target.value)},type:"range",min:"0",max:"10000",value:"0"}),V&&(0,h.jsx)("input",{className:"my-2 w-full",onChange:function(e){return j(+e.target.value)},type:"range",min:"0",max:"10000",value:"0"})]}),(0,h.jsxs)("div",{className:"my-2",children:[(0,h.jsx)("h1",{className:"text-white border-b-2 border-white pb-1 text-2xl",children:Ne("comments")}),(0,h.jsxs)("div",{className:"relative flex",children:[(0,h.jsx)("input",{type:"text",className:"w-full outline-none p-2 rounded-xl my-2",placeholder:Ne("writeComment"),onChange:function(e){return _(e.target.value)}}),(0,h.jsx)(p.yhK,{color:I,size:25,onMouseEnter:function(){return Z("#dcdcdc")},onMouseLeave:function(){return Z("#000")},onClick:function(){(0,u.UI)({author:je.name,title:"",body:k,parent_author:se,parent_permlink:be,permlink:"re-previous-".concat(se,"-").concat(be),json_metadata:JSON.stringify({tags:["hiveio"]})}),_("")},className:"absolute right-4 top-4 cursor-pointer"})]}),(0,h.jsx)("div",{className:"flex flex-col justify-center gap-3 my-3",children:ae.map((function(e){return(0,h.jsx)(x,{comment:e},e.id)}))})]})]})]})]})}},71425:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[author]/[permlink]",function(){return n(10937)}])}},function(e){e.O(0,[720,260,794,774,888,179],(function(){return t=71425,e(e.s=t);var t}));var t=e.O();_N_E=t}]);