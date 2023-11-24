import { AptosConfig } from '../api/aptosConfig.mjs';
import { MoveVector, MoveOption, MoveString } from '../bcs/serializable/moveStructs.mjs';
import { Bool, U8, U16, U32, U64, U128, U256 } from '../bcs/serializable/movePrimitives.mjs';
import { FixedBytes } from '../bcs/serializable/fixedBytes.mjs';
import { AccountAddress, AccountAddressInput } from '../core/accountAddress.mjs';
import { PublicKey } from '../core/crypto/asymmetricCrypto.mjs';
import { AnyNumber, MoveFunctionId, HexInput, MoveFunctionGenericTypeParam } from '../types/index.mjs';
import { RawTransaction, MultiAgentRawTransaction, FeePayerRawTransaction } from './instances/rawTransaction.mjs';
import { AccountAuthenticator } from './authenticator/account.mjs';
import { TransactionPayloadEntryFunction, TransactionPayloadScript, TransactionPayloadMultisig } from './instances/transactionPayload.mjs';
import { TypeTag } from './typeTag/index.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import './instances/transactionArgument.mjs';
import './instances/chainId.mjs';
import './instances/identifier.mjs';
import './instances/moduleId.mjs';
import '../core/crypto/anyPublicKey.mjs';
import '../core/crypto/anySignature.mjs';
import '../core/crypto/ed25519.mjs';
import '../core/crypto/multiEd25519.mjs';
import '../core/crypto/multiKey.mjs';

/**
 * Entry function arguments to be used when building a raw transaction using remote ABI
 */
type SimpleEntryFunctionArgumentTypes = boolean | number | bigint | string | null | undefined | Uint8Array | Array<SimpleEntryFunctionArgumentTypes>;
/**
 * Entry function arguments to be used when building a raw transaction using BCS serialized arguments
 */
type EntryFunctionArgumentTypes = Bool | U8 | U16 | U32 | U64 | U128 | U256 | AccountAddress | MoveVector<EntryFunctionArgumentTypes> | MoveOption<EntryFunctionArgumentTypes> | MoveString | FixedBytes;
/**
 * Script function arguments to be used when building a raw transaction using BCS serialized arguments
 */
type ScriptFunctionArgumentTypes = Bool | U8 | U16 | U32 | U64 | U128 | U256 | AccountAddress | MoveVector<U8> | MoveString | FixedBytes;
/**
 * Type that holds all raw transaction instances Aptos SDK supports
 */
type AnyRawTransactionInstance = RawTransaction | MultiAgentRawTransaction | FeePayerRawTransaction;
/**
 * Optional options to set when generating a transaction
 */
type InputGenerateTransactionOptions = {
    maxGasAmount?: AnyNumber;
    gasUnitPrice?: AnyNumber;
    expireTimestamp?: AnyNumber;
    accountSequenceNumber?: AnyNumber;
};
/**
 * The generated transaction payload type that was produces from `generateTransactionPayload()` function.
 */
type AnyTransactionPayloadInstance = TransactionPayloadEntryFunction | TransactionPayloadScript | TransactionPayloadMultisig;
/**
 * Unified type for the data needed to generate a transaction payload of types:
 * Entry Function | Script | Multi Sig
 */
type InputGenerateTransactionPayloadData = InputEntryFunctionData | InputScriptData | InputMultiSigData;
type InputGenerateTransactionPayloadDataWithRemoteABI = InputScriptData | InputEntryFunctionDataWithRemoteABI | InputMultiSigDataWithRemoteABI;
/**
 * The data needed to generate an Entry Function payload
 */
type InputEntryFunctionData = {
    function: MoveFunctionId;
    typeArguments?: Array<TypeTag | string>;
    functionArguments: Array<EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes>;
};
type InputEntryFunctionDataWithRemoteABI = InputEntryFunctionData & {
    aptosConfig: AptosConfig;
};
/**
 * The data needed to generate a Multi Sig payload
 */
type InputMultiSigData = {
    multisigAddress: AccountAddress;
} & InputEntryFunctionData;
/**
 * The data needed to generate a Multi Sig payload
 */
type InputMultiSigDataWithRemoteABI = {
    multisigAddress: AccountAddressInput;
} & InputEntryFunctionDataWithRemoteABI;
/**
 * The data needed to generate a Script payload
 */
type InputScriptData = {
    bytecode: HexInput;
    typeArguments?: Array<TypeTag>;
    functionArguments: Array<ScriptFunctionArgumentTypes>;
};
/**
 * Interface of an Entry function's ABI.
 *
 * This is used to provide type checking and simple input conversion on ABI based transaction submission.
 */
type EntryFunctionABI = {
    typeParameters: Array<MoveFunctionGenericTypeParam>;
    parameters: Array<TypeTag>;
};
/**
 * Interface of the arguments to generate a single signer transaction.
 * Used to provide to `generateTransaction()` method in the transaction builder flow
 */
interface InputGenerateSingleSignerRawTransactionArgs {
    aptosConfig: AptosConfig;
    sender: AccountAddressInput;
    payload: AnyTransactionPayloadInstance;
    options?: InputGenerateTransactionOptions;
    feePayerAddress?: AccountAddressInput;
}
/**
 * Interface of the arguments to generate a multi-agent transaction.
 * Used to provide to `generateTransaction()` method in the transaction builder flow
 */
interface InputGenerateMultiAgentRawTransactionArgs {
    aptosConfig: AptosConfig;
    sender: AccountAddressInput;
    payload: AnyTransactionPayloadInstance;
    secondarySignerAddresses: AccountAddressInput[];
    options?: InputGenerateTransactionOptions;
    feePayerAddress?: AccountAddressInput;
}
/**
 * Unified type that holds all the interfaces to generate different transaction types
 */
type InputGenerateRawTransactionArgs = InputGenerateSingleSignerRawTransactionArgs | InputGenerateMultiAgentRawTransactionArgs;
/**
 * Interface that holds the return data when generating a single signer transaction
 *
 * @param rawTransaction a bcs serialized raw transaction
 */
interface SingleSignerTransaction {
    rawTransaction: RawTransaction;
    feePayerAddress?: AccountAddress;
    secondarySignerAddresses?: undefined;
}
/**
 * Interface that holds the return data when generating a multi-agent transaction.
 *
 * @param rawTransaction a bcs serialized raw transaction
 * @param secondarySignerAddresses secondary signer addresses for multi-agent transaction
 */
interface MultiAgentTransaction {
    rawTransaction: RawTransaction;
    secondarySignerAddresses: AccountAddress[];
    feePayerAddress?: AccountAddress;
}
/**
 * Unified type that holds all the return interfaces when generating different transaction types
 */
type AnyRawTransaction = SingleSignerTransaction | MultiAgentTransaction;
type InputSimulateTransactionData = {
    /**
     * The transaction to simulate, probably generated by `generateTransaction()`
     */
    transaction: AnyRawTransaction;
    /**
     * For a single signer transaction
     */
    signerPublicKey: PublicKey;
    /**
     * For a fee payer or multi-agent transaction that requires additional signers in
     */
    secondarySignersPublicKeys?: Array<PublicKey>;
    /**
     * For a fee payer transaction (aka Sponsored Transaction)
     */
    feePayerPublicKey?: PublicKey;
    options?: InputSimulateTransactionOptions;
};
type InputSimulateTransactionOptions = {
    estimateGasUnitPrice?: boolean;
    estimateMaxGasAmount?: boolean;
    estimatePrioritizedGasUnitPrice?: boolean;
};
/**
 * Interface that holds the user data input when generating a single signer transaction
 */
interface InputGenerateSingleSignerRawTransactionData {
    sender: AccountAddressInput;
    data: InputGenerateTransactionPayloadData;
    options?: InputGenerateTransactionOptions;
    withFeePayer?: boolean;
    secondarySignerAddresses?: undefined;
}
/**
 * Interface that holds the user data input when generating a multi-agent transaction
 */
interface InputGenerateMultiAgentRawTransactionData {
    sender: AccountAddressInput;
    data: InputGenerateTransactionPayloadData;
    secondarySignerAddresses: AccountAddressInput[];
    options?: InputGenerateTransactionOptions;
    withFeePayer?: boolean;
}
/**
 * Unified type that holds all the user data input interfaces when generating different transaction types
 */
type InputGenerateTransactionData = InputGenerateSingleSignerRawTransactionData | InputGenerateMultiAgentRawTransactionData;
/**
 * Interface that holds the user data input when submitting a transaction
 */
interface InputSubmitTransactionData {
    transaction: AnyRawTransaction;
    senderAuthenticator: AccountAuthenticator;
    feePayerAuthenticator?: AccountAuthenticator;
    additionalSignersAuthenticators?: Array<AccountAuthenticator>;
}

export { AnyRawTransaction, AnyRawTransactionInstance, AnyTransactionPayloadInstance, EntryFunctionABI, EntryFunctionArgumentTypes, InputEntryFunctionData, InputEntryFunctionDataWithRemoteABI, InputGenerateMultiAgentRawTransactionArgs, InputGenerateMultiAgentRawTransactionData, InputGenerateRawTransactionArgs, InputGenerateSingleSignerRawTransactionArgs, InputGenerateSingleSignerRawTransactionData, InputGenerateTransactionData, InputGenerateTransactionOptions, InputGenerateTransactionPayloadData, InputGenerateTransactionPayloadDataWithRemoteABI, InputMultiSigData, InputMultiSigDataWithRemoteABI, InputScriptData, InputSimulateTransactionData, InputSimulateTransactionOptions, InputSubmitTransactionData, MultiAgentTransaction, ScriptFunctionArgumentTypes, SimpleEntryFunctionArgumentTypes, SingleSignerTransaction };
