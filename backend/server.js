const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const client = require('prom-client');  // Lägg till prom-client

const app = express();
app.use(cors());
app.use(express.json());

// Skapa en register för att hålla dina metrik
const register = new client.Registry();

// Exempel på en counter för antal requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Exempel på en histogram för svarstid
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

// Registrera metrik i Prometheus-register
register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);

// Endpoint för Prometheus att hämta metrik
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Middleware för att spåra alla requests
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({
    method: req.method,
    route: req.path,
  });

  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
    end({ status_code: res.statusCode });
  });

  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the result schema
const resultSchema = new mongoose.Schema({
  username: String,
  totalQuestions: Number,
  correctAnswers: Number,
  score: String,
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

  try {
    const scoreWithPercentage = `${score}%`;
    const passingScoreWithPercentage = `${passingScore}%`;

    const newResult = new Result({
      username,
      totalQuestions,
      correctAnswers,
      score: scoreWithPercentage,
      passingScore: passingScoreWithPercentage,
      grade,
      timeTaken,
      remarks,
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
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching results' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
