import { AccountAuthenticator } from './account.mjs';
import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializable, Serializer } from '../../bcs/serializer.mjs';
import { AccountAddress } from '../../core/accountAddress.mjs';
import { Ed25519PublicKey, Ed25519Signature } from '../../core/crypto/ed25519.mjs';
import { MultiEd25519PublicKey, MultiEd25519Signature } from '../../core/crypto/multiEd25519.mjs';
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
import '../../core/crypto/multiKey.mjs';
import '../instances/transactionArgument.mjs';

declare abstract class TransactionAuthenticator extends Serializable {
    abstract serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): TransactionAuthenticator;
}
/**
 * Transaction authenticator Ed25519 for a single signer transaction
 *
 * @param public_key Client's public key.
 * @param signature Ed25519 signature of a raw transaction.
 * @see {@link https://aptos.dev/integration/creating-a-signed-transaction | Creating a Signed Transaction}
 * for details about generating a signature.
 */
declare class TransactionAuthenticatorEd25519 extends TransactionAuthenticator {
    readonly public_key: Ed25519PublicKey;
    readonly signature: Ed25519Signature;
    constructor(public_key: Ed25519PublicKey, signature: Ed25519Signature);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TransactionAuthenticatorEd25519;
}
/**
 * Transaction authenticator Ed25519 for a multi signers transaction
 *
 * @param public_key Client's public key.
 * @param signature Multi Ed25519 signature of a raw transaction.
 *
 */
declare class TransactionAuthenticatorMultiEd25519 extends TransactionAuthenticator {
    readonly public_key: MultiEd25519PublicKey;
    readonly signature: MultiEd25519Signature;
    constructor(public_key: MultiEd25519PublicKey, signature: MultiEd25519Signature);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TransactionAuthenticatorMultiEd25519;
}
/**
 * Transaction authenticator for a multi-agent transaction
 *
 * @param sender Sender account authenticator
 * @param secondary_signer_addresses Secondary signers address
 * @param secondary_signers Secondary signers account authenticators
 *
 */
declare class TransactionAuthenticatorMultiAgent extends TransactionAuthenticator {
    readonly sender: AccountAuthenticator;
    readonly secondary_signer_addresses: Array<AccountAddress>;
    readonly secondary_signers: Array<AccountAuthenticator>;
    constructor(sender: AccountAuthenticator, secondary_signer_addresses: Array<AccountAddress>, secondary_signers: Array<AccountAuthenticator>);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TransactionAuthenticatorMultiAgent;
}
/**
 * Transaction authenticator for a fee payer transaction
 *
 * @param sender Sender account authenticator
 * @param secondary_signer_addresses Secondary signers address
 * @param secondary_signers Secondary signers account authenticators
 * @param fee_payer Object of the fee payer account address and the fee payer authentication
 *
 */
declare class TransactionAuthenticatorFeePayer extends TransactionAuthenticator {
    readonly sender: AccountAuthenticator;
    readonly secondary_signer_addresses: Array<AccountAddress>;
    readonly secondary_signers: Array<AccountAuthenticator>;
    readonly fee_payer: {
        address: AccountAddress;
        authenticator: AccountAuthenticator;
    };
    constructor(sender: AccountAuthenticator, secondary_signer_addresses: Array<AccountAddress>, secondary_signers: Array<AccountAuthenticator>, fee_payer: {
        address: AccountAddress;
        authenticator: AccountAuthenticator;
    });
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TransactionAuthenticatorMultiAgent;
}
/**
 * Single Sender authenticator for a single signer transaction
 *
 * @param sender AccountAuthenticator
 */
declare class TransactionAuthenticatorSingleSender extends TransactionAuthenticator {
    readonly sender: AccountAuthenticator;
    constructor(sender: AccountAuthenticator);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TransactionAuthenticatorSingleSender;
}

export { TransactionAuthenticator, TransactionAuthenticatorEd25519, TransactionAuthenticatorFeePayer, TransactionAuthenticatorMultiAgent, TransactionAuthenticatorMultiEd25519, TransactionAuthenticatorSingleSender };
