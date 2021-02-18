import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useWnxmContract } from './useContract'
import { useActiveWeb3React } from './index'
import { 
  NETWORK_WNXM_CONTRACT_ADDRESS,
  NXM_TOKEN_DECIMALS
} from '../constants'

const { BigNumber } = ethers

export const useWnxm = () => {
  const { account, chainId } = useActiveWeb3React()
  const wNxmContract = useWnxmContract()

  const [allowance, setAllowance] = useState(BigNumber.from(0))
  const [balance, setBalance] = useState({ 
    rawBalance: 0,
    parsedBalance: 0.0,
    displayBalance: '--',
   })

  const fetchBalance = useCallback(async () => {
    if (account) {
      try {
        const balance = await wNxmContract.balanceOf(account)
        setBalance({
          rawBalance: balance,
          parsedBalance: ethers.utils.formatUnits(balance),
          displayBalance: (+ethers.utils.formatUnits(balance)).toFixed(6),
        })
      } catch (err) {
        console.log(err, 'err fetching wnxm balance')
       setBalance({
          rawBalance: 0,
          parsedBalance: 0.0,
          displayBalance: '--',
       }) 
      }
    }
  })

  useEffect(() => {
    if (account && wNxmContract) {
      // fetchAllowance()
      fetchBalance()
    }
  }, [account, wNxmContract])

  const approve = useCallback(async () => {
    try {
      const tx = await wNxmContract.approve(
        NETWORK_WNXM_CONTRACT_ADDRESS[chainId],
        ethers.constants.MaxUint256.toString()
      )
      return tx
    } catch (err) {
      return err
    }
  })

  const wrap = useCallback(async (amount) => {
    console.log('calling')
    try {
      const tx = await wNxmContract.wrap(amount)
      console.log(tx, 'here is tx')
      return tx
    } catch (err) {
      console.log('wrap fails', err)
      return err
    }
  })

  return { allowance, balance, approve, wrap }
}