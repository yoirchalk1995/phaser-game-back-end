const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// In-memory storage for high scores
let topScores = [
    { name: 'Player1', score: 1 },
    { name: 'Player2', score: 2 },
    { name: 'Player3', score: 3 },
];

// Endpoint to get high scores
app.get('/highscores', (req, res) => {
    res.json({ topScores });
});

// Endpoint to update high scores
app.post('/highscores', (req, res) => {
    const { name, score } = req.body;

    // Add the new high score to the list
    topScores.push({ name, score });
    topScores.sort((a, b) => b.score - a.score); // Sort by score descending
    topScores = topScores.slice(0, 3); // Keep only the top 3 scores

    res.json({ message: 'High score added!', topScores });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
