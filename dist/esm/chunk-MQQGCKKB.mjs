import{a as d}from"./chunk-6FBKUTGF.mjs";import{a as R}from"./chunk-FYIFBLHU.mjs";var l={400:"Bad Request",401:"Unauthorized",403:"Forbidden",404:"Not Found",429:"Too Many Requests",500:"Internal Server Error",502:"Bad Gateway",503:"Service Unavailable"};async function p(n,a){let{url:o,method:u,body:i,contentType:s,params:e,overrides:t}=n,r={...t?.HEADERS,"x-aptos-client":`aptos-ts-sdk/${R}`,"content-type":s??"application/json"};return t?.AUTH_TOKEN&&o.includes("faucet")&&(r.Authorization=`Bearer ${t?.AUTH_TOKEN}`),t?.API_KEY&&!o.includes("faucet")&&(r.Authorization=`Bearer ${t?.API_KEY}`),a.provider({url:o,method:u,body:i,params:e,headers:r,overrides:t})}async function T(n,a){let{url:o,path:u}=n,i=`${o}/${u??""}`,s=await p({...n,url:i},a.client),e={status:s.status,statusText:s.statusText,data:s.data,headers:s.headers,config:s.config,request:s.request,url:i};if(a.isIndexerRequest(o)){let r=e.data;if(r.errors)throw new d(n,e,r.errors[0].message??`Unhandled Error ${s.status} : ${s.statusText}`);e.data=r.data}if(e.status>=200&&e.status<300)return e;let t;throw e&&e.data&&"message"in e.data&&"error_code"in e.data?t=JSON.stringify(e.data):e.status in l?t=l[e.status]:t=`Unhandled Error ${e.status} : ${e.statusText}`,new d(n,e,t)}export{p as a,T as b};
//# sourceMappingURL=chunk-MQQGCKKB.mjs.map