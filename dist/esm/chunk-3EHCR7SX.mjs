import{a as r}from"./chunk-3TZG66IU.mjs";import{b as i}from"./chunk-TIH6ARYP.mjs";var t=class a extends r{constructor(e){super();this.value=i.fromHexInput(e).toUint8Array()}serialize(e){e.serializeFixedBytes(this.value)}serializeForEntryFunction(e){e.serialize(this)}serializeForScriptFunction(e){e.serialize(this)}static deserialize(e,s){let o=e.deserializeFixedBytes(s);return new a(o)}};export{t as a};
//# sourceMappingURL=chunk-3EHCR7SX.mjs.map