import{a}from"./chunk-3TZG66IU.mjs";import{a as i}from"./chunk-FBPNHF54.mjs";import{bytesToHex as o,hexToBytes as h}from"@noble/hashes/utils";var g=(n=>(n.INCORRECT_NUMBER_OF_BYTES="incorrect_number_of_bytes",n.INVALID_HEX_CHARS="invalid_hex_chars",n.TOO_SHORT="too_short",n.TOO_LONG="too_long",n.LEADING_ZERO_X_REQUIRED="leading_zero_x_required",n.LONG_FORM_REQUIRED_UNLESS_SPECIAL="long_form_required_unless_special",n.INVALID_PADDING_ZEROES="INVALID_PADDING_ZEROES",n))(g||{}),t=class t extends a{constructor(e){super();if(e.length!==t.LENGTH)throw new i("AccountAddress data should be exactly 32 bytes long","incorrect_number_of_bytes");this.data=e}isSpecial(){return this.data.slice(0,this.data.length-1).every(e=>e===0)&&this.data[this.data.length-1]<16}toString(){return`0x${this.toStringWithoutPrefix()}`}toStringWithoutPrefix(){let e=o(this.data);return this.isSpecial()&&(e=e[e.length-1]),e}toStringLong(){return`0x${this.toStringLongWithoutPrefix()}`}toStringLongWithoutPrefix(){return o(this.data)}toUint8Array(){return this.data}serialize(e){e.serializeFixedBytes(this.data)}serializeForEntryFunction(e){let r=this.bcsToBytes();e.serializeBytes(r)}serializeForScriptFunction(e){e.serializeU32AsUleb128(3),e.serialize(this)}static deserialize(e){let r=e.deserializeFixedBytes(t.LENGTH);return new t(r)}static fromString(e){if(!e.startsWith("0x"))throw new i("Hex string must start with a leading 0x.","leading_zero_x_required");let r=t.fromStringRelaxed(e);if(e.length!==t.LONG_STRING_LENGTH+2)if(r.isSpecial()){if(e.length!==3)throw new i(`The given hex string ${e} is a special address not in LONG form, it must be 0x0 to 0xf without padding zeroes.`,"INVALID_PADDING_ZEROES")}else throw new i(`The given hex string ${e} is not a special address, it must be represented as 0x + 64 chars.`,"long_form_required_unless_special");return r}static fromStringRelaxed(e){let r=e;if(e.startsWith("0x")&&(r=e.slice(2)),r.length===0)throw new i("Hex string is too short, must be 1 to 64 chars long, excluding the leading 0x.","too_short");if(r.length>64)throw new i("Hex string is too long, must be 1 to 64 chars long, excluding the leading 0x.","too_long");let s;try{s=h(r.padStart(64,"0"))}catch(l){let c=l;throw new i(`Hex characters are invalid: ${c.message}`,"invalid_hex_chars")}return new t(s)}static fromRelaxed(e){return e instanceof t?e:e instanceof Uint8Array?new t(e):t.fromStringRelaxed(e)}static from(e){return e instanceof t?e:e instanceof Uint8Array?new t(e):t.fromString(e)}static isValid(e){try{return e.relaxed?t.fromRelaxed(e.input):t.from(e.input),{valid:!0}}catch(r){let s=r;return{valid:!1,invalidReason:s.invalidReason,invalidReasonMessage:s.message}}}equals(e){return this.data.length!==e.data.length?!1:this.data.every((r,s)=>r===e.data[s])}};t.LENGTH=32,t.LONG_STRING_LENGTH=64,t.ZERO=t.from("0x0"),t.ONE=t.from("0x1"),t.TWO=t.from("0x2"),t.THREE=t.from("0x3"),t.FOUR=t.from("0x4");var d=t;export{g as a,d as b};
//# sourceMappingURL=chunk-72XSCUWL.mjs.map