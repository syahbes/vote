import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useWeb3Context } from "../main";

function MetaMaskAuth() {
  const { web3State, updateWeb3State } = useWeb3Context();
  // const metamaskAppDeepLink =
  //   `https://metamask.app.link/dapp/vote-draft-beta.vercel.app\\/`

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          updateWeb3State({ isConnected: true, userAddress: accounts[0] });
        }
      } catch (error) {
        console.error("User denied account access");
        updateWeb3State({ isConnected: false, userAddress: null });
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        updateWeb3State({ isConnected: true, userAddress: accounts[0] });
      } catch (error) {
        console.error("User denied account access");
        updateWeb3State({ isConnected: false, userAddress: null });
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      {web3State?.userAddress ? (
        <p>Connected with address: {web3State?.userAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect to MetaMask</button>
              )}
    </div>
  );
}

export default MetaMaskAuth;

/* <a href={metamaskAppDeepLink}>
        <button className="btn">
          connect wallet
        </button>
      </a> */