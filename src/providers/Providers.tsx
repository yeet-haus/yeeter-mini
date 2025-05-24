import React from "react";

import { PrivyProvider } from "@privy-io/react-auth";
import { base, sepolia, optimism, arbitrum, gnosis } from "viem/chains";
import { DaoHooksProvider } from "./DaoHooksProvider";
import { HAUS_RPC_DEFAULTS } from "../utils/constants";
import { http } from "wagmi";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FarcasterFrameProvider from "./FarcasterFrameProvider";

const supportedChains = [base, optimism, arbitrum, gnosis, sepolia];

const wagmiConfig = createConfig({
  // @ts-expect-error fix unknown
  chains: supportedChains,
  transports: {
    [base.id]: http(HAUS_RPC_DEFAULTS["0x2105"]),
    [optimism.id]: http(HAUS_RPC_DEFAULTS["0xa"]),
    [arbitrum.id]: http(HAUS_RPC_DEFAULTS["0xa4b1"]),
    [gnosis.id]: http(),
    [sepolia.id]: http(),
  },
});
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const daoHooksConfig = {
    graphKey: import.meta.env.VITE_YEETER_GRAPH_API_KEY,
  };

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ["farcaster", "email", "wallet"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: import.meta.env.VITE_DEV_ENV === "local" ? sepolia : base,
        supportedChains,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <DaoHooksProvider keyConfig={daoHooksConfig}>
            <FarcasterFrameProvider>{children}</FarcasterFrameProvider>
          </DaoHooksProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
