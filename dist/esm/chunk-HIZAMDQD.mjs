import{a as e}from"./chunk-NBTMPC7J.mjs";import{c as r}from"./chunk-NQWIDWDX.mjs";import{b as t}from"./chunk-72XSCUWL.mjs";import{f as n}from"./chunk-EOC4UI5B.mjs";import{e as o}from"./chunk-LXFKRIN2.mjs";async function O(i){let{aptosConfig:s,sender:c,recipient:a,amount:p,coinType:m,options:u}=i,f=m??n;return await e({aptosConfig:s,sender:c.accountAddress,data:{function:"0x1::aptos_account::transfer_coins",typeArguments:[r(f)],functionArguments:[t.from(a),new o(p)]},options:u})}export{O as a};
//# sourceMappingURL=chunk-HIZAMDQD.mjs.map