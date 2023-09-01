import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

const [injected, injectedHooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);

const [walletconnect, walletconnectHooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "5ac624b55ae092d1e0b64df08acf3c2f",
        chains: [1],
        showQrModal: true,
      },
    })
);

export { injected, injectedHooks, walletconnect, walletconnectHooks };
