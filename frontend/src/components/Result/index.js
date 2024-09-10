import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';
import { calculateGrade } from '../../utils'; // Adjust the path based on where `calculateGrade` is defined

import Stats from './Stats';
import QNA from './QNA';

const Result = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
  replayQuiz,
  resetQuiz,
  username,  // Add username as a prop
}) => {
  const [activeTab, setActiveTab] = useState('Stats');

  const handleTabClick = (e, { name }) => {
    setActiveTab(name);
  };

  // Function to send result to the backend
  const submitResult = async () => {
    const score = (correctAnswers / totalQuestions) * 100;
    const { grade, remarks } = calculateGrade(score);
    const timeTaken = new Date().toLocaleString();  // Lägger till lokal tid vid quiz-avslut

  
    const passingScore = 60;  // Godkänt gräns


  
    // Logga variablerna för att se om de är korrekt definierade
    console.log('Username:', username);
    console.log('Total Questions:', totalQuestions);
    console.log('Correct Answers:', correctAnswers);
    console.log('Score:', score);
    console.log('Passing Score:', passingScore);  // Lägg till passing score loggning här
    console.log('Grade:', grade);
    console.log('Time Taken:', timeTaken);
    console.log('Remarks:', remarks);
  
    try {
      const response = await fetch('http://localhost:5000/submit-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          totalQuestions,
          correctAnswers,
          score,
          passingScore, // Skickar passingScore
          grade,
          timeTaken,
          remarks,
        }),
      });
  
      const data = await response.json();
      console.log('Result saved successfully:', data);
    } catch (error) {
      console.error('Error submitting result:', error);
    }
  };
  

  // Use effect to submit the result once the component is rendered
  useEffect(() => {
    submitResult(); // Kör endast en gång när komponenten laddas
  }, []);
  
  return (
    <Container>
      <Menu fluid widths={2}>
        <Menu.Item
          name="Stats"
          active={activeTab === 'Stats'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name="QNA"
          active={activeTab === 'QNA'}
          onClick={handleTabClick}
        />
      </Menu>
      {activeTab === 'Stats' && (
        <Stats
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          timeTaken={timeTaken}
          replayQuiz={replayQuiz}
          resetQuiz={resetQuiz}
          username={username}  // Pass the username as a prop
        />
      )}
      {activeTab === 'QNA' && <QNA questionsAndAnswers={questionsAndAnswers} />}
      <br />
    </Container>
  );
};

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,  // Ensure username is passed as a prop
};

export default Result;
