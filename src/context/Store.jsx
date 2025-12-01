import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    name: "Utilisateur",
    level: "Collège/Lycée",
    language: "Français",
    attentionSpan: "medium",
    score: 0
  });

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // NOUVEAU : On garde le texte du PDF en mémoire pour générer les détails plus tard
  const [pdfContent, setPdfContent] = useState(""); 

  const calculateProfile = (totalScore, maxPossibleScore) => {
    const ratio = totalScore / maxPossibleScore;
    if (ratio < 0.45) return 'short';
    if (ratio < 0.75) return 'medium';
    return 'long';
  };

  const getTimerDuration = () => {
    switch(userProfile.attentionSpan) {
      case 'short': return 15 * 60;
      case 'long': return 45 * 60;
      default: return 25 * 60;
    }
  };

  return (
    <AppContext.Provider value={{
      userProfile, setUserProfile, calculateProfile,
      courseData, setCourseData,
      loading, setLoading,
      pdfContent, setPdfContent, // On exporte ces nouvelles variables
      getTimerDuration
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);