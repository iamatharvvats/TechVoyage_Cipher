import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
const supabase = createClient(
    "https://psocuvldupkzajpvkgua.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already signed in
    const session = supabase.auth.getSession();
    if (session) {
      // If the user is signed in, you might want to perform additional actions
      console.log('User already signed in:', session.user);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      const { user, session, error } = await supabase.auth.signInWithPassword({ email, password });
  
      if (error) {
        throw error;
      } else {
        alert("SIGNED IN");
        console.log('Signed in:', user);

        // Link the authenticated user with the 'users' table
        const { data, error: linkError } = await supabase
          .from('users')
          .upsert([
            {
              //id: user.id, // Assuming user.id is the unique identifier for the user
              email: user.email,
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
      console.error('Error signing in:', error.message);
    }
  };
  

  const handleSignUp = async () => {
    try {
      const { user, session, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw error;
      } else {
        console.log('Signed up:', user);

        // Link the authenticated user with the 'users' table
        const { data, error: linkError } = await supabase
          .from('users')
          .upsert([
            {
              //id: user.id, // Assuming user.id is the unique identifier for the user
              email: email,
              password:password
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
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Auth;
