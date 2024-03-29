import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNxmContract } from "./useContract";
import { useActiveWeb3React } from "./index";
import { NETWORK_WNXM_CONTRACT_ADDRESS } from "../constants";
import { useMaxApproval } from "./../context";

const { BigNumber } = ethers;

export const useNxm = () => {
  const { account, chainId } = useActiveWeb3React();
  const nxmContract = useNxmContract();
  const {
    state: { maxApproval },
  } = useMaxApproval();

  const [allowance, setAllowance] = useState({
    rawAllowance: BigNumber.from(-1),
    parsedAllowance: -1,
  });
  const [balance, setBalance] = useState({
    rawBalance: 0,
    parsedBalance: 0.0,
    displayBalance: "--",
  });
  const [isWhitelisted, setWhitelisted] = useState(false);

  const fetchAllowance = useCallback(async () => {
    if (account) {
      try {
        const allowance = await nxmContract?.allowance(
          account,
          NETWORK_WNXM_CONTRACT_ADDRESS[chainId]
        );
        setAllowance({
          rawAllowance: allowance,
          parsedAllowance: ethers.utils.formatEther(allowance),
        });
      } catch (err) {
        console.log(err);
        setAllowance({
          rawAllowance: BigNumber.from(0),
          parsedAllowance: 0,
        });
      }
    }
  }, [account, nxmContract]);

  const fetchWhitelisted = useCallback(async () => {
    if (account) {
      try {
        const whitelisted = await nxmContract.whiteListed(account);
        setWhitelisted(whitelisted);
      } catch (err) {
        console.log(err);
        setWhitelisted(false);
      }
    }
  });

  const fetchBalance = useCallback(async () => {
    if (account) {
      try {
        const balance = await nxmContract.balanceOf(account);
        setBalance({
          rawBalance: balance,
          parsedBalance: ethers.utils.formatUnits(balance),
          displayBalance: (+ethers.utils.formatUnits(balance)).toFixed(6),
        });
      } catch (err) {
        console.log(err, "here");
        setBalance({
          rawBalance: 0,
          parsedBalance: 0.0,
          displayBalance: "--",
        });
      }
    }
  });

  useEffect(() => {
    if (account && nxmContract) {
      fetchAllowance();
      fetchWhitelisted();
      fetchBalance();
    }
    const balanceRefreshInterval = setInterval(fetchBalance, 10000);
    const allowanceRefreshLoading = setInterval(fetchAllowance, 10000);

    return () => {
      clearInterval(balanceRefreshInterval);
      clearInterval(allowanceRefreshLoading);
    };
  }, [account, nxmContract]);

  const approve = useCallback(async (amount = 0) => {
    try {
      const tx = await nxmContract.approve(
        NETWORK_WNXM_CONTRACT_ADDRESS[chainId],
        maxApproval ? ethers.constants.MaxUint256.toString() : amount
      );
      return tx;
    } catch (err) {
      throw err;
    }
  });

  return { allowance, balance, isWhitelisted, approve };
};
