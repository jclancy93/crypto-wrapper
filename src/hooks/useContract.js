import { useMemo } from "react";
import { useActiveWeb3React } from "./index";
import NXM_ABI from "../static/abis/nxm.json";
import WNXM_ABI from "../static/abis/wnxm.json";
import {
  NETWORK_NXM_CONTRACT_ADDRESS,
  NETWORK_WNXM_CONTRACT_ADDRESS,
} from "../constants";
import { getContract } from "../utils";
import { useWeb3React } from "@web3-react/core";

export function useContract(address, ABI, withSignerIfPossible = true) {
  const { provider, account } = useActiveWeb3React();
  console.log({ provider });

  return useMemo(() => {
    if (!address || !ABI || !provider) return null;
    try {
      return getContract(
        address,
        ABI,
        provider,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, provider, withSignerIfPossible, account]);
}

export function useNxmContract(withSignerIfPossible = true) {
  const { chainId } = useWeb3React();
  console.log(
    useContract(
      chainId && NETWORK_NXM_CONTRACT_ADDRESS[chainId],
      NXM_ABI,
      withSignerIfPossible
    ),
    "contract"
  );
  return useContract(
    chainId && NETWORK_NXM_CONTRACT_ADDRESS[chainId],
    NXM_ABI,
    withSignerIfPossible
  );
}

export function useWnxmContract(withSignerIfPossible = true) {
  const { chainId } = useWeb3React();
  return useContract(
    chainId && NETWORK_WNXM_CONTRACT_ADDRESS[chainId],
    WNXM_ABI,
    withSignerIfPossible
  );
}
