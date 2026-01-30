import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './db/connection.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use((req, res, next) => {
    console.log(`\x1b[36m[API DEBUG]\x1b[0m ${req.method} ${req.url}`);
    next();
});
app.use(express.json());
app.use(cors({ origin: '*' })); // Explicitly allow all origins
app.use(morgan('dev'));
// Temporarily disable helmet for debugging 403
// app.use(helmet());

// Routes
import authRoutes from './routes/authRoutes.js';
import habitRoutes from './routes/habitRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

app.get('/', (req, res) => {
    res.send('SkillSync API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} (0.0.0.0)`);
});
