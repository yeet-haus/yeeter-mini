import { usePrivy } from "@privy-io/react-auth";

import LoginIcon from "../assets/icons/login.svg";
import LogoutIcon from "../assets/icons/logout.svg";

export const Login = () => {
  const { ready, authenticated, logout, login, user } = usePrivy();

  console.log("user", user);

  if (ready && authenticated)
    return (
      <button className="btn btn-ghost" onClick={() => logout()}>
        <img src={LogoutIcon} width="24" />
      </button>
    );

  return (
    <button className="btn btn-ghost" onClick={() => login()}>
      <img src={LoginIcon} width="24" />
    </button>
  );
};
