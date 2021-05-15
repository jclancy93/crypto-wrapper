import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { Button } from "./Button";
import { Web3Modal } from "./Web3Modal";
import classnames from "classnames";
import { hidden } from "chalk";
import { injected } from "../connectors";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import SettingsMenu from "../components/SettingsMenu";

export const Header = () => {
  const {
    account,
    provider,
    activate,
    deactivate,
    connector,
    active,
  } = useWeb3React();
  const [isOpen, setOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const mobileMenuItemClass = classnames("h-6 w-6", {
    block: isOpen,
    hidden: !isOpen,
  });
  const mobileMenuItemClassReverse = classnames("h-6 w-6", {
    block: !isOpen,
    hidden: isOpen,
  });
  const mobileMenuClass = classnames("", {
    block: isOpen,
    hidden: !isOpen,
  });
  const dropdownClass = classnames(
    "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5",
    {
      block: isDropdownOpen,
      hidden: !isDropdownOpen,
    }
  );

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
                    if (!active) {
                      setModalOpen(true);
                      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
                      if (
                        connector instanceof WalletConnectConnector &&
                        connector.walletConnectProvider?.wc?.uri
                      ) {
                        connector.walletConnectProvider = undefined;
                      }
                    } else {
                      deactivate();
                      if (connector instanceof WalletConnectConnector) {
                        connector.close();
                      }
                    }
                  }}
                >
                  {!active ? "Connect Wallet" : "Disconnect Wallet"}
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
