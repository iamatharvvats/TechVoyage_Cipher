// src/App.js
import React from 'react';
import './App.css';
function App() {
  return (
      <div className="app-container">
        <div className="login-container">
          <h2>TECH VOYAGE 2023</h2>
          <h1><span className="highlight">CODEQUEST CHRONICLES CONTEST</span></h1>
          <p>WELCOME!! LET THE BATTLE BEGIN.</p>
          <form>
            <input type="text" placeholder="Team Name" required /><br></br>
            <input type="text" placeholder="Team Leader Name" required /><br></br>
            <input type="text" placeholder="Team Leader ID" required /><br></br>
            <button type="submit">ENTER THE CONTEST</button>
          </form>
      </div>
      </div>
  );
}

export default App;
// src/App.js