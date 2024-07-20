import React from "react";
import { CircleX } from "lucide-react";
import Web3 from "web3";
import { useWeb3Context } from "../../main";
import { getBaseUrl } from "../../utils/utils";
import "./index.css";

const APP_URL = "vote-draft-beta.vercel.app";

const CONNECTION_OPTIONS = [
  {
    text: "Metamask",
    action: "connectMetamask",
    icon: "/icons/wallets/metamask.png",
  },
  {
    text: "tomiWallet",
    action: "connectTomiWallet",
    icon: "/icons/wallets/tomiwallet.png",
  },
  {
    text: "WalletConnect",
    action: "connectWalletConnect",
    icon: "/icons/wallets/walletconnect.png",
  },
];

const ConnectModal = ({ show, onClose }) => {
  const { updateWeb3State } = useWeb3Context();
  
  if (!show) return null;

  const handleAuthentication = async (accounts, message, signature) => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: accounts[0], message, signature }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.authenticated && data.token) {
        localStorage.setItem("authToken", data.token);
        return data;
      }

      console.log("Authentication failed or token missing");
      return null;
    } catch (error) {
      console.error("Error during authentication:", error);
      throw error;
    }
  };

  const connectMetamask = async () => {
    if (typeof window.ethereum === "undefined") {
      handleNoMetamask();
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      const message = "Sign this message to authenticate with Metamask to Tomi";
      const signature = await web3.eth.personal.sign(message, accounts[0], "");

      const result = await handleAuthentication(accounts, message, signature);
      if (result?.authenticated) {
        console.log("User authenticated successfully");
        updateWeb3State({ isConnected: true, userAddress: accounts[0] });
        onClose();
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("User denied account access", error);
      alert("User denied account access");
      updateWeb3State({ isConnected: false, userAddress: null });
      onClose();
    }
  };

  const handleNoMetamask = () => {
    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${APP_URL}\\`;
    const metamaskWebLink = "https://metamask.io/download.html";

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = metamaskAppDeepLink;
    } else {
      window.open(metamaskWebLink, "_blank");
    }
  };

  const connectTomiWallet = () => {
    alert("tomiWallet connection not implemented");
  };

  const connectWalletConnect = () => {
    alert("WalletConnect connection not implemented");
  };

  const connectionActions = {
    connectMetamask,
    connectTomiWallet,
    connectWalletConnect,
  };

  return (
    <div className="connect-modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="connect-title">
          <h2 className="modal-title">Connect Wallet</h2>
          <CircleX onClick={onClose} size={24} />
        </div>
        <div className="connect-options-stack">
          {CONNECTION_OPTIONS.map(({ text, action, icon }) => (
            <div
              className="connect-option"
              onClick={connectionActions[action]}
              key={text}>
              <img src={icon} alt={`${text} icon`} className="wallet-icon" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
