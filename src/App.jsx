import { useState } from "react";
import "./App.css";

import Header from "./components/header/Header";
import Title from "./components/title/Title";
import ProposalCard from "./components/proposalCard/ProposalCard";
import Footer from "./components/footer/Footer";
import SubmitModal from "./components/submitModal/SubmitModal";
import ConnectModal from "./components/connectModal/ConnectModal";
import VotingModal from "./components/votingModal/VotingModal";
import StatsModal from "./components/statsModal/StatsModal";
import HistoryModal from "./components/historyModal/HistoryModal";

import { useQuestions } from "./hooks/useQuestions";
import { useUserVotes } from "./hooks/useUserVotes";
import { useWeb3Context } from "./main";
import { useModals } from "./hooks/useModals";
import { getFormattedWalletAddress, getTimeRemaining } from "./utils/utils";

const App = () => {
  const { isPending, error, data: questions } = useQuestions();
  const { web3State } = useWeb3Context();
  const { data: userVotes } = useUserVotes(web3State?.userAddress);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const {
    showSubmitModal,
    showConnectModal,
    showVotingModal,
    showStatsModal,
    showHistoryModal,
    openSubmitModal,
    openConnectModal,
    openVotingModal,
    openStatsModal,
    openHistoryModal,
    closeAllModals
  } = useModals();

  const handleSubmit = () => {
    web3State.isConnected ? openSubmitModal() : alert("Please connect your wallet");
  };

  const handleShowDetailsClick = (proposal) => {
    if (!web3State.isConnected) {
      alert("Please connect your wallet");
      return;
    }
    
    setSelectedProposal(proposal);

    if (proposal.timeRemaining === "Voting ended" || 
        userVotes.some(vote => vote.question_id === proposal.question_id)) {
      openStatsModal();
    } else {
      openVotingModal();
    }
  };

  const renderProposals = () => (
    <main className="proposalsContainer">
      {questions?.map((item) => (
        <ProposalCard
          key={item.question_id}
          imageUrl={item.question_bg}
          category={item.category}
          title={item.question_title}
          description={item.question_text}
          createdBy={item.category === "Team" ? "Team" : getFormattedWalletAddress(item.question_created_by)}
          createdByAvatar={item.avatar}
          timeRemaining={getTimeRemaining(item.end_voting_time)}
          onClick={() => handleShowDetailsClick({ ...item, timeRemaining: getTimeRemaining(item.end_voting_time) })}
        />
      ))}
    </main>
  );

  return (
    <div className="app">
      <HistoryModal show={showHistoryModal} onClose={closeAllModals} />
      <SubmitModal 
        show={showSubmitModal} 
        onClose={closeAllModals}
        questionId={selectedProposal?.question_id} 
      />
      <ConnectModal show={showConnectModal} onClose={closeAllModals} />
      <VotingModal 
        show={showVotingModal} 
        onClose={closeAllModals}
        openStatsModal={openStatsModal}
        questionId={selectedProposal?.question_id}
      />
      <StatsModal 
        show={showStatsModal} 
        onClose={() => {
          closeAllModals();
          setSelectedProposal(null);
        }}
        questionId={selectedProposal?.question_id}
      />

      <Header onConnect={openConnectModal} onSubmit={handleSubmit} />
      <Title />
      <div className="proposalsTitle">
        <h3>Proposals</h3>
        <button onClick={openHistoryModal}>View History</button>
      </div>

      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isPending && !error && renderProposals()}

      <Footer />
    </div>
  );
};

export default App;