import {getAddress} from "../rpc/getAddress"
import {getBalance} from "../rpc/getBalance"
import {getStarkKey} from "../rpc/getStarkKey"
import {getPriKey} from "../rpc/getPriKey"

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${originString}!`,
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });
    case 'get_wallet_address':
      return await getAddress();
    case 'get_stark_key':
      return await getStarkKey();
    case 'get_balance':
      return await getBalance();
    case 'get_private_key':
      return await getPriKey();
    default:
      throw new Error('Method not found.');
  }
});
