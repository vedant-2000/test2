const express = require('express');
const path = require('path');
const { gstValidation } = require('./function');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('/'));

// Routes
app.post('/gst', gstValidation)
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
