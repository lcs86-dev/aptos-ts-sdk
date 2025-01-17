import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializable, Serializer } from '../../bcs/serializer.mjs';
import { AnyPublicKey } from '../../core/crypto/anyPublicKey.mjs';
import { AnySignature } from '../../core/crypto/anySignature.mjs';
import { Ed25519PublicKey, Ed25519Signature } from '../../core/crypto/ed25519.mjs';
import { MultiEd25519PublicKey, MultiEd25519Signature } from '../../core/crypto/multiEd25519.mjs';
import { MultiKey } from '../../core/crypto/multiKey.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';

declare abstract class AccountAuthenticator extends Serializable {
    abstract serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): AccountAuthenticator;
}
/**
 * Transaction authenticator Ed25519 for a multi signer transaction
 *
 * @param public_key Account's Ed25519 public key.
 * @param signature Account's Ed25519 signature
 *
 */
declare class AccountAuthenticatorEd25519 extends AccountAuthenticator {
    readonly public_key: Ed25519PublicKey;
    readonly signature: Ed25519Signature;
    constructor(public_key: Ed25519PublicKey, signature: Ed25519Signature);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): AccountAuthenticatorEd25519;
}
/**
 * Transaction authenticator Multi Ed25519 for a multi signers transaction
 *
 * @param public_key Account's MultiEd25519 public key.
 * @param signature Account's MultiEd25519 signature
 *
 */
declare class AccountAuthenticatorMultiEd25519 extends AccountAuthenticator {
    readonly public_key: MultiEd25519PublicKey;
    readonly signature: MultiEd25519Signature;
    constructor(public_key: MultiEd25519PublicKey, signature: MultiEd25519Signature);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): AccountAuthenticatorMultiEd25519;
}
/**
 * AccountAuthenticatorSingleKey for a single signer
 *
 * @param public_key AnyPublicKey
 * @param signature AnySignature
 *
 */
declare class AccountAuthenticatorSingleKey extends AccountAuthenticator {
    readonly public_key: AnyPublicKey;
    readonly signature: AnySignature;
    constructor(public_key: AnyPublicKey, signature: AnySignature);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): AccountAuthenticatorSingleKey;
}
/**
 * AccountAuthenticatorMultiKey for a multi signer
 *
 * @param public_keys MultiKey
 * @param signatures Signature
 *
 */
declare class AccountAuthenticatorMultiKey extends AccountAuthenticator {
    readonly public_keys: MultiKey;
    readonly signatures: Array<AnySignature>;
    readonly signatures_bitmap: Uint8Array;
    constructor(public_keys: MultiKey, signatures: Array<AnySignature>, signatures_bitmap: Uint8Array);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): AccountAuthenticatorMultiKey;
}

export { AccountAuthenticator, AccountAuthenticatorEd25519, AccountAuthenticatorMultiEd25519, AccountAuthenticatorMultiKey, AccountAuthenticatorSingleKey };
