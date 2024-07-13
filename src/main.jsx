import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";

const Web3Context = createContext();

export const useWeb3Context = () => useContext(Web3Context);

const Web3Provider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    isConnected: false,
    userAddress: null,
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
  <QueryClientProvider client={queryClient}>
    <Web3Provider>
      <App />
    </Web3Provider>
  </QueryClientProvider>
);
