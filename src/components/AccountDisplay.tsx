import { usePrivy, useWallets } from "@privy-io/react-auth";
import { truncateAddress } from "../utils/helpers";
import { useAccount } from "wagmi";
import CopyIcon from "../assets/icons/copy.svg";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useState } from "react";
import { useSetActiveWallet } from "@privy-io/wagmi";

export const AccountDisplay = () => {
  const { ready, authenticated, exportWallet } = usePrivy();
  const { address } = useAccount();
  const { wallets, ready: walletsReady } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [showAlert, setShowAlert] = useState<string | null>();

  const disconnected = !wallets.length && (!ready || !authenticated);
  const onlyPrivyDisconnected =
    wallets.length && address && (!ready || !authenticated);

  console.log("wallets", wallets);

  const handleCopy = (textToCopy: string) => {
    copyToClipboard(textToCopy).then((success) => {
      if (success) {
        console.log(`Text "${textToCopy}" copied to clipboard successfully.`);
        setShowAlert(copiedText);
        setTimeout(() => {
          setShowAlert(null);
        }, 2500);
      } else {
        console.error("Failed to copy text to clipboard.");
      }
    });
  };

  if (disconnected) return null;

  if (onlyPrivyDisconnected)
    return (
      <p className="text-xs text-yellow-500">
        *Your injected address {truncateAddress(address)} is still connected to
        Wee Yeet. Disconnect manually in your wallet.
      </p>
    );

  return (
    <>
      {address && (
        <div className="w-full flex flex-col gap-1 justify-center items-center">
          <div className="divider divider-primary">
            <p className="text-xs font-bold">Active Account</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold">{truncateAddress(address)}</p>
            <img
              src={CopyIcon}
              width="20"
              className="hover:cursor-pointer"
              onClick={() => handleCopy(address)}
            />
          </div>
        </div>
      )}

      {showAlert && (
        <div className="toast toast-middle toast-center">
          <div className="alert alert-success bg-accent p-2">
            <span>Address copied</span>
          </div>
        </div>
      )}

      {walletsReady && wallets.length > 0 && (
        <div className="flex flex-col gap-1 justify-center items-center w-full">
          <div className="divider divider-primary">
            <p className="text-xs font-bold">Connected Accounts</p>
          </div>

          {wallets.map((wallet) => {
            return (
              <div key={wallet.address} className="mb-3">
                <div className="flex flex-col items-center">
                  <div>
                    <div className="flex flex-row gap-1  items-center">
                      <p className="text-sm font-bold mr-2">
                        {wallet.meta.name}{" "}
                      </p>
                      <p className="text-sm">
                        {truncateAddress(wallet.address)}{" "}
                      </p>
                      <img
                        src={CopyIcon}
                        width="14"
                        className="hover:cursor-pointer"
                        onClick={() => handleCopy(wallet.address)}
                      />
                    </div>
                    <button
                      className="btn btn-xs btn-accent ml-2"
                      disabled={address == wallet.address}
                      onClick={() => {
                        setActiveWallet(wallet);
                      }}
                    >
                      {address == wallet.address ? "Is Active" : "Make Active"}
                    </button>
                    {wallet.connectorType === "embedded" &&
                      wallet.walletClientType === "privy" && (
                        <button
                          className="btn btn-xs btn-neutral ml-2"
                          onClick={() => {
                            exportWallet();
                          }}
                        >
                          Export Private Key
                        </button>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
