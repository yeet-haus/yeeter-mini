import React from "react";
import { Header } from "./Header";
import { APP_THEME } from "../utils/content";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col h-screen w-screen-sm"
      data-theme={APP_THEME.themeName}
    >
      <Header />
      <main className="flex-1 overflow-y-auto p-5 w-screen">{children}</main>
      <Footer />
    </div>
  );
};
