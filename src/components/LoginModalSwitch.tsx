import { useEffect } from "react";
import { useChainId } from "wagmi";
import { usePrivy, useLogin, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";

import LoginIcon from "../assets/icons/login.svg";
import { WAGMI_CHAIN_OBJS } from "../utils/constants";

export const LoginModalSwitch = ({
  targetChainId,
  buttonClass,
  buttonLabel,
}: {
  targetChainId: string;
  buttonClass: string;
  buttonLabel: string;
}) => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const chainId = useChainId();
  const { login } = useLogin();

  useEffect(() => {
    if (
      ready &&
      authenticated &&
      chainId !== WAGMI_CHAIN_OBJS[targetChainId].id
    ) {
      const wallet = wallets[0];
      wallet.switchChain(WAGMI_CHAIN_OBJS[targetChainId].id);
    }
  }, [chainId, targetChainId, ready, authenticated, wallets]);

  const handleLogin = () => {
    login();
  };

  if (ready && authenticated) return;

  return (
    <>
      <button className={buttonClass} onClick={() => handleLogin()}>
        <img src={LoginIcon} width="18" />
        {buttonLabel}
      </button>
    </>
  );
};
