import { useState } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Button, Image } from "../components"
import { useNxm } from "../hooks/useNxm"
import { useWnxm } from "../hooks/useWnxm"
import spinner from "../static/spinner.svg"

export const ButtonStates = ({ amount, selectedTab, currentStep, setCurrentStep, setModalOpen }) => {
  const { active } = useWeb3React()
  const { 
    isWhitelisted, 
    approve: approveNxm,
    balance: nxmBalance, 
    allowance: nxmAllowance 
  } = useNxm()
  const { 
    wrap,
    unwrap,
    approve: approveWnxm,
    balance: wNxmBalance,
    allowance: wNxmAllowance
  } = useWnxm()
  const [isLoadingApproval, setLoadingApproval] = useState(false)
  const [isLoadingWrap, setLoadingWrap] = useState(false)

  if (!active) {
    return (
      <Button 
        variant="primary" 
        type="submit"
        size="lg"
        className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
        onClick={() => {
          setModalOpen(true)
        }}
      >
        Connect Wallet
      </Button>
    )
  }

  // WRAP TAB
  if (selectedTab === 'wrap') {
    // Enter Amount
    if (+amount === 0) {
      return (
        <Button 
          disabled
          variant="primary"
          type="submit"
          size="lg"
          className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold">
          Enter Amount
        </Button>
      )
    }
    // Approve -> Wrap
    if (amount > 0 && amount <= nxmBalance.parsedBalance && +nxmAllowance.parsedAllowance === 0) {
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
                const approval = await approveNxm()
                await approval.wait(1)
                setCurrentStep(1)
                setLoadingApproval(false)
              } catch (err) {
                setLoadingApproval(false)
              }
            }}
            disabled={currentStep === 1 || isLoadingApproval === true}
          >
            {isLoadingApproval ? <Image src={spinner} width="20" height="20" /> : 'Approve'}
          </Button>

          <Button 
            variant="primary" 
            type="submit"
            size="lg"
            className="w-5/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
            onClick={async () => {
              try {
                const tx = await wrap(
                  ethers.utils.parseEther(amount.toString())
                )
                await tx.wait(1)
                setCurrentStep(2)
                setLoadingApproval(false)
              } catch (err) {
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
    // Wrap
    if (amount > 0 && +amount <= +nxmBalance.parsedBalance && +nxmAllowance.parsedAllowance >= +amount) {
      return (
        <Button 
          variant="primary" 
          type="submit"
          size="lg"
          className="w-11/12 block flex justify-center align-centerpy-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
          onClick={async () => {
              try {
                const tx = await wrap(
                  ethers.utils.parseEther(amount.toString())
                )
              } catch (err) {
                console.log(err)
              }
          }}
        >
          Wrap
        </Button>
      )
    }
    // Insufficient Balance
    if (+amount > +nxmBalance.parsedBalance) {
      return (
        <Button 
          disabled
          variant="primary"
          type="submit"
          size="lg"
          className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold">
          Insufficient Balance
        </Button> 
      )
    }

  // UNWRAP TAB
  } else {
    if (!isWhitelisted) {
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
    } else {
      // Enter Amount
      if (+amount === 0) {
        return (
          <Button 
            disabled
            variant="primary"
            type="submit"
            size="lg"
            className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold">
            Enter Amount
          </Button>
        )
      }
      // Approve/unwrap
      if (+amount > 0 && +amount <= +wNxmBalance.parsedBalance && +wNxmAllowance.parsedAllowance <= +amount) {
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
                  const approval = await approveWnxm()
                  await approval.wait(1)
                  setCurrentStep(1)
                  setLoadingApproval(false)
                } catch (err) {
                  setLoadingApproval(false)
                }
              }}
              disabled={currentStep === 1 || isLoadingApproval === true}
            >
              {isLoadingApproval ? <Image src={spinner} width="20" height="20" /> : 'Approve'}
            </Button>

            <Button 
              variant="primary" 
              type="submit"
              size="lg"
              className="w-5/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
              onClick={async () => {
                try {
                  const tx = await unwrap(
                    ethers.utils.parseEther(amount.toString())
                  )
                  setCurrentStep(2)
                  setLoadingApproval(false)
                } catch (err) {
                  setLoadingApproval(false)
                }
              }}
              disabled={currentStep === 0}
            >
              {isLoadingWrap ? <Image src={spinner} width="20" height="20" /> : 'Unwrap'}
            </Button>
          </>
        )
      }
      // unwrap
      if (+amount > 0 && amount <= +wNxmBalance.parsedBalance && +wNxmAllowance.parsedAllowance >= +amount) {
        return (
          <Button 
            variant="primary" 
            type="submit"
            size="lg"
            className="w-11/12 block flex justify-center align-centerpy-3 mx-auto rounded-md shadow-sm text-2xl text-bold" 
            onClick={async () => {
              try {
                const tx = await unwrap(
                  ethers.utils.parseEther(amount.toString())
                )
              } catch (err) {
                console.log(err)
              }
            }}
          >
            Unwrap
          </Button>
        )
      }
      // insufficient balance
      if (+amount > +wNxmBalance) {
        return (
          <Button 
            disabled
            variant="primary"
            type="submit"
            size="lg"
            className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold">
            Insufficient Balance
          </Button> 
        )
      }
    }
  }

  return <h1>Test</h1>
}