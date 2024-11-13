import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import App from "./App.tsx";
import Providers from "./Providers.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <App />
        </Providers>
      </QueryClientProvider>
    </HashRouter>
  </StrictMode>
);
