import{k as x,r as n,u as o,j as e,g as u}from"./index-BPqJGxuR.js";const m=async s=>await x.firestore().collection("payments").doc(s).get().then(r=>r.exists?{status:200,data:r.data()}:{status:400,message:"No Payment yet"}).catch(r=>({status:400,message:"Error Occured:"+r.message}));function f(s){const[r,i]=n.useState(""),[t,l]=n.useState(""),a=o();n.useEffect(()=>{h()},[s.uid]);const h=async()=>{const{uid:c}=s;if(c){let d=await m(c);if(d.status==200){let j=d.data;l(j)}else i(d.message)}};return e.jsxs("div",{children:[e.jsxs(u,{striped:!0,hover:!0,bordered:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Month"}),e.jsx("th",{children:"Paid Amount"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"1"}),e.jsx("td",{children:"April"}),e.jsx("td",{children:t&&t.april.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"2"}),e.jsx("td",{children:"May"}),e.jsx("td",{children:t&&t.may.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"3"}),e.jsx("td",{children:"June"}),e.jsx("td",{children:t&&t.jun.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"4"}),e.jsx("td",{children:"July"}),e.jsx("td",{children:t&&t.july.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"5"}),e.jsx("td",{children:"August"}),e.jsx("td",{children:t&&t.aug.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"6"}),e.jsx("td",{children:"September"}),e.jsx("td",{children:t&&t.sept.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"7"}),e.jsx("td",{children:"October"}),e.jsx("td",{children:t&&t.oct.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"8"}),e.jsx("td",{children:"November"}),e.jsx("td",{children:t&&t.nov.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"9"}),e.jsx("td",{children:"December"}),e.jsx("td",{children:t&&t.dec.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"10"}),e.jsx("td",{children:"January"}),e.jsx("td",{children:t&&t.jan.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"11"}),e.jsx("td",{children:"February"}),e.jsx("td",{children:t&&t.feb.amount})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"12"}),e.jsx("td",{children:"March"}),e.jsx("td",{children:t&&t.march.amount})]})]})]}),r&&e.jsx("p",{style:{color:a.palette.error.main,fontSize:20},children:r})]})}export{f as default};