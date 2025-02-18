import { useState } from "react";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

import Launch from "../assets/icons/launch.svg";
import Explore from "../assets/icons/explore.svg";
import User from "../assets/icons/user.svg";
import Left from "../assets/icons/left.svg";
import Right from "../assets/icons/right.svg";

export const Footer = () => {
  const { ready, authenticated } = usePrivy();
  const [step, setStep] = useState(0);

  const handleNav = (step: number) => {
    setStep(step);
  };

  return (
    <footer className="py-5 text-center text-white">
      <div className="btm-nav w-screen md:w-768 mx-auto bg-primary pt-2 border-t-2 border-dark">
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

          <li className={step === 1 ? "disabled" : ""}>
            {step === 0 && (
              <Link to="/explore">
                <img src={Explore} width="32" />
              </Link>
            )}

            {step === 1 && (
              <a
                href="https://yeet.haus/faq"
                target="_blank"
                className="link link-neutral text-xs"
              >
                Learn more about decentralized fundraising
              </a>
            )}
          </li>
          {step === 0 && (
            <li>
              <Link to="/account">
                <div className="flex flex-row">
                  <img src={User} width="32" />
                  {ready && authenticated ? (
                    <span className="badge badge-info badge-xs"></span>
                  ) : (
                    <span className="badge badge-warning badge-xs"></span>
                  )}
                </div>
              </Link>
            </li>
          )}

          <li>
            {step !== 1 && (
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
