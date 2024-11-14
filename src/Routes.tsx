import { Routes as Router, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Launch } from "./pages/Launch";
import { Account } from "./pages/Account";

// import { ReactSetter } from "@daohaus/utils";
// import { MULTI_DAO_ROUTER } from "@daohaus/moloch-v3-hooks";

// import Dao from "./pages/Dao";
// import { HomeContainer } from "./components/layout/HomeContainer";
// import { DaoContainer } from "./components/layout/DaoContainer";
// import UpdateSettings from "./pages/UpdateSettings";
// import { Explore } from "./pages/Explore";
// import { Launch } from "./pages/Launch";
// import { Yeet } from "./pages/Yeet";
// import { Success } from "./pages/Success";
// import { YeetSuccess } from "./pages/YeetSuccess";

// container with logins and stuff
//

const MULTI_DAO_ROUTER = "molochv3/:daoChain/:daoId";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/launch" element={<Launch />} />
      <Route path="/account" element={<Account />} />

      {/* <Route path="/" element={<HomeContainer />}> */}
      {/* <Route index element={<Explore />} />
        <Route path="launch" element={<Launch />} />
        <Route path={`success/:daoId/:txHash`} element={<Success />} /> */}
      {/* </Route> */}
      {/* <Route path={MULTI_DAO_ROUTER} element={<DaoContainer />}>
        <Route index element={<Dao />} />
        <Route path="yeet" element={<Yeet />} />
        <Route
          path="yeet/success/:lootReceived/:txHash"
          element={<YeetSuccess />}
        />
        <Route path="update" element={<UpdateSettings />} />
      </Route> */}
    </Router>
  );
};
