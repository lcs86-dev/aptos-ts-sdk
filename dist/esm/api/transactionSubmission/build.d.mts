import { AccountAddressInput } from '../../core/accountAddress.mjs';
import { InputGenerateTransactionPayloadData, InputGenerateTransactionOptions, SingleSignerTransaction, MultiAgentTransaction } from '../../transactions/types.mjs';
import { AptosConfig } from '../aptosConfig.mjs';
import '../../bcs/serializer.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../bcs/deserializer.mjs';
import '../../transactions/instances/transactionArgument.mjs';
import '../../bcs/serializable/moveStructs.mjs';
import '../../bcs/serializable/movePrimitives.mjs';
import '../../bcs/serializable/fixedBytes.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';
import '../../transactions/instances/rawTransaction.mjs';
import '../../transactions/instances/chainId.mjs';
import '../../transactions/instances/transactionPayload.mjs';
import '../../transactions/instances/identifier.mjs';
import '../../transactions/instances/moduleId.mjs';
import '../../transactions/typeTag/index.mjs';
import '../../transactions/authenticator/account.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';
import '../../utils/const.mjs';

/**
 * A class to handle all `Build` transaction operations
 */
declare class Build {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    transaction(args: {
        sender: AccountAddressInput;
        data: InputGenerateTransactionPayloadData;
        options?: InputGenerateTransactionOptions;
        withFeePayer?: boolean;
    }): Promise<SingleSignerTransaction>;
    multiAgentTransaction(args: {
        sender: AccountAddressInput;
        data: InputGenerateTransactionPayloadData;
        secondarySignerAddresses: AccountAddressInput[];
        options?: InputGenerateTransactionOptions;
        withFeePayer?: boolean;
    }): Promise<MultiAgentTransaction>;
}

export { Build };
