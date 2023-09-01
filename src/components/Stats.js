import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useNxm } from "../hooks/useNxm";
import { useWnxm } from "../hooks/useWnxm";
import nxm from "../static/nxm.svg";
import wNxm from "../static/wnxm.svg";

const Stat = ({ name, value, icon }) => {
  return (
    <div className="flex flex-col bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="flex-grow px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <img src={icon} className="h-8" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-400 truncate">
              {name}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-200">
                {value}
              </div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Stats = () => {
  const { account } = useWeb3React();
  const { balance: nxmBalance } = useNxm();
  const { balance: wNxmBalance } = useWnxm();

  return (
    <div className="mb-4">
      <dl className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
        <Stat
          name="NXM Balance"
          value={account ? nxmBalance?.displayBalance : "--"}
          icon={nxm}
        />
        <Stat
          name="wNXM Balance"
          value={account ? wNxmBalance?.displayBalance : "--"}
          icon={wNxm}
        />
      </dl>
    </div>
  );
};
