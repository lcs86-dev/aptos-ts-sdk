import{a as e}from"./chunk-GHSZQMQH.mjs";import{a as i}from"./chunk-5533HAAT.mjs";import{a as r}from"./chunk-3TZG66IU.mjs";var n=class o extends r{constructor(t,a){super();this.raw_txn=t,this.authenticator=a}serialize(t){this.raw_txn.serialize(t),this.authenticator.serialize(t)}static deserialize(t){let a=e.deserialize(t),s=i.deserialize(t);return new o(a,s)}};export{n as a};
//# sourceMappingURL=chunk-2LPUOIQA.mjs.map