import React from "react";
import "./index.css";
import { useWeb3Context } from "../../main";

const HistoryModal = ({ onClose }) => {
  const { web3State } = useWeb3Context();
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="history-modal-overlay" onClick={handleOverlayClick}>
      <div className="history-modal-content">
        <h3 className="history-modal-title">Voting History</h3>
        {web3State.userVotes && web3State.userVotes.length > 0 ? (
          <ul className="history-vote-list">
            {web3State.userVotes.map((vote) => (
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