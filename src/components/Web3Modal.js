import React, { useRef, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button } from "./Button";
import { Image } from "./index";
import { injected, walletconnect } from "../connectors";
import metamaskIcon from "../static/metamask.png";
import walletConnect from "../static/walletConnect.svg";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, fn) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const Web3Modal = ({ setOpen }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setOpen(false));
  const { account, provider, connector } = useWeb3React();

  console.log({ account, provider, connector });

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block bg-gray-900 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          ref={wrapperRef}
        >
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-200"
                id="modal-headline"
              >
                Connect a Wallet
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  You need a Web3 wallet to interact with Wrapper. Please choose
                  a wallet you have installed.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                injected.activate(1);
                setOpen(false);
              }}
              className="w-full text-left py-3"
            >
              Metamask
              <Image src={metamaskIcon} className="ml-auto mx-2 h-8 w-8" />
            </Button>
          </div>
          <div className="mt-5 sm:mt-6">
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                walletconnect.activate(1);
                setOpen(false);
              }}
              className="w-full text-left py-3"
            >
              WalletConnect
              <Image src={walletConnect} className="ml-auto mx-2 h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
