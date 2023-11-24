import { AptosConfig } from '../api/aptosConfig.mjs';
import { PaginationArgs } from '../types/index.mjs';
import { FungibleAssetMetadataBoolExp, FungibleAssetActivitiesBoolExp, CurrentFungibleAssetBalancesBoolExp } from '../types/generated/types.mjs';
import { GetFungibleAssetMetadataResponse, GetFungibleAssetActivitiesResponse, GetCurrentFungibleAssetBalancesResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link api/fungible_asset}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * fungible_asset namespace and without having a dependency cycle error.
 */

declare function getFungibleAssetMetadata(args: {
    aptosConfig: AptosConfig;
    options?: {
        pagination?: PaginationArgs;
        where?: FungibleAssetMetadataBoolExp;
    };
}): Promise<GetFungibleAssetMetadataResponse>;
declare function getFungibleAssetActivities(args: {
    aptosConfig: AptosConfig;
    options?: {
        pagination?: PaginationArgs;
        where?: FungibleAssetActivitiesBoolExp;
    };
}): Promise<GetFungibleAssetActivitiesResponse>;
declare function getCurrentFungibleAssetBalances(args: {
    aptosConfig: AptosConfig;
    options?: {
        pagination?: PaginationArgs;
        where?: CurrentFungibleAssetBalancesBoolExp;
    };
}): Promise<GetCurrentFungibleAssetBalancesResponse>;

export { getCurrentFungibleAssetBalances, getFungibleAssetActivities, getFungibleAssetMetadata };
