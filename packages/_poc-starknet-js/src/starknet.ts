import { ec as EC } from "elliptic";
import fs from "fs";
import path from "path";
import * as starknet from "starknet";

export const createKeyPair = () => {
  return starknet.ec.genKeyPair();
};

export const getStarkKey = (keyPair: EC.KeyPair) => {
  return starknet.ec.getStarkKey(keyPair);
};

export const createAccount = async (
  keyPair: EC.KeyPair
): Promise<{
  deployAcountTxHash: string;
  initializeTxHash: string;
  accountAddress: string;
}> => {
  const starkKey = getStarkKey(keyPair);
  const compiledArgentAccount = starknet.json.parse(
    fs.readFileSync(path.join(__dirname, "./ArgentAccount.json")).toString("ascii")
  );
  const { transaction_hash: deployAcountTxHash, address } = await starknet.defaultProvider.deployContract({
    contract: compiledArgentAccount,
    addressSalt: starkKey,
  });
  const accountAddress = address as string;
  const accountContract = new starknet.Contract(compiledArgentAccount.abi, accountAddress);
  const { transaction_hash: initializeTxHash } = await accountContract.initialize(starkKey, "0");
  return {
    deployAcountTxHash,
    initializeTxHash,
    accountAddress: accountAddress as string,
  };
};

export const deployERC20 = async (keyPair: EC.KeyPair) => {
  const starkKey = getStarkKey(keyPair);
  const compiledERC20 = starknet.json.parse(fs.readFileSync(path.join(__dirname, "./ERC20.json")).toString("ascii"));
  const { transaction_hash: deployERC20TxHash, address } = await starknet.defaultProvider.deployContract({
    contract: compiledERC20,
  });
  const erc20Address = address as string;
  return { deployERC20TxHash, erc20Address };
};

export const mintERC20 = async (erc20Address: string, to: string, amount: string) => {
  const compiledERC20 = starknet.json.parse(fs.readFileSync(path.join(__dirname, "./ERC20.json")).toString("ascii"));
  const erc20 = new starknet.Contract(compiledERC20.abi, erc20Address);
  const { transaction_hash: mintERC20TxHash } = await erc20.mint(to, amount);
  return { mintERC20TxHash };
};

export const wait = async (txHash: string) => {
  starknet.defaultProvider.waitForTransaction(txHash);
};
