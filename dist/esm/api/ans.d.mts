import { Account } from '../core/account.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { MoveAddressType } from '../types/index.mjs';
import { RegisterNameParameters, GetAccountNamesArgs, GetAccountDomainsArgs, GetAccountSubdomainsArgs, GetDomainSubdomainsArgs } from '../internal/ans.mjs';
import { InputGenerateTransactionOptions, SingleSignerTransaction } from '../transactions/types.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { GetANSNameResponse } from '../types/indexer.mjs';
import '../core/authenticationKey.mjs';
import '../core/crypto/asymmetricCrypto.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/generated/types.mjs';
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

/**
 * A class to handle all `ANS` operations
 */
declare class ANS {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Retrieve the owner address of a domain name or subdomain name from the contract.
     *
     * ```ts
     * // Will return the owner address of "test.aptos.apt" or undefined
     * const owner = await aptos.getOwnerAddress({name: "test.aptos"})
     * // owner = 0x123...
     * ```
     *
     * @param args.name - A string of the name to retrieve
     *
     * @returns MoveAddressType if the name is owned, undefined otherwise
     */
    getOwnerAddress(args: {
        name: string;
    }): Promise<MoveAddressType | undefined>;
    /**
     * Retrieve the expiration time of a domain name or subdomain name from the contract.
     *
     * ```ts
     * // Will return the expiration of "test.aptos.apt" or undefined
     * const exp = await aptos.getExpiration({name: "test.aptos"})
     * // new Date(exp) would give you the date in question: 2021-01-01T00:00:00.000Z
     * ```
     *
     * @param args.name - A string of the name to retrieve
     *
     * @returns number as a unix timestamp in milliseconds.
     */
    getExpiration(args: {
        name: string;
    }): Promise<number | undefined>;
    /**
     * Retrieve the target address of a domain or subdomain name. This is the
     * address the name points to for use on chain. Note, the target address can
     * point to addresses that are not the owner of the name
     *
     * ```ts
     * const targetAddr = await aptos.getTargetAddress({name: "test.aptos"})
     * // targetAddr = 0x123...
     * ```
     *
     * @param args.name - A string of the name: primary, primary.apt, secondary.primary, secondary.primary.apt, etc.
     *
     * @returns MoveAddressType if the name has a target, undefined otherwise
     */
    getTargetAddress(args: {
        name: string;
    }): Promise<MoveAddressType | undefined>;
    /**
     * Sets the target address of a domain or subdomain name. This is the
     * address the name points to for use on chain. Note, the target address can
     * point to addresses that are not the owner of the name
     *
     * ```ts
     * await aptos.setTargetAddress({sender: alice, name: "test.aptos", address: bob.accountAddress})
     * const address = await aptos.getTargetAddress({name: "test.aptos"})
     * // address = bob.accountAddress
     * ```
     *
     * @param args.name - A string of the name: test.aptos.apt, test.apt, test, test.aptos, etc.
     * @param args.address - A AccountAddressInput of the address to set the domain or subdomain to
     *
     * @returns SingleSignerTransaction
     */
    setTargetAddress(args: {
        sender: Account;
        name: string;
        address: AccountAddressInput;
        options?: InputGenerateTransactionOptions;
    }): Promise<SingleSignerTransaction>;
    /**
     * Retrieve the primary name for an account. An account can have
     * multiple names that target it, but only a single name that is primary. An
     * account also may not have a primary name.
     *
     * ```ts
     * const name = await aptos.getPrimaryName({address: alice.accountAddress})
     * // name = test.aptos
     * ```
     *
     * @param args.address - A AccountAddressInput (address) of the account
     *
     * @returns a string if the account has a primary name, undefined otherwise
     */
    getPrimaryName(args: {
        address: AccountAddressInput;
    }): Promise<string | undefined>;
    /**
     * Sets the primary name for the sender. An account can have
     * multiple names that target it, but only a single name that is primary. An
     * account also may not have a primary name.
     *
     * ```ts
     * await aptos.setPrimaryName({sender: alice, name: "test.aptos"})
     * const primaryName = await aptos.getPrimaryName({address: alice.accountAddress})
     * // primaryName = test.aptos
     * ```
     *
     * @param args.sender - The sender account
     * @param args.name - A string of the name: test, test.apt, test.aptos, test.aptos.apt, etc.
     *
     * @returns SingleSignerTransaction
     */
    setPrimaryName(args: {
        sender: Account;
        name: string | null;
        options?: InputGenerateTransactionOptions;
    }): Promise<SingleSignerTransaction>;
    /**
     * Registers a new name
     *
     * ```ts
     * // An example of registering a subdomain name assuming def.apt is already registered
     * // and belongs to the sender alice.
     *  const txn = aptos.registerName({
     *    sender: alice,
     *    name: "test.aptos.apt",
     *    expiration: {
     *      policy: "subdomain:independent",
     *      expirationDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
     *    },
     *  });
     * ```
     *
     * @param args.sender - The sender account
     * @param args.name - A string of the name to register. This can be inclusive or exclusive of the .apt suffix.
     * Examples include: "test", "test.apt", "test.aptos.apt", etc.
     * @param args.expiration  - An object with the expiration policy of the name.
     * @param args.expiration.policy - 'domain' | 'subdomain:follow-domain' | 'subdomain:independent'
     * - domain: Years is required and the name will expire after the given number of years.
     * - subdomain:follow-domain: The name will expire at the same time as the domain name.
     * - subdomain:independent: The name will expire at the given date.
     * @param args.expiration.expirationDate - An epoch number in milliseconds of
     * the date when the subdomain will expire. Only applicable when the policy is
     * set to 'subdomain:independent'.
     * @param args.transferable  - Determines if the subdomain being minted is soul-bound. Applicable only to subdomains.
     * @param args.targetAddress optional - The address the domain name will resolve to. If not provided,
     * the sender's address will be used.
     * @param args.toAddress optional - The address to send the domain name to. If not provided,
     * the transaction will be sent to the router.
     *
     * @returns SingleSignerTransaction
     */
    registerName(args: Omit<RegisterNameParameters, "aptosConfig">): Promise<SingleSignerTransaction>;
    /**
     * Renews a domain name
     *
     * Note: If a domain name was minted with V1 of the contract, it will automatically be upgraded to V2 via this transaction.
     *
     * ```ts
     * await aptos.renewDomain({sender: alice, name: "test"})
     * // test.apt will be renewed for one year
     * ```
     *
     * @param args.sender - The sender account
     * @param args.name - A string of the domain the subdomain will be under. The signer must be the domain owner.
     * Subdomains cannot be renewed.
     * @param args.years - The number of years to renew the name. Currently only one year is permitted.
     *
     * @returns SingleSignerTransaction
     */
    renewDomain(args: {
        sender: Account;
        name: string;
        years?: 1;
        options?: InputGenerateTransactionOptions;
    }): Promise<SingleSignerTransaction>;
    /**
     * Fetches a single name from the indexer
     * @param args.name - A string of the name to retrieve, e.g. "test.aptos.apt"
     * or "test.apt" or "test". Can be inclusive or exclusive of the .apt suffix.
     * Can be a subdomain.
     *
     * @returns A promise of an ANSName or undefined
     */
    getName(args: {
        name: string;
    }): Promise<GetANSNameResponse[0] | undefined>;
    /**
     * Fetches all  names for an account (both top level domains and subdomains)
     *
     * @param args
     * @param args.accountAddress - A AccountAddressInput of the address to retrieve names for.
     * @param args.options.pagination.offset - Optional, the offset to start from when fetching names
     * @param args.options.pagination.limit - Optional, A number of the names to fetch per request
     * @param args.options.orderBy - The order to sort the names by
     * @param args.options.where - Additional filters to apply to the query
     *
     * @returns a promise of an array of ANSName
     */
    getAccountNames(args: GetAccountNamesArgs): Promise<GetANSNameResponse>;
    /**
     * Fetches all top level domain names for an account
     *
     * @param args
     * @param args.accountAddress - A AccountAddressInput of the address to retrieve domain names for.
     * @param args.options.pagination.offset - Optional, the offset to start from when fetching names
     * @param args.options.pagination.limit - Optional, A number of the names to fetch per request
     * @param args.options.orderBy - The order to sort the names by
     * @param args.options.where - Additional filters to apply to the query
     *
     * @returns a promise of an array of ANSName
     */
    getAccountDomains(args: GetAccountDomainsArgs): Promise<GetANSNameResponse>;
    /**
     * Fetches all subdomains names for an account
     *
     * @param args
     * @param args.accountAddress - A AccountAddressInput of the address to retrieve subdomains names for.
     * @param args.options.pagination.offset - Optional, the offset to start from when fetching names
     * @param args.options.pagination.limit - Optional, A number of the names to fetch per request
     * @param args.options.orderBy - The order to sort the names by
     * @param args.options.where - Additional filters to apply to the query
     *
     * @returns a promise of an array of ANSName
     */
    getAccountSubdomains(args: GetAccountSubdomainsArgs): Promise<GetANSNameResponse>;
    /**
     * Fetches all subdomains names for a given domain. Note, this will not return the domain itself.
     *
     * @param args
     * @param args.domain - A string of the domain name: eg. "test.apt" or "test" (without the suffix of .apt)
     * @param args.options.pagination.offset - Optional, the offset to start from when fetching names
     * @param args.options.pagination.limit - Optional, A number of the names to fetch per request
     * @param args.options.orderBy - The order to sort the names by
     * @param args.options.where - Additional filters to apply to the query
     *
     * @returns a promise of an array of ANSName
     */
    getDomainSubdomains(args: GetDomainSubdomainsArgs): Promise<GetANSNameResponse>;
}

export { ANS };
