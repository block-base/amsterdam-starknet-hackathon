// const bip44Node = await wallet.request({
//     method: `snap_getBip44Entropy_${bip44Code}`,
//     params: []
//   }) as JsonBIP44CoinTypeNode;
export const getPriKey = async () => {
   const responce = await wallet.request({
    method: 'snap_confirm',
    params: [
        {
        prompt: `Export Private Key`,
        description:
            'Do you want to export Private Key?',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });

    if (responce) {
        const derivationPath = "m/44'/461'/0'/0/0"
        const [, , coinType, account, change, addressIndex] = derivationPath.split('/');
        const bip44Code = coinType.replace("\'", "");
        return await wallet.request({
              method: `snap_getBip44Entropy_${bip44Code}`,
              params: []
          })
  }
};