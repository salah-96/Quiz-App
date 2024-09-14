const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/quizdb');

// Define the result schema
const resultSchema = new mongoose.Schema({
  username: String,
  totalQuestions: Number,
  correctAnswers: Number,
  score: String ,
  passingScore: String,
  grade: String,
  timeTaken: String,
  remarks: String,
});

// Define the Result model
const Result = mongoose.model('Result', resultSchema);

// Endpoint to save quiz result
app.post('/submit-result', async (req, res) => {
    const { username, totalQuestions, correctAnswers, score, passingScore, grade, timeTaken, remarks } = req.body;
  
    // Logga det inkommande objektet för att se att allt skickas korrekt
    console.log('Received data:', req.body);  // Logga det inkommande datat här
  
    try {
      // Konvertera score och passingScore till strängar med procenttecken
      const scoreWithPercentage = `${score}%`;
      const passingScoreWithPercentage = `${passingScore}%`;
  
      // Skapa ett nytt resultatobjekt
      const newResult = new Result({
        username,
        totalQuestions,
        correctAnswers,
        score: scoreWithPercentage,  // Spara poäng med procenttecken
        passingScore: passingScoreWithPercentage,  // Spara passingScore med procenttecken
        grade,
        timeTaken,
        remarks
      });
  
      const savedResult = await newResult.save();
      res.json({ message: 'Result saved', result: savedResult });
    } catch (error) {
      res.status(500).json({ error: 'Error saving result' });
    }
  });
  
  


  // GET endpoint to fetch all quiz results
app.get('/results', async (req, res) => {
    try {
      // Hämta alla resultat från databasen
      const results = await Result.find();
      res.json(results); // Skicka resultaten som JSON
    } catch (error) {
      res.status(500).json({ error: 'Error fetching results' });
    }
  });
  
  
  

// Start the server
app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
