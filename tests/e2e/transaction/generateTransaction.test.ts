import { AptosConfig, Network, Aptos, Account, Deserializer, U64, AccountAddress } from "../../../src";
import {
  RawTransaction,
  TransactionPayloadScript,
  TransactionPayloadMultisig,
  TransactionPayloadEntryFunction,
} from "../../../src/transactions/instances";
import { longTestTimeout } from "../../unit/helper";
import { fundAccounts, singleSignerScriptBytecode } from "./helper";

describe("generate transaction", () => {
  const config = new AptosConfig({ network: Network.LOCAL });
  const aptos = new Aptos(config);
  const senderAccount = Account.generate();
  const recieverAccounts = [Account.generate(), Account.generate()];
  const secondarySignerAccount = Account.generate();
  const feePayerAccount = Account.generate();
  beforeAll(async () => {
    await fundAccounts(aptos, [senderAccount, ...recieverAccounts, secondarySignerAccount, feePayerAccount]);
  }, longTestTimeout);

  describe("single signer transaction", () => {
    test("with script payload", async () => {
      const transaction = await aptos.build.transaction({
        sender: senderAccount.accountAddress,
        data: {
          bytecode: singleSignerScriptBytecode,
          functionArguments: [new U64(1), recieverAccounts[0].accountAddress],
        },
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadScript).toBeTruthy();
    });
    test("with multi sig payload", async () => {
      const transaction = await aptos.build.transaction({
        sender: senderAccount.accountAddress,
        data: {
          multisigAddress: secondarySignerAccount.accountAddress,
          function: "0x1::aptos_account::transfer",
          functionArguments: [recieverAccounts[0].accountAddress, 1],
        },
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadMultisig).toBeTruthy();
    });

    test("it generates an entry function transaction", async () => {
      const transaction = await aptos.build.transaction({
        sender: senderAccount.accountAddress,
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [recieverAccounts[0].accountAddress, 1],
        },
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadEntryFunction).toBeTruthy();
    });
  });

  describe("multi agent transaction", () => {
    test("with script payload", async () => {
      const transaction = await aptos.build.multiAgentTransaction({
        sender: senderAccount.accountAddress,
        secondarySignerAddresses: [secondarySignerAccount.accountAddress],
        data: {
          bytecode: singleSignerScriptBytecode,
          functionArguments: [new U64(1), recieverAccounts[0].accountAddress],
        },
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      expect(transaction.secondarySignerAddresses[0]).toStrictEqual(secondarySignerAccount.accountAddress);
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadScript).toBeTruthy();
    });

    test("with entry function transaction", async () => {
      const transaction = await aptos.build.multiAgentTransaction({
        sender: senderAccount.accountAddress,
        secondarySignerAddresses: [secondarySignerAccount.accountAddress],
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [recieverAccounts[0].accountAddress, 1],
        },
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      expect(transaction.secondarySignerAddresses[0]).toStrictEqual(secondarySignerAccount.accountAddress);
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadEntryFunction).toBeTruthy();
    });
  });

  describe("fee payer transaction", () => {
    test("with script payload", async () => {
      const transaction = await aptos.build.transaction({
        sender: senderAccount.accountAddress,
        data: {
          bytecode: singleSignerScriptBytecode,
          functionArguments: [new U64(1), recieverAccounts[0].accountAddress],
        },
        withFeePayer: true,
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      expect(transaction.feePayerAddress).toStrictEqual(AccountAddress.ZERO);
      expect(transaction.secondarySignerAddresses).toBe(undefined);
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadScript).toBeTruthy();
    });

    test("with multi sig payload", async () => {
      const transaction = await aptos.build.transaction({
        sender: senderAccount.accountAddress,
        data: {
          multisigAddress: secondarySignerAccount.accountAddress,
          function: "0x1::aptos_account::transfer",
          functionArguments: [recieverAccounts[0].accountAddress, 1],
        },
        withFeePayer: true,
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      expect(transaction.secondarySignerAddresses).toBe(undefined);
      expect(transaction.feePayerAddress).toStrictEqual(AccountAddress.ZERO);
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadMultisig).toBeTruthy();
    });

    test("with entry function transaction", async () => {
      const transaction = await aptos.build.transaction({
        sender: senderAccount.accountAddress,
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [recieverAccounts[0].accountAddress, 1],
        },
        withFeePayer: true,
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      expect(transaction.secondarySignerAddresses).toBe(undefined);
      expect(transaction.feePayerAddress).toStrictEqual(AccountAddress.ZERO);
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadEntryFunction).toBeTruthy();
    });

    test("as a multi agent", async () => {
      const transaction = await aptos.build.multiAgentTransaction({
        sender: senderAccount.accountAddress,
        secondarySignerAddresses: [secondarySignerAccount.accountAddress],
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [recieverAccounts[0].accountAddress, 1],
        },
        withFeePayer: true,
      });
      expect(transaction.rawTransaction instanceof RawTransaction).toBeTruthy();
      expect(transaction.secondarySignerAddresses![0]).toStrictEqual(secondarySignerAccount.accountAddress);
      expect(transaction.feePayerAddress).toStrictEqual(AccountAddress.ZERO);
      const deserializer = new Deserializer(transaction.rawTransaction.bcsToBytes());
      const deserializedTransaction = RawTransaction.deserialize(deserializer);
      expect(deserializedTransaction instanceof RawTransaction).toBeTruthy();
      expect(deserializedTransaction.payload instanceof TransactionPayloadEntryFunction).toBeTruthy();
    });
  });
});
