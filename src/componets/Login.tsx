import { usePrivy } from "@privy-io/react-auth";

import User from "../assets/icons/user.svg";
import LoginIcon from "../assets/icons/login.svg";
import LogoutIcon from "../assets/icons/logout.svg";

export const Login = () => {
  const { ready, authenticated, logout, login } = usePrivy();

  if (ready && authenticated)
    return (
      <>
        <img src={User} width="32" />
        <button onClick={() => logout()}>
          <div className="flex flex-row">
            <img src={LogoutIcon} width="18" />
            <span className="text-xs text-accent">logout</span>
          </div>
        </button>
      </>
    );

  return (
    <>
      <img src={User} width="32" />
      <button onClick={() => login()}>
        <div className="flex flex-row">
          <img src={LoginIcon} width="32" />
          <span className="text-xs text-accent">login</span>
        </div>
      </button>
    </>
  );
};
