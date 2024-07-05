import voteLogo from "../assets/vote.png";

const Header = () => {
  return (
    <header>
      <div className="logoWrapper">
        <img src={voteLogo} alt="vote logo" />
      </div>
      <div className="buttonsStack">
        <button id="submit">Submit Proposal</button>
        <button id="connectVallet">Connect Vallet</button>
      </div>
    </header>
  );
};

export default Header;
