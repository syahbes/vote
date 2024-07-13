import React, { useState, useEffect } from "react";
import "./index.css";
import { CircleX } from "lucide-react";
import Web3 from "web3";
import { useWeb3Context } from "../../main";

const ConnectModal = ({ onClose }) => {
  const { web3State, updateWeb3State } = useWeb3Context();

  const connectionOptions = [
    {
      text: "Metamask",
      action: () => {
        connectWalletMetaMask();
      },
      icon: "/icons/wallets/metamask.png",
    },

    {
      text: "tomiWallet",
      action: () => {
        alert("tomiWallet");
      },
      icon: "/icons/wallets/tomiwallet.png",
    },
    {
      text: "WalletConnect",
      action: () => {
        alert("WalletConnect");
      },
      icon: "/icons/wallets/walletconnect.png",
    },
  ];
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const connectWalletMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        updateWeb3State({ isConnected: true, userAddress: accounts[0] });
        onClose();
      } catch (error) {
        console.error("User denied account access");
        alert("User denied account access");
        updateWeb3State({ isConnected: false, userAddress: null });
        onClose();
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="connect-modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="connect-title">
          <h2 className="modal-title">Connect Vallet</h2>
          <div>
            <CircleX onClick={onClose} size={24} />
          </div>
        </div>
        <div className="connect-options-stack">
          {connectionOptions.map((option) => (
            <div
              className="connect-option"
              onClick={option.action}
              key={option.text}>
              <img src={option.icon} alt="Wallet" className="wallet-icon" />
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
