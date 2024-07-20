import { useState } from 'react';

export const useModals = () => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const closeAllModals = () => {
    setShowSubmitModal(false);
    setShowConnectModal(false);
    setShowVotingModal(false);
    setShowStatsModal(false);
    setShowHistoryModal(false);
  };

  return {
    showSubmitModal,
    showConnectModal,
    showVotingModal,
    showStatsModal,
    showHistoryModal,
    openSubmitModal: () => setShowSubmitModal(true),
    openConnectModal: () => setShowConnectModal(true),
    openVotingModal: () => setShowVotingModal(true),
    openStatsModal: () => setShowStatsModal(true),
    openHistoryModal: () => setShowHistoryModal(true),
    closeAllModals
  };
};