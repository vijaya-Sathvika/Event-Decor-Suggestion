require('dotenv').config(); // Load environment variables from .env

console.log("MONGO_CONNECTION_STRING:", process.env.MONGO_CONNECTION_STRING);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const User = require('./models/user'); // Ensure this is your user model with methods like isValidPassword

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (e.g., stylesheets, images)
app.use(
  session({
    secret: 'mysecret', // Session secret, should be secure in production
    resave: false,
    saveUninitialized: true,
  })
);

// View engine setup
app.set('view engine', 'ejs');

// MongoDB connection setup
const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message); // Improved error message
  });

// Routes for Signin and Signup Pages
app.get('/', (req, res) => {
  res.render('signin', { error: null });
});

// Signin route
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await user.isValidPassword(password)) {
      req.session.user = user; // Store user info in the session
      res.redirect('/app'); // Redirect to React app after successful login
    } else {
      res.render('signin', { error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).render('signin', { error: 'An error occurred. Please try again.' });
    console.error('Error during sign-in:', err.message);
  }
});

// Signup route
app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

app.post('/signup', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.render('signup', { error: 'Passwords do not match' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('signup', { error: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/'); // Redirect to sign-in page after successful registration
  } catch (err) {
    res.status(500).render('signup', { error: 'An error occurred. Please try again.' });
    console.error('Error during sign-up:', err.message);
  }
});

// Authentication check route (for frontend to check if the user is logged in)
app.get('/api/check-auth', (req, res) => {
  if (req.session.user) {
    res.status(200).send('Authenticated');
  } else {
    res.status(401).send('Not Authenticated');
  }
});

// Serve static files from the 'dist' folder (for JS, CSS, etc.)
app.use(express.static(path.join(__dirname, 'dist')));  // Serve static files from 'dist' folder

// Route to serve React App (ensure that user is authenticated)
app.get('/app', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');  // Redirect to signin if user is not authenticated
  }
  
  // Serve the index.html file from 'dist' (React App entry point)
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));  // Serve React app HTML file
});

// View Users Route (for debugging purposes)
// Only enable this route in non-production environments for security reasons
if (process.env.NODE_ENV !== 'production') {
  app.get('/view-users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from MongoDB
      res.json(users); // Return the users as JSON
    } catch (err) {
      res.status(500).send('Error retrieving users');
    }
  });
}
