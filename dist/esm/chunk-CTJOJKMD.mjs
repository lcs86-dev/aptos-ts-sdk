import{a as V,b as Y,c as Z}from"./chunk-T67GTZCB.mjs";import{p as B,s as F}from"./chunk-B26YJGT5.mjs";import{a as u}from"./chunk-2LPUOIQA.mjs";import{a as _,c as p,d as f}from"./chunk-GHSZQMQH.mjs";import{c as L,d as H,e as X,f as z,g as j,h as J,i as Q}from"./chunk-N33PUV6L.mjs";import{a as q}from"./chunk-RJ2NYBDZ.mjs";import{b as R,d as b,e as x,f as E}from"./chunk-5533HAAT.mjs";import{b as m,d as y,e as O}from"./chunk-ZTB7542V.mjs";import{a as k}from"./chunk-CMKDTJGM.mjs";import{a as w}from"./chunk-HFSUQHR3.mjs";import{a as N}from"./chunk-4YD32UV6.mjs";import{a as l,c as T}from"./chunk-WHLYF2O4.mjs";import{a as $,c as C}from"./chunk-QPKG6ZE7.mjs";import{b as A}from"./chunk-72XSCUWL.mjs";import{b as v}from"./chunk-5BTCICKS.mjs";import{a as K}from"./chunk-AH44UPM4.mjs";import{a as W}from"./chunk-BIRTH26D.mjs";import{c as M,d as D,g as U,h as I}from"./chunk-EOC4UI5B.mjs";import{e as S}from"./chunk-LV33NV4J.mjs";import{b as G}from"./chunk-TIH6ARYP.mjs";import{sha3_256 as rn}from"@noble/hashes/sha3";async function Un(n){if(B(n))return nn(n);let{moduleAddress:e,moduleName:t,functionName:r}=F(n.function),a=await K(async()=>Y(e,t,r,n.aptosConfig),`entry-function-${n.aptosConfig.network}-${e}-${t}-${r}`,1e3*60*5)();return on(n,a)}function on(n,e){if(B(n))return nn(n);let{moduleAddress:t,moduleName:r,functionName:a}=F(n.function),o=V(n.typeArguments);if(o.length!==e.typeParameters.length)throw new Error(`Type argument count mismatch, expected ${e.typeParameters.length}, received ${o.length}`);let i=n.functionArguments.map((s,d)=>Z(n.function,e,s,d,o));if(i.length!==e.parameters.length)throw new Error(`Too few arguments for '${t}::${r}::${a}', expected ${e.parameters.length} but got ${i.length}`);let c=z.build(`${t}::${r}`,a,o,i);if("multisigAddress"in n){let s;return typeof n.multisigAddress=="string"?s=A.from(n.multisigAddress):s=n.multisigAddress,new X(new J(s,new Q(c)))}return new H(c)}function nn(n){return new L(new j(G.fromHexInput(n.bytecode).toUint8Array(),n.typeArguments??[],n.functionArguments))}async function sn(n){let{aptosConfig:e,sender:t,payload:r,options:a}=n,o=a?.accountSequenceNumber?Promise.resolve({sequence_number:a.accountSequenceNumber}):k({aptosConfig:e,accountAddress:t}),i=S[e.network]?Promise.resolve({chain_id:S[e.network]}):W({aptosConfig:e}),c=a?.gasUnitPrice?Promise.resolve({gas_estimate:a.gasUnitPrice}):v({aptosConfig:e}),[{sequence_number:s},{chain_id:d},{gas_estimate:g}]=await Promise.all([o,i,c]),{maxGasAmount:P,gasUnitPrice:en,expireTimestamp:an}={maxGasAmount:a?.maxGasAmount?BigInt(a.maxGasAmount):BigInt(M),gasUnitPrice:BigInt(g),expireTimestamp:BigInt(Math.floor(Date.now()/1e3)+D),...a};return new _(A.fromRelaxed(t),BigInt(s),r,BigInt(P),BigInt(en),BigInt(an),new q(d))}async function Gn(n){let{aptosConfig:e,sender:t,payload:r,options:a}=n,o=await sn({aptosConfig:e,sender:t,payload:r,options:a});if("secondarySignerAddresses"in n){let i=n.secondarySignerAddresses?.map(c=>A.fromRelaxed(c))??[];return{rawTransaction:o,secondarySignerAddresses:i,feePayerAddress:n.feePayerAddress?A.fromRelaxed(n.feePayerAddress):void 0}}return{rawTransaction:o,feePayerAddress:n.feePayerAddress?A.fromRelaxed(n.feePayerAddress):void 0}}function $n(n){let{signerPublicKey:e,transaction:t,secondarySignersPublicKeys:r,feePayerPublicKey:a}=n,o=h(e);if(t.feePayerAddress){let c=new f(t.rawTransaction,t.secondarySignerAddresses??[],t.feePayerAddress),s=[];r&&(s=r.map(P=>h(P)));let d=h(a),g=new x(o,t.secondarySignerAddresses??[],s,{address:t.feePayerAddress,authenticator:d});return new u(c.raw_txn,g).bcsToBytes()}if(t.secondarySignerAddresses){let c=new p(t.rawTransaction,t.secondarySignerAddresses),s=[];s=r.map(g=>h(g));let d=new b(o,t.secondarySignerAddresses,s);return new u(c.raw_txn,d).bcsToBytes()}let i;if(o instanceof m)i=new R(o.public_key,o.signature);else if(o instanceof y)i=new E(o);else throw new Error("Invalid public key");return new u(t.rawTransaction,i).bcsToBytes()}function h(n){if(n instanceof N){if(n.publicKey instanceof l)return new y(n,new w(new T(new Uint8Array(64))));if(n.publicKey instanceof $)return new y(n,new w(new C(new Uint8Array(64))))}return new m(new l(n.toUint8Array()),new T(new Uint8Array(64)))}function Cn(n){let{signer:e,transaction:t}=n,r=tn(t),a=un(r),o=e.sign(a);switch(e.signingScheme){case 0:return new m(new l(e.publicKey.toUint8Array()),new T(o.toUint8Array()));case 2:return new y(e.publicKey,new w(o));default:throw new Error(`Cannot sign transaction, signing scheme ${e.signingScheme} not supported`)}}function Nn(n){let{transaction:e,senderAuthenticator:t,feePayerAuthenticator:r,additionalSignersAuthenticators:a}=n,o=tn(e);if(r||a)return cn(o,t,r,a);if(t instanceof m){let i=new R(t.public_key,t.signature);return new u(o,i).bcsToBytes()}if(t instanceof y||t instanceof O){let i=new E(t);return new u(o,i).bcsToBytes()}throw new Error(`Cannot generate a signed transaction, ${t} is not a supported account authentication scheme`)}function tn(n){return n.feePayerAddress?new f(n.rawTransaction,n.secondarySignerAddresses??[],n.feePayerAddress):n.secondarySignerAddresses?new p(n.rawTransaction,n.secondarySignerAddresses):n.rawTransaction}function cn(n,e,t,r){if(n instanceof f){if(!t)throw new Error("Must provide a feePayerAuthenticator argument to generate a signed fee payer transaction");let a=new x(e,n.secondary_signer_addresses,r??[],{address:n.fee_payer_address,authenticator:t});return new u(n.raw_txn,a).bcsToBytes()}if(n instanceof p){if(!r)throw new Error("Must provide a additionalSignersAuthenticators argument to generate a signed multi agent transaction");let a=new b(e,n.secondary_signer_addresses,r??[]);return new u(n.raw_txn,a).bcsToBytes()}throw new Error(`Cannot prepare multi signers transaction to submission, ${typeof n} transaction is not supported`)}function un(n){let e=rn.create();if(n instanceof _)e.update(U);else if(n instanceof p)e.update(I);else if(n instanceof f)e.update(I);else throw new Error(`Unknown transaction type to sign on: ${n}`);let t=e.digest(),r=n.bcsToBytes(),a=new Uint8Array(t.length+r.length);return a.set(t),a.set(r,t.length),a}export{Un as a,on as b,sn as c,Gn as d,$n as e,h as f,Cn as g,Nn as h,tn as i,cn as j,un as k};
//# sourceMappingURL=chunk-CTJOJKMD.mjs.map