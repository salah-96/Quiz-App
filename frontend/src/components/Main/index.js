import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
  Form,
  Header,
  Input,
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';

import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';

const Main = ({ startQuiz, setUsername, username }) => {  // Accept username and setUsername as props
  const [step, setStep] = useState(1);  // Manage steps
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');
  const [questionsType, setQuestionsType] = useState('0');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    username &&
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    fetch(API)
      .then(response => response.json())
      .then(data =>
        setTimeout(() => {
          const { response_code, results } = data;

          if (response_code === 1) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{' '}
                <strong>Difficulty Level</strong>, or{' '}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }

          results.forEach(element => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers,
            ]);
          });

          setProcessing(false);
          startQuiz(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch(error =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  if (offline) return <Offline />;

  // Steg 1: Användarnamn
  if (step === 1) {
    return (
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Image src={mindImg} />
              <Item.Content>
                <Header as="h1" textAlign="center">
                  Welcome to the Ultimate  Quiz
                </Header>
                <Divider />
                <Form>
                  <Form.Field>
                    <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Please enter your username:</label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={processing}
                      style={{ width: '100%', padding: '10px', borderRadius: '5px', fontSize: '16px' }}
                    />
                  </Form.Field>
                </Form>
                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    size="big"
                    content="Next"
                    onClick={() => setStep(2)}
                    disabled={!username}
                    fluid
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Container>
    );
  }

  // Steg 2: Välj quizinställningar
  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Header as="h1" textAlign="center">Choose Your Quiz Settings</Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <Form>
                  <Form.Field>
                    <label>In which category do you want to play the quiz?</label>
                    <Dropdown
                      fluid
                      selection
                      name="category"
                      placeholder="Select Quiz Category"
                      header="Select Quiz Category"
                      options={CATEGORIES}
                      value={category}
                      onChange={(e, { value }) => setCategory(value)}
                      disabled={processing}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>How many questions do you want in your quiz?</label>
                    <Dropdown
                      fluid
                      selection
                      name="numOfQ"
                      placeholder="Select No. of Questions"
                      header="Select No. of Questions"
                      options={NUM_OF_QUESTIONS}
                      value={numOfQuestions}
                      onChange={(e, { value }) => setNumOfQuestions(value)}
                      disabled={processing}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>How difficult do you want your quiz to be?</label>
                    <Dropdown
                      fluid
                      selection
                      name="difficulty"
                      placeholder="Select Difficulty Level"
                      header="Select Difficulty Level"
                      options={DIFFICULTY}
                      value={difficulty}
                      onChange={(e, { value }) => setDifficulty(value)}
                      disabled={processing}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Which type of questions do you want in your quiz?</label>
                    <Dropdown
                      fluid
                      selection
                      name="type"
                      placeholder="Select Questions Type"
                      header="Select Questions Type"
                      options={QUESTIONS_TYPE}
                      value={questionsType}
                      onChange={(e, { value }) => setQuestionsType(value)}
                      disabled={processing}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Please select the countdown time for your quiz:</label>
                    <Form.Group widths="equal">
                      <Dropdown
                        search
                        selection
                        name="hours"
                        placeholder="Select Hours"
                        options={COUNTDOWN_TIME.hours}
                        value={countdownTime.hours}
                        onChange={handleTimeChange}
                        disabled={processing}
                      />
                      <Dropdown
                        search
                        selection
                        name="minutes"
                        placeholder="Select Minutes"
                        options={COUNTDOWN_TIME.minutes}
                        value={countdownTime.minutes}
                        onChange={handleTimeChange}
                        disabled={processing}
                      />
                      <Dropdown
                        search
                        selection
                        name="seconds"
                        placeholder="Select Seconds"
                        options={COUNTDOWN_TIME.seconds}
                        value={countdownTime.seconds}
                        onChange={handleTimeChange}
                        disabled={processing}
                      />
                    </Form.Group>
                  </Form.Field>
                </Form>
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Processing...' : 'Play Now'}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                  fluid
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
