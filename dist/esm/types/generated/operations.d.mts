import { Exact, InputMaybe, Scalars, CurrentFungibleAssetBalancesBoolExp, CurrentFungibleAssetBalancesOrderBy, CurrentCollectionOwnershipV2ViewBoolExp, CurrentCollectionOwnershipV2ViewOrderBy, CurrentObjectsBoolExp, CurrentObjectsOrderBy, CurrentTokenOwnershipsV2BoolExp, CurrentTokenOwnershipsV2OrderBy, CurrentCollectionsV2BoolExp, EventsBoolExp, EventsOrderBy, FungibleAssetActivitiesBoolExp, FungibleAssetMetadataBoolExp, CurrentAptosNamesBoolExp, CurrentAptosNamesOrderBy, NumActiveDelegatorPerPoolBoolExp, NumActiveDelegatorPerPoolOrderBy, ProcessorStatusBoolExp, TokenActivitiesV2BoolExp, TokenActivitiesV2OrderBy, CurrentTokenDatasV2BoolExp, CurrentTokenDatasV2OrderBy } from './types.mjs';

type TokenActivitiesFieldsFragment = {
    after_value?: string | null;
    before_value?: string | null;
    entry_function_id_str?: string | null;
    event_account_address: string;
    event_index: any;
    from_address?: string | null;
    is_fungible_v2?: boolean | null;
    property_version_v1: any;
    to_address?: string | null;
    token_amount: any;
    token_data_id: string;
    token_standard: string;
    transaction_timestamp: any;
    transaction_version: any;
    type: string;
};
type AnsTokenFragmentFragment = {
    domain?: string | null;
    expiration_timestamp?: any | null;
    registered_address?: string | null;
    subdomain?: string | null;
    token_standard?: string | null;
    is_primary?: boolean | null;
    owner_address?: string | null;
};
type CurrentTokenOwnershipFieldsFragment = {
    token_standard: string;
    token_properties_mutated_v1?: any | null;
    token_data_id: string;
    table_type_v1?: string | null;
    storage_id: string;
    property_version_v1: any;
    owner_address: string;
    last_transaction_version: any;
    last_transaction_timestamp: any;
    is_soulbound_v2?: boolean | null;
    is_fungible_v2?: boolean | null;
    amount: any;
    current_token_data?: {
        collection_id: string;
        description: string;
        is_fungible_v2?: boolean | null;
        largest_property_version_v1?: any | null;
        last_transaction_timestamp: any;
        last_transaction_version: any;
        maximum?: any | null;
        supply: any;
        token_data_id: string;
        token_name: string;
        token_properties: any;
        token_standard: string;
        token_uri: string;
        current_collection?: {
            collection_id: string;
            collection_name: string;
            creator_address: string;
            current_supply: any;
            description: string;
            last_transaction_timestamp: any;
            last_transaction_version: any;
            max_supply?: any | null;
            mutable_description?: boolean | null;
            mutable_uri?: boolean | null;
            table_handle_v1?: string | null;
            token_standard: string;
            total_minted_v2?: any | null;
            uri: string;
        } | null;
    } | null;
};
type GetAccountCoinsCountQueryVariables = Exact<{
    address?: InputMaybe<Scalars["String"]["input"]>;
}>;
type GetAccountCoinsCountQuery = {
    current_fungible_asset_balances_aggregate: {
        aggregate?: {
            count: number;
        } | null;
    };
};
type GetAccountCoinsDataQueryVariables = Exact<{
    where_condition: CurrentFungibleAssetBalancesBoolExp;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<CurrentFungibleAssetBalancesOrderBy> | CurrentFungibleAssetBalancesOrderBy>;
}>;
type GetAccountCoinsDataQuery = {
    current_fungible_asset_balances: Array<{
        amount: any;
        asset_type: string;
        is_frozen: boolean;
        is_primary: boolean;
        last_transaction_timestamp: any;
        last_transaction_version: any;
        owner_address: string;
        storage_id: string;
        token_standard: string;
        metadata?: {
            token_standard: string;
            symbol: string;
            supply_aggregator_table_key_v1?: string | null;
            supply_aggregator_table_handle_v1?: string | null;
            project_uri?: string | null;
            name: string;
            last_transaction_version: any;
            last_transaction_timestamp: any;
            icon_uri?: string | null;
            decimals: number;
            creator_address: string;
            asset_type: string;
        } | null;
    }>;
};
type GetAccountCollectionsWithOwnedTokensQueryVariables = Exact<{
    where_condition: CurrentCollectionOwnershipV2ViewBoolExp;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<CurrentCollectionOwnershipV2ViewOrderBy> | CurrentCollectionOwnershipV2ViewOrderBy>;
}>;
type GetAccountCollectionsWithOwnedTokensQuery = {
    current_collection_ownership_v2_view: Array<{
        collection_id?: string | null;
        collection_name?: string | null;
        collection_uri?: string | null;
        creator_address?: string | null;
        distinct_tokens?: any | null;
        last_transaction_version?: any | null;
        owner_address?: string | null;
        single_token_uri?: string | null;
        current_collection?: {
            collection_id: string;
            collection_name: string;
            creator_address: string;
            current_supply: any;
            description: string;
            last_transaction_timestamp: any;
            last_transaction_version: any;
            mutable_description?: boolean | null;
            max_supply?: any | null;
            mutable_uri?: boolean | null;
            table_handle_v1?: string | null;
            token_standard: string;
            total_minted_v2?: any | null;
            uri: string;
        } | null;
    }>;
};
type GetAccountOwnedObjectsQueryVariables = Exact<{
    where_condition?: InputMaybe<CurrentObjectsBoolExp>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<CurrentObjectsOrderBy> | CurrentObjectsOrderBy>;
}>;
type GetAccountOwnedObjectsQuery = {
    current_objects: Array<{
        allow_ungated_transfer: boolean;
        state_key_hash: string;
        owner_address: string;
        object_address: string;
        last_transaction_version: any;
        last_guid_creation_num: any;
        is_deleted: boolean;
    }>;
};
type GetAccountOwnedTokensQueryVariables = Exact<{
    where_condition: CurrentTokenOwnershipsV2BoolExp;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<CurrentTokenOwnershipsV2OrderBy> | CurrentTokenOwnershipsV2OrderBy>;
}>;
type GetAccountOwnedTokensQuery = {
    current_token_ownerships_v2: Array<{
        token_standard: string;
        token_properties_mutated_v1?: any | null;
        token_data_id: string;
        table_type_v1?: string | null;
        storage_id: string;
        property_version_v1: any;
        owner_address: string;
        last_transaction_version: any;
        last_transaction_timestamp: any;
        is_soulbound_v2?: boolean | null;
        is_fungible_v2?: boolean | null;
        amount: any;
        current_token_data?: {
            collection_id: string;
            description: string;
            is_fungible_v2?: boolean | null;
            largest_property_version_v1?: any | null;
            last_transaction_timestamp: any;
            last_transaction_version: any;
            maximum?: any | null;
            supply: any;
            token_data_id: string;
            token_name: string;
            token_properties: any;
            token_standard: string;
            token_uri: string;
            current_collection?: {
                collection_id: string;
                collection_name: string;
                creator_address: string;
                current_supply: any;
                description: string;
                last_transaction_timestamp: any;
                last_transaction_version: any;
                max_supply?: any | null;
                mutable_description?: boolean | null;
                mutable_uri?: boolean | null;
                table_handle_v1?: string | null;
                token_standard: string;
                total_minted_v2?: any | null;
                uri: string;
            } | null;
        } | null;
    }>;
};
type GetAccountOwnedTokensByTokenDataQueryVariables = Exact<{
    where_condition: CurrentTokenOwnershipsV2BoolExp;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<CurrentTokenOwnershipsV2OrderBy> | CurrentTokenOwnershipsV2OrderBy>;
}>;
type GetAccountOwnedTokensByTokenDataQuery = {
    current_token_ownerships_v2: Array<{
        token_standard: string;
        token_properties_mutated_v1?: any | null;
        token_data_id: string;
        table_type_v1?: string | null;
        storage_id: string;
        property_version_v1: any;
        owner_address: string;
        last_transaction_version: any;
        last_transaction_timestamp: any;
        is_soulbound_v2?: boolean | null;
        is_fungible_v2?: boolean | null;
        amount: any;
        current_token_data?: {
            collection_id: string;
            description: string;
            is_fungible_v2?: boolean | null;
            largest_property_version_v1?: any | null;
            last_transaction_timestamp: any;
            last_transaction_version: any;
            maximum?: any | null;
            supply: any;
            token_data_id: string;
            token_name: string;
            token_properties: any;
            token_standard: string;
            token_uri: string;
            current_collection?: {
                collection_id: string;
                collection_name: string;
                creator_address: string;
                current_supply: any;
                description: string;
                last_transaction_timestamp: any;
                last_transaction_version: any;
                max_supply?: any | null;
                mutable_description?: boolean | null;
                mutable_uri?: boolean | null;
                table_handle_v1?: string | null;
                token_standard: string;
                total_minted_v2?: any | null;
                uri: string;
            } | null;
        } | null;
    }>;
};
type GetAccountOwnedTokensFromCollectionQueryVariables = Exact<{
    where_condition: CurrentTokenOwnershipsV2BoolExp;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<CurrentTokenOwnershipsV2OrderBy> | CurrentTokenOwnershipsV2OrderBy>;
}>;
type GetAccountOwnedTokensFromCollectionQuery = {
    current_token_ownerships_v2: Array<{
        token_standard: string;
        token_properties_mutated_v1?: any | null;
        token_data_id: string;
        table_type_v1?: string | null;
        storage_id: string;
        property_version_v1: any;
        owner_address: string;
        last_transaction_version: any;
        last_transaction_timestamp: any;
        is_soulbound_v2?: boolean | null;
        is_fungible_v2?: boolean | null;
        amount: any;
        current_token_data?: {
            collection_id: string;
            description: string;
            is_fungible_v2?: boolean | null;
            largest_property_version_v1?: any | null;
            last_transaction_timestamp: any;
            last_transaction_version: any;
            maximum?: any | null;
            supply: any;
            token_data_id: string;
            token_name: string;
            token_properties: any;
            token_standard: string;
            token_uri: string;
            current_collection?: {
                collection_id: string;
                collection_name: string;
                creator_address: string;
                current_supply: any;
                description: string;
                last_transaction_timestamp: any;
                last_transaction_version: any;
                max_supply?: any | null;
                mutable_description?: boolean | null;
                mutable_uri?: boolean | null;
                table_handle_v1?: string | null;
                token_standard: string;
                total_minted_v2?: any | null;
                uri: string;
            } | null;
        } | null;
    }>;
};
type GetAccountTokensCountQueryVariables = Exact<{
    where_condition?: InputMaybe<CurrentTokenOwnershipsV2BoolExp>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;
type GetAccountTokensCountQuery = {
    current_token_ownerships_v2_aggregate: {
        aggregate?: {
            count: number;
        } | null;
    };
};
type GetAccountTransactionsCountQueryVariables = Exact<{
    address?: InputMaybe<Scalars["String"]["input"]>;
}>;
type GetAccountTransactionsCountQuery = {
    account_transactions_aggregate: {
        aggregate?: {
            count: number;
        } | null;
    };
};
type GetChainTopUserTransactionsQueryVariables = Exact<{
    limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;
type GetChainTopUserTransactionsQuery = {
    user_transactions: Array<{
        version: any;
    }>;
};
type GetCollectionDataQueryVariables = Exact<{
    where_condition: CurrentCollectionsV2BoolExp;
}>;
type GetCollectionDataQuery = {
    current_collections_v2: Array<{
        collection_id: string;
        collection_name: string;
        creator_address: string;
        current_supply: any;
        description: string;
        last_transaction_timestamp: any;
        last_transaction_version: any;
        max_supply?: any | null;
        mutable_description?: boolean | null;
        mutable_uri?: boolean | null;
        table_handle_v1?: string | null;
        token_standard: string;
        total_minted_v2?: any | null;
        uri: string;
    }>;
};
type GetCurrentFungibleAssetBalancesQueryVariables = Exact<{
    where_condition?: InputMaybe<CurrentFungibleAssetBalancesBoolExp>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;
type GetCurrentFungibleAssetBalancesQuery = {
    current_fungible_asset_balances: Array<{
        amount: any;
        asset_type: string;
        is_frozen: boolean;
        is_primary: boolean;
        last_transaction_timestamp: any;
        last_transaction_version: any;
        owner_address: string;
        storage_id: string;
        token_standard: string;
    }>;
};
type GetDelegatedStakingActivitiesQueryVariables = Exact<{
    delegatorAddress?: InputMaybe<Scalars["String"]["input"]>;
    poolAddress?: InputMaybe<Scalars["String"]["input"]>;
}>;
type GetDelegatedStakingActivitiesQuery = {
    delegated_staking_activities: Array<{
        amount: any;
        delegator_address: string;
        event_index: any;
        event_type: string;
        pool_address: string;
        transaction_version: any;
    }>;
};
type GetEventsQueryVariables = Exact<{
    where_condition?: InputMaybe<EventsBoolExp>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<EventsOrderBy> | EventsOrderBy>;
}>;
type GetEventsQuery = {
    events: Array<{
        account_address: string;
        creation_number: any;
        data: any;
        event_index: any;
        sequence_number: any;
        transaction_block_height: any;
        transaction_version: any;
        type: string;
        indexed_type: string;
    }>;
};
type GetFungibleAssetActivitiesQueryVariables = Exact<{
    where_condition?: InputMaybe<FungibleAssetActivitiesBoolExp>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;
type GetFungibleAssetActivitiesQuery = {
    fungible_asset_activities: Array<{
        amount?: any | null;
        asset_type: string;
        block_height: any;
        entry_function_id_str?: string | null;
        event_index: any;
        gas_fee_payer_address?: string | null;
        is_frozen?: boolean | null;
        is_gas_fee: boolean;
        is_transaction_success: boolean;
        owner_address: string;
        storage_id: string;
        storage_refund_amount: any;
        token_standard: string;
        transaction_timestamp: any;
        transaction_version: any;
        type: string;
    }>;
};
type GetFungibleAssetMetadataQueryVariables = Exact<{
    where_condition?: InputMaybe<FungibleAssetMetadataBoolExp>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;
type GetFungibleAssetMetadataQuery = {
    fungible_asset_metadata: Array<{
        icon_uri?: string | null;
        project_uri?: string | null;
        supply_aggregator_table_handle_v1?: string | null;
        supply_aggregator_table_key_v1?: string | null;
        creator_address: string;
        asset_type: string;
        decimals: number;
        last_transaction_timestamp: any;
        last_transaction_version: any;
        name: string;
        symbol: string;
        token_standard: string;
    }>;
};
type GetNamesQueryVariables = Exact<{
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    where_condition?: InputMaybe<CurrentAptosNamesBoolExp>;
    order_by?: InputMaybe<Array<CurrentAptosNamesOrderBy> | CurrentAptosNamesOrderBy>;
}>;
type GetNamesQuery = {
    current_aptos_names: Array<{
        domain?: string | null;
        expiration_timestamp?: any | null;
        registered_address?: string | null;
        subdomain?: string | null;
        token_standard?: string | null;
        is_primary?: boolean | null;
        owner_address?: string | null;
    }>;
};
type GetNumberOfDelegatorsQueryVariables = Exact<{
    where_condition?: InputMaybe<NumActiveDelegatorPerPoolBoolExp>;
    order_by?: InputMaybe<Array<NumActiveDelegatorPerPoolOrderBy> | NumActiveDelegatorPerPoolOrderBy>;
}>;
type GetNumberOfDelegatorsQuery = {
    num_active_delegator_per_pool: Array<{
        num_active_delegator?: any | null;
        pool_address?: string | null;
    }>;
};
type GetProcessorStatusQueryVariables = Exact<{
    where_condition?: InputMaybe<ProcessorStatusBoolExp>;
}>;
type GetProcessorStatusQuery = {
    processor_status: Array<{
        last_success_version: any;
        processor: string;
        last_updated: any;
    }>;
};
type GetTokenActivityQueryVariables = Exact<{
    where_condition: TokenActivitiesV2BoolExp;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<TokenActivitiesV2OrderBy> | TokenActivitiesV2OrderBy>;
}>;
type GetTokenActivityQuery = {
    token_activities_v2: Array<{
        after_value?: string | null;
        before_value?: string | null;
        entry_function_id_str?: string | null;
        event_account_address: string;
        event_index: any;
        from_address?: string | null;
        is_fungible_v2?: boolean | null;
        property_version_v1: any;
        to_address?: string | null;
        token_amount: any;
        token_data_id: string;
        token_standard: string;
        transaction_timestamp: any;
        transaction_version: any;
        type: string;
    }>;
};
type GetCurrentTokenOwnershipQueryVariables = Exact<{
    where_condition: CurrentTokenOwnershipsV2BoolExp;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<CurrentTokenOwnershipsV2OrderBy> | CurrentTokenOwnershipsV2OrderBy>;
}>;
type GetCurrentTokenOwnershipQuery = {
    current_token_ownerships_v2: Array<{
        token_standard: string;
        token_properties_mutated_v1?: any | null;
        token_data_id: string;
        table_type_v1?: string | null;
        storage_id: string;
        property_version_v1: any;
        owner_address: string;
        last_transaction_version: any;
        last_transaction_timestamp: any;
        is_soulbound_v2?: boolean | null;
        is_fungible_v2?: boolean | null;
        amount: any;
        current_token_data?: {
            collection_id: string;
            description: string;
            is_fungible_v2?: boolean | null;
            largest_property_version_v1?: any | null;
            last_transaction_timestamp: any;
            last_transaction_version: any;
            maximum?: any | null;
            supply: any;
            token_data_id: string;
            token_name: string;
            token_properties: any;
            token_standard: string;
            token_uri: string;
            current_collection?: {
                collection_id: string;
                collection_name: string;
                creator_address: string;
                current_supply: any;
                description: string;
                last_transaction_timestamp: any;
                last_transaction_version: any;
                max_supply?: any | null;
                mutable_description?: boolean | null;
                mutable_uri?: boolean | null;
                table_handle_v1?: string | null;
                token_standard: string;
                total_minted_v2?: any | null;
                uri: string;
            } | null;
        } | null;
    }>;
};
type GetTokenDataQueryVariables = Exact<{
    where_condition?: InputMaybe<CurrentTokenDatasV2BoolExp>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    order_by?: InputMaybe<Array<CurrentTokenDatasV2OrderBy> | CurrentTokenDatasV2OrderBy>;
}>;
type GetTokenDataQuery = {
    current_token_datas_v2: Array<{
        collection_id: string;
        description: string;
        is_fungible_v2?: boolean | null;
        largest_property_version_v1?: any | null;
        last_transaction_timestamp: any;
        last_transaction_version: any;
        maximum?: any | null;
        supply: any;
        token_data_id: string;
        token_name: string;
        token_properties: any;
        token_standard: string;
        token_uri: string;
        current_collection?: {
            collection_id: string;
            collection_name: string;
            creator_address: string;
            current_supply: any;
            description: string;
            last_transaction_timestamp: any;
            last_transaction_version: any;
            max_supply?: any | null;
            mutable_description?: boolean | null;
            mutable_uri?: boolean | null;
            table_handle_v1?: string | null;
            token_standard: string;
            total_minted_v2?: any | null;
            uri: string;
        } | null;
    }>;
};

export { AnsTokenFragmentFragment, CurrentTokenOwnershipFieldsFragment, GetAccountCoinsCountQuery, GetAccountCoinsCountQueryVariables, GetAccountCoinsDataQuery, GetAccountCoinsDataQueryVariables, GetAccountCollectionsWithOwnedTokensQuery, GetAccountCollectionsWithOwnedTokensQueryVariables, GetAccountOwnedObjectsQuery, GetAccountOwnedObjectsQueryVariables, GetAccountOwnedTokensByTokenDataQuery, GetAccountOwnedTokensByTokenDataQueryVariables, GetAccountOwnedTokensFromCollectionQuery, GetAccountOwnedTokensFromCollectionQueryVariables, GetAccountOwnedTokensQuery, GetAccountOwnedTokensQueryVariables, GetAccountTokensCountQuery, GetAccountTokensCountQueryVariables, GetAccountTransactionsCountQuery, GetAccountTransactionsCountQueryVariables, GetChainTopUserTransactionsQuery, GetChainTopUserTransactionsQueryVariables, GetCollectionDataQuery, GetCollectionDataQueryVariables, GetCurrentFungibleAssetBalancesQuery, GetCurrentFungibleAssetBalancesQueryVariables, GetCurrentTokenOwnershipQuery, GetCurrentTokenOwnershipQueryVariables, GetDelegatedStakingActivitiesQuery, GetDelegatedStakingActivitiesQueryVariables, GetEventsQuery, GetEventsQueryVariables, GetFungibleAssetActivitiesQuery, GetFungibleAssetActivitiesQueryVariables, GetFungibleAssetMetadataQuery, GetFungibleAssetMetadataQueryVariables, GetNamesQuery, GetNamesQueryVariables, GetNumberOfDelegatorsQuery, GetNumberOfDelegatorsQueryVariables, GetProcessorStatusQuery, GetProcessorStatusQueryVariables, GetTokenActivityQuery, GetTokenActivityQueryVariables, GetTokenDataQuery, GetTokenDataQueryVariables, TokenActivitiesFieldsFragment };
