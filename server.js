const express = require('express');
const cors = require('cors');
const db = require('./db')

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to get high scores
app.get('/highscores', (req, res) => {
    db.query('SELECT * FROM highscores ORDER BY score DESC LIMIT 3', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch high scores' });
        }
        res.json({ topScores: results });
    });
});

// Endpoint to update high scores
app.post('/highscores', (req, res) => {
    const { name, score } = req.body;

    if (!name || score === undefined) {
        return res.status(400).json({ error: 'Name and score are required' });
    }

    // Insert the new high score
    db.query(
        'INSERT INTO highscores (name, score) VALUES (?, ?)',
        [name, score],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to add high score' });
            }

            // Fetch updated top scores
            db.query('SELECT * FROM highscores ORDER BY score DESC LIMIT 3', (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to fetch updated high scores' });
                }
                res.json({ message: 'High score added!', topScores: results });
            });
        }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
