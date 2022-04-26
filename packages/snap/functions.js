const connect = async() => {
    await ethereum.request({
        method: 'wallet_enable',
        params: [{
          wallet_snap: { [snapId]: {} },
        }]
    })
}

const walletInvokeSnap = async(method) => {
    try {
        const response = await ethereum.request({
          method: 'wallet_invokeSnap',
          params: [snapId, {
            method,
          }]
        })
        console.log(response)
      } catch (err) {
        console.error(err)
        alert('Problem happened: ' + err.message || err)
      }
}

const send = async() => {
    walletInvokeSnap("hello")
}
const getAddress = async () => {
    walletInvokeSnap("get_wallet_address")
}
const getStarkKey = async () => {
    walletInvokeSnap("get_stark_key")
}
const getBalance = async () => {
    walletInvokeSnap("get_balance")
}

const getPriKey = async () => {
    walletInvokeSnap("get_private_key")
}