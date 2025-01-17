// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

import {
  Account,
  AccountAddress,
  Ed25519PrivateKey,
  Ed25519PublicKey,
  Secp256k1PrivateKey,
  Secp256k1PublicKey,
  SigningScheme,
  SigningSchemeInput,
} from "../../src";
import { AnyPublicKey } from "../../src/core/crypto/anyPublicKey";

import {
  ed25519,
  secp256k1TestObject,
  secp256k1WalletTestObject,
  singleSignerED25519,
  wallet,
  Ed25519WalletTestObject,
} from "./helper";

describe("Account", () => {
  describe("generate", () => {
    it("should create an instance of Account with a legacy ED25519 when nothing is specified", () => {
      // Account with Legacy Ed25519 scheme
      const edAccount = Account.generate();
      expect(edAccount).toBeInstanceOf(Account);
      expect(edAccount.publicKey).toBeInstanceOf(Ed25519PublicKey);
      expect(edAccount.signingScheme).toEqual(SigningScheme.Ed25519);
    });
    it("should create an instance of Account with a Single Sender ED25519 when scheme and legacy specified", () => {
      // Account with SingleKey Ed25519 scheme
      const edAccount = Account.generate({ scheme: SigningSchemeInput.Ed25519, legacy: false });
      expect(edAccount).toBeInstanceOf(Account);
      expect(edAccount.publicKey).toBeInstanceOf(AnyPublicKey);
      expect(edAccount.signingScheme).toEqual(SigningScheme.SingleKey);
    });
    it("should create an instance of Account when Secp256k1 scheme is specified", () => {
      // Account with SingleKey Secp256k1 scheme
      const secpAccount = Account.generate({ scheme: SigningSchemeInput.Secp256k1Ecdsa });
      expect(secpAccount).toBeInstanceOf(Account);
      expect(secpAccount.publicKey).toBeInstanceOf(AnyPublicKey);
      expect(secpAccount.signingScheme).toEqual(SigningScheme.SingleKey);
    });
  });
  describe("fromPrivateKeyAndAddress", () => {
    it("derives the correct account from a legacy ed25519 private key", () => {
      const { privateKey: privateKeyBytes, publicKey, address } = ed25519;
      const privateKey = new Ed25519PrivateKey(privateKeyBytes);
      const accountAddress = AccountAddress.from(address);
      const newAccount = Account.fromPrivateKeyAndAddress({ privateKey, address: accountAddress, legacy: true });
      expect(newAccount).toBeInstanceOf(Account);
      expect(newAccount.publicKey).toBeInstanceOf(Ed25519PublicKey);
      expect(newAccount.privateKey).toBeInstanceOf(Ed25519PrivateKey);
      expect((newAccount.privateKey as Ed25519PrivateKey).toString()).toEqual(privateKey.toString());
      expect((newAccount.publicKey as Ed25519PublicKey).toString()).toEqual(new Ed25519PublicKey(publicKey).toString());
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });

    it("derives the correct account from a single signer ed25519 private key", () => {
      const { privateKey: privateKeyBytes, publicKey, address } = singleSignerED25519;
      const privateKey = new Ed25519PrivateKey(privateKeyBytes);
      const accountAddress = AccountAddress.from(address);
      const newAccount = Account.fromPrivateKeyAndAddress({ privateKey, address: accountAddress, legacy: false });
      expect(newAccount).toBeInstanceOf(Account);
      expect(newAccount.publicKey).toBeInstanceOf(AnyPublicKey);
      expect(newAccount.privateKey).toBeInstanceOf(Ed25519PrivateKey);
      expect((newAccount.privateKey as Ed25519PrivateKey).toString()).toEqual(privateKey.toString());
      expect((newAccount.publicKey as Ed25519PublicKey).toString()).toEqual(new Ed25519PublicKey(publicKey).toString());
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });

    it("derives the correct account from a single signer secp256k1 private key", () => {
      const { privateKey: privateKeyBytes, publicKey, address } = secp256k1TestObject;
      const privateKey = new Secp256k1PrivateKey(privateKeyBytes);
      const accountAddress = AccountAddress.from(address);
      const newAccount = Account.fromPrivateKeyAndAddress({ privateKey, address: accountAddress });
      expect(newAccount).toBeInstanceOf(Account);
      expect(newAccount.publicKey).toBeInstanceOf(AnyPublicKey);
      expect(newAccount.privateKey).toBeInstanceOf(Secp256k1PrivateKey);
      expect((newAccount.privateKey as Secp256k1PrivateKey).toString()).toEqual(privateKey.toString());
      expect((newAccount.publicKey as Secp256k1PublicKey).toString()).toEqual(
        new Secp256k1PublicKey(publicKey).toString(),
      );
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });
  });

  describe("fromPrivateKey", () => {
    it("derives the correct account from a legacy ed25519 private key", () => {
      const { privateKey: privateKeyBytes, publicKey, address } = ed25519;
      const privateKey = new Ed25519PrivateKey(privateKeyBytes);
      const newAccount = Account.fromPrivateKey({ privateKey });
      expect(newAccount).toBeInstanceOf(Account);
      expect(newAccount.publicKey).toBeInstanceOf(Ed25519PublicKey);
      expect(newAccount.privateKey).toBeInstanceOf(Ed25519PrivateKey);
      expect((newAccount.privateKey as Ed25519PrivateKey).toString()).toEqual(privateKey.toString());
      expect((newAccount.publicKey as Ed25519PublicKey).toString()).toEqual(new Ed25519PublicKey(publicKey).toString());
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });

    it("derives the correct account from a single signer ed25519 private key", () => {
      const { privateKey: privateKeyBytes, publicKey, address } = singleSignerED25519;
      const privateKey = new Ed25519PrivateKey(privateKeyBytes);
      const newAccount = Account.fromPrivateKey({ privateKey, legacy: false });
      expect(newAccount).toBeInstanceOf(Account);
      expect(newAccount.publicKey).toBeInstanceOf(AnyPublicKey);
      expect(newAccount.privateKey).toBeInstanceOf(Ed25519PrivateKey);
      expect((newAccount.privateKey as Ed25519PrivateKey).toString()).toEqual(privateKey.toString());
      expect((newAccount.publicKey as Ed25519PublicKey).toString()).toEqual(new Ed25519PublicKey(publicKey).toString());
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });

    it("derives the correct account from a single signer secp256k1 private key", () => {
      const { privateKey: privateKeyBytes, publicKey, address } = secp256k1TestObject;
      const privateKey = new Secp256k1PrivateKey(privateKeyBytes);
      const newAccount = Account.fromPrivateKey({ privateKey });
      expect(newAccount).toBeInstanceOf(Account);
      expect(newAccount.publicKey).toBeInstanceOf(AnyPublicKey);
      expect(newAccount.privateKey).toBeInstanceOf(Secp256k1PrivateKey);
      expect((newAccount.privateKey as Secp256k1PrivateKey).toString()).toEqual(privateKey.toString());
      expect((newAccount.publicKey as Secp256k1PublicKey).toString()).toEqual(
        new Secp256k1PublicKey(publicKey).toString(),
      );
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });
  });
  describe("fromDerivationPath", () => {
    it("should create a new account from bip44 path and mnemonics with legacy Ed25519", async () => {
      const { mnemonic, address, path } = wallet;
      const newAccount = Account.fromDerivationPath({
        path,
        mnemonic,
        scheme: SigningSchemeInput.Ed25519,
      });
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });

    it("should create a new account from bip44 path and mnemonics with single signer Ed25519", async () => {
      const { mnemonic, address, path } = Ed25519WalletTestObject;
      const newAccount = Account.fromDerivationPath({
        path,
        mnemonic,
        scheme: SigningSchemeInput.Ed25519,
        legacy: false,
      });
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });

    it("should create a new account from bip44 path and mnemonics with single signer secp256k1", () => {
      const { mnemonic, address, path } = secp256k1WalletTestObject;
      const newAccount = Account.fromDerivationPath({
        path,
        mnemonic,
        scheme: SigningSchemeInput.Secp256k1Ecdsa,
      });
      expect(newAccount.accountAddress.toString()).toEqual(address);
    });
  });

  describe("sign and verify", () => {
    it("signs a message with single signer Secp256k1 scheme and verifies successfully", () => {
      const { privateKey: privateKeyBytes, address, signatureHex, messageEncoded } = secp256k1TestObject;
      const privateKey = new Secp256k1PrivateKey(privateKeyBytes);
      const accountAddress = AccountAddress.from(address);
      const secpAccount = Account.fromPrivateKeyAndAddress({ privateKey, address: accountAddress });
      const signature = secpAccount.sign(messageEncoded);
      expect(signature.toString()).toEqual(signatureHex);
      expect(secpAccount.verifySignature({ message: messageEncoded, signature })).toBeTruthy();
    });

    it("signs a message with single signer ed25519 scheme and verifies successfully", () => {
      const { privateKey: privateKeyBytes, address, signatureHex, messageEncoded } = singleSignerED25519;
      const privateKey = new Ed25519PrivateKey(privateKeyBytes);
      const accountAddress = AccountAddress.from(address);
      const edAccount = Account.fromPrivateKeyAndAddress({ privateKey, address: accountAddress, legacy: false });
      const signature = edAccount.sign(messageEncoded);
      expect(signature.toString()).toEqual(signatureHex);
      expect(edAccount.verifySignature({ message: messageEncoded, signature })).toBeTruthy();
    });

    it("derives the correct account from a legacy ed25519 private key", () => {
      const { privateKey: privateKeyBytes, address, signedMessage, message } = ed25519;
      const privateKey = new Ed25519PrivateKey(privateKeyBytes);
      const accountAddress = AccountAddress.from(address);
      const legacyEdAccount = Account.fromPrivateKeyAndAddress({ privateKey, address: accountAddress, legacy: true });
      const signature = legacyEdAccount.sign(message);
      expect(signature.toString()).toEqual(signedMessage);
      expect(legacyEdAccount.verifySignature({ message, signature })).toBeTruthy();
    });
  });

  it("should return the authentication key for a public key", () => {
    const { publicKey: publicKeyBytes, address } = ed25519;
    const publicKey = new Ed25519PublicKey(publicKeyBytes);
    const authKey = Account.authKey({ publicKey });
    expect(authKey.derivedAddress().toString()).toBe(address);
  });
});
