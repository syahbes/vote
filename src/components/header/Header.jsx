import { useWeb3Context } from "../../main";
import { getFormattedWalletAddress } from "../../utils/utils";
import "./index.css";

const Header = ({ onConnect, onSubmit }) => {
  const { web3State } = useWeb3Context();
  return (
    <header>
      <div className="logoWrapper">
        <img src={"/icons/logo.png"} alt="vote logo" />
      </div>
      <div className="buttonsStack">
        <button id="submit" onClick={onSubmit}>
          Submit Proposal
        </button>
        <button id="connectVallet" onClick={onConnect}>
          {web3State?.isConnected
            ? getFormattedWalletAddress(web3State?.userAddress)
            : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
};

export default Header;
