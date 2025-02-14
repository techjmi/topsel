const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const connectToDb = require('./database/db');
const userRoutes = require('./router/user-routes.js');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
connectToDb();
// API Routes
app.use('/api/auth', userRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../client/dist')));
// Catch-All Route for Client-Side Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
