import { deriveBIP44AddressKey } from "@metamask/key-tree";
import { ethers } from "ethers";
import { getStarkKey } from "./getStarkKey";

export const getPrivateKey = async () => {
  await wallet.request({
    method: "snap_confirm",
    params: [
      {
        prompt: "Enable StarkNet Adapter",
        description: "StarkMask: Connect",
        textAreaContent: "This enables you to use Metamask for StarkNet!",
      },
    ],
  });
  const derivationPath = "m/44'/9004'/0'/0/0";
  const [, , coinType, account, change, addressIndex] = derivationPath.split("/");
  const bip44Code = coinType.replace("'", "");
  const bip44Node = await wallet.request({
    method: `snap_getBip44Entropy_${bip44Code}`,
    params: [],
  });
  const extendedPrivateKey = deriveBIP44AddressKey(bip44Node, {
    account: parseInt(account),
    address_index: parseInt(addressIndex),
    change: parseInt(change),
  });
  const starkKey = await getStarkKey();
  const { publicKey, privateKey } = new ethers.utils.SigningKey(extendedPrivateKey);
  return { publicKey, privateKey, starkKey };
};
