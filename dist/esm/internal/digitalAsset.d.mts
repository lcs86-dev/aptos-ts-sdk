import { AptosConfig } from '../api/aptosConfig.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { PaginationArgs, AnyNumber } from '../types/index.mjs';
import { InputGenerateTransactionOptions, SingleSignerTransaction } from '../transactions/types.mjs';
import { GetTokenDataResponse, GetCurrentTokenOwnershipResponse, OrderBy, GetTokenActivityResponse, GetOwnedTokensResponse, TokenStandard, GetCollectionDataResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../core/authenticationKey.mjs';
import '../core/crypto/asymmetricCrypto.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../bcs/serializable/moveStructs.mjs';
import '../bcs/serializable/movePrimitives.mjs';
import '../bcs/serializable/fixedBytes.mjs';
import '../transactions/instances/rawTransaction.mjs';
import '../transactions/instances/chainId.mjs';
import '../transactions/instances/transactionPayload.mjs';
import '../transactions/instances/identifier.mjs';
import '../transactions/instances/moduleId.mjs';
import '../transactions/typeTag/index.mjs';
import '../transactions/authenticator/account.mjs';
import '../core/crypto/anyPublicKey.mjs';
import '../core/crypto/anySignature.mjs';
import '../core/crypto/ed25519.mjs';
import '../core/crypto/multiEd25519.mjs';
import '../core/crypto/multiKey.mjs';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link api/digitalAsset}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * digitalAsset namespace and without having a dependency cycle error.
 */

interface MintTokenOptions {
    propertyKeys?: Array<string>;
    propertyTypes?: Array<string>;
    propertyValues?: Array<string>;
}
declare function mintTokenTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    collection: string;
    description: string;
    name: string;
    uri: string;
    options?: InputGenerateTransactionOptions;
}): Promise<SingleSignerTransaction>;
declare function getTokenData(args: {
    aptosConfig: AptosConfig;
    tokenAddress: AccountAddressInput;
}): Promise<GetTokenDataResponse>;
declare function getCurrentTokenOwnership(args: {
    aptosConfig: AptosConfig;
    tokenAddress: AccountAddressInput;
}): Promise<GetCurrentTokenOwnershipResponse>;
declare function getOwnedTokens(args: {
    aptosConfig: AptosConfig;
    ownerAddress: AccountAddressInput;
    options?: {
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetTokenActivityResponse[0]>;
    };
}): Promise<GetOwnedTokensResponse>;
declare function getTokenActivity(args: {
    aptosConfig: AptosConfig;
    tokenAddress: AccountAddressInput;
    options?: {
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetTokenActivityResponse[0]>;
    };
}): Promise<GetTokenActivityResponse>;
interface CreateCollectionOptions {
    maxSupply?: AnyNumber;
    mutableDescription?: boolean;
    mutableRoyalty?: boolean;
    mutableURI?: boolean;
    mutableTokenDescription?: boolean;
    mutableTokenName?: boolean;
    mutableTokenProperties?: boolean;
    mutableTokenURI?: boolean;
    tokensBurnableByCreator?: boolean;
    tokensFreezableByCreator?: boolean;
    royaltyNumerator?: number;
    royaltyDenominator?: number;
}
declare function createCollectionTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    description: string;
    name: string;
    uri: string;
    options?: InputGenerateTransactionOptions;
} & CreateCollectionOptions): Promise<SingleSignerTransaction>;
declare function getCollectionData(args: {
    aptosConfig: AptosConfig;
    creatorAddress: AccountAddressInput;
    collectionName: string;
    options?: {
        tokenStandard?: TokenStandard;
    };
}): Promise<GetCollectionDataResponse>;
declare function getCollectionId(args: {
    aptosConfig: AptosConfig;
    creatorAddress: AccountAddressInput;
    collectionName: string;
    options?: {
        tokenStandard?: TokenStandard;
    };
}): Promise<string>;

export { CreateCollectionOptions, MintTokenOptions, createCollectionTransaction, getCollectionData, getCollectionId, getCurrentTokenOwnership, getOwnedTokens, getTokenActivity, getTokenData, mintTokenTransaction };
