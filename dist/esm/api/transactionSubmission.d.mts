import { AptosConfig } from './aptosConfig.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { PrivateKey } from '../core/crypto/asymmetricCrypto.mjs';
import { PendingTransactionResponse, HexInput, TransactionResponse } from '../types/index.mjs';
import { AnyRawTransaction, InputGenerateTransactionOptions, SingleSignerTransaction } from '../transactions/types.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../core/authenticationKey.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/serializer.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
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

declare class TransactionSubmission {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Sign and submit a single signer transaction to chain
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
     * @return PendingTransactionResponse
     */
    signAndSubmitTransaction(args: {
        signer: Account;
        transaction: AnyRawTransaction;
    }): Promise<PendingTransactionResponse>;
    /**
     * Generates a transaction to publish a move package to chain.
     *
     * To get the `metadataBytes` and `byteCode`, can compile using Aptos CLI with command
     * `aptos move compile --save-metadata ...`,
     * For more info {@link https://aptos.dev/tutorials/your-first-dapp/#step-4-publish-a-move-module}
     *
     * @param args.account The publisher account
     * @param args.metadataBytes The package metadata bytes
     * @param args.moduleBytecode An array of the bytecode of each module in the package in compiler output order
     *
     * @returns A SingleSignerTransaction that can be simulated or submitted to chain
     */
    publishPackageTransaction(args: {
        account: AccountAddressInput;
        metadataBytes: HexInput;
        moduleBytecode: Array<HexInput>;
        options?: InputGenerateTransactionOptions;
    }): Promise<SingleSignerTransaction>;
    /**
     * Rotate an account's auth key. After rotation, only the new private key can be used to sign txns for
     * the account.
     * Note: Only legacy Ed25519 scheme is supported for now.
     * More info: {@link https://aptos.dev/guides/account-management/key-rotation/}
     * @param args.fromAccount The account to rotate the auth key for
     * @param args.toNewPrivateKey The new private key to rotate to
     *
     * @returns PendingTransactionResponse
     */
    rotateAuthKey(args: {
        fromAccount: Account;
        toNewPrivateKey: PrivateKey;
    }): Promise<TransactionResponse>;
}

export { TransactionSubmission };
