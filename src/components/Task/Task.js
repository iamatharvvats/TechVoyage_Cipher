import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import styles from './Task.module.css'; // Import the CSS module

const supabase = createClient(
    "https://psocuvldupkzajpvkgua.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb2N1dmxkdXBremFqcHZrZ3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNTMzNzMsImV4cCI6MjAxODcyOTM3M30.0UdOKtQbhLJRS4avlbegV33lA5GDD8JAOBJnKBBG5w0");
const QuestionDetails = () => {
  const { islandNumber } = useParams();
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        // Fetch the question from the database based on the island number
        const { data, error } = await supabase
          .from('answers')
          .select('question_text')
          .eq('question_id', islandNumber);

        if (error) {
          console.error('Error fetching question:', error);
        } else if (data && data.length > 0) {
          setQuestion(data[0].question_text);
        } else {
          console.warn('Question not found');
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [islandNumber]);

  // Replace newlines with <br> tags
  const formattedQuestion = question.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <>
    <div className={styles.ocean}>
                <div className={styles.wave}></div>
                <div className={`${styles.wave} ${styles.wave2}`}></div>
            </div>
    <div className={styles.QuestionDetails}>
      <div>
      <h2>Question {islandNumber}</h2>
      </div>
      <div>
      {formattedQuestion.length > 0 ? (
        <p>{formattedQuestion}</p>
        ) : (
          <p>Loading question...</p>
          )}
      </div>
    </div>
    </>
  );
};

export default QuestionDetails;