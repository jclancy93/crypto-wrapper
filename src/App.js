import React, { useState, useEffect } from "react"
import { ethers } from 'ethers'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers"
import { Body, Button, Image, Link, Stats, Tabs, Input, Steps, Web3Modal } from "./components"
import spinner from "./static/spinner.svg"
import arrowRight from "./static/arrow-right.svg"
import useNxmBalances from "./hooks/useNxmBalances"
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
  <div className="flex flex-nowrap content-between justify-around items-center mb-8 w-80 mx-auto">
    <h3 className="bg-gray-700 px-4 py-2 w-32 text-lg leading-6 font-medium text-gray-200 text-center inline border border-4 border-indigo-600 p-3 rounded-md">
      { selectedTab === "wrap" ? "NXM" : "wNXM" }
    </h3>
    <Image src={arrowRight} heigh="20" width="20" /> 
    <h3 className="bg-gray-700 px-4 py-2 w-32 text-lg leading-6 font-medium text-gray-200 text-center inline border border-4 border-indigo-600 p-3 rounded-md">
      { selectedTab === "wrap" ? "wNXM" : "NXM" }
    </h3>
</div>
)

const ButtonStates = ({ 
  active, 
  setModalOpen,
  error,
  setCurrentStep,
  currentStep,
  approve,
  setError,
  isWhitelisted,
  selectedTab,
  wrap,
  amount
}) => {
  const [isLoadingApproval, setLoadingApproval] = useState(false)
  const [isLoadingWrap, setLoadingWrap] = useState(false)

  if (!active) {
    return (
      <Button 
        variant="primary" 
        type="submit"
        size="lg"
        className="w-11/12 block flex justify-center align-centerpy-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
        onClick={() => {
          setModalOpen(true)
        }}
      >
        Connect Wallet
      </Button>
    )
  }
  if (active && selectedTab === 'wrap') {
    return (
      <>
        <Button 
          variant="primary" 
          type="submit"
          size="lg"
          className="w-5/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
          onClick={async () => {
            setLoadingApproval(true)
            try {
              const approval = await approve()
              setCurrentStep(1)
              setLoadingApproval(false)
            } catch (err) {
              console.log(err, 'approve failed')
              setError(err.message)
              setLoadingApproval(false)
            }
          }}
          disabled={currentStep === 1}
        >
          {isLoadingApproval ? <Image src={spinner} width="20" height="20" /> : 'Approve'}
        </Button>

        <Button 
          variant="primary" 
          type="submit"
          size="lg"
          className="w-5/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
          onClick={async () => {
            console.log('wrap called')
            try {
              const tx = await wrap(
                ethers.utils.parseEther(amount.toString())
              )
              setCurrentStep(2)
              setLoadingApproval(false)
            } catch (err) {
              console.log(err, 'wrap failed')
              setError(err.message)
              setLoadingApproval(false)
            }
          }}
          disabled={currentStep === 0}
        >
          {isLoadingWrap ? <Image src={spinner} width="20" height="20" /> : 'Wrap'}
        </Button>
      </>
    )
  }
  if (active && selectedTab === 'unwrap' && !isWhitelisted) {
    return (
      <Button 
        disabled
        variant="primary"
        type="submit"
        size="lg"
        className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold">
        KYC Needed to Unwrap
      </Button>
    )
  }
  return (
      <>
        <Button 
          variant="primary" 
          type="submit"
          size="lg"
          className="w-5/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
          onClick={async () => {
            setLoadingApproval(true)
            try {
              const approval = await approve()
              setCurrentStep(1)
              setLoadingApproval(false)
            } catch (err) {
              console.log(err, 'approve failed')
              setError(err.message)
              setLoadingApproval(false)
            }
          }}
          disabled={currentStep === 1}
        >
          {isLoadingApproval ? <Image src={spinner} width="20" height="20" /> : 'Approve'}
        </Button>

        <Button 
          variant="primary" 
          type="submit"
          size="lg"
          className="w-5/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
          onClick={async () => {
            setLoadingApproval(true)
          }}
          disabled={currentStep === 0}
        >
          {isLoadingWrap ? <Image src={spinner} width="20" height="20" /> : 'Unwrap'}
        </Button>
      </>
  )
}

const App = () => {
  const { account, provider, activate, library, connector, active } = useWeb3React()
  const [selectedTab, setSelectedTab] = useState("wrap");
  const [amount, setAmount] = useState('')
  const [error, setError] = useState(undefined)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isModalOpen, setModalOpen] = useState(false)
  const resetInputAndSetTab = (tab) => {
    setAmount(0.0)
    setSelectedTab(tab)
  }

  const { allowance, isWhitelisted, approve, balance } = useNxm()
  const { wrap } = useWnxm() 

  return (
    <>
      {isModalOpen && <Web3Modal setOpen={setModalOpen} /> }
      <div className="box-content pt-2 pb-4 bg-gray-900 h-full md:h-5/6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-64">
          <Stats />
          <div className="bg-gray-800 overflow-hidden shadow rounded-md w100">
            <Tabs selectedTab={selectedTab} setSelectedTab={resetInputAndSetTab}/>
            <div className="bg-gray-800 px-4 py-5 border-b border-gray-900 sm:px-6">
              <TokenDirection selectedTab={selectedTab} />
              <div className="w-full flex flex-wrap justify-center">
                <Input 
                  placeholder="0.0" 
                  error={error}
                  disabled={!active}
                  type="number"
                  className="w-11/12 block mb-16"
                  name={selectedTab === 'wrap' ? 'wrap_amount' : 'unwrap_amount'}
                  label={selectedTab === 'wrap' ? 'Amount to Wrap' : 'Amount to Unwrap'}
                  value={amount}
                  onChange={(e) => {
                    validateForm(amount, 100, setError)
                    setAmount(e.target.value)
                  }}
                  icon={
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-50 inline-block">
                      <span 
                        className="h-5 w-10 text-gray-400 hover:underline cursor-pointer" 
                        onClick={
                          () => selectedTab === 'wrap' 
                            ? setAmount(+balance.parsedBalance) 
                            : setAmount(100)}
                      >
                        Max
                      </span>
                    </div>
                  }
                />
                <ButtonStates 
                  active={active}
                  setModalOpen={setModalOpen}
                  error={error}
                  setCurrentStep={setCurrentStep}
                  currentStep={currentStep}
                  approve={approve}
                  setError={setError}
                  selectedTab={selectedTab}
                  isWhitelisted={isWhitelisted}
                  wrap={wrap}
                  amount={amount}
                />
              </div>
              {(active && (allowance == 0 || allowance < amount)) && <Steps names={['Approve', 'Wrap']} currentIndex={currentStep} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App