import { Account } from './account.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { Coin } from './coin.mjs';
import { DigitalAsset } from './digitalAsset.mjs';
import { Event } from './event.mjs';
import { Faucet } from './faucet.mjs';
import { FungibleAsset } from './fungibleAsset.mjs';
import { General } from './general.mjs';
import { ANS } from './ans.mjs';
import { Staking } from './staking.mjs';
import { Transaction } from './transaction.mjs';
import { TransactionSubmission } from './transactionSubmission.mjs';
import { Build } from './transactionSubmission/build.mjs';
import { Sign } from './transactionSubmission/sign.mjs';
import { Simulate } from './transactionSubmission/simulate.mjs';
import { Submit } from './transactionSubmission/submit.mjs';
import '../core/account.mjs';
import '../core/accountAddress.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../types/index.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../core/authenticationKey.mjs';
import '../core/crypto/asymmetricCrypto.mjs';
import '../utils/const.mjs';
import '../transactions/types.mjs';
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
import '../internal/digitalAsset.mjs';
import '../internal/ans.mjs';

/**
 * This class is the main entry point into Aptos's
 * APIs and separates functionality into different namespaces.
 *
 * To use the SDK, create a new Aptos instance to get access
 * to all the sdk functionality.
 */
declare class Aptos {
    readonly config: AptosConfig;
    readonly account: Account;
    readonly ans: ANS;
    readonly coin: Coin;
    readonly digitalAsset: DigitalAsset;
    readonly event: Event;
    readonly faucet: Faucet;
    readonly fungibleAsset: FungibleAsset;
    readonly general: General;
    readonly staking: Staking;
    readonly transaction: Transaction;
    readonly transactionSubmission: TransactionSubmission;
    readonly build: Build;
    readonly sign: Sign;
    readonly simulate: Simulate;
    readonly submit: Submit;
    constructor(settings?: AptosConfig);
}
interface Aptos extends Account, Coin, DigitalAsset, Event, Faucet, FungibleAsset, General, Staking, Transaction, ANS, TransactionSubmission {
}

export { Aptos };
