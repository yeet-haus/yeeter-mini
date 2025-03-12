import { usePrivy } from "@privy-io/react-auth";

import User from "../assets/icons/user.svg";
import LoginIcon from "../assets/icons/login.svg";
import LogoutIcon from "../assets/icons/logout.svg";
// import WalletIcon from "../assets/icons/id_wallet.svg";

export const Login = () => {
  const { ready, authenticated, login, logout } = usePrivy();

  // const userNoWallet = user && !user.wallet;

  const handleLogin = () => {
    // if (userNoWallet) {
    //   login({ loginMethods: ["email", "wallet"] });
    // } else {
    login();
    // }
  };

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
        <>
          <button className="btn" onClick={() => logout()}>
            <img src={LogoutIcon} width="24" />
            Logout
          </button>
          {/* {userNoWallet && (
            <button className="btn" onClick={() => handleLogin()}>
              <img src={WalletIcon} width="18" />
              Connect Wallet
            </button>
          )} */}
        </>
      ) : (
        <button className="btn" onClick={() => handleLogin()}>
          <img src={LoginIcon} width="18" />
          Login
        </button>
      )}
    </>
  );
};
