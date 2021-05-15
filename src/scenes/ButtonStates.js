import { useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Button, Image, Link } from "../components";
import { useNxm } from "../hooks/useNxm";
import { useWnxm } from "../hooks/useWnxm";
import spinner from "../static/spinner.svg";
import { useMaxApproval } from "../context";

export const ButtonStates = ({
  amount,
  selectedTab,
  currentStep,
  setCurrentStep,
  setModalOpen,
}) => {
  const { active } = useWeb3React();
  const {
    isWhitelisted,
    approve: approveNxm,
    balance: nxmBalance,
    allowance: nxmAllowance,
  } = useNxm();
  const {
    wrap,
    unwrap,
    approve: approveWnxm,
    balance: wNxmBalance,
    allowance: wNxmAllowance,
  } = useWnxm();
  const [isLoadingApproval, setLoadingApproval] = useState(false);
  const [isLoadingWrap, setLoadingWrap] = useState(false);
  const {
    state: { maxApproval },
  } = useMaxApproval();

  if (!active) {
    return (
      <Button
        variant="primary"
        type="submit"
        size="lg"
        className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Connect Wallet
      </Button>
    );
  }

  if (+amount === 0) {
    return (
      <Button
        disabled
        variant="primary"
        type="submit"
        size="lg"
        className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
      >
        Enter Amount
      </Button>
    );
  }

  // WRAP TAB
  if (selectedTab === "wrap") {
    // Approve -> Wrap
    if (
      amount > 0 &&
      amount <= nxmBalance.parsedBalance &&
      +nxmAllowance.parsedAllowance === 0
    ) {
      return (
        <>
          <Button
            variant="primary"
            type="submit"
            size="lg"
            className="w-5/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
            onClick={async () => {
              setLoadingApproval(true);
              try {
                const approval = await approveNxm(
                  ethers.utils.parseEther(amount.toString())
                );
                await approval.wait(1);
                setCurrentStep(1);
                setLoadingApproval(false);
              } catch (err) {
                setLoadingApproval(false);
              }
            }}
            disabled={currentStep === 1 || isLoadingApproval === true}
          >
            {isLoadingApproval ? (
              <Image src={spinner} width="20" height="20" />
            ) : (
              "Approve"
            )}
          </Button>

          <Button
            variant="primary"
            type="submit"
            size="lg"
            className="w-5/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
            onClick={async () => {
              try {
                const tx = await wrap(
                  ethers.utils.parseEther(amount.toString())
                );
                await tx.wait(1);
                setCurrentStep(2);
                setLoadingApproval(false);
              } catch (err) {
                setLoadingApproval(false);
              }
            }}
            disabled={currentStep === 0 || +nxmAllowance.parsedAllowance === 0}
          >
            {isLoadingWrap ? (
              <Image src={spinner} width="20" height="20" />
            ) : (
              "Wrap"
            )}
          </Button>
        </>
      );
    }
    // Wrap
    if (
      amount > 0 &&
      +amount <= +nxmBalance.parsedBalance &&
      +nxmAllowance.parsedAllowance >= +amount
    ) {
      return (
        <Button
          variant="primary"
          type="submit"
          size="lg"
          className="w-11/12 block flex justify-center align-centerpy-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
          onClick={async () => {
            try {
              const tx = await wrap(ethers.utils.parseEther(amount.toString()));
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Wrap
        </Button>
      );
    }

    // Insufficient Balance
    if (+amount > +nxmBalance.parsedBalance) {
      return (
        <Button
          disabled
          variant="primary"
          type="submit"
          size="lg"
          className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
        >
          Insufficient Balance
        </Button>
      );
    }

    // UNWRAP TAB
  } else {
    if (!isWhitelisted) {
      return (
        <>
          <Button
            disabled
            variant="primary"
            type="submit"
            size="lg"
            className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
          >
            KYC Needed to Unwrap
          </Button>
          <span className="text-l my-5 text-gray-200">
            Please visit the{" "}
            <Link href="https://app.nexusmutual.io/membership">
              Nexus Mutual site
            </Link>{" "}
            to complete KYC
          </span>
        </>
      );
    }

    // unwrap
    if (+amount > 0 && amount <= +wNxmBalance.parsedBalance) {
      return (
        <Button
          variant="primary"
          type="submit"
          size="lg"
          className="w-11/12 block flex justify-center align-centerpy-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
          onClick={async () => {
            try {
              const tx = await unwrap(
                ethers.utils.parseEther(amount.toString())
              );
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Unwrap
        </Button>
      );
    }

    // insufficient balance
    if (+amount > +wNxmBalance.parsedBalance) {
      return (
        <Button
          disabled
          variant="primary"
          type="submit"
          size="lg"
          className="w-11/12 block flex justify-center align-center py-3 mx-auto rounded-md shadow-sm text-2xl text-bold"
        >
          Insufficient Balance
        </Button>
      );
    }
  }

  return <h1>Test</h1>;
};
