import "./index.css";
import icon from "/icons/blockchain.png";

const Title = () => {
  return (
    <div className="titleWrapper">
      <img src={icon} alt="blockchain" className="blockchainLogo" />
      <h3>Cast Your Vote for The Changes You want!</h3>
      <h1>Shape the Future of Our App</h1>
    </div>
  );
};

export default Title;
