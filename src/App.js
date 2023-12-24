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
/*<div className="login-container">
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
        <Footer />

export default App;*/
// src/App.js
// src/App.js
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Questions from './components/Questions/questions';
import Footer from './components/Footer/Footer';
import Leaderboard from './components/Leaderboard/Leaderboard';
import About from './components/About/About';
import Rules from './components/Rules/Rules';
import Task from './components/Task/Task'
import styles from './App.module.css';
import { supabase } from './createClient';

function ContestPage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderID, setTeamLeaderID] = useState('');

  const handleButtonClick = async () => {
    // Check if all fields are entered
    if (teamName && teamLeaderName && teamLeaderID) { 
      // Query the Supabase table to check if the entry exists
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('teamname', teamName)
        .eq('leadername', teamLeaderName)
        .eq('leader_id', teamLeaderID);
  
      if (error) {
        console.error('Error checking entry in the database:', error.message);
        // Handle the error as needed
      } else if (data && data.length > 0) {
        // Entry exists, navigate to the Questions page
        const teamId = btoa(data[0].leader_id); // Assuming the id is stored in the 'id' column
        let uri = `/questions/${teamId}`;
        uri=encodeURI(uri)
        console.log(uri)
        navigate(`/questions/${teamId}`);
      } else {
        // Entry does not exist, insert into leaderboard and navigate to Questions page
        alert("Username does not exist or combination is wrong")
      }
    } else {
      // Handle the case when not all fields are entered
      alert('Please fill in all fields');
    }
  };
  
  

  return (
    <div className={styles['app-container']}>
      <div className={styles['login-container']}>
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
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route path="/questions/:userId" element={<Questions/>}/>
        <Route path="/question/:islandNumber" element={<Task/>} />
        <Route path="/questions/:userId/leaderboard" element={<Leaderboard />} /> {/* Route for Leaderboard */}
        <Route path="/questions/:userId/about" element={<About />} /> {/* Route for About */}
        <Route path="/questions/:userId/rules" element={<Rules />} /> {/* Route for Rules */}
      </Routes>
    </Router>
  );
}

export default App;


