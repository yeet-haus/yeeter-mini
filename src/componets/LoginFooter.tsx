import { usePrivy } from "@privy-io/react-auth";

import User from "../assets/icons/user.svg";
import LoginIcon from "../assets/icons/login.svg";
import LogoutIcon from "../assets/icons/logout.svg";

export const LoginFooter = () => {
  const { ready, authenticated, logout, login } = usePrivy();

  if (ready && authenticated)
    return (
      <div className="flex flex-row gap-3" onClick={() => logout()}>
        <img src={User} width="32" />

        <div className="flex flex-row">
          <img src={LogoutIcon} width="18" />
          <span className="text-xs text-base-100">logout</span>
        </div>
      </div>
    );

  return (
    <div className="flex flex-row gap-0" onClick={() => login()}>
      <img src={LoginIcon} width="32" />
      <span className="text-xs text-base-100">login</span>
    </div>
  );
};
