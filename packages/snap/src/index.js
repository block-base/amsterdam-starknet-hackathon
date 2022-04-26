import { getAddress } from "../rpc/getAddress";
import { getStarkKey } from "../rpc/getStarkKey";
import { getPrivateKey } from "../rpc/getPrivateKey";
import { createAccount } from "../rpc/createAccount";

wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  switch (requestObject.method) {
    case "get_private_key":
      return await getPrivateKey();
    case "get_stark_key":
      return await getStarkKey();
    case "create_account":
      return await createAccount();
    case "get_address":
      return await getAddress();
    default:
      throw new Error("Method not found.");
  }
});
