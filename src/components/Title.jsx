import React from "react";

const Title = () => {
  return (
    <div className="titleWrapper">
      <img src="/icons/blockchain.png" alt="blockchain" className="blockchainLogo" />
      <h3>Cast Your Vote for The Changes You want!</h3>
      <h1>Shape the Future of Our App</h1>
    </div>
  );
};

const styles = `
.titleWrapper {
  width: 90%;
  margin: 0 auto;
  position: relative;
  padding: 20px;
}

.blockchainLogo {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  transform: rotate(+10deg); /* Adjust this angle as needed */
}

.blockchainLogo {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

`;

export default () => (
  <>
    <style>{styles}</style>
    <Title />
  </>
);
