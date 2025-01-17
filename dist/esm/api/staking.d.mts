import { AnyNumber } from '../types/index.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { OrderBy, GetNumberOfDelegatorsResponse, GetDelegatedStakingActivitiesResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * A class to query all `Staking` related queries on Aptos.
 */
declare class Staking {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Queries current number of delegators in a pool.  Throws an error if the pool is not found.
     *
     * @param args.poolAddress Pool address
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns The number of delegators for the given pool
     */
    getNumberOfDelegators(args: {
        poolAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<number>;
    /**
     * Queries current number of delegators in a pool.  Throws an error if the pool is not found.
     *
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns GetNumberOfDelegatorsForAllPoolsResponse response type
     */
    getNumberOfDelegatorsForAllPools(args?: {
        minimumLedgerVersion?: AnyNumber;
        options?: {
            orderBy?: OrderBy<GetNumberOfDelegatorsResponse[0]>;
        };
    }): Promise<GetNumberOfDelegatorsResponse>;
    /**
     * Queries delegated staking activities
     *
     * @param args.delegatorAddress Delegator address
     * @param args.poolAddress Pool address
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns GetDelegatedStakingActivitiesResponse response type
     */
    getDelegatedStakingActivities(args: {
        delegatorAddress: AccountAddressInput;
        poolAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<GetDelegatedStakingActivitiesResponse>;
}

export { Staking };
