import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useNxmContract } from './useContract'
import { useActiveWeb3React } from './index'
import { 
  NETWORK_WNXM_CONTRACT_ADDRESS,
  NXM_TOKEN_DECIMALS
} from '../constants'

const { BigNumber } = ethers

export const useNxm = () => {
  const { account, chainId } = useActiveWeb3React()
  const nxmContract = useNxmContract()

  const [allowance, setAllowance] = useState(BigNumber.from(0))
  const [balance, setBalance] = useState({ 
    rawBalance: 0,
    parsedBalance: 0.0,
    displayBalance: '--',
   })
  const [isWhitelisted, setWhitelisted] = useState(false)

  const fetchAllowance = useCallback(async () => {
    if (account) {
      try {
        const allowance = await nxmContract?.allowance(
          account,
          NETWORK_WNXM_CONTRACT_ADDRESS[chainId]
        )
        setAllowance(BigNumber.from(allowance))
      } catch(err) {
        setAllowance(BigNumber.from(0))
      }
    }
  }, [account, nxmContract])

  const fetchWhitelisted = useCallback(async () => {
    if (account) {
      try {
        const whitelisted = await nxmContract.whiteListed(account)
        setWhitelisted(whitelisted)
      } catch(err) {
        setWhitelisted(false)
      }
    }
  })

  const fetchBalance = useCallback(async () => {
    if (account) {
      try {
        const balance = await nxmContract.balanceOf(account)
        setBalance({
          rawBalance: balance,
          parsedBalance: ethers.utils.formatUnits(balance),
          displayBalance: (+ethers.utils.formatUnits(balance)).toFixed(6),
        })
      } catch (err) {
        setBalance({
          rawBalance: 0,
          parsedBalance: 0.0,
          displayBalance: '--',
        })
      }
    }
  })

  useEffect(() => {
    if (account && nxmContract) {
      fetchAllowance()
      fetchWhitelisted()
      fetchBalance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, nxmContract, fetchAllowance])

  const approve = useCallback(async () => {
    try {
      const tx = await nxmContract.approve(
        NETWORK_WNXM_CONTRACT_ADDRESS[chainId],
        ethers.constants.MaxUint256.toString()
      )
      return tx
    } catch (err) {
      throw err
    }
  })

  return { allowance, balance, isWhitelisted, approve }
}