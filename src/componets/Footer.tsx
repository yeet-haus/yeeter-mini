import { useState } from "react";
import { Link } from "react-router-dom";

import { FundWallet } from "./FundWallet";
import { Login } from "./Login";

import Launch from "../assets/icons/launch.svg";
import Explore from "../assets/icons/explore.svg";
import User from "../assets/icons/user.svg";
import Left from "../assets/icons/left.svg";
import Right from "../assets/icons/right.svg";

export const Footer = () => {
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
            {step === 1 && (
              <div>
                <img src={User} width="32" />
              </div>
            )}
            {step === 2 && (
              <a
                href="https://yeet.haus/faq"
                target="_blank"
                className="link link-primary text-sm"
              >
                Learn more about fundraising with Yeeter
              </a>
            )}
          </li>
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
