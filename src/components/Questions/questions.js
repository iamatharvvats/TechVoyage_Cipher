import React, { useState, useEffect } from 'react';
import styles from './questions.module.css';
import Navbar from "../Navbar/Navbar"
import { supabase } from '../../createClient';
import { useParams } from 'react-router-dom';


const islandImages = Array.from({ length: 25 }, (_, i) => i + 1);

function Questions() {
  let { userId } = useParams();
  const [userAnswer, setUserAnswer] = useState('');
  const [unlockedIsland, setUnlockedIsland] = useState(1);
  const [completedIslands, setCompletedIslands] = useState([]);
  const [points, setPoints] = useState();


  const fetchUserPoints = async (userId) => {

    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('id,points')
        .eq('id', userId)

      console.log(data[0].points)

      if (error) {
        console.error('Error fetching user points:', error);
      } else if (data) {
        setPoints(data[0].points || 0);

      }
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  const fetchUnlockedIsland = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('id,unlocked_island')
        .eq('id', userId)

      console.log("Unlocked Island:" + data[0].unlocked_island)

      if (error) {
        console.error('Error fetching user unlocked island:', error);
      } else if (data) {
        setUnlockedIsland(data[0].unlocked_island || 0);

      }
    } catch (error) {
      console.error('Error fetching user unlocked island:', error);
    }
  };

  const fetchCompletedIslands = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('id,completed_islands')
        .eq('id', userId)

      console.log("Completed islands:" + data[0].completed_islands)

      if (error) {
        console.error('Error fetching user completed islands:', error);
      } else if (data) {
        setCompletedIslands(data[0].completed_islands || [0]);

      }
    } catch (error) {
      console.error('Error fetching user completed islands:', error);
    }
  };

  useEffect(() => {
    fetchUserPoints(userId);
    fetchUnlockedIsland(userId);
    fetchCompletedIslands(userId);
    console.log(userId);
  }, [userId]);

  const openQuestion = (islandNumber, e) => {
    e.preventDefault();

    if (islandNumber <= unlockedIsland && !completedIslands.includes(islandNumber)) {
      const questionUrl = `https://example.com/question/${islandNumber}`;
      window.open(questionUrl, '_blank');
    }
  };

  const submitAnswer = async (islandNumber) => {
    // Fetch the correct answer from the answers table
    const { data: correctAnswerData, error: correctAnswerError } = await supabase
      .from('answers')
      .select('*')
      .eq('question_id', islandNumber);

    if (correctAnswerError) {
      console.error('Error fetching correct answer:', correctAnswerError);
      return;
    }

    const correctAnswer = correctAnswerData[0]?.answer_text;

    // Check if the user's answer is correct
    if (userAnswer === correctAnswer) {
      // Update completedIslands based on previous state
      setCompletedIslands((prevCompletedIslands) => [...prevCompletedIslands, islandNumber]);

      // Update unlockedIsland based on previous state
      setUnlockedIsland((prevUnlocked) => prevUnlocked + 1);

      // Update points based on previous state
      setPoints((prevPoints) => prevPoints + correctAnswerData[0].answer_points);

      // Update the database
      try {
        await supabase
          .from('leaderboard')
          .update({
            points: points + correctAnswerData[0].answer_points,
            unlocked_island: unlockedIsland + 1,
            completed_islands: [...completedIslands, islandNumber],
          })
          .eq('id', userId);
      } catch (updateError) {
        console.error('Error updating database:', updateError);
      }
    } else {
      // Handle incorrect answer case (e.g., show an error message)
      alert('Incorrect answer. Try again!');
    }
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };


  return (
    <div className={styles.App}>
      <Navbar />
      <header className={styles['App-header']}>
        <h1>QUESTIONS</h1>
      </header>
      <div className={styles['Island-container']}>
        {islandImages.map((islandNumber) => (
          <div
            key={islandNumber}
            className={`${styles.Island} ${islandNumber <= unlockedIsland ? styles.unlocked : styles.locked}`}
          >
            <a
              href={islandNumber <= unlockedIsland && !completedIslands.includes(islandNumber) ? '#' : undefined}
              onClick={(e) => openQuestion(islandNumber, e)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/islands.png" alt={`Island ${islandNumber}`} className={styles['Island-img']} />
            </a>
            <div className={styles['Lock-button-container']}>
              <button
                onClick={() => openQuestion(islandNumber)}
                disabled={!completedIslands.includes(islandNumber) || islandNumber !== unlockedIsland}
                className={`${styles['Lock-button']} ${completedIslands.includes(islandNumber) ? styles.unlocked : styles.locked}`}
              >
                {completedIslands.includes(islandNumber) ? 'UNLOCKED' : 'LOCKED'}
              </button>
            </div>
            {completedIslands.includes(islandNumber) ? (
              <p className={styles['Island-message']}>Task submitted!</p>
            ) : (
              <>
                <div className={styles['Island-heading']}>
                  <h3>ISLAND {islandNumber}</h3>
                </div>
                {islandNumber <= unlockedIsland && (
                  <div className={styles['Answer-container']}>
                    <input type="text" placeholder="Your answer" value={userAnswer} onChange={handleInputChange} />
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
