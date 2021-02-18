import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core'
import { getDefaultProvider } from "@ethersproject/providers";
import { addresses, abis } from "@project/contracts";
import { useNxm } from "../hooks/useNxm";
import { useWnxm } from "../hooks/useWnxm";

const Stat = ({ name, value, icon }) => {
  return (
    <div className="flex flex-col bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="flex-grow px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            { icon ? icon : (
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-400 truncate">
              {name}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-200">
               { value } 
              </div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Stats = () => {
  const { library, active, account } = useWeb3React()
  const { balance: nxmBalance } = useNxm()
  const { balance: wNxmBalance } = useWnxm()
  console.log(wNxmBalance, 'wrapped nxm balance here')


  return (
    <div className="mb-4">
      <dl className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
        <Stat name="NXM Balance" value={active ? nxmBalance?.displayBalance : '--'} />
        <Stat name="wNXM Balance" value={active ? wNxmBalance?.displayBalance : '--'} icon={
          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
        } />
      </dl>
    </div>
  )
}