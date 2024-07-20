import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useWeb3Context } from "../main";
import { getBaseUrl } from "../utils/utils";

function MetaMaskAuth() {
  const { web3State, updateWeb3State } = useWeb3Context();
  // const metamaskAppDeepLink =
  //   `https://metamask.app.link/dapp/vote-draft-beta.vercel.app\\/`

  // useEffect(() => {
  //   connectWallet();
  // }, []);

  const handleAuthentication = async (accounts, message, signature) => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: accounts[0],
          message,
          signature,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.authenticated && data.token) {
        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);

        // Optionally, store the expiration time
        const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour from now
        localStorage.setItem("authTokenExpiresAt", expiresAt.toISOString());
      } else {
        console.log("Authentication failed or token missing");
      }

      return data;
    } catch (error) {
      console.error("Error during authentication:", error);
      throw error;
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        const message =
          "Sign this message to authenticate with Metamask to Tomi";
        const signature = await web3.eth.personal.sign(
          message,
          accounts[0],
          ""
        );

        try {
          const result = await handleAuthentication(
            accounts,
            message,
            signature
          );
          if (result.authenticated) {
            console.log("User authenticated successfully");
            // Proceed with authenticated user flow
            updateWeb3State({
              isConnected: true,
              userAddress: accounts[0],
            });
          } else {
            console.log("Authentication failed");
            // Handle authentication failure
          }
        } catch (error) {
          console.error("Authentication error:", error);
          // Handle error (e.g., show error message to user)
        }
      } catch (error) {
        console.error("User denied account access");
        updateWeb3State({
          isConnected: false,
          userAddress: null,
        });
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
