import { usePrivy } from "@privy-io/react-auth";

export const Login = () => {
  const { ready, authenticated, logout, login, user } = usePrivy();

  console.log("user", user);

  if (ready && authenticated)
    return (
      <button className="btn" onClick={() => logout()}>
        Logout
      </button>
    );

  return (
    <button className="btn" onClick={() => login()}>
      Login
    </button>
  );
};
