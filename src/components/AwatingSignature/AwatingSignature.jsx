import React from "react";
import "./index.css";

const AwatingSignature = () => {
  return (
    <div className="AwatingSignature_container">
      <div className="card">
        <h1 className="title">Signature request</h1>
        <p className="text">Please sign on your wallet to continue</p>
        <p className="text">Waiting for signature...</p>
      </div>
    </div>
  );
};

export default AwatingSignature;
