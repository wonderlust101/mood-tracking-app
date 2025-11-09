import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import moodEntryRoutes from './routes/moodEntry.route';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import deserializeUser from "./middlewares/deserialize-user";
import errorHandler from "./middlewares/error-handler";

// Initialization of express app
dotenv.config();
const app = express();
const allowedOrigins = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(cors({
    credentials : true,
    origin : allowedOrigins
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(deserializeUser);

// Routes
app.use("/api/v1/moodEntry", moodEntryRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDB().then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
);