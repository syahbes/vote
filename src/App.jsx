import React, { useState, useEffect } from "react";
import "./App.css";

import mockData from "./assets/mock/proposal.json";
import Header from "./components/header/Header";
import Title from "./components/title/Title";
import ProposalCard from "./components/proposalCard/ProposalCard";
import Footer from "./components/footer/Footer";
import VotingModal from "./components/votingModal/VotingModal";
import ConnectModal from "./components/connectModal/ConnectModal";

import { useQuestions } from "./hooks/useQuestions";
import { useSelectedProposal } from "./hooks/useSelectedProposal";

const baseURL = "http://localhost:4227";

const App = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const { isPending, error, data: questions } = useQuestions();
  const {
    isPending: isSelectedProposalLoading,
    error: selectedProposalError,
    data: fetchedSelectedProposal,
  } = useSelectedProposal(selectedProposal?.id);

  useEffect(() => {
    setData(mockData);
  }, []);

  useEffect(() => {
    console.log("Questions:", questions);
  }, [questions]);

  useEffect(() => {
    if (fetchedSelectedProposal) {
      console.log("Selected Proposal Data:", fetchedSelectedProposal);
    }
  }, [fetchedSelectedProposal]);

  return (
    <div className="app">
      {showConnectModal && (
        <ConnectModal
          onClose={() => {
            setShowConnectModal(false);
          }}
        />
      )}
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
      <Header onConnect={() => setShowConnectModal(true)} />
      <Title />
      <div className="proposalsTitle">
        <h3>Proposals</h3>
      </div>

      {!isPending && !error && (
        <main className="proposalsContainer">
          {data?.map((proposal) => (
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
      )}
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <Footer />
    </div>
  );
};

export default App;
