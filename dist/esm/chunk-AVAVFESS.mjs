import{c as o}from"./chunk-NBTMPC7J.mjs";import{a as i}from"./chunk-ZWH2ESXT.mjs";var r=class{constructor(n){this.config=n}async transaction(n){return o({aptosConfig:this.config,...n})}async multiAgentTransaction(n){return o({aptosConfig:this.config,...n})}};i([s],r.prototype,"transaction",1),i([s],r.prototype,"multiAgentTransaction",1);function s(c,n,e){let y=e.value;return e.value=async function(...t){let[a]=t;if(a.transaction.feePayerAddress&&!a.feePayerPublicKey)throw new Error("You are simulating a Fee Payer transaction but missing the feePayerPublicKey");return y.apply(this,t)},e}export{r as a};
//# sourceMappingURL=chunk-AVAVFESS.mjs.map