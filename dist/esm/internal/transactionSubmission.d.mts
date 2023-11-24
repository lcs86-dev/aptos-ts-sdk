import { AptosConfig } from '../api/aptosConfig.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { PrivateKey } from '../core/crypto/asymmetricCrypto.mjs';
import { UserTransactionResponse, PendingTransactionResponse, HexInput, TransactionResponse } from '../types/index.mjs';
import { AccountAuthenticator } from '../transactions/authenticator/account.mjs';
import { InputGenerateSingleSignerRawTransactionData, SingleSignerTransaction, InputGenerateMultiAgentRawTransactionData, MultiAgentTransaction, AnyRawTransaction, InputSimulateTransactionData, InputSubmitTransactionData, InputGenerateTransactionOptions } from '../transactions/types.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../core/authenticationKey.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/serializer.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../core/crypto/anyPublicKey.mjs';
import '../core/crypto/anySignature.mjs';
import '../core/crypto/ed25519.mjs';
import '../core/crypto/multiEd25519.mjs';
import '../core/crypto/multiKey.mjs';
import '../bcs/serializable/moveStructs.mjs';
import '../bcs/serializable/movePrimitives.mjs';
import '../bcs/serializable/fixedBytes.mjs';
import '../transactions/instances/rawTransaction.mjs';
import '../transactions/instances/chainId.mjs';
import '../transactions/instances/transactionPayload.mjs';
import '../transactions/instances/identifier.mjs';
import '../transactions/instances/moduleId.mjs';
import '../transactions/typeTag/index.mjs';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link api/transaction_submission}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * transaction_submission namespace and without having a dependency cycle error.
 */

/**
 * We are defining function signatures, each with its specific input and output.
 * These are the possible function signature for `generateTransaction` function.
 * When we call `generateTransaction` function with the relevant type properties,
 * Typescript can infer the return type based on the appropriate function overload.
 */
declare function generateTransaction(args: {
    aptosConfig: AptosConfig;
} & InputGenerateSingleSignerRawTransactionData): Promise<SingleSignerTransaction>;
declare function generateTransaction(args: {
    aptosConfig: AptosConfig;
} & InputGenerateMultiAgentRawTransactionData): Promise<MultiAgentTransaction>;
/**
 * Sign a transaction that can later be submitted to chain
 *
 * @param args.signer The signer account to sign the transaction
 * @param args.transaction An instance of a RawTransaction, plus optional secondary/fee payer addresses
 * ```
 * {
 *  rawTransaction: RawTransaction,
 *  secondarySignerAddresses? : Array<AccountAddress>,
 *  feePayerAddress?: AccountAddress
 * }
 * ```
 *
 * @return The signer AccountAuthenticator
 */
declare function signTransaction(args: {
    signer: Account;
    transaction: AnyRawTransaction;
}): AccountAuthenticator;
/**
 * Simulates a transaction before singing it.
 *
 * @param args.signerPublicKey The signer public key
 * @param args.transaction The raw transaction to simulate
 * @param args.secondarySignersPublicKeys optional. For when the transaction is a multi signers transaction
 * @param args.feePayerPublicKey optional. For when the transaction is a fee payer (aka sponsored) transaction
 * @param args.options optional. A config to simulate the transaction with
 */
declare function simulateTransaction(args: {
    aptosConfig: AptosConfig;
} & InputSimulateTransactionData): Promise<Array<UserTransactionResponse>>;
/**
 * Submit transaction to chain
 *
 * @param args.transaction A aptos transaction type
 * @param args.senderAuthenticator The account authenticator of the transaction sender
 * @param args.secondarySignerAuthenticators optional. For when the transaction is a multi signers transaction
 *
 * @return PendingTransactionResponse
 */
declare function submitTransaction(args: {
    aptosConfig: AptosConfig;
} & InputSubmitTransactionData): Promise<PendingTransactionResponse>;
declare function signAndSubmitTransaction(args: {
    aptosConfig: AptosConfig;
    signer: Account;
    transaction: AnyRawTransaction;
}): Promise<PendingTransactionResponse>;
declare function publicPackageTransaction(args: {
    aptosConfig: AptosConfig;
    account: AccountAddressInput;
    metadataBytes: HexInput;
    moduleBytecode: Array<HexInput>;
    options?: InputGenerateTransactionOptions;
}): Promise<SingleSignerTransaction>;
/**
 * TODO: Need to refactor and move this function out of transactionSubmission
 */
declare function rotateAuthKey(args: {
    aptosConfig: AptosConfig;
    fromAccount: Account;
    toNewPrivateKey: PrivateKey;
}): Promise<TransactionResponse>;

export { generateTransaction, publicPackageTransaction, rotateAuthKey, signAndSubmitTransaction, signTransaction, simulateTransaction, submitTransaction };
