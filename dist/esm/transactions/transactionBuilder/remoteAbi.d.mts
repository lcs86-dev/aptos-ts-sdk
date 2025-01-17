import { TypeTag } from '../typeTag/index.mjs';
import { AptosConfig } from '../../api/aptosConfig.mjs';
import { EntryFunctionABI, EntryFunctionArgumentTypes, SimpleEntryFunctionArgumentTypes } from '../types.mjs';
import '../../bcs/deserializer.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../bcs/serializer.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../core/accountAddress.mjs';
import '../instances/transactionArgument.mjs';
import '../instances/identifier.mjs';
import '../../utils/const.mjs';
import '../../bcs/serializable/moveStructs.mjs';
import '../../bcs/serializable/movePrimitives.mjs';
import '../../bcs/serializable/fixedBytes.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';
import '../instances/rawTransaction.mjs';
import '../instances/chainId.mjs';
import '../instances/transactionPayload.mjs';
import '../instances/moduleId.mjs';
import '../authenticator/account.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';

/**
 * Convert type arguments to only type tags, allowing for string representations of type tags
 */
declare function standardizeTypeTags(typeArguments?: Array<TypeTag | string>): Array<TypeTag>;
/**
 * Fetches the ABI for an entry function from the module
 *
 * @param moduleAddress
 * @param moduleName
 * @param functionName
 * @param aptosConfig
 */
declare function fetchEntryFunctionAbi(moduleAddress: string, moduleName: string, functionName: string, aptosConfig: AptosConfig): Promise<EntryFunctionABI>;
/**
 * Converts a non-BCS encoded argument into BCS encoded, if necessary
 * @param functionName
 * @param functionAbi
 * @param arg
 * @param position
 */
declare function convertArgument(functionName: string, functionAbi: EntryFunctionABI, arg: EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes, position: number, genericTypeParams: Array<TypeTag>): EntryFunctionArgumentTypes;

export { convertArgument, fetchEntryFunctionAbi, standardizeTypeTags };
