/**
 * Type of API endpoint for request routing
 */
declare enum AptosApiType {
    FULLNODE = 0,
    INDEXER = 1,
    FAUCET = 2
}
declare const DEFAULT_NETWORK = Network.DEVNET;
/**
 * The default max gas amount when none is given.
 *
 * This is the maximum number of gas units that will be used by a transaction before being rejected.
 *
 * Note that max gas amount varies based on the transaction.  A larger transaction will go over this
 * default gas amount, and the value will need to be changed for the specific transaction.
 */
declare const DEFAULT_MAX_GAS_AMOUNT = 200000;
/**
 * The default transaction expiration seconds from now.
 *
 * This time is how long until the blockchain nodes will reject the transaction.
 *
 * Note that the transaction expiration time varies based on network connection and network load.  It may need to be
 * increased for the transaction to be processed.
 */
declare const DEFAULT_TXN_EXP_SEC_FROM_NOW = 20;
/**
 * The default number of seconds to wait for a transaction to be processed.
 *
 * This time is the amount of time that the SDK will wait for a transaction to be processed when waiting for
 * the results of the transaction.  It may take longer based on network connection and network load.
 */
declare const DEFAULT_TXN_TIMEOUT_SEC = 20;
/**
 * The default gas currency for the network.
 */
declare const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
declare const RAW_TRANSACTION_SALT = "APTOS::RawTransaction";
declare const RAW_TRANSACTION_WITH_DATA_SALT = "APTOS::RawTransactionWithData";
/**
 * The list of supported Processor types for our indexer api.
 *
 * These can be found from the processor_status table in the indexer database.
 * {@link https://cloud.hasura.io/public/graphiql?endpoint=https://indexer.mainnet.aptoslabs.com/v1/graphql}
 */
declare enum ProcessorType {
    ACCOUNT_TRANSACTION_PROCESSOR = "account_transactions_processor",
    COIN_PROCESSOR = "coin_processor",
    DEFAULT = "default_processor",
    EVENTS_PROCESSOR = "events_processor",
    FUNGIBLE_ASSET_PROCESSOR = "fungible_asset_processor",
    STAKE_PROCESSOR = "stake_processor",
    TOKEN_PROCESSOR = "token_processor",
    TOKEN_V2_PROCESSOR = "token_v2_processor",
    USER_TRANSACTION_PROCESSOR = "user_transaction_processor"
}

export { APTOS_COIN, AptosApiType, DEFAULT_MAX_GAS_AMOUNT, DEFAULT_NETWORK, DEFAULT_TXN_EXP_SEC_FROM_NOW, DEFAULT_TXN_TIMEOUT_SEC, ProcessorType, RAW_TRANSACTION_SALT, RAW_TRANSACTION_WITH_DATA_SALT };
