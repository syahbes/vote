import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { arbitrum, mainnet } from "wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient(); // for all the API
const queryClientW = new QueryClient(); // for web3
const projectId = "355e607bcae92dfe12493844a5d252e1";

const metadata = {
  name: "tomi vote",
  description: "Vote for features on tomi",
  url: "https://vote.tomi.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClientW}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </WagmiProvider>
  </QueryClientProvider>
);
