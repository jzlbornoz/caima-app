import{u as a,j as s,a as d}from"./userStore.C5SZqrV9.js";import{a as m,b as l,p as x,c as h,d as u}from"./partyStore.DnrMZrQV.js";import{r as j}from"./index.BiFHKRHA.js";const A=()=>{const r=a(d),i=a(l),e=a(x),n=a(h);j.useEffect(()=>{m(e.admissionApplications)},[e]);const c=t=>{u(e,t),(Object.values(i)?.filter(o=>o.id!==t)).map(o=>{l.setKey(o.id,o)})};return s.jsx("ul",{className:"mt-12 divide-y",children:Object.values(i).map((t,p)=>s.jsxs("li",{className:"py-5 flex items-start justify-between",children:[s.jsxs("div",{className:"flex gap-3",children:[s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"44",height:"44",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-ball-football text-textColor",children:s.jsxs(s.Fragment,{children:[s.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),s.jsx("path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"}),s.jsx("path",{d:"M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z"}),s.jsx("path",{d:"M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45"})]})}),s.jsxs("div",{children:[s.jsx("span",{className:"block text-sm text-lightPrimaryColor font-extrabold",children:t.name}),s.jsx("span",{className:"block text-sm text-textColor",children:t.email})]})]}),r.id===e?.createdBy&&s.jsx("span",{className:"text-sm font-bold text-backgroundColor  rounded-lg px-3 py-2  bg-lightPrimaryColor hover:bg-textColor cursor-pointer",onClick:()=>c(t.id),children:n.message?n.message:"Accept"})]}))})};export{A as AdmissionApplicationUsersList};
