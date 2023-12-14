import { useEffect, useState } from "react";
import SystemInfo from "../components/SystemInfo/SystemInfo";
type RollData = {
  isWin: boolean;
  number: number | null;
};
const PlayPage = () => {
  const [currentRoll, setCurrentRoll] = useState<RollData>({ isWin: false, number: null });
  const [rollHistory, setRollHistory] = useState<RollData[]>([]);

  // Load the last 5 rolls from local storage on initial render
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('rollHistory') || '[]') || [];
    setRollHistory(history);
  }, []);

  const handleRoll = async () => {
    const entryUrl = import.meta.env.VITE_ENTRY_URL;
    const token = localStorage.getItem('token');
    const response = await fetch(`${entryUrl}/api/v1/entry`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const { data } = await response.json();
      setCurrentRoll(data);

      // Update roll history
      const updatedHistory = [data, ...rollHistory].slice(0, 5);
      setRollHistory(updatedHistory);
      localStorage.setItem('rollHistory', JSON.stringify(updatedHistory));
    } else {
      console.error('Failed to fetch roll');
    }
  };

return (
  <div>
          <SystemInfo />

    <button onClick={handleRoll}>Make a Roll</button>
    <div>
      {currentRoll.number !== null && (
        <div>
          <p>Current Number: {currentRoll.number}</p>
          <p>{currentRoll.isWin ? 'Win' : 'Lose'}</p>
        </div>
      )}
    </div>
    <div>
      <h2>Roll History</h2>
      <ul>
        {rollHistory.map((roll, index) => (
          <li key={index}>Number: {roll.number} - {roll.isWin ? 'Win' : 'Lose'}</li>
        ))}
      </ul>
    </div>
  </div>
);

};

export default PlayPage;
