import React, { useState, useEffect } from "react";
import "./App.css";

import mockData from "./assets/mock/proposal.json";
import Header from "./components/header/Header";
import Title from "./components/title/Title";
import ProposalCard from "./components/proposalCard/ProposalCard";
import Footer from "./components/footer/Footer";
import VotingModal from "./components/votingModal/VotingModal";

const App = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    setData(mockData);
  }, []);

  return (
    <div className="app">
      {showModal && (
        <VotingModal
          onClose={() => {
            setShowModal(false);
            setSelectedProposal(null);
          }}
          question={selectedProposal?.question}
          votingOption={selectedProposal?.votingOption}
          createdBy={selectedProposal?.createdBy}
          createdByAvatar={selectedProposal?.createdByAvatar}
          timeRemaining={selectedProposal?.timeRemaining}
        />
      )}
      <Header />
      <Title />
      <div className="proposalsTitle">
        <h3>Proposals</h3>
      </div>
      <main className="proposalsContainer">
        {data.map((proposal) => (
          <ProposalCard
            imageUrl={proposal.imageUrl}
            category={proposal.category}
            title={proposal.title}
            description={proposal.description}
            createdBy={proposal.createdBy}
            createdByAvatar={proposal.createdByAvatar}
            timeRemaining={proposal.timeRemaining}
            key={proposal.id}
            onClick={() => {
              setSelectedProposal(proposal);
              setShowModal(true);
            }}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default App;