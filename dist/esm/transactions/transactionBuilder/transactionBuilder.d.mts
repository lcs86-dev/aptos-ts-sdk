import { AptosConfig } from '../../api/aptosConfig.mjs';
import { Account } from '../../core/account.mjs';
import { AccountAddressInput } from '../../core/accountAddress.mjs';
import { PublicKey } from '../../core/crypto/asymmetricCrypto.mjs';
import { AccountAuthenticatorEd25519, AccountAuthenticatorSingleKey, AccountAuthenticator } from '../authenticator/account.mjs';
import { RawTransaction, MultiAgentRawTransaction, FeePayerRawTransaction } from '../instances/rawTransaction.mjs';
import { TransactionPayloadScript, TransactionPayloadEntryFunction, TransactionPayloadMultisig } from '../instances/transactionPayload.mjs';
import { InputScriptData, InputEntryFunctionDataWithRemoteABI, InputMultiSigDataWithRemoteABI, InputEntryFunctionData, EntryFunctionABI, InputMultiSigData, AnyTransactionPayloadInstance, InputGenerateTransactionOptions, InputGenerateSingleSignerRawTransactionArgs, SingleSignerTransaction, InputGenerateMultiAgentRawTransactionArgs, MultiAgentTransaction, InputSimulateTransactionData, AnyRawTransaction, InputSubmitTransactionData, AnyRawTransactionInstance } from '../types.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../utils/const.mjs';
import '../../core/authenticationKey.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../bcs/serializer.mjs';
import '../../bcs/deserializer.mjs';
import '../instances/transactionArgument.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';
import '../instances/chainId.mjs';
import '../instances/identifier.mjs';
import '../instances/moduleId.mjs';
import '../typeTag/index.mjs';
import '../../bcs/serializable/moveStructs.mjs';
import '../../bcs/serializable/movePrimitives.mjs';
import '../../bcs/serializable/fixedBytes.mjs';

/**
 * We are defining function signatures, each with its specific input and output.
 * These are the possible function signature for our `generateTransactionPayload` function.
 * When we call our `generateTransactionPayload` function with the relevant type properties,
 * Typescript can infer the return type based on the appropriate function overload.
 */
declare function generateTransactionPayload(args: InputScriptData): Promise<TransactionPayloadScript>;
declare function generateTransactionPayload(args: InputEntryFunctionDataWithRemoteABI): Promise<TransactionPayloadEntryFunction>;
declare function generateTransactionPayload(args: InputMultiSigDataWithRemoteABI): Promise<TransactionPayloadMultisig>;
declare function generateTransactionPayloadWithABI(args: InputEntryFunctionData, functionAbi: EntryFunctionABI): TransactionPayloadEntryFunction;
declare function generateTransactionPayloadWithABI(args: InputMultiSigData, functionAbi: EntryFunctionABI): TransactionPayloadMultisig;
/**
 * Generates a raw transaction
 *
 * @param args.aptosConfig AptosConfig
 * @param args.sender The transaction's sender account address as a hex input
 * @param args.payload The transaction payload - can create by using generateTransactionPayload()
 *
 * @returns RawTransaction
 */
declare function generateRawTransaction(args: {
    aptosConfig: AptosConfig;
    sender: AccountAddressInput;
    payload: AnyTransactionPayloadInstance;
    options?: InputGenerateTransactionOptions;
}): Promise<RawTransaction>;
/**
 * We are defining function signatures, each with its specific input and output.
 * These are the possible function signature for our `generateTransaction` function.
 * When we call our `generateTransaction` function with the relevant type properties,
 * Typescript can infer the return type based on the appropriate function overload.
 */
declare function buildTransaction(args: InputGenerateSingleSignerRawTransactionArgs): Promise<SingleSignerTransaction>;
declare function buildTransaction(args: InputGenerateMultiAgentRawTransactionArgs): Promise<MultiAgentTransaction>;
/**
 * Simulate a transaction before signing and submit to chain
 *
 * @param args.transaction A aptos transaction type to sign
 * @param args.signerPublicKey The signer public key
 * @param args.secondarySignersPublicKeys optional. The secondary signers public keys if multi signers transaction
 * @param args.feePayerPublicKey optional. The fee payer public key is a fee payer (aka sponsored) transaction
 * @param args.options optional. SimulateTransactionOptions
 *
 * @returns A signed serialized transaction that can be simulated
 */
declare function generateSignedTransactionForSimulation(args: InputSimulateTransactionData): Uint8Array;
declare function getAuthenticatorForSimulation(publicKey: PublicKey): AccountAuthenticatorEd25519 | AccountAuthenticatorSingleKey;
/**
 * Sign a transaction that can later be submitted to chain
 *
 * @param args.signer The signer account to sign the transaction
 * @param args.transaction A aptos transaction type to sign
 *
 * @return The signer AccountAuthenticator
 */
declare function sign(args: {
    signer: Account;
    transaction: AnyRawTransaction;
}): AccountAuthenticator;
/**
 * Prepare a transaction to be submitted to chain
 *
 * @param args.transaction A aptos transaction type
 * @param args.senderAuthenticator The account authenticator of the transaction sender
 * @param args.secondarySignerAuthenticators optional. For when the transaction is a multi signers transaction
 *
 * @returns A SignedTransaction
 */
declare function generateSignedTransaction(args: InputSubmitTransactionData): Uint8Array;
/**
 * Derive the raw transaction type - FeePayerRawTransaction or MultiAgentRawTransaction or RawTransaction
 *
 * @param transaction A aptos transaction type
 *
 * @returns FeePayerRawTransaction | MultiAgentRawTransaction | RawTransaction
 */
declare function deriveTransactionType(transaction: AnyRawTransaction): AnyRawTransactionInstance;
/**
 * Generate a multi signers signed transaction that can be submitted to chain
 *
 * @param transaction MultiAgentRawTransaction | FeePayerRawTransaction
 * @param senderAuthenticator The account authenticator of the transaction sender
 * @param secondarySignerAuthenticators The extra signers account Authenticators
 *
 * @returns A SignedTransaction
 */
declare function generateMultiSignersSignedTransaction(transaction: MultiAgentRawTransaction | FeePayerRawTransaction, senderAuthenticator: AccountAuthenticator, feePayerAuthenticator?: AccountAuthenticator, additionalSignersAuthenticators?: Array<AccountAuthenticator>): Uint8Array;
declare function getSigningMessage(rawTxn: AnyRawTransactionInstance): Uint8Array;

export { buildTransaction, deriveTransactionType, generateMultiSignersSignedTransaction, generateRawTransaction, generateSignedTransaction, generateSignedTransactionForSimulation, generateTransactionPayload, generateTransactionPayloadWithABI, getAuthenticatorForSimulation, getSigningMessage, sign };
