import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'

const POLLING_INTERVAL = 12000

const RPC_URLS= {
  1: process.env.RPC_URL_1,
  4: process.env.RPC_URL_4,
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

// export const network = new NetworkConnector({
//   urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
//   defaultChainId: 1
// })
