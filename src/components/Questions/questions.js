import React, { useState} from 'react';
import './questions.css';
import Navbar from 'C:/Users/ATHARV VATS/questions/src/components/Navbar/Navbar';
const islandImages = Array.from({ length: 25 }, (_, i) => i + 1);

function Questions() {
  const [unlockedIsland, setUnlockedIsland] = useState(1);
  const [completedIslands, setCompletedIslands] = useState([]);

  const openQuestion = (islandNumber, e) => {
    e.preventDefault();

    if (islandNumber <= unlockedIsland && !completedIslands.includes(islandNumber)) {
      const questionUrl = `https://example.com/question/${islandNumber}`;
      window.open(questionUrl, '_blank');
    }
  };

  const submitAnswer = (islandNumber) => {
    setCompletedIslands([...completedIslands, islandNumber]);
    setUnlockedIsland((prevUnlocked) => prevUnlocked + 1);
  };


  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>QUESTIONS</h1>
      </header>
      <div className="Island-container">
        {islandImages.map((islandNumber) => (
          <div
            key={islandNumber}
            className={`Island ${islandNumber <= unlockedIsland ? 'unlocked' : 'locked'}`}
          >
            <a
              href={islandNumber <= unlockedIsland && !completedIslands.includes(islandNumber) ? '#' : undefined}
              onClick={(e) => openQuestion(islandNumber, e)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/islands.png" alt={`Island ${islandNumber}`} className="Island-img" />
            </a>
            <div className="Lock-button-container">
              <button
                onClick={() => openQuestion(islandNumber)}
                disabled={!completedIslands.includes(islandNumber) || islandNumber !== unlockedIsland}
                className={`Lock-button ${completedIslands.includes(islandNumber) ? 'unlocked' : 'locked'}`}
              >
                {completedIslands.includes(islandNumber) ? 'UNLOCKED' : 'LOCKED'}
              </button>
            </div>
            {completedIslands.includes(islandNumber) ? (
              <p className="Island-message">Task submitted!</p>
            ) : (
              <>
                <div className="Island-heading">
                  <h3>ISLAND {islandNumber}</h3>
                </div>
                {islandNumber <= unlockedIsland && (
                  <div className="Answer-container">
                    <input type="text" placeholder="Your answer" />
                    <button onClick={() => submitAnswer(islandNumber)} disabled={islandNumber !== unlockedIsland}>
                      Submit
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
