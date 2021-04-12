import React, { useState, useEffect } from "react"
import { ethers } from 'ethers'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers"
import { Body, Button, Image, Link, Stats, Tabs, Input, Steps, Web3Modal } from "./components"
import { ButtonStates } from "./scenes/ButtonStates"
import arrowRight from "./static/arrow-right.svg"
import nxm from "./static/nxm.svg"
import wNxm from "./static/wnxm.svg"
import { useNxm } from "./hooks/useNxm"
import { useWnxm } from "./hooks/useWnxm"

const { BigNumber } = ethers

const validateForm = async (value, maxBalance, setError) => {
  if (value > maxBalance) setError("Amount greater than max balance")
  if (value < 0) setError("Amount less than zero")
  if (isNaN(value)) setError("Input is not a number")
  else setError(undefined)
}

const TokenDirection = ({ selectedTab }) => (
  <div className="flex flex-nowrap content-between justify-around items-center mb-14 mt-4 w-72 sm:w-96 mx-auto">
    <h3 
      className="flex flex-col items-center bg-gray-700 px-2 py-1 w-24 sm:px-4 sm:py-2 sm:w-32 text-lg leading-6 font-medium text-gray-200 text-center inline border border-4 border-gray-200 p-3 rounded-md"
      style={selectedTab === 'wrap' ? { order: 1 } : {order: 3}}
    >
      <Image src={nxm} className="mb-2 mt-2 h-6 sm:mb-6 sm:mt-5 sm:h-11" />
        NXM
    </h3>
    <Image src={arrowRight} heigh="36" width="36" style={{ order: 2 }}/> 
    <h3 
      className="flex flex-col items-center bg-gray-700 px-2 py-1 w-24 sm:px-4 sm:py-2 sm:w-32 text-lg leading-6 font-medium text-gray-200 text-center inline border border-4 border-gray-200 p-3 rounded-md"
      style={selectedTab === 'wrap' ? { order: 3 } : { order: 1 }}
    >
      <Image src={wNxm} className="mb-2 mt-2 h-6 sm:mb-6 sm:mt-5 sm:h-11" />
      wNXM
    </h3>
</div>
)

const App = () => {
  const { account, provider, activate, library, connector, active } = useWeb3React()
  const [selectedTab, setSelectedTab] = useState("wrap");
  const [amount, setAmount] = useState(0)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isModalOpen, setModalOpen] = useState(false)
  const resetInputAndSetTab = (tab) => {
    setAmount(0.0)
    setSelectedTab(tab)
  }

  const { allowance: nxmAllowance, isWhitelisted, approve, balance: nxmBalance } = useNxm()
  const { allowance: wNxmAllowance, wrap, balance: wNxmBalance } = useWnxm() 

  return (
    <>
      {isModalOpen && <Web3Modal setOpen={setModalOpen} /> }
      <div className="pt-2 pb-4 bg-gray-900 h-auto" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-64">
          <Stats />
          <div className="bg-gray-800 overflow-hidden shadow rounded-md w100">
            <Tabs selectedTab={selectedTab} setSelectedTab={resetInputAndSetTab}/>
            <div className="bg-gray-800 px-4 py-5 border-b border-gray-900 sm:px-6">
              <TokenDirection selectedTab={selectedTab} />
              <div className="w-full flex flex-wrap justify-center">
                <Input 
                  placeholder="0.0" 
                  disabled={!active}
                  type="number"
                  className="w-11/12 block mb-16"
                  name={selectedTab === 'wrap' ? 'wrap_amount' : 'unwrap_amount'}
                  label={selectedTab === 'wrap' ? 'Amount to Wrap' : 'Amount to Unwrap'}
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                  }}
                  icon={
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-50 inline-block">
                      <span 
                        className="h-5 w-10 text-gray-400 hover:underline cursor-pointer" 
                        onClick={
                          () => selectedTab === 'wrap' 
                            ? setAmount(nxmBalance.parsedBalance) 
                            : setAmount(wNxmBalance.parsedBalance)}
                      >
                        Max
                      </span>
                    </div>
                  }
                />
                <ButtonStates 
                  amount={amount}
                  selectedTab={selectedTab}
                  setModalOpen={setModalOpen}
                />
              </div>
              {selectedTab === 'wrap' ? (
                <>
                  {(active && (nxmAllowance.parsedAllowance == 0 || +nxmAllowance.parsedAllowance <= +amount) && +nxmAllowance.parsedAllowance !== -1 && +amount > 0 && +amount <= +nxmBalance.parsedBalance) 
                    && <Steps names={['Approve', 'Wrap']} currentIndex={currentStep} />}
                </>
              ) : null }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App