(this.webpackJsonpasimexamappclient=this.webpackJsonpasimexamappclient||[]).push([[5],{437:function(e,t,a){"use strict";a.d(t,"f",(function(){return c})),a.d(t,"e",(function(){return l})),a.d(t,"a",(function(){return u})),a.d(t,"d",(function(){return o})),a.d(t,"g",(function(){return d})),a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return m}));var r=a(8),s=a(50),n=a.n(s);const c=async e=>{try{let t=await r.a.firestore().collection("users").doc(e).get();return t.exists?{status:200,id:t.id,data:t.data()}:{status:400,message:"Invalid userid"}}catch(t){return{status:400,message:"Error occured: "+t.message}}},l=async(e,t)=>{try{return await r.a.firestore().collection("users").doc(e).update({batchno:t}),await n.a.post("/cloud/payments/uid",{uid:e,batchno:t}),{status:200,message:"Successfully updated batch no"}}catch(a){return{status:400,message:"Error occured: "+a.message}}},u=async e=>{try{let t=await r.a.firestore().collection("attendence").where("id","==",e).get();if(t.empty)return{status:400,message:"No data found"};{let e=t.docs,a=[],r=[];for(let t=0;t<e.length;t++){let s=e[t].id,n=e[t].data();"HS"===n.filter?a.push({docid:s,...n}):r.push({docid:s,...n})}return{status:200,hs:a,joint:r}}}catch(t){return{status:400,message:"Error occured: "+t.message}}},o=async e=>{try{let t=await r.a.firestore().collection("results").where("id","==",e).get();if(t.empty)return{status:400,message:"No data found"};{let e=t.docs,a=[],r=[];for(let t=0;t<e.length;t++){let s=e[t].id;"HS"===e[t].data().filter?a.push({itemid:s,...e[t].data()}):r.push({itemid:s,...e[t].data()})}return{status:200,hs:a,joint:r}}}catch(t){return{status:400,message:"Error occured: "+t.message}}},d=async(e,t)=>{try{return await r.a.firestore().collection("results").doc(e).update({marks:t}),{status:200,message:"Successfully updated"}}catch(a){return{status:400,message:"Error occured: "+a.message}}},i=async e=>{try{let t=await r.a.firestore().collection("faircopy").where("id","==",e).get();if(t.empty)return{status:400,message:"No data found"};{let e=t.docs,a=[],r=[];for(let t=0;t<e.length;t++){let s=e[t].data(),n=e[t].id;"HS"===s.filter?a.push({fairid:n,...s}):r.push({fairid:n,...s})}return{status:200,hs:a,joint:r}}}catch(t){return{status:400,message:"Error occured: "+t.message}}},m=async e=>{try{return await r.a.firestore().collection("faircopy").doc(e).delete(),{status:200,message:"Successfully deleted"}}catch(t){return{status:400,message:"Error occured: "+t.message}}}},442:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return d}));var r=a(0),s=a.n(r),n=a(386),c=a(408),l=a(410),u=a(437),o=a(42);function d(e){const[t,a]=Object(r.useState)(""),[d,i]=Object(r.useState)([]),[m,f]=Object(r.useState)([]),h=Object(o.a)();Object(r.useEffect)(()=>{g()},[e.uid]);const g=async()=>{const{uid:t}=e;if(t){let e=await Object(u.a)(t);200==e.status?(i(e.hs),f(e.joint)):a(e.message)}};return s.a.createElement("div",null,s.a.createElement(n.a,null,d.length>0&&s.a.createElement(c.a,null,s.a.createElement("h4",null,"HS Days"),s.a.createElement(l.a,{striped:!0,hover:!0,bordered:!0},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"#"),s.a.createElement("th",null,"Not Attended dates"))),s.a.createElement("tbody",null,d.map((e,t)=>{let a=new Date(e.date);return s.a.createElement("tr",{key:t},s.a.createElement("td",null,t+1),s.a.createElement("td",null,a.getDate(),"-",a.getMonth()+1,"-",a.getFullYear()))})))),m.length>0&&s.a.createElement(c.a,null,s.a.createElement("h4",null,"Joint Days"),s.a.createElement(l.a,{striped:!0,bordered:!0,hover:!0},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"#"),s.a.createElement("th",null,"Not Attended dates"))),s.a.createElement("tbody",null,m.map((e,t)=>{let a=new Date(e.date);return s.a.createElement("tr",{key:t},s.a.createElement("td",null,t+1),s.a.createElement("td",null,a.getDate(),"-",a.getMonth()+1,"-",a.getFullYear()))}))))),t&&s.a.createElement("p",{style:{color:h.palette.error.main,fontSize:20}},t))}}}]);
//# sourceMappingURL=5.139b4e96.chunk.js.map