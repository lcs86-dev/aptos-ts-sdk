import{a as g,d as f,e as l,g as P,h as I}from"./chunk-CTJOJKMD.mjs";import{a as T}from"./chunk-4KBM77Z7.mjs";import{a as y}from"./chunk-CMKDTJGM.mjs";import{a as d}from"./chunk-BGYRAOYY.mjs";import{b as p}from"./chunk-72XSCUWL.mjs";import{b as m}from"./chunk-7EFFFL7F.mjs";import{a as c}from"./chunk-DSGOWTCH.mjs";import{b as A}from"./chunk-LXFKRIN2.mjs";async function S(n){let{aptosConfig:e,sender:a,data:t,options:i}=n,o,r;"bytecode"in t?(o=t,r=await g(o)):"multisigAddress"in t?(o={aptosConfig:e,multisigAddress:t.multisigAddress,function:t.function,functionArguments:t.functionArguments,typeArguments:t.typeArguments},r=await g(o)):(o={aptosConfig:e,function:t.function,functionArguments:t.functionArguments,typeArguments:t.typeArguments},r=await g(o));let s;if(R(n)&&(s=p.ZERO.toString()),h(n)){let{secondarySignerAddresses:u}=n;return f({aptosConfig:e,sender:a,payload:r,options:i,secondarySignerAddresses:u,feePayerAddress:s})}return f({aptosConfig:e,sender:a,payload:r,options:i,feePayerAddress:s})}function R(n){return n.withFeePayer===!0}function h(n){return"secondarySignerAddresses"in n}function b(n){return P({...n})}async function W(n){let{aptosConfig:e,transaction:a,signerPublicKey:t,secondarySignersPublicKeys:i,feePayerPublicKey:o,options:r}=n,s=l({transaction:a,signerPublicKey:t,secondarySignersPublicKeys:i,feePayerPublicKey:o,options:r}),{data:u}=await m({aptosConfig:e,body:s,path:"transactions/simulate",params:{estimate_gas_unit_price:n.options?.estimateGasUnitPrice??!1,estimate_max_gas_amount:n.options?.estimateMaxGasAmount??!1,estimate_prioritized_gas_unit_price:n.options?.estimatePrioritizedGasUnitPrice??!1},originMethod:"simulateTransaction",contentType:"application/x.aptos.signed_transaction+bcs"});return u}async function x(n){let{aptosConfig:e}=n,a=I({...n}),{data:t}=await m({aptosConfig:e,body:a,path:"transactions",originMethod:"submitTransaction",contentType:"application/x.aptos.signed_transaction+bcs"});return t}async function _(n){let{aptosConfig:e,signer:a,transaction:t}=n,i=b({signer:a,transaction:t});return x({aptosConfig:e,transaction:t,senderAuthenticator:i})}async function V(n){let{aptosConfig:e,account:a,metadataBytes:t,moduleBytecode:i,options:o}=n,r=i.map(u=>c.U8(u));return await S({aptosConfig:e,sender:p.fromRelaxed(a),data:{function:"0x1::code::publish_package_txn",functionArguments:[c.U8(t),new c(r)]},options:o})}async function Z(n){let{aptosConfig:e,fromAccount:a,toNewPrivateKey:t}=n,i=await y({aptosConfig:e,accountAddress:a.accountAddress}),o=d.fromPrivateKey({privateKey:t,legacy:!0}),s=new T({sequenceNumber:BigInt(i.sequence_number),originator:a.accountAddress,currentAuthKey:p.from(i.authentication_key),newPublicKey:o.publicKey}).bcsToBytes(),u=a.sign(s),C=o.sign(s),w=await S({aptosConfig:e,sender:a.accountAddress,data:{function:"0x1::account::rotate_authentication_key",functionArguments:[new A(a.signingScheme.valueOf()),c.U8(a.publicKey.toUint8Array()),new A(o.signingScheme.valueOf()),c.U8(o.publicKey.toUint8Array()),c.U8(u.toUint8Array()),c.U8(C.toUint8Array())]}});return await _({aptosConfig:e,signer:a,transaction:w})}export{S as a,b,W as c,x as d,_ as e,V as f,Z as g};
//# sourceMappingURL=chunk-NBTMPC7J.mjs.map