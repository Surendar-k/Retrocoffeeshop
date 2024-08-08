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
    console.log('Received POST request to add review');
    console.log('Request body:', req.body); // Debug log

    const { title, review, rating, img } = req.body;

    // Check if required fields are provided
    if (!title || !review || rating === undefined) {
        console.error('Missing fields in the request body'); // Debug log
        return res.status(400).json({ message: 'Title, review, and rating are required' });
    }

    const sql = 'INSERT INTO reviews (title, review, rating, img) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, review, rating, img || null], (err, result) => {
        if (err) {
            console.error('Error inserting review:', err); // Debug log
            return res.status(500).json({ message: 'Error inserting review' });
        }
        console.log(`Review inserted with ID: ${result.insertId}`); // Debug log
        res.json({ id: result.insertId, title, review, rating, img });
    });
});

// Endpoint to get reviews
app.get('/reviews', (req, res) => {
    const sql = 'SELECT * FROM reviews ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err); // Debug log
            return res.status(500).json({ message: 'Error fetching reviews' });
        }
        res.json(results);
    });
});

// Endpoint to delete reviews
app.delete('/reviews/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Received DELETE request for review with id: ${id}`); // Debug log

    const sql = 'DELETE FROM reviews WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting review:', err); // Debug log
            return res.status(500).json({ success: false, message: 'Failed to delete review' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.json({ success: true });
    });
});

// Endpoint to handle user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // Validate request data
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err); // Debug log
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
            console.error('Error querying user:', err); // Debug log
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

// Endpoint to handle adding menu items
// Endpoint to handle adding menu items
app.post('/menu', (req, res) => {
    const { title, value, isHot, isCold } = req.body;

    if (!title || value === undefined || isHot === undefined || isCold==undefined) {
        return res.status(400).json({ message: 'Title, value, and isHot are required' });
    }

    const sql = 'INSERT INTO menu (title, value, isHot, isCold) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, value, isHot,isCold], (err, result) => {
        if (err) {
            console.error('Error inserting menu item:', err);
            return res.status(500).json({ message: 'Error inserting menu item' });
        }
        res.json({ id: result.insertId, title, value, isHot });
    });
});


// Endpoint to retrieve menu items
app.get('/menu', async (req, res) => {
    try {
        const sql = 'SELECT * FROM menu ORDER BY id ASC';
        const [results] = await db.query(sql);

        res.json(results);
    } catch (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
});


app.post('/products', (req, res) => {
    const { title, price, img, quantity } = req.body;

    if (!title || price === undefined) {
        return res.status(400).json({ message: 'Title and price are required' });
    }

    const sql = 'INSERT INTO products (title, price, img, quantity) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, price, img || null, quantity || 0], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).json({ message: 'Error inserting product' });
        }
        res.json({ id: result.insertId, title, price, img, quantity });
    });
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.json(results);
    });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
