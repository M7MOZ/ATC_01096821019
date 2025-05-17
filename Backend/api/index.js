import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import eventRoutes from './routes/event.route.js';
import userRoutes from './routes/user.route.js';
import cors from 'cors';
dotenv.config();


mongoose.connect(process.env.MONGO)
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.use(cors());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use('/api/events', eventRoutes);

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message
    });
})