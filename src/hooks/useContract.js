import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { useActiveWeb3React } from './index'
import NXM_ABI from '../static/abis/nxm.json'
import WNXM_ABI from '../static/abis/wnxm.json'
import { 
  NETWORK_NXM_CONTRACT_ADDRESS,
  NETWORK_WNXM_CONTRACT_ADDRESS
} from '../constants'
import { getContract } from '../utils'


export function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useNxmContract(withSignerIfPossible = true) {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && NETWORK_NXM_CONTRACT_ADDRESS[chainId],
    NXM_ABI,
    withSignerIfPossible,
  )
}

export function useWnxmContract(withSignerIfPossible = true) {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && NETWORK_WNXM_CONTRACT_ADDRESS[chainId],
    WNXM_ABI,
    withSignerIfPossible
  )
}