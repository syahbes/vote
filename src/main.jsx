import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

const Web3Context = createContext();
const queryClientW = new QueryClient();
const projectId = "355e607bcae92dfe12493844a5d252e1";

const metadata = {
  name: "tomi project ->",
  description: "AppKit Example",
  url: "https://tomi.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // ...wagmiOptions, // Optional - Override createConfig parameters
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export const useWeb3Context = () => useContext(Web3Context);

const Web3Provider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    isConnected: false,
    userAddress: null,
    userVotes: [],
  });

  const updateWeb3State = (newState) => {
    setWeb3State(newState);
  };

  return (
    <Web3Context.Provider value={{ web3State, updateWeb3State }}>
      {children}
    </Web3Context.Provider>
  );
};

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClientW}>
            <App />
          </QueryClientProvider>
        </WagmiProvider>
      </Web3Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
