import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import prisma from './config/prismaClient.js';

import 'dotenv/config';

const app = express();
const port = process.env.PORT ;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


prisma.$connect()
  .then(() => {
    app.listen(port, async () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log('API is ready to accept requests.');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

 
