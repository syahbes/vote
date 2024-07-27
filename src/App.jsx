import React, { useEffect, useState } from "react";
import "./App.css";
import {
  useAccount,
  useSignMessage,
  useReadContract,
  useDisconnect,
} from "wagmi";
import { formatUnits } from "viem";

// Component imports
import AwatingSignature from "./components/AwatingSignature/AwatingSignature";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HistoryModal from "./components/historyModal/HistoryModal";
import ProposalCard from "./components/proposalCard/ProposalCard";
import StatsModal from "./components/statsModal/StatsModal";
import SubmitModal from "./components/submitModal/SubmitModal";
import Title from "./components/title/Title";
import VotingModal from "./components/votingModal/VotingModal";

// Hook imports
import { useModals } from "./hooks/useModals";
import { useQuestions } from "./hooks/useQuestions";
import { useUserVotes } from "./hooks/useUserVotes";

// Utility imports
import {
  getFormattedWalletAddress,
  getTimeRemaining,
  handleAuthentication,
} from "./utils/utils";

// Constants
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
  // Hooks
  const { isPending, error, data: questions } = useQuestions();
  const {
    data: signMessageData,
    isPending: isPending_signature,
    error: error_signature,
    signMessageAsync,
  } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { data: userVotes, refetch: refetchUserVotes } = useUserVotes(address);
  const { disconnect } = useDisconnect();
  const { data: tomiBalance } = useReadContract({
    address: TOMI_CONTRACT_ADDRESS,
    abi: tomiABI,
    functionName: "balanceOf",
    args: [address],
    enabled: Boolean(address),
  });

  // State
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [hasSufficientBalance_submit, setHasSufficientBalance_submit] =
    useState(false);

  // Modal hooks
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
    const token = localStorage.getItem("authToken");
    if (isConnected) {
      if (!token) {
        authenticateUser();
      }
    }
  }, [isConnected]);

  // useEffect(() => {
  //   if (isConnected && tomiBalance !== undefined) {
  //     const balanceInTomi = parseFloat(formatUnits(tomiBalance, 18));
  //     const isSufficientBalance_vote = balanceInTomi >= minimumBalance;
  //     setHasSufficientBalance_submit(balanceInTomi >= minimumBalanceForSubmit);
  //     if (!isSufficientBalance_vote) {
  //       setHasSufficientBalance_submit(false);
  //       disconnect();
  //       localStorage.clear();
  //       alert(
  //         `Insufficient TOMI balance. Please top up your wallet.\n\nMinimum balance required: ${minimumBalance} TOMI`
  //       );
  //     }
  //   }
  // }, [tomiBalance]);

  // Functions
  const authenticateUser = async () => {
    try {
      const signature = await signMessageAsync({ message: sign_message });
      const result = await handleAuthentication(
        address,
        sign_message,
        signature
      );
      if (result?.authenticated) {
        console.log("User authenticated successfully [WalletConnect]");
        //check if user has sufficient balance
        refetchUserVotes();
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  const findLastSubmitTime = (address, questions) => {
    const userProposals = questions.filter(
      (q) => q.question_created_by === address
    );
    if (userProposals.length === 0) return null;
    return new Date(
      userProposals.reduce((latest, current) =>
        new Date(current.created_at) > new Date(latest.created_at)
          ? current
          : latest
      ).created_at
    );
  };

  const handleSubmit = () => {
    if (!isConnected) {
      alert("Please connect your wallet");
      return;
    }

    if (!hasSufficientBalance_submit) {
      alert(
        `Insufficient TOMI balance. Please top up your wallet.\n\nMinimum balance required: ${minimumBalanceForSubmit} TOMI`
      );
      return;
    }

    const lastSubmitTime = findLastSubmitTime(address, questions);
    if (lastSubmitTime) {
      const currentTime = new Date();
      const timeDifference = currentTime - lastSubmitTime;
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

  if (isPending_signature) {
    return <AwatingSignature />;
  }

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
