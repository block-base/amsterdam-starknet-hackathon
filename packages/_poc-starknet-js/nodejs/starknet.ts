import { ec as EC } from "elliptic";
import fs from "fs";
import path from "path";
import * as starknet from "starknet";

export const createKeyPair = () => {
  return starknet.ec.genKeyPair();
};

export const getPublicStarkKeyFromKeyPair = (keyPair: EC.KeyPair) => {
  return starknet.ec.getStarkKey(keyPair);
};

export const createAccount = async (): Promise<{
  txHash: string;
  address: string;
}> => {
  const keyPair = createKeyPair();
  const starkKeyPair = getPublicStarkKeyFromKeyPair(keyPair);
  const compiledArgentAccount = starknet.json.parse(
    fs.readFileSync(path.join(__dirname, "./ArgentAccount.json")).toString("ascii")
  );
  const accountResponse = await starknet.defaultProvider.deployContract({
    contract: compiledArgentAccount,
    addressSalt: starkKeyPair,
  });
  return {
    txHash: accountResponse.transaction_hash,
    address: accountResponse.address as string,
  };
};

export const createSignature = () => {
  return "";
};

export const createSendETHTransferTransaction = () => {
  return "";
};

export const getTransactionHistory = () => {
  return "";
};
