import "./App.css";

import BeerRunLogo from "./assets/beer_run_logo.svg";
import { FundWallet } from "./componets/FundWallet";
import { Login } from "./componets/Login";
import { NeedWalletModal } from "./componets/NeedWalletModal";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-6xl">BEER RUN</h1>
      <p>A mini yeeter</p>
      <img src={BeerRunLogo} width="100rem" />

      <Login />
      <NeedWalletModal />
      <FundWallet />
    </div>
  );
}

export default App;
