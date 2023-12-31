import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import FAQComponent from './components/FAQ/FAQComponent';
import Countdown from './components/Countdown/Countdown';
import Header from './components/Header/Header'
import Task from './components/Task/Task'
import BlogList from './components/Blogs/Bloglist';
//import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Questions from './components/Questions/questions';
import About1 from './components/About1/About1';
import ParticlesComponent from './components/Particles';
import Navbar from './components/Navbar/Navbar';
//import crypto from 'crypto-js';
import Footer from './components/Footer/Footer';
import Leaderboard from './components/Leaderboard/Leaderboard';
import About from './components/About/About';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Rules from './components/Rules/Rules';
import styles from './App.module.css';

const supabase = createClient(
  "https://psocuvldupkzajpvkgua.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");

function ContestPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamname,setteamname]=useState('')
  const [session, setSession] = useState(supabase.auth.getSession());
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({duration:2000});
    const session = supabase.auth.getSession();
    setSession(session);
    if (session) {
      console.log('User already signed in:', session.user);
    }
  }, []);


  const handleSignIn = async () => {
    try {
      if (!email || !password|| !teamname) {
        alert('Please fill in all fields');
        return;
      }
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      } else {
        console.log('Signed in:', user);
        //const { data, error } = await supabase.auth.admin.getUserById(1)
        const { data, error } = await supabase
        .from('users')
        .select('id','email','teamname')
        .eq('email', email)
        console.log(data);
        //.eq('leadername', teamLeaderName)
        //.eq('leader_id', teamLeaderID);
        //.eq('hashed_leader_id', hashedTeamID);
        if (data && data.length>0){
        const teamId = data[0].id
        navigate(`/questions/${teamId}`);
        }
      }}
        catch (error) {
      console.error('Error signing in:', error.message);
      alert("Wrong Credentials. Sign Up Before Login");
    }
  };


  const handleSignUp = async () => {
    try {
      if (!email || !password|| !teamname) {
        alert('Please fill in all fields');
        return;
      }
      const { user, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw error;
      } else {
        console.log('Signed up:', user);
        alert("Signed up successfully. Confirm it before login on your registered mailId.")

        const { data, error: linkError } = await supabase
          .from('users')
          .upsert([
            {
             
              email: email,
              password:password,
              teamname:teamname
            
            },
          ]);

        if (linkError) {
          console.error('Error linking user with users table:', linkError.message);
        } else {
          console.log('User linked with users table:', data);
        }
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      console.log("Already Exists")
    }
  };
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(false);
      console.log('Signed out successfully');
      alert("You are logged out successfully.")
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  
 
  const renderContent = () => {
    if (session) {
      return (
        <div data-aos="fade-up" className={styles['login-container']}>
           <h1>TechVoyage 2023 CIPHER</h1>
      <h1>CODEQUEST CHRONICLES</h1>
          <h2>You are already logged in. </h2>
          <button onClick={handleSignOut}>Logout</button><br /><br />
        </div>
      );
    } else {
      return (
        <div data-aos ="fade-up" className={styles['login-container']}>
           <h2>TechVoyage 2023 CIPHER</h2>
      <h1>CODEQUEST CHRONICLES</h1>
      <h2>Let the battle begin</h2>
          <form>
          <input
              type="text"
              placeholder="Team Name"
              value={teamname}
              onChange={(e) => setteamname(e.target.value)}
              required
            /><br />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="button" onClick={handleSignUp}>Get Started</button>
        <h2>If u have already enrolled for the contest kindly Login </h2>
        <button type="button" onClick={handleSignIn}>Login</button>
      </form>
        </div>
      );
    }
  };

  const faqs = [
    {
      question: 'Q1. How are you?',
      answer: 'Ans1. I am fine.',
    },
    {
      question: 'Q2. Your name?',
      answer: 'Ans2. Atharv VATS',
    },
    // Add more FAQs as needed
  ];

  return (
    <>
    <Navbar />
    <Header />
    <div data-aos="fade-right" className='about'>
      <About1 />
    </div>
      <div className={styles.container}>
      {renderContent()}
    </div>
    <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={`${styles.wave} ${styles.wave2}`}></div>
      </div><div data-aos ="fade-left"><FAQComponent faqs={faqs} /></div><Countdown /><Footer /></>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route path="/questions/:userId" element={<Questions/>}/>
        <Route path="/question/:islandNumber" element={<Task />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;

