(this["webpackJsonpsubtitle-maker"]=this["webpackJsonpsubtitle-maker"]||[]).push([[0],{13:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var a=n(1),i=n.n(a),c=n(7),o=n.n(c),r=(n(13),n(8)),s=n(2),h=n(3),l=n(5),u=n(4),f=n(0),d=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(f.jsx)("input",{className:"textInput",onChange:this.props.onChange,type:"text",size:"40",placeholder:"Type text here!"})}}]),n}(a.Component),j=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(f.jsx)("div",{className:"upload-tab",children:Object(f.jsx)("input",{accept:"image/*",type:"file",id:"imgInp",onChange:this.props.onChange})})}}]),n}(a.Component),p=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(f.jsx)("a",{onClick:this.props.onClick,href:this.props.href,className:"download-button",download:"sample.png",children:"Download"})}}]),n}(a.Component),b=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(f.jsx)("input",{type:"number",value:this.props.fontSize,onChange:this.props.onChange})}}]),n}(a.Component),g=n.p+"static/media/intro.f89c8be8.png",v=(n(15),function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(s.a)(this,n),(a=e.call(this,t)).handleCanvasHref=function(t){a.setState({href:t})},a.handleTextChange=function(t){a.setState({text:t.target.value})},a.handleFontsizeChange=function(t){a.setState({fontSize:t.target.value})},a.handleCanvasSize=function(t){"width"===t.target.name?a.setState({width:t.target.value}):"height"===t.target.name&&a.setState({height:t.target.value})},a.handleImgChange=function(t){var e=Object(r.a)(t.target.files,1)[0];if(e){var n=URL.createObjectURL(e);a.setState({img:n})}},a.testDownloadBtn=function(t){var e=a.state.href,n=a.canvasRef.current.toDataURL();e!==n&&a.handleCanvasHref(n)},a.state={text:"\ud30c\uc77c\uc744 \uc120\ud0dd\ud558\uace0 \uc790\ub9c9\uc744 \ub123\uc5b4\ubcf4\uc138\uc694",href:"/",width:"500",height:"500",img:g,fontFamily:"Nanum Gothic",fontColor:"White",fontSize:30},a.canvasRef=i.a.createRef(),a}return Object(h.a)(n,[{key:"createCanvas",value:function(){var t=this,e=this.canvasRef.current,n=e.getContext("2d"),a=this.state,i=a.text,c=a.img,o=new Image;o.src=c,o.onload=function(){e.width=o.width,e.height=o.height,n.drawImage(o,0,0,e.width,e.height),t.setFont(e,i)}}},{key:"setFont",value:function(t,e){var n=t.getContext("2d"),a=this.state,i=a.fontFamily,c=a.fontSize,o=a.fontColor,r="black".textBorder;n.fillStyle=o,n.textAlign="center",n.textBaseLine="middle",n.font="normal ".concat(c,"px ").concat(i);var s=e.split("\n");s.forEach((function(e,a){n.lineWidth=5,n.strokeStyle="".concat(r),n.strokeText(e,t.width/2,t.height-c*(s.length-a)*1.5),n.fillStyle=o,n.fillText(e,t.width/2,t.height-c*(s.length-a)*1.5)}))}},{key:"componentDidMount",value:function(){this.createCanvas()}},{key:"componentDidUpdate",value:function(){this.createCanvas()}},{key:"render",value:function(){return Object(f.jsxs)("div",{children:[Object(f.jsx)("h1",{children:"\uc790\ub9c9\uc0dd\uc131\uae30 BETA"}),Object(f.jsx)(j,{onChange:this.handleImgChange}),Object(f.jsx)("div",{className:"canvasTab",children:Object(f.jsx)("canvas",{ref:this.canvasRef,className:"previewCanvas"})}),Object(f.jsx)(d,{onChange:this.handleTextChange}),Object(f.jsx)(b,{fontSize:this.state.fontSize,onChange:this.handleFontsizeChange}),Object(f.jsx)(p,{href:this.state.href,onClick:this.testDownloadBtn})]})}}]),n}(i.a.Component));o.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(v,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.78d1ab9a.chunk.js.map