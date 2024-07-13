import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/header/Header";
import Title from "./components/title/Title";
import ProposalCard from "./components/proposalCard/ProposalCard";
import Footer from "./components/footer/Footer";
import SubmitModal from "./components/submitModal/SubmitModal";
import ConnectModal from "./components/connectModal/ConnectModal";
import VotingModal from "./components/votingModal/VotingModal";
import StatsModal from "./components/statsModal/StatsModal";

import { useQuestions } from "./hooks/useQuestions";
import { getFormattedWalletAddress, getTimeRemaining } from "./utils/utils";

const App = () => {
  const { isPending, error, data: questions } = useQuestions();
  //Modals
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const [selectedProposal, setSelectedProposal] = useState(null);

  return (
    <div className="app">
      {showSubmitModal && (
        <SubmitModal
          onClose={() => {
            setShowSubmitModal(false);
            setSelectedProposal(null);
          }}
          questionId={selectedProposal?.question_id}
        />
      )}
      {showConnectModal && (
        <ConnectModal
          onClose={() => {
            setShowConnectModal(false);
          }}
        />
      )}
      {showVotingModal && (
        <VotingModal
          onClose={() => {
            setShowVotingModal(false);
            // setSelectedProposal(null);
          }}
          openStatsModal={() => setShowStatsModal(true)}
          questionId={selectedProposal?.question_id}
        />
      )}

      {showStatsModal && (
        <StatsModal
          onClose={() => {
            setShowStatsModal(false);
            setSelectedProposal(null);
          }}
          questionId={selectedProposal?.question_id}
        />
      )}
      <Header
        onConnect={() => setShowConnectModal(true)}
        onSubmit={() => setShowSubmitModal(true)}
      />
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
                : getFormattedWalletAddress(item.question_created_by);
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
                  setShowVotingModal(true);
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
