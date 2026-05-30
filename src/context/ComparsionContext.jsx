import { createContext, useContext, useState } from "react";

export const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [selectedCrews, setSelectedCrews] = useState([]);

  const addCrew = (crew) => {
    if (selectedCrews.length === 2) {
      alert("You can compare up to two crews at a time.");
      return;
    }

    if (!selectedCrews.some((selectedCrew) => selectedCrew._id === crew._id)) {
      setSelectedCrews((previousCrews) => [...previousCrews, crew]);
    } else {
      console.log("Crew already added for comparison");
    }
  };

  const removeCrew = (crewId) => {
    const updatedCrews = selectedCrews.filter((crew) => crew._id !== crewId);
    setSelectedCrews(updatedCrews);
  };

  const clearComparison = () => {
    setSelectedCrews([]);
  };

  const value = {
    selectedCrews,
    addCrew,
    removeCrew,
    clearComparison,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
