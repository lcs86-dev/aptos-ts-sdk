import{a as s,c as d,e as t}from"./chunk-3TZG66IU.mjs";import{a as l,b as n,c as o,d as c,e as z,f as u}from"./chunk-DNDWTM7A.mjs";var U=class i extends s{constructor(e){super();d(e),this.value=e}serialize(e){e.serializeBool(this.value)}serializeForEntryFunction(e){let r=this.bcsToBytes();e.serializeBytes(r)}serializeForScriptFunction(e){e.serializeU32AsUleb128(5),e.serialize(this)}static deserialize(e){return new i(e.deserializeBool())}},p=class i extends s{constructor(e){super();t(e,0,l),this.value=e}serialize(e){e.serializeU8(this.value)}serializeForEntryFunction(e){let r=this.bcsToBytes();e.serializeBytes(r)}serializeForScriptFunction(e){e.serializeU32AsUleb128(0),e.serialize(this)}static deserialize(e){return new i(e.deserializeU8())}},b=class i extends s{constructor(e){super();t(e,0,n),this.value=e}serialize(e){e.serializeU16(this.value)}serializeForEntryFunction(e){let r=this.bcsToBytes();e.serializeBytes(r)}serializeForScriptFunction(e){e.serializeU32AsUleb128(6),e.serialize(this)}static deserialize(e){return new i(e.deserializeU16())}},y=class i extends s{constructor(e){super();t(e,0,o),this.value=e}serialize(e){e.serializeU32(this.value)}serializeForEntryFunction(e){let r=this.bcsToBytes();e.serializeBytes(r)}serializeForScriptFunction(e){e.serializeU32AsUleb128(7),e.serialize(this)}static deserialize(e){return new i(e.deserializeU32())}},m=class i extends s{constructor(e){super();t(e,BigInt(0),c),this.value=BigInt(e)}serialize(e){e.serializeU64(this.value)}serializeForEntryFunction(e){let r=this.bcsToBytes();e.serializeBytes(r)}serializeForScriptFunction(e){e.serializeU32AsUleb128(1),e.serialize(this)}static deserialize(e){return new i(e.deserializeU64())}},B=class i extends s{constructor(e){super();t(e,BigInt(0),z),this.value=BigInt(e)}serialize(e){e.serializeU128(this.value)}serializeForEntryFunction(e){let r=this.bcsToBytes();e.serializeBytes(r)}serializeForScriptFunction(e){e.serializeU32AsUleb128(2),e.serialize(this)}static deserialize(e){return new i(e.deserializeU128())}},v=class i extends s{constructor(e){super();t(e,BigInt(0),u),this.value=BigInt(e)}serialize(e){e.serializeU256(this.value)}serializeForEntryFunction(e){let r=this.bcsToBytes();e.serializeBytes(r)}serializeForScriptFunction(e){e.serializeU32AsUleb128(8),e.serialize(this)}static deserialize(e){return new i(e.deserializeU256())}};export{U as a,p as b,b as c,y as d,m as e,B as f,v as g};
//# sourceMappingURL=chunk-LXFKRIN2.mjs.map