import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { arbitrum, base, optimism, sepolia } from "wagmi/chains";
import { http, createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import Providers from "./providers/Providers.tsx";

const config = createConfig({
  chains: [sepolia, base, optimism, arbitrum],
  transports: {
    [base.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Providers>
            <App />
          </Providers>
        </QueryClientProvider>
      </WagmiProvider>
    </HashRouter>
  </StrictMode>
);
