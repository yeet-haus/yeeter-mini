import { useEffect } from "react";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useChainId, useSwitchChain } from "wagmi";

import LoginIcon from "../assets/icons/login.svg";
import { WAGMI_CHAIN_OBJS } from "../utils/constants";

// if not connected

export const LoginModalSwitch = ({
  targetChainId,
}: {
  targetChainId: string;
}) => {
  const { ready, authenticated } = usePrivy();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount
    ) => {
      console.log(
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        linkedAccount
      );

      if (!wasAlreadyAuthenticated) {
        // @ts-expect-error fix unknown
        document.getElementById("yeet-modal").showModal();
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

  console.log("ready", authenticated);

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
  // console.log("chainid", chainId);
  // console.log("chains", chains);

  const handleLogin = () => {
    // document.getElementById("yeet-modal").hideModal();
    login();
  };

  if (ready && authenticated) return;

  return (
    <>
      <form method="dialog">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handleLogin()}
        >
          <img src={LoginIcon} width="18" />
          Login
        </button>
      </form>
    </>
  );
};
