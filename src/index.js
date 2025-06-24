const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('API is ready to accept requests.');
});