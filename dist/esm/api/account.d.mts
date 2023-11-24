import { Account as Account$1 } from '../core/account.mjs';
import { AccountAddressInput, AccountAddress } from '../core/accountAddress.mjs';
import { PrivateKey } from '../core/crypto/asymmetricCrypto.mjs';
import { AccountData, PaginationArgs, LedgerVersion, MoveModuleBytecode, TransactionResponse, MoveResource, MoveStructId, AnyNumber } from '../types/index.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { TokenStandard, OrderBy, GetAccountOwnedTokensQueryResponse, GetAccountOwnedTokensFromCollectionResponse, GetAccountCollectionsWithOwnedTokenResponse, GetAccountCoinsDataResponse, GetAccountOwnedObjectsResponse } from '../types/indexer.mjs';
import '../core/authenticationKey.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/serializer.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * A class to query all `Account` related queries on Aptos.
 */
declare class Account {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Queries the current state for an Aptos account given its account address
     *
     * @param args.accountAddress Aptos account address
     *
     * @returns The account data
     *
     * @example An example of the returned account
     * ```
     * {
     *    sequence_number: "1",
     *    authentication_key: "0x5307b5f4bc67829097a8ba9b43dba3b88261eeccd1f709d9bde240fc100fbb69"
     * }
     * ```
     */
    getAccountInfo(args: {
        accountAddress: AccountAddressInput;
    }): Promise<AccountData>;
    /**
     * Queries for all modules in an account given an account address
     *
     * Note: In order to get all account modules, this function may call the API
     * multiple times as it auto paginates.
     *
     * @param args.accountAddress Aptos account address
     * @param args.options.offset The number module to start returning results from
     * @param args.options.limit The number of results to return
     * @param args.options.ledgerVersion The ledger version to query, if not provided it will get the latest version
     *
     * @returns Account modules
     */
    getAccountModules(args: {
        accountAddress: AccountAddressInput;
        options?: PaginationArgs & LedgerVersion;
    }): Promise<MoveModuleBytecode[]>;
    /**
     * Queries for a specific account module given account address and module name
     *
     * @param args.accountAddress Aptos account address
     * @param args.moduleName The name of the module
     * @param args.options.ledgerVersion The ledger version to query, if not provided it will get the latest version
     *
     * @returns Account module
     *
     * @example An example of an account module
     * ```
     * {
     *    bytecode: "0xa11ceb0b0600000006010002030206050807070f0d081c200",
     *    abi: { address: "0x1" }
     * }
     * ```
     */
    getAccountModule(args: {
        accountAddress: AccountAddressInput;
        moduleName: string;
        options?: LedgerVersion;
    }): Promise<MoveModuleBytecode>;
    /**
     * Queries account transactions given an account address
     *
     * Note: In order to get all account transactions, this function may call the API
     * multiple times as it auto paginates.
     *
     * @param args.accountAddress Aptos account address
     * @param args.options.offset The number transaction to start returning results from
     * @param args.options.limit The number of results to return
     *
     * @returns The account transactions
     */
    getAccountTransactions(args: {
        accountAddress: AccountAddressInput;
        options?: PaginationArgs;
    }): Promise<TransactionResponse[]>;
    /**
     * Queries all account resources given an account address
     *
     * Note: In order to get all account resources, this function may call the API
     * multiple times as it auto paginates.
     *
     * @param args.accountAddress Aptos account address
     * @param args.options.offset The number resource to start returning results from
     * @param args.options.limit The number of results to return
     * @param args.options.ledgerVersion The ledger version to query, if not provided it will get the latest version
     * @returns Account resources
     */
    getAccountResources(args: {
        accountAddress: AccountAddressInput;
        options?: PaginationArgs & LedgerVersion;
    }): Promise<MoveResource[]>;
    /**
     * Queries a specific account resource given account address and resource type. Note that the default is `any` in order
     * to allow for ease of accessing properties of the object.
     *
     * @type The typed output of the resource
     * @param args.accountAddress Aptos account address
     * @param args.resourceType String representation of an on-chain Move struct type, i.e "0x1::aptos_coin::AptosCoin"
     * @param args.options.ledgerVersion The ledger version to query, if not provided it will get the latest version
     *
     * @returns Account resource
     *
     * @example An example of an account resource
     * ```
     * {
     *    data: { value: 6 }
     * }
     * ```
     */
    getAccountResource<T extends {} = any>(args: {
        accountAddress: AccountAddressInput;
        resourceType: MoveStructId;
        options?: LedgerVersion;
    }): Promise<T>;
    /**
     * Looks up the account address for a given authentication key
     *
     * This handles both if the account's authentication key has been rotated or not.
     *
     * @param args.authenticationKey The authentication key
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.ledgerVersion The ledger version to query, if not provided it will get the latest version
     * @returns Promise<AccountAddress> The accountAddress associated with the authentication key
     */
    lookupOriginalAccountAddress(args: {
        authenticationKey: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: LedgerVersion;
    }): Promise<AccountAddress>;
    /**
     * Queries the current count of tokens owned by an account
     *
     * @param args.accountAddress The account address
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns Current count of tokens owned by the account
     */
    getAccountTokensCount(args: {
        accountAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<number>;
    /**
     * Queries the account's current owned tokens.
     *
     * This query returns all tokens (v1 and v2 standards) an account owns, including NFTs, fungible, soulbound, etc.
     * If you want to get only the token from a specific standard, you can pass an optional tokenStandard param
     *
     * @param args.accountAddress The account address we want to get the tokens for
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.tokenStandard The NFT standard to query for
     * @param args.options.pagination.offset The number token to start returning results from
     * @param args.options.pagination.limit The number of results to return
     * @param args.options.orderBy The order to sort the tokens by
     * @returns Tokens array with the token data
     */
    getAccountOwnedTokens(args: {
        accountAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            tokenStandard?: TokenStandard;
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetAccountOwnedTokensQueryResponse[0]>;
        };
    }): Promise<GetAccountOwnedTokensQueryResponse>;
    /**
     * Queries all current tokens of a specific collection that an account owns by the collection address
     *
     * This query returns all tokens (v1 and v2 standards) an account owns, including NFTs, fungible, soulbound, etc.
     * If you want to get only the token from a specific standard, you can pass an optional tokenStandard param
     *
     * @param args.accountAddress The account address we want to get the tokens for
     * @param args.collectionAddress The address of the collection being queried
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.tokenStandard The NFT standard to query for
     * @param args.options.pagination.offset The number token to start returning results from
     * @param args.options.pagination.limit The number of results to return
     * @param args.options.orderBy The order to sort the tokens by
     * @returns Tokens array with the token data
     */
    getAccountOwnedTokensFromCollectionAddress(args: {
        accountAddress: AccountAddressInput;
        collectionAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            tokenStandard?: TokenStandard;
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetAccountOwnedTokensFromCollectionResponse[0]>;
        };
    }): Promise<GetAccountOwnedTokensFromCollectionResponse>;
    /**
     * Queries for all collections that an account currently has tokens for.
     *
     * This query returns all tokens (v1 and v2 standards) an account owns, including NFTs, fungible, soulbound, etc.
     * If you want to get only the token from a specific standard, you can pass an optional tokenStandard param
     *
     * @param args.accountAddress The account address we want to get the collections for
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.tokenStandard The NFT standard to query for
     * @param args.options.pagination.offset The number collection to start returning results from
     * @param args.options.pagination.limit The number of results to return
     * @param args.options.orderBy The order to sort the tokens by
     * @returns Collections array with the collections data
     */
    getAccountCollectionsWithOwnedTokens(args: {
        accountAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            tokenStandard?: TokenStandard;
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetAccountCollectionsWithOwnedTokenResponse[0]>;
        };
    }): Promise<GetAccountCollectionsWithOwnedTokenResponse>;
    /**
     * Queries the current count of transactions submitted by an account
     *
     * @param args.accountAddress The account address we want to get the total count for
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns Current count of transactions made by an account
     */
    getAccountTransactionsCount(args: {
        accountAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<number>;
    /**
     * Queries an account's coins data
     *
     * @param args.accountAddress The account address we want to get the coins data for
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.pagination.offset The number coin to start returning results from
     * @param args.options.pagination.limit The number of results to return
     * @param args.options.orderBy The order to sort the coins by
     * @returns Array with the coins data
     */
    getAccountCoinsData(args: {
        accountAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetAccountCoinsDataResponse[0]>;
        };
    }): Promise<GetAccountCoinsDataResponse>;
    /**
     * Queries the current count of an account's coins aggregated
     *
     * @param args.accountAddress The account address we want to get the total count for
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns Current count of the aggregated count of all account's coins
     */
    getAccountCoinsCount(args: {
        accountAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<number>;
    /**
     * Queries an account's owned objects
     *
     * @param args.accountAddress The account address we want to get the objects for
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.pagination.offset The number coin to start returning results from
     * @param args.options.pagination.limit The number of results to return
     * @param args.options.orderBy The order to sort the coins by
     * @returns Objects array with the object data
     */
    getAccountOwnedObjects(args: {
        accountAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetAccountOwnedObjectsResponse[0]>;
        };
    }): Promise<GetAccountOwnedObjectsResponse>;
    /**
     * Derives an account by providing a private key.
     * This functions resolves the provided private key type and derives the public key from it.
     *
     * If the privateKey is a Secp256k1 type, it derives the account using the derived public key and
     * auth key using the SingleKey scheme locally.
     *
     * If the privateKey is a ED25519 type, it looks up the authentication key on chain, and uses it to resolve
     * whether it is a Legacy ED25519 key or a Unified ED25519 key. It then derives the account based
     * on that.
     *
     * @param args.privateKey An account private key
     * @returns Account type
     */
    deriveAccountFromPrivateKey(args: {
        privateKey: PrivateKey;
    }): Promise<Account$1>;
}

export { Account };
