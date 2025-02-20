import React, { useLayoutEffect, useRef } from "react";

import { Header } from "./Header";
import { APP_THEME } from "../utils/content";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const divRef = useRef(null);
  const location = useLocation();

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
