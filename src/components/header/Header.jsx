import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { getFormattedWalletAddress } from "../../utils/utils";
import "./index.css";
import logo from "/icons/logo.png";
const Header = ({ onSubmit }) => {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();

  const openWeb3Modal = async () => {
    await open();
  };

  return (
    <header>
      <div className="logoWrapper">
        <img src={logo} alt="vote logo" />
      </div>
      <div className="buttonsStack">
        <button id="submit" onClick={onSubmit}>
          Submit Proposal
        </button>
        <button id="connectVallet" onClick={openWeb3Modal}>
          {isConnected ? getFormattedWalletAddress(address) : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
};

export default Header;
