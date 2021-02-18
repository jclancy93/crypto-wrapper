import { useCallback, useEffect, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { abis } from "@project/contracts";


function useNxmBalances() {
  const [balances, setBalances] = useState({
    nxm: "--",
    wnxm: "--"
  })

  const getBalances = useCallback(
    async (provider, account) => {
      if (!provider) return
      const wNXMToken = new Contract("0x0d438f3b5175bebc262bf23753c1e53d03432bde", abis.erc20, provider);
      const nxmToken = new Contract("0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3b", abis.erc20, provider);
      const wNXMBalance = await wNXMToken.balanceOf(account);
      const nxmBalance = await nxmToken.balanceOf(account);
      setBalances({
        nxm: (nxmBalance / 10 ** 18).toFixed(6),
        wnxm: (wNXMBalance / 10 ** 18).toFixed(6),
        nxmBalanceRaw: nxmBalance,
        wnxmBalanceRaw: wNXMBalance,
        nxmFull: nxmBalance / 10 ** 18,
        wnxmFull: wNXMBalance / 10 ** 18,
      })
  }, [])

  return { balances, getBalances }
}

export default useNxmBalances;
