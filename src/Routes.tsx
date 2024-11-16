import { Routes as Router, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Launch } from "./pages/Launch";
import { Account } from "./pages/Account";
import { Campaign } from "./pages/Campaign";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/launch" element={<Launch />} />
      <Route path="/account" element={<Account />} />
      <Route path="/campaign/:chainid/:campaignid" element={<Campaign />} />
    </Router>
  );
};
