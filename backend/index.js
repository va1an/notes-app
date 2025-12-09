import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import tagRoutes from "./routes/tagRoutes.js";
import { protect } from './middleware/authMiddleware.js';

const app = express();

app.use(bodyParser.json());
dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })


app.use("/api/auth", authRoutes);
app.use("/api", protect, noteRoutes);
app.use("/api", protect, tagRoutes);