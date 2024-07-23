import React, { useEffect, useState } from "react";
import { useAccount, useAccountEffect, useSignMessage } from "wagmi";
import "./App.css";

import Header from "./components/header/Header";
import Title from "./components/title/Title";
import ProposalCard from "./components/proposalCard/ProposalCard";
import Footer from "./components/footer/Footer";
import SubmitModal from "./components/submitModal/SubmitModal";
import VotingModal from "./components/votingModal/VotingModal";
import StatsModal from "./components/statsModal/StatsModal";
import HistoryModal from "./components/historyModal/HistoryModal";

import { useQuestions } from "./hooks/useQuestions";
import { useUserVotes } from "./hooks/useUserVotes";
import { useModals } from "./hooks/useModals";
import {
  getFormattedWalletAddress,
  getTimeRemaining,
  handleAuthentication,
} from "./utils/utils";

const sign_message =
  "Sign this message to authenticate with Wallet Connect to Tomi";

const App = () => {
  const { isPending, error, data: questions } = useQuestions();
  const { data: signMessageData, signMessage } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { data: userVotes, refetch: refetchUserVotes } = useUserVotes(address);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const {
    showSubmitModal,
    showVotingModal,
    showStatsModal,
    showHistoryModal,
    openSubmitModal,
    openVotingModal,
    openStatsModal,
    openHistoryModal,
    closeAllModals,
  } = useModals();

  useEffect(() => {
    if (isConnected) {
      signMessage({ message: sign_message });
    }
  }, [isConnected]);

  useEffect(() => {
    if (signMessageData) {
      getTokenFromServerBySign();
    }
  }, [signMessageData]);

  const getTokenFromServerBySign = async () => {
    try {
      const result = await handleAuthentication(
        address,
        sign_message,
        signMessageData
      );
      console.log("result: ", result);
      if (result?.authenticated) {
        console.log("User authenticated successfully [WalletConnect]");
        refetchUserVotes();
      } else {
        console.log("Authentication failed");
      }
    } catch (err) {
      console.error("Error handling authentication:", err);
    }
  };

  const handleSubmit = () => {
    isConnected ? openSubmitModal() : alert("Please connect your wallet");
  };

  const handleShowDetailsClick = (proposal) => {
    if (!isConnected) {
      alert("Please connect your wallet");
      return;
    }
    setSelectedProposal(proposal);
    if (
      proposal.timeRemaining === "Voting ended" ||
      userVotes.some((vote) => vote.question_id === proposal.question_id)
    ) {
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
          createdBy={
            item.category === "Team"
              ? "Team"
              : getFormattedWalletAddress(item.question_created_by)
          }
          createdByAvatar={item.avatar}
          timeRemaining={getTimeRemaining(item.end_voting_time)}
          onClick={() =>
            handleShowDetailsClick({
              ...item,
              timeRemaining: getTimeRemaining(item.end_voting_time),
            })
          }
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

      <Header onSubmit={handleSubmit} />
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
