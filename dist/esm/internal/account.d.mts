import { AptosConfig } from '../api/aptosConfig.mjs';
import { AccountAddressInput, AccountAddress } from '../core/accountAddress.mjs';
import { Account } from '../core/account.mjs';
import { PrivateKey } from '../core/crypto/asymmetricCrypto.mjs';
import { AccountData, PaginationArgs, LedgerVersion, MoveModuleBytecode, TransactionResponse, MoveResource, MoveStructId } from '../types/index.mjs';
import { AuthenticationKey } from '../core/authenticationKey.mjs';
import { TokenStandard, OrderBy, GetAccountOwnedTokensQueryResponse, GetAccountOwnedTokensFromCollectionResponse, GetAccountCollectionsWithOwnedTokenResponse, GetAccountCoinsDataResponse, GetAccountOwnedObjectsResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link api/account}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * account namespace and without having a dependency cycle error.
 */

declare function getInfo(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
}): Promise<AccountData>;
declare function getModules(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    options?: PaginationArgs & LedgerVersion;
}): Promise<MoveModuleBytecode[]>;
/**
 * Queries for a move module given account address and module name
 *
 * @param args.accountAddress Hex-encoded 32 byte Aptos account address
 * @param args.moduleName The name of the module
 * @param args.query.ledgerVersion Specifies ledger version of transactions. By default, latest version will be used
 * @returns The move module.
 */
declare function getModule(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    moduleName: string;
    options?: LedgerVersion;
}): Promise<MoveModuleBytecode>;
declare function getTransactions(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    options?: PaginationArgs;
}): Promise<TransactionResponse[]>;
declare function getResources(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    options?: PaginationArgs & LedgerVersion;
}): Promise<MoveResource[]>;
declare function getResource<T extends {}>(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    resourceType: MoveStructId;
    options?: LedgerVersion;
}): Promise<T>;
declare function lookupOriginalAccountAddress(args: {
    aptosConfig: AptosConfig;
    authenticationKey: AccountAddressInput;
    options?: LedgerVersion;
}): Promise<AccountAddress>;
declare function getAccountTokensCount(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
}): Promise<number>;
declare function getAccountOwnedTokens(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    options?: {
        tokenStandard?: TokenStandard;
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetAccountOwnedTokensQueryResponse[0]>;
    };
}): Promise<GetAccountOwnedTokensQueryResponse>;
declare function getAccountOwnedTokensFromCollectionAddress(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    collectionAddress: AccountAddressInput;
    options?: {
        tokenStandard?: TokenStandard;
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetAccountOwnedTokensFromCollectionResponse[0]>;
    };
}): Promise<GetAccountOwnedTokensFromCollectionResponse>;
declare function getAccountCollectionsWithOwnedTokens(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    options?: {
        tokenStandard?: TokenStandard;
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetAccountCollectionsWithOwnedTokenResponse[0]>;
    };
}): Promise<GetAccountCollectionsWithOwnedTokenResponse>;
declare function getAccountTransactionsCount(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
}): Promise<number>;
declare function getAccountCoinsData(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    options?: {
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetAccountCoinsDataResponse[0]>;
    };
}): Promise<GetAccountCoinsDataResponse>;
declare function getAccountCoinsCount(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
}): Promise<number>;
declare function getAccountOwnedObjects(args: {
    aptosConfig: AptosConfig;
    accountAddress: AccountAddressInput;
    options?: {
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetAccountOwnedObjectsResponse[0]>;
    };
}): Promise<GetAccountOwnedObjectsResponse>;
/**
 * NOTE: There is a potential issue once unified single signer scheme will be adopted
 * by the community.
 *
 * Becuase on could create 2 accounts with the same private key with this new authenticator type,
 * we’ll need to determine the order in which we lookup the accounts. First unified
 * scheme and then legacy scheme vs first legacy scheme and then unified scheme.
 *
 */
declare function deriveAccountFromPrivateKey(args: {
    aptosConfig: AptosConfig;
    privateKey: PrivateKey;
}): Promise<Account>;
declare function isAccountExist(args: {
    aptosConfig: AptosConfig;
    authKey: AuthenticationKey;
}): Promise<boolean>;

export { deriveAccountFromPrivateKey, getAccountCoinsCount, getAccountCoinsData, getAccountCollectionsWithOwnedTokens, getAccountOwnedObjects, getAccountOwnedTokens, getAccountOwnedTokensFromCollectionAddress, getAccountTokensCount, getAccountTransactionsCount, getInfo, getModule, getModules, getResource, getResources, getTransactions, isAccountExist, lookupOriginalAccountAddress };
