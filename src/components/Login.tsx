import { usePrivy } from "@privy-io/react-auth";

import User from "../assets/icons/user.svg";
import LoginIcon from "../assets/icons/login.svg";
import LogoutIcon from "../assets/icons/logout.svg";

export const Login = () => {
  const { ready, authenticated, login, logout } = usePrivy();

  return (
    <>
      <div className="flex flex-row">
        <img src={User} width="64" />
        {ready && authenticated ? (
          <span className="badge badge-info badge-sm"></span>
        ) : (
          <span className="badge badge-warning badge-sm"></span>
        )}
      </div>
      {ready && authenticated ? (
        <button className="btn" onClick={() => logout()}>
          <img src={LogoutIcon} width="24" />
          Logout
        </button>
      ) : (
        <button className="btn" onClick={() => login()}>
          <img src={LoginIcon} width="18" />
          Login
        </button>
      )}
    </>
  );
};
