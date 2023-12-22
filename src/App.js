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
/**/

/*import { useState,useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Questions from './components/Questions/questions';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Leaderboard from './components/Leaderboard/Leaderboard';
import About from './components/About/About'
import './App.css';

const supabase = createClient("https://psocuvldupkzajpvkgua.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");
function ContestPage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderID, setTeamLeaderID] = useState('');

  useEffect(() => {
    // Check if the user has already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      // User is already logged in, redirect to the Questions page
      navigate('/questions');
    }

    // Check if a specific Team ID is stored in localStorage
    const registeredTeamID = localStorage.getItem('registeredTeamID');

    if (registeredTeamID) {
      // A user with this Team ID is already registered, show the message
      alert('ALREADY REGISTERED');
      // You may also choose to navigate the user to another page or handle it differently
    }
  }, [navigate]);

  const handleButtonClick = async () => {
    // Check if all fields are entered
    if (teamName && teamLeaderName && teamLeaderID) {
      try {
        // Store team information in Supabase
        const { data, error } = await supabase
          .from('teams')
          .upsert([
            {
              Tname: teamName,
              Lname: teamLeaderName,
              T_id: teamLeaderID,
            },
          ]);

        if (error) {
          console.error('Error storing team information:', error.message);
        } else {
          console.log('Team information stored successfully:', data);

          // Save the registered Team ID in localStorage
          localStorage.setItem('registeredTeamID', teamLeaderID);

          // Navigate to the Questions page
          navigate('/questions');
        }
      } catch (error) {
        console.error('Error storing team information:', error.message);
      }
    } else {
      // Handle the case when not all fields are entered
      alert('Please fill in all fields');
    }
  };
/*function ContestPage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderID, setTeamLeaderID] = useState('');
  useEffect(() => {
    // Check if the user has already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      // User is already logged in, redirect to the Questions page
      navigate('/questions');
    }
  }, [navigate]);
  const handleButtonClick = async () => {
    // Check if all fields are entered
    if (teamName && teamLeaderName && teamLeaderID) {
      try {
        // Store team information in Supabase
        const { data, error } = await supabase
          .from('teams')
          .upsert([
            {
              Tname: teamName,
              Lname: teamLeaderName,
              T_id: teamLeaderID,
            },
          ]);

        if (error) {
          console.error('Error storing team information:', error.message);
        } else {
          console.log('Team information stored successfully:', data);
          // Navigate to the Questions page
          navigate('/questions');
        }
      } catch (error) {
        console.error('Error storing team information:', error.message);
      }
    } else {
      // Handle the case when not all fields are entered
      alert('Please fill in all fields');
    }
  };


  return (
    <div className="app-container">
      <Navbar />
      {isAlreadyRegistered ? (
        <div className="login-container">
          <h2>ALREADY REGISTERED</h2>
        </div>
      ) : (
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
        <Footer />
      </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;*/
import { useState,useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Questions from './components/Questions/questions';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Leaderboard from './components/Leaderboard/Leaderboard';
import About from './components/About/About'
import './App.css';

const supabase = createClient("https://psocuvldupkzajpvkgua.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");
function ContestPage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderID, setTeamLeaderID] = useState('');
  useEffect(() => {
    // Check if the user has already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      // User is already logged in, redirect to the Questions page
      navigate('/questions');
    }
  }, [navigate]);
  const handleButtonClick = async () => {
    // Check if all fields are entered
    if (teamName && teamLeaderName && teamLeaderID) {
      try {
        // Store team information in Supabase
        const { data, error } = await supabase
          .from('teams')
          .upsert([
            {
              Tname: teamName,
              Lname: teamLeaderName,
              T_id: teamLeaderID,
            },
          ]);

        if (error) {
          console.error('Error storing team information:', error.message);
        } else {
          console.log('Team information stored successfully:', data);
          // Navigate to the Questions page
          navigate('/questions');
        }
      } catch (error) {
        console.error('Error storing team information:', error.message);
      }
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
        <Footer />
      </div>
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