import{a as g}from"./chunk-NBTMPC7J.mjs";import{b as c}from"./chunk-72XSCUWL.mjs";import{g as p}from"./chunk-BIRTH26D.mjs";import{n as k,w as f,x as y,y as A}from"./chunk-BQSE5HHW.mjs";import{a as l,b as a}from"./chunk-DSGOWTCH.mjs";import{a as i,e as d}from"./chunk-LXFKRIN2.mjs";import{d as m}from"./chunk-DNDWTM7A.mjs";async function B(e){let{aptosConfig:t,options:o,creator:n}=e;return await g({aptosConfig:t,sender:n.accountAddress,data:{function:"0x4::aptos_token::mint",functionArguments:[new a(e.collection),new a(e.description),new a(e.name),new a(e.uri),l.MoveString([]),l.MoveString([]),new l([])]},options:o})}async function D(e){let{aptosConfig:t,tokenAddress:o}=e,n={token_data_id:{_eq:c.from(o).toStringLong()}};return(await p({aptosConfig:t,query:{query:A,variables:{where_condition:n}},originMethod:"getTokenData"})).current_token_datas_v2[0]}async function I(e){let{aptosConfig:t,tokenAddress:o}=e,n={token_data_id:{_eq:c.from(o).toStringLong()}};return(await p({aptosConfig:t,query:{query:y,variables:{where_condition:n}},originMethod:"getCurrentTokenOwnership"})).current_token_ownerships_v2[0]}async function R(e){let{aptosConfig:t,ownerAddress:o,options:n}=e,r={owner_address:{_eq:c.from(o).toStringLong()}},s={query:y,variables:{where_condition:r,offset:n?.pagination?.offset,limit:n?.pagination?.limit,order_by:n?.orderBy}};return(await p({aptosConfig:t,query:s,originMethod:"getOwnedTokens"})).current_token_ownerships_v2}async function Q(e){let{aptosConfig:t,tokenAddress:o,options:n}=e,r={token_data_id:{_eq:c.from(o).toStringLong()}},s={query:f,variables:{where_condition:r,offset:n?.pagination?.offset,limit:n?.pagination?.limit,order_by:n?.orderBy}};return(await p({aptosConfig:t,query:s,originMethod:"getTokenActivity"})).token_activities_v2}async function P(e){let{aptosConfig:t,options:o,creator:n}=e;return await g({aptosConfig:t,sender:n.accountAddress,data:{function:"0x4::aptos_token::create_collection",functionArguments:[new a(e.description),new d(e.maxSupply??m),new a(e.name),new a(e.uri),new i(e.mutableDescription??!0),new i(e.mutableRoyalty??!0),new i(e.mutableURI??!0),new i(e.mutableTokenDescription??!0),new i(e.mutableTokenName??!0),new i(e.mutableTokenProperties??!0),new i(e.mutableTokenURI??!0),new i(e.tokensBurnableByCreator??!0),new i(e.tokensFreezableByCreator??!0),new d(e.royaltyNumerator??0),new d(e.royaltyDenominator??1)]},options:o})}async function T(e){let{aptosConfig:t,creatorAddress:o,collectionName:n,options:r}=e,s=c.from(o),u={collection_name:{_eq:n},creator_address:{_eq:s.toStringLong()}};return r?.tokenStandard&&(u.token_standard={_eq:r?.tokenStandard??"v2"}),(await p({aptosConfig:t,query:{query:k,variables:{where_condition:u}},originMethod:"getCollectionData"})).current_collections_v2[0]}async function M(e){return(await T(e)).collection_id}export{B as a,D as b,I as c,R as d,Q as e,P as f,T as g,M as h};
//# sourceMappingURL=chunk-S26QZJJE.mjs.map