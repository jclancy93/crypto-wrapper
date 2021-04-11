import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core'
import { Button } from "./Button";
import { Web3Modal } from "./Web3Modal";
import classnames from "classnames";
import { hidden } from "chalk";
import { injected } from "../connectors"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const Header = () => {
  const { account, provider, activate, deactivate, connector, active } = useWeb3React()
  const [isOpen, setOpen] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const mobileMenuItemClass = classnames('h-6 w-6', {
    block: isOpen,
    hidden: !isOpen,
  })
  const mobileMenuItemClassReverse = classnames('h-6 w-6', {
    block: !isOpen,
    hidden: isOpen,
  })
  const mobileMenuClass = classnames('', {
    block: isOpen,
    hidden: !isOpen,
  })
  const dropdownClass = classnames('origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5', {
    block: isDropdownOpen,
    hidden: !isDropdownOpen,
  })


  return (
    <>
    {isModalOpen && <Web3Modal setOpen={setModalOpen} /> }
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="block lg:hidden h-8 w-auto text-2xl">🎁</span>
              <span className="hidden lg:block h-8 w-auto text-2xl text-white">
                🎁  <span className="ml-2">Nexus Wrapper</span>
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
                  setModalOpen(true)
                  // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
                  if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
                    connector.walletConnectProvider = undefined
                  }
                } else {
                  deactivate()
                  if (connector instanceof WalletConnectConnector) {
                    connector.close()
                  }
                }
              }}
            >
              {!active ? "Connect Wallet" : "Disconnect Wallet"}
            </Button>
            </div>
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}