import { AnyNumber, MoveStructId, PaginationArgs } from '../types/index.mjs';
import { EventsBoolExp } from '../types/generated/types.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { GetEventsResponse, OrderBy } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';

/**
 * A class to query all `Event` Aptos related queries
 */
declare class Event {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Get events by creation number and an account address
     *
     * @param args.accountAddress - The account address
     * @param args.creationNumber - The event creation number
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns Promise<GetEventsResponse>
     */
    getAccountEventsByCreationNumber(args: {
        accountAddress: AccountAddressInput;
        creationNumber: AnyNumber;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<GetEventsResponse>;
    /**
     * Get events by event type and an account address
     *
     * @param args.accountAddress - The account address
     * @param args.eventType - The event type
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns Promise<GetEventsResponse>
     */
    getAccountEventsByEventType(args: {
        accountAddress: AccountAddressInput;
        eventType: MoveStructId;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetEventsResponse[0]>;
        };
    }): Promise<GetEventsResponse>;
    /**
     * Get all events
     *
     * An optional `where` can be passed in to filter out the response.
     *@param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @example
     * ```
     * { where:
     *  {
     *   transaction_version: { _eq: 123456 },
     *  }
     * }
     * ```
     *
     * @returns GetEventsQuery response type
     */
    getEvents(args?: {
        minimumLedgerVersion?: AnyNumber;
        options?: {
            where?: EventsBoolExp;
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetEventsResponse[0]>;
        };
    }): Promise<GetEventsResponse>;
}

export { Event };
