// src/App.js
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Questions from './components/questions'
import './App.css';
function App() {
  return (
    <Router>
    <div className="app-container">
      <div className="login-container">
        <h2>TECH VOYAGE 2023</h2>
        <h1><span className="highlight">CODEQUEST CHRONICLES CONTEST</span></h1>
        <p>WELCOME!! LET THE BATTLE BEGIN.</p>
        <form>
          <input type="text" placeholder="Team Name" required /><br></br>
          <input type="text" placeholder="Team Leader Name" required /><br></br>
          <input type="text" placeholder="Team Leader ID" required /><br></br>
          <button type="button">
            ENTER THE CONTEST
          </button>
        </form>
      </div>
    </div>
    <Routes>
      <Route path="./components/questions" element={<Questions />}></Route>
    </Routes>
    </Router>
  );
}

export default App;*/
// src/App.js
// src/App.js
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Questions from './components/Questions/questions';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Leaderboard from './components/Leaderboard/Leaderboard';
import './App.css';

function ContestPage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderID, setTeamLeaderID] = useState('');

  const handleButtonClick = () => {
    // Check if all fields are entered
    if (teamName && teamLeaderName && teamLeaderID) {
      // Navigate to the Questions page
      navigate('/questions');
    } else {
      // Handle the case when not all fields are entered
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="login-container">
        <h2>TECH VOYAGE 2023</h2>
        <h1>
          <span className="highlight">CODEQUEST CHRONICLES CONTEST</span>
        </h1>
        <p>WELCOME!! LET THE BATTLE BEGIN.</p>
        <form>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Team Leader Name"
            value={teamLeaderName}
            onChange={(e) => setTeamLeaderName(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Team Leader ID"
            value={teamLeaderID}
            onChange={(e) => setTeamLeaderID(e.target.value)}
            required
          />
          <br />
          <button type="button" onClick={handleButtonClick}>
            ENTER THE CONTEST
          </button>
        </form>
        </div>
        <Footer /></div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> {/* Route for Leaderboard */}
      </Routes>
    </Router>
  );
}

export default App;


