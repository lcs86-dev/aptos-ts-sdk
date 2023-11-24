import { AnyNumber, PaginationArgs } from '../types/index.mjs';
import { FungibleAssetMetadataBoolExp, FungibleAssetActivitiesBoolExp, CurrentFungibleAssetBalancesBoolExp } from '../types/generated/types.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { GetFungibleAssetMetadataResponse, GetFungibleAssetActivitiesResponse, GetCurrentFungibleAssetBalancesResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';

/**
 * A class to query all `FungibleAsset` related queries on Aptos.
 */
declare class FungibleAsset {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Queries the current fungible asset metadata.
     *
     * This query returns the fungible asset metadata for all fungible assets.
     * It can be filtered by creator address and asset type.
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns getFungibleAssetMetadata A list of fungible asset metadata
     */
    getFungibleAssetMetadata(args?: {
        minimumLedgerVersion?: AnyNumber;
        options?: {
            pagination?: PaginationArgs;
            where?: FungibleAssetMetadataBoolExp;
        };
    }): Promise<GetFungibleAssetMetadataResponse>;
    /**
     * Queries the current specific fungible asset metadata
     *
     * This query returns the fungible asset metadata for a specific fungible asset.
     *
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param assetType The asset type of the fungible asset.
     * e.g
     * "0x1::aptos_coin::AptosCoin" for Aptos Coin
     * "0xc2948283c2ce03aafbb294821de7ee684b06116bb378ab614fa2de07a99355a8" - address format if this is fungible asset
     *
     * @returns getFungibleAssetMetadata A fungible asset metadata item
     */
    getFungibleAssetMetadataByAssetType(args: {
        assetType: string;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<GetFungibleAssetMetadataResponse[0]>;
    /**
     * Queries the fungible asset activities
     *
     * This query returns the fungible asset activities.
     * It can be filtered by owner address, asset type, and type.
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns GetFungibleAssetActivitiesResponse A list of fungible asset metadata
     */
    getFungibleAssetActivities(args?: {
        minimumLedgerVersion?: AnyNumber;
        options?: {
            pagination?: PaginationArgs;
            where?: FungibleAssetActivitiesBoolExp;
        };
    }): Promise<GetFungibleAssetActivitiesResponse>;
    /**
     * Queries the fungible asset balance
     *
     * This query returns the fungible asset balance.
     * It can be filtered by owner address, and asset type
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns GetCurrentFungibleAssetBalancesResponse A list of fungible asset metadata
     */
    getCurrentFungibleAssetBalances(args?: {
        minimumLedgerVersion?: AnyNumber;
        options?: {
            pagination?: PaginationArgs;
            where?: CurrentFungibleAssetBalancesBoolExp;
        };
    }): Promise<GetCurrentFungibleAssetBalancesResponse>;
}

export { FungibleAsset };
