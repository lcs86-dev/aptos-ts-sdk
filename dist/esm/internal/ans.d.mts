import { AptosConfig } from '../api/aptosConfig.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { MoveAddressType, PaginationArgs } from '../types/index.mjs';
import { InputGenerateTransactionOptions, SingleSignerTransaction } from '../transactions/types.mjs';
import { CurrentAptosNamesBoolExp } from '../types/generated/types.mjs';
import { GetANSNameResponse, OrderBy } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
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
 * the {@link api/name}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * name namespace and without having a dependency cycle error.
 */

declare const VALIDATION_RULES_DESCRIPTION: string;
/**
 *
 * @param fragment A fragment of a name, either the domain or subdomain
 * @returns boolean indicating if the fragment is a valid fragment
 */
declare function isValidANSSegment(fragment: string): boolean;
/**
 * Checks if an ANS name is valid or not
 *
 * @param name A string of the domain name, can include or exclude the .apt suffix
 */
declare function isValidANSName(name: string): {
    domainName: string;
    subdomainName?: string;
};
declare const LOCAL_ANS_ACCOUNT_PK: string;
declare const LOCAL_ANS_ACCOUNT_ADDRESS: string;
declare function getOwnerAddress(args: {
    aptosConfig: AptosConfig;
    name: string;
}): Promise<string | undefined>;
interface RegisterNameParameters {
    aptosConfig: AptosConfig;
    sender: Account;
    name: string;
    expiration: {
        policy: "domain";
        years?: 1;
    } | {
        policy: "subdomain:follow-domain";
    } | {
        policy: "subdomain:independent";
        expirationDate: number;
    };
    transferable?: boolean;
    toAddress?: AccountAddressInput;
    targetAddress?: AccountAddressInput;
    options?: InputGenerateTransactionOptions;
}
declare function registerName(args: RegisterNameParameters): Promise<SingleSignerTransaction>;
declare function getExpiration(args: {
    aptosConfig: AptosConfig;
    name: string;
}): Promise<number | undefined>;
declare function getPrimaryName(args: {
    aptosConfig: AptosConfig;
    address: AccountAddressInput;
}): Promise<string | undefined>;
declare function setPrimaryName(args: {
    aptosConfig: AptosConfig;
    sender: Account;
    name: string | null;
    options?: InputGenerateTransactionOptions;
}): Promise<SingleSignerTransaction>;
declare function getTargetAddress(args: {
    aptosConfig: AptosConfig;
    name: string;
}): Promise<MoveAddressType | undefined>;
declare function setTargetAddress(args: {
    aptosConfig: AptosConfig;
    sender: Account;
    name: string;
    address: AccountAddressInput;
    options?: InputGenerateTransactionOptions;
}): Promise<SingleSignerTransaction>;
declare function getName(args: {
    aptosConfig: AptosConfig;
    name: string;
}): Promise<GetANSNameResponse[0] | undefined>;
interface QueryNamesOptions {
    options?: {
        pagination?: PaginationArgs;
        orderBy?: OrderBy<GetANSNameResponse[0]>;
        where?: CurrentAptosNamesBoolExp;
    };
}
interface GetAccountNamesArgs extends QueryNamesOptions {
    accountAddress: AccountAddressInput;
}
declare function getAccountNames(args: {
    aptosConfig: AptosConfig;
} & GetAccountNamesArgs): Promise<GetANSNameResponse>;
interface GetAccountDomainsArgs extends QueryNamesOptions {
    accountAddress: AccountAddressInput;
}
declare function getAccountDomains(args: {
    aptosConfig: AptosConfig;
} & GetAccountDomainsArgs): Promise<GetANSNameResponse>;
interface GetAccountSubdomainsArgs extends QueryNamesOptions {
    accountAddress: AccountAddressInput;
}
declare function getAccountSubdomains(args: {
    aptosConfig: AptosConfig;
} & GetAccountSubdomainsArgs): Promise<GetANSNameResponse>;
interface GetDomainSubdomainsArgs extends QueryNamesOptions {
    domain: string;
}
declare function getDomainSubdomains(args: {
    aptosConfig: AptosConfig;
} & GetDomainSubdomainsArgs): Promise<GetANSNameResponse>;
declare function renewDomain(args: {
    aptosConfig: AptosConfig;
    sender: Account;
    name: string;
    years?: 1;
    options?: InputGenerateTransactionOptions;
}): Promise<SingleSignerTransaction>;

export { GetAccountDomainsArgs, GetAccountNamesArgs, GetAccountSubdomainsArgs, GetDomainSubdomainsArgs, LOCAL_ANS_ACCOUNT_ADDRESS, LOCAL_ANS_ACCOUNT_PK, RegisterNameParameters, VALIDATION_RULES_DESCRIPTION, getAccountDomains, getAccountNames, getAccountSubdomains, getDomainSubdomains, getExpiration, getName, getOwnerAddress, getPrimaryName, getTargetAddress, isValidANSName, isValidANSSegment, registerName, renewDomain, setPrimaryName, setTargetAddress };
