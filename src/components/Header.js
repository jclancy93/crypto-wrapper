import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { Button } from "./Button";
import { Web3Modal } from "./Web3Modal";
import { WalletConnect as WalletConnectConnector } from "@web3-react/walletconnect-v2";
import SettingsMenu from "../components/SettingsMenu";

export const Header = () => {
  const { deactivate, connector, account } = useWeb3React();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && <Web3Modal setOpen={setModalOpen} />}
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="block lg:hidden h-8 w-auto text-2xl">🎁</span>
                <span className="hidden lg:block h-8 w-auto text-2xl text-white">
                  🎁 <span className="ml-2">Nexus Wrapper</span>
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  disabled={false}
                  onClick={() => {
                    if (!account) {
                      setModalOpen(true);
                    }

                    if (connector?.deactivate) {
                      void connector.deactivate();
                    } else {
                      void connector.resetState();
                    }
                  }}
                >
                  {!account ? "Connect Wallet" : "Disconnect Wallet"}
                </Button>
              </div>
              <div className="ml-4 md:flex-shrink-0 md:flex md:items-center">
                <SettingsMenu />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
