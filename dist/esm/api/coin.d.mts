import { Account } from '../core/account.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { AnyNumber, MoveStructId } from '../types/index.mjs';
import { InputGenerateTransactionOptions, SingleSignerTransaction } from '../transactions/types.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import '../core/authenticationKey.mjs';
import '../core/crypto/asymmetricCrypto.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
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

/**
 * A class to handle all `Coin` operations
 */
declare class Coin {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Generate a transfer coin transaction that can be simulated and/or signed and submitted
     *
     * @param args.sender The sender account
     * @param args.recipient The recipient address
     * @param args.amount The amount to transfer
     * @param args.coinType optional. The coin struct type to transfer. Defaults to 0x1::aptos_coin::AptosCoin
     *
     * @returns SingleSignerTransaction
     */
    transferCoinTransaction(args: {
        sender: Account;
        recipient: AccountAddressInput;
        amount: AnyNumber;
        coinType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SingleSignerTransaction>;
}

export { Coin };
