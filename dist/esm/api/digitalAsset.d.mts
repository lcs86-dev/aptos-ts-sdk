import { AnyNumber, PaginationArgs } from '../types/index.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { InputGenerateTransactionOptions, SingleSignerTransaction } from '../transactions/types.mjs';
import { CreateCollectionOptions } from '../internal/digitalAsset.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { TokenStandard, GetCollectionDataResponse, GetTokenDataResponse, GetCurrentTokenOwnershipResponse, OrderBy, GetOwnedTokensResponse, GetTokenActivityResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
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
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * A class to query all `DigitalAsset` related queries on Aptos.
 */
declare class DigitalAsset {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Creates a new collection within the specified account
     *
     * @param args.creator the account of the collection's creator
     * @param args.description the description of the collection
     * @param args.name the name of the collection
     * @param args.uri the URI to additional info about the collection
     *
     * The parameters below are optional.
     * @param args.maxSupply controls the max supply of the tokens - defaults MAX_U64_BIG_INT
     * @param args.mutableDescription controls mutability of the collection's description - defaults true
     * @param args.mutableRoyalty controls mutability of the collection's description - defaults true
     * @param args.mutableUri controls mutability of the collection's URI - defaults true
     * @param args.mutableTokenDescription controls mutability of the token's description - defaults true
     * @param args.mutableTokenName controls mutability of the token's name - defaults true
     * @param args.mutableTokenProperties controls mutability of token's properties - defaults true
     * @param args.mutableTokenUri controls mutability of the token's URI - defaults true
     * @param args.tokensBurnableByCreator controls whether tokens can be burnable by the creator - defaults true
     * @param args.tokensFreezableByCreator controls whether tokens can be frozen by the creator - defaults true
     * @param args.royaltyNumerator the numerator of the royalty to be paid to the creator when a token is transferred - defaults 0
     * @param args.royaltyDenominator the denominator of the royalty to be paid to the creator when a token is transferred -
     *    defaults 1
     *
     * @returns A SingleSignerTransaction that when submitted will create the collection.
     */
    createCollectionTransaction(args: {
        creator: Account;
        description: string;
        name: string;
        uri: string;
        options?: InputGenerateTransactionOptions;
    } & CreateCollectionOptions): Promise<SingleSignerTransaction>;
    /**
     * Queries data of a specific collection by the collection creator address and the collection name.
     *
     * If, for some reason, a creator account has 2 collections with the same name in v1 and v2,
     * can pass an optional `tokenStandard` parameter to query a specific standard
     *
     * @param args.creatorAddress the address of the collection's creator
     * @param args.collectionName the name of the collection
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.tokenStandard the token standard to query
     * @returns GetCollectionDataResponse response type
     */
    getCollectionData(args: {
        creatorAddress: AccountAddressInput;
        collectionName: string;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            tokenStandard?: TokenStandard;
        };
    }): Promise<GetCollectionDataResponse>;
    /**
     * Queries a collection's ID.
     *
     * This is the same as the collection's object address in V2, but V1 does
     * not use objects, and does not have an address
     *
     * @param args.creatorAddress the address of the collection's creator
     * @param args.collectionName the name of the collection
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.tokenStandard the token standard to query
     * @returns the collection id
     */
    getCollectionId(args: {
        creatorAddress: AccountAddressInput;
        collectionName: string;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            tokenStandard?: TokenStandard;
        };
    }): Promise<string>;
    /**
     * Create a transaction to mint a token into the creators account within an existing collection.
     *
     * @param args.creator the creator of the collection
     * @param args.collection the name of the collection the token belongs to
     * @param args.description the description of the token
     * @param args.name the name of the token
     * @param args.uri the URI to additional info about the token
     *
     * @returns A SingleSignerTransaction that can be simulated or submitted to chain
     */
    mintTokenTransaction(args: {
        creator: Account;
        collection: string;
        description: string;
        name: string;
        uri: string;
        options?: InputGenerateTransactionOptions;
    }): Promise<SingleSignerTransaction>;
    /**
     * Gets token data given the address of a token.
     *
     * @param args.tokenAddress The address of the token
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns GetTokenDataResponse containing relevant data to the token.
     */
    getTokenData(args: {
        tokenAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<GetTokenDataResponse>;
    /**
     * Gets token ownership data given the address of a token.
     *
     * @param args.tokenAddress The address of the token
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns GetCurrentTokenOwnershipResponse containing relevant ownership data of the token.
     */
    getCurrentTokenOwnership(args: {
        tokenAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<GetCurrentTokenOwnershipResponse>;
    /**
     * Gets the tokens that the given address owns.
     *
     * @param args.ownerAddress The address of the owner
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns GetOwnedTokensResponse containing ownership data of the tokens belonging to the ownerAddresss.
     */
    getOwnedTokens(args: {
        ownerAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetOwnedTokensResponse[0]>;
        };
    }): Promise<GetOwnedTokensResponse>;
    /**
     * Gets the activity data given the address of a token.
     *
     * @param args.tokenAddress The address of the token
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns GetTokenActivityResponse containing relevant activity data to the token.
     */
    getTokenActivity(args: {
        tokenAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: {
            pagination?: PaginationArgs;
            orderBy?: OrderBy<GetTokenActivityResponse[0]>;
        };
    }): Promise<GetTokenActivityResponse>;
}

export { DigitalAsset };
