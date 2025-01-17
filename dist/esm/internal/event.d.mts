import { AptosConfig } from '../api/aptosConfig.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { AnyNumber, MoveStructId, PaginationArgs } from '../types/index.mjs';
import { EventsBoolExp } from '../types/generated/types.mjs';
import { GetEventsResponse, OrderBy } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link api/event}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * event namespace and without having a dependency cycle error.
 */

declare function getAccountEventsByCreationNumber(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    creationNumber: AnyNumber;
}): Promise<GetEventsResponse>;
declare function getAccountEventsByEventType(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    eventType: MoveStructId;
    options?: {
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetEventsResponse[0]>;
    };
}): Promise<GetEventsResponse>;
declare function getEvents(args: {
    aptosConfig: AptosConfig;
    options?: {
        where?: EventsBoolExp;
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetEventsResponse[0]>;
    };
}): Promise<GetEventsResponse>;

export { getAccountEventsByCreationNumber, getAccountEventsByEventType, getEvents };
