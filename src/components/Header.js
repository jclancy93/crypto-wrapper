import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core'
import { Button } from "./Button";
import { Web3Modal } from "./Web3Modal";
import classnames from "classnames";
import { hidden } from "chalk";
import { injected } from "../connectors"

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
                } else {
                  deactivate()
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
      <div className={mobileMenuClass}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5 sm:px-6">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=HWiJa5c5Be&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">Tom Cook</div>
              <div className="text-sm font-medium text-gray-400">tom@example.com</div>
            </div>
            <button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          <div className="mt-3 px-2 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Your Profile</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Settings</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign out</a>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}