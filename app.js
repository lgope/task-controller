import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import compression from 'compression';

import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import dailyWorkRoutes from './routes/dailyWorkRoutes.js';

const app = express();

// Implement CORS
app.use(cors());

app.options('*', cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parser Middleware
app.use(express.json());

// compress all responses
app.use(compression());

// auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/daily-work', dailyWorkRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.all('*', (req, res, next) => {
  next(
    new AppError(`Sorry! Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
