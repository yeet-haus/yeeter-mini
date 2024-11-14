import { useState } from "react";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

import { LoginFooter } from "./LoginFooter";

import Launch from "../assets/icons/launch.svg";
import Explore from "../assets/icons/explore.svg";
import Left from "../assets/icons/left.svg";
import Right from "../assets/icons/right.svg";
import { FundWallet } from "./FundWallet";

export const Footer = () => {
  const { ready, authenticated } = usePrivy();
  const [step, setStep] = useState(0);

  const handleNav = (step: number) => {
    setStep(step);
  };

  return (
    <footer className="py-5 text-center text-white">
      <div className="btm-nav bg-accent">
        <ul className="menu menu-lg rounded-box">
          <li>
            {step === 0 && (
              <Link to="/launch">
                <img src={Launch} width="32" />
              </Link>
            )}
            {step > 0 && (
              <div onClick={() => handleNav(step - 1)}>
                <img src={Left} width="24" />
              </div>
            )}
          </li>

          <li className={step === 2 ? "disabled" : ""}>
            {step === 0 && (
              <Link to="/explore">
                <img src={Explore} width="32" />
              </Link>
            )}
            {step === 1 && <LoginFooter />}
            {step === 2 && (
              <a
                href="https://yeet.haus/faq"
                target="_blank"
                className="link link-neutral text-xs"
              >
                Learn more about decentralized fundraising
              </a>
            )}
          </li>

          {step === 1 && (
            <li className={!ready || !authenticated ? "disabled" : ""}>
              <FundWallet />
            </li>
          )}

          <li>
            {step !== 2 && (
              <div onClick={() => handleNav(step + 1)}>
                <img src={Right} width="24" />
              </div>
            )}
          </li>
        </ul>
      </div>
    </footer>
  );
};
