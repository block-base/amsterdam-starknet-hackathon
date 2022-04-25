import {
  createKeyPair,
  createAccount,
  createSignature,
  createSendETHTransferTransaction,
  getTransactionHistory,
  getPublicStarkKeyFromKeyPair,
} from "./starknet";

test("createKeyPair", async () => {
  expect(await createKeyPair()).not.toBeNull();
});

test("getPublicStarkKeyFromKeyPair", async () => {
  const keyPair = createKeyPair();
  expect(await getPublicStarkKeyFromKeyPair(keyPair)).not.toBeNull();
});

test("createAccount", async () => {
  const { address, txHash } = await createAccount();
  expect(address).not.toBeNull();
  expect(txHash).not.toBeNull();
});

test("createSignature", async () => {
  expect(await createSignature()).toBe("");
});

test("createSendETHTransferTransaction", async () => {
  expect(await createSendETHTransferTransaction()).toBe("");
});

test("getTransactionHistory", async () => {
  expect(await getTransactionHistory()).toBe("");
});
