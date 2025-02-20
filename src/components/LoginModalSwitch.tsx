import { useEffect } from "react";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useChainId, useSwitchChain } from "wagmi";

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
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { login } = useLogin();

  useEffect(() => {
    if (
      ready &&
      authenticated &&
      chainId !== WAGMI_CHAIN_OBJS[targetChainId].id
    ) {
      console.log("swiiiiitch");
      switchChain({ chainId: WAGMI_CHAIN_OBJS[targetChainId].id });
    }
  }, [chainId, targetChainId, ready, authenticated, switchChain]);

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
