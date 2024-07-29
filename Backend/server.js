const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Surendar@19',
    database: 'coffee_shop'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Endpoint to handle reviews
app.post('/reviews', (req, res) => {
    const { title, review, rating, img } = req.body;
    const sql = 'INSERT INTO reviews (title, review, rating, img) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, review, rating, img], (err, result) => {
        if (err) {
            console.error('Error inserting review:', err);
            return res.status(500).json({ message: 'Error inserting review' });
        }
        res.json({ id: result.insertId, title, review, rating, img });
    });
});

app.get('/reviews', (req, res) => {
    const sql = 'SELECT * FROM reviews ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            return res.status(500).json({ message: 'Error fetching reviews' });
        }
        res.json(results);
    });
});

// Endpoint to delete reviews
app.delete('/reviews/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM reviews WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting review:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete review' });
        }
        res.json({ success: true });
    });
});

// Endpoint to handle user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.json({ id: result.insertId, username, email });
    });
});

// Endpoint to handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ message: 'Error logging in' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }
        const user = results[0];
        if (password === user.password) {
            res.json({ id: user.id, username: user.username });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));