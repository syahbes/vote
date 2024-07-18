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
import { useWeb3Context } from "./main";
import HisoryModal from "./components/historyModal/HistoryModal";

const App = () => {
  const { isPending, error, data: questions } = useQuestions();
  const { web3State } = useWeb3Context();

  //Modals
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [selectedProposal, setSelectedProposal] = useState(null);
  const handleSubmit = () => {
    if (web3State.isConnected) {
      setShowSubmitModal(true);
    } else {
      alert("Please connect your wallet");
    }
  };
  const handleShowDetailsClick = (proposal) => {
    if (!web3State.isConnected) {
      alert("Please connect your wallet");
      return;
    }
    if (proposal.timeRemaining == "Voting ended") {
      setShowStatsModal(true);
      return;
    }
    //check if user has already voted
    if (
      web3State.userVotes.some(
        (vote) => vote.question_id == proposal.question_id
      )
    ) {
      setShowStatsModal(true);
      console.log("Already voted");
      return;
    }

    setShowVotingModal(true);
  };

  return (
    <div className="app">
      {showHistoryModal && (
        <HisoryModal
          onClose={() => {
            setShowHistoryModal(false);
          }}
        />
      )}
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
        onSubmit={handleSubmit}
      />
      <Title />
      <div className="proposalsTitle">
        <h3>Proposals</h3>
        <button onClick={() => setShowHistoryModal(true)}>View Hisory</button>
      </div>
      {!isPending && !error && (
        <main className="proposalsContainer">
          {questions?.map((item) => {
            const createdByText =
              item.category === "Team"
                ? "Team"
                : getFormattedWalletAddress(item.question_created_by);
            const timeRemaining = getTimeRemaining(item.end_voting_time);
            item.timeRemaining = timeRemaining;
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
                  handleShowDetailsClick(item);
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
