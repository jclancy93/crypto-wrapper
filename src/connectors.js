import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const POLLING_INTERVAL = 12000

const RPC_URLS= {
  1: process.env.REACT_APP_RPC_URL_1,
  42: process.env.REACT_APP_RPC_URL_42,
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

const rpc = process.env.REACT_APP_DEFAULT_CHAIN == 1 ? { 1: RPC_URLS[1] } : { 42: RPC_URLS[42] }
export const walletconnect = new WalletConnectConnector({
  rpc,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})
