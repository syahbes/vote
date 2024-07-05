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

const styles = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1em 2em;
}

.logoWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  > img {
    /* border: 1px solid #fff; */
  }
}

.buttonsStack {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  > button {
    padding: 15px 18px 15px 18px;
    border: 1px solid var(--text-color);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  > button:hover {
    background-color: var(--text-color);
    color: var(--background-color);
  }
  #connectVallet {
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }
  #connectVallet:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
  }
}
`;

export default () => (
  <>
    <style>{styles}</style>
    <Header />
  </>
);
