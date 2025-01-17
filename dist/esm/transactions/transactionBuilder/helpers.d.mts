import { SimpleEntryFunctionArgumentTypes, EntryFunctionArgumentTypes, InputGenerateTransactionPayloadDataWithRemoteABI, InputGenerateTransactionPayloadData, InputScriptData } from '../types.mjs';
import { MoveFunction, MoveFunctionId } from '../../types/index.mjs';
import { FixedBytes } from '../../bcs/serializable/fixedBytes.mjs';
import { Bool, U8, U16, U32, U64, U128, U256 } from '../../bcs/serializable/movePrimitives.mjs';
import { MoveString } from '../../bcs/serializable/moveStructs.mjs';
import { AccountAddress } from '../../core/accountAddress.mjs';
import '../../api/aptosConfig.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../utils/const.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';
import '../../bcs/serializer.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../instances/rawTransaction.mjs';
import '../../bcs/deserializer.mjs';
import '../instances/chainId.mjs';
import '../instances/transactionPayload.mjs';
import '../instances/transactionArgument.mjs';
import '../instances/identifier.mjs';
import '../instances/moduleId.mjs';
import '../typeTag/index.mjs';
import '../authenticator/account.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';

declare function isBool(arg: SimpleEntryFunctionArgumentTypes): arg is boolean;
declare function isString(arg: any): arg is string;
declare function isNumber(arg: SimpleEntryFunctionArgumentTypes): arg is number;
declare function isLargeNumber(arg: SimpleEntryFunctionArgumentTypes): arg is number | bigint | string;
declare function isNull(arg: SimpleEntryFunctionArgumentTypes): arg is null | undefined;
declare function isBcsBool(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is Bool;
declare function isBcsAddress(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is AccountAddress;
declare function isBcsString(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is MoveString;
declare function isBcsFixedBytes(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is FixedBytes;
declare function isBcsU8(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is U8;
declare function isBcsU16(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is U16;
declare function isBcsU32(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is U32;
declare function isBcsU64(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is U64;
declare function isBcsU128(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is U128;
declare function isBcsU256(arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes): arg is U256;
declare function isScriptDataInput(arg: InputGenerateTransactionPayloadDataWithRemoteABI | InputGenerateTransactionPayloadData): arg is InputScriptData;
declare function throwTypeMismatch(expectedType: string, position: number): void;
/**
 * Finds first non-signer arg.
 *
 * A function is often defined with a `signer` or `&signer` arguments at the start, which are filled in
 * by signatures, and not by the caller.
 * @param functionAbi
 */
declare function findFirstNonSignerArg(functionAbi: MoveFunction): number;
declare function getFunctionParts(functionArg: MoveFunctionId): {
    moduleAddress: string;
    moduleName: string;
    functionName: string;
};

export { findFirstNonSignerArg, getFunctionParts, isBcsAddress, isBcsBool, isBcsFixedBytes, isBcsString, isBcsU128, isBcsU16, isBcsU256, isBcsU32, isBcsU64, isBcsU8, isBool, isLargeNumber, isNull, isNumber, isScriptDataInput, isString, throwTypeMismatch };
