import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import moodEntryRoutes from './routes/moodEntry.route';

// Initialization of express app
dotenv.config();
const app = express();
const allowedOrigins = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(cors({
    credentials : true,
    origin      : allowedOrigins
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Routes
app.use("/api/v1/moodEntry", moodEntryRoutes);

// Error Handling


const PORT = process.env.PORT || 3000;
connectDB().then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
);