const express = require('express');
const app = express();
const port = 3000; // or any other port of your choice

// Custom middleware to verify the time of the request
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // Sunday is 0, Monday is 1, and so on...
  const hour = date.getHours();

  if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 17) {
    // If it's a weekday and between 9am and 5pm, proceed to the next middleware
    next();
  } else {
    // Otherwise, return a "Not Available" page
    res.render('not-available');
  }
};

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for serving static files
app.use(express.static('public'));

// Middleware to verify working hours
app.use(checkWorkingHours);

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/our-services', (req, res) => {
  res.render('our-services');
});

app.get('/contact-us', (req, res) => {
  res.render('contact-us');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
