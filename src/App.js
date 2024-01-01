import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import FAQComponent from './components/FAQ/FAQComponent';
import Countdown from './components/Countdown/Countdown';
import Header from './components/Header/Header'
import Task from './components/Task/Task'
import Questions from './components/Questions/questions';
import About1 from './components/About1/About1';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Leaderboard from './components/Leaderboard/Leaderboard';
import About from './components/About/About';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Rules from './components/Rules/Rules';
import styles from './App.module.css';


function ContestPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamname, setteamname] = useState('')
  // const [session, setSession] = useState(supabase.auth.getSession());
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    // const session = supabase.auth.getSession();
    // setSession(session);
    // if (session) {
    //   console.log('User already signed in:', session.user);
    // }
  }, []);


  const handleSignIn = async () => {
    try {
      if (!email || !password || !teamname) {
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
          .select('id', 'email', 'teamname')
          .eq('email', email)
        console.log(data);
        //.eq('leadername', teamLeaderName)
        //.eq('leader_id', teamLeaderID);
        //.eq('hashed_leader_id', hashedTeamID);
        if (data && data.length > 0) {
          const teamId = data[0].id
          navigate(`/questions/${teamId}`);
        }
      }
    }
    catch (error) {
      console.error('Error signing in:', error.message);
      alert("Wrong Credentials. Sign Up Before Login");
    }
  };


  const handleSignUp = async () => {
    try {
      if (!email || !password || !teamname) {
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
              password: password,
              teamname: teamname

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

  


  const renderContent = () => {
    // // if (session) {
    //   return (
    //     <div data-aos="fade-up" className={styles['login-container']}>
    //       <h1>TechVoyage 2023 CIPHER</h1>
    //       <h1>CODEQUEST CHRONICLES</h1>
    //       <h2>You are already logged in. </h2>
    //       <button onClick={handleSignOut}>Logout</button><br /><br />
    //     </div>
    //   );
    // } else {
      return (
        <div data-aos="fade-up" className={styles['login-container']}>
          <h1>Let the battle begin</h1>
          <form>
            <input
              type="text"
              placeholder="Team Name"
              value={teamname}
              onChange={(e) => setteamname(e.target.value)}
              required
            /><br />
            <input type="text" value={email} placeholder="Team Leader Email Id" onChange={(e) => setEmail(e.target.value)} required /><br />
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <br />
            <button type="button" onClick={handleSignUp}>Get Started</button>
            <h2>If you have already enrolled for the contest kindly Login </h2>
            <button type="button" onClick={handleSignIn}>Login</button>
          </form>
        </div>
      );
    }

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
      <div data-aos="fade-left"><FAQComponent faqs={faqs} /></div><Countdown /><Footer />
      </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route path="/questions/:userId" element={<Questions />} />
        <Route path="/question/:islandNumber" element={<Task />} />
        <Route path="/questions/:userId/leaderboard" element={<Leaderboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/questions/:userId/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/questions/:userId/rules" element={<Rules />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;

