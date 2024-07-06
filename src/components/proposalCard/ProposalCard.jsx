import { Clock } from "lucide-react";
import './index.css'

const ProposalCard = ({
  imageUrl,
  category,
  title,
  description,
  createdBy,
  createdByAvatar,
  timeRemaining,
  onClick,
  id,
}) => {
  return (
    <div
      className="card"
      style={{
        borderColor:
          category === "Team"
            ? "var(--primary-color)"
            : "var(--card-border-color)",
      }}>
      <img src={imageUrl} alt="Proposal" className="card-image" />
      <div className="card-content">
        <span
          className="category"
          style={{
            color:
              category === "Team"
                ? "var(--primary-color)"
                : "var(--accent-color)",
          }}>
          {category}
        </span>
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
        <div className="meta">
          <div className="created-by">
            <span>Created By</span>
            <div className="created-by-avatar">
              <img src={createdByAvatar} alt="Team" className="team-icon" />
              <span>{createdBy}</span>
            </div>
          </div>
        </div>
        <div className="time-remaining-card">
          <div className="clock-icon">
            <Clock size={16} />
            <span>{timeRemaining} remaining</span>
          </div>
          <button className="view-details" onClick={onClick}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;