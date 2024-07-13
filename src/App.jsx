import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/header/Header";
import Title from "./components/title/Title";
import ProposalCard from "./components/proposalCard/ProposalCard";
import Footer from "./components/footer/Footer";
import VotingModal from "./components/votingModal/VotingModal";
import ConnectModal from "./components/connectModal/ConnectModal";

import { useQuestions } from "./hooks/useQuestions";
import { getTimeRemaining } from "./utils/utils";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const { isPending, error, data: questions } = useQuestions();

  useEffect(() => {
    console.log("Questions:", questions);
  }, [questions]);

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
          questionId={selectedProposal?.question_id}
        />
      )}
      <Header onConnect={() => setShowConnectModal(true)} />
      <Title />
      <div className="proposalsTitle">
        <h3>Proposals</h3>
      </div>
      {!isPending && !error && (
        <main className="proposalsContainer">
          {questions?.map((item) => {
            const createdByText =
              item.category === "Team"
                ? "Team"
                : item.question_created_by.slice(0, 4) +
                  "..." +
                  item.question_created_by.slice(-4);

            const timeRemaining = getTimeRemaining(item.end_voting_time);
            return (
              <ProposalCard
                imageUrl={item.question_bg}
                category={item.category}
                title={item.question_title}
                description={item.question_text}
                createdBy={createdByText}
                createdByAvatar={item.avatar}
                timeRemaining={timeRemaining}
                key={item.question_id}
                onClick={() => {
                  setSelectedProposal(item);
                  setShowModal(true);
                }}
              />
            );
          })}
        </main>
      )}
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <Footer />
    </div>
  );
};

export default App;
