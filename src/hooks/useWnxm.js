import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWnxmContract } from "./useContract";
import { useActiveWeb3React } from "./index";
import { NETWORK_WNXM_CONTRACT_ADDRESS } from "../constants";

const { BigNumber } = ethers;

export const useWnxm = () => {
  const { account, chainId } = useActiveWeb3React();
  const wNxmContract = useWnxmContract();

  // Using -1 as an initial loading state for allowance
  const [allowance, setAllowance] = useState({
    rawAllowance: BigNumber.from(-1),
    parsedAllowance: -1,
  });
  const [allowanceLoading, setAllowanceLoading] = useState(false);
  const [balance, setBalance] = useState({
    rawBalance: 0,
    parsedBalance: 0.0,
    displayBalance: "--",
  });

  const fetchBalance = useCallback(async () => {
    if (account) {
      try {
        const balance = await wNxmContract.balanceOf(account);
        setBalance({
          rawBalance: balance,
          parsedBalance: ethers.utils.formatUnits(balance),
          displayBalance: (+ethers.utils.formatUnits(balance)).toFixed(6),
        });
      } catch (err) {
        console.log(err, "err fetching wnxm balance");
        setBalance({
          rawBalance: 0,
          parsedBalance: 0.0,
          displayBalance: "--",
        });
      }
    }
  });

  const fetchAllowance = useCallback(async () => {
    if (account) {
      try {
        const allowance = await wNxmContract?.allowance(
          account,
          NETWORK_WNXM_CONTRACT_ADDRESS[chainId]
        );
        setAllowance({
          rawAllowance: allowance,
          parsedAllowance: ethers.utils.formatUnits(allowance),
        });
      } catch (err) {
        setAllowance({
          rawAllowance: BigNumber.from(0),
          parsedAllowance: 0,
        });
      }
    }
  });

  useEffect(() => {
    if (account && wNxmContract) {
      fetchAllowance();
      fetchBalance();
    }
    const balanceRefreshInterval = setInterval(fetchBalance, 10000);
    const allowanceRefreshLoading = setInterval(fetchAllowance, 10000);

    return () => {
      clearInterval(balanceRefreshInterval);
      clearInterval(allowanceRefreshLoading);
    };
  }, [account, wNxmContract]);

  const approve = useCallback(async () => {
    try {
      const tx = await wNxmContract.approve(
        NETWORK_WNXM_CONTRACT_ADDRESS[chainId],
        ethers.constants.MaxUint256.toString()
      );
      return tx;
    } catch (err) {
      return err;
    }
  });

  const wrap = useCallback(async (amount) => {
    try {
      const tx = await wNxmContract.wrap(amount);
      return tx;
    } catch (err) {
      console.log("wrap fails", err);
      return err;
    }
  });

  const unwrap = useCallback(async (amount) => {
    try {
      const tx = await wNxmContract.unwrap(amount);
      return tx;
    } catch (err) {
      console.log("wrap fails", err);
      return err;
    }
  });

  return { allowance, balance, approve, wrap, unwrap };
};
