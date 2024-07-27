import React, { useEffect, useState } from "react";
import {
  useAccount,
  useSignMessage,
  useReadContract,
  useDisconnect,
} from "wagmi";
import { formatUnits } from "viem";
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

import {
  TOMI_CONTRACT_ADDRESS,
  tomiABI,
  sign_message,
  minimumBalance,
  minimumBalanceForSubmit,
  submitPeriodInHours,
  submitPeriodInMillis,
} from "./utils/constants";

const App = () => {
  const { isPending, error, data: questions } = useQuestions();
  const { data: signMessageData, signMessage } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { data: userVotes, refetch: refetchUserVotes } = useUserVotes(address, {
    onError: (error) => {
      // Handle the error, e.g., show a notification or log out the user
      console.error(error);
    },
  });
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [hasSufficientBalance_submit, setHasSufficientBalance_submit] =
    useState(false);
  const { disconnect } = useDisconnect();

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

  const { data: tomiBalance } = useReadContract({
    address: TOMI_CONTRACT_ADDRESS,
    abi: tomiABI,
    functionName: "balanceOf",
    args: [address],
    enabled: Boolean(address),
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (isConnected && tomiBalance !== undefined) {
      const balanceInTomi = parseFloat(formatUnits(tomiBalance, 18));
      const isSufficientBalance_vote = balanceInTomi >= minimumBalance;
      setHasSufficientBalance_submit(balanceInTomi >= minimumBalanceForSubmit);
      if (isSufficientBalance_vote) {
        if (!token) {
          signMessage({ message: sign_message });
        }
      } else {
        disconnect();
        localStorage.clear();

        alert(
          "Insufficient TOMI balance. Please top up your wallet.\n\n" +
            "Minimum balance required: " +
            minimumBalance +
            " TOMI"
        );
      }
    }
  }, [isConnected, tomiBalance, disconnect, signMessage]);

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

  const findLastSubmitTime = (address, questions) => {
    const userProposals = questions.filter(
      (q) => q.question_created_by === address
    );
    if (userProposals.length === 0) {
      return null;
    }
    const latestProposal = userProposals.reduce((latest, current) => {
      return new Date(current.created_at) > new Date(latest.created_at)
        ? current
        : latest;
    });
    return new Date(latestProposal.created_at);
  };

  const handleSubmit = () => {
    if (!isConnected) {
      alert("Please connect your wallet");
      return;
    }
    
    if (!hasSufficientBalance_submit) {
      alert(
        "Insufficient TOMI balance. Please top up your wallet.\n\n" +
          "Minimum balance required: " +
          minimumBalanceForSubmit +
          " TOMI"
      );
      return;
    }

    const lastSubmitTime = findLastSubmitTime(address, questions);
    if (lastSubmitTime) {
      const currentTime = new Date(); // UTC
      const timeDifference = currentTime - lastSubmitTime; // Milliseconds difference
      if (timeDifference < submitPeriodInMillis) {
        alert(
          `You can only submit a proposal every ${submitPeriodInHours} hours. Please try again later.`
        );
        return;
      }
    }

    openSubmitModal();
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
        <h2>Proposals</h2>
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
