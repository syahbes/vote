import React, { useEffect } from "react";
import { CircleX } from "lucide-react";
import Web3 from "web3";
import { handleAuthentication } from "../../utils/utils";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import "./index.css";

const APP_URL = "tomivote.tomi.com";

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
  const { open } = useWeb3Modal();

  if (!show) return null;

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

      const result = await handleAuthentication(
        accounts[0],
        message,
        signature
      );
      if (result?.authenticated) {
        console.log(
          "Connect Modal: User authenticated successfully [Metamask]"
        );
        onClose();
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("User denied account access", error);
      alert("User denied account access");
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

  const connectWalletConnect = async () => {
    onClose();
    await open();
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
