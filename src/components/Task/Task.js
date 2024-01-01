import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import styles from './Task.module.css'; // Import the CSS module
import Sea from '../Sea/Sea';


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
    {/* <Sea/> */}
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