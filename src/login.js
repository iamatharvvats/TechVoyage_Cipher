import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styles from './App.module.css';
const supabase = createClient("https://psocuvldupkzajpvkgua.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");

const LoginPage = () => {
  const [teamname, setTeamname] = useState('');
  const [leadername, setLeadername] = useState('');
  const [leaderId, setLeaderId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const jwtToken = cookies.jwtToken;
      if (jwtToken) {
        // You may want to verify the token on the server for security
        setIsLoggedIn(true);
      }
    };

    checkLoggedIn();
  }, [cookies.jwtToken]);

  const handleLogin = async () => {
    // Check if all fields are filled
    if (!teamname || !leadername || !leaderId) {
      alert('Please fill in all fields');
      return;
    }

    // Fetch data from Supabase
    const { data, error } = await supabase
      .from('leaderboard')
      .select()
      .eq('teamname', teamname)
      .eq('leadername', leadername)
      .eq('leader_id', leaderId);

    if (error) {
      console.error('Error fetching data:', error.message);
      return;
    }

    if (data.length === 1) {
      // Login successful
      const jwtToken = 'your_generated_jwt_token'; // Replace with actual JWT token
      setCookie('jwtToken', jwtToken, { path: '/' });
      setIsLoggedIn(true);
      const teamId = data[0].id; // Assuming the id is stored in the 'id' column
      navigate(`/questions/${teamId}`);
    } else {
      // Login failed
      alert('Invalid credentials. You are not enrolled in the Contest.');
    }
  };

  const handleLogout = () => {
    // Logout logic
    removeCookie('jwtToken');
    setIsLoggedIn(false);
    // Additional logic to clear other state variables if needed
  };

  const handlewelcome = () =>{
      //navigate(`/welcome`)
      //navigate(`/questions/${teamId}`);
  }

  return (
    <div>
      {!isLoggedIn ? (
        /*<div>
          <label>
            Teamname:
            <input type="text" value={teamname} onChange={(e) => setTeamname(e.target.value)} />
          </label>
          <br />
          <label>
            Leadername:
            <input type="text" value={leadername} onChange={(e) => setLeadername(e.target.value)} />
          </label>
          <br />
          <label>
            Leader ID:
            <input type="text" value={leaderId} onChange={(e) => setLeaderId(e.target.value)} />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>*/
        <div className={styles['login-container']}>
        <form>
      <input
        type="text"
        placeholder="Team Name"
        value={teamname}
        onChange={(e) => setTeamname(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Team Leader Name"
        value={leadername}
        onChange={(e) => setLeadername(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Team Leader ID"
        value={leaderId}
        onChange={(e) => setLeaderId(e.target.value)}
        required
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      </form>
      </div>
      ) : (
        <div className={styles['login-container']}>
        <h1>You are already logged in.</h1>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handlewelcome}>Welcome</button>
        </div>
  )}
  </div>
  );
};

export default LoginPage;
