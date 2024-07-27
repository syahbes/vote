import "./index.css";
import icon from "/icons/blockchain.png";

const Title = () => {
  return (
    <div className="titleWrapper">
    <svg className="curvyLine" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: "#FF1493", stopOpacity: 0.5}} />
          <stop offset="100%" style={{stopColor: "#FF69B4", stopOpacity: 0.5}} />
        </linearGradient>
      </defs>
      <path d="M0,0 C25,100 75,100 100,0" stroke="url(#grad1)" strokeWidth="1" fill="none" />
    </svg>
    <svg className="curvyLine" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: "#FF1493", stopOpacity: 0.5}} />
          <stop offset="100%" style={{stopColor: "#FF69B4", stopOpacity: 0.5}} />
        </linearGradient>
      </defs>
      <path d="M0,10 C30,90 70,90 100,10" stroke="url(#grad2)" strokeWidth="1" fill="none" />
    </svg>
    <img src={icon} alt="blockchain" className="blockchainLogo" />
    <h3>Cast Your Vote for The Changes You want!</h3>
    <h1>Shape the Future of Our App</h1>
  </div>
  );
};

export default Title;