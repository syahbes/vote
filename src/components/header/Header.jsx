import { useWeb3Context } from "../../main";
import "./index.css";

const Header = ({ onConnect }) => {
  const { web3State } = useWeb3Context();
  return (
    <header>
      <div className="logoWrapper">
        <img src={"/icons/logo.png"} alt="vote logo" />
      </div>
      <div className="buttonsStack">
        <button id="submit">Submit Proposal</button>
        <button id="connectVallet" onClick={onConnect}>
          {web3State?.isConnected
            ? "Connected " +
              web3State?.userAddress.slice(0, 4) +
              "..." +
              web3State?.userAddress.slice(-4)
            : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
};

export default Header;
