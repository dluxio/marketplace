(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[747],{10937:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var s=n(83789),a=n(80318),i=n(67294),r=n(11163),l=n(60590),c=n.n(l),o=n(87893),u=n(43196),d=n(2804),m=n(63569),f=n(89583),p=n(60155),h=n(85893),x=function(e){var t=e.comment,n=(0,d.sJ)(m.KL),s=(0,i.useState)(!1),a=s[0],r=s[1],l=(0,i.useState)(""),c=l[0],o=l[1],x=(0,i.useState)("#000"),g=x[0],v=x[1];(0,i.useEffect)((function(){var e=document.getElementById("comment-body-".concat(t.id));e&&(e.innerHTML=t.body)}),[]);return(0,h.jsxs)("div",{className:"text-black",children:[(0,h.jsx)("a",{target:"_blank",href:"https://peakd.com/@".concat(t.author),children:(0,h.jsx)("h1",{className:"text-xl hover:text-blue-200 cursor-pointer",children:t.author})}),(0,h.jsxs)("div",{className:"text-white mx-2",children:[(0,h.jsx)("h1",{id:"comment-body-".concat(t.id)}),(0,h.jsxs)("div",{className:"w-auto",children:[(0,h.jsx)("div",{className:"flex",children:(0,h.jsxs)("div",{onClick:function(){return r(!a)},className:"hover:bg-gray-600 px-2 py-1 rounded-xl flex items-center gap-2",children:[(0,h.jsx)(f.Bjt,{size:20,color:"#fff",className:"my-3"}),"(",t.replies.length,")"]})}),a&&(0,h.jsxs)("div",{className:"relative flex w-1/2",children:[(0,h.jsx)("input",{type:"text",className:"text-black w-full outline-none p-2 rounded-xl my-2",placeholder:"Write a reply",onChange:function(e){return o(e.target.value)}}),(0,h.jsx)(p.yhK,{color:g,size:25,onMouseEnter:function(){return v("#dcdcdc")},onMouseLeave:function(){return v("#000")},onClick:function(){(0,u.Hi)({author:n.name,body:c,parent_author:t.author,parent_permlink:t.permlink,permlink:"re-previous-".concat(t.author,"-").concat(t.permlink)})},className:"absolute right-4 top-4 cursor-pointer"})]})]})]}),t.replies.map((function(e){var n=document.getElementById("comment-body-".concat(t.id,"-replie-").concat(e.id));return n&&(n.innerHTML=e.body),(0,h.jsxs)("div",{className:"mx-3",children:[(0,h.jsx)("a",{target:"_blank",href:"https://peakd.com/@".concat(e.author),children:(0,h.jsx)("h1",{className:"text-xl hover:text-blue-200 cursor-pointer",children:e.author})}),(0,h.jsx)("h1",{id:"comment-body-".concat(t.id,"-replie-").concat(e.id),className:"text-white mx-2"})]})}))]})},g=function(){var e=new o.Client(["https://api.hive.blog","https://api.hivekings.com","https://anyx.io","https://api.openhive.network"]),t=(0,i.useState)(0),n=t[0],l=t[1],g=(0,i.useState)(""),v=g[0],j=g[1],y=(0,i.useState)("#000"),N=y[0],w=y[1],b=(0,i.useState)(!1),k=b[0],_=b[1],C=(0,i.useState)(!1),S=C[0],E=C[1],H=(0,i.useState)(""),L=H[0],z=H[1],A=(0,i.useState)(!0),I=A[0],J=A[1],M=(0,i.useState)(""),O=M[0],B=M[1],K=(0,i.useState)([]),T=K[0],X=K[1],D=(0,d.FV)(m.D2),P=(0,a.Z)(D,2),U=(P[0],P[1]),Z=(0,i.useState)(null),q=Z[0],F=Z[1],R=(0,d.FV)(m.Lf),V=(0,a.Z)(R,2),W=V[0],$=V[1],G=(0,r.useRouter)(),Q=(0,d.sJ)(m.KL),Y=G.query,ee=Y.permlink,te=Y.author,ne=function(){document.title="DLUX | ".concat(q.title);var e=q.json_metadata,t=JSON.parse(e).vrHash,n=JSON.parse(e).scrolling,s=location.href.split("?")[1],a=document.createElement("iframe");a.id="theIframe",a.setAttribute("scrolling",n||"yes"),a.width="100%",a.height="100%",a.setAttribute("allowfullscreen","true"),a.setAttribute("allow","gyroscope; accelerometer; microphone; camera"),a.src="".concat(W,"ipfs/").concat(t,"?").concat(s),J(!0),document.getElementById("iframe-app")&&document.getElementById("iframe-app").appendChild(a)},se=function(){(0,u.Ns)(Q.name,O,ee,n).then((function(e){e&&e.success&&U((function(t){return[].concat((0,s.Z)(t),[e])}))}))};(0,i.useEffect)((function(){if(te||G.push("/"),te&&"@"===te.substr(0,1)){if("https://anywhere.ipfs.dlux.io/"===W){var e=te.substr(1,te.length).replace(".","-");$("https://".concat(e,".ipfs.dlux.io/"))}B(te.substr(1,te.length))}}),[]),(0,i.useEffect)((function(){q&&ne()}),[q]);return(0,i.useEffect)((function(){""!==O&&(c().api.getContent(O,ee,(function(e,t){e&&console.log(e),function(e){var t;"https"!==(t=e.image&&Array.isArray(e.image)?e.image[0]:"string"==typeof e.image?e.image:e.Hash360&&(e.Hash360,1)?"https://ipfs.io/ipfs/".concat(e.Hash360):"https://www.dlux.io/img/dlux-sdk.png").substr(0,5)&&(t="https://www.dlux.io/img/dlux-sdk.png"),z(t)}(JSON.parse(t.json_metadata)),F(t)})),e.database.call("get_content_replies",[O,ee]).then((function(e){X(e)})))}),[O]),I?(0,h.jsxs)("div",{className:"w-full h-screen fixed top-0 left-0 bg-black text-white text-2xl font-bold bg-opacity-70",children:[(0,h.jsxs)("div",{className:"flex px-10 justify-between w-full bg-blue-500",children:[(0,h.jsx)("span",{className:"hover:text-gray-500 cursor-pointer",onClick:function(){document.querySelectorAll("iframe").forEach((function(e){return e.remove()})),J(!1)},children:"DLUX"}),(0,h.jsx)("span",{children:null===q||void 0===q?void 0:q.title})]}),(0,h.jsx)("div",{className:"w-full h-full",id:"iframe-app"})]}):(0,h.jsx)("div",{className:"w-full mx-auto max-w-3xl",children:(0,h.jsxs)("div",{className:"flex justify-evenly flex-col w-full mt-10",children:[(0,h.jsxs)("div",{className:"p-5 mx-auto",children:[(0,h.jsx)("img",{src:L,alt:"appPhoto",width:600}),(0,h.jsx)("button",{onClick:ne,className:"bg-blue-500 mx-auto my-2 w-full text-white px-7 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-yellow-700",children:"Run app"})]}),(0,h.jsxs)("div",{className:"p-5",children:[(0,h.jsx)("h1",{className:"text-white text-3xl",children:null===q||void 0===q?void 0:q.title}),(0,h.jsxs)("div",{className:"flex w-full my-5 mx-2 gap-2",children:[k?(0,h.jsxs)("div",{onClick:se,className:"flex text-white mx-1 gap-2 rounded-xl px-2 py-1 bg-green-500 cursor-pointer",children:[(0,h.jsx)(f.$0H,{size:25,color:"#fff"}),n/100,"%"]}):(0,h.jsx)(f.$0H,{className:"cursor-pointer",size:25,color:"#fff",onClick:function(){E(!1),_(!0)}}),S?(0,h.jsxs)("div",{onClick:se,className:"flex text-white mx-1 gap-2 rounded-xl px-2 py-1 bg-red-500 cursor-pointer",children:[(0,h.jsx)(f.c0u,{size:25,color:"#fff"}),n/100,"%"]}):(0,h.jsx)(f.c0u,{className:"cursor-pointer",size:25,color:"#fff",onClick:function(){_(!1),E(!0)}})]}),(0,h.jsxs)("div",{className:"w-full",children:[k&&(0,h.jsx)("input",{className:"my-2 w-full",onChange:function(e){return l(+e.target.value)},type:"range",min:"0",max:"10000",value:"0"}),S&&(0,h.jsx)("input",{className:"my-2 w-full",onChange:function(e){return l(+e.target.value)},type:"range",min:"0",max:"10000",value:"0"})]}),(0,h.jsxs)("div",{className:"my-2",children:[(0,h.jsx)("h1",{className:"text-white border-b-2 border-white pb-1 text-2xl",children:"Comments"}),(0,h.jsxs)("div",{className:"relative flex",children:[(0,h.jsx)("input",{type:"text",className:"w-full outline-none p-2 rounded-xl my-2",placeholder:"Write a comment",onChange:function(e){return j(e.target.value)}}),(0,h.jsx)(p.yhK,{color:N,size:25,onMouseEnter:function(){return w("#dcdcdc")},onMouseLeave:function(){return w("#000")},onClick:function(){(0,u.UI)({author:Q.name,title:"",body:v,parent_author:O,parent_permlink:ee,permlink:"re-previous-".concat(O,"-").concat(ee),json_metadata:JSON.stringify({tags:["hiveio"]})}),j("")},className:"absolute right-4 top-4 cursor-pointer"})]}),(0,h.jsx)("div",{className:"flex flex-col justify-center gap-3 my-3",children:T.map((function(e){return(0,h.jsx)(x,{comment:e},e.id)}))})]})]})]})})}},71425:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[author]/[permlink]",function(){return n(10937)}])}},function(e){e.O(0,[260,720,774,888,179],(function(){return t=71425,e(e.s=t);var t}));var t=e.O();_N_E=t}]);