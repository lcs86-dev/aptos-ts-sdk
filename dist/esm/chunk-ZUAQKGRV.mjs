import{b as s}from"./chunk-72XSCUWL.mjs";import{g as a}from"./chunk-BIRTH26D.mjs";import{p as g,u as d}from"./chunk-BQSE5HHW.mjs";async function m(e){let{aptosConfig:t,poolAddress:o}=e,r=s.fromRelaxed(o).toStringLong(),i=await a({aptosConfig:t,query:{query:d,variables:{where_condition:{pool_address:{_eq:r}}}}});return i.num_active_delegator_per_pool[0]?i.num_active_delegator_per_pool[0].num_active_delegator:0}async function f(e){let{aptosConfig:t,options:o}=e,r={query:d,variables:{order_by:o?.orderBy}};return(await a({aptosConfig:t,query:r})).num_active_delegator_per_pool}async function A(e){let{aptosConfig:t,delegatorAddress:o,poolAddress:r}=e,n={query:g,variables:{delegatorAddress:s.fromRelaxed(o).toStringLong(),poolAddress:s.fromRelaxed(r).toStringLong()}};return(await a({aptosConfig:t,query:n})).delegated_staking_activities}export{m as a,f as b,A as c};
//# sourceMappingURL=chunk-ZUAQKGRV.mjs.map