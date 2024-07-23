import React from "react";
import "./index.css";
import { useUserVotes } from "../../hooks/useUserVotes";
import { useAccount } from "wagmi";

const HistoryModal = ({ show, onClose }) => {
  const { address } = useAccount();
  const { data: userVotes, isLoading, error } = useUserVotes(address);

  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="history-modal-overlay" onClick={handleOverlayClick}>
      <div className="history-modal-content">
        <h3 className="history-modal-title">Voting History</h3>
        {error && <p className="history-error">Error: {error.message}</p>}
        {isLoading ? (
          <p className="history-loading">Loading...</p>
        ) : userVotes && userVotes.length > 0 ? (
          <ul className="history-vote-list">
            {userVotes.map((vote) => (
              <li key={vote.vote_id} className="history-vote-item">
                <p className="history-vote-question">{vote.question_title}</p>
                <p className="history-vote-option">Voted: {vote.option_text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="history-no-votes">No voting history available.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
