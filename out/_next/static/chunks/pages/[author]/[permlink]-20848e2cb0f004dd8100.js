(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[747],{10937:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var s=n(83789),r=n(80318),a=n(67294),i=n(11163),o=n(60590),l=n.n(o),c=n(87893),u=n(43196),d=n(2804),m=n(63569),p=n(89583),x=n(60155),h=n(85893),f=function(e){var t=e.comment,n=(0,d.sJ)(m.KL),s=(0,a.useState)(!1),r=s[0],o=s[1],l=(0,a.useState)(""),c=l[0],f=l[1],g=(0,a.useState)("#000"),v=g[0],j=g[1];(0,a.useEffect)((function(){console.log(t);var e=document.getElementById("comment-body-".concat(t.id));e&&(e.innerHTML=t.body)}),[]);return(0,h.jsxs)("div",{className:"text-white bg-gray-600 p-4 rounded-xl border-2 border-gray-800",children:[(0,h.jsx)("h1",{onClick:function(){return i.default.push("/@".concat(t.author))},className:"text-xl font-semibold mb-2 hover:text-blue-200 cursor-pointer",children:t.author}),(0,h.jsxs)("div",{className:"text-white mx-1 whitespace-pre-wrap break-words",children:[(0,h.jsx)("h1",{id:"comment-body-".concat(t.id)}),(0,h.jsxs)("div",{className:"w-auto",children:[(0,h.jsx)("div",{className:"flex",children:(0,h.jsxs)("div",{onClick:function(){return o(!r)},className:"hover:bg-gray-700 px-2 py-1 my-1 rounded-xl cursor-pointer flex items-center gap-2",children:[(0,h.jsx)(p.Bjt,{size:20,color:"#fff",className:"my-3"}),"(",t.replies.length,")"]})}),r&&(0,h.jsxs)("div",{className:"relative flex w-1/2",children:[(0,h.jsx)("input",{type:"text",className:"text-black w-full outline-none p-2 rounded-xl my-2",placeholder:"Write a reply",onChange:function(e){return f(e.target.value)}}),(0,h.jsx)(x.yhK,{color:v,size:25,onMouseEnter:function(){return j("#dcdcdc")},onMouseLeave:function(){return j("#000")},onClick:function(){(0,u.Hi)({author:n.name,body:c,parent_author:t.author,parent_permlink:t.permlink,permlink:"re-previous-".concat(t.author,"-").concat(t.permlink)})},className:"absolute right-4 top-4 cursor-pointer"})]})]})]}),t.replies.map((function(e){var n=document.getElementById("comment-body-".concat(t.id,"-replie-").concat(e.id));return n&&(n.innerHTML=e.body),(0,h.jsxs)("div",{className:"mx-3",children:[(0,h.jsx)("a",{target:"_blank",href:"https://peakd.com/@".concat(e.author),children:(0,h.jsx)("h1",{className:"text-xl font-semibold text-white hover:text-blue-200 cursor-pointer",children:e.author})}),(0,h.jsx)("h1",{id:"comment-body-".concat(t.id,"-replie-").concat(e.id),className:"text-white mx-2"})]})}))]})},g=function(){var e,t=new c.Client(["https://api.hive.blog","https://api.hivekings.com","https://anyx.io","https://api.openhive.network"]),n=(0,a.useState)(0),o=n[0],g=n[1],v=(0,a.useState)(""),j=v[0],b=v[1],y=(0,a.useState)("#000"),N=y[0],w=y[1],k=(0,a.useState)(!1),_=k[0],C=k[1],S=(0,a.useState)(!1),E=S[0],H=S[1],L=(0,a.useState)(""),J=L[0],O=L[1],z=(0,a.useState)(!1),A=z[0],I=z[1],M=(0,a.useState)(""),B=M[0],K=M[1],T=(0,a.useState)([]),X=T[0],D=T[1],P=(0,d.FV)(m.D2),U=(0,r.Z)(P,2),Z=(U[0],U[1]),q=(0,a.useState)(null),F=q[0],R=q[1],V=(0,d.FV)(m.Lf),W=(0,r.Z)(V,2),$=W[0],G=W[1],Q=(0,i.useRouter)(),Y=(0,d.sJ)(m.KL),ee=Q.query,te=ee.permlink,ne=ee.author;(0,a.useEffect)((function(){if(A){document.title="DLUX | ".concat(F.title);var e=F.json_metadata,t=JSON.parse(e).vrHash,n=JSON.parse(e).scrolling,s=location.href.split("?")[1],r=document.createElement("iframe");r.id="theIframe",r.setAttribute("scrolling",n||"yes"),r.width="100%",r.height="100%",r.setAttribute("allowfullscreen","true"),r.setAttribute("allow","gyroscope; accelerometer; microphone; camera"),r.src="".concat($,"ipfs/").concat(t,"?").concat(s),document.getElementById("iframe-app")&&document.getElementById("iframe-app").appendChild(r)}}),[A]);var se=function(){(0,u.Ns)(Y.name,B,te,o).then((function(e){e&&e.success&&Z((function(t){return[].concat((0,s.Z)(t),[e])}))}))};(0,a.useEffect)((function(){if(ne||Q.push("/"),ne&&"@"===ne.substr(0,1)){if("https://anywhere.ipfs.dlux.io/"===$){var e=ne.substr(1,ne.length).replace(".","-");G("https://".concat(e,".ipfs.dlux.io/"))}K(ne.substr(1,ne.length))}}),[]);return(0,a.useEffect)((function(){""!==B&&(l().api.getContent(B,te,(function(e,t){e&&console.log(e),function(e){var t;"https"!==(t=e.image&&Array.isArray(e.image)?e.image[0]:"string"==typeof e.image?e.image:e.Hash360&&(e.Hash360,1)?"https://ipfs.io/ipfs/".concat(e.Hash360):"https://www.dlux.io/img/dlux-sdk.png").substr(0,5)&&(t="https://www.dlux.io/img/dlux-sdk.png"),O(t)}(JSON.parse(t.json_metadata)),R(t)})),t.database.call("get_content_replies",[B,te]).then((function(e){D(e)})))}),[B]),A?(0,h.jsxs)("div",{className:"w-full h-screen fixed top-0 left-0 bg-black text-white text-2xl font-bold bg-opacity-70",children:[(0,h.jsxs)("div",{className:"flex px-10 justify-between w-full bg-blue-500",children:[(0,h.jsx)("span",{className:"hover:text-gray-500 cursor-pointer",onClick:function(){document.querySelectorAll("iframe").forEach((function(e){return e.remove()})),I(!1)},children:"DLUX"}),(0,h.jsx)("span",{children:null===F||void 0===F?void 0:F.title})]}),(0,h.jsx)("div",{className:"w-full h-full",id:"iframe-app"})]}):F&&(0,h.jsx)("div",{className:"w-full mx-auto max-w-3xl",children:(0,h.jsxs)("div",{className:"flex justify-evenly flex-col w-full mt-10",children:[(0,h.jsx)("div",{className:"p-5 mx-auto",children:(0,h.jsx)("img",{src:J,alt:"appPhoto",width:600})}),JSON.parse(F.json_metadata).vrHash&&(0,h.jsx)("button",{className:"mx-auto px-4 py-2 rounded-lg border-2 text-white bg-blue-500 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700",onClick:function(){return I(!0)},children:"Run app"}),(0,h.jsxs)("div",{className:"p-5",children:[(0,h.jsx)("h1",{className:"text-white text-3xl",children:null===F||void 0===F?void 0:F.title}),(0,h.jsx)("h1",{className:"text-white text-center sm:mx-3 sm:text-left text-lg",children:null===(e=JSON.parse(F.json_metadata))||void 0===e?void 0:e.description}),(0,h.jsxs)("div",{className:"flex items-center w-full my-5 mx-2 gap-2",children:[_?(0,h.jsxs)("div",{onClick:se,className:"flex text-white mx-1 gap-2 rounded-xl px-2 py-1 bg-green-500 cursor-pointer",children:[(0,h.jsx)(p.$0H,{size:25,color:"#fff"}),o/100,"%"]}):(0,h.jsx)("div",{className:"px-2 py-1 cursor-pointer",children:(0,h.jsx)(p.$0H,{size:25,color:"#fff",onClick:function(){H(!1),C(!0)}})}),E?(0,h.jsxs)("div",{onClick:se,className:"flex text-white mx-1 gap-2 rounded-xl px-2 py-1 bg-red-500 cursor-pointer",children:[(0,h.jsx)(p.c0u,{size:25,color:"#fff"}),o/100,"%"]}):(0,h.jsx)("div",{className:"px-2 py-1 cursor-pointer",children:(0,h.jsx)(p.c0u,{size:25,color:"#fff",onClick:function(){C(!1),H(!0)}})}),(0,h.jsxs)("h1",{className:"text-white text-xl cursor-pointer",onClick:function(){C(!1),H(!1)},children:["(",F.active_votes.length,")"]})]}),(0,h.jsxs)("div",{className:"w-full",children:[_&&(0,h.jsx)("input",{className:"my-2 w-full",onChange:function(e){return g(+e.target.value)},type:"range",min:"0",max:"10000",value:"0"}),E&&(0,h.jsx)("input",{className:"my-2 w-full",onChange:function(e){return g(+e.target.value)},type:"range",min:"0",max:"10000",value:"0"})]}),(0,h.jsxs)("div",{className:"my-2",children:[(0,h.jsx)("h1",{className:"text-white border-b-2 border-white pb-1 text-2xl",children:"Comments"}),(0,h.jsxs)("div",{className:"relative flex",children:[(0,h.jsx)("input",{type:"text",className:"w-full outline-none p-2 rounded-xl my-2",placeholder:"Write a comment",onChange:function(e){return b(e.target.value)}}),(0,h.jsx)(x.yhK,{color:N,size:25,onMouseEnter:function(){return w("#dcdcdc")},onMouseLeave:function(){return w("#000")},onClick:function(){(0,u.UI)({author:Y.name,title:"",body:j,parent_author:B,parent_permlink:te,permlink:"re-previous-".concat(B,"-").concat(te),json_metadata:JSON.stringify({tags:["hiveio"]})}),b("")},className:"absolute right-4 top-4 cursor-pointer"})]}),(0,h.jsx)("div",{className:"flex flex-col justify-center gap-3 my-3",children:X.map((function(e){return(0,h.jsx)(f,{comment:e},e.id)}))})]})]})]})})}},71425:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[author]/[permlink]",function(){return n(10937)}])}},function(e){e.O(0,[720,260,774,888,179],(function(){return t=71425,e(e.s=t);var t}));var t=e.O();_N_E=t}]);