(this.webpackJsonpasimexamappclient=this.webpackJsonpasimexamappclient||[]).push([[9],{424:function(t,e,c){"use strict";c.r(e),c.d(e,"default",(function(){return O}));var r=c(4),n=c.n(r),j=c(9),s=c(6),d=c(1),i=c(11),a=(c(26),function(){var t=Object(j.a)(n.a.mark((function t(e){return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.firestore().collection("payments").doc(e).get().then((function(t){return t.exists?{status:200,data:t.data()}:{status:400,message:"No Payment yet"}})).catch((function(t){return{status:400,message:"Error Occured:"+t.message}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),b=c(390),h=c(44),l=c(0);function O(t){var e=Object(d.useState)(""),c=Object(s.a)(e,2),r=c[0],i=c[1],O=Object(d.useState)(""),u=Object(s.a)(O,2),x=u[0],o=u[1],m=Object(h.a)();Object(d.useEffect)((function(){p()}),[t.uid]);var p=function(){var e=Object(j.a)(n.a.mark((function e(){var c,r,j;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(c=t.uid)){e.next=6;break}return e.next=4,a(c);case 4:200===(r=e.sent).status?(j=r.data,o(j)):i(r.message);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{children:[Object(l.jsxs)(b.a,{striped:!0,hover:!0,bordered:!0,children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"#"}),Object(l.jsx)("th",{children:"Month"}),Object(l.jsx)("th",{children:"Paid Amount"})]})}),Object(l.jsxs)("tbody",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"1"}),Object(l.jsx)("td",{children:"April"}),Object(l.jsx)("td",{children:x&&x.april.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"2"}),Object(l.jsx)("td",{children:"May"}),Object(l.jsx)("td",{children:x&&x.may.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"3"}),Object(l.jsx)("td",{children:"June"}),Object(l.jsx)("td",{children:x&&x.jun.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"4"}),Object(l.jsx)("td",{children:"July"}),Object(l.jsx)("td",{children:x&&x.july.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"5"}),Object(l.jsx)("td",{children:"August"}),Object(l.jsx)("td",{children:x&&x.aug.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"6"}),Object(l.jsx)("td",{children:"September"}),Object(l.jsx)("td",{children:x&&x.sept.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"7"}),Object(l.jsx)("td",{children:"October"}),Object(l.jsx)("td",{children:x&&x.oct.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"8"}),Object(l.jsx)("td",{children:"November"}),Object(l.jsx)("td",{children:x&&x.nov.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"9"}),Object(l.jsx)("td",{children:"December"}),Object(l.jsx)("td",{children:x&&x.dec.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"10"}),Object(l.jsx)("td",{children:"January"}),Object(l.jsx)("td",{children:x&&x.jan.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"11"}),Object(l.jsx)("td",{children:"February"}),Object(l.jsx)("td",{children:x&&x.feb.amount})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"12"}),Object(l.jsx)("td",{children:"March"}),Object(l.jsx)("td",{children:x&&x.march.amount})]})]})]}),r&&Object(l.jsx)("p",{style:{color:m.palette.error.main,fontSize:20},children:r})]})}}}]);
//# sourceMappingURL=9.c61f6521.chunk.js.map