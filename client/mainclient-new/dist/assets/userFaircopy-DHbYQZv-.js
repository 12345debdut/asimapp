import{r as a,h as g,u as C,j as e,f as y,C as x,g as u,b as p,B as b}from"./index-BPqJGxuR.js";import{F,D as v}from"./index-C5AhU4-f.js";function E(i){const[l,D]=a.useState([]),[d,m]=a.useState([]),[h,c]=a.useState(""),[n,w]=a.useContext(g),f=C();a.useEffect(()=>{o()},[i.uid]);const o=async()=>{const{uid:s}=i;if(s){let t=await F(s);t.status==200?(D(t.hs),m(t.joint)):c(t.message)}},j=async s=>{let t=await v(s);t.status==200?(b.success(t.message),o()):c(t.message)};return e.jsxs("div",{children:[e.jsxs(y,{children:[l.length>0&&e.jsxs(x,{children:[e.jsx("h4",{children:"HS table"}),e.jsxs(u,{striped:!0,hover:!0,bordered:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Chapters"}),e.jsx("th",{children:"Date"}),n.isAdmin&&e.jsx("th",{children:"Delete"})]})}),e.jsx("tbody",{children:l.map((s,t)=>{let r=new Date(s.date);return e.jsxs("tr",{children:[e.jsx("td",{children:t+1}),e.jsx("td",{children:s.chapter}),e.jsxs("td",{children:[r.getDate(),"-",r.getMonth()+1,"-",r.getFullYear()]}),n.isAdmin&&e.jsx("td",{children:e.jsx(p,{color:"primary",variant:"outlined",onClick:()=>{j(s.fairid)},children:"Delete"})})]},t)})})]})]}),d.length>0&&e.jsxs(x,{children:[e.jsx("h4",{children:"JOINT table"}),e.jsxs(u,{striped:!0,hover:!0,bordered:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Chapters"}),e.jsx("th",{children:"Date"}),n.isAdmin&&e.jsx("th",{children:"Delete"})]})}),e.jsx("tbody",{children:d.map((s,t)=>{let r=new Date(s.date);return e.jsxs("tr",{children:[e.jsx("td",{children:t+1}),e.jsx("td",{children:s.chapter}),e.jsxs("td",{children:[r.getDate(),"-",r.getMonth()+1,"-",r.getFullYear()]}),n.isAdmin&&e.jsx("td",{children:e.jsx(p,{color:"primary",variant:"outlined",onClick:()=>{j(s.fairid)},children:"Delete"})})]},t)})})]})]})]}),h&&e.jsx("p",{style:{color:f.palette.error.main,fontSize:20},children:h})]})}export{E as default};