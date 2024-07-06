import './index.css';

const Header = () => {
  return (
    <header>
      <div className="logoWrapper">
        <img src={"/icons/logo.png"} alt="vote logo" />
      </div>
      <div className="buttonsStack">
        <button id="submit">Submit Proposal</button>
        <button id="connectVallet">Connect Vallet</button>
      </div>
    </header>
  );
};

export default Header;