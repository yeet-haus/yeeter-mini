import React, { useEffect, useLayoutEffect, useRef } from "react";

import { Header } from "./Header";
import { APP_THEME } from "../utils/content";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const divRef = useRef(null);
  const location = useLocation();
  const { ready, authenticated } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();

  useEffect(() => {
    if (ready && authenticated && wallets.length > 0 && walletsReady) {
      const isEmbedded = wallets.find((w) => w.connectorType === "embedded");

      if (isEmbedded) {
        console.log("switching active", isEmbedded);
        setActiveWallet(isEmbedded);
      } else {
        // console.log("setting injected", wallets[0]);
        // setActiveWallet(wallets[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, authenticated, wallets, walletsReady]);

  useLayoutEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  const scrollToTop = () => {
    if (!divRef || !divRef.current) return;
    // @ts-expect-error does not like to scroll
    divRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="flex flex-col h-screen w-screen md:w-768"
      data-theme={APP_THEME.themeName}
    >
      <Header />
      <main className="flex-1 overflow-y-auto p-5" ref={divRef}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
