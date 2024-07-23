import React, { useEffect, useState } from "react";
import { useAccount, useAccountEffect, useSignMessage } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
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
import {
  getFormattedWalletAddress,
  getTimeRemaining,
  handleAuthentication,
} from "./utils/utils";

const sign_message =
  "Sign this message to authenticate with Wallet Connect to Tomi";

const App = () => {
  const { isPending, error, data: questions } = useQuestions();
  const { web3State, updateWeb3State } = useWeb3Context();
  const { data: signMessageData, signMessage } = useSignMessage();
  const { data: userVotes, refetch: refetchUserVotes } = useUserVotes(
    web3State?.userAddress
  );
  const queryClient = useQueryClient();
  const [selectedProposal, setSelectedProposal] = useState(null);
  const { address, isConnected } = useAccount();
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
    closeAllModals,
  } = useModals();

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (isConnected) {
  //     if (token) {
  //       updateWeb3State({ isConnected: true, userAddress: address });
  //     } else {
  //       handleSuccessfulConnect();
  //     }
  //   } else {
  //     updateWeb3State({ isConnected: false, userAddress: null });
  //     //remove token
  //     localStorage.removeItem("authToken");
  //     queryClient.removeQueries(["userVotes"]); // Remove the userVotes query when logging out
  //   }
  // }, [isConnected, address]);

  useEffect(() => {
    if (isConnected) {
      console.log("Connected!", address);
      updateWeb3State({ isConnected: true, userAddress: address });
      handleSuccessfulConnect();
    } else {
      updateWeb3State({ isConnected: false, userAddress: null });
    }
  }, [isConnected]);

  useAccountEffect({
    onConnect(data) {
      const token = localStorage.getItem("authToken");
      if (token) {
        updateWeb3State({ isConnected: true, userAddress: data.address });
      } else {
        console.log("Connected!", data);
        handleSuccessfulConnect();
      }
    },
    onDisconnect() {
      console.log("Disconnected!");
      updateWeb3State({ isConnected: false, userAddress: null });
    },
  });

  useEffect(() => {
    if (signMessageData) {
      authenticateUser();
    }
  }, [signMessageData]);

  const authenticateUser = async () => {
    try {
      const result = await handleAuthentication(
        address,
        sign_message,
        signMessageData
      );

      if (result?.authenticated) {
        console.log("User authenticated successfully [WalletConnect]");
        updateWeb3State({ isConnected: true, userAddress: address });
        refetchUserVotes();
      } else {
        console.log("Authentication failed");
      }
    } catch (err) {
      console.error("Error signing message:", err);
    }
  };

  const handleSuccessfulConnect = async () => {
    try {
      await signMessage({ message: sign_message });
    } catch (err) {
      console.error("Error signing message:", err);
      updateWeb3State({ isConnected: false, userAddress: null, userVotes: [] });
    }
  };

  const handleSubmit = () => {
    web3State.isConnected
      ? openSubmitModal()
      : alert("Please connect your wallet");
  };

  const handleShowDetailsClick = (proposal) => {
    if (!web3State.isConnected) {
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
