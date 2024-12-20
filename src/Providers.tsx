import React from "react";

import { PrivyProvider } from "@privy-io/react-auth";
import { base, sepolia, optimism, arbitrum, gnosis } from "viem/chains";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ["email", "wallet", "farcaster"],
        // appearance: {
        //   theme: "light",
        //   accentColor: "#676FFF",
        //   logo: "https://your-logo-url",
        // },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: import.meta.env.VITE_DEV_ENV === "local" ? sepolia : base,
        supportedChains: [base, sepolia, optimism, arbitrum, gnosis],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
