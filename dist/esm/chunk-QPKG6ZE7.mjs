import{a as h,b as d,c as p}from"./chunk-25TAOAZK.mjs";import{e as g,j as m}from"./chunk-LR65XHSF.mjs";import{b as a}from"./chunk-TIH6ARYP.mjs";import{sha3_256 as H}from"@noble/hashes/sha3";import{secp256k1 as o}from"@noble/curves/secp256k1";import{HDKey as z}from"@scure/bip32";var i=class i extends h{constructor(e){super();let t=a.fromHexInput(e);if(t.toUint8Array().length!==i.LENGTH)throw new Error(`PublicKey length should be ${i.LENGTH}`);this.key=t}toUint8Array(){return this.key.toUint8Array()}toString(){return this.key.toString()}verifySignature(e){let{message:t,signature:s}=e,y=a.fromHexInput(t).toUint8Array(),f=H(y),v=s.toUint8Array();return o.verify(v,f,this.toUint8Array())}serialize(e){e.serializeBytes(this.key.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new i(t)}static load(e){let t=e.deserializeBytes();return new i(t)}};i.LENGTH=65;var l=i,r=class r extends d{constructor(e){super();let t=a.fromHexInput(e);if(t.toUint8Array().length!==r.LENGTH)throw new Error(`PrivateKey length should be ${r.LENGTH}`);this.key=t}toUint8Array(){return this.key.toUint8Array()}toString(){return this.key.toString()}sign(e){let t=a.fromHexInput(e),s=H(t.toUint8Array()),y=o.sign(s,this.key.toUint8Array());return new u(y.toCompactRawBytes())}serialize(e){e.serializeBytes(this.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new r(t)}static generate(){let e=o.utils.randomPrivateKey();return new r(e)}publicKey(){let e=o.getPublicKey(this.key.toUint8Array(),!1);return new l(e)}static fromDerivationPath(e,t){if(!g(e))throw new Error(`Invalid derivation path ${e}`);return r.fromDerivationPathInner(e,m(t))}static fromDerivationPathInner(e,t){let{privateKey:s}=z.fromMasterSeed(t).derive(e);if(s===null)throw new Error("Invalid key");return new r(s)}};r.LENGTH=32;var x=r,n=class n extends p{constructor(e){super();let t=a.fromHexInput(e);if(t.toUint8Array().length!==n.LENGTH)throw new Error(`Signature length should be ${n.LENGTH}, recieved ${t.toUint8Array().length}`);this.data=t}toUint8Array(){return this.data.toUint8Array()}toString(){return this.data.toString()}serialize(e){e.serializeBytes(this.data.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new n(t)}static load(e){let t=e.deserializeBytes();return new n(t)}};n.LENGTH=64;var u=n;export{l as a,x as b,u as c};
//# sourceMappingURL=chunk-QPKG6ZE7.mjs.map