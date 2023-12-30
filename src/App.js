/*import React from 'react';
import Auth from './Auth';
import Questions from './components/Questions/questions';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>React Supabase Authentication</h1>
      <Router>
      <Routes><Route path="/questions" element={<Questions />} /></Routes>
      <Auth />
      </Router>
    </div>
  );
};

export default App;*/


import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import Header from './components/Header/Header'
import Task from './components/Task/Task'
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

  
  //const [teamName, setTeamName] = useState('');
  //const [teamLeaderName, setTeamLeaderName] = useState('');
  //const [teamLeaderID, setTeamLeaderID] = useState('');
 // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  
  //const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);

  /*useEffect(() => {
    const checkLoggedIn = async () => {
      const jwtToken = cookies.jwtToken;
      if (jwtToken) {
        // You may want to verify the token on the server for security
        setIsLoggedIn(true);
      }
    };
    checkLoggedIn();
  }, [cookies.jwtToken]);*/
  useEffect(() => {
    // Check if the user is already signed in
    Aos.init({duration:2000});
    const session = supabase.auth.getSession();
    setSession(session);
    if (session) {
      // If the user is signed in, you might want to perform additional actions
      //alert('Logged In');
      console.log('User already signed in:', session.user);
    }
  }, []);

  /*const handleButtonClick = async () => {
    // Check if all fields are entered
    if (teamName && teamLeaderName && teamLeaderID) { 
      // Query the Supabase table to check if the entry exists
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('teamname', teamName)
        .eq('leadername', teamLeaderName)
        .eq('leader_id', teamLeaderID);
        //.eq('hashed_leader_id', hashedTeamID);

      if (error) {
        console.error('Error checking entry in the database:', error.message);
        // Handle the error as needed
      } else if (data && data.length > 0) {
        // Entry exists, set login state and navigate to the Questions page
        const jwtToken = 'your_generated_jwt_token'; // Replace with actual JWT token
        setCookie('jwtToken', jwtToken, { path: '/' });
        const teamId = data[0].id; // Assuming the id is stored in the 'id' column
        setIsLoggedIn(true);
        navigate(`/questions/${teamId}`);
      } else {
        // Entry does not exist, insert into leaderboard and navigate to Questions page
        alert("Team Name is not enrolled")
      }
    } else {
      // Handle the case when not all fields are entered
      alert('Please fill in all fields');
    }
  };*/

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

        // Link the authenticated user with the 'users' table
        const { data, error: linkError } = await supabase
          .from('users')
          .upsert([
            {
              //id: user.id, // Assuming user.id is the unique identifier for the user
              email: email,
              password:password,
              teamname:teamname
              // Add other user details as needed
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
  
  /*const handleLogout = () => {
    // Logout logic
    removeCookie('jwtToken');
    setIsLoggedIn(false);
    // Additional logic to clear other state variables if needed
  };*/

  // Render different content based on login state
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
        <h3>If u have already enrolled for the contest kindly Login </h3>
        <button type="button" onClick={handleSignIn}>Login</button>
      </form>
        </div>
      );
    }
  };

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
      </div><Footer /></>
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

/*import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Questions from './components/Questions/questions';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Leaderboard from './components/Leaderboard/Leaderboard';
import About from './components/About/About';
import Rules from './components/Rules/Rules';
import styles from './App.module.css';
import Auth from './components/Auth';
const supabase = createClient("https://psocuvldupkzajpvkgua.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");

function ContestPage(  {session} ) {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderID, setTeamLeaderID] = useState('');
  const [loading, setLoading] = useState(false); // Track login state
  const [user, setUser] = useState(null); // Track user data
  
  useEffect(() => {
  }, [session])
  
  const handleButtonClick = async () => {
    const user = supabase.auth.user()
    // If a user is already logged in, prevent further actions
    if (user) {
      setLoading(true);
      return;
    }
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
        // Entry exists, set login state and navigate to the Questions page
        const teamId = data[0].id; // Assuming the id is stored in the 'id' column
        setLoading(true);
        navigate(`/questions/${teamId}`);
      } else {
        // Entry does not exist, insert into leaderboard and navigate to Questions page
        alert("Team Name is not enrolled");
      }
    } else {
      // Handle the case when not all fields are entered
      alert('Please fill in all fields');
    }
  };

  // Render different content based on login state
  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles['login-container']}>
          <h2>You are already logged in.</h2>
        </div>
      );
    } else {
      return (
        <div className={styles['login-container']}>
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
      );
    }
  };

  return (
    <div className={styles["app-container"]}>
      <Navbar />
      {renderContent()}
      <Footer />
    </div>
  );
}

function App() {
  const [session, setSession] = useState(null)

  useEffect(() =>{
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    
    <Router>
      <div className="container mx-auto">
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route path="/questions/:userId" element={<Questions />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;*/

// App.js
/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questions from './components/Questions/questions';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ParticlesComponent from './components/Particles';
import Leaderboard from './components/Leaderboard/Leaderboard';
import About from './components/About/About';
//import Rules from './components/Rules/Rules';
import styles from './App.module.css';
import WelcomeFile from './WelcomeFile';
//import { createClient } from '@supabase/supabase-js';
import LoginPage from './login';
//const supabase = createClient("https://psocuvldupkzajpvkgua.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");

function App() {
  return (
    <Router>
      <div className={styles["app-container"]}>
        <Navbar />
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path='/welcome' element={<WelcomeFile />}></Route>
      <Route path="/questions/:userId" element={<Questions />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/about" element={<About />} />
    </Routes>
    <Footer />
    <ParticlesComponent />
    </div>
    </Router>
  );
}

export default App;*/
