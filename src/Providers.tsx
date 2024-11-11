import React from "react";

import { PrivyProvider } from "@privy-io/react-auth";
// Replace this with any of the networks listed at https://github.com/wevm/viem/blob/main/src/chains/index.ts
import { base, sepolia } from "viem/chains";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ["email", "wallet", "farcaster", ""],
        // appearance: {
        //   theme: "light",
        //   accentColor: "#676FFF",
        //   logo: "https://your-logo-url",
        // },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: base,
        supportedChains: [base, sepolia],
      }}
    >
      {children}
    </PrivyProvider>
  );
}