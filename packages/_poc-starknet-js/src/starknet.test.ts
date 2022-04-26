import { createKeyPair, createAccount, deployERC20, mintERC20, getStarkKey, wait } from "./starknet";

test("createKeyPair", async () => {
  const keyPair = await createKeyPair();
  expect(keyPair).not.toBeNull();
});

test("getStarkKey", async () => {
  const keyPair = createKeyPair();
  const starkKey = getStarkKey(keyPair);
  expect(starkKey).not.toBeNull();
});

test("createAccount", async () => {
  const keyPair = createKeyPair();
  const { deployAcountTxHash, initializeTxHash, accountAddress } = await createAccount(keyPair);
  await wait(deployAcountTxHash);
  await wait(initializeTxHash);
  expect(accountAddress).not.toBeNull();
});

test("getAddress", async () => {
  const address = getAddress();
  expect(address).not.toBeNull();
});

test("getTransferLogs", async () => {
  const address = getAddress();
  const transferLogs = getTransferLogs(address);
  expect(transferLogs).not.toBeNull();
});

test("deployERC20", async () => {
  const keyPair = createKeyPair();
  const { deployERC20TxHash, erc20Address } = await deployERC20(keyPair);
  expect(deployERC20TxHash).not.toBeNull();
  expect(erc20Address).not.toBeNull();
});

test.only("mint", async () => {
  const keyPair = createKeyPair();
  const { deployAcountTxHash, initializeTxHash, accountAddress } = await createAccount(keyPair);
  await wait(deployAcountTxHash);
  await wait(initializeTxHash);
  const { deployERC20TxHash, erc20Address } = await deployERC20(keyPair);
  await wait(deployERC20TxHash);
  const mintingAmountInNumber = 1000;
  const mintingAmount = mintingAmountInNumber.toString();
  const { mintERC20TxHash } = await mintERC20(erc20Address, accountAddress, mintingAmount);
  await wait(mintERC20TxHash);
  expect(mintERC20TxHash).not.toBeNull();
});
