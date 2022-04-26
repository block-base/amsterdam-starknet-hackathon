// import * as starknet from "starknet";
import { getAddress } from "./getAddress";

export async function createAccount() {
  await wallet.request({
    method: "snap_confirm",
    params: [
      {
        prompt: "Deploy StarkNet Account",
        description: "StarkMask: Account",
        textAreaContent: "This enables you to use Metamask for managing StarkNet Account!",
      },
    ],
  });
  // We had connection issue between metamask snap to StarkNet, so hardcoded the account for demo
  // return starknet.ec.genKeyPair();
  // const starkKey = getStarkKey(keyPair);
  // const compiledArgentAccount = starknet.json.parse(
  //   fs.readFileSync(path.join(__dirname, "./ArgentAccount.json")).toString("ascii")
  // );
  // const { transaction_hash: deployAcountTxHash, address } = await starknet.defaultProvider.deployContract({
  //   contract: compiledArgentAccount,
  //   addressSalt: starkKey,
  // });
  // const accountAddress = address as string;
  // console.log(accountAddress);
  // const accountContract = new starknet.Contract(compiledArgentAccount.abi, accountAddress);
  // const { transaction_hash: initializeTxHash } = await accountContract.initialize(starkKey, "0");
  return getAddress();
}
