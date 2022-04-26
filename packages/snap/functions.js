const connect = async () => {
  await ethereum.request({
    method: "wallet_enable",
    params: [
      {
        wallet_snap: { [snapId]: {} },
      },
    ],
  });
  const response = await walletInvokeSnap("get_private_key");
  console.log(response);
  document.getElementById("starkKey").innerHTML = "stark key: " + response.starkKey;
};

const walletInvokeSnap = async (method) => {
  try {
    const response = await ethereum.request({
      method: "wallet_invokeSnap",
      params: [
        snapId,
        {
          method,
        },
      ],
    });
    return response;
  } catch (err) {
    console.error(err);
    alert("Problem happened: " + err.message || err);
  }
};

const getStarkKey = async () => {
  walletInvokeSnap("get_stark_key");
};

const createAccount = async () => {
  const response = await walletInvokeSnap("create_account");
  console.log(response);
  document.getElementById("account").innerHTML = "created account: " + response;
};

const getAddress = async () => {
  walletInvokeSnap("get_address");
};

const mint = async () => {
  walletInvokeSnap("mint");
};

const transfer = async () => {
  walletInvokeSnap("transfer");
};
