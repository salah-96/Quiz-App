import React, { useState } from 'react';
import Layout from '../Layout';
import Loader from '../Loader';
import Main from '../Main';
import Quiz from '../Quiz';
import Result from '../Result';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [username, setUsername] = useState('');  // Nytt state för användarnamn

  // Function to start the quiz
  const handleStartQuiz = (quizData, countdownTime) => {
    setLoading(true);
    setLoadingMessage({
      title: 'Loading your quiz...',
      message: "It won't be long!",
    });
    setCountdownTime(countdownTime);

    setTimeout(() => {
      setData(quizData);
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  // Function to end the quiz
  const endQuiz = resultData => {
    setLoading(true);
    setLoadingMessage({
      title: 'Fetching your results...',
      message: 'Just a moment!',
    });

    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(resultData);
      setLoading(false);
    }, 2000);
  };

  // Function to replay the quiz
  const replayQuiz = () => {
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    setResultData(null);
    // Add any logic to reshuffle questions if needed
  };

  // Function to reset the quiz to home screen
  const resetQuiz = () => {
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    setResultData(null);
    setUsername('');
  };

  if (loading) {
    return <Loader {...loadingMessage} />;
  }

  return (
    <Layout>
      {/* Before starting the quiz */}
      {!isQuizStarted && !isQuizCompleted && (
        <Main startQuiz={handleStartQuiz} setUsername={setUsername} username={username} />
      )}
      {/* When quiz is ongoing */}
      {!loading && isQuizStarted && (
        <Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz} />
      )}
      {/* After quiz completion */}
      {!loading && isQuizCompleted && (
        <Result {...resultData} username={username} replayQuiz={replayQuiz} resetQuiz={resetQuiz} />
      )}
    </Layout>
  );
};

export default App;
