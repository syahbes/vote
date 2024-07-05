import { Clock } from "lucide-react";

const ProposalCard = ({
  imageUrl,
  category,
  title,
  description,
  createdBy,
  createdByAvatar,
  timeRemaining,
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
        <div className="time-remaining">
          <div className="clock-icon">
          <Clock size={16} />
          <span>{timeRemaining} remaining</span>
          </div>
          <button className="view-details">View Details</button>
        </div>
      </div>
    </div>
  );
};

const styles = `
  .card {
    width: 100%;
    max-width: 420px;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--background-color-card);
    border: 1px solid;
  }

  .card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 20px;
  }

  .category {
    background-color: var(--background-color-chip);
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 8px;
    display: block;
    width: fit-content;
    padding: 5px 10px;
    border-radius: 10px;
  }

  .title {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 4px;
    width: fit-content;
    text-transform: uppercase;
  }

  .description {
    color: #CCCCCC;
    font-size: 1rem;
    margin-bottom: 16px;
    width: fit-content;
    text-transform: uppercase;

  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .created-by {
    display: flex;
    align-items: center;
    color: #CCCCCC;
    font-size: 14px;
    gap: 12px;
  }

  .created-by-avatar {
    display: flex;
    align-items: center;
  }

  .team-icon {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }

  .time-remaining {
    display: flex;
    align-items: center;
    color: #CCCCCC;
    font-size: 0.9rem;
    width: 100%;
    justify-content: space-between;
  }

  .clock-icon {
    display: flex;
    align-items: center;
  }

  .time-remaining svg {
    margin-right: 4px;
  }

  .view-details {
    background-color: var(--text-color);
    color: var(--primary-color);
    font-size: 14px;
    font-weight: 400;
    text-transform: capitalize;
    border: none;
    
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-details:hover {
    background-color: #FF1493;
    color: white;
  }
`;

export default ({
  imageUrl,
  title,
  category,
  description,
  createdBy,
  createdByAvatar,
  timeRemaining,
}) => (
  <>
    <style>{styles}</style>
    <ProposalCard
      imageUrl={imageUrl}
      category={category}
      title={title}
      description={description}
      createdBy={createdBy}
      createdByAvatar={createdByAvatar}
      timeRemaining={timeRemaining}
    />
  </>
);
