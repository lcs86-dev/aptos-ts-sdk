import { AptosConfig } from './aptosConfig.mjs';
import { PaginationArgs, TransactionResponse, AnyNumber, HexInput, WaitForTransactionOptions, CommittedTransactionResponse, GasEstimation } from '../types/index.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

declare class Transaction {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Queries on-chain transactions. This function will not return pending
     * transactions. For that, use `getTransactionsByHash`.
     *
     * @param args.options.offset The number transaction to start with
     * @param args.options.limit Number of results to return
     *
     * @returns Array of on-chain transactions
     */
    getTransactions(args?: {
        options?: PaginationArgs;
    }): Promise<TransactionResponse[]>;
    /**
     * Queries on-chain transaction by version. This function will not return pending transactions.
     *
     * @param args.ledgerVersion - Transaction version is an unsigned 64-bit number.
     * @returns On-chain transaction. Only on-chain transactions have versions, so this
     * function cannot be used to query pending transactions.
     */
    getTransactionByVersion(args: {
        ledgerVersion: AnyNumber;
    }): Promise<TransactionResponse>;
    /**
     * Queries on-chain transaction by transaction hash. This function will return pending transactions.
     * @param args.transactionHash - Transaction hash should be hex-encoded bytes string with 0x prefix.
     * @returns Transaction from mempool (pending) or on-chain (committed) transaction
     */
    getTransactionByHash(args: {
        transactionHash: HexInput;
    }): Promise<TransactionResponse>;
    /**
     * Defines if specified transaction is currently in pending state
     *
     * To create a transaction hash:
     *
     * 1. Create a hash message from the bytes: "Aptos::Transaction" bytes + the BCS-serialized Transaction bytes.
     * 2. Apply hash algorithm SHA3-256 to the hash message bytes.
     * 3. Hex-encode the hash bytes with 0x prefix.
     *
     * @param args.transactionHash A hash of transaction
     * @returns `true` if transaction is in pending state and `false` otherwise
     */
    isPendingTransaction(args: {
        transactionHash: HexInput;
    }): Promise<boolean>;
    /**
     * Waits for a transaction to move past the pending state.
     *
     * There are 4 cases.
     * 1. Transaction is successfully processed and committed to the chain.
     *    - The function will resolve with the transaction response from the API.
     * 2. Transaction is rejected for some reason, and is therefore not committed to the blockchain.
     *    - The function will throw an AptosApiError with an HTTP status code indicating some problem with the request.
     * 3. Transaction is committed but execution failed, meaning no changes were
     *    written to the blockchain state.
     *    - If `checkSuccess` is true, the function will throw a FailedTransactionError
     *      If `checkSuccess` is false, the function will resolve with the transaction response where the `success` field is false.
     * 4. Transaction does not move past the pending state within `args.options.timeoutSecs` seconds.
     *    - The function will throw a WaitForTransactionError
     *
     *
     * @param args.transactionHash The hash of a transaction previously submitted to the blockchain.
     * @param args.options.timeoutSecs Timeout in seconds. Defaults to 20 seconds.
     * @param args.options.checkSuccess A boolean which controls whether the function will error if the transaction failed.
     *   Defaults to true.  See case 3 above.
     * @returns The transaction on-chain.  See above for more details.
     */
    waitForTransaction(args: {
        transactionHash: HexInput;
        options?: WaitForTransactionOptions;
    }): Promise<CommittedTransactionResponse>;
    /**
     * Gives an estimate of the gas unit price required to get a
     * transaction on chain in a reasonable amount of time.
     * For more information {@link https://fullnode.mainnet.aptoslabs.com/v1/spec#/operations/estimate_gas_price}
     *
     * @returns Object holding the outputs of the estimate gas API
     * @example
     * ```
     * {
     *  gas_estimate: number;
     *  deprioritized_gas_estimate?: number;
     *  prioritized_gas_estimate?: number;
     * }
     * ```
     */
    getGasPriceEstimation(): Promise<GasEstimation>;
}

export { Transaction };