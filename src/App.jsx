import "./App.css";
import Header from "./components/Header";
import Title from "./components/Title";
import ProposalCard from "./components/ProposalCard";
import Footer from "./components/Footer";

import cardbga from "./assets/cardbga.png";
import cardbgb from "./assets/cardbgb.png";
import ellipse5 from "./assets/ellipse5.png";
import ellipse6 from "./assets/ellipse6.png";

const TEMP_MOCK_DATA = [
  {
    imageUrl: cardbga,
    category: "Team",
    title: "Tomi browser name",
    description: "Give a new name to tomi browser",
    createdBy: "Team",
    timeRemaining: "5 hours",
    createdByAvatar: ellipse5,
    id: 1,
  },
  {
    imageUrl: cardbgb,
    category: "Community",
    title: "New User Board for the DAO",
    description: "Give a new name to tomi browser",
    createdBy: "0x00...7777777",
    createdByAvatar: ellipse6,
    timeRemaining: "3 hours",
    id: 2,
  },
  {
    imageUrl: cardbga,
    category: "Team",
    title: "Tomi browser name",
    description: "Give a new name to tomi browser",
    createdBy: "Team",
    timeRemaining: "5 hours",
    createdByAvatar: ellipse5,
    id: 3,
  },
  {
    imageUrl: cardbgb,
    category: "Community",
    title: "New User Board for the DAO",
    description: "Give a new name to tomi browser",
    createdBy: "0x00...7777777",
    createdByAvatar: ellipse6,
    timeRemaining: "3 hours",
    id: 4,
  },
  {
    imageUrl: cardbga,
    category: "Team",
    title: "Tomi browser name",
    description: "Give a new name to tomi browser",
    createdBy: "Team",
    timeRemaining: "5 hours",
    createdByAvatar: ellipse5,
    id: 5,
  },
  {
    imageUrl: cardbgb,
    category: "Community",
    title: "New User Board for the DAO",
    description: "Give a new name to tomi browser",
    createdBy: "0x00...7777777",
    createdByAvatar: ellipse6,
    timeRemaining: "3 hours",
    id: 6,
  },
  {
    imageUrl: cardbgb,
    category: "Community",
    title: "New User Board for the DAO",
    description: "Give a new name to tomi browser",
    createdBy: "0x00...7777777",
    createdByAvatar: ellipse6,
    timeRemaining: "3 hours",
    id: 7,
  },
  {
    imageUrl: cardbgb,
    category: "Community",
    title: "New User Board for the DAO",
    description: "Give a new name to tomi browser",
    createdBy: "0x00...7777777",
    createdByAvatar: ellipse6,
    timeRemaining: "3 hours",
    id: 8,
  },
  {
    imageUrl: cardbga,
    category: "Team",
    title: "Tomi browser name",
    description: "Give a new name to tomi browser",
    createdBy: "Team",
    timeRemaining: "5 hours",
    createdByAvatar: ellipse5,
    id: 9,
  },
];

const App = () => {
  return (
    <div className="app">
      <Header />
      <Title />
      <div className="proposalsTitle">
        <h3>Proposals</h3>
      </div>
      <main className="proposalsContainer">
        {TEMP_MOCK_DATA.map((proposal) => (
          <ProposalCard
            imageUrl={proposal.imageUrl}
            category={proposal.category}
            title={proposal.title}
            description={proposal.description}
            createdBy={proposal.createdBy}
            createdByAvatar={proposal.createdByAvatar}
            timeRemaining={proposal.timeRemaining}
            key={proposal.id}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

const styles = `
.app {
  width: 100%;
  min-height: 100vh;
}

.proposalsTitle {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
}

.proposalsContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
`;
export default () => (
  <>
    <style>{styles}</style>
    <App />
  </>
);
