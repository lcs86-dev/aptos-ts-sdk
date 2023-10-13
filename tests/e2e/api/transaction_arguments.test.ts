// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import { Account, AptosConfig, Network, Aptos, AccountAddress } from "../../../src";
import {
  MAX_U128_BIG_INT,
  MAX_U16_NUMBER,
  MAX_U256_BIG_INT,
  MAX_U32_NUMBER,
  MAX_U64_BIG_INT,
  MAX_U8_NUMBER,
} from "../../../src/bcs/consts";
import { Bool, U128, U16, U256, U32, U64, U8 } from "../../../src/bcs/serializable/move-primitives";
import { MoveObject, MoveOption, MoveString, MoveVector } from "../../../src/bcs/serializable/move-structs";
import { TypeTag } from "../../../src/transactions/typeTag/typeTag";
import { EntryFunctionArgumentTypes } from "../../../src/transactions/types";
import {
  SigningScheme,
  TransactionFeePayerSignature,
  TransactionMultiAgentSignature,
  UserTransactionResponse,
} from "../../../src/types";

jest.setTimeout(30000);

// This test looks enormous, but the breakdown is quite simple:
//  the `transactionArguments` array contains every possible argument type
//  the `rawTxnHelper` and `rawTxnMultiAgentHelper` functions are helpers to generate the transactions,
//    respectively for single signer transactions and for (multi signer & fee payer) transactions
// the `describe` blocks are just to group the tests by the type of transaction
// In any transaction with a `&signer` the move function asserts that the first argument is the sender's address: `sender_address: address`
//   or all of the `&signer` addresses: `signer_addresses: vector<address>`
// At the end of

describe("various transaction arguments", () => {
  let aptos: Aptos;
  let account1: Account;
  let account2: Account;
  let account3: Account;
  let account4: Account;
  let account5: Account;
  let accountFeePayer: Account;
  const moduleObjects: Array<MoveObject> = [];
  let transactionArguments: EntryFunctionArgumentTypes[];
  let rawTxnHelper: (...args: any[]) => Promise<UserTransactionResponse>;
  let rawTxnMultiAgentHelper: (...args: any[]) => Promise<UserTransactionResponse>;

  beforeAll(async () => {
    const config = new AptosConfig({ network: Network.LOCAL });
    aptos = new Aptos(config);
    // const account1 = Account.fromPrivateKey({
    //   privateKey: new Ed25519PrivateKey({
    //     hexInput: "0x5aba8dab1c523be32bd4dafe2cc612f7f8050ce42a3322b60216ef67dc97768c",
    //   }),
    // });
    account1 = Account.generate({
      scheme: SigningScheme.Ed25519,
    });
    account2 = Account.generate({
      scheme: SigningScheme.Ed25519,
    });
    account3 = Account.generate({
      scheme: SigningScheme.Ed25519,
    });
    account4 = Account.generate({
      scheme: SigningScheme.Ed25519,
    });
    account5 = Account.generate({
      scheme: SigningScheme.Ed25519,
    });
    accountFeePayer = Account.generate({
      scheme: SigningScheme.Ed25519,
    });
    const accounts = [account1, account2, account3, account4, account5, accountFeePayer];
    for (const account of accounts) {
      await aptos.fundAccount({
        accountAddress: account.accountAddress.data,
        amount: 100_000_000,
      });
    }
    const metadata = MoveVector.U8(contractMetadata);
    const code = new MoveVector([MoveVector.U8(contractBytecode(account1.accountAddress))]);

    // create the publish package txn
    const rawTxn = await aptos.generateTransaction({
      sender: account1.accountAddress.toString(),
      data: {
        function: "0x1::code::publish_package_txn",
        type_arguments: [],
        arguments: [metadata, code],
      },
    });
    const signedTxn = await aptos.signTransaction({
      signer: account1,
      transaction: rawTxn,
    });
    const txnHash = await aptos.submitTransaction({
      transaction: rawTxn,
      senderAuthenticator: signedTxn,
    });
    const _ = await aptos.waitForTransaction({
      txnHash: txnHash.hash,
    });

    // when deploying, `init_module` creates 3 objects and stores them into the `SetupData` resource
    // within that resource is 3 fields: `empty_object_1`, `empty_object_2`, `empty_object_3`
    // we need to extract those objects and use them as arguments for the entry functions
    const accountResources = await aptos.getAccountResources({
      accountAddress: account1.accountAddress.toString(),
    });

    accountResources.forEach((resource) => {
      const data = resource.data as any;
      if (data.empty_object_1 !== undefined) {
        moduleObjects.push(new MoveObject(data.empty_object_1.inner));
        moduleObjects.push(new MoveObject(data.empty_object_2.inner));
        moduleObjects.push(new MoveObject(data.empty_object_3.inner));
      }
    });

    // Transaction builder helpers
    // single signer
    rawTxnHelper = async (
      sender: Account,
      functionName: string,
      typeArgs: TypeTag[],
      args: Array<EntryFunctionArgumentTypes>,
    ): Promise<UserTransactionResponse> => {
      const rawTxn = await aptos.generateTransaction({
        sender: sender.accountAddress.toString(),
        data: {
          function: `0x${account1.accountAddress.toStringWithoutPrefix()}::tx_args_module::${functionName}`,
          type_arguments: typeArgs,
          arguments: args,
        },
      });
      const signedTxn = await aptos.signTransaction({
        signer: sender,
        transaction: rawTxn,
      });
      const txnHash = await aptos.submitTransaction({
        transaction: rawTxn,
        senderAuthenticator: signedTxn,
      });
      const response = await aptos.waitForTransaction({
        txnHash: txnHash.hash,
      });
      return response as UserTransactionResponse;
    };

    // multi agent/fee payer
    rawTxnMultiAgentHelper = async (
      sender: Account,
      functionName: string,
      typeArgs: TypeTag[],
      args: Array<EntryFunctionArgumentTypes>,
      secondarySignerAddresses: AccountAddress[],
      feePayerAddress?: AccountAddress,
    ): Promise<UserTransactionResponse> => {
      const transaction = await (async () => {
        if (secondarySignerAddresses.length == 0) {
          const response = await aptos.generateTransaction({
            sender: sender.accountAddress.toString(),
            data: {
              function: `0x${account1.accountAddress.toStringWithoutPrefix()}::tx_args_module::${functionName}`,
              type_arguments: typeArgs,
              arguments: args,
            },
            feePayerAddress: feePayerAddress!.data,
          });
          return response;
        } else {
          return await aptos.generateTransaction({
            sender: sender.accountAddress.toString(),
            data: {
              function: `0x${account1.accountAddress.toStringWithoutPrefix()}::tx_args_module::${functionName}`,
              type_arguments: typeArgs,
              arguments: args,
            },
            secondarySignerAddresses: secondarySignerAddresses.map((address) => address.data),
          });
        }
      })();

      const accounts = [sender, account2, account3, account4, account5];
      // sign if it's in secondarySignerAddresses OR if it's the sender
      // TODO: Fix the ugly
      const authenticators = accounts
        .filter(
          (account) =>
            secondarySignerAddresses.map((a) => a.toString()).includes(account.accountAddress.toString()) ||
            account.accountAddress == sender.accountAddress,
        )
        .map((account) => {
          return aptos.signTransaction({
            signer: account,
            transaction: transaction,
          });
        });

      const feePayerAuthenticator = feePayerAddress
        ? aptos.signTransaction({
            signer: accountFeePayer,
            transaction: transaction,
          })
        : undefined;

      const txnHash = await aptos.submitTransaction({
        transaction: transaction,
        senderAuthenticator: authenticators[0],
        secondarySignerAuthenticators: {
          additionalSignersAuthenticators: authenticators.slice(1),
          feePayerAuthenticator,
        },
      });

      const response = await aptos.waitForTransaction({
        txnHash: txnHash.hash,
      });
      return response as UserTransactionResponse;
    };

    transactionArguments = [
      new Bool(true),
      new U8(1),
      new U16(2),
      new U32(3),
      new U64(4),
      new U128(5),
      new U256(6),
      account1.accountAddress,
      new MoveString("expected_string"),
      moduleObjects[0],
      new MoveVector([]),
      MoveVector.Bool([true, false, true]),
      MoveVector.U8([0, 1, 2, MAX_U8_NUMBER - 2, MAX_U8_NUMBER - 1, MAX_U8_NUMBER]),
      MoveVector.U16([0, 1, 2, MAX_U16_NUMBER - 2, MAX_U16_NUMBER - 1, MAX_U16_NUMBER]),
      MoveVector.U32([0, 1, 2, MAX_U32_NUMBER - 2, MAX_U32_NUMBER - 1, MAX_U32_NUMBER]),
      MoveVector.U64([0, 1, 2, MAX_U64_BIG_INT - BigInt(2), MAX_U64_BIG_INT - BigInt(1), MAX_U64_BIG_INT]),
      MoveVector.U128([0, 1, 2, MAX_U128_BIG_INT - BigInt(2), MAX_U128_BIG_INT - BigInt(1), MAX_U128_BIG_INT]),
      MoveVector.U256([0, 1, 2, MAX_U256_BIG_INT - BigInt(2), MAX_U256_BIG_INT - BigInt(1), MAX_U256_BIG_INT]),
      new MoveVector([
        AccountAddress.fromStringRelaxed({ input: "0x0" }),
        AccountAddress.fromStringRelaxed({ input: "0xabc" }),
        AccountAddress.fromStringRelaxed({ input: "0xdef" }),
        AccountAddress.fromStringRelaxed({ input: "0x123" }),
        AccountAddress.fromStringRelaxed({ input: "0x456" }),
        AccountAddress.fromStringRelaxed({ input: "0x789" }),
      ]),
      MoveVector.MoveString(["expected_string", "abc", "def", "123", "456", "789"]),
      new MoveVector(moduleObjects),
      new MoveOption(),
      new MoveOption(new Bool(true)),
      new MoveOption(new U8(1)),
      new MoveOption(new U16(2)),
      new MoveOption(new U32(3)),
      new MoveOption(new U64(4)),
      new MoveOption(new U128(5)),
      new MoveOption(new U256(6)),
      new MoveOption(account1.accountAddress),
      new MoveOption(new MoveString("expected_string")),
      new MoveOption(moduleObjects[0]),
    ];
  });

  describe("single signer transactions with all entry function arguments except `&signer`, both public and private entry functions", () => {
    it("successfully submits a public entry function, single signer transaction with all argument types but no `&signer` argument", async () => {
      const response = await rawTxnHelper(account1, "public_arguments", [], transactionArguments);
      expect(response.success).toBe(true);
    });

    it("successfully submits a private entry function, single signer transaction with all argument types for private entry but no `&signer` argument", async () => {
      const response = await rawTxnHelper(account1, "private_arguments", [], transactionArguments);
      expect(response.success).toBe(true);
    });
  });

  // only public entry functions- shouldn't need to test private again
  describe("single signer transactions with all entry function arguments", () => {
    it("successfully submits a single signer transaction with all argument types", async () => {
      const response = await rawTxnHelper(
        account1,
        "public_arguments_one_signer",
        [],
        [account1.accountAddress, ...transactionArguments],
      );
      expect(response.success).toBe(true);
    });
  });

  // only public entry functions- shouldn't need to test private again
  describe("multi signer transaction with all entry function arguments", () => {
    it("successfully submits a multi signer transaction with all argument types", async () => {
      const secondarySignerAddresses = [
        account2.accountAddress,
        account3.accountAddress,
        account4.accountAddress,
        account5.accountAddress,
      ];
      const response = await rawTxnMultiAgentHelper(
        account1,
        "public_arguments_multiple_signers",
        [],
        [
          new MoveVector<AccountAddress>([
            account1.accountAddress,
            account2.accountAddress,
            account3.accountAddress,
            account4.accountAddress,
            account5.accountAddress,
          ]),
          ...transactionArguments,
        ],
        secondarySignerAddresses,
      );
      expect(response.success).toBe(true);
      const responseSignature = response.signature as TransactionMultiAgentSignature;
      const secondarySignerAddressesParsed = responseSignature.secondary_signer_addresses.map((address) =>
        AccountAddress.fromStringRelaxed({ input: address }),
      );
      expect(secondarySignerAddressesParsed.map((s) => s.toString())).toEqual(
        secondarySignerAddresses.map((address) => address.toString()),
      );
      expect((responseSignature as any).fee_payer_address).toBeUndefined();
    });
  });

  describe("fee payer transactions with various numbers of signers", () => {
    it("successfully submits a sponsored transaction with all argument types", async () => {
      const response = await rawTxnMultiAgentHelper(
        account1,
        "public_arguments_one_signer",
        [],
        [account1.accountAddress, ...transactionArguments],
        [],
        accountFeePayer.accountAddress,
      );
      expect(response.success).toBe(true);
      const responseSignature = response.signature as TransactionFeePayerSignature;
      expect(responseSignature.secondary_signer_addresses.length).toEqual(0);
      expect(AccountAddress.fromStringRelaxed({ input: responseSignature.fee_payer_address }).toString()).toEqual(
        accountFeePayer.accountAddress.toString(),
      );
    });
  });
});

// hard-coded bytecode for the contract so we don't have to recompile it every time in ci
const contractMetadata =
  "0x25417267756d656e7420546573747320666f722074686520547970657363726970742053444b0100000000000000004034383630363633374532323330393544304537333845373643364245334133384132383536314443434431343839324239364133443032313545363838323133f2011f8b08000000000002ffa5903f6fc23010c5777f0acb7b02485d1990aa2e1d3a345b84a2c379a66988cfb2ddb455d5ef8e9d04c4c086ece5eedefbdd9fda91eee988bdb034406ea5daf9e3d7001b6585108334ec65fc80ac7e1d82f69d8bf2fdf95589113e746cb3635da6a784a85b38d8165677087bb17391c38b4fd86ff67d12fec9136b3a654b59aee64f595468f628364b30f08895b9f896e43556f27f2657dcc3be1d3ea1d3948fc16346153cb372035153db7a8490f798348db95944ad7f366ac94fde86af73a4da9312d1930da463ba5043cb41a76a33df692c6e1adc156f13e800184d06ea0c91c2dffaa6010000010e74785f617267735f6d6f64756c65e21b1f8b08000000000002ffed5cff6fdb3616ff7d7f056f076436a6db2cea8bbfa429d6adc1aec0aed9a5eeb04310088a4d27ba399667c969735bfff77b4f1225922225661db00153d1d816f9f8e1d3e3fb4652d47dba3e6e19c90ff12e8b577992eea2f8707bbc67bb3c5b2cf2f7789545f725d52f9f10f877cc18c9f2f56291e58764777b2a17b2c3213d28655972bb636ae1035be52dca748f2c2c16bfbc61db8d432e8acb0f2ad1cd7fa16d43545caa4425738bc51b1d93f9e39e45c96e935620d0b820f8f2cb2fc9f28e919237b265bbdbfc2e23f181915d9a13f6f331de7e5150aed25d969357afbfb9b8bc3cff6619fd001f1797d177e7afbf5dfe73418ea14fce883b999c4ab8c90ee4c0d11fe2ed91758057903fbcf8eeedf99be8f5c5323afff7db17df71702a829782222e493200db3112efd6bc9042e1eeb35c84bef87ef9eae27589f76af99fe8fcf2127a9a7068cf049da5f7bf0ddae5d0be161a9ae671b203619075b2d9b003a85f291f92dfc5bbbabbfe8e28ef28c08e04f27fbdf8317a3b83da19ca2e084ed53a37844a3784da3008bc76bd87d01ec57ba0737f1e4ee9bc4d14fad1d7afbeadc77fe6fbe1d4f727536f3a9907811bba9a7ee9ac6a03bf50f8fe84cea81786733a997b333ff4e0bf37f5c3c9d4f7dc6938a3aeeb6bf8a74158e1c02fecdc0da600319b536fea41cff3c0a75e007ccc4034b370369d4fa6b3c0a3e17c0e9d8441e84ff0cf9bfbc13498c1384de7aee7d279e8cde7280ea1bff31fbf07dd3c7f197d7d7101fa7893a65be8303f1cd9a98eaa16bbabaf6e244ff5048de83d3d41e8d7fa65e882ce6a01077a12905a2dbb504bf2e2e5cbcbf3376f16245eaf0f2ccb80f02bade3d4b67eb3bc7cf51a86a7b4fe67c7d973687ff3297bbf8702b68e4a87f5a95ed0952f28e55d21a0d81143babc2a86c1219b789bc1175e906b6e71604c8c6cd2ed367d075d8137cad92df823f48659555e911ceee37cc15b4d1ce23a843aa867e41fcd0fb7f8d1c12e0ebc74bbc2c555034b030f3f7cfc0838b70644d4158ee28622265e09a068c45ef9e5975f7dd0a8651ccca322345e09d0b5fd7bc26f5ff8ddd713aa2bc70e7db127bc127ad238104f5bea6b4b7b85498501820b499c541e243bb7e4d912fab6847df750982d671a2ec47b282e4571fe9e2ed1fb9df1fcdf19af4770b533ab8455f934417c75c915f96af21e84089ff1cdaaf85eb34df1ed52aff8f683b0f89ecee6dddd2a5eb0710842c762e195c6453a50068c14dfc048f10d8c14dfc048f10d8c7c8a9c14ac40bbe32a276f587edcbf8cf398dcc519f9893d56092dfe63f7fbfc312a334bcc56caa4f2d939165fb22c3d1e56ecb9a327a74f23f73ac93f482c4b140ddb9c6a73dc81174ff22a411fadd97e9b3eb2c3829c9439f758b8c538cbd821ffdba8ac592caaf18dd24ddd6e4cce4c31cd2193f1698db5653981dbc99a41d3de128edfb5dc2a812693a6e8dd5d027c27e419f1445e3975a1442889f4101dd806daf2e47f756071ce2a998ef43c0b0c0b4c47a50004ac5b06d78856d68c4e946e159cfbf48145793a920af1df4983eeb42ae5a1fce5834ca16755e0b1529ecd21bd8f14f6faf82d4768b1d81fb3bbe8265efd343ab93f96e3e7e0a7428e239490cf79b6562865f393831dd8033b64ac8152b42343638bd6686d6782e5c943ac5a5dcd69ba57181d3be686f4b736f42c1bf2e9a171f0b9fdc87d352268ca2b2955f6bb3fde6c9315015d3d3c16c65c4c4cf3f8367bb60487bb84b0b584b8b50427bb84f8b00ce00f1ced720a7f33f89b234d4188942e926282b0c47c60e922b58be42ed2bbd8c0c516145bd0021b5ba00b5f526c41b105c516145b506c41e7cf473a2f22dda9309f2e7ea61be01fdb813bd1d415a92ad49e9cf4a2b86614880f7618b40303b2463b10af03c4a396207e0748e85b82045db7436d851276a060de64873235a3f0f4c10e6866062a57702c71e6661c7d84b254c30e6d16e75fb6706e2f1c663f9660b41f0cd4dc16cdeb47037db745f3fbd140f16dd1028b3ba5f6820bfbe1d0146ce1a6bd70dc264a44c0e9079df58256f661cbe5bc17506f28b6ceb6c352ca65bc27590a757be1ec2d85d27e307b4ba15e3f9abda550bf1fcdde52686071a7f69642c37eb827580a9df6c2c996d28f38eb457c9a99d0792fa0d14ce42c70629bfb9505cdeca549b1a02842a329975a1da9fc582cae2a65d58aaa525a2da32aa5d5daa98ac0174c95f27a95542eaf86ab5e1a956babbd18520e815c57cd6ffa66d0a56b8a8af45d5c546c5194721263728be438eb44382a6b8c6d0265a5b04da02cf069ba5057deda24ad85ad16492d7425bab408b9fce580d122e343d119069a56e55e1d1f92c619b728ca21119d7f8b0487a403a11812c143b709704804a7db26c02111fca8a60b2af0200f0927298644f4772d927a481437d622e443223ba716596d1d5d2ea769058bf56b0673d1c768c7325c31739bd12c11b457dc35c23f073196172f2fcc98d480297f4961c112d97b0ab2c1fdb6bb1a9378f5f3318171d0ae43f0092d77b2e8f4a50d2e79e54b24c74dad33719f0b96704da4b8bf75266d7ac192b48918f7bacea40d30582e3711e3bed799b419065b114636a8c233ba781298c88bedb03379970c76530ce4f5bed8596bd3cc215343a3d212b00ddfb23fe69bd948d9371b3b646600286d04016e591e358b2ea3f117f2fa9243e62d88a854aa2c2ab6df47629871842071750d433bb16c5d0469edde1d2ef15b82404cd7eca70100b505400dd3ec9f0184670b817aa7d9270308df1602b551b301061081f58d509d2c8a5237b405291457b77b0420534b109edc9836537013ce12aad475a750d97a7f43aa833c92b8b60a5baa7809978333ad0ab28a1ab1a8467dcb28c3b1c480ee10fe280e3e4e52aeb501866b89519a0087c0c74646924f452c6a898596a0477a3b1b3bd4b38541d537e0801a0143be2d125a8001c9a3c052600b847660000a7d000aadef8d9a8504757877535bacc2260c58508758334bacda60f47095d920e2dc1291db8d04d8193800ddd36c5d91de7061c710b73c8921dc54816e5d79c60749c937f1eeb39cdc30b28ab75bb626b89d436292ad0ec93e27fbf8719bc6eb825898171e9207dc9c1a2686c3c47098180e13c3a74e0c7be63fe66527d1c338954f71b81f71b8eb70b8b7706a07e1d42ec1119d8023d8bc23d8b8a3d9ad9653f08a05213516935c315b15d34e297f94f240359f53923239a992b8d3e54852b623a42b62ca21260d62dc9742b7147bd5e0a984be16774f5c5d8c20ade3cf3b347e77b54a8fbb622bfe447d8ea1bcee71e843301a82d1108c8660f45b8351c7336ab56f2ab665646f542ed10d21ed2f1ed2ee8fdb3cd96f795ccbec021bafa31d755e479ddf5117f40652d6e51987903a84d421a40e21f563426af130aee272a23d06da7594ec748ffbcb0fb1764562c79694da937af6a4be3d6920905ef7aca9abd2723ae437641e7f81cca3fc4c76db64c78acc43a736cf960bb23ea4fbe7b827236cbc2f9f173210b6cdb104072cd9add9fb2206eb1eb0e64fa6978790a1d1e8a4002ed25f43259819290e602f16c9ee21de26786606d68e478683cae4f38691f1b8fd90ffff92fdb3a54396d53d5537e2905f6387dcfcaa3ccc5fefc92283370646b4dd7d90c5dd16b4b4f28e775b0d9b5b3b4894695548a542b3a0930d19f155fb248b8a7d2e1424c71e8f0d37d8d1c838008613d7a601f840d83663fdfde36ec347f4ef9afae781836d19fa313c8752757a9302fc3b5950a79d6cf2c3dd0d930ec77d1ab7d4282d517bfe7ef590b077d7e2940135090b23d87419b65186347b48b38734fbe969f682341e43f613a27f90dc82e40d2427209bbe62f0aa8dab766d65cb3adbd31bac965267995a6bd45aa0dee8f47666b42b9321f55a8e4ed3f5e6d141290b40abfb5a7dd7abb85eab8d5a6c525babe960933518a61fad5251818520a72914155a0871bae654072a29ba12ddda1599a2f87250eb98eae86adab7de4c81b4c5aa0084a991b65c15833865d256b484a14ca574753a91d84eb174356da934532f6db12a15614aa62d57a5224ed5b4152da92853385d9d4e2aa6a99d45b2d8f5549e1ae60573e3d3a6fb783fd2bff800a64e993a6f929e5ecac6c2acc83029529f5b823566ddc24f99a947b7dbf406264d35c573d361794bb9888f1762df237d34224f29b659c212cf93ab12383578bc86467d14d88a8cda917906e552864cfb5c664f36a80861d43cca5cb3c87f79e34a30f2009dda054f7245bab0c9f5d3b5a3592e2bd4a459b7527e580cfe47ddb7ac12cafb142a1e14718c4e7887ca0ae3d35ad38f6a2d2e842ac689b75abfb4e3ccf4c28e6ad5929ee18b5bea4b0f2f6fea4b1f2f57f56580976b87acd203c39feef8ba7ed34821609c42c345d19930856ebd79a4b5df45cd559eb9ca3757e9f6d6906da5b847bdea77026e589c1f814a7e52b42a0515e3f5f8ba1010c331594b5ad654afeee2dd2d8baa8268b38d6fb31132c6d742afaaaaebbae05a5c43c66eb9389b2315a4ebb52da7bad57edadd9853e91b7b568d3d7d63dfaab1af6f1c58350e4489e95e8163bf2a2f1ff6d157bd9d992ad474483ab463a8515322f9348ea1aa9516b58ed898b38ad6611a89b4efd88c26d7accec4e8f9110fbc745218a52a9c56e92630ca583869d2d305ed63c22c78e5f4474ba8c6831d2d4afd990d4d3a2b9dc7d0d6eb0e5b5810e2590a1b323c2a6143e7513bbad0b7ec975a32581c51b020ac0f1f98697bce15981bf658d458da686adc94f941ffc14f0d7e6af053839ffa73f8299b47c9c54981a32dd52fe80c5e6ef07283971bbcdc1fe5e5f84fb3b7333f656cf6797cb2ad2df5b4a5beb634d0dabff0aade96776d2d0738ad39bed39ab83badd9b843ae07473d38eac1510f8efacfe3a86141fcc327ff078b06c507c366000000000400000000000000000000000000000000000000000000000000000000000000010e4170746f734672616d65776f726b00000000000000000000000000000000000000000000000000000000000000010b4170746f735374646c696200000000000000000000000000000000000000000000000000000000000000010a4d6f76655374646c69620000000000000000000000000000000000000000000000000000000000000004114170746f73546f6b656e4f626a6563747300";

// tricksy way to interpolate a named address into the contract bytecode
const contractBytecode = (deploymentAddress: AccountAddress) => {
  return `0xa11ceb0b060000000c0100100210200330a50104d501f80105cd03f80707c50bb10408f60f4006b6108c0710c21782020ac4191a0cde19a4240d823e06000001010102010301040105010601070008080000090800050a0700020d07010001031007010000021e0200062a0700000b000100000c000200000e000300000f0400000011050000001205000000130600000014070000001500001e0000000000000000000000000000000000000000000000000000000000000016050500071b0b000100051c0a0900021d0d0e0108041f040e0002200e1200022113140002221315010801231818000324001e010003251f19010003261f19010003271f2001000328211901000329221e0100062b002501000a0a0c0c100c0a110a170a190a1a0a1b0a180a1c0a1d0a0e0a0912171317141715171617171913191419151916191717171a131a141a151a161a171b131b141b151b161b17181318141815181618171c131c141c151c161c171d131d141d151d161d170e130e140e150e160e170913091409150916091711131114111511161118221819182618171827181a1828181b18291818182a181c182b181d182c180e182d1809182e1811182f18301831180a18321833183418351836183718381839183a183b183c183d183e1801183f1840184118421843184418451846184718481849184a184b184c184d184e184f1850185118521853185400010a080203050505030b030108000b030108000b0301080001060c2001020d0e03040f0508020b030108000a020a010a020a0d0a0e0a030a040a0f0a050a08020a0b030108000b0401020b0401010b0401020b04010d0b04010e0b0401030b0401040b04010f0b0401050b040108020b04010b0301080026060c060c060c060c060c0a0501020d0e03040f0508020b030108000a020a010a020a0d0a0e0a030a040a0f0a050a08020a0b030108000b0401020b0401010b0401020b04010d0b04010e0b0401030b0401040b04010f0b0401050b040108020b04010b0301080022060c0501020d0e03040f0508020b030108000a020a010a020a0d0a0e0a030a040a0f0a050a08020a0b030108000b0401020b0401010b0401020b04010d0b04010e0b0401030b0401040b04010f0b0401050b040108020b04010b0301080007070a08020a02030a08020a020a0a020a0a02010802010a0201070a090001080001060b03010900010501060801060805030b030108000c0a0b030108000801010b0301080001080501060805010c010b0301090089010a0b0301080003030303030303030303030303030303030303030303060206010602060d060e06030604060f0605060802060b0301080003030303030303030303030b030108000b030108000b030108000b030108000b0401020b0401010b0401020b04010d0b04010e0b0401030b0401040b04010f0b0401050b040108020b04010b030108000b0401020b0401010b0401020b04010d0b04010e0b0401030b0401040b04010f0b0401050b040108020b04010b030108000a020a020a010a010a020a020a0d0a0d0a0e0a0e0a030a030a040a040a0f0a0f0a050a050a08020a08020a0b030108000a0b030108000a020a020a010a010a020a020a0d0a0d0a0e0a0e0a030a030a040a040a0f0a0f0a050a050a08020a08020a0b030108000a0b030108000a020a010a020a0d0a0e0a030a040a0f0a050a08020a0b030108000a020a010a020a0d0a0e0a030a040a0f0a050a08020a0b03010800010201030101010d010e0104010f010b0401090001060b040109000106090002060b040109000609000109000903030a050a050a050a050a050a050a051d010101010101010101010101010101010101010101010101010101010101080601090101090201090301090401090501090601090701090801090901090a010a0101090b01090c010a0d01090d010a0e01090e010a0301090f010a04010910010a0f010911010a05010912010913010a0b03010800010914010b040101010915010b040102010916010b04010d010917010b04010e010918010b040103010919010b04010401091a010b04010f01091b010b04010501091c010b0401080201091d010b04010b030108000e74785f617267735f6d6f64756c65056572726f72066f626a656374066f7074696f6e067369676e657206737472696e6709747970655f696e666f06766563746f720d456d7074795265736f757263650953657475704461746106537472696e671a6765745f65787065637465645f766563746f725f737472696e67196765745f746573745f6f626a6563745f616464726573736573064f626a656374106765745f746573745f6f626a656374730b696e69745f6d6f64756c65064f7074696f6e11707269766174655f617267756d656e7473107075626c69635f617267756d656e7473217075626c69635f617267756d656e74735f6d756c7469706c655f7369676e6572731b7075626c69635f617267756d656e74735f6f6e655f7369676e657209747970655f7461677312766965775f616c6c5f617267756d656e74730b64756d6d795f6669656c640e656d7074795f6f626a6563745f310e656d7074795f6f626a6563745f320e656d7074795f6f626a6563745f33077265766572736504757466380e6f626a6563745f616464726573730e436f6e7374727563746f725265660a616464726573735f6f660d6372656174655f6f626a6563740f67656e65726174655f7369676e65721b6f626a6563745f66726f6d5f636f6e7374727563746f725f7265660d696e76616c69645f7374617465046e6f6e650769735f6e6f6e650769735f736f6d6506626f72726f7708636f6e7461696e7304736f6d650854797065496e666f07747970655f6f66${deploymentAddress.toStringWithoutPrefix()}00000000000000000000000000000000000000000000000000000000000000010520${deploymentAddress.toStringWithoutPrefix()}0101010a02100f65787065637465645f737472696e670410050000000000000000000000000000000d0202000f2006000000000000000000000000000000000000000000000000000000000000000e0403000000030804000000000000000201010a05c1010600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000abc0000000000000000000000000000000000000000000000000000000000000def0000000000000000000000000000000000000000000000000000000000000123000000000000000000000000000000000000000000000000000000000000045600000000000000000000000000000000000000000000000000000000000007890a0104030100010a0a0225060f65787065637465645f737472696e6703616263036465660331323303343536033738390a046106000000000000000000000000000000000100000000000000000000000000000002000000000000000000000000000000fdfffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0a0d0d06000001000200fdfffeffffff0a0fc10106000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000fdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0a0e1906000000000100000002000000fdfffffffeffffffffffffff0a033106000000000000000001000000000000000200000000000000fdfffffffffffffffeffffffffffffffffffffffffffffff0a020706000102fdfeff030864000000000000000410ffffffffffffffffffffffffffffffff0d02ffff0f20ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0e04ffffffff0308ffffffffffffffff0201ff03082c01000000000000030890010000000000000308f4010000000000000308c8000000000000000a020100126170746f733a3a6d657461646174615f7631ed010601000000000000000b45585045435445445f55380002000000000000000c45585045435445445f5531360003000000000000000c45585045435445445f5533320004000000000000000c45585045435445445f5536340005000000000000000d45585045435445445f553132380006000000000000000d45585045435445445f55323536000004106765745f746573745f6f626a6563747301010012766965775f616c6c5f617267756d656e7473010100196765745f746573745f6f626a6563745f6164647265737365730101001a6765745f65787065637465645f766563746f725f737472696e670101000002011701010203180b03010800190b030108001a0b03010800000100000824400900000000000000000c03070b0c050d0538000b050c060e06410a0c020a0206000000000000000024042005100d06450a0c010d030c000b010c040b000b04110b44090b02060100000000000000170c02050b0b06460a00000000000000000b03020101000101030b11020c020c010c000e0038010e0138010e0238010202010001010f0d07002b010c000a001000140a001001140b00100214020300000010360a00110d0700210406050a0b000106000000000000000027401100000000000000000c050600000000000000000c020a0206030000000000000023042805130700110e0c010e01110f0c040e040912002d000e0138020c030d050b0344110b02060100000000000000160c02050e0d0538030d0545110d0545110d05451112010c060b000b062d0102040004010100220b000b010b020b030b040b050b060b070b080b090b0a0b0b0b0c0b0d0b0e0b0f0b100b110b120b130b140b150b160b170b180b190b1a0b1b0b1c0b1d0b1e0b1f110502050104010116f2090b0007012104050507060000000000000000270b01070821040c050e060100000000000000270b0207042104130515060200000000000000270b03070621041a051c060300000000000000270b0407072104210523060400000000000000270b050703210428052a060500000000000000270b06070521042f0531060600000000000000270b0707002104360538060700000000000000270b080702110b21043e0540060800000000000000270b0907002b01100014210448054a060900000000000000270b0a071d060a000000000000000c210c9e010c93010e930141170e9e014117210457055c07120b21161111270b93010b9e010c7d0c670d6738040d7d38040b670b7d0c7e0c680e6841170c420a420e7e41172104710573060200020000000000270a420600000000000000002404870105780d6845170d7e451721047f0582010b211111270b42060100000000000000170c4205730b68461700000000000000000b7e461700000000000000000b0b070a060b000000000000000c220c9f010c94010e940141190e9f01411921049801059d0107120b22161111270b94010b9f010c7f0c690d6938050d7f38050b690b7f0c80010c6a0e6a41190c430a430e800141192104b20105b401060200020000000000270a430600000000000000002404c80105b9010d6a45190d800145192104c00105c3010b221111270b43060100000000000000170c4305b4010b6a461900000000000000000b8001461900000000000000000b0c0711060c000000000000000c230ca0010c95010e950141170ea00141172104d90105de0107120b23161111270b95010ba0010c81010c6b0d6b38040d810138040b6b0b81010c82010c6c0e6c41170c440a440e820141172104f30105f501060200020000000000270a440600000000000000002404890205fa010d6c45170d82014517210481020584020b231111270b44060100000000000000170c4405f5010b6c461700000000000000000b8201461700000000000000000b0d070d060d000000000000000c240ca1010c96010e9601411a0ea101411a21049a02059f0207120b24161111270b96010ba1010c83010c6d0d6d38060d830138060b6d0b83010c84010c6e0e6e411a0c450a450e8401411a2104b40205b602060200020000000000270a450600000000000000002404ca0205bb020d6e451a0d8401451a2104c20205c5020b241111270b45060100000000000000170c4505b6020b6e461a00000000000000000b8401461a00000000000000000b0e070f060e000000000000000c250ca2010c97010e9701411b0ea201411b2104db0205e00207120b25161111270b97010ba2010c85010c6f0d6f38070d850138070b6f0b85010c86010c700e70411b0c460a460e8601411b2104f50205f702060200020000000000270a4606000000000000000024048b0305fc020d70451b0d8601451b210483030586030b251111270b46060100000000000000170c4605f7020b70461b00000000000000000b8601461b00000000000000000b0f0710060f000000000000000c260ca3010c98010e980141180ea301411821049c0305a10307120b26161111270b98010ba3010c87010c710d7138080d870138080b710b87010c88010c720e7241180c470a470e880141182104b60305b803060200020000000000270a470600000000000000002404cc0305bd030d7245180d880145182104c40305c7030b261111270b47060100000000000000170c4705b8030b72461800000000000000000b8801461800000000000000000b10070c0610000000000000000c270ca4010c99010e9901411c0ea401411c2104dd0305e20307120b27161111270b99010ba4010c89010c730d7338090d890138090b730b89010c8a010c740e74411c0c480a480e8a01411c2104f70305f903060200020000000000270a4806000000000000000024048d0405fe030d74451c0d8a01451c210485040588040b271111270b48060100000000000000170c4805f9030b74461c00000000000000000b8a01461c00000000000000000b11070e0611000000000000000c280ca5010c9a010e9a01411d0ea501411d21049e0405a30407120b28161111270b9a010ba5010c8b010c750d75380a0d8b01380a0b750b8b010c8c010c760e76411d0c490a490e8c01411d2104b80405ba04060200020000000000270a490600000000000000002404ce0405bf040d76451d0d8c01451d2104c60405c9040b281111270b49060100000000000000170c4905ba040b76461d00000000000000000b8c01461d00000000000000000b1207090612000000000000000c290ca6010c9b010e9b01410e0ea601410e2104df0405e40407120b29161111270b9b010ba6010c8d010c770d77380b0d8d01380b0b770b8d010c8e010c780e78410e0c4a0a4a0e8e01410e2104f90405fb04060200020000000000270a4a06000000000000000024048f050580050d78450e0d8e01450e21048705058a050b291111270b4a060100000000000000170c4a05fb040b78460e00000000000000000b8e01460e00000000000000000b1311000613000000000000000c2a0ca7010c9c010e9c0141090ea70141092104a00505a50507120b2a161111270b9c010ba7010c8f010c790d79380c0d8f01380c0b790b8f010c90010c7a0e7a41090c4b0a4b0e900141092104ba0505bc05060200020000000000270a4b0600000000000000002404d00505c1050d7a45090d900145092104c80505cb050b2a1111270b4b060100000000000000170c4b05bc050b7a460900000000000000000b9001460900000000000000000b140c2011020c500c4f0c4e0b200b4e0b4f0b50401103000000000000000614000000000000000c2b0ca8010c9d010e9d0141110ea80141112104ea0505ef0507120b2b161111270b9d010ba8010c91010c7b0d7b38030d910138030b7b0b91010c92010c7c0e7c41110c4c0a4c0e9201411121048406058606060200020000000000270a4c06000000000000000024049a06058b060d7c45110d92014511210492060595060b2b1111270b4c060100000000000000170c4c0586060b7c461100000000000000000b9201461100000000000000000b15380d0615000000000000000c2c0c5c0c510e51380e04b1060e5c380e04ab0605b00607190b2c1611112705c7060e5c380f04b50605ba06071a0b2c161111270e5138100c370e5c0b37381104c20605c706071b0b2c161111270b16070138120616000000000000000c2d0c5d0c520e52381304db060e5d381304d50605da0607190b2d1611112705f1060e5d381404df0605e406071a0b2d161111270e5238150c380e5d0b38381604ec0605f106071b0b2d161111270b17070838170617000000000000000c2e0c5e0c530e53380e0485070e5e380e04ff0605840707190b2e16111127059b070e5e380f048907058e07071a0b2e161111270e5338100c390e5e0b393811049607059b07071b0b2e161111270b18070438180618000000000000000c2f0c5f0c540e54381904af070e5f381904a90705ae0707190b2f1611112705c5070e5f381a04b30705b807071a0b2f161111270e54381b0c3a0e5f0b3a381c04c00705c507071b0b2f161111270b190706381d0619000000000000000c300c600c550e55381e04d9070e60381e04d30705d80707190b301611112705ef070e60381f04dd0705e207071a0b30161111270e5538200c3b0e600b3b382104ea0705ef07071b0b30161111270b1a07073822061a000000000000000c310c610c560e5638230483080e61382304fd0705820807190b31161111270599080e613824048708058c08071a0b31161111270e5638250c3c0e610b3c3826049408059908071b0b31161111270b1b07033827061b000000000000000c320c620c570e57382804ad080e62382804a70805ac0807190b321611112705c3080e62382904b10805b608071a0b32161111270e57382a0c3d0e620b3d382b04be0805c308071b0b32161111270b1c0705382c061c000000000000000c330c630c580e58382d04d7080e63382d04d10805d60807190b331611112705ed080e63382e04db0805e008071a0b33161111270e58382f0c3e0e630b3e383004e80805ed08071b0b33161111270b1d07003831061d000000000000000c340c640c590e5938320481090e64383204fb0805800907190b34161111270597090e643833048509058a09071a0b34161111270e5938340c3f0e640b3f3835049209059709071b0b34161111270b1e0702110b3836061e000000000000000c350c650c5a0e5a383704ac090e65383704a60905ab0907190b351611112705c2090e65383804b00905b509071a0b35161111270e5a38390c400e650b40383a04bd0905c209071b0b351611112707002b011000140c4d0b1f0b4d383b061f000000000000000c360c660c5b0e5b383c04db090e66383c04d50905da0907190b361611112705f1090e66383d04df0905e409071a0b36161111270e5b383e0c410e660b41383f04ec0905f109071b0b3616111127020601040101236f0b00110d0b01110d0b02110d0b03110d0b04110d400e05000000000000000c280b050b280600000000000000000c260c2e0c2d0e2d410e0e2e410e210419051e07120b26161111270b2d0b2e0c2b0c290d29380b0d2b380b0b290b2b0c2c0c2a0e2a410e0c270a270e2c410e2104330535060200020000000000270a27060000000000000000240449053a0d2a450e0d2c450e21044105440b261111270b27060100000000000000170c2705350b2a460e00000000000000000b2c460e00000000000000000b060b070b080b090b0a0b0b0b0c0b0d0b0e0b0f0b100b110b120b130b140b150b160b170b180b190b1a0b1b0b1c0b1d0b1e0b1f0b200b210b220b230b240b251105020701040101002a0b00110d0b012104060508060000000000000000270b020b030b040b050b060b070b080b090b0a0b0b0b0c0b0d0b0e0b0f0b100b110b120b130b140b150b160b170b180b190b1a0b1b0b1c0b1d0b1e0b1f0b200b2111050208010400248d023840384121040938423843210c00050b090c000b00041238443845210c0b0514090c0b0b0b041b38463847210c16051d090c160b16042438483849210c170526090c170b17042d384a384b210c18052f090c180b180436384c384d210c190538090c190b19043f384e384f210c1a0541090c1a0b1a044838503851210c1b054a090c1b0b1b045138523853210c1c0553090c1c0b1c045a38543855210c01055c090c010b01046338563857210c020565090c020b02046c38583859210c03056e090c030b030475385a385b210c040577090c040b04047e385c385d210c05058001090c050b05048701385e385f210c06058901090c060b0604900138603861210c07059201090c070b0704990138623863210c08059b01090c080b0804a20138643865210c0905a401090c090b0904ab0138663867210c0a05ad01090c0a0b0a04b40138683869210c0c05b601090c0c0b0c04bd01386a386b210c0d05bf01090c0d0b0d04c601386c386d210c0e05c801090c0e0b0e04cf01386e386f210c0f05d101090c0f0b0f04d80138703871210c1005da01090c100b1004e10138723873210c1105e301090c110b1104ea0138743875210c1205ec01090c120b1204f30138763877210c1305f501090c130b1304fc0138783879210c1405fe01090c140b14048502387a387b210c15058702090c150b15048a02058c0206000000000000000027020901000000210b000b010b020b030b040b050b060b070b080b090b0a0b0b0b0c0b0d0b0e0b0f0b100b110b120b130b140b150b160b170b180b190b1a0b1b0b1c0b1d0b1e0b1f0201000101010200`;
};
