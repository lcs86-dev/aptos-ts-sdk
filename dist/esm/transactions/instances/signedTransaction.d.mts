import { TransactionAuthenticator } from '../authenticator/transaction.mjs';
import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializable, Serializer } from '../../bcs/serializer.mjs';
import { RawTransaction } from './rawTransaction.mjs';
import '../authenticator/account.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';
import '../../core/accountAddress.mjs';
import './transactionArgument.mjs';
import './chainId.mjs';
import './transactionPayload.mjs';
import './identifier.mjs';
import './moduleId.mjs';
import '../typeTag/index.mjs';

declare class SignedTransaction extends Serializable {
    readonly raw_txn: RawTransaction;
    readonly authenticator: TransactionAuthenticator;
    /**
     * A SignedTransaction consists of a raw transaction and an authenticator. The authenticator
     * contains a client's public key and the signature of the raw transaction.
     *
     * @see {@link https://aptos.dev/integration/creating-a-signed-transaction | Creating a Signed Transaction}
     *
     * @param raw_txn
     * @param authenticator Contains a client's public key and the signature of the raw transaction.
     * Authenticator has 3 flavors: single signature, multi-signature and multi-agent.
     * @see {@link https://github.com/aptos-labs/aptos-core/blob/main/types/src/transaction/authenticator.rs} for details.
     */
    constructor(raw_txn: RawTransaction, authenticator: TransactionAuthenticator);
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): SignedTransaction;
}

export { SignedTransaction };
